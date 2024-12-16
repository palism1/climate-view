import axios from "axios";

const CMS_API_BASE_URL = "http://127.0.0.1:5000/api/cms"; // Replace with your CMS API base URL

export const fetchCmsContent = async (pageId: string) => {
  try {
    const response = await axios.get(`${CMS_API_BASE_URL}/content/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching CMS content:", error);
    throw error;
  }
};
