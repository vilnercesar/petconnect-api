import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';

export const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  const renderRoleDashboard = () => {
    if (!user) return <p>Carregando dados...</p>;
    switch (user.role) {
      case 'cliente':
        return <div>Bem-vindo ao seu painel, Cliente!</div>;
      case 'colaborador':
        return <div>Bem-vindo ao seu painel, Colaborador!</div>;
      case 'admin':
        return <div>Bem-vindo ao seu painel, Admin!</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-10 px-6">
        <h1 className="text-3xl font-bold mb-4">Meu Painel</h1>
        {user ? (
          <>
            <p className="mb-4">Olá, <strong>{user.nome_completo}</strong>!</p>
            {renderRoleDashboard()}
          </>
        ) : (
          <p>Carregando informações do usuário...</p>
        )}
      </main>
    </div>
  );
};