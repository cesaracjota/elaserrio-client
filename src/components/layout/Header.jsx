import {
  Flex,
  Spacer,
  IconButton,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Text,
  Stack,
  DrawerCloseButton,
  Avatar,
  DrawerHeader,
  DrawerBody,
  Box,
  Heading,
  Tooltip,
  Button,
  DrawerFooter,
  useColorModeValue,
  HStack,
  Link,
  Image,
} from '@chakra-ui/react';
import { RiFullscreenExitLine, RiFullscreenFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaCog } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../../theme/ColorModeSwitcher';
import { logout } from '../../features/authSlice';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import logo from '../../assets/img/logoColegio.png';

function Header({ onToggle, isOpen, navigationItems }) {
  const sidebar = useDisclosure();

  const [isSpanded, setIsSpanded] = useState(false);

  const { user, sedeSeleccionada } = useSelector(state => state.auth);
  const { configuracion } = useSelector(state => state.configuraciones);

  const activeLinkcolor = useColorModeValue('primary.100', 'primary.100');
  const bgActiveLinkColor = useColorModeValue('#dcdee1', '#151822');

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsSpanded(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsSpanded(true);
    }
  };

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

  return (
    <Flex
      as="header"
      _dark={{
        bgColor: 'rgba(11,15,25, 0)',
        color: 'primary.100',
        backdropBlur: 'blur(50px)',
      }}
      bg="rgba(248, 249, 250, 0.5)"
      backdropFilter="blur(10px)"
      position={{
        base: 'fixed',
        lg: 'sticky',
      }}
      ml={{
        base: 0,
        lg: isOpen ? '300px' : '0',
      }}
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
      px={5}
      py={3}
      align="center"
      justify="space-between"
      transition=".08s ease-out"
      // boxShadow={'0px 1px 4px 1px rgba(0, 0, 0, 0.2)'}
    >
      <IconButton
        display={{
          base: 'none',
          lg: 'inline-flex',
        }}
        size={'md'}
        rounded={'full'}
        onClick={() => {
          onToggle();
        }}
        variant="ghost"
        colorScheme="gray"
        aria-label="Toggle navigation"
        transition=".08s ease-out"
        icon={
          <Icon fontSize={24} as={isOpen ? RiMenuFoldLine : RiMenuUnfoldLine} />
        }
        mr={2}
      />

      <Spacer />

      {/* Add other header elements here */}

      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
        size="xs"
      >
        <DrawerOverlay
          bg="rgba(11,15,25, 0.9)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <DrawerContent
          bg={useColorModeValue('white', 'primary.1100')}
          display="flex"
          w="full"
          h="full"
          overflowY="auto"
        >
          <Stack spacing={1} px={4} py={2} w="full">
            <Flex
              direction="row"
              py={4}
              mb={2}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Stack alignItems={'center'} direction="row" spacing={4} w="full">
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="lg"
                  borderColor={'gray.200'}
                  _dark={{
                    borderColor: 'gray.700',
                  }}
                  borderWidth="1px"
                  p={'4px'}
                >
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
                    color="primary.100"
                    _dark={{
                      color: 'white',
                    }}
                    alignSelf={'start'}
                    justifySelf={'start'}
                    textAlign="start"
                  >
                    {configuracion?.nombreColegio}
                  </Heading>
                  <Text
                    fontSize="14px"
                    color="gray.500"
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
            {filteredNavigationItems?.map((item, index) => (
              <Link
                key={index}
                as={NavLink}
                to={item.path}
                _activeLink={{
                  color: activeLinkcolor,
                  bg: bgActiveLinkColor,
                  borderRadius: 'lg',
                  _dark: {
                    color: 'primary.600',
                  },
                }}
                color={'#6c737f'}
                _dark={{
                  color: 'gray.400',
                }}
                w="full"
                py={2}
                textAlign="center"
                fontWeight="600"
                _hover={{
                  color: activeLinkcolor,
                  bg: bgActiveLinkColor,
                  borderRadius: 'lg',
                }}
              >
                {item.label}
              </Link>
            ))}
          </Stack>
        </DrawerContent>
      </Drawer>

      <IconButton
        aria-label="Menu"
        display={{ base: 'flex', lg: 'none' }}
        onClick={sidebar.onOpen}
        fontSize="2xl"
        variant="ghost"
        rounded={'full'}
        icon={<HamburgerIcon />}
      />

      <Flex
        alignSelf="center"
        verticalAlign={'center'}
        justify={'flex-end'}
        justifyContent={'flex-end'}
        w={'full'}
        display="inline-flex"
      >
        <HStack spacing={4}>
          <IconButton
            aria-label="Full Screen"
            fontSize="xl"
            variant="ghost"
            rounded={'full'}
            icon={
              isSpanded === true ? (
                <RiFullscreenExitLine />
              ) : (
                <RiFullscreenFill />
              )
            }
            colorScheme="gray"
            onClick={handleFullScreen}
          />
          <ColorModeSwitcher />
          <DrawerExample user={user?.usuario} />
        </HStack>
      </Flex>
    </Flex>
  );
}

export default Header;

function DrawerExample({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const dispatch = useDispatch();

  const lightenDarkenColor = (colorCode, amount) => {
    let usePound = false;

    if (colorCode[0] === '#') {
      colorCode = colorCode.slice(1);
      usePound = true;
    }
    const num = parseInt(colorCode, 16);
    let r = (num >> 16) + amount;

    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }

    let b = ((num >> 8) & 0x00ff) + amount;

    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }

    let g = (num & 0x0000ff) + amount;

    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
    let color = (g | (b << 8) | (r << 16)).toString(16);
    while (color.length < 6) {
      color = 0 + color;
    }
    return (usePound ? '#' : '') + color;
  };

  const bgColorModified = lightenDarkenColor(`${user?.brand_color}`, -80);
  const bgTransparency = useColorModeValue(
    'rgba(0, 0, 0, .07)',
    'rgba(255, 255, 255, .1)'
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Avatar
        src={user?.img}
        name={user?.nombre}
        ignoreFallback={true}
        onClick={onOpen}
        borderColor={bgColorModified}
        color={'white'}
        fontWeight={'bold'}
        fontSize={'md'}
        size={'sm'}
        rounded="full"
        cursor={'pointer'}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size={'sm'}
      >
        <DrawerOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <DrawerContent>
          <DrawerCloseButton size={'lg'} mt={1} />
          <DrawerHeader borderBottomWidth="1px" _dark={{ bg: 'primary.1100' }}>
            Mi Perfil
          </DrawerHeader>
          <DrawerBody _dark={{ bg: 'primary.1100' }} bg="#f9f9f9">
            <Box bgColor={bgColorModified} h="160px" mx={-6} />
            <Stack
              direction={'row'}
              align={'start'}
              justifyContent={'space-between'}
            >
              <Avatar
                src={user?.img}
                name={user?.nombre}
                size={'xl'}
                mt={-14}
                fontWeight={'extrabold'}
                objectFit="cover"
                color={'white'}
                borderWidth={6}
                borderColor={bgTransparency}
              />
            </Stack>
            <Stack mt={4} spacing={6} alignSelf={'center'}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent={'space-between'}
              >
                <Box>
                  <Heading
                    fontSize="xl"
                    fontWeight="bold"
                    textTransform={'capitalize'}
                  >
                    {user?.nombre}
                  </Heading>
                  <Text fontSize="md">{user?.correo}</Text>
                </Box>
                <Box alignSelf={'center'}>
                  <Tooltip
                    placement="left"
                    label="Editar y Ver Detalles"
                    aria-label="Editar y Ver Detalles"
                    alignSelf={'center'}
                  >
                    <Link as={NavLink} to={'/perfil'}>
                      <IconButton
                        aria-label="Editar y Ver Detalles"
                        alignSelf={'center'}
                        rounded={'full'}
                        variant="ghost"
                        colorScheme="gray"
                        icon={<FaCog size={24} />}
                        size={'lg'}
                      />
                    </Link>
                  </Tooltip>
                </Box>
              </Stack>

              <Box>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  align={'center'}
                >
                  <Text fontSize="xl" fontWeight="bold" alignSelf={'center'}>
                    {user?.rol === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO'}
                  </Text>
                </Stack>
              </Box>

              <Box>
                <Heading fontSize="xl" fontWeight="bold">
                  Support
                </Heading>
                <Text fontSize="md" color="gray.500">
                  Found an issue, have a question or just want to chat?
                </Text>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter
            borderTopWidth="1px"
            _dark={{ bg: 'primary.1100' }}
            display="flex"
          >
            <Tooltip
              label="Cerrar Sesión"
              aria-label="Cerrar Sesión"
              alignSelf={'center'}
              placement={'top'}
            >
              <Button
                rightIcon={<FiLogOut />}
                w="full"
                bg="red.500"
                _hover={{ bg: 'red.700', color: 'white' }}
                color="white"
                _dark={{
                  bg: 'red.500',
                  _hover: { bg: 'red.700', color: 'white' },
                }}
                rounded={'xl'}
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </Tooltip>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
