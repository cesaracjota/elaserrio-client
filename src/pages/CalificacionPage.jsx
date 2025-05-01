import React from 'react';
import Layout from '../components/layout/Layout';
import RegistrarCalificacionInicial from '../components/calificaciones/RegistrarCalificacionInicial';
import RegistrarCalificacion from '../components/calificaciones/RegistrarCalificacion';

export const RegistrarCalificacionInicialPage = () => {
    return ( <Layout children={<RegistrarCalificacionInicial />} /> )
}

export const RegistrarCalificacionPage = () => {
    return ( <Layout children={<RegistrarCalificacion />} /> )
}