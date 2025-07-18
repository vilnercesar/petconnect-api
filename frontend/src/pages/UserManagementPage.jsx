import React, { useState, useEffect, useContext } from 'react';
import { Header } from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import * as adminService from '../services/adminService';
import { ShieldCheck, ShieldX, Trash2, Search, AlertCircle } from 'lucide-react';

export const UserManagementPage = () => {
  const { user: adminUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers();
      setUsers(data.filter(u => u.id !== adminUser.id));
    } catch (err) {
      setError('Não foi possível carregar a lista de usuários.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      fetchUsers();
    }
  }, [adminUser]);

  const handleAction = async (action, userId) => {
    if (action === 'delete' && !window.confirm('Tem a certeza que quer deletar este usuário permanentemente? Esta ação não pode ser desfeita.')) {
        return;
    }
    try {
        switch (action) {
            case 'approve':
                await adminService.approveUser(userId);
                break;
            case 'reject':
                await adminService.rejectUser(userId);
                break;
            case 'delete':
                await adminService.deleteUser(userId);
                break;
            default:
                return;
        }
        fetchUsers();
    } catch (err) {
        setError(`Ocorreu um erro ao executar a ação no usuário ${userId}.`);
        console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      ativo: 'bg-green-100 text-green-800',
      pendente: 'bg-yellow-100 text-yellow-800',
      rejeitado: 'bg-red-100 text-red-800',
      inativo: 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>{status}</span>;
  };

  const filteredUsers = users.filter(user =>
    user.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div><Header /><p className="text-center mt-10">A carregar usuários...</p></div>;
  if (error) return <div><Header /><p className="text-center mt-10 text-red-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-10 px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>

          
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {error && <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert"><AlertCircle className="w-4 h-4 me-3" /><div>{error}</div></div>}

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
         
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Nome Completo</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Papel</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.nome_completo}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 capitalize">{user.role}</td>
                  <td className="px-6 py-4 capitalize">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      {(user.status === 'pendente' || user.status === 'rejeitado') && (
                        <button onClick={() => handleAction('approve', user.id)} title="Aprovar Usuário" className="p-2 text-green-600 hover:bg-green-100 rounded-full">
                            <ShieldCheck size={18} />
                        </button>
                      )}
                        {user.status === 'ativo' && (
                          <button onClick={() => handleAction('reject', user.id)} title="Rejeitar/Banir Usuário" className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full">
                            <ShieldX size={18} />
                        </button>
                        )}
                        <button onClick={() => handleAction('delete', user.id)} title="Deletar Usuário" className="p-2 text-red-600 hover:bg-red-100 rounded-full">
                            <Trash2 size={18} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p>Nenhum usuário encontrado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};