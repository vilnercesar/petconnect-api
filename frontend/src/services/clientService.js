import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

const USERS_API_URL = `${BASE_URL}/users`;
const REQUESTS_API_URL = `${BASE_URL}/service-requests`;

export const getMyRequests = async () => {
    const response = await axios.get(`${REQUESTS_API_URL}/my-requests`);
    return response.data;
};

export const getActiveCollaborators = async () => {
    const response = await axios.get(`${USERS_API_URL}/collaborators`);
    return response.data;
};

export const createServiceRequest = async (requestData) => {
    const response = await axios.post(`${REQUESTS_API_URL}/`, requestData);
    return response.data;
};