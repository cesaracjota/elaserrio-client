import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonasPage from '../pages/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import UniformesPage from '../pages/uniformes';
import {
  ActivosPage,
  AgregarActivoPage,
  DetallesActivosPage,
  EditarActivoPage,
} from '../pages/activos';
import MiPerfilPage from '../pages/perfil';
import {
  EstudiantesPage,
  EstudiantesPageAgregar,
  EstudiantesPageDetalles,
  EstudiantesPageEditar,
  EstudiantesPageHistorialPagos,
} from '../pages/estudiantes';
import CategoriasEquipoPage from '../pages/activos/categorias';
import CategoriasUniformePage from '../pages/uniformes/categorias';
import { BoletaPagoPage, PagosPage, PagosPageDetalles } from '../pages/pagos';
import { ReportesEBRPage } from '../pages/reportes';
import '../styles/globals.css';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import ResetPasswordPage from '../pages/auth/ResetPassword';
import PrivateTokenRoutes from './PrivateRoutesToken';
import PeriodoEscolarPage from '../pages/academico';
import { ConceptoPagosPage } from '../pages/pagos/concepto';
import { MatriculaPage } from '../pages/matriculas';
import { EgresosPage, EgresosPageDetalles } from '../pages/egresos';
import { TramitesPage } from '../pages/tramites';
import { RolPage } from '../pages/RolPage';
import { ModuloPage } from '../pages/ModuloPage';
import SelectSede from '../pages/auth/SelectSede';
import { MateriaPage, DetalleMateriaPage, MisMateriasPage, RegistrarCalificacionPage } from '../pages/MateriaPage';
import { SedePage } from '../pages/SedePage';
import { GradosPage, MisGradosPage, MateriasPorGradoPage, EstudiantesPorGradoPage } from '../pages/grados';
import { ConfiguracionPage } from '../pages/ConfiguracionPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<ReportesEBRPage />} />
        <Route path="/configuraciones" element={<ConfiguracionPage />} />
        <Route path="/perfil" element={<MiPerfilPage />} />
        <Route path="/usuarios" element={<PersonasPage />} />
        <Route path="/periodo-escolar" element={<PeriodoEscolarPage />} />
        <Route path="/:idSede/grados" element={<GradosPage />} />
        <Route path='/:idSede/grados/:id' element={<EstudiantesPorGradoPage />} />
        <Route path='/mis-grados' element={<MisGradosPage />} />        
        <Route
          path="/mis-grados/:idSede/grados/:id"
          element={<MateriasPorGradoPage />}
        />
          <Route path="/mis-grados/:idSede/grados/:id/mis-materias/:id" element={<DetalleMateriaPage />} />
        <Route
          path="/:idSede/grados/:id/agregar"
          element={<EstudiantesPageAgregar />}
        />
        <Route path="/:idSede/roles" element={<RolPage />} />
        <Route path="/:idSede/modulos" element={<ModuloPage />} />

        <Route path="/:idSede/matriculas/" element={<MatriculaPage />} />
        <Route path="/:idSede/materias" element={<MateriaPage />} />
        <Route path="/mis-materias" element={<MisMateriasPage />} />
        <Route path="/mis-materias/:id" element={<DetalleMateriaPage />} />
        <Route path="/mis-materias/:id/registrar-calificacion/:idMateria" element={<RegistrarCalificacionPage />} />
        <Route path="/sedes" element={<SedePage />} />
        <Route path="/matriculas" element={<MatriculaPage />} />

        <Route path="/uniformes/" element={<UniformesPage />} />

        <Route path="/equipos/" element={<ActivosPage />} />
        <Route path="/equipos/:id" element={<DetallesActivosPage />} />
        <Route path="/equipos/agregar" element={<AgregarActivoPage />} />
        <Route path="/equipos/editar/:id" element={<EditarActivoPage />} />
        <Route path="/equipos/categorias" element={<CategoriasEquipoPage />} />

        <Route path="/:idSede/estudiantes" element={<EstudiantesPage />} />
        <Route
          path="/:idSede/estudiantes/nuevo"
          element={<EstudiantesPageAgregar />}
        />
        <Route
          path="/:idSede/estudiantes/:id"
          element={<EstudiantesPageDetalles />}
        />
        <Route
          path="/:idSede/estudiantes/editar/:id"
          element={<EstudiantesPageEditar />}
        />
        <Route
          path="/estudiantes/pagos/:id"
          element={<EstudiantesPageHistorialPagos />}
        />

        <Route path="/egresos/" element={<EgresosPage />} />
        <Route path="/egresos/:id" element={<EgresosPageDetalles />} />

        <Route path="/tramites/" element={<TramitesPage />} />

        <Route
          path="/uniformes/categorias"
          element={<CategoriasUniformePage />}
        />
        <Route path="/pagos/" element={<PagosPage />} />
        <Route path="/pagos/:id" element={<PagosPageDetalles />} />
        <Route path="/pagos/boleta/:id" element={<BoletaPagoPage />} />

        <Route path="/concepto_pagos/" element={<ConceptoPagosPage />} />

        <Route
          path="/:idSede/configuraciones"
          element={<ConceptoPagosPage />}
        />

        <Route path="/reportes" element={<ReportesEBRPage />} />

        <Route path="/select-sede" element={<SelectSede />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:email/:token"
          element={<PrivateTokenRoutes />}
        >
          <Route
            path="/reset-password/:email/:token"
            element={<ResetPasswordPage />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
