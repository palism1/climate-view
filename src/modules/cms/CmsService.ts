import axios from "axios";

const CMS_API_BASE_URL = "http://127.0.0.1:5000/api/cms";

export const fetchCmsContent = async (pageId: string) => {
  try {
    const response = await axios.get(`${CMS_API_BASE_URL}/content/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching CMS content:", error);
    throw error;
  }
};

export const addCmsContent = async (content: {
  title: string;
  body: string;
}) => {
  try {
    const response = await axios.post(`${CMS_API_BASE_URL}/content`, content);
    return response.data;
  } catch (error) {
    console.error("Error adding CMS content:", error);
    throw error;
  }
};

export const updateCmsContent = async (
  pageId: string,
  content: { title: string; body: string }
) => {
  try {
    const response = await axios.put(
      `${CMS_API_BASE_URL}/content/${pageId}`,
      content
    );
    return response.data;
  } catch (error) {
    console.error("Error updating CMS content:", error);
    throw error;
  }
};

export const deleteCmsContent = async (pageId: string) => {
  try {
    const response = await axios.delete(
      `${CMS_API_BASE_URL}/content/${pageId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting CMS content:", error);
    throw error;
  }
};

export const updateSystemConfig = async (config: {
  refreshInterval: number;
  userAccess: string[];
}) => {
  try {
    const response = await axios.put(`${CMS_API_BASE_URL}/config`, config);
    return response.data;
  } catch (error) {
    console.error("Error updating system configuration:", error);
    throw error;
  }
};
