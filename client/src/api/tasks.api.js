import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const getTaskRequest = async () => 
  await axios.get(`${API}/tasks`);

export const createTaskRequest = async (task) => 
  await axios.post(`${API}/tasks`, task);

export const deleteTaskRequest = async (id) => 
  await axios.delete(`${API}/tasks/${id}`);

export const getTasksRequest = async (id) => 
  await axios.get(`${API}/tasks/${id}`);

export const updateTaskRequest = async (id, newFields) =>
  await axios.put(`${API}/tasks/${id}`, newFields);

export const toggleTaskDoneRequest = async (id, done) =>
  await axios.put(`${API}/tasks/${id}`, { done });
