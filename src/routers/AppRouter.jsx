import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Páginas
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/Login';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import ResetPasswordPage from '../pages/auth/ResetPassword';
import SelectSede from '../pages/auth/SelectSede';
import NotFoundPage from '../pages/404/NotFoundPage';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import PrivateTokenRoutes from './PrivateRoutesToken';

import MiPerfilPage from '../pages/perfil';
import {
  EstudiantesPage,
  EstudiantesPageAgregar,
  EstudiantesPageDetalles,
  EstudiantesPageEditar,
} from '../pages/estudiantes';
import { MatriculaPage } from '../pages/matriculas';
import { ReportesPage } from '../pages/ReportesPage';
import {
  MateriaPage,
  DetalleMateriaPage,
  MisMateriasPage,
  DocenteTitularMateriasPage,
} from '../pages/MateriaPage';
import { SedePage } from '../pages/SedePage';
import {
  GradosPage,
  MisGradosPage,
  MateriasPorGradoPage,
  EstudiantesPorGradoPage,
} from '../pages/grados';
import { ConfiguracionPage } from '../pages/ConfiguracionPage';
import { AccesoPage } from '../pages/AccesoPage';
import { NoTienePermisosPage } from '../pages/NoTienePermisosPage';
import PersonasPage from '../pages/personas';
import PeriodoEscolarPage from '../pages/academico';
import { RegistrarCalificacionInicialPage, RegistrarCalificacionPage } from '../pages/CalificacionPage';

export default function AppRouter() {
  const { user } = useSelector(state => state.auth);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Rutas públicas con token */}
      <Route element={<PrivateTokenRoutes />}>
        <Route
          path="/reset-password/:email/:token"
          element={<ResetPasswordPage />}
        />
      </Route>

      {/* Rutas privadas generales */}
      <Route
        element={
          <PrivateRoutes
            allowedRoles={[
              'ADMIN_ROLE',
              'DOCENTE_TITULAR_ROLE',
              'DOCENTE_ROLE',
            ]}
            userRole={user?.usuario?.rol}
          />
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/perfil" element={<MiPerfilPage />} />
        <Route path="/select-sede" element={<SelectSede />} />
        <Route path="/no-tiene-permisos" element={<NoTienePermisosPage />} />
      </Route>

      {/* rutas privadas de docentes titulares y administradores */}
      <Route
        element={
          <PrivateRoutes
            allowedRoles={['DOCENTE_TITULAR_ROLE', 'ADMIN_ROLE']}
            userRole={user?.usuario?.rol}
          />
        }
      >
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

        <Route path="/:idSede/matriculas" element={<MatriculaPage />} />
      </Route>

      {/* rutas privadas de docentes y docentes titulares */}
      <Route
        element={
          <PrivateRoutes
            allowedRoles={['DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE']}
            userRole={user?.usuario?.rol}
          />
        }
      >
        <Route path="/mis-asignaturas" element={<MisMateriasPage />} />
        <Route path="/mis-asignaturas/:id" element={<DetalleMateriaPage />} />
        <Route
          path="/mis-asignaturas/:id/registrar-calificacion/:idMateria"
          element={<RegistrarCalificacionPage />}
        />
        <Route
          path="/mis-asignaturas/:id/registrar-calificacion-inicial/:idMateria"
          element={<RegistrarCalificacionInicialPage />}
        />
      </Route>

      {/* rutas privadas de docentes titulares */}
      <Route
        element={
          <PrivateRoutes
            allowedRoles={['DOCENTE_TITULAR_ROLE']}
            userRole={user?.usuario?.rol}
          />
        }
      >
        <Route path="/:idSede/matriculas" element={<MatriculaPage />} />
        <Route
          path="/mis-grados/:idSede/grados/:id"
          element={<EstudiantesPorGradoPage />}
        />
        <Route path="/mis-grados" element={<MisGradosPage />} />
        <Route
          path="/mis-grados/:idSede/grados/:id/mis-materias/:id"
          element={<DetalleMateriaPage />}
        />
        <Route
          path="/mis-grados/:idSede/grados/:id/asignaturas/listView"
          element={<DocenteTitularMateriasPage />}
        />
        <Route
          path="/mis-grados/:idSede/grados/:id/asignaturas/gridView"
          element={<MateriasPorGradoPage />}
        />
      </Route>

      {/* Rutas privadas exclusivas para ADMIN */}
      <Route
        element={
          <PrivateRoutes
            allowedRoles={['ADMIN_ROLE']}
            userRole={user?.usuario?.rol}
          />
        }
      >
        <Route path="/:idSede/asignaturas" element={<MateriaPage />} />

        <Route path="/:idSede/grados" element={<GradosPage />} />

        <Route
          path="/:idSede/grados/:id"
          element={<EstudiantesPorGradoPage />}
        />
        <Route
          path="/:idSede/grados/:id/agregar"
          element={<EstudiantesPageAgregar />}
        />

        <Route path="/usuarios" element={<PersonasPage />} />
        <Route path="/periodo-escolar" element={<PeriodoEscolarPage />} />
        <Route path="/sedes" element={<SedePage />} />
        <Route path="/configuraciones" element={<ConfiguracionPage />} />
        <Route path="/accesos" element={<AccesoPage />} />
        <Route path="/:idSede/reportes" element={<ReportesPage />} />
      </Route>

      {/* Ruta catch all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
