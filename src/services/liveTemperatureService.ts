// src/services/liveTemperatureService.ts

const NOAA_BASE_URL = 'https://api.weather.gov/points';
const NASA_BASE_URL = 'https://power.larc.nasa.gov/api/temporal/daily/point';

/**
 * Utility to format date as YYYYMMDD
 */
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

/**
 * Fetch live temperature data from NOAA for a given latitude and longitude.
 */
export const fetchLiveTemperatureFromNOAA = async (latitude: number, longitude: number) => {
    try {
        const metadataResponse = await fetch(`${NOAA_BASE_URL}/${latitude},${longitude}`);
        const metadata = await metadataResponse.json();

        console.log(`NOAA metadata for (${latitude}, ${longitude}):`, metadata);

        const forecastUrl = metadata.properties.forecast;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        console.log(`NOAA forecast data for (${latitude}, ${longitude}):`, forecastData);

        const temperature = forecastData.properties.periods[0]?.temperature;
        return { temperature, unit: forecastData.properties.periods[0]?.temperatureUnit };
    } catch (error) {
        console.error(`Error fetching live temperature data from NOAA for (${latitude}, ${longitude}):`, error);
        throw error;
    }
};

/**
 * Fetch live temperature data from NASA POWER API for a given latitude and longitude.
 */
export const fetchLiveTemperatureFromNASA = async (latitude: number, longitude: number) => {
    try {
        const today = new Date();
        const formattedDate = formatDate(today);

        console.log(`Fetching NASA POWER data for Lat: ${latitude}, Lon: ${longitude}, Date: ${formattedDate}`);

        const params = new URLSearchParams({
            start: formattedDate, // Use today's date
            end: formattedDate,   // Use today's date
            latitude: latitude.toString(),
            longitude: longitude.toString(),
            parameters: 'T2M', // Surface air temperature
            community: 'AG',
            format: 'JSON'
        });

        const response = await fetch(`${NASA_BASE_URL}?${params.toString()}`);
        if (!response.ok) {
            console.error('NASA POWER API Fetch Failed:', response.statusText);
            throw new Error('Failed to fetch NASA POWER data');
        }

        const data = await response.json();
        console.log('NASA POWER Data:', data);

        // Extract temperature data
        const temperature = data.properties.parameter.T2M[formattedDate];
        console.log(`Extracted Temperature: ${temperature}°C`);

        return { temperature, unit: '°C' }; // NASA provides data in Celsius
    } catch (error) {
        console.error('Error fetching live temperature data from NASA:', error);
        throw error;
    }
};