import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  if (!user) {
    // Si no está logueado, puede ver rutas públicas
    return <Outlet />;
  }

  if (user && sedeSeleccionada) {
    return <Navigate to={'/select-sede'} replace />;
  }

  // Está logueado y tiene sede seleccionada: mandarlo al home
  return <Navigate to="/" replace />;
};

export default PublicRoute;
