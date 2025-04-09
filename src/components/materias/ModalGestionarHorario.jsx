import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  useToast,
  Flex,
  Text,
  Heading,
  Badge,
  IconButton,
  SimpleGrid,
  VStack,
  HStack,
  Card,
  CardBody,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, TimeIcon, CalendarIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { updateMateria } from '../../features/materiaSlice';
import { FiCalendar } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const diasSemana = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
];

const ModalGestionarHorario = ({ row }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [horarios, setHorarios] = useState(row.horario || []);

  const initialValues = {
    title: row?.nombre,
    day: 'Lunes',
    start: '08:00',
    end: '10:00',
    aula: '',
    description: '',
  };

  const [nuevoHorario, setNuevoHorario] = useState(initialValues);

  const toast = useToast();
  const dispatch = useDispatch();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setHorarios(row.horario || []);
  };

  const handleSave = () => {
    if (horarios.length === 0) {
      toast({
        title: 'Error',
        description: 'Debe agregar al menos un horario',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    dispatch(updateMateria({ ...row, horario: horarios }));
    setIsOpen(false);
  };

  const handleAddHorario = () => {
    if (!nuevoHorario.title) {
      toast({
        title: 'Error',
        description: 'Debe ingresar un título para el horario',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (nuevoHorario.start >= nuevoHorario.end) {
      toast({
        title: 'Error',
        description: 'La hora de inicio debe ser anterior a la hora de fin',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setHorarios([...horarios, nuevoHorario]);
    setNuevoHorario({
      title: row?.nombre,
      day: 'Lunes',
      start: '08:00',
      end: '10:00',
      aula: '',
      description: '',
    });
  };

  const handleRemoveHorario = index => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios.splice(index, 1);
    setHorarios(nuevosHorarios);
  };

  // Formatear hora para visualización
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    // Si el formato ya incluye ":", devolver tal cual
    if (timeString.includes(':')) return timeString;
    
    // Si es un formato sin ":", agregar el separador (ej: "0800" -> "08:00")
    return timeString.substring(0, 2) + ':' + timeString.substring(2);
  };

  // Agrupar horarios por día para una mejor visualización
  const horariosPorDia = diasSemana
    .map(dia => ({
      dia,
      sesiones: horarios?.filter(h => h.day === dia),
    }))
    .filter(grupo => grupo.sesiones.length > 0);


  return (
    <>
      <Tooltip label="Gestionar horario" placement="top">
        <IconButton
          aria-label="Agregar horario"
          icon={<FiCalendar />}
          colorScheme="pink"
          variant="solid"
          onClick={handleOpen}
          isRound
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="full"
        scrollBehavior="inside"
        _dark={{ bg: 'primary.1100' }}
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent
          boxShadow="xl"
          borderRadius="lg"
          _dark={{ bg: 'primary.1100' }}
        >
          <ModalHeader borderTopRadius="lg">
            <Flex justify="space-between" align="center">
              <Box>
                <Heading size="md">GESTIONAR HORARIO: {row.nombre}</Heading>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody py={6} _dark={{ bg: 'primary.1000' }}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
              {/* Columna izquierda: Formulario para agregar nuevos horarios */}
              <Card variant="outline">
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel fontWeight="bold">
                        Título de la sesión
                      </FormLabel>
                      <Input
                        value={nuevoHorario.title || ''}
                        onChange={e =>
                          setNuevoHorario({
                            ...nuevoHorario,
                            title: e.target.value,
                          })
                        }
                        placeholder="Ej: Clase teórica, Laboratorio, Práctica"
                        borderColor="primary.200"
                        _focus={{
                          borderColor: 'primary.400',
                          boxShadow: '0 0 0 1px primary.400',
                        }}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel fontWeight="bold">Día</FormLabel>
                      <Select
                        value={nuevoHorario.day}
                        onChange={e =>
                          setNuevoHorario({
                            ...nuevoHorario,
                            day: e.target.value,
                          })
                        }
                        borderColor="primary.200"
                        _focus={{
                          borderColor: 'primary.400',
                          boxShadow: '0 0 0 1px primary.400',
                        }}
                      >
                        {diasSemana.map(day => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <SimpleGrid columns={2} spacing={4}>
                      <FormControl>
                        <FormLabel fontWeight="bold">Hora inicio</FormLabel>
                        <Input
                          type="time"
                          value={nuevoHorario.start}
                          onChange={e =>
                            setNuevoHorario({
                              ...nuevoHorario,
                              start: e.target.value,
                            })
                          }
                          borderColor="primary.200"
                          _focus={{
                            borderColor: 'primary.400',
                            boxShadow: '0 0 0 1px primary.400',
                          }}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight="bold">Hora fin</FormLabel>
                        <Input
                          type="time"
                          value={nuevoHorario.end}
                          onChange={e =>
                            setNuevoHorario({
                              ...nuevoHorario,
                              end: e.target.value,
                            })
                          }
                          borderColor="primary.200"
                          _focus={{
                            borderColor: 'primary.400',
                            boxShadow: '0 0 0 1px primary.400',
                          }}
                        />
                      </FormControl>
                    </SimpleGrid>
                    
                    <FormControl>
                      <FormLabel fontWeight="bold">Aula</FormLabel>
                      <Input
                        value={nuevoHorario.aula || ''}
                        onChange={e =>
                          setNuevoHorario({
                            ...nuevoHorario,
                            aula: e.target.value,
                          })
                        }
                        placeholder="Ej: 101, Laboratorio 3, Auditorio"
                        borderColor="primary.200"
                        _focus={{
                          borderColor: 'primary.400',
                          boxShadow: '0 0 0 1px primary.400',
                        }}
                      />
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel fontWeight="bold">Descripción</FormLabel>
                      <Input
                        value={nuevoHorario.description || ''}
                        onChange={e =>
                          setNuevoHorario({
                            ...nuevoHorario,
                            description: e.target.value,
                          })
                        }
                        placeholder="Información adicional sobre la sesión"
                        borderColor="primary.200"
                        _focus={{
                          borderColor: 'primary.400',
                          boxShadow: '0 0 0 1px primary.400',
                        }}
                      />
                    </FormControl>

                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="primary"
                      onClick={handleAddHorario}
                      alignSelf="flex-end"
                      mt={4}
                      w="full"
                    >
                      Agregar sesión
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* Columna derecha: Visualización de horarios */}
              <Card variant="outline">
                <CardBody>
                  {horarios?.length > 0 ? (
                    <VStack
                      spacing={4}
                      align="stretch"
                      maxH="400px"
                      overflowY="auto"
                    >
                      {horariosPorDia.map(grupo => (
                        <Box
                          key={grupo.dia}
                          p={3}
                          bg="white"
                          borderRadius="md"
                          _dark={{ bg: 'primary.1000' }}
                        >
                          <Flex justifyContent="space-between" mb={2}>
                            <Text fontWeight="bold" color="primary.600">
                              {grupo.dia}
                            </Text>
                            <Badge colorScheme="primary" variant={'subtle'} color={'white'} px={2} py={1} borderRadius="md" flexShrink={0}>
                              {grupo.sesiones.length}{' '}
                              {grupo.sesiones.length === 1
                                ? 'sesión'
                                : 'sesiones'}
                            </Badge>
                          </Flex>
                          <VStack spacing={2} align="stretch">
                            {grupo.sesiones.map((horario, index) => {
                              const horarioIndex = horarios.findIndex(
                                h =>
                                  h.title === horario.title &&
                                  h.day === horario.day &&
                                  h.start === horario.start
                              );
                              return (
                                <Flex
                                  key={index}
                                  justify="space-between"
                                  align="center"
                                  bg="white"
                                  _dark={{ bg: 'primary.1000', borderColor: 'gray.700' }}
                                  p={2}
                                  borderRadius="md"
                                  border="1px"
                                  borderColor="gray.200"
                                  _hover={{
                                    borderColor: 'primary.300',
                                    shadow: 'sm',
                                  }}
                                >
                                  <Box>
                                    <Text fontWeight="bold">
                                      {horario.title}
                                    </Text>
                                    <HStack
                                      spacing={1}
                                      fontSize="sm"
                                      color="gray.600"
                                    >
                                      <TimeIcon boxSize={3} />
                                      <Text>
                                        {formatTime(horario.start)} - {formatTime(horario.end)}
                                      </Text>
                                    </HStack>
                                    {horario.aula && (
                                      <Text fontSize="sm" color="gray.600">
                                        Aula: {horario.aula}
                                      </Text>
                                    )}
                                    {horario.description && (
                                      <Text fontSize="sm" color="gray.500" mt={1}>
                                        {horario.description}
                                      </Text>
                                    )}
                                  </Box>
                                  <IconButton
                                    size="sm"
                                    colorScheme="red"
                                    variant="solid"
                                    icon={<MdDelete />}
                                    aria-label="Eliminar horario"
                                    onClick={() =>
                                      handleRemoveHorario(horarioIndex)
                                    }
                                  />
                                </Flex>
                              );
                            })}
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  ) : (
                    <Box p={6} textAlign="center" borderRadius="md">
                      <CalendarIcon boxSize={10} color="gray.400" mb={2} />
                      <Text color="gray.400" fontSize="lg">
                        No hay horarios asignados para este curso
                      </Text>
                      <Text color="gray.400" fontSize="sm" mt={2}>
                        Utilice el formulario de la izquierda para agregar
                        sesiones
                      </Text>
                    </Box>
                  )}
                </CardBody>
              </Card>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter borderBottomRadius="lg" py={4}>
            <HStack spacing={4}>
              <Button variant="outline" size={'lg'} onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="primary"
                size={'lg'}
                onClick={handleSave}
                isDisabled={horarios.length === 0}
                leftIcon={<CalendarIcon />}
              >
                Guardar horarios
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalGestionarHorario;