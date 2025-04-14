import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
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
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateSede } from '../../features/sedeSlice';

const ModalEditarSede = ({ row }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombre: '',
    codigoDane: '',
    direccion: '',
    telefono: '',
    estado: null,
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = data => {
    setIsModalOpen(true);
    setIndice(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateSede(indice));
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="blackAlpha"
          _dark={{ color: 'white', _hover: { bg: 'whiteAlpha.200' } }}
          aria-label="Editar"
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant={'ghost'}
          onClick={() => handleModalOpen(row)}
          ml={2}
        />
      </Tooltip>
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
          <ModalHeader textAlign="center">ACTUALIZAR SEDE</ModalHeader>
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
                  defaultValue={indice ? indice.nombre : ''}
                  onChange={e =>
                    setIndice({ ...indice, nombre: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold">CODIGO DANE</FormLabel>
                <Input
                  placeholder="Escribe el codigo dane"
                  type="text"
                  defaultValue={indice ? indice.codigoDane : ''}
                  onChange={e =>
                    setIndice({ ...indice, codigoDane: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="semibold">DIRECCIÓN</FormLabel>
                <Input
                  placeholder="Escribe la dirección"
                  type="text"
                  defaultValue={indice ? indice.direccion : ''}
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
                  defaultValue={indice ? indice.telefono : ''}
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
                bg: 'primary.500',
                color: 'white',
                _hover: { bg: 'primary.600' },
              }}
              size="lg"
              mr={3}
              onClick={handleUpdate}
              borderRadius="xl"
            >
              ACTUALIZAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarSede;
