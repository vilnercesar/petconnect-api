import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { UserMenu } from './UserMenu';

export const Header = () => {
  const { token } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PawPrint className="text-indigo-600" size={28} />
          <Link to="/" className="text-2xl font-bold text-gray-800">PetConnect</Link>
        </div>
        {/* Links de navegação podem ser adicionados aqui se necessário */}
        <div className="flex items-center space-x-3">
          {token ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">Entrar</Link>
              <Link to="/cadastro" className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Cadastre-se</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};