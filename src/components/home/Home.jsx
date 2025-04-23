import React, { useEffect, useMemo } from 'react';
import { Box, Spinner, Center, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportesAdminBySede, getAllReportesDocenteBySede, getAllReportesDocenteTitularBySede } from '../../features/reporteSlice';

import AdminDashboard from './AdminDashboard';
import DashboardDocenteTitular from './DashboardDocenteTitular';
import DashboardDocente from './DashboardDocente';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, sedeSeleccionada } = useSelector(state => state.auth);
  const { reportesAdmin, reportesDocenteTitular, reportesDocente, isLoading } = useSelector(state => state.reportes);

  const sedeId = sedeSeleccionada?._id;
  const rol = user?.usuario?.rol;

  // ✅ Despacha solo si hay sede válida y es ADMIN
  useEffect(() => {
    if (sedeId && rol === 'ADMIN_ROLE') {
      dispatch(getAllReportesAdminBySede(sedeId));
    }
    if (rol === 'DOCENTE_TITULAR_ROLE') {
      dispatch(getAllReportesDocenteTitularBySede(sedeId));
    }
    if (rol === 'DOCENTE_ROLE') {
      dispatch(getAllReportesDocenteBySede(sedeId));
    }
  }, [dispatch, sedeId, rol]);

  // ✅ Renderiza dashboard según rol
  const dashboardContent = useMemo(() => {
    if (!rol) {
      return (
        <Center mt={10}>
          <Text color="gray.500">Cargando rol del usuario...</Text>
        </Center>
      );
    }

    switch (rol) {
      case 'ADMIN_ROLE':
        return isLoading ? (
          <Center h="60vh">
            <Spinner size="xl" color="blue.500" />
          </Center>
        ) : (
          <AdminDashboard reportes={reportesAdmin} />
        );
      case 'DOCENTE_TITULAR_ROLE':
        return <DashboardDocenteTitular reportes={reportesDocenteTitular} />;
      case 'DOCENTE_ROLE':
        return <DashboardDocente reportes={reportesDocente} />;
      default:
        return (
          <Center mt={10}>
            <Text color="red.500" fontWeight="medium">
              Rol no reconocido: {rol}
            </Text>
          </Center>
        );
    }
  }, [rol, isLoading, reportesAdmin]);

  return (
    <Box>
      {dashboardContent}
    </Box>
  );
};

export default Dashboard;
