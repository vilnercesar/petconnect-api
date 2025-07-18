import axios from 'axios';

const API_URL = 'http://localhost:8000/users/me'; 

/**
 * Atualiza os dados do perfil do usuário.
 * @param {object} userData 
 */
export const updateUserProfile = (userData) => {
  return axios.patch(API_URL, userData);
};

/**
 * Altera a senha do usuário.
 * @param {object} passwordData
 */
export const changeUserPassword = (passwordData) => {
  return axios.post(`${API_URL}/change-password`, passwordData);
};

/**
 * Deleta a conta do usuário autenticado.
 */
export const deleteUserAccount = () => {
  return axios.delete(API_URL);
};
