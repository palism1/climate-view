interface ClimateData {
  // Define the structure of ClimateData
  temperature: number;
  humidity: number;
  // Add other relevant fields
}

const NOAA_BASE_URL = "https://api.noaa.gov";
const NASA_BASE_URL = "https://api.nasa.gov";
const NOAA_API_KEY = "your-noaa-api-key";
const NASA_API_KEY = "your-nasa-api-key";

const cache = new Map<string, ClimateData>();

function validateFetchedData(data: unknown): data is ClimateData {
  // Implement validation logic
  return (
    data &&
    typeof data === "object" &&
    data !== null &&
    typeof (data as ClimateData).temperature === "number" &&
    typeof (data as ClimateData).humidity === "number"
  );
}

const baseDelay = 1000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

  while (retries > 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (!validateFetchedData(data)) {
        break;
      }

      cache.set(cacheKey, data);
      return data;
    } catch {
      retries -= 1;
      if (retries > 0) {
        await sleep((4 - retries) * baseDelay * 2); // Exponential backoff
      }
    }
  }

  if (cachedData) {
    return cachedData;
  }

  return null;
}
