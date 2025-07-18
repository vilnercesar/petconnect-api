import axios from 'axios';

const API_URL = 'http://localhost:8000/service-requests';

// Busca todas as solicitações para o colaborador logado
export const getMyRequests = async () => {
    const response = await axios.get(`${API_URL}/me/requests`);
    return response.data;
};

// Aceita uma solicitação
export const acceptRequest = async (requestId) => {
    const response = await axios.patch(`${API_URL}/${requestId}/accept`);
    return response.data;
};

// Recusa uma solicitação
export const refuseRequest = async (requestId) => {
    const response = await axios.patch(`${API_URL}/${requestId}/refuse`);
    return response.data;
};