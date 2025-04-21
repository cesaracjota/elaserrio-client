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
import { VscAdd } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { createGrado } from '../../features/gradoSlice';

const ModalAgregarGrado = ({ docentes }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sedeSeleccionada } = useSelector(state => state.auth);

  const initialValues = {
    nombre: '',
    nivel: '',
    docente_titular: '',
    sede: sedeSeleccionada?._id,
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
    dispatch(createGrado(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  return (
    <>
      <Tooltip hasArrow label="Agregar Nuevo Registro" placement="auto">
        <IconButton
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
          <ModalHeader textAlign="center">REGISTRAR NUEVO GRADO</ModalHeader>
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
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">NIVEL EDUCATIVO</FormLabel>
                  <Select
                    placeholder="SELECCIONE UN NIVEL EDUCATIVO"
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
                    value={indice?.docente_titular}
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
              onClick={handleSave}
              isDisabled={indice.nombre === '' || indice.nivel === ''}
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

export default ModalAgregarGrado;
