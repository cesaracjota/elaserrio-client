import React, { useState, useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Button,
  Stack,
  Text,
  Divider,
  Badge,
  Avatar,
  Tooltip,
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';

export const ModalDetallesPersona = ({ persona }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const btnRef = useRef();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Ver Detalles" placement="auto">
        <IconButton
          aria-label="Ver"
          icon={<CgEyeAlt />}
          fontSize="xl"
          bg="primary.100"
          color="white"
          _hover={{ bg: 'primary.200' }}
          _dark={{
            bg: 'primary.100',
            color: 'white',
            _hover: { bg: 'primary.200' },
          }}
          variant={'ghost'}
          onClick={handleOpenDrawer}
          ml={2}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpenDrawer}
        placement="bottom"
        onClose={handleCloseDrawer}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent _dark={{ bg: 'primary.1000' }}>
          <DrawerHeader
            fontWeight="bold"
            bg="primary.100"
            color="gray.200"
            textAlign="center"
          >
            INFORMACIÓN BASICA DEL USUARIO SELECCIONADO
          </DrawerHeader>
          <DrawerBody>
            <Stack direction="column" mt={6} px={[0, 10, 40, 60]}>
              <Stack direction="row" justifyContent="center">
                <Avatar
                  size="2xl"
                  color="white"
                  name={persona?.nombre}
                  src={persona?.img}
                  textAlign="center"
                  fontWeight="bold"
                />
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">NOMBRES:</Text>
                <Text>{persona?.nombre}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">CORREO:</Text>
                <Text>{persona?.correo}</Text>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">ESTADO:</Text>
                <Badge
                  colorScheme={persona?.estado === true ? 'green' : 'red'}
                  variant="solid"
                  px={6}
                  py={1.5}
                  rounded="full"
                >
                  {persona?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                </Badge>
              </Stack>
              <Divider />
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">ROL:</Text>
                <Badge
                  colorScheme={
                    persona?.rol === 'ADMIN_ROLE'
                      ? 'messenger.600'
                      : persona?.rol === 'USER_ROLE'
                      ? 'red.600'
                      : 'teal.600'
                  }
                  variant="solid"
                  px={6}
                  py={2}
                  rounded="full"
                >
                  {persona?.rol === 'ADMIN_ROLE'
                    ? 'ADMINISTRADOR'
                    : persona?.rol === 'USER_ROLE'
                    ? 'USUARIO'
                    : 'DOCENTE'}
                </Badge>
              </Stack>
              <Divider />
            </Stack>
          </DrawerBody>

          <DrawerFooter
            w="full"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            display="flex"
          >
            <Button
              bg="primary.100"
              color="white"
              _hover={{ bg: 'primary.200' }}
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.200' },
              }}
              size="lg"
              onClick={handleCloseDrawer}
              borderRadius="xl"
            >
              OK
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
