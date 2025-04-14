import React from 'react';
import Layout from '../components/layout/Layout';
import MisMaterias from '../components/materias/MisMaterias';
import Materias from '../components/materias/Materias';
import DetalleMateria from '../components/materias/DetalleCurso';
import RegistrarCalificacion from '../components/calificaciones/RegistrarCalificacion';

export const MateriaPage = () => {
    return ( <Layout children={<Materias />} /> )
}

export const MisMateriasPage = () => {
    return ( <Layout children={<MisMaterias />} /> )
}

export const RegistrarCalificacionPage = () => {
    return ( <Layout children={<RegistrarCalificacion />} /> )
}

export const DetalleMateriaPage = () => {
    return ( <Layout children={<DetalleMateria />} /> )
}