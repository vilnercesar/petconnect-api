import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, User, LogOut, LayoutDashboard, KeyRound } from 'lucide-react';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const getFirstName = (name) => name ? name.split(' ')[0] : '';

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline text-gray-700">Olá, {getFirstName(user.nome_completo)}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <LayoutDashboard className="mr-3 h-5 w-5" /><span>Meu Painel</span>
            </Link>
            <Link to="/perfil" onClick={() => setIsOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <User className="mr-3 h-5 w-5" /><span>Gerenciar Perfil</span>
            </Link>
            
            {/* 2. ADICIONE O NOVO LINK AQUI */}
            <Link to="/perfil/seguranca" onClick={() => setIsOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <KeyRound className="mr-3 h-5 w-5" /><span>Segurança da Conta</span>
            </Link>

            <div className="border-t border-gray-100 my-1"></div>
            <button onClick={logout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" /><span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};