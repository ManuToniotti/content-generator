import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const generateImage = async (prompt) => {
  try {
    const response = await api.post('/images/generate', { prompt });
    return response.data;
  } catch (error) {
    console.error('Error in generateImage:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Note: This function is currently not implemented on the backend
export const convertToVideo = async (image, prompt) => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('prompt', prompt);
  const response = await api.post('/video/convert', formData);
  return response.data;
};

export const getContents = async () => {
  const response = await api.get('/content');
  return response.data;
};

export const scheduleContent = async (contentId, scheduledDate, platform) => {
  const response = await api.post(`/content/${contentId}/schedule`, { scheduledDate, platform });
  return response.data;
};

export const getTemplates = async () => {
  const response = await api.get('/templates');
  return response.data;
};

export const createTemplate = async (templateData) => {
  const response = await api.post('/templates', templateData);
  return response.data;
};

export const uploadAndDescribeImage = async (formData) => {
  try {
    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading and describing image:', error);
    throw error;
  }
};

export default api;