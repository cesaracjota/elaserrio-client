import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const { user, sedeSeleccionada } = useSelector(state => state.auth);

    // Si no hay usuario, mostrar las rutas públicas
    if (!user) {
        return <Outlet />;
    }

    // Si el usuario está autenticado pero no tiene sede seleccionada, redirigir al selector de sedes
    if (user && sedeSeleccionada) {
        return <Navigate to="/select-sede" replace />;
    }

    // Si el usuario está autenticado pero no tiene sede seleccionada, redirigir al inicio
    if (user && !sedeSeleccionada) {
        return <Navigate to={`/${sedeSeleccionada?._id}/`} replace />;
    }

    // Si el usuario está autenticado y tiene sede seleccionada, redirigir al inicio
    return <Navigate to={`/${sedeSeleccionada?._id}/`} replace />;
};

export default PublicRoute;