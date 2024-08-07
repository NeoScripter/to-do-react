import axios from 'axios';

const API_URL = 'https://to-do-react-backend.onrender.com';

export const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const fetchTasks = (userId) => {
  return axios.get(`${API_URL}/tasks/${userId}`);
};

export const addTask = (user_id, text, description) => {
  return axios.post(`${API_URL}/tasks/${user_id}`, { text, description });
};

export const deleteTask = (task_id) => {
  return axios.post(`${API_URL}/delete`, { task_id });
};

export const completeTask = (task_id) => {
  return axios.post(`${API_URL}/complete`, { task_id });
};

export const editTask = (title, description, task_id) => {
  return axios.post(`${API_URL}/edit`, { title, description, task_id });
};

export const deleteTasksForUser = (userId) => {
  return axios.post(`${API_URL}/delete_all`, { userId });
};