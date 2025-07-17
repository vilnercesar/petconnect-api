import React from 'react';
import { PawPrint } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PawPrint className="text-indigo-600" size={28} />
          <a href="#" className="text-2xl font-bold text-gray-800">PetConnect</a>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-gray-600 hover:text-indigo-600 transition-colors">Serviços</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">Como Funciona</a>
          <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">Sobre Nós</a>
        </div>
        <div className="flex items-center space-x-3">
          <a href="#" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">Entrar</a>
          <a href="#" className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Cadastre-se</a>
        </div>
      </nav>
    </header>
  );
};