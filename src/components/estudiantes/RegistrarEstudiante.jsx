// pages/RegistrarEstudiante.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Select,
  Heading,
  Divider,
  SimpleGrid,
  Checkbox,
  VStack,
  HStack,
  Card,
  CardBody,
  Icon,
  InputGroup,
  InputLeftAddon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createEstudiante } from '../../features/estudianteSlice';
import {
  FiUser,
  FiMapPin,
  FiUsers,
  FiHeart,
  FiFileText,
  FiSave,
  FiAlertCircle,
} from 'react-icons/fi';
import { CustomToast } from '../../helpers/toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RegistrarEstudiante = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sedeSeleccionada } = useSelector(state => state.auth);

  const initialValues = {
    nombres: '',
    apellidos: '',
    tipo_documento: 'TI',
    dni: '',
    lugar_expedicion: '',
    fecha_nacimiento: '',
    edad: '',
    sexo: '',
    municipio_nacimiento: '',
    departamento_nacimiento: '',
    nacionalidad: 'Colombiana',
    direccion_residencia: '',
    vereda: '',
    estrato: '',
    nivel_sisben: '',
    celular: '',
    correo: '',
    credo_religioso: 'CRISTIANO CATOLICO',
    denominacion: '',
    victima_conflicto: false,
    desplazado: false,
    desvinculado_armado: false,
    depto_expulsor: '',
    municipio_expulsor: '',
    grupo_etnico: 'MESTIZO',
    limitaciones: '',
    capacidades_excepcionales: '',
    coeficiente_intelectual: '',
    padre: { nombre: '', cc: '', celular: '', ocupacion: '', direccion: '' },
    madre: { nombre: '', cc: '', celular: '', ocupacion: '', direccion: '' },
    acudiente: {
      nombre: '',
      cc: '',
      celular: '',
      parentesco: '',
      ocupacion: '',
      direccion: '',
    },
    eps: '',
    ips: '',
    regimen_salud: '',
    grupo_sanguineo: '',
    rh: '',
    categoria_sisben: '',
    subcategoria_sisben: '',
    img: '',
    sede: sedeSeleccionada?._id,
    turno: 'MAÑANA',
    observaciones: '',
    estado: 'ACTIVO',
  };

  const [estudiante, setEstudiante] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setEstudiante(prev => {
      // For nested objects like padre, madre, acudiente
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!estudiante.nombres) newErrors.nombres = 'Campo requerido';
    if (!estudiante.tipo_documento)
      newErrors.tipo_documento = 'Campo requerido';
    if (!estudiante.apellidos) newErrors.apellidos = 'Campo requerido';
    if (!estudiante.dni) newErrors.dni = 'Campo requerido';
    if (!estudiante.sexo) newErrors.sexo = 'Campo requerido';

    // Email validation
    if (estudiante.correo && !/^\S+@\S+\.\S+$/.test(estudiante.correo)) {
      newErrors.correo = 'Formato de correo inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      CustomToast({
        title: 'Error de validación',
        message: 'Por favor complete todos los campos requeridos',
        type: 'error',
        duration: 5000,
        position: 'top',
      });
      return;
    }

    setLoading(true);
    try {
      await dispatch(createEstudiante(estudiante)).then(() => {
        navigate(`/${sedeSeleccionada?._id}/estudiantes`);
        // Optionally reset form or redirect
      });
      // Optionally reset form or redirect
    } catch (error) {
      CustomToast({
        title: 'Error al registrar',
        message:
          error.message || 'Ha ocurrido un error al registrar el estudiante',
        type: 'error',
        duration: 5000,
        position: 'top',
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" mb={4}>
        <HStack spacing={4} direction="row">
          <Link to={`/${sedeSeleccionada?._id}/estudiantes`} replace>
            <IconButton
              icon={<FaArrowLeft />}
              colorScheme="gray"
              rounded="full"
              _dark={{ color: 'white' }}
            />
          </Link>
          <Text fontSize="md">Regresar</Text>
        </HStack>
        <HStack spacing={4} direction="row">
          Registrar Nuevo Estudiante
        </HStack>
      </Stack>
      <Box
        w={'full'}
        _dark={{
          bg: 'primary.1000',
          color: 'white',
          borderRadius: 'md',
        }}
      >
        <Card variant="outline" mb={8} _dark={{ bg: 'primary.1000' }}>
          <CardBody>
            {/* alert */}
            <Alert
              status="info"
              colorScheme="green"
              variant="subtle"
              mb={4}
              borderRadius="md"
            >
              <AlertIcon />
              <AlertTitle>Ayuda</AlertTitle>
              <AlertDescription>
                Si necesita asistencia para completar el formulario, contacte al
                administrador.
              </AlertDescription>
            </Alert>

            <Tabs variant="line" colorScheme="primary" isLazy>
              <TabList mb="1em">
                <Tab fontWeight={'semibold'}>
                  <Icon as={FiUser} mr={2} />
                  Datos Personales
                </Tab>
                <Tab fontWeight={'semibold'}>
                  <Icon as={FiUsers} mr={2} />
                  Familia
                </Tab>
                <Tab fontWeight={'semibold'}>
                  <Icon as={FiMapPin} mr={2} />
                  Ubicación
                </Tab>
                <Tab fontWeight={'semibold'}>
                  <Icon as={FiHeart} mr={2} />
                  Salud
                </Tab>
                <Tab fontWeight={'semibold'}>
                  <Icon as={FiFileText} mr={2} />
                  Información Adicional
                </Tab>
              </TabList>

              <TabPanels>
                {/* Tab 1: Datos Personales */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl isRequired isInvalid={errors.nombres}>
                        <FormLabel>Nombres</FormLabel>
                        <Input
                          value={estudiante.nombres}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('nombres', e.target.value)
                          }
                          placeholder="Nombres completos"
                        />
                        {errors.nombres && (
                          <FormHelperText color="red.500">
                            {errors.nombres}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl isRequired isInvalid={errors.apellidos}>
                        <FormLabel>Apellidos</FormLabel>
                        <Input
                          value={estudiante.apellidos}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('apellidos', e.target.value)
                          }
                          placeholder="Apellidos completos"
                        />
                        {errors.apellidos && (
                          <FormHelperText color="red.500">
                            {errors.apellidos}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl isRequired>
                        <FormLabel>Tipo de Documento</FormLabel>
                        <Select
                          value={estudiante.tipo_documento}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('tipo_documento', e.target.value)
                          }
                        >
                          <option value="RC">Registro Civil</option>
                          <option value="TI">Tarjeta de Identidad</option>
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="CE">Cédula de Extranjería</option>
                          <option value="PAS">Pasaporte</option>
                        </Select>
                      </FormControl>

                      <FormControl isRequired isInvalid={errors.dni}>
                        <FormLabel>Número de Identidad</FormLabel>
                        <Input
                          type="text"
                          value={estudiante.dni}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('dni', e.target.value)}
                          placeholder="Sin puntos ni guiones"
                        />
                        {errors.dni && (
                          <FormHelperText color="red.500">
                            {errors.dni}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl>
                        <FormLabel>Lugar de Expedición</FormLabel>
                        <Input
                          value={estudiante.lugar_expedicion}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('lugar_expedicion', e.target.value)
                          }
                          placeholder="Ciudad de expedición"
                        />
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Fecha de Nacimiento</FormLabel>
                        <Input
                          type="date"
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          value={estudiante.fecha_nacimiento}
                          onChange={e =>
                            handleChange('fecha_nacimiento', e.target.value)
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Edad</FormLabel>
                        <Input
                          type="number"
                          value={estudiante.edad}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('edad', e.target.value)}
                          placeholder="Edad en años"
                        />
                      </FormControl>

                      <FormControl alignSelf={'center'} isRequired>
                        <FormLabel>Sexo</FormLabel>
                        <RadioGroup
                          value={estudiante.sexo}
                          variant={'filled'}
                          colorScheme="primary"
                          size={'lg'}
                          onChange={value => handleChange('sexo', value)}
                        >
                          <Stack direction="row">
                            <Radio value="M">Masculino</Radio>
                            <Radio value="F">Femenino</Radio>
                          </Stack>
                        </RadioGroup>
                        {errors.sexo && (
                          <FormHelperText color="red.500">
                            <Icon as={FiAlertCircle} color="red.500" mr={2} />
                            {errors.sexo}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Municipio de Nacimiento</FormLabel>
                        <Input
                          value={estudiante.municipio_nacimiento}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="Ej: San José"
                          onChange={e =>
                            handleChange('municipio_nacimiento', e.target.value)
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Departamento de Nacimiento</FormLabel>
                        <Input
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="Departamento"
                          value={estudiante.departamento_nacimiento}
                          onChange={e =>
                            handleChange(
                              'departamento_nacimiento',
                              e.target.value
                            )
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Nacionalidad</FormLabel>
                        <Input
                          value={estudiante.nacionalidad}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('nacionalidad', e.target.value)
                          }
                          defaultValue="Colombiana"
                        />
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Celular</FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="+57" />
                          <Input
                            type="tel"
                            value={estudiante.celular}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            onChange={e =>
                              handleChange('celular', e.target.value)
                            }
                            placeholder="Número de celular"
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isInvalid={errors.correo}>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <Input
                          type="email"
                          value={estudiante.correo}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('correo', e.target.value)}
                          placeholder="ejemplo@correo.com"
                        />
                        {errors.correo && (
                          <FormHelperText color="red.500">
                            {errors.correo}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </SimpleGrid>
                    {/*  imagen perfil */}
                    {
                      estudiante.img && (
                        <Box mt={2} maxW="100px">
                          <Avatar
                            src={estudiante.img}
                            name={
                              estudiante.nombres +
                              ' ' +
                              estudiante.apellidos
                            }
                            size="sm"
                            color="white"
                            display={{ base: 'none', sm: 'none', lg: 'flex' }}
                          />
                        </Box>
                      )
                    }
                  </VStack>
                </TabPanel>

                {/* Tab 2: Familia */}
                <TabPanel>
                  <VStack spacing={8} align="stretch">
                    <Box p={4} borderRadius="md">
                      <Heading size="md" mb={4} color="blue.700">
                        Información del Padre
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <FormControl>
                          <FormLabel>Nombre Completo</FormLabel>
                          <Input
                            value={estudiante.padre.nombre}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Nombre Completo"
                            onChange={e =>
                              handleChange('padre.nombre', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Documento de Identidad</FormLabel>
                          <Input
                            value={estudiante.padre.cc}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Documento de Identidad"
                            onChange={e =>
                              handleChange('padre.cc', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Celular</FormLabel>
                          <Input
                            type="tel"
                            value={estudiante.padre.celular}
                            variant={'filled'}
                            placeholder="Celular"
                            focusBorderColor="primary.500"
                            onChange={e =>
                              handleChange('padre.celular', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Ocupación</FormLabel>
                          <Input
                            value={estudiante.padre.ocupacion || ''}
                            variant={'filled'}
                            placeholder="Ocupación"
                            focusBorderColor="primary.500"
                            onChange={e =>
                              handleChange('padre.ocupacion', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl gridColumn={{ md: 'span 2' }}>
                          <FormLabel>Dirección</FormLabel>
                          <Input
                            value={estudiante.padre.direccion || ''}
                            variant={'filled'}
                            placeholder="Dirección"
                            focusBorderColor="primary.500"
                            onChange={e =>
                              handleChange('padre.direccion', e.target.value)
                            }
                          />
                        </FormControl>
                      </SimpleGrid>
                    </Box>

                    <Box p={4} borderRadius="md">
                      <Heading size="md" mb={4} color="pink.700">
                        Información de la Madre
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <FormControl>
                          <FormLabel>Nombre Completo</FormLabel>
                          <Input
                            value={estudiante.madre.nombre}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Nombre Completo"
                            onChange={e =>
                              handleChange('madre.nombre', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Documento de Identidad</FormLabel>
                          <Input
                            value={estudiante.madre.cc}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Documento de Identidad"
                            onChange={e =>
                              handleChange('madre.cc', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Celular</FormLabel>
                          <Input
                            type="tel"
                            value={estudiante.madre.celular}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Celular"
                            onChange={e =>
                              handleChange('madre.celular', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Ocupación</FormLabel>
                          <Input
                            value={estudiante.madre.ocupacion || ''}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Ocupación"
                            onChange={e =>
                              handleChange('madre.ocupacion', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl gridColumn={{ md: 'span 2' }}>
                          <FormLabel>Dirección</FormLabel>
                          <Input
                            value={estudiante.madre.direccion || ''}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Dirección"
                            onChange={e =>
                              handleChange('madre.direccion', e.target.value)
                            }
                          />
                        </FormControl>
                      </SimpleGrid>
                    </Box>

                    <Box p={4} borderRadius="md">
                      <Heading size="md" mb={4} color="purple.700">
                        Información del Acudiente
                      </Heading>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                        <FormControl>
                          <FormLabel>Nombre Completo</FormLabel>
                          <Input
                            value={estudiante.acudiente.nombre}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Nombre Completo"
                            onChange={e =>
                              handleChange('acudiente.nombre', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Documento de Identidad</FormLabel>
                          <Input
                            value={estudiante.acudiente.cc}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Documento de Identidad"
                            onChange={e =>
                              handleChange('acudiente.cc', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Celular</FormLabel>
                          <Input
                            type="tel"
                            value={estudiante.acudiente.celular}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Celular"
                            onChange={e =>
                              handleChange('acudiente.celular', e.target.value)
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Parentesco</FormLabel>
                          <Select
                            value={estudiante.acudiente.parentesco || ''}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            onChange={e =>
                              handleChange(
                                'acudiente.parentesco',
                                e.target.value
                              )
                            }
                          >
                            <option value="">Seleccione...</option>
                            <option value="PADRE">Padre</option>
                            <option value="MADRE">Madre</option>
                            <option value="ABUELO/A">Abuelo/a</option>
                            <option value="TIO/A">Tío/a</option>
                            <option value="HERMANO/A">Hermano/a</option>
                            <option value="OTRO">Otro</option>
                          </Select>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Ocupación</FormLabel>
                          <Input
                            value={estudiante.acudiente.ocupacion || ''}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Ocupación"
                            onChange={e =>
                              handleChange(
                                'acudiente.ocupacion',
                                e.target.value
                              )
                            }
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Dirección</FormLabel>
                          <Input
                            value={estudiante.acudiente.direccion || ''}
                            variant={'filled'}
                            focusBorderColor="primary.500"
                            placeholder="Dirección"
                            onChange={e =>
                              handleChange(
                                'acudiente.direccion',
                                e.target.value
                              )
                            }
                          />
                        </FormControl>
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Tab 3: Ubicación */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Dirección de Residencia</FormLabel>
                        <Input
                          value={estudiante.direccion_residencia}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('direccion_residencia', e.target.value)
                          }
                          placeholder="Dirección completa"
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Vereda / Barrio</FormLabel>
                        <Input
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="Vereda / Barrio"
                          value={estudiante.vereda}
                          onChange={e => handleChange('vereda', e.target.value)}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Estrato</FormLabel>
                        <Select
                          value={estudiante.estrato}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('estrato', e.target.value)
                          }
                        >
                          <option value="">Seleccione...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Nivel SISBEN</FormLabel>
                        <Input
                          value={estudiante.nivel_sisben}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="Nivel SISBEN"
                          onChange={e =>
                            handleChange('nivel_sisben', e.target.value)
                          }
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Categoría SISBEN</FormLabel>
                        <Select
                          value={estudiante.categoria_sisben}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('categoria_sisben', e.target.value)
                          }
                          defaultValue="NO APLICA"
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="NO APLICA">NO APLICA</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <Divider my={4} />

                    <Heading size="sm" mb={4}>
                      Situación de Desplazamiento
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <Box>
                        <VStack align="start" alignSelf={'center'} spacing={4}>
                          <Checkbox
                            isChecked={estudiante.victima_conflicto}
                            onChange={e =>
                              handleChange(
                                'victima_conflicto',
                                e.target.checked
                              )
                            }
                            size={'lg'}
                            colorScheme="primary"
                          >
                            Víctima del Conflicto Armado
                          </Checkbox>

                          <Checkbox
                            isChecked={estudiante.desplazado}
                            onChange={e =>
                              handleChange('desplazado', e.target.checked)
                            }
                            size={'lg'}
                            colorScheme="primary"
                          >
                            Desplazado
                          </Checkbox>

                          <Checkbox
                            isChecked={estudiante.desvinculado_armado}
                            onChange={e =>
                              handleChange(
                                'desvinculado_armado',
                                e.target.checked
                              )
                            }
                            size={'lg'}
                            colorScheme="primary"
                          >
                            Desvinculado de Grupos Armados
                          </Checkbox>
                        </VStack>
                      </Box>

                      <Box>
                        <SimpleGrid columns={1} spacing={4}>
                          <FormControl>
                            <FormLabel>Departamento Expulsor</FormLabel>
                            <Input
                              value={estudiante.depto_expulsor}
                              variant={'filled'}
                              focusBorderColor="primary.500"
                              onChange={e =>
                                handleChange('depto_expulsor', e.target.value)
                              }
                              isDisabled={!estudiante.desplazado}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Municipio Expulsor</FormLabel>
                            <Input
                              value={estudiante.municipio_expulsor}
                              variant={'filled'}
                              focusBorderColor="primary.500"
                              onChange={e =>
                                handleChange(
                                  'municipio_expulsor',
                                  e.target.value
                                )
                              }
                              isDisabled={!estudiante.desplazado}
                            />
                          </FormControl>
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </VStack>
                </TabPanel>

                {/* Tab 4: Salud */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <FormControl>
                        <FormLabel>EPS</FormLabel>
                        <Input
                          value={estudiante.eps}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="EPS"
                          onChange={e => handleChange('eps', e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>IPS</FormLabel>
                        <Input
                          value={estudiante.ips}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          placeholder="IPS"
                          onChange={e => handleChange('ips', e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Régimen de Salud</FormLabel>
                        <Select
                          value={estudiante.regimen_salud}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('regimen_salud', e.target.value)
                          }
                        >
                          <option value="">Seleccione...</option>
                          <option value="CONTRIBUTIVO">Contributivo</option>
                          <option value="SUBSIDIADO">Subsidiado</option>
                          <option value="ESPECIAL">Especial</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Grupo Sanguíneo</FormLabel>
                        <Select
                          value={estudiante.grupo_sanguineo}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('grupo_sanguineo', e.target.value)
                          }
                        >
                          <option value="">Seleccione...</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Factor RH</FormLabel>
                        <Select
                          value={estudiante.rh}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('rh', e.target.value)}
                        >
                          <option value="">Seleccione...</option>
                          <option value="+">Positivo (+)</option>
                          <option value="-">Negativo (-)</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel>Limitaciones o Discapacidad</FormLabel>
                      <Input
                        value={estudiante.limitaciones}
                        variant={'filled'}
                        focusBorderColor="primary.500"
                        onChange={e =>
                          handleChange('limitaciones', e.target.value)
                        }
                        placeholder="Especifique si aplica"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Capacidades Excepcionales</FormLabel>
                      <Input
                        value={estudiante.capacidades_excepcionales}
                        variant={'filled'}
                        focusBorderColor="primary.500"
                        onChange={e =>
                          handleChange(
                            'capacidades_excepcionales',
                            e.target.value
                          )
                        }
                        placeholder="Especifique si aplica"
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Coeficiente Intelectual</FormLabel>
                      <Input
                        value={estudiante.coeficiente_intelectual}
                        variant={'filled'}
                        focusBorderColor="primary.500"
                        onChange={e =>
                          handleChange(
                            'coeficiente_intelectual',
                            e.target.value
                          )
                        }
                        placeholder="Si ha sido evaluado"
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Tab 5: Información Adicional */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Credo Religioso</FormLabel>
                        <Select
                          value={estudiante.credo_religioso}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('credo_religioso', e.target.value)
                          }
                        >
                          <option value="CRISTIANO CATOLICO">
                            Cristiano Católico
                          </option>
                          <option value="CRISTIANO EVANGELICO">
                            Cristiano Evangélico
                          </option>
                          <option value="TESTIGO DE JEHOVA">
                            Testigo de Jehová
                          </option>
                          <option value="MUSULMAN">Musulmán</option>
                          <option value="JUDIO">Judío</option>
                          <option value="OTRO">Otro</option>
                          <option value="NINGUNO">Ninguno</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Denominación</FormLabel>
                        <Input
                          value={estudiante.denominacion}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e =>
                            handleChange('denominacion', e.target.value)
                          }
                          placeholder="Especifique si aplica"
                          isDisabled={estudiante.credo_religioso !== 'OTRO'}
                        />
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel>Grupo Étnico</FormLabel>
                      <Select
                        value={estudiante.grupo_etnico}
                        variant={'filled'}
                        focusBorderColor="primary.500"
                        onChange={e =>
                          handleChange('grupo_etnico', e.target.value)
                        }
                      >
                        <option value="MESTIZO">Mestizo</option>
                        <option value="AFRODESCENDIENTE">
                          Afrodescendiente
                        </option>
                        <option value="INDIGENA">Indígena</option>
                        <option value="RAIZAL">Raizal</option>
                        <option value="ROM">ROM (Gitano)</option>
                        <option value="OTRO">Otro</option>
                      </Select>
                    </FormControl>

                    <Divider my={2} />

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Turno</FormLabel>
                        <Select
                          value={estudiante.turno}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('turno', e.target.value)}
                        >
                          <option value="MAÑANA">Mañana</option>
                          <option value="TARDE">Tarde</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          value={estudiante.estado}
                          variant={'filled'}
                          focusBorderColor="primary.500"
                          onChange={e => handleChange('estado', e.target.value)}
                        >
                          <option value="ACTIVO">Activo</option>
                          <option value="INACTIVO">Inactivo</option>
                          <option value="RETIRADO">Retirado</option>
                          <option value="GRADUADO">Graduado</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>

                    <FormControl>
                      <FormLabel>Observaciones</FormLabel>
                      <Input
                        as="textarea"
                        height="100px"
                        value={estudiante.observaciones}
                        onChange={e =>
                          handleChange('observaciones', e.target.value)
                        }
                        variant={'filled'}
                        focusBorderColor="primary.500"
                        placeholder="Notas adicionales sobre el estudiante"
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Box mt={8} display="flex" justifyContent="flex-end">
              <HStack spacing={4}>
                <Button
                  variant="outline"
                  size={'lg'}
                  onClick={() => setEstudiante(initialValues)}
                >
                  Limpiar Formulario
                </Button>
                <Button
                  colorScheme="primary"
                  _dark={{
                    bg: 'primary.100',
                    color: 'white',
                    _hover: { bg: 'primary.200' },
                  }}
                  color={'white'}
                  size="lg"
                  onClick={handleSave}
                  isLoading={loading}
                  loadingText="Guardando..."
                  leftIcon={<FiSave />}
                >
                  Guardar Registro
                </Button>
              </HStack>
            </Box>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default RegistrarEstudiante;
