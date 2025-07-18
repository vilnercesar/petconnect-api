import React, { useState } from 'react';
import { Header } from '../components/Header';
import * as userService from '../services/userService';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Componente do formulário de alteração de senha
const ChangePasswordForm = () => {
    const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '', confirm_new_password: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        if (passwordData.new_password !== passwordData.confirm_new_password) {
            setMessage({ type: 'error', text: 'A nova senha e a confirmação não coincidem.' });
            return;
        }
        try {
            await userService.changeUserPassword(passwordData);
            setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
            setPasswordData({ current_password: '', new_password: '', confirm_new_password: '' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.detail || 'Erro ao alterar a senha.' });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Senha Atual</label>
                <input type="password" name="current_password" id="current_password" value={passwordData.current_password} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">Nova Senha</label>
                <input type="password" name="new_password" id="new_password" value={passwordData.new_password} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="confirm_new_password" className="block text-sm font-medium text-gray-700">Confirmar Nova Senha</label>
                <input type="password" name="confirm_new_password" id="confirm_new_password" value={passwordData.confirm_new_password} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm">Alterar Senha</button>
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

// Componente principal da página
export const SecurityPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto mt-10 px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Segurança da Conta</h1>
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <ChangePasswordForm />
                </div>
            </main>
        </div>
    );
};