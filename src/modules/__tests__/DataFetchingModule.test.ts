import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchData, clearCache } from "../DataFetchingModule";

global.fetch = vi.fn() as unknown as typeof fetch;

describe("Data Fetching Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it("fetches data successfully from the NOAA API", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ temperature: 72, humidity: 40 }),
    });

    const data = await fetchData("noaa", "weather-data");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.weather.gov/weather-data",
      expect.objectContaining({
        headers: { Authorization: "Bearer noaa-test-key" },
      })
    );
    expect(data).toEqual({ temperature:import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchData, clearCache } from "../DataFetchingModule";

global.fetch = vi.fn() as unknown as typeof fetch;

describe("Data Fetching Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearCache();
  });

  it("fetches data successfully from the NOAA API", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ temperature: 72, humidity: 40 }),
    });

    const data = await fetchData("noaa", "weather-data");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.weather.gov/weather-data",
      expect.objectContaining({
        headers: { Authorization: "Bearer noaa-test-key" },
      })
    );
    expect(data).toEqual({ temperature: