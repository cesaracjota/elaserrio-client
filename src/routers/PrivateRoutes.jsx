import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = ({ allowedRoles = [], children }) => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  if (!user) {
    // Si no hay usuario, redirige al login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = user?.usuario?.rol || ''; // Aseguramos que tenga algo
  const hasAccess = allowedRoles.includes(userRole);

  if (!hasAccess) {
    // Si no tiene permisos, redirige a página de "No autorizado"
    return (
      <Navigate to="/no-tiene-permisos" replace state={{ from: location }} />
    );
  }

  // Acceso permitido: renderiza el contenido
  return children ? children : <Outlet />;
};

export default PrivateRoutes;
