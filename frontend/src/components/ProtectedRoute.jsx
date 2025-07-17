import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não há token, redireciona para a página de login
  return token ? <Outlet /> : <Navigate to="/login" />;
};