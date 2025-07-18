import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import * as collaboratorService from '../services/collaboratorService';
import { Check, X, History } from 'lucide-react'; 

export const CollaboratorRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const data = await collaboratorService.getMyRequests();
            setRequests(data);
        } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);
    
    const handleAction = async (action, requestId) => {
        try {
            if (action === 'accept') {
                await collaboratorService.acceptRequest(requestId);
            } else if (action === 'refuse') {
                await collaboratorService.refuseRequest(requestId);
            }
            fetchRequests(); 
        } catch (error) {
            console.error(`Erro ao ${action} a solicitação:`, error);
            alert(`Não foi possível executar a ação. Tente novamente.`);
        }
    };


    const pendingRequests = requests.filter(req => req.status === 'pendente');
    const otherRequests = requests.filter(req => req.status !== 'pendente');

    const getStatusBadge = (status) => {
        const styles = {
          aceito: 'bg-green-100 text-green-800',
          em_andamento: 'bg-blue-100 text-blue-800',
          concluido: 'bg-gray-100 text-gray-800',
          recusado: 'bg-red-100 text-red-800',
        };
        return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status.replace('_', ' ')}</span>;
      };

    if (loading) {
        return <div><Header /><p className="text-center mt-10">A carregar solicitações...</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Minhas Solicitações de Serviço</h1>
                <div className="space-y-12">
                    {/* Secção de Solicitações Pendentes */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Solicitações Pendentes ({pendingRequests.length})</h2>
                        {pendingRequests.length > 0 ? (
                            <div className="bg-white rounded-xl shadow">
                                <ul className="divide-y divide-gray-200">
                                    {pendingRequests.map(req => (
                                        <li key={req.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-indigo-600 capitalize">{req.service_type.replace('_', ' ')}</p>
                                                <p className="text-sm text-gray-600">De: {req.client.nome_completo}</p>
                                                <p className="text-xs text-gray-400">Recebido em: {new Date(req.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex space-x-2 mt-4 sm:mt-0">
                                                <button onClick={() => handleAction('accept', req.id)} title="Aceitar" className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"><Check size={18} /></button>
                                                <button onClick={() => handleAction('refuse', req.id)} title="Recusar" className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"><X size={18} /></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : <p className="text-gray-500">Nenhuma solicitação pendente.</p>}
                    </div>
                    
                    {/* Secção do Histórico de Solicitações */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                            <History size={20} className="mr-2" />
                            Histórico de Solicitações ({otherRequests.length})
                        </h2>
                        {otherRequests.length > 0 ? (
                            <div className="bg-white rounded-xl shadow">
                                <ul className="divide-y divide-gray-200">
                                    {otherRequests.map(req => (
                                        <li key={req.id} className="p-4 sm:p-6 flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-800 capitalize">{req.service_type.replace('_', ' ')}</p>
                                                <p className="text-sm text-gray-600">De: {req.client.nome_completo}</p>
                                            </div>
                                            {getStatusBadge(req.status)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : <p className="text-gray-500">Ainda não há solicitações no seu histórico.</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};