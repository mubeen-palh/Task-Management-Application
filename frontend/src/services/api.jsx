import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Tasks
export const fetchTasks = () => API.get('/tasks');
export const createTask = (task) => API.post('/tasks', task);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const fetchOverallocatedMembers = () => API.get('/tasks/check/overallocated');

// Team Members
export const fetchTeamMembers = () => API.get('/team-members');
export const createTeamMember = (member) => API.post('/team-members', member);
export const updateTeamMember = (id, updatedMember) => API.put(`/team-members/${id}`, updatedMember);
export const deleteTeamMember = (id) => API.delete(`/team-members/${id}`);
