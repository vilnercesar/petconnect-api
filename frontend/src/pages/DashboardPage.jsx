import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import { ClientDashboard } from '../components/dashboards/ClientDashboard';
import { CollaboratorDashboard } from '../components/dashboards/CollaboratorDashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';

export const DashboardPage = () => {
  const { user, loading } = useContext(AuthContext);

  const renderDashboardByRole = () => {
    if (!user) return <p>Carregando dados do usuário...</p>;

    switch (user.role) {
      case 'cliente':
        return <ClientDashboard user={user} />;
      case 'colaborador':
        return <CollaboratorDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return <p>Seu papel de usuário não tem um painel definido.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto mt-10 px-6 py-8">
        {loading ? <p>Carregando...</p> : renderDashboardByRole()}
      </main>
    </div>
  );
};