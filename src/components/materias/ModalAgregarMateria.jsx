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
  Select as SelectChakra,
  Textarea,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useDispatch } from 'react-redux';
import { createMateria } from '../../features/materiaSlice';

const ModalAgregarMateria = ({ grados, docentes, sede }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    brand_color: '#000000',
    descripcion: '',
    grado: null,
    docente: null,
    sede: sede,
    intensidadHorariaSemanal: 0,
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

  const colorOptions = [
    { label: 'ROJO', value: '#FF5733' },
    { label: 'VERDE', value: '#33FF57' },
    { label: 'AZUL', value: '#3357FF' },
    { label: 'AMARILLO', value: '#FFD700' },
    { label: 'ROSADO', value: '#FF69B4' },
    { label: 'VIOLETA', value: '#8A2BE2' },
    { label: 'TURQUESA', value: '#00CED1' },
    { label: 'NARANJA', value: '#FFA500' },
    { label: 'MARRÓN', value: '#A52A2A' },
    { label: 'GRIS OSCURO', value: '#2F4F4F' },
    { label: 'CUSTOM', value: '#000000' },
  ];
  
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
        REGISTRAR NUEVA ASIGNATURA
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="5xl" isCentered>
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">
            REGISTRAR NUEVA MATERIA ASIGNATURA
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
              <Stack spacing={4} direction={['column', 'column', 'row']} justifyContent={'space-between'}>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    placeholder="Nombre del Curso"
                    type="text"
                    onChange={e => setIndice({ ...indice, nombre: e.target.value })}
                  />
                </FormControl>
                <FormControl w="50%">
                  <FormLabel fontWeight="semibold">COLOR</FormLabel>
                  <Select
                    options={colorOptions}
                    value={colorOptions.find(c => c.value === indice.brand_color)}
                    onChange={option =>
                      setIndice({ ...indice, brand_color: option.value })
                    }
                    isSearchable={false}
                    getOptionLabel={e => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: e.value,
                          }}
                        />
                        {e.label}
                      </div>
                    )}
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                  <Textarea
                    placeholder="Descripción del Curso"
                    rows={4}
                    onChange={e => setIndice({ ...indice, descripcion: e.target.value })}
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">GRADO</FormLabel>
                  <SelectChakra
                    placeholder="Seleccione el grado"
                    onChange={e => setIndice({ ...indice, grado: e.target.value })}
                    defaultValue={indice ? indice.grado : ''}
                  >
                    {grados.map(grado => (
                      <option key={grado._id} value={grado._id}>
                        {grado.nombre} - {grado.nivel}
                      </option>
                    ))}
                  </SelectChakra>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">INTENSIDAD HORARIA SEMANAL</FormLabel>
                  <Input
                    placeholder="Intensidad horaria semanal"
                    type="number"
                    onChange={e =>
                      setIndice({
                        ...indice,
                        intensidadHorariaSemanal: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">ASIGNAR DOCENTE</FormLabel>
                  <SelectChakra
                    placeholder="Seleccione el docente"
                    onChange={e => setIndice({ ...indice, docente: e.target.value })}
                    defaultValue={indice ? indice.docente : ''}
                  >
                    {docentes.map(docente => (
                      <option key={docente._id} value={docente._id}>
                        {docente.nombre}
                      </option>
                    ))}
                  </SelectChakra>
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
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button size="lg" mr={3} onClick={handleModalClose} borderRadius="xl">
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
              isDisabled={indice.nombre === '' || indice.grado === ''}
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