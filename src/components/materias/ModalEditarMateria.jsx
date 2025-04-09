import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Select,
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
  Textarea,
  Tooltip,
  Switch,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateMateria } from '../../features/materiaSlice';

const ModalEditarMateria = ({ row, grados, docentes, sede }) => {
  
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombre: '',
    codigo: '',
    brand_color: '#000000',
    descripcion: '',
    sede: sede,
    grado: null,
    docente: null,
    docente_titular: null,
    esPublico: false,
    estado: '',
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
    dispatch(updateMateria(indice));
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="blackAlpha"
          _dark={{ color: 'white', _hover: { bg: 'whiteAlpha.200' } }}
          aria-label="Editar"
          isRound
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant={'solid'}
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
          <ModalHeader textAlign="center">ACTUALIZAR MATERIA</ModalHeader>
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
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    defaultValue={indice ? indice.nombre : ''}
                    placeholder="Escribe el nombre de la materia"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">CODIGO DE CURSO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.codigo : ''}
                    placeholder="ESCRIBE EL CODIGO"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, codigo: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl w={'10%'}>
                  <FormLabel fontWeight="semibold">COLOR</FormLabel>
                  <Input
                    type="color"
                    defaultValue={indice ? indice.brand_color : '#000000'}
                    onChange={e =>
                      setIndice({ ...indice, brand_color: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                  <Textarea
                    placeholder="DESCRIPCIÓN"
                    type="text"
                    defaultValue={indice ? indice.descripcion : ''}
                    onChange={e =>
                      setIndice({ ...indice, descripcion: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">GRADO</FormLabel>
                  <Select
                    placeholder="SELECCIONE EL GRADO"
                    onChange={e =>
                      setIndice({ ...indice, grado: e.target.value })
                    }
                    defaultValue={indice ? indice.grado?._id : ''}
                  >
                    {grados.map(grado => (
                      <option key={grado._id} value={grado._id}>
                        {grado.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                
              <FormControl>
                  <FormLabel fontWeight="semibold">ASIGNAR DOCENTE</FormLabel>
                  <Select
                    placeholder="SELECCIONE EL DOCENTE"
                    onChange={e =>
                      setIndice({ ...indice, docente: e.target.value })
                    }
                    defaultValue={indice ? indice?.docente?._id : ''}
                    colorScheme="primary"
                    size="lg"
                  >
                    {docentes.map(docente => (
                      <option key={docente._id} value={docente._id}>
                        {docente.nombre}
                      </option>
                    ))}
                  </Select> 
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">TITULAR</FormLabel>
                  <Select
                    placeholder="SELECCIONE EL TITULAR"
                    onChange={e =>
                      setIndice({ ...indice, docente_titular: e.target.value })
                    }
                    defaultValue={indice ? indice?.docente_titular?._id : ''}
                    colorScheme="primary"
                    size="lg"
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
                    <Radio value="inactivo">Inactivo</Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              <Stack direction="row" justifyContent="space-between" w="full">
                <Text fontWeight="semibold">PUBLICADO</Text>
                <Switch
                  isChecked={indice ? indice.esPublico : false}
                  onChange={e => setIndice({ ...indice, esPublico: e.target.checked })}
                  colorScheme="primary"
                  size="lg"
                />
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

export default ModalEditarMateria;
