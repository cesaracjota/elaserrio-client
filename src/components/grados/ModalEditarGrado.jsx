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
  Select,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrado } from '../../features/gradoSlice';

const ModalEditarGrado = ({ row, docentes }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sedeSeleccionada } = useSelector(state => state.auth);

  const initialValues = {
    _id: null,
    nombre: '',
    nivel: '',
    docente_titular: null,
    sede: sedeSeleccionada?._id,
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
    dispatch(updateGrado(indice));
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
        closeOnOverlayClick={false}
        closeOnEsc={false}
        closeOnClickOutside={false}
        scrollBehavior="inside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">ACTUALIZAR GRADO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <FormControl>
                <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                <Input
                  defaultValue={indice ? indice.nombre : ''}
                  placeholder="Escribe el nombre de la categoria"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, nombre: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">NIVEL EDUCATIVO</FormLabel>
                  <Select
                    placeholder="SELECCIONE UN NIVEL EDUCATIVO"
                    defaultValue={indice ? indice.nivel : ''}
                    onChange={e =>
                      setIndice({ ...indice, nivel: e.target.value })
                    }
                  >
                    <option value="INICIAL">NIVEL INICIAL</option>
                    <option value="PRIMARIA">NIVEL PRIMARIA</option>
                    <option value="SECUNDARIA">SECUNDARIA</option>
                    <option value="OTRO">OTRO</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">DOCENTE TITULAR</FormLabel>
                  <Select
                    placeholder="SELECCIONE UN TITULAR"
                    onChange={e =>
                      setIndice({ ...indice, docente_titular: e.target.value })
                    }
                    defaultValue={indice ? indice.docente_titular?._id : ''}
                  >
                    {docentes.map(docente => (
                      <option key={docente._id} value={docente._id}>
                        {docente.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>  
              </Stack>
              <Stack direction="row" justifyContent="space-between" w="full">
                <Text fontWeight="semibold">ESTADO</Text>
                <RadioGroup
                  onChange={e => setIndice({ ...indice, estado: e })}
                  defaultValue={indice ? indice.estado : ''}
                  colorScheme="primary"
                  size="lg"
                >
                  <Stack direction="row">
                    <Radio value="activo">Activo</Radio>
                    <Radio colorScheme='red' value="inactivo">Inactivo</Radio>
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
              colorScheme="green"
              _dark={{
                bg: 'green.600',
                color: 'white',
                _hover: { bg: 'green.800' },
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

export default ModalEditarGrado;
