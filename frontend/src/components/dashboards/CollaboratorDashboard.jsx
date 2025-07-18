import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ListChecks, User } from 'lucide-react';
import * as collaboratorService from '../../services/collaboratorService';

export const CollaboratorDashboard = ({ user }) => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const allRequests = await collaboratorService.getMyRequests();
        setPendingRequests(allRequests.filter(req => req.status === 'pendente'));
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel do Colaborador</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/colaborador/solicitacoes" className="p-6 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center relative">
          <Bell size={32} className="mb-2" />
          <span className="font-semibold text-lg text-center">Gerenciar Solicitações</span>
          {pendingRequests.length > 0 && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{pendingRequests.length}</span>
          )}
        </Link>
        <Link to="/colaborador/servicos-aceitos" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
          <ListChecks size={32} className="mb-2 text-gray-600" />
          <span className="font-semibold text-lg text-gray-800">Serviços em Andamento</span>
        </Link>
        <Link to="/perfil" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
          <User size={32} className="mb-2 text-gray-600" />
          <span className="font-semibold text-lg text-gray-800">Gerenciar Perfil</span>
        </Link>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Últimas Solicitações Pendentes</h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? <p className="p-6">A carregar...</p> : (
            <ul className="divide-y divide-gray-200">
              {pendingRequests.length > 0 ? pendingRequests.slice(0, 3).map(req => (
                <li key={req.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{req.service_type.replace('_', ' ')} de {req.client.nome_completo}</p>
                  </div>
                  <Link to="/colaborador/solicitacoes" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                    Responder
                  </Link>
                </li>
              )) : <p className="p-6 text-gray-500">Nenhuma solicitação pendente no momento.</p>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};