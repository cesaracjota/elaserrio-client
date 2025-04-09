import React from 'react';
import Grados from '../../components/grados/Grados';
import Layout from '../../components/layout/Layout';
import EstudiantesPorGrado from '../../components/grados/EstudiantesPorGrado';

export const GradosPage = () => {
  return ( <Layout children={<Grados />} /> )
}

export const EstudiantesPorGradoPage = () => {
  return ( <Layout children={<EstudiantesPorGrado />} /> )
}