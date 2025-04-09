import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createSede } from '../../features/sedeSlice';

const ModalAgregarSede = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    direccion: '',
    telefono: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = () => {
    dispatch(createSede(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  return (
    <>
      <Button
        colorScheme="primary"
        _dark={{
          bg: 'primary.100',
          color: 'white',
          _hover: { bg: 'primary.300' },
        }}
        aria-label="Agregar"
        icon={<Icon as={VscAdd} fontSize="2xl" />}
        variant="solid"
        onClick={handleModalOpen}
        rounded="xl"
      >
        NUEVA SEDE
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="3xl"
        isCentered
      >
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">REGISTRAR NUEVA SEDE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                <Input
                  placeholder="ESCRIBE EL NOMBRE"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, nombre: e.target.value })
                  }
                  textTransform="uppercase"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="semibold">DIRECCIÓN</FormLabel>
                <Input
                  placeholder="Escribe la dirección"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, direccion: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold">TELEFONO</FormLabel>
                <Input
                  placeholder="Escribe el telefono"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, telefono: e.target.value })
                  }
                />
              </FormControl>
              <Stack
                spacing={4}
                direction={['column', 'row', 'row']}
                justifyContent="space-between"
              >
                <FormControl isRequired alignSelf={'center'}>
                  <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                  <Switch
                    onChange={e =>
                      setIndice({ ...indice, estado: e.target.checked })
                    }
                    isChecked={indice.estado}
                    colorScheme="primary"
                    size="lg"
                    defaultChecked={indice.estado}
                    mr={3}
                    mt={3}
                    alignSelf={'center'}
                    borderRadius="xl"
                    _dark={{
                      bg: 'primary.100',
                      color: 'white',
                      _hover: { bg: 'primary.300' },
                    }}
                    _focus={{
                      bg: 'primary.100',
                      color: 'white',
                      _hover: { bg: 'primary.300' },
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              mr={3}
              onClick={handleModalClose}
              borderRadius="xl"
            >
              CANCELAR
            </Button>
            <Button
              colorScheme="primary"
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.300' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              disabled={indice.nombre === ''}
              borderRadius="xl"
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAgregarSede;
