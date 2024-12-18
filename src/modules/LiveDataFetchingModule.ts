import fetch from "node-fetch";

export const fetchNOAALiveData = async (
  latitude: number,
  longitude: number
) => {
  const noaaBaseURL = "https://api.weather.gov/points";
  try {
    const metadataResponse = await fetch(
      `${noaaBaseURL}/${latitude},${longitude}`
    );
    const metadata = await metadataResponse.json();

    const forecastUrl = metadata.properties.forecast;
    const forecastResponse = await fetch(forecastUrl);
    return await forecastResponse.json();
  } catch (error) {
    console.error("Error fetching NOAA live data:", error);
    throw error;
  }
};

export const fetchNASAPowerLiveData = async (
  params: Record<string, string>
) => {
  const nasaBaseURL = "https://power.larc.nasa.gov/api/temporal/daily/point";
  const searchParams = new URLSearchParams(params);

  try {
    const response = await fetch(`${nasaBaseURL}?${searchParams.toString()}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching NASA live data:", error);
    throw error;
  }
};
