import React from 'react';
import RegistrarEstudiante from '../../components/estudiantes/RegistrarEstudiante';
import DetallesEstudiante from '../../components/estudiantes/DetallesEstudiante';
import EditarEstudiante from '../../components/estudiantes/EditarEstudiante';
import HisotorialPagoEstudiantes from '../../components/estudiantes/HistorialPagosEstudiante';
import Estudiantes from '../../components/estudiantes/Estudiantes';
import Layout from '../../components/layout/Layout';

export const EstudiantesPage = () => {
    return ( <Layout children={<Estudiantes />} /> )
}

export const EstudiantesPageAgregar = () => {
    return ( <Layout children={<RegistrarEstudiante />} /> )
}

export const EstudiantesPageDetalles = () => {
    return ( <Layout children={<DetallesEstudiante />} /> )
}

export const EstudiantesPageEditar = () => {
    return ( <Layout children={<EditarEstudiante />} /> )
}

export const EstudiantesPageHistorialPagos = () => {
    return ( <Layout children={<HisotorialPagoEstudiantes />} /> )
}
