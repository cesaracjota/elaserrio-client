import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
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
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createEstudiante } from '../../features/estudianteSlice';
import { VscAdd } from 'react-icons/vsc';

const ModalAgregarEstudiante = ({ idSede }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombres: '',
    apellidos: '',
    dni: '',
    sexo: '',
    correo: '',
    sede: idSede,
    celular: '',
    domicilio: '',
    fecha_nacimiento: '',
    nombre_padres: '',
    celular_padres: '',
    correo_padres: '',
    turno: '',
    observaciones: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const [cargando, setCargando] = useState(false);

  const handleSave = e => {
    setCargando(true);
    e.preventDefault();
    dispatch(createEstudiante(indice)).then(() => {
      setCargando(false);
      setIsModalOpen(false);
    });
    setIndice(initialValues);
  };

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
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
        leftIcon={<Icon as={VscAdd} fontSize="lg" />}
        onClick={handleModalOpen}
        variant="solid"
        rounded={'xl'}
      >
        Nuevo Registro
      </Button>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }}>
          <ModalHeader textAlign="center">REGISTRAR NUEVO ESTUDIANTE</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box
                boxShadow="base"
                overflow="hidden"
              >
                <Stack
                  spacing={4}
                  direction="column"
                  justifyContent="space-between"
                  p={2}
                >
                  <Stack
                    spacing={2}
                    direction={{ base: 'column', lg: 'row' }}
                    justifyContent="space-between"
                  >
                     <FormControl isRequired>
                      <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                      <Input
                        placeholder="Escribe el nombre"
                        type="text"
                        onChange={e =>
                          setIndice({
                            ...indice,
                            nombres: e.target.value.toUpperCase(),
                          })
                        }
                        textTransform={'uppercase'}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                      <Input
                        placeholder="Escribe el apellidos"
                        type="text"
                        onChange={e =>
                          setIndice({
                            ...indice,
                            apellidos: e.target.value.toUpperCase(),
                          })
                        }
                        textTransform={'uppercase'}
                      />
                    </FormControl>                   
                    <FormControl isRequired>
                      <FormLabel fontWeight={'semibold'}>DNI</FormLabel>
                      <Input
                        placeholder="Ejemplo: 70408950"
                        type="number"
                        onChange={e =>
                          setIndice({ ...indice, dni: e.target.value })
                        }
                      />
                      <FormHelperText textColor={'red.500'}>
                        {indice.dni?.length > 0 && indice.dni?.length < 8
                          ? 'El DNI debe tener al menos 8 caracteres'
                          : ''}
                      </FormHelperText>
                    </FormControl>
                  </Stack>

                  <Stack spacing={2} direction={{ base: 'column', lg: 'row' }}>
                    <FormControl isRequired>
                      <FormLabel fontWeight={'semibold'}>SEXO</FormLabel>
                      <RadioGroup
                        onChange={e => setIndice({ ...indice, sexo: e })}
                      >
                        <Stack direction="row">
                          <Radio value={'M'}>MASCULINO</Radio>
                          <Radio value={'F'}>FEMENINO</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
                      <Input
                        placeholder="Escribe su correo"
                        type="email"
                        onChange={e =>
                          setIndice({ ...indice, correo: e.target.value })
                        }
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight={'semibold'}>CELULAR</FormLabel>
                      <Input
                        placeholder="Escribe su # celular"
                        type="number"
                        onChange={e =>
                          setIndice({ ...indice, celular: e.target.value })
                        }
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing={2} direction={{ base: 'column', lg: 'row' }}>
                    <FormControl>
                      <FormLabel fontWeight={'semibold'}>DOMICILIO</FormLabel>
                      <Input
                        placeholder="Escribe su domicilio"
                        type="text"
                        onChange={e =>
                          setIndice({ ...indice, domicilio: e.target.value })
                        }
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight={'semibold'}>
                        FECHA DE NACIMIENTO
                      </FormLabel>
                      <Input
                        type="date"
                        onChange={e =>
                          setIndice({
                            ...indice,
                            fecha_nacimiento: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Box>
              <Box
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: 'primary.1000' }}
              >
                <Stack
                  spacing={4}
                  direction="column"
                  justifyContent="space-between"
                  p={2}
                >                  
                  <Stack spacing={2} direction={{ base: 'column', lg: 'row' }}>
                    <FormControl isRequired>
                      <FormLabel fontWeight={'semibold'}>TURNO</FormLabel>
                      <RadioGroup
                        onChange={e => setIndice({ ...indice, turno: e })}
                      >
                        <Stack direction="row">
                          <Radio value={'MAÑANA'}>MAÑANA</Radio>
                          <Radio value={'TARDE'}>TARDE</Radio>
                          <Radio value={'NORMAL'}>NORMAL</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel fontWeight={'semibold'}>
                        OBSERVACIONES
                      </FormLabel>
                      <Textarea
                        defaultValue={indice ? indice.observaciones : ''}
                        type="text"
                        onChange={e =>
                          setIndice({
                            ...indice,
                            observaciones: e.target.value,
                          })
                        }
                        placeholder="Escribe las observaciones acerca de la estudiante"
                        rows={2}
                      />
                    </FormControl>
                    <Stack spacing={4} direction="row">
                      <FormControl isRequired>
                        <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                        <RadioGroup
                          onChange={e => setIndice({ ...indice, estado: e })}
                        >
                          <Stack direction="row">
                            <Radio value={'ACTIVO'}>ACTIVO</Radio>
                            <Radio value={'INACTIVO'}>INACTIVO</Radio>
                            <Radio value={'RETIRADO'}>RETIRADO</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
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
              loadingText="Guardando..."
              spinnerPlacement="start"
              isLoading={cargando ? true : false}
              size="lg"
              type="submit"
              isDisabled={
                indice.nombres === '' ||
                indice.apellidos === '' ||
                indice.dni === '' ||
                indice.sexo === ''
                  ? true
                  : false
              }
              borderRadius="xl"
              onClick={handleSave}
            >
              GUARDAR REGISTRO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAgregarEstudiante;
