import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend URL

export const fetchTemperatureData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/temperature`);
    return response.data;
  } catch (error) {
    console.error("Error fetching temperature data:", error);
    throw error;
  }
};
