// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PawPrint, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Se o login for bem-sucedido, o useEffect no AuthContext irá buscar
      // os dados do usuário e podemos redirecionar para uma página de dashboard
      navigate('/dashboard'); 
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 400)) {
        setError('Email ou senha incorretos.');
      } else {
        setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <PawPrint className="mx-auto h-12 w-auto text-indigo-600 cursor-pointer" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Acesse sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            {error && (
              <div className="flex items-center p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <AlertCircle className="flex-shrink-0 inline w-4 h-4 me-3" />
                  <div>{error}</div>
              </div>
            )}

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Entrar
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link to="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};