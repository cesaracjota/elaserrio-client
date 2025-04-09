import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
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
  Switch,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createMateria } from '../../features/materiaSlice';

const ModalAgregarMateria = ({ grados, docentes, sede }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    codigo: '',
    brand_color: '#000000',
    descripcion: '',
    grado: null,
    docente: null,
    docente_titular: null,
    sede: sede,
    horario: [],
    esPublico: false,
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
    dispatch(createMateria(indice));
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
        onClick={handleModalOpen}
        variant="solid"
        rounded={'xl'}
      >
        REGISTRAR NUEVA MATERIA
      </Button>
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
          <ModalHeader textAlign="center">REGISTRAR NUEVA MATERIA</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <Stack
                spacing={4}
                direction={['column', 'column', 'row']}
                justifyContent={'space-between'}
              >
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    placeholder="Nombre del Curso"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">CODIGO DE CURSO</FormLabel>
                  <Input
                    placeholder="Codigo del Curso"
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
                    onChange={e =>
                      setIndice({ ...indice, brand_color: e.target.value })
                    }
                    defaultValue={indice ? indice.brand_color : '#000000'}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                  <Textarea
                    placeholder="Descripción del Curso"
                    rows={4}
                    onChange={e =>
                      setIndice({ ...indice, descripcion: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">GRADO</FormLabel>
                  <Select
                    placeholder="Seleccione el grado"
                    onChange={e =>
                      setIndice({ ...indice, grado: e.target.value })
                    }
                    defaultValue={indice ? indice.grado : ''}
                  >
                    {grados.map(grado => (
                      <option key={grado._id} value={grado._id}>
                        {grado.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                
              <FormControl>
                  <FormLabel fontWeight="semibold">ASIGNAR DOCENTE</FormLabel>
                  <Select
                    placeholder="Seleccione el docente"
                    onChange={e =>
                      setIndice({ ...indice, docente: e.target.value })
                    }
                    defaultValue={indice ? indice.docente : ''}
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
                    placeholder="Seleccione el titular"
                    onChange={e =>
                      setIndice({ ...indice, docente_titular: e.target.value })
                    }
                    defaultValue={indice ? indice.docente_titular : ''}
                  >
                    {docentes.map(docente => (
                      <option key={docente._id} value={docente._id}>
                        {docente.nombre}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired alignSelf={'center'}>
                  <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                  <RadioGroup
                    onChange={e => setIndice({ ...indice, estado: e })}
                    defaultChecked={indice ? indice.estado : ''}
                    colorScheme="primary"
                    size="lg"
                  >
                    <Stack direction="row">
                      <Radio value="activo">Activo</Radio>
                      <Radio value="inactivo">Inactivo</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">PUBLICADO</FormLabel>
                  <Switch
                    isChecked={indice ? indice.esPublico : false}
                    onChange={e =>
                      setIndice({ ...indice, esPublico: e.target.checked })
                    }
                    colorScheme="primary"
                    size="lg"
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
              bg="primary.100"
              color="white"
              _hover={{ bg: 'primary.200' }}
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.200' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              isDisabled={
                indice.nombre === '' || indice.icon === '' || indice.path === ''
              }
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

export default ModalAgregarMateria;