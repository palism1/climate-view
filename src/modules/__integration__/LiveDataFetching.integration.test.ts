<<<<<<< HEAD
import {
  fetchNOAALiveData,
  fetchNASAPowerLiveData,
} from "../LiveDataFetchingModule";

describe("Live Data Fetching Module - Integration Tests", () => {
  it("fetches real-time weather data from NOAA API", async () => {
    const latitude = 38.8977; // Example: Washington, D.C.
    const longitude = -77.0365;

    const data = await fetchNOAALiveData(latitude, longitude);
    console.log("NOAA Data:", data);

    expect(data).toHaveProperty("@context");
    expect(data).toHaveProperty("properties");
    expect(data.properties).toHaveProperty("periods");
    expect(data.properties.periods.length).toBeGreaterThan(0);
  });

  it("fetches real-time meteorological data from NASA POWER API", async () => {
    const params = {
      start: "20241201",
      end: "20241208",
      latitude: "38.8977",
      longitude: "-77.0365",
      parameters: "T2M,PRECTOTCORR", // Updated parameter
      community: "AG",
      format: "JSON",
    };

    const data = await fetchNASAPowerLiveData(params);
    console.log("NASA POWER Data:", data);

    expect(data).toHaveProperty("properties");
    expect(data.properties).toHaveProperty("parameter");
    expect(data.properties.parameter).toHaveProperty("T2M"); // Temperature at 2 meters
    expect(data.properties.parameter).toHaveProperty("PRECTOTCORR"); // Corrected precipitation
  });
});
=======
import { fetchNOAALiveData, fetchNASAPowerLiveData } from '../liveDataFetchingModule';

describe('Live Data Fetching Module - Integration Tests', () => {
    it('fetches real-time weather data from NOAA API', async () => {
        const latitude = 38.8977; // Example: Washington, D.C.
        const longitude = -77.0365;

        const data = await fetchNOAALiveData(latitude, longitude);
        console.log('NOAA Data:', data);

        expect(data).toHaveProperty('@context');
        expect(data).toHaveProperty('properties');
        expect(data.properties).toHaveProperty('periods');
        expect(data.properties.periods.length).toBeGreaterThan(0);
    });

    it('fetches real-time meteorological data from NASA POWER API', async () => {
        const params = {
            start: '20241201',
            end: '20241208',
            latitude: '38.8977',
            longitude: '-77.0365',
            parameters: 'T2M,PRECTOTCORR', // Updated parameter
            community: 'AG',
            format: 'JSON',
        };

        const data = await fetchNASAPowerLiveData(params);
        console.log('NASA POWER Data:', data);

        expect(data).toHaveProperty('properties');
        expect(data.properties).toHaveProperty('parameter');
        expect(data.properties.parameter).toHaveProperty('T2M'); // Temperature at 2 meters
        expect(data.properties.parameter).toHaveProperty('PRECTOTCORR'); // Corrected precipitation
    });
});
>>>>>>> Pratik
