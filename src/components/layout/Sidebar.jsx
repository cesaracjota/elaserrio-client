import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Importar useLocation
import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  Text,
  Stack,
  useColorModeValue,
  Collapse,
  Tooltip,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/logoColegio.png';
import { FaCog } from 'react-icons/fa';
import { FaSchool, FaUserGraduate, FaUsers } from 'react-icons/fa';
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import globalInformation from '../../helpers/globalInformation';

export const NavItem = ({ icon, isOpen, label, indicatorIcon, ...rest }) => {
  return (
    <Tooltip label={!isOpen ? label : null} placement="right">
      <Flex
        justifyContent={isOpen ? 'start' : 'center'}
        align="center"
        py="10px"
        cursor="pointer"
        _hover={{
          bg: 'primary.700',
          borderRadius: 'md',
        }}
        role="group"
        px={2}
        {...rest}
      >
        {icon && <Icon mx="2" fontSize="22px" as={icon} />}
        {isOpen && <Text ml={2}>{label}</Text>}
        {/* Render the indicator icon if it exists */}
        {indicatorIcon && (
          <Icon
            ml="auto" // Pushes the icon to the right
            fontSize="22px"
            as={indicatorIcon}
          />
        )}
      </Flex>
    </Tooltip>
  );
};

function Sidebar({ isOpen }) {
  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  const navigationItems = [
    {
      icon: MdDashboard,
      label: 'INICIO',
      path: '/',
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: FaUsers,
      label: 'USUARIOS',
      path: `/usuarios`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: FaSchool,
      label: 'PERIODO ESCOLAR',
      path: `/periodo-escolar`,
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: FaUsers,
      label: 'ESTUDIANTES',
      path: `/${sedeSeleccionada?._id}/estudiantes`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: FaSchool,
      label: 'MATRICULAS',
      path: `/matriculas`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },    
    {
      icon: FaSchool,
      label: 'MIS MATERIAS',
      path: '/mis-materias',
      allowedRoles: ['DOCENTE_ROLE', 'DOCENTE_TITULAR_ROLE'],
    },
    {
      icon: FaSchool,
      label: 'MATERIAS',
      path: `/${sedeSeleccionada?._id}/materias`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_TITULAR_ROLE'], // Admin-only section
    },
    {
      icon: FaSchool,
      label: 'GRADOS',
      path: `/${sedeSeleccionada?._id}/grados`,
      allowedRoles: ['ADMIN_ROLE', 'DOCENTE_ROLE'],
    },
    {
      icon: FaSchool,
      label: 'SEDES',
      path: '/sedes',
      allowedRoles: ['ADMIN_ROLE'],
    },
    {
      icon: FaUserGraduate,
      label: 'INSTRUCTORES',
      path: '/instructores',
      allowedRoles: ['admin'],
    },
    {
      icon: FaCog,
      label: 'CONFIGURACIONES',
      path: `/configuraciones`,
      allowedRoles: ['ADMIN_ROLE'],
    },
  ];

  const filteredNavigationItems = navigationItems.filter(item => {
    if (!user?.usuario?.rol) return false; // Si no hay rol, no mostrar nada

    const userRole = user.usuario.rol; // Estandarizar el rol

    // Verificar si el rol tiene acceso
    const hasAccess = item.allowedRoles.includes(userRole);

    // Si el módulo requiere una sede y no hay una seleccionada, ocultarlo
    const requiresSede = item.path.includes('/:sedeId/');
    if (requiresSede && !sedeSeleccionada?._id) return false;

    return hasAccess;
  });

  const [openSubModule, setOpenSubModule] = useState(null);

  const handleSubModuleToggle = index => {
    setOpenSubModule(openSubModule === index ? null : index);
  };

  return (
    <Box
      w={{ base: isOpen ? '0' : '0', lg: '280px' }}
      display={{
        base: isOpen ? 'block' : 'none',
      }}
      bgColor="primary.1000"
      _dark={{
        bgColor: 'primary.1000',
        color: 'white',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      borderRight="0.1px solid rgba(0, 0, 0, 0.02)"
      color="white"
      pos="fixed"
      top="0"
      left="0"
      bottom="0"
      h="calc(100vh - 0rem)"
      overflow="hidden"
      overflowY="auto"
      zIndex="0"
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      transition="width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('#909090', '#717171'),
          borderRadius: '24px',
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb:active': {
          backgroundColor: useColorModeValue('#909090', '#717171'),
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '24px',
        },
      }}
    >
      <Flex
        direction="column"
        as="nav"
        fontSize="15px"
        px={4}
        py={2}
        aria-label="Main Navigation"
        h="100%"
      >
        <Flex
          direction="row"
          px={1.5}
          py={4}
          mb={2}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack
            alignItems={'center'}
            px={2}
            direction="row"
            spacing={6}
            w="full"
          >
            <Box w="30px" h="30px">
              <Image
                src={logo}
                alt="logo"
                w="full"
                alignSelf={'center'}
                h="full"
                objectFit="cover"
              />
            </Box>
            <Stack direction="column" spacing={0}>
              <Heading
                fontSize="16px"
                fontWeight="bold"
                color="white"
                alignSelf={'start'}
                justifySelf={'start'}
                textAlign="start"
              >
                {globalInformation?.colegioNombreCorto}
              </Heading>
              <Text
                fontSize="14px"
                color="gray.400"
                _dark={{
                  color: 'gray.400',
                }}
                alignSelf={'start'}
                justifySelf={'start'}
                textAlign="start"
              >
                {sedeSeleccionada?.nombre}
              </Text>
            </Stack>
          </Stack>
        </Flex>

        {/* Módulos del usuario */}
        {filteredNavigationItems?.map((item, index) => (
          <React.Fragment key={index}>
            <Link
              as={NavLink}
              to={item.path}
              fontSize="14px"
              mb={2}
              color="white"
              _activeLink={{
                color: 'white',
                bg: 'primary.700',
                fontWeight: '500',
                borderRadius: 'md',
              }}
              _hover={{ textDecoration: 'none' }}
              onClick={() => item.submodules && handleSubModuleToggle(index)} // Toggle submodules on click
            >
              <NavItem
                isOpen={isOpen}
                label={item.label}
                icon={item.icon}
                indicatorIcon={
                  item.submodules
                    ? openSubModule === index
                      ? MdKeyboardArrowDown
                      : MdKeyboardArrowRight
                    : null
                } // Set the indicator icon
              />
            </Link>

            {item.submodules && (
              <Collapse in={openSubModule === index}>
                <Box pl={4}>
                  {item.submodules.map((submodule, subIndex) => (
                    <Link
                      key={subIndex}
                      as={NavLink}
                      to={submodule.path}
                      display="block"
                      fontSize="14px"
                      mb={2}
                      color="gray.500"
                      _activeLink={{
                        color: 'primary.100',
                        bg: 'primary.800',
                        fontWeight: '500',
                        borderRadius: 'md',
                      }}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <NavItem
                        isOpen={isOpen}
                        label={submodule.label}
                        icon={submodule.icon}
                      />
                    </Link>
                  ))}
                </Box>
              </Collapse>
            )}
          </React.Fragment>
        ))}

        <Spacer />
      </Flex>
    </Box>
  );
}

export default Sidebar;
