import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PawPrint, AlertCircle, CheckCircle } from 'lucide-react';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    password: '',
    confirmPassword: '',
    role: 'cliente',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação do lado do cliente
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (formData.password.length < 8) {
        setError('A senha deve ter no mínimo 8 caracteres.');
        return;
    }

    try {
      // Faz a requisição para a API
      const response = await axios.post('http://localhost:8000/users/', {
        nome_completo: formData.nome_completo,
        email: formData.email,
        telefone: formData.telefone,
        password: formData.password,
        role: formData.role,
      });

      // Lida com o sucesso
      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/login'); // Redireciona para a página de login após 3 segundos
      }, 3000);

    } catch (err) {
      // Lida com erros da API
      if (err.response && err.response.data && err.response.data.detail) {
        setError(`Erro no cadastro: ${err.response.data.detail}`);
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <PawPrint className="mx-auto h-12 w-auto text-indigo-600" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie a sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campos do formulário */}
            <div>
              <label htmlFor="nome_completo" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <div className="mt-1">
                <input id="nome_completo" name="nome_completo" type="text" required value={formData.nome_completo} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            {/* ... outros campos ... */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
              <div className="mt-1">
                <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            {/* Seletor de Papel */}
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">Tipo de conta</legend>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input id="role-cliente" name="role" type="radio" value="cliente" checked={formData.role === 'cliente'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                  <label htmlFor="role-cliente" className="ml-3 block text-sm font-medium text-gray-700">Quero contratar um serviço</label>
                </div>
                <div className="flex items-center">
                  <input id="role-colaborador" name="role" type="radio" value="colaborador" checked={formData.role === 'colaborador'} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"/>
                  <label htmlFor="role-colaborador" className="ml-3 block text-sm font-medium text-gray-700">Quero oferecer um serviço</label>
                </div>
              </div>
            </fieldset>

            {/* Mensagens de Erro e Sucesso */}
            {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                    <AlertCircle className="flex-shrink-0 inline w-4 h-4 me-3" />
                    <div>{error}</div>
                </div>
            )}
            {success && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    <CheckCircle className="flex-shrink-0 inline w-4 h-4 me-3" />
                    <div>{success}</div>
                </div>
            )}

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cadastrar
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Já tem uma conta?</span>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/login" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};