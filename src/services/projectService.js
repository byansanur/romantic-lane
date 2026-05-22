import apiClient from './api';

export const getMyProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data.data;
};

export const generateStoryAI = async (promptText) => {
  const payload = { prompt: promptText };
  const response = await apiClient.post('/ai/generate-story', payload, {
    headers: {
      'X-Turnstile-Token': 'token-dummy-untuk-testing' // TODO: implement real Turnstile token
    }
  });
  return response.data;
};

export const uploadFile = async (fileBlob) => {
  const formData = new FormData();
  formData.append('file', fileBlob, 'photo.webp');
  
  const response = await apiClient.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const createProject = async (payload) => {
  const response = await apiClient.post('/projects', payload);
  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await apiClient.get(`/projects/${slug}`);
  return response.data.data;
};
