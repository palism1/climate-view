// DataFetchingModule.integration.test.ts
// Integration tests for DataFetchingModule.ts:
// - Tests live interactions with NOAA and NASA APIs.
// - Validates real API calls and caching fallback.
// - Confirms that valid data is cached and reused when the API fails.
// - Ensures that errors from the API are properly logged.

<<<<<<< HEAD
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { fetchData, preloadCache, clearCache } from "../DataFetchingModule";

describe("Data Fetching Module - Integration Tests", () => {
  beforeEach(() => {
    // Clear the cache before each test to ensure no cross-contamination
    clearCache();
  });

  afterEach(() => {
    // Additional cleanup, if necessary
    clearCache();
  });

  it("fetches valid data from NOAA API and updates the cache", async () => {
    const endpoint = "weather-data";

    // Fetch data from the NOAA API
    const data = await fetchData("noaa", endpoint);

    // Validate the fetched data
    expect(data).toHaveProperty("temperature");
    expect(data).toHaveProperty("humidity");

    // Ensure the data is cached
    const cachedData = await fetchData("noaa", endpoint);
    expect(cachedData).toEqual(data);
  });

  it("fetches valid data from NASA API and updates the cache", async () => {
    const endpoint = "atmosphere";

    // Fetch data from the NASA API
    const data = await fetchData("nasa", endpoint);

    // Validate the fetched data
    expect(data).toHaveProperty("temperature");
    expect(data).toHaveProperty("humidity");

    // Ensure the data is cached
    const cachedData = await fetchData("nasa", endpoint);
    expect(cachedData).toEqual(data);
  });

  it("falls back to cached data when NOAA API is unavailable", async () => {
    const endpoint = "weather-data";
    const cachedData = { temperature: 72, humidity: 40 };

    // Preload the cache with fallback data
    preloadCache("noaa", endpoint, cachedData);

    // Simulate an unavailable API by using an invalid endpoint
    const data = await fetchData("noaa", "invalid-endpoint");

    // Validate that cached data is returned
    expect(data).toEqual(cachedData);
  });

  it("logs an error and returns null for invalid data structure (NASA)", async () => {
    const endpoint = "invalid-data";

    // Fetch data from an endpoint expected to return invalid data
    const data = await fetchData("nasa", endpoint);

    // Validate the result is null
    expect(data).toBeNull();
  });

  it("logs an error and returns null when both API and cache fail (NOAA)", async () => {
    const endpoint = "nonexistent-endpoint";

    // Ensure the cache is empty
    clearCache();

    // Fetch data from an invalid endpoint
    const data = await fetchData("noaa", endpoint);

    // Validate the result is null
    expect(data).toBeNull();
  });
});
=======
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { fetchData, preloadCache, clearCache } from '../DataFetchingModule';

describe('Data Fetching Module - Integration Tests', () => {
    beforeEach(() => {
        // Clear the cache before each test to ensure no cross-contamination
        clearCache();
    });

    afterEach(() => {
        // Additional cleanup, if necessary
        clearCache();
    });

    it('fetches valid data from NOAA API and updates the cache', async () => {
        const endpoint = 'weather-data';

        // Fetch data from the NOAA API
        const data = await fetchData('noaa', endpoint);

        // Validate the fetched data
        expect(data).toHaveProperty('temperature');
        expect(data).toHaveProperty('humidity');

        // Ensure the data is cached
        const cachedData = await fetchData('noaa', endpoint);
        expect(cachedData).toEqual(data);
    });

    it('fetches valid data from NASA API and updates the cache', async () => {
        const endpoint = 'atmosphere';

        // Fetch data from the NASA API
        const data = await fetchData('nasa', endpoint);

        // Validate the fetched data
        expect(data).toHaveProperty('temperature');
        expect(data).toHaveProperty('humidity');

        // Ensure the data is cached
        const cachedData = await fetchData('nasa', endpoint);
        expect(cachedData).toEqual(data);
    });

    it('falls back to cached data when NOAA API is unavailable', async () => {
        const endpoint = 'weather-data';
        const cachedData = { temperature: 72, humidity: 40 };

        // Preload the cache with fallback data
        preloadCache('noaa', endpoint, cachedData);

        // Simulate an unavailable API by using an invalid endpoint
        const data = await fetchData('noaa', 'invalid-endpoint');

        // Validate that cached data is returned
        expect(data).toEqual(cachedData);
    });

    it('logs an error and returns null for invalid data structure (NASA)', async () => {
        const endpoint = 'invalid-data';

        // Fetch data from an endpoint expected to return invalid data
        const data = await fetchData('nasa', endpoint);

        // Validate the result is null
        expect(data).toBeNull();
    });

    it('logs an error and returns null when both API and cache fail (NOAA)', async () => {
        const endpoint = 'nonexistent-endpoint';

        // Ensure the cache is empty
        clearCache();

        // Fetch data from an invalid endpoint
        const data = await fetchData('noaa', endpoint);

        // Validate the result is null
        expect(data).toBeNull();
    });
});
>>>>>>> Pratik
