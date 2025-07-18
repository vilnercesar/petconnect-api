import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import * as clientService from '../services/clientService';

export const MyRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await clientService.getMyRequests();
                setRequests(data);
            } catch (error) {
                console.error("Erro ao buscar solicitações:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Minhas Solicitações</h1>
                {loading ? <p>A carregar...</p> : (
                    <div className="bg-white rounded-xl shadow">
                        <ul className="divide-y divide-gray-200">
                            {requests.map(req => (
                                <li key={req.id} className="p-4 sm:p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-indigo-600 capitalize">{req.service_type.replace('_', ' ')}</p>
                                            <p className="text-sm text-gray-600">Para: {req.collaborator.nome_completo}</p>
                                            <p className="text-xs text-gray-400">Criado em: {new Date(req.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <span className="text-sm font-bold capitalize">{req.status}</span>
                                    </div>
                                </li>
                            ))}
                            {requests.length === 0 && <p className="p-6 text-gray-500">Você ainda não fez nenhuma solicitação.</p>}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
};