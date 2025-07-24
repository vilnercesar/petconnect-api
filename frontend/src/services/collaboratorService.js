import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
const REQUESTS_API_URL = `${BASE_URL}/service-requests`;
// Busca todas as solicitações para o colaborador logado
export const getMyRequests = async () => {
    const response = await axios.get(`${REQUESTS_API_URL}/me/requests`);
    return response.data;
};

// Aceita uma solicitação
export const acceptRequest = async (requestId) => {
    const response = await axios.patch(`${REQUESTS_API_URL}/${requestId}/accept`);
    return response.data;
};

// Recusa uma solicitação
export const refuseRequest = async (requestId) => {
    const response = await axios.patch(`${REQUESTS_API_URL}/${requestId}/refuse`);
    return response.data;
};