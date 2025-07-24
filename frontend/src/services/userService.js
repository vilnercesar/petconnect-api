import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
const PROFILE_API_URL = `${BASE_URL}/users/me`;
/**
 * Atualiza os dados do perfil do usuário.
 * @param {object} userData 
 */
export const updateUserProfile = (userData) => {
  return axios.patch(PROFILE_API_URL, userData);
};

/**
 * Altera a senha do usuário.
 * @param {object} passwordData
 */
export const changeUserPassword = (passwordData) => {
  return axios.post(`${PROFILE_API_URL}/change-password`, passwordData);
};

/**
 * Deleta a conta do usuário autenticado.
 */
export const deleteUserAccount = () => {
  return axios.delete(PROFILE_API_URL);
};
