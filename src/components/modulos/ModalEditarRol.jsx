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
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateModulo } from '../../features/moduloSlice';

const ModalEditarModulo = ({ row }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    position: '',
    name: '',
    icon: '',
    path: '',
    estado: ''
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
    dispatch(updateModulo(indice));
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
        size="5xl"
        isCentered
      >
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">ACTUALIZAR ROL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">POSICIÓN</FormLabel>
                  <Input
                    defaultValue={indice ? indice.position : ''}
                    placeholder="0"
                    type="number"
                    onChange={e =>
                      setIndice({ ...indice, position: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    defaultValue={indice ? indice.name : ''}
                    placeholder="Escribe el nombre del módulo"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, name: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">ICONO</FormLabel>
                  <Input
                    placeholder="RiUserStarFill"
                    type="text"
                    defaultValue={indice ? indice.icon : ''}
                    onChange={e =>
                      setIndice({ ...indice, icon: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <FormControl isRequired>
                  <FormLabel fontWeight="semibold">PATH</FormLabel>
                  <Input
                    placeholder="/home"
                    type="text"
                    defaultValue={indice ? indice.path : ''}
                    onChange={e =>
                      setIndice({ ...indice, path: e.target.value })
                    }
                  />
                </FormControl>          
              <Stack direction="row" justifyContent="space-between" w="full">
                <Text fontWeight="semibold">ESTADO</Text>
                <RadioGroup
                  onChange={e =>
                    setIndice({ ...indice, estado: e })
                  }
                  defaultValue={indice ? indice.estado : ''}
                  colorScheme="primary"
                  size="lg"
                >
                  <Stack direction="row">
                    <Radio value="activo">Activo</Radio>
                    <Radio value="inactivo">Inactivo</Radio>
                  </Stack>
                </RadioGroup>
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

export default ModalEditarModulo;
