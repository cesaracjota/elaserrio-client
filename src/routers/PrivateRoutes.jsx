import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {
    const { user } = useSelector(state => state.auth);
    const location = useLocation();

    // Si no hay usuario autenticado, redirigir al login
    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Si el usuario está autenticado, permitir acceso a rutas privadas
    return <Outlet />;
};

export default PrivateRoutes;