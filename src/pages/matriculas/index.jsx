import React from 'react'
import Layout from '../../components/layout/Layout'
import Matriculas from '../../components/matriculas/Matriculas'
import TablaEstudiantesMatriculados from '../../components/matriculas/TablaEstudiantesMatriculados'

export const MatriculaPage = () => {
  return (
    <Layout children={<Matriculas />} />
  )
}

export const MatriculaByGradoPage = () => {
  return (
    <Layout children={<TablaEstudiantesMatriculados />} />
  )
}