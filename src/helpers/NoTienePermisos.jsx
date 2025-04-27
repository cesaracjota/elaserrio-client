import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
  Box,
  Badge,
  HStack,
  useColorMode,
} from '@chakra-ui/react';
import { FaLock, FaArrowLeft, FaHome, FaUserShield } from 'react-icons/fa';
import { RiShieldKeyholeLine } from 'react-icons/ri';

const NoTienePermisos = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  // Configuración de colores
  const colors = {
    light: {
      bg: 'white',
      text: 'gray.800',
      accent: 'red.500',
      secondaryText: 'gray.600',
      buttonBg: 'primary.500',
      buttonHover: 'primary.600',
      buttonText: 'white',
    },
    dark: {
      bg: 'primary.900',
      text: 'white',
      accent: 'red.300',
      secondaryText: 'gray.300',
      buttonBg: 'primary.500',
      buttonHover: 'primary.400',
      buttonText: 'gray.300',
    },
  };

  const currentColors = colors[colorMode] || colors.light;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={currentColors.bg}
      py={8}
      color={currentColors.text}
      textAlign="center"
      position="relative"
      overflow="hidden"
      borderRadius={'2xl'}
    >
      {/* Fondo decorativo */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        opacity={colorMode === 'dark' ? 0.5 : 0.9}
        bgImage="url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgwLDAsMCwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')"
        zIndex="0"
      />

      {/* Contenido principal */}
      <VStack spacing={8} maxW="3xl" mx="auto" position="relative" zIndex="1">
        <Box position="relative">
          <Icon as={FaLock} w={24} h={24} color={currentColors.accent} mb={6} />
          <Badge
            colorScheme="red"
            variant="solid"
            position="absolute"
            top="-2"
            right="-6"
            borderRadius="full"
            px={3}
            fontSize="md"
            transform="rotate(15deg)"
          >
            <Icon as={RiShieldKeyholeLine} mr={1} />
            403 - Prohibido
          </Badge>
        </Box>

        <Heading as="h1" size="2xl" fontWeight="black" lineHeight="1.2">
          Acceso Restringido
        </Heading>

        <Text fontSize="xl" maxW="2xl" color={currentColors.secondaryText}>
          No tienes los permisos necesarios para acceder a esta página.
        </Text>

        <Box
          bg={
            colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'
          }
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
          maxW="xl"
          w="full"
        >
          <HStack spacing={3} justify="center">
            <Icon as={FaUserShield} color={currentColors.accent} />
            <Text fontSize="md">
              Se requieren privilegios de administrador para acceder a este
              recurso
            </Text>
          </HStack>
        </Box>

        <HStack spacing={4} mt={8} wrap="wrap" justify="center">
          <Button
            leftIcon={<FaArrowLeft />}
            size="lg"
            px={8}
            py={6}
            bg={currentColors.buttonBg}
            color={currentColors.buttonText}
            _hover={{
              bg: currentColors.buttonHover,
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
            onClick={() => navigate(-1)}
          >
            Volver atrás
          </Button>

          <Button
            leftIcon={<FaHome />}
            size="lg"
            px={8}
            py={6}
            variant="outline"
            borderWidth="2px"
            _hover={{
              bg: colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.50',
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
            onClick={() => navigate('/')}
          >
            Ir al inicio
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default NoTienePermisos;
