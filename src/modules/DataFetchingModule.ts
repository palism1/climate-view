// DataFetchingModule.ts
// This module fetches climate data from NASA or NOAA, providing:
// - Automatic retries on failure
// - Timeout handling
// - Caching fallback if API calls fail or return invalid data
// - Data validation to ensure returned data is structurally correct
// - Error logging for debug and monitoring purposes

export interface ClimateData {
  temperature: number;
  humidity: number;
  windSpeed?: number;
}

// Provide default endpoints and keys if environment variables aren’t set.
// This ensures tests and local development run smoothly without extra config.
const NOAA_BASE_URL =
  import.meta.env.NOAA_API_BASE_URL ?? "https://api.weather.gov";
const NASA_BASE_URL =
  import.meta.env.NASA_API_BASE_URL ?? "https://api.nasa.gov";
const NOAA_API_KEY = import.meta.env.NOAA_API_KEY ?? "Noaa API key not set";
const NASA_API_KEY = import.meta.env.NASA_API_KEY ?? "Nasa API key not set";

// Simple in-memory cache used to store the latest successful fetch results,
// allowing fallback if API calls fail subsequently.
const cache = new Map<string, ClimateData>();

// Logs errors with a timestamp, module name, and error details.
// In a real environment, this could be integrated with a logging service.
function logError(errorType: string, details: Record<string, unknown>): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    module: "DataFetchingModule",
    errorType,
    details,
  };
  console.error("[LOG ERROR]", logEntry);
}

// Checks that the object returned by the API has the required fields.
// If missing or invalid, returns false.
function isValidClimateData(data: unknown): data is ClimateData {
  return (
    typeof data === "object" &&
    data !== null &&
    "temperature" in data &&
    typeof (data as ClimateData).temperature === "number" &&
    "humidity" in data &&
    typeof (data as ClimateData).humidity === "number"
  );
}

// Validates the fetched data. If invalid, logs an error and returns null.
function validateFetchedData(data: unknown): ClimateData | null {
  if (!isValidClimateData(data)) {
    logError("InvalidDataError", {
      reason: "Missing required fields or invalid types",
      data,
    });
    return null;
  }
  return data;
}

// Detect if we are running tests; if so, use shorter backoff delays to speed up tests.
const isTestEnv =
  typeof process !== "undefined" &&
  (process as NodeJS.Process).env.NODE_ENV === "test";
const baseDelay = isTestEnv ? 10 : 1000; // shorter delay if testing

/**
 * fetchData(service, endpoint):
 * Fetches climate data from NOAA or NASA endpoints.
 * Features:
 *  - Retries up to 3 times on failure (network errors or invalid responses).
 *  - Uses a 5-second timeout for each attempt.
 *  - Falls back to cached data if all attempts fail or data is invalid.
 *  - Logs all errors for debugging.
 *
 * @param service 'noaa' | 'nasa' - The data source (NOAA or NASA)
 * @param endpoint string - The relative path to the resource (e.g., 'weather-data')
 * @returns Promise<ClimateData | null> - Returns ClimateData if successful, otherwise null
 */
export async function fetchData(
  service: "noaa" | "nasa",
  endpoint: string
): Promise<ClimateData | null> {
  const baseUrl = service === "noaa" ? NOAA_BASE_URL : NASA_BASE_URL;
  const apiKey = service === "noaa" ? NOAA_API_KEY : NASA_API_KEY;
  const url = `${baseUrl}/${endpoint}`;

  const cacheKey = `${service}:${endpoint}`;
  const cachedData = cache.get(cacheKey);

  let retries = 3;
  let lastError: Error | null = null;

  while (retries > 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Perform the fetch with an auth header and a signal to handle timeouts
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // If not ok, log error and throw to trigger retry logic
      if (!response.ok) {
        logError("HTTPError", { status: response.status, url });
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      const validated = validateFetchedData(data);
      if (!validated) {
        // Data invalid: break out and fallback to cache
        break;
      }

      // Valid data: store in cache and return
      cache.set(cacheKey, validated);
      return validated;
    } catch (error: unknown) {
      lastError = error instanceof Error ? error : new Error("Unknown error");
      logError("NetworkOrTimeoutError", { url, error: lastError.message });
      retries -= 1;
      if (retries > 0) {
        // Wait a bit before retrying to avoid hammering the API
        await new Promise((res) => setTimeout(res, (4 - retries) * baseDelay));
      }
    }
  }

  // If all attempts failed or data invalid, try cached data
  if (cachedData) {
    return cachedData;
  }

  // No cached data either, log final failure
  logError("NoRealTimeDataAvailable", { url, error: lastError?.message });
  return null;
}

/**
 * preloadCache(service, endpoint, data):
 * Allows tests or other code to manually preload the cache.
 * Useful scenarios for fallback data in case of API failure.
 */
export function preloadCache(
  service: "noaa" | "nasa",
  endpoint: string,
  data: ClimateData
) {
  cache.set(`${service}:${endpoint}`, data);
}

/**
 * clearCache():
 * Empties the in-memory cache, useful in tests to ensure a clean slate.
 */
export function clearCache() {
  cache.clear();
}
