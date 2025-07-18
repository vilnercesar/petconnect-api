import React, { useState, useContext } from 'react';
import { Header } from '../components/Header';
import { AuthContext } from '../context/AuthContext';
import * as userService from '../services/userService';
import { AlertCircle, CheckCircle, Edit, Trash2 } from 'lucide-react';

// --- Sub-componente para EXIBIR os dados do perfil ---
const ProfileInfoDisplay = ({ user, onEditClick }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Informações Pessoais</h3>
            <button onClick={onEditClick} className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
                <Edit size={16} className="mr-1" />
                Editar
            </button>
        </div>
        <div className="space-y-3 text-sm text-gray-600 border-t pt-4">
            <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-900">Nome Completo</dt>
                <dd className="col-span-2">{user.nome_completo}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-900">Email</dt>
                <dd className="col-span-2">{user.email}</dd>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-gray-900">Telefone</dt>
                <dd className="col-span-2">{user.telefone || 'Não informado'}</dd>
            </div>
        </div>
    </div>
);

// --- Sub-componente para o formulário de ATUALIZAÇÃO de perfil ---
const UpdateProfileForm = ({ user, onCancel, onUpdate }) => {
    const [formData, setFormData] = useState({
        nome_completo: user.nome_completo || '',
        email: user.email || '',
        telefone: user.telefone || '',
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            const response = await userService.updateUserProfile(formData);
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
            onUpdate(response.data); 
            setTimeout(() => {
                onCancel(); 
            }, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.detail || 'Erro ao atualizar perfil.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Editar Informações</h3>
            <div>
                <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" name="nome_completo" id="nome_completo" value={formData.nome_completo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                <input type="tel" name="telefone" id="telefone" value={formData.telefone || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div className="flex items-center space-x-4 pt-2">
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Salvar Alterações</button>
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
            </div>
            {message.text && (
                <div className={`flex items-center p-3 mt-4 text-sm rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {message.type === 'success' ? <CheckCircle className="w-4 h-4 me-2" /> : <AlertCircle className="w-4 h-4 me-2" />}
                    {message.text}
                </div>
            )}
        </form>
    );
};

// --- Sub-componente para a secção de DELEÇÃO de conta ---
const DeleteAccountSection = ({ logout }) => {
    const [error, setError] = useState('');
    const handleDelete = async () => {
        setError('');
        if (window.confirm('Tem a certeza que quer deletar a sua conta permanentemente? Esta ação não pode ser desfeita.')) {
            try {
                await userService.deleteUserAccount();
                alert('Conta deletada com sucesso. Você será desconectado.');
                logout();
            } catch (err) {
                setError('Não foi possível deletar a conta. Tente novamente.');
            }
        }
    };
    return (
        <div>
            <h3 className="text-lg font-semibold text-red-600">Zona de Perigo</h3>
            <p className="text-sm text-gray-500 mt-1">Ao deletar a sua conta, todas as suas informações serão removidas permanentemente. Esta ação não pode ser desfeita.</p>
            <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-sm flex items-center">
                <Trash2 size={16} className="mr-2" />
                Deletar Minha Conta
            </button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};

// --- Componente Principal da Página ---
export const ProfilePage = () => {
    const { user, logout, refreshUser } = useContext(AuthContext);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleProfileUpdate = (updatedUser) => {
        if (refreshUser) {
            refreshUser(updatedUser); 
        }
        setIsEditingProfile(false);
    };

    if (!user) {
        return <div><Header /><p className="text-center mt-10">A carregar perfil...</p></div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Gerenciar Perfil</h1>
                <div className="space-y-8">
                    {/* Secção de Informações Pessoais */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        {isEditingProfile ? (
                            <UpdateProfileForm user={user} onCancel={() => setIsEditingProfile(false)} onUpdate={handleProfileUpdate} />
                        ) : (
                            <ProfileInfoDisplay user={user} onEditClick={() => setIsEditingProfile(true)} />
                        )}
                    </div>

                    {/* Secção de Deleção de Conta */}
                    <div className="bg-white p-8 rounded-xl shadow-md border border-red-200">
                        <DeleteAccountSection logout={logout} />
                    </div>
                </div>
            </main>
        </div>
    );
};