import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Avatar,
  FormControl,
  FormHelperText,
  Textarea,
  Badge,
  Progress,
  IconButton,
  Heading,
  HStack,
  Tooltip,
  useColorModeValue,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCalificacion,
  getNotasByMatriculaAndMateria,
} from '../../features/notaSlice';
import { FiSave, FiAlertCircle, FiUser } from 'react-icons/fi';

const ModalRegistrarCalificacion = ({ row, course }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  const { nota } = useSelector(state => state.calificaciones);

  // Estado inicial basado en los datos recibidos
  const [formData, setFormData] = useState({
    matricula: row?._id,
    materia: course?._id,
    profesor: course?.docente?._id,
    bimestre1: 0,
    bimestre2: 0,
    bimestre3: 0,
    bimestre4: 0,
    observacionesPeriodo: [],
    observaciones: '',
    estado: 'Pendiente',
  });

  const handleOpenModal = () => {
    setIsOpen(true);
    dispatch(
      getNotasByMatriculaAndMateria({
        matriculaId: row._id,
        materiaId: course._id,
      })
    );
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    // Reiniciar el formulario a sus valores iniciales
    setFormData({
      matricula: row?._id,
      materia: course?._id,
      profesor: course?.docente?._id,
      bimestre1: 0,
      bimestre2: 0,
      bimestre3: 0,
      bimestre4: 0,
      observacionesPeriodo: [],
      observaciones: '',
      estado: 'Pendiente',
    });
  };

  // Actualizar formData cuando se reciben las notas del servidor
  useEffect(() => {
    if (nota) {
      setFormData({
        matricula: row?._id,
        materia: course?._id,
        profesor: course?.docente?._id,
        bimestre1: nota?.bimestre1 || 0,
        bimestre2: nota?.bimestre2 || 0,
        bimestre3: nota?.bimestre3 || 0,
        bimestre4: nota?.bimestre4 || 0,
        observacionesPeriodo: nota?.observacionesPeriodo || [],
        observaciones: nota?.observaciones || '',
        estado: nota?.estado || 'Pendiente',
      });
    }
  }, [nota, row, course]);

  // Función para calcular el estado final
  function calcularEstadoFinal(notas) {
    const notasValidas = notas.filter(n => n > 0);
    if (notasValidas.length === 0) return 'Pendiente';

    // Ajustamos el umbral al sistema de 0-100
    const promedio =
      notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length;
    return promedio >= 3 ? 'Aprobado' : 'Reprobado'; // Asumiendo que 70 es el puntaje de aprobación
  }

  // Calcular promedio general
  const promedioGeneral = () => {
    const notas = [
      formData.bimestre1,
      formData.bimestre2,
      formData.bimestre3,
      formData.bimestre4,
    ].filter(n => n > 0);

    return notas.length > 0
      ? notas.reduce((a, b) => a + b, 0) / notas.length
      : 0;
  };

  // Manejar cambio de notas
  const handleNoteChange = (bimestre, value) => {
    const newValue = parseFloat(value) || 0;
    const updatedData = {
      ...formData,
      [bimestre]: newValue,
    };

    // Recalcular estado basado en todas las notas
    const allNotas = [
      bimestre === 'bimestre1' ? newValue : formData.bimestre1,
      bimestre === 'bimestre2' ? newValue : formData.bimestre2,
      bimestre === 'bimestre3' ? newValue : formData.bimestre3,
      bimestre === 'bimestre4' ? newValue : formData.bimestre4,
    ];

    updatedData.estado = calcularEstadoFinal(allNotas);
    setFormData(updatedData);
  };

  // Manejar cambio de observaciones académicas
  const handleAcademicaChange = (bimestreIndex, value) => {
    const updatedObservaciones = [...formData.observacionesPeriodo];
    updatedObservaciones[bimestreIndex] = {
      ...updatedObservaciones[bimestreIndex],
      academica: value,
    };

    setFormData({
      ...formData,
      observacionesPeriodo: updatedObservaciones,
    });
  };

  // Manejar cambio de observaciones comportamentales
  const handleComportamentalChange = (bimestreIndex, value) => {
    const updatedObservaciones = [...formData.observacionesPeriodo];
    updatedObservaciones[bimestreIndex] = {
      ...updatedObservaciones[bimestreIndex],
      comportamental: value,
    };

    setFormData({
      ...formData,
      observacionesPeriodo: updatedObservaciones,
    });
  };

  // Guardar cambios
  const handleSave = () => {
    setIsLoading(true);
    // Calcular el promedio antes de enviar
    const dataToSave = {
      ...formData,
      promedio: promedioGeneral(),
    };
    dispatch(createCalificacion(dataToSave));
    handleCloseModal();
    setIsLoading(false);
  };

  // Obtener color según nota (ajustado para escala 0-100)
  const getColorScheme = nota => {
    if (nota <= 0) return 'gray';
    if (nota >= 4) return 'green';
    if (nota >= 3) return 'blue';
    return 'red';
  };

  return (
    <>
      <Tooltip label="Registrar calificaciones" placement="top">
        <Button
          colorScheme="primary"
          onClick={handleOpenModal}
          variant="outline"
          leftIcon={<FiUser />}
          aria-label="Registrar calificaciones"
        >
          Registrar calificaciones
        </Button>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent boxShadow="xl" _dark={{ bg: 'primary.1000' }}>
          <ModalHeader display={'flex'} justifyContent={'center'}>
            <Stack direction={'row'} align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                Registro de Calificaciones:
              </Text>
              <Badge
                bg={course?.brand_color || '#000000'}
                color={'white'}
                variant={'subtle'}
                px={3}
                py={1}
                borderRadius="md"
                fontSize="md"
              >
                {course?.nombre}
              </Badge>
            </Stack>
          </ModalHeader>

          <ModalBody p={4}>
            <Card variant="outline" borderColor={borderColor} boxShadow="base">
              <CardBody p={4}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <Flex align="center">
                    <Avatar
                      name={`${row?.estudiante?.nombres} ${row?.estudiante?.apellidos}`}
                      size="lg"
                      mr={4}
                      color={'white'}
                    />
                    <Box>
                      <Text fontWeight="bold" fontSize="lg">
                        {row?.estudiante?.nombres} {row?.estudiante?.apellidos}
                      </Text>
                      <HStack mt={1} spacing={2} fontSize="sm" color="gray.500">
                        <Text>DNI: {row?.estudiante?.dni}</Text>
                        <Text>|</Text>
                        <Text>Grado: {row?.grado?.nombre}</Text>
                      </HStack>
                    </Box>
                  </Flex>

                  <Box>
                    <Flex align="center" justify="space-between" mb={2}>
                      <Text fontWeight="bold">Promedio General:</Text>
                      <Badge
                        colorScheme={getColorScheme(nota?.promedio || 0)}
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontSize="md"
                        variant={'solid'}
                      >
                        {nota?.promedio?.toFixed(2) || 0}
                      </Badge>
                    </Flex>
                    <Progress
                      value={nota?.promedio || 0}
                      colorScheme={getColorScheme(nota?.promedio || 0)}
                      max={5}
                      size="sm"
                      borderRadius="full"
                      mb={2}
                    />
                    <Flex justify="space-between" mt={2}>
                      <Badge
                        colorScheme={
                          formData.estado === 'Aprobado'
                            ? 'green'
                            : formData.estado === 'Reprobado'
                            ? 'red'
                            : 'gray'
                        }
                        variant="subtle"
                        px={2}
                        py={1}
                      >
                        Estado: {formData.estado}
                      </Badge>

                      <Tooltip
                        placement={'auto'}
                        label="Guarde los cambios para actualizar el promedio"
                      >
                        <IconButton
                          icon={<FiAlertCircle />}
                          size="xs"
                          colorScheme="blue"
                          variant="ghost"
                          aria-label="Información"
                        />
                      </Tooltip>
                    </Flex>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>

            {/* Grilla de calificaciones por bimestre */}
            <Heading size="md" py={2}>
              Calificaciones Por Periodo
            </Heading>
            <SimpleGrid columns={2} spacing={4} mb={4}>
              {[1, 2, 3, 4].map(num => {
                const bimKey = `bimestre${num}`;
                const nota = formData[bimKey];
                const colorScheme = getColorScheme(nota);
                const bimestreIndex = num - 1;
                const observacionBimestre = formData.observacionesPeriodo[
                  bimestreIndex
                ] || { academica: '', comportamental: '' };

                return (
                  <Card
                    key={num}
                    boxShadow="base"
                    transition="all 0.2s"
                    borderWidth={2}
                    borderColor={borderColor}
                    _dark={{
                      borderColor: borderColor,
                      bg: 'primary.1000',
                      color: 'white',
                      _hover: { bg: 'primary.900' },
                    }}
                  >
                    <CardHeader py={2}>
                      <Flex justify="space-between" align="center">
                        <Badge
                          size={'lg'}
                          fontWeight={'bold'}
                          variant={'solid'}
                          colorScheme="primary"
                        >
                          Periodo {num}
                        </Badge>
                      </Flex>
                    </CardHeader>
                    <CardBody pt={2}>
                      <FormControl>
                        <FormLabel fontWeight={'semibold'}>Calificación</FormLabel>
                        <NumberInput
                          value={nota}
                          min={0}
                          max={5}
                          precision={3}
                          step={0.1}
                          onChange={valueString =>
                            handleNoteChange(bimKey, valueString)
                          }
                          size="lg"
                        >
                          <NumberInputField
                            textAlign="center"
                            fontWeight="bold"
                            fontSize="2xl"
                            py={6}
                            bg={inputBg}
                            borderWidth={2}
                            borderColor={`${colorScheme}.300`}
                            color={`${colorScheme}.500`}
                            _hover={{ borderColor: `${colorScheme}.400` }}
                            _focus={{
                              borderColor: `${colorScheme}.500`,
                              boxShadow: `0 0 0 1px ${colorScheme}.500`,
                            }}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>

                      <Stack
                        mt={2}
                        spacing={2}
                        direction={'column'}
                        justifyContent={'space-between'}
                      >
                        <FormControl>
                          <FormLabel fontWeight={'semibold'}>Observacion Comportamental</FormLabel>
                          <Textarea
                            value={observacionBimestre.comportamental}
                            onChange={e =>
                              handleComportamentalChange(
                                bimestreIndex,
                                e.target.value
                              )
                            }
                            placeholder="Agregar comentarios sobre el comportamiento del estudiante..."
                            rows={3}
                            bg={inputBg}
                            borderColor={borderColor}
                            _hover={{ borderColor: 'blue.300' }}
                            resize="vertical"
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight={'semibold'}>Observación Académica</FormLabel>
                          <Textarea
                            value={observacionBimestre.academica}
                            onChange={e =>
                              handleAcademicaChange(
                                bimestreIndex,
                                e.target.value
                              )
                            }
                            placeholder="Agregar comentarios sobre el desempeño académico del estudiante..."
                            rows={3}
                            bg={inputBg}
                            borderColor={borderColor}
                            _hover={{ borderColor: 'blue.300' }}
                            resize="vertical"
                          />
                        </FormControl>
                      </Stack>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>

            {/* Observaciones generales */}
            <Heading size="md" py={2}>
              Observaciones Generales
            </Heading>
            <FormControl>
              <Textarea
                value={formData.observaciones}
                onChange={e =>
                  setFormData({
                    ...formData,
                    observaciones: e.target.value,
                  })
                }
                placeholder="Agregar comentarios generales sobre el desempeño del estudiante durante el curso..."
                rows={4}
                bg={inputBg}
                borderColor={borderColor}
                _hover={{ borderColor: 'blue.300' }}
                resize="vertical"
              />
              <FormHelperText>
                Agregar comentarios generales sobre el desempeño del estudiante
                durante el curso.
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
            <Button
              variant="outline"
              size={'lg'}
              mr={3}
              onClick={handleCloseModal}
            >
              Cerrar
            </Button>
            <Button
              colorScheme="primary"
              size={'lg'}
              color={'white'}
              onClick={handleSave}
              isLoading={isLoading}
              leftIcon={<FiSave />}
            >
              Guardar Calificaciones
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegistrarCalificacion;
