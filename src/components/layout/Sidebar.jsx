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
  Tooltip,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import logo from '../../assets/img/logoColegio.png';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';
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

function Sidebar({ isOpen, navigationItems }) {
  const { user, sedeSeleccionada } = useSelector(state => state.auth);

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

    const activeLinkcolor = useColorModeValue('primary.500', 'primary.300');
    const bgActiveLinkColor = useColorModeValue('white', 'primary.900');

  return (
    <Box
      w={{ base: isOpen ? '0' : '0', lg: '300px' }}
      display={{
        base: isOpen ? 'block' : 'none',
      }}
      bgColor="#f8f9fa"
      _dark={{
        bgColor: 'primary.1100',
        color: 'white',
        borderRight: '0.1px solid rgba(255, 255, 255, 0.09)',
      }}
      borderRight="0.1px solid rgba(0, 0, 0, 0.09)"
      pos="fixed"
      color={'gray.700'}
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
                color="black"
                _dark={{
                  color: 'white',
                }}
                alignSelf={'start'}
                justifySelf={'start'}
                textAlign="start"
              >
                {globalInformation?.colegioNombreCorto}
              </Heading>
              <Text
                fontSize="14px"
                color="gray.800"
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
              _activeLink={{
                color: activeLinkcolor,
                bg: bgActiveLinkColor,
                fontWeight: '600',
                borderRadius: 'md',
                boxShadow: 'base',
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
          </React.Fragment>
        ))}

        <Spacer />
      </Flex>
    </Box>
  );
}

export default Sidebar;
