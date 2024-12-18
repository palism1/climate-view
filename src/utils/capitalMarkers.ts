import { stateCapitals } from '../data/stateCapitals'; // Use named import
import { fetchLiveTemperatureFromNOAA } from '../services/liveTemperatureService';

// Cache to store temperature data
const temperatureCache: Record<
    string,
    { temperature: string; unit: string; timestamp: number }
> = {};

/**
 * Get initial capital markers with cached temperature (if available).
 */
export const getCapitalMarkers = async () => {
    const markers = stateCapitals.map((capital) => ({
        ...capital,
        temperature: temperatureCache[capital.name]?.temperature ?? 'N/A',
        unit: temperatureCache[capital.name]?.unit ?? '',
    }));
    return markers;
};

/**
 * Update temperature data for a specific capital.
 */
export const updateTemperatureForCapital = async (capital: { name: string; lat: number; lon: number }) => {
    const cacheDuration = 60 * 60 * 1000; // Cache for 1 hour
    const cachedData = temperatureCache[capital.name];

    // Use cached data if still valid
    if (cachedData && Date.now() - cachedData.timestamp < cacheDuration) {
        console.log(`Cache hit for ${capital.name}:`, cachedData);
        return cachedData; // Return cached data
    }

    // Fetch new temperature data
    console.log(`Fetching temperature data for ${capital.name}`);
    try {
        const temperatureData = await fetchLiveTemperatureFromNOAA(capital.lat, capital.lon);
        console.log(`Fetched data for ${capital.name}:`, temperatureData);

        const updatedData = {
            temperature: temperatureData.temperature || 'N/A',
            unit: temperatureData.unit || '',
            timestamp: Date.now(),
        };

        // Update the cache
        temperatureCache[capital.name] = updatedData;
        return updatedData;
    } catch (error) {
        console.error(`Error updating temperature for ${capital.name}:`, error);
        return { temperature: 'Error', unit: '', timestamp: Date.now() }; // Default on error
    }
};