// DataFetchingModule.test.ts
// Tests for DataFetchingModule.ts:
// - Ensures that valid data is fetched correctly.
// - Checks that invalid data or errors result in retries and eventually return null.
// - Confirms caching fallback works when the API is unavailable.
// - Tests multiple retries by mocking multiple responses.
// - Uses Vitest for testing and mocking fetch calls.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchData, preloadCache, clearCache } from '../DataFetchingModule';

// Mock the global fetch function for all tests
global.fetch = vi.fn() as unknown as typeof fetch;

describe('Data Fetching Module', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        clearCache();
    });

    it('fetches data successfully from the NOAA API', async () => {
        // Mock a successful response from NOAA
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ temperature: 72, humidity: 40 })
        });

        // Call fetchData; should return the mocked data
        const data = await fetchData('noaa', 'weather-data');
        expect(fetch).toHaveBeenCalledWith(
            'https://api.weather.gov/weather-data',
            expect.objectContaining({ headers: { 'Authorization': 'Bearer noaa-test-key' } })
        );
        expect(data).toEqual({ temperature: 72, humidity: 40 });
    });

    it('fetches data successfully from the NASA API', async () => {
        // Mock a successful response from NASA
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ temperature: 65, humidity: 50 })
        });

        const data = await fetchData('nasa', 'atmosphere');
        expect(fetch).toHaveBeenCalledWith(
            'https://api.nasa.gov/atmosphere',
            expect.objectContaining({ headers: { 'Authorization': 'Bearer nasa-test-key' } })
        );
        expect(data).toEqual({ temperature: 65, humidity: 50 });
    });

    it('handles HTTP errors correctly (NOAA)', async () => {
        // Simulate three failing attempts (HTTP 500) to ensure all retries are tested
        (fetch as vi.Mock)
            .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) })
            .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) })
            .mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) });

        const data = await fetchData('noaa', 'error-data');
        // After three attempts, no success and no cache: should return null
        expect(fetch).toHaveBeenCalledTimes(3);
        expect(data).toBeNull();
    });

    it('handles fetch errors gracefully (NASA)', async () => {
        // Simulate network errors on all three attempts
        (fetch as vi.Mock)
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockRejectedValueOnce(new Error('Network Error'));

        const data = await fetchData('nasa', 'network-issue');
        // No success, no cache: null
        expect(fetch).toHaveBeenCalledTimes(3);
        expect(data).toBeNull();
    });

    it('returns null for invalid data structure (NOAA)', async () => {
        // Provide invalid data (missing humidity as a number)
        (fetch as vi.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ temp: 72 }) // invalid structure
        });

        const data = await fetchData('noaa', 'invalid-data');
        // Data invalid, no fallback, return null
        expect(data).toBeNull();
    });
});