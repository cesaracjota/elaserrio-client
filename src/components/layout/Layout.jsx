import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import {
  Home,
  Users,
  School,
  BookOpen,
  ListChecks,
  BarChart2,
  Settings,
  LogIn,
} from 'lucide-react';
import { useSelector } from 'react-redux';

function Layout({ children }) {
  const { sedeSeleccionada } = useSelector(state => state.auth);

  const [isOpen, setIsOpen] = useState(() => {
    const isOpenValue = JSON.parse(localStorage.getItem('isOpen'));
    return isOpenValue ?? false;
  });

  function handleToggle() {
    setIsOpen(prevIsOpen => {
      const newIsOpen = !prevIsOpen;
      localStorage.setItem('isOpen', JSON.stringify(newIsOpen));
      return newIsOpen;
    });
  }

  const navigationItems = [
    {
      icon: Home,
      label: 'INICIO',
      path: '/',
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: Users,
      label: 'USUARIOS',
      path: `/usuarios`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: School,
      label: 'PERIODO ESCOLAR',
      path: `/periodo-escolar`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    sedeSeleccionada && {
      icon: Users,
      label: 'ESTUDIANTES',
      path: `/${sedeSeleccionada?._id}/estudiantes`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    sedeSeleccionada && {
      icon: ListChecks,
      label: 'MATRICULAS',
      path: `/${sedeSeleccionada?._id}/matriculas`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: BookOpen,
      label: 'MIS ASIGNATURAS',
      path: '/mis-asignaturas',
      allowedRoles: ['DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: BookOpen,
      label: 'ASIGNATURAS',
      path: '/mis-grados',
      allowedRoles: ['DOCENTE_TITULAR_ROLE'],
    },
    sedeSeleccionada && {
      icon: BookOpen,
      label: 'ASIGNATURAS',
      path: `/${sedeSeleccionada?._id}/asignaturas`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    sedeSeleccionada && {
      icon: School,
      label: 'GRADOS',
      path: `/${sedeSeleccionada?._id}/grados`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: School,
      label: 'SEDES',
      path: '/sedes',
      allowedRoles: ['ADMIN_ROLE'],
    },
    sedeSeleccionada && {
      icon: BarChart2,
      label: 'REPORTES',
      path: `/${sedeSeleccionada?._id}/reportes`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: Settings,
      label: 'CONFIGURACIONES',
      path: `/configuraciones`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: LogIn,
      label: 'ACCESOS',
      path: `/accesos`,
      allowedRoles: ['ADMIN_ROLE'],
    },
  ].filter(Boolean); // Elimina elementos falsy si no hay sede

  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="100vh"
      _dark={{
        bgColor: 'primary.1100',
        color: 'white',
      }}
      bgColor="#f8f9fa"
    >
      <Header
        onToggle={handleToggle}
        isOpen={isOpen}
        navigationItems={navigationItems}
      />
      <Sidebar isOpen={isOpen} navigationItems={navigationItems} />
      <Box
        as="main"
        flex="1"
        bgColor="#f8f9fa"
        _dark={{
          bg: 'primary.1100',
        }}
        px={isOpen ? 3 : 6}
        p={6}
        ml={{
          base: 0,
          lg: isOpen ? '300px' : '0',
        }}
        transition=".08s ease-out"
        mt={{
          base: '16',
          lg: '1',
        }}
      >
        {children}
      </Box>
      <Footer isOpen={isOpen} />
    </Box>
  );
}

export default Layout;
