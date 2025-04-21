import React from 'react';
import { Box } from "@chakra-ui/react";
import AdminDashboard from './AdminDashboard';
import DashboardDocenteTitular from './DashboardDocenteTitular';
import DashboardDocente from './DashboardDocente';
import { useSelector } from 'react-redux';

// Componente principal que decide qué dashboard mostrar
const Dashboard = () => {

  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  // Renderizado condicional basado en el rol
  const renderDashboard = () => {

    switch (user?.usuario?.rol) {
      case 'ADMIN_ROLE':
        return <AdminDashboard  />;
      case 'DOCENTE_TITULAR_ROLE':
        return <DashboardDocenteTitular />;
      case 'DOCENTE_ROLE':
        return <DashboardDocente />;
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <Box>
      {renderDashboard()}
    </Box>
  );
};

export default Dashboard;