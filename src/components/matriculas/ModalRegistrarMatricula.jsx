import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select as SelectChakra,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Search2Icon } from '@chakra-ui/icons';
import { getEstudianteSearch, reset } from '../../features/estudianteSlice';
import { CustomToast } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { createMatricula } from '../../features/matriculaSlice';
import { FiPlus } from 'react-icons/fi';

const ModalRegistrarMatricula = ({ configuracion, grados, mis_grados }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sedeSeleccionada } = useSelector(state => state.auth);
  const { isError, message } = useSelector(state => state.matriculas);
  const { estudiantes } = useSelector(state => state.estudiantes);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getEstudianteSearch(''));
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  if (isError) {
    CustomToast({
      title: 'Error',
      message,
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    console.log(message);
  }

  const initialValues = {
    estudiante: null,
    grado: null,
    sede: sedeSeleccionada?._id,
    observaciones: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
    setEstudianteSeleccionado(null);
  };

  const handleSearchStudent = value => {
    dispatch(
      getEstudianteSearch({
        search: value,
        idSede: sedeSeleccionada?._id,
      })
    );
  };

  const handleSave = () => {
    dispatch(createMatricula(indice));
    handleModalClose();
  };

  const handleSelectEstudiante = data => {
    if (data) {
      setIndice({ ...indice, estudiante: data?._id });
      setEstudianteSeleccionado(data);
    } else {
      setIndice({ ...indice, estudiante: '' });
      setEstudianteSeleccionado(null);
    }
  };

  return (
    <>
      <Button
        colorScheme="primary"
        _dark={{
          bg: 'primary.100',
          color: 'white',
          _hover: { bg: 'primary.200' },
        }}
        size="lg"
        fontSize={'sm'}
        isDisabled={
          configuracion?.permitirRegistrarMatriculas === false
        }
        onClick={handleModalOpen}
      >
        MATRICULAR ESTUDIANTE
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="none">
          <ModalHeader textAlign="center">
            REGISTRAR NUEVA MATRICULA
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
              w={'full'}
            >
              <Stack
                spacing={4}
                direction="column"
                w={'full'}
                justifyContent="space-between"
              >
                <Stack
                  spacing={6}
                  direction={'column'}
                  w={'full'}
                  justifyContent="space-between"
                >
                  <FormControl isRequired>
                    <InputGroup size="md">
                      <InputLeftElement width="2.5rem">
                        <Icon as={Search2Icon} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        type={'text'}
                        placeholder="Buscar por dni, nombres y apellidos del estudiante"
                        onChange={e => handleSearchStudent(e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <Card
                    borderRadius="lg"
                    w={'full'}
                    border={'1px'}
                    borderColor={'gray.200'}
                    _dark={{ bg: 'primary.1000', borderColor: 'gray.600' }}
                  >
                    <CardHeader borderBottomWidth="1px" py={2}>
                      Estudiante Seleccionado
                    </CardHeader>
                    <CardBody py={2}>
                      {estudianteSeleccionado !== null ? (
                        <Stack>
                          <Flex align="center">
                            <Avatar
                              name={
                                estudianteSeleccionado.nombres +
                                ' ' +
                                estudianteSeleccionado.apellidos
                              }
                              src={estudianteSeleccionado.foto}
                              size="sm"
                              mr={4}
                            />
                            <Box>
                              <Text fontSize="sm" fontWeight="bold">
                                {estudianteSeleccionado.nombres +
                                  ' ' +
                                  estudianteSeleccionado.apellidos}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                DNI: {estudianteSeleccionado.dni}
                              </Text>
                            </Box>
                          </Flex>
                        </Stack>
                      ) : (
                        <Text textAlign="center" color="gray.500" py={2}>
                          Seleccione un estudiante para ver los detalles
                        </Text>
                      )}
                    </CardBody>
                  </Card>
                  <Stack
                    spacing={4}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {user?.usuario?.rol === 'ADMIN_ROLE' ? (
                      <FormControl>
                        <FormLabel>GRADO A MATRICULAR</FormLabel>
                        <SelectChakra
                          onChange={e =>
                            setIndice({ ...indice, grado: e.target.value })
                          }
                        >
                          <option>SELECCIONE GRADO A MATRICULAR</option>
                          {grados?.map(data => (
                            <option key={data?._id} value={data?._id}>
                              {data.nombre} - {data.nivel}
                            </option>
                          ))}
                        </SelectChakra>
                      </FormControl>
                    ) : (
                      <FormControl>
                        <FormLabel>GRADO A MATRICULAR</FormLabel>
                        <SelectChakra
                          onChange={e =>
                            setIndice({ ...indice, grado: e.target.value })
                          }
                        >
                          <option>SELECCIONE GRADO A MATRICULAR</option>
                          {mis_grados?.map(data => (
                            <option key={data?._id} value={data?._id}>
                              {data.nombre} - {data.nivel}
                            </option>
                          ))}
                        </SelectChakra>
                      </FormControl>
                    )}
                  </Stack>
                  <FormControl>
                    <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                    <Textarea
                      placeholder="Notas adicionales..."
                      onChange={e =>
                        setIndice({ ...indice, observaciones: e.target.value })
                      }
                      rows={2}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                    <RadioGroup
                      onChange={e => setIndice({ ...indice, estado: e })}
                    >
                      <Stack direction="row">
                        <Radio value={'Activa'}>Activa</Radio>
                        <Radio value={'Retirado'}>Retirado</Radio>
                        <Radio value={'Suspendida'}>Suspendida</Radio>
                        <Radio value={'Finalizada'}>Finalizada</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Stack>
              <Stack
                spacing={4}
                direction={'column'}
                justifyContent="space-between"
                mt={4}
                w={'full'}
              >
                <Box
                  overflow="auto"
                  p={2}
                  borderRadius={'md'}
                  flexGrow={1}
                  border={'1px'}
                  borderColor={'gray.500'}
                >
                  <Table variant="simple" size="sm">
                    <Thead position="sticky" top={0} zIndex={1}>
                      <Tr>
                        <Th>Estudiante</Th>
                        <Th>DNI</Th>
                        <Th width="10%" textAlign="center">
                          Acción
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {estudiantes?.map(estudiante => (
                        <Tr key={estudiante._id} cursor="pointer">
                          <Td>
                            <HStack spacing={3}>
                              <Avatar
                                name={`${estudiante.nombres} ${estudiante.apellidos}`}
                                size="xs"
                              />
                              <Box>
                                <Text
                                  fontSize={['8px', '10px']}
                                  fontWeight="500"
                                >{`${estudiante.nombres} ${estudiante.apellidos}`}</Text>
                                <Text fontSize="10px" color="gray.500">
                                  {estudiante.correo}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <Badge colorScheme="gray" variant="subtle">
                              {estudiante.dni}
                            </Badge>
                          </Td>
                          <Td textAlign="center">
                            <Tooltip label="Agregar a matrícula">
                              <IconButton
                                icon={<FiPlus />}
                                colorScheme="primary"
                                variant="solid"
                                size="sm"
                                onClick={() =>
                                  handleSelectEstudiante(estudiante)
                                }
                                borderRadius="lg"
                                aria-label="Agregar estudiante"
                              />
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
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
              onClick={handleSave}
              isDisabled={!indice.estudiante || !indice.grado}
              borderRadius="xl"
            >
              REGISTRAR MATRICULA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegistrarMatricula;
