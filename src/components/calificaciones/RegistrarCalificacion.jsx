import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Text,
  FormControl,
  Textarea,
  Badge,
  IconButton,
  FormLabel,
  Input,
  Icon,
  SimpleGrid,
  Box,
  Heading,
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
  Card,
  CardHeader,
  CardBody,
  HStack,
  useNumberInput,
  VStack,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCalificacion,
  getNotasByMatriculaAndMateria,
} from '../../features/notaSlice';
import {
  FiSave,
  FiCheckCircle,
  FiAlertCircle,
  FiMinus,
  FiArrowLeft,
} from 'react-icons/fi';
import {
  MdAdd,
  MdGrade,
  MdAssignment,
  MdComment,
  MdDashboard,
  MdSchool,
  MdHistory,
  MdTimeline,
  MdDeleteSweep,
  MdHome,
} from 'react-icons/md';
import { Loading } from '../../helpers/Loading';
import { getMateria } from '../../features/materiaSlice';
import { getMatricula } from '../../features/matriculaSlice';
import { VscError } from 'react-icons/vsc';
import { getActiveAcademicYear } from '../../features/academicYearSlice';
import CustomBackRoute from '../../helpers/CustomBackRoute';

// Componente personalizado para la entrada de calificaciones
const GradeInput = ({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
  label,
  testId,
}) => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value: displayValue,
  } = useNumberInput({
    step,
    value,
    onChange: onChange,
    min,
    max,
    precision: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  // Determinar el esquema de color basado en el valor
  const getColorScheme = val => {
    val = parseFloat(val) || 0;
    if (val <= 0) return 'gray';
    if (val <= 2) return 'red';
    if (val <= 3) return 'orange';
    if (val <= 4) return 'yellow';
    if (val <= 5) return 'green';
    return 'red';
  };

  const colorScheme = getColorScheme(value);
  const bg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
  const textColor = useColorModeValue(
    `${colorScheme}.800`,
    `${colorScheme}.100`
  );

  return (
    <Box
      px={4}
      py={2}
      bg={'white'}
      _dark={{
        bg: 'primary.1000',
      }}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={useColorModeValue(
        `${colorScheme}.200`,
        `${colorScheme}.700`
      )}
      boxShadow="base"
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-2px)' }}
    >
      <VStack spacing={3}>
        <FormControl>
          <FormLabel fontSize="sm" color={textColor}>
            {label}
          </FormLabel>
          <HStack spacing={2}>
            <IconButton
              {...dec}
              icon={<Icon as={FiMinus} />}
              borderRightRadius="0"
              aria-label="Disminuir"
            />
            <Input
              {...input}
              textAlign="center"
              fontWeight="bold"
              fontSize="xl"
              data-testid={testId}
              bg={bg}
              color={textColor}
              focusBorderColor={`${colorScheme}.500`}
            />
            <IconButton
              {...inc}
              icon={<Icon as={MdAdd} />}
              borderLeftRadius="0"
              aria-label="Aumentar"
            />
          </HStack>
        </FormControl>
      </VStack>
    </Box>
  );
};

const RegistrarCalificacion = () => {
  // Get route parameters
  const { id, idMateria } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // Redux state selectors
  const { nota } = useSelector(state => state.calificaciones);
  const { materia } = useSelector(state => state.materias);
  const { matricula } = useSelector(state => state.matriculas);
  const { active_academic_year } = useSelector(state => state.academic_year);

  // Colores para el tema
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Mantenemos formulario completo para los datos
  const [formData, setFormData] = useState({
    matricula: '',
    materia: '',
    profesor: '',
    bimestre1: 0,
    bimestre2: 0,
    bimestre3: 0,
    bimestre4: 0,
    fallas: 0,
    indicadores: [
      { periodo: 1, indicador: [] },
      { periodo: 2, indicador: [] },
      { periodo: 3, indicador: [] },
      { periodo: 4, indicador: [] },
    ],
    observaciones: '',
    estado: 'Pendiente',
  });

  // Estados individuales para cada bimestre - esto evita el problema de salto
  const [bim1, setBim1] = useState('0');
  const [bim2, setBim2] = useState('0');
  const [bim3, setBim3] = useState('0');
  const [bim4, setBim4] = useState('0');
  const [fallas, setFallas] = useState('0');

  // Load initial data when component mounts
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await dispatch(getMateria(idMateria));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, idMateria]);

  // When we have the materia data, fetch the student's data
  useEffect(() => {
    if (materia) {
      setCourseData(materia);
      dispatch(getMatricula(id));
    }
  }, [dispatch, materia]);

  // Once we have both student and course data, fetch the calificaciones
  useEffect(() => {
    if (courseData && matricula && matricula._id) {
      setStudentData(matricula);

      // Now fetch the nota data
      dispatch(
        getNotasByMatriculaAndMateria({
          matriculaId: id,
          materiaId: idMateria,
        })
      ).finally(() => {
        setIsLoading(false);
      });

      dispatch(getActiveAcademicYear());

      // Initialize formData with new IDs
      setFormData(prev => ({
        ...prev,
        matricula: matricula._id,
        materia: courseData._id,
        profesor: courseData.docente?._id || '',
      }));
    }
  }, [dispatch, courseData, matricula]);

  useEffect(() => {
    if (nota) {
      // Para inicializar los estados individuales
      setBim1(nota?.bimestre1?.toString() || '0');
      setBim2(nota?.bimestre2?.toString() || '0');
      setBim3(nota?.bimestre3?.toString() || '0');
      setBim4(nota?.bimestre4?.toString() || '0');
      setFallas(nota?.fallas?.toString() || '0');

      // Asegurar que haya indicadores para cada periodo
      const indicadoresPorPeriodo = [
        { periodo: 1, indicador: [] },
        { periodo: 2, indicador: [] },
        { periodo: 3, indicador: [] },
        { periodo: 4, indicador: [] },
      ];

      // Si hay indicadores en nota, sobrescribirlos
      if (nota.indicadores && nota.indicadores.length > 0) {
        nota.indicadores.forEach(item => {
          const index = indicadoresPorPeriodo.findIndex(
            i => i.periodo === item.periodo
          );
          if (index !== -1) {
            indicadoresPorPeriodo[index] = item;
          }
        });
      }

      setFormData(prev => ({
        ...prev,
        bimestre1: nota?.bimestre1 || 0,
        bimestre2: nota?.bimestre2 || 0,
        bimestre3: nota?.bimestre3 || 0,
        bimestre4: nota?.bimestre4 || 0,
        fallas: nota?.fallas || 0,
        promedio: nota?.promedio || 0,
        indicadores: indicadoresPorPeriodo,
        observaciones: nota?.observaciones || '',
        estado: nota?.estado || 'Pendiente',
      }));
    }
  }, [nota]);

  // Actualiza el estado solo cuando se realiza un guardado
  const updateFormBeforeSave = () => {
    // Convertir los valores de string a números para los cálculos
    const b1 = parseFloat(bim1) || 0;
    const b2 = parseFloat(bim2) || 0;
    const b3 = parseFloat(bim3) || 0;
    const b4 = parseFloat(bim4) || 0;

    // Calcular promedio y estado
    const notasValidas = [b1, b2, b3, b4].filter(n => n > 0);
    const promedio =
      notasValidas.length > 0
        ? notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length
        : 0;

    const estadoFinal =
      notasValidas.length === 0
        ? 'Pendiente'
        : promedio >= 3
        ? 'Aprobado'
        : 'Reprobado';

    return {
      ...formData,
      bimestre1: b1,
      bimestre2: b2,
      bimestre3: b3,
      bimestre4: b4,
      fallas: fallas ? parseFloat(fallas) : 0,
      promedio,
      estado: estadoFinal,
    };
  };

  const handleSave = () => {
    setIsLoading(true);
    const updatedData = updateFormBeforeSave();

    dispatch(createCalificacion(updatedData))
      .then(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleIndicadorChange = (periodoIndex, indicadorIndex, value) => {
    setFormData(prevData => {
      const periodoActual = prevData.indicadores[periodoIndex];
      const indicadoresActualizados = [...periodoActual.indicador];

      // Si el indicador ya existe, actualizarlo
      if (indicadoresActualizados[indicadorIndex]) {
        indicadoresActualizados[indicadorIndex] = { indicador: value };
      } else {
        // Si no existe, agregarlo
        indicadoresActualizados[indicadorIndex] = { indicador: value };
      }

      const nuevosIndicadores = [...prevData.indicadores];
      nuevosIndicadores[periodoIndex] = {
        ...periodoActual,
        indicador: indicadoresActualizados,
      };

      return {
        ...prevData,
        indicadores: nuevosIndicadores,
      };
    });
  };

  const agregarIndicador = periodoIndex => {
    setFormData(prevData => {
      const periodoActual = prevData.indicadores[periodoIndex];

      // Verificar si ya hay 4 indicadores
      if (periodoActual.indicador.length >= 4) return prevData;

      const nuevosIndicadores = [...prevData.indicadores];
      nuevosIndicadores[periodoIndex] = {
        ...periodoActual,
        indicador: [...periodoActual.indicador, { indicador: '' }],
      };

      return {
        ...prevData,
        indicadores: nuevosIndicadores,
      };
    });
  };

  const handleRemoveIndicador = (periodoIndex, indicadorIndex) => {
    setFormData(prevData => {
      const periodoActual = prevData.indicadores[periodoIndex];
      const nuevosIndicadores = [...periodoActual.indicador];
      nuevosIndicadores.splice(indicadorIndex, 1);

      // Actualizar el array de indicadores para este periodo específico
      const todosIndicadores = [...prevData.indicadores];
      todosIndicadores[periodoIndex] = {
        ...periodoActual,
        indicador: nuevosIndicadores,
      };

      return {
        ...prevData,
        indicadores: todosIndicadores,
      };
    });
  };

  const getColorScheme = nota => {
    nota = parseFloat(nota) || 0;
    if (nota <= 0) return 'gray';
    if (nota <= 1) return 'red';
    if (nota <= 2) return 'orange';
    if (nota <= 3) return 'yellow';
    if (nota <= 4) return 'green';
    if (nota <= 5) return 'green';
    return 'gray';
  };

  const calcularPromedio = () => {
    const b1 = parseFloat(bim1) || 0;
    const b2 = parseFloat(bim2) || 0;
    const b3 = parseFloat(bim3) || 0;
    const b4 = parseFloat(bim4) || 0;

    const notasValidas = [b1, b2, b3, b4].filter(n => n > 0);
    return notasValidas.length > 0
      ? (notasValidas.reduce((a, b) => a + b, 0) / notasValidas.length).toFixed(
          1
        )
      : '0.0';
  };

  const calcularEstado = () => {
    const promedio = parseFloat(calcularPromedio());
    if (promedio <= 0) return 'Pendiente';
    return promedio >= 3 ? 'Aprobado' : 'Reprobado';
  };

  if (isLoading) {
    return <Loading />;
  }

  // Determinar el esquema de color del estado
  const estadoColorScheme =
    calcularEstado() === 'Aprobado'
      ? 'green'
      : calcularEstado() === 'Reprobado'
      ? 'red'
      : 'gray';
  const estadoIcon =
    calcularEstado() === 'Aprobado'
      ? FiCheckCircle
      : calcularEstado() === 'Reprobado'
      ? FiAlertCircle
      : MdHistory;

  return (
    <Box w="full" py={6}>
      {/* Breadcrumb y Encabezado */}
      <Box mb={6}>
        <CustomBackRoute />

        <Flex
          justify="space-between"
          align="center"
          mb={6}
          mt={2}
          p={4}
          borderRadius="lg"
          boxShadow="base"
        >
          <Flex align="center">
            <Icon as={MdSchool} boxSize={8} mr={3} color="primary.500" />
            <VStack align="start" spacing={0}>
              <Text fontSize="2xl" fontWeight="bold">
                REGISTRO DE CALIFICACIONES
              </Text>
              <Text fontSize="sm" opacity={0.8}>
                ESTUDIANTE: {studentData?.estudiante?.nombres + ' ' + studentData?.estudiante?.apellidos}
              </Text>
            </VStack>
          </Flex>
          <HStack>
            <Badge
              colorScheme="primary"
              variant={'solid'}
              fontSize="lg"
              px={4}
              py={2}
              borderRadius="md"
              boxShadow="base"
            >
              {courseData?.nombre || 'Materia'}
            </Badge>
          </HStack>
        </Flex>
      </Box>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1px 1fr' }} gap={6} py={4}>
        {/* Columna izquierda - Calificaciones */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <Card borderRadius="xl" boxShadow={'base'} overflow="hidden">
              <CardHeader py={4} _dark={{ bg: 'primary.900' }}>
                <Flex align="center">
                  <Icon as={MdGrade} boxSize={6} mr={2} color="primary.500" />
                  <Heading size="md">Calificaciones por Periodo</Heading>
                </Flex>
              </CardHeader>
              <CardBody _dark={{ bg: 'primary.900' }} p={6}>
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                  {active_academic_year?.periodo === "1" ? (
                    <GradeInput
                      value={bim1}
                      onChange={valueString => setBim1(valueString)}
                      label="PERIODO 1"
                      testId="periodo-1-input"
                    />
                  ) : active_academic_year?.periodo === "2" ? (
                    <GradeInput
                      value={bim2}
                      onChange={valueString => setBim2(valueString)}
                      label="PERIODO 2"
                      testId="periodo-2-input"
                    />
                  ) : active_academic_year?.periodo === "3" ? (
                    <GradeInput
                      value={bim3}
                      onChange={valueString => setBim3(valueString)}
                      label="PERIODO 3"
                      testId="periodo-3-input"
                    />
                  ) : active_academic_year?.periodo === "4" ? (
                    <GradeInput
                      value={bim4}
                      onChange={valueString => setBim4(valueString)}
                      label="PERIODO 4"
                      testId="periodo-4-input"
                    />
                  ) : null}
                </SimpleGrid>
              </CardBody>
            </Card>

            <SimpleGrid columns={1} spacing={6}>
              {/* Recuperación */}
              <Card borderRadius="xl" boxShadow={'base'} overflow="hidden">
                <CardHeader py={3} _dark={{ bg: 'primary.900' }}>
                  <Flex align="center">
                    <Icon as={VscError} boxSize={5} mr={2} color="yellow.500" />
                    <Heading size="sm">Registro Fallas</Heading>
                  </Flex>
                </CardHeader>
                <CardBody _dark={{ bg: 'primary.900' }} p={4}>
                  <Input
                    placeholder="0"
                    value={fallas}
                    type="number"
                    onChange={e => setFallas(e.target.value)}
                    size="lg"
                    _focus={{
                      borderColor: 'purple.400',
                      boxShadow: `0 0 0 1px purple.400`,
                    }}
                  />
                </CardBody>
              </Card>

              {/* Resumen */}
              <Card borderRadius="xl" boxShadow={'base'} overflow="hidden">
                <CardHeader py={3} _dark={{ bg: 'primary.900' }}>
                  <Flex align="center">
                    <Icon
                      as={MdDashboard}
                      boxSize={5}
                      mr={2}
                      color={`${estadoColorScheme}.500`}
                    />
                    <Heading size="sm">Resumen de Evaluación</Heading>
                  </Flex>
                </CardHeader>
                <CardBody
                  _dark={{ bg: 'primary.900' }}
                  p={4}
                  textAlign="center"
                >
                  <Stat>
                    <StatLabel fontSize="lg">Promedio Final</StatLabel>
                    <StatNumber
                      fontSize="4xl"
                      color={`${getColorScheme(calcularPromedio())}.500`}
                    >
                      {calcularPromedio()}
                    </StatNumber>
                    <StatHelpText>
                      <Badge
                        colorScheme={estadoColorScheme}
                        fontSize="md"
                        px={4}
                        py={1}
                        borderRadius="lg"
                        boxShadow="sm"
                        w={'full'}
                      >
                        <Flex
                          align="center"
                          w={'full'}
                          justifyContent={'center'}
                        >
                          <Icon as={estadoIcon} mr={2} />
                          {calcularEstado()}
                        </Flex>
                      </Badge>
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* Observaciones */}
            <Card borderRadius="xl" boxShadow="base" overflow="hidden">
              <CardHeader py={3} _dark={{ bg: 'primary.900' }}>
                <Flex align="center">
                  <Icon as={MdComment} boxSize={5} mr={2} color="purple.500" />
                  <Heading size="sm">Observaciones</Heading>
                </Flex>
              </CardHeader>
              <CardBody _dark={{ bg: 'primary.900' }} p={4}>
                <FormControl>
                  <Textarea
                    value={formData.observaciones}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        observaciones: e.target.value,
                      })
                    }
                    placeholder="Observaciones sobre el desempeño del estudiante..."
                    rows={3}
                    data-testid="observaciones-input"
                    size="md"
                    _focus={{
                      borderColor: 'purple.400',
                      boxShadow: `0 0 0 1px purple.400`,
                    }}
                  />
                </FormControl>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>

        {/* Separador vertical solo en pantallas grandes */}
        <GridItem display={{ base: 'none', lg: 'block' }}>
          <Divider
            orientation="vertical"
            borderColor={borderColor}
            borderWidth="1px"
            h="100%"
          />
        </GridItem>

        {/* Columna derecha - Indicadores */}
        <GridItem>
          <Card borderRadius="xl" boxShadow="base" overflow="hidden">
            <CardHeader py={4} _dark={{ bg: 'primary.900' }}>
              <Flex align="center" justify="space-between">
                <Flex align="center">
                  <Icon
                    as={MdAssignment}
                    boxSize={6}
                    mr={2}
                    color="green.500"
                  />
                  <Heading size="md">Indicadores de Logro</Heading>
                </Flex>
                <Text fontSize="sm" color="green.600" fontStyle="italic">
                  Máx. 4 por periodo
                </Text>
              </Flex>
            </CardHeader>
            <CardBody _dark={{ bg: 'primary.900' }} p={6}>
              <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6}>
                {formData.indicadores.map((periodo, periodoIndex) => (
                  <Box
                    key={`periodo-${periodoIndex}`}
                    p={4}
                    borderRadius="lg"
                    boxShadow="md"
                    position="relative"
                    _hover={{ boxShadow: 'lg' }}
                    display={periodo?.periodo === parseInt(active_academic_year?.periodo) ? "block" : "none"}
                    transition="all 0.3s"
                  >
                    <Flex justify="space-between" align="center" mb={3}>
                      <Heading size="sm">
                        <Flex align="center">
                          <Icon as={MdTimeline} mr={2} />
                          Periodo {periodo?.periodo}
                        </Flex>
                      </Heading>
                      {periodo.indicador.length < 4 && (
                        <Button
                          size="sm"
                          onClick={() => agregarIndicador(periodoIndex)}
                          leftIcon={<MdAdd />}
                          colorScheme="green"
                          variant="solid"
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'md',
                          }}
                          transition="all 0.3s"
                        >
                          Agregar
                        </Button>
                      )}
                    </Flex>

                    {periodo.indicador.length === 0 ? (
                      <Center p={4} borderRadius="md" opacity={0.8}>
                        <Text color="gray.500" fontStyle="italic">
                          No hay indicadores registrados para este periodo.
                        </Text>
                      </Center>
                    ) : (
                      <VStack spacing={3} align="stretch">
                        {periodo.indicador.map((item, indicadorIndex) => (
                          <Flex
                            key={`indicador-${periodoIndex}-${indicadorIndex}`}
                            p={2}
                            borderRadius="md"
                            boxShadow="sm"
                            transition="all 0.2s"
                            _hover={{ boxShadow: 'md' }}
                          >
                            <Input
                              placeholder={`Indicador ${indicadorIndex + 1}`}
                              value={item.indicador || ''}
                              onChange={e =>
                                handleIndicadorChange(
                                  periodoIndex,
                                  indicadorIndex,
                                  e.target.value
                                )
                              }
                              data-testid={`periodo-${
                                periodoIndex + 1
                              }-indicador-${indicadorIndex}`}
                              size="md"
                              borderRadius="md"
                              variant={'filled'}
                              flex="1"
                              _focus={{
                                borderColor: 'green.400',
                                boxShadow: `0 0 0 1px green.400`,
                              }}
                            />
                            <IconButton
                              aria-label="Eliminar indicador"
                              icon={<Icon as={MdDeleteSweep} fontSize={22} />}
                              colorScheme="red"
                              variant="solid"
                              onClick={() =>
                                handleRemoveIndicador(
                                  periodoIndex,
                                  indicadorIndex
                                )
                              }
                              ml={2}
                            />
                          </Flex>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Botones de acción */}
      <Flex justify="flex-end" mt={8} px={4}>
        <Button
          variant="outline"
          onClick={handleGoBack}
          size="lg"
          borderRadius="lg"
          mr={3}
          leftIcon={<FiArrowLeft />}
        >
          Volver
        </Button>
        <Button
          colorScheme="primary"
          _dark={{
            color: 'white',
          }}
          onClick={handleSave}
          leftIcon={<FiSave />}
          size="lg"
          borderRadius="lg"
          px={8}
          boxShadow="md"
          _hover={{ boxShadow: 'lg', transform: 'translateY(-2px)' }}
          transition="all 0.3s"
        >
          Guardar Calificaciones
        </Button>
      </Flex>
    </Box>
  );
};

export default RegistrarCalificacion;
