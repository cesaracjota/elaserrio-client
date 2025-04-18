import React from 'react';
import Grados from '../../components/grados/Grados';
import Layout from '../../components/layout/Layout';
import MisGrados from '../../components/grados/MisGrados';
import MateriasPorGrado from '../../components/materias/MateriasGrado';
import EstudiantesPorGrado from '../../components/grados/EstudiantesPorGrado';

export const GradosPage = () => {
  return ( <Layout children={<Grados />} /> )
}

export const MateriasPorGradoPage = () => {
  return ( <Layout children={<MateriasPorGrado />} /> )
}

export const EstudiantesPorGradoPage = () => {
  return ( <Layout children={<EstudiantesPorGrado/>} /> )
}

export const MisGradosPage = () => {
  return ( <Layout children={<MisGrados />} /> )
}