import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, ListChecks, User } from 'lucide-react';

export const CollaboratorDashboard = ({ user }) => {
  const pendingRequests = [
    { id: 4, service: 'Passeio', client: 'João Silva', date: 'Hoje' },
    { id: 5, service: 'Hospedagem', client: 'Maria Oliveira', date: 'Amanhã' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel do Colaborador</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/colaborador/solicitacoes" className="p-6 bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center relative">
          <Bell size={32} className="mb-2" />
          <span className="font-semibold text-lg text-center">Ver Novas Solicitações</span>
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">{pendingRequests.length}</span>
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
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Solicitações Pendentes</h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {pendingRequests.length > 0 ? pendingRequests.map(req => (
              <li key={req.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{req.service} para {req.client}</p>
                  <p className="text-sm text-gray-500">Data: {req.date}</p>
                </div>
                <Link to={`/colaborador/solicitacoes/${req.id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                  Ver Detalhes
                </Link>
              </li>
            )) : <p className="p-6 text-gray-500">Nenhuma solicitação pendente no momento.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};