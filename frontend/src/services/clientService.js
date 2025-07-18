import axios from 'axios';

const USERS_API_URL = 'http://localhost:8000/users';
const REQUESTS_API_URL = 'http://localhost:8000/service-requests';

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