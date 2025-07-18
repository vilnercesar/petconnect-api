import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, List, User } from 'lucide-react';
import * as clientService from '../../services/clientService';

export const ClientDashboard = ({ user }) => {
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentRequests = async () => {
      try {
        const allRequests = await clientService.getMyRequests();
        setRecentRequests(allRequests.slice(0, 3));
      } catch (error) {
        console.error("Erro ao buscar solicitações recentes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentRequests();
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      aceito: 'bg-green-100 text-green-800',
      pendente: 'bg-yellow-100 text-yellow-800',
      concluido: 'bg-blue-100 text-blue-800',
      recusado: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel do Cliente</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/cliente/solicitar-servico" className="p-6 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 flex flex-col items-center justify-center">
          <PlusCircle size={32} className="mb-2" />
          <span className="font-semibold text-lg">Solicitar Novo Serviço</span>
        </Link>
        <Link to="/cliente/minhas-solicitacoes" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
          <List size={32} className="mb-2 text-gray-600" />
          <span className="font-semibold text-lg text-gray-800">Minhas Solicitações</span>
        </Link>
        <Link to="/perfil" className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
          <User size={32} className="mb-2 text-gray-600" />
          <span className="font-semibold text-lg text-gray-800">Gerenciar Perfil</span>
        </Link>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Suas Solicitações Recentes</h3>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading ? <p className="p-6 text-gray-500">A carregar...</p> : (
            <ul className="divide-y divide-gray-200">
              {recentRequests.map(req => (
                <li key={req.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{req.service_type.replace('_', ' ')}</p>
                    <p className="text-sm text-gray-500">com {req.collaborator.nome_completo}</p>
                  </div>
                  {getStatusBadge(req.status)}
                </li>
              ))}
              {recentRequests.length === 0 && <p className="p-6 text-gray-500">Você ainda não fez nenhuma solicitação.</p>}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};