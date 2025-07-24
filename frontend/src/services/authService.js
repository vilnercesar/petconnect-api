import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Regista um novo usuário na API.
 * @param {object} userData 
 */
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/users/`, userData);
};