import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
const USERS_API_URL = `${BASE_URL}/users`;

export const getStats = async () => {
    const response = await axios.get(`${USERS_API_URL}/stats`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${USERS_API_URL}/`);
    return response.data;
};

/**
 * Chama a API para aprovar um usuário.
 * @param {number} userId 
 * @returns {Promise<any>} 
 */
export const approveUser = async (userId) => {
    const response = await axios.patch(`${USERS_API_URL}/${userId}/approve`);
    return response.data;
};

/**
 * Chama a API para rejeitar/banir um usuário.
 * @param {number} userId 
 * @returns {Promise<any>}
 */
export const rejectUser = async (userId) => {
    const response = await axios.patch(`${USERS_API_URL}/${userId}/reject`);
    return response.data;
};

/**
 * Chama a API para deletar um usuário.
 * @param {number} userId 
 */
export const deleteUser = async (userId) => {
    await axios.delete(`${USERS_API_URL}/${userId}`);
};