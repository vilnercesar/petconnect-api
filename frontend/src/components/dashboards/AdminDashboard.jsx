import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, BarChart2 } from 'lucide-react';
import { getStats } from '../../services/adminService'; 

export const AdminDashboard = ({ user }) => {
  const [stats, setStats] = useState({
    total_users: 0,
    pending_users: 0,
    active_services: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError('Não foi possível carregar as estatísticas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>A carregar estatísticas...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Painel do Administrador</h2>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600"><Users size={24} /></div>
            <div className="ml-4"><p className="text-sm text-gray-500">Total de Usuários</p><p className="text-2xl font-bold">{stats.total_users}</p></div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600"><UserCheck size={24} /></div>
            <div className="ml-4"><p className="text-sm text-gray-500">Pendentes de Aprovação</p><p className="text-2xl font-bold">{stats.pending_users}</p></div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600"><BarChart2 size={24} /></div>
            <div className="ml-4"><p className="text-sm text-gray-500">Serviços Ativos</p><p className="text-2xl font-bold">{stats.active_services}</p></div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Ações Rápidas</h3>
        <div className="bg-white rounded-xl shadow p-6">
          <Link to="/admin/usuarios" className="font-semibold text-indigo-600 hover:text-indigo-800">
            Gerenciar todos os usuários &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};