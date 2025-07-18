import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import * as collaboratorService from '../services/collaboratorService';
import { Hourglass, CheckCircle } from 'lucide-react';

export const OngoingServicesPage = () => {
    const [ongoingServices, setOngoingServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await collaboratorService.getMyRequests();
                const filteredData = data.filter(req => 
                    req.status === 'aceito' || req.status === 'em_andamento'
                );
                setOngoingServices(filteredData);
            } catch (err) {
                console.error("Erro ao buscar serviços:", err);
                setError('Não foi possível carregar os seus serviços.');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const getStatusBadge = (status) => {
        const styles = {
          aceito: 'bg-blue-100 text-blue-800',
          em_andamento: 'bg-purple-100 text-purple-800',
        };
        return (
          <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 ${styles[status]}`}>
            {status === 'aceito' ? <CheckCircle size={14} /> : <Hourglass size={14} />}
            {status.replace('_', ' ')}
          </span>
        );
    };

    if (loading) {
        return <div><Header /><p className="text-center mt-10">A carregar serviços...</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Serviços em Andamento</h1>
                <div className="bg-white rounded-xl shadow">
                    {error ? <p className="p-6 text-center text-red-500">{error}</p> : (
                        <ul className="divide-y divide-gray-200">
                            {ongoingServices.length > 0 ? ongoingServices.map(req => (
                                <li key={req.id} className="p-4 sm:p-6 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-indigo-600 capitalize">{req.service_type.replace('_', ' ')}</p>
                                        <p className="text-sm text-gray-600">Cliente: {req.client.nome_completo}</p>
                                        <p className="text-xs text-gray-400">Aceite em: {new Date(req.updated_at || req.created_at).toLocaleDateString()}</p>
                                    </div>
                                    {getStatusBadge(req.status)}
                                </li>
                            )) : <p className="p-6 text-gray-500">Nenhum serviço em andamento no momento.</p>}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};
