import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute'; 
import { UserManagementPage } from './pages/UserManagementPage'; 
import { ProfilePage } from './pages/ProfilePage'; 
import { SecurityPage } from './pages/SecurityPage';
import { MyRequestsPage } from './pages/MyRequestsPage';
import { RequestServicePage } from './pages/RequestServicePage'; 
import { CollaboratorRequestsPage } from './pages/CollaboratorRequestsPage';
import { OngoingServicesPage } from './pages/OngoingServicesPage';
function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/usuarios" element={<UserManagementPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/perfil/seguranca" element={<SecurityPage />} />
        <Route path="/cliente/minhas-solicitacoes" element={<MyRequestsPage />} />
         <Route path="/cliente/solicitar-servico" element={<RequestServicePage />} />
         <Route path="/colaborador/solicitacoes" element={<CollaboratorRequestsPage />} />
         <Route path="/colaborador/servicos-aceitos" element={<OngoingServicesPage />} />
      </Route>
    </Routes>
  );
}

export default App;