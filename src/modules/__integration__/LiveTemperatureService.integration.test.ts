import { fetchLiveTemperatureFromNOAA, fetchLiveTemperatureFromNASA } from '../../services/liveTemperatureService';

describe('Live Temperature Service - Integration Tests', () => {
    it('fetches real-time temperature data from NOAA API', async () => {
        const latitude = 38.8977; // Example: Washington, D.C.
        const longitude = -77.0365;

        const data = await fetchLiveTemperatureFromNOAA(latitude, longitude);
        console.log('NOAA Data:', data);

        expect(data).toHaveProperty('temperature');
        expect(data).toHaveProperty('unit');
        expect(typeof data.temperature).toBe('number');
        expect(typeof data.unit).toBe('string');
    });

    it('fetches real-time temperature data from NASA POWER API', async () => {
        const latitude = 38.8977; // Example: Washington, D.C.
        const longitude = -77.0365;

        const data = await fetchLiveTemperatureFromNASA(latitude, longitude);
        console.log('NASA POWER Data:', data);

        expect(data).toHaveProperty('temperature');
        expect(data.unit).toBe('°C');
        expect(typeof data.temperature).toBe('number');
    });
});