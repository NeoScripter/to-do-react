import axios from 'axios';

const API_URL = 'http://localhost:5000';

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


/*

export const addTask = (user_id, text, description) => {
  return axios.post(API_URL + 'tasks.php', { action: 'add', user_id, text, description });
};

export const updateTask = (user_id, task_id, done) => {
  return axios.post(API_URL + 'tasks.php', { action: 'update', user_id, task_id, done });
};

export const deleteTask = (user_id, task_id) => {
  return axios.post(API_URL + 'tasks.php', { action: 'delete', user_id, task_id });
};
 */