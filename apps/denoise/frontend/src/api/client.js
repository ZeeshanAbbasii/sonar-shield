import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const denoiseAudio = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/denoise', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getResults = async () => {
  const response = await axios.get(`${API_BASE_URL}/results`);
  return response.data;
};

export const getFigure = (filename) => {
  return `${API_BASE_URL}/figures/${filename}`;
};

export const getAudioUrl = (filename) => {
  return `${API_BASE_URL}/audio/${filename}`;
};

export default api;
