import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Text,
  FormControl,
  Textarea,
  Badge,
  FormLabel,
  Icon,
  Box,
  Divider,
  HStack,
  VStack,
  Stack,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCalificacion,
  getNotasByMatriculaAndMateria,
} from '../../features/notaSlice';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { MdSchool } from 'react-icons/md';
import { Loading } from '../../helpers/Loading';
import { getMateria } from '../../features/materiaSlice';
import { getMatricula } from '../../features/matriculaSlice';
import { getActiveAcademicYear } from '../../features/academicYearSlice';
import CustomBackRoute from '../../helpers/CustomBackRoute';

const RegistrarCalificacionInicial = () => {
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

  // Mantenemos formulario completo para los datos
  const [formData, setFormData] = useState({
    matricula: '',
    materia: '',
    profesor: '',
    valoraciones: [
      { periodo: 1, valoracion: '' },
      { periodo: 2, valoracion: '' },
      { periodo: 3, valoracion: '' },
      { periodo: 4, valoracion: '' },
    ],
    observaciones: '',
    estado: '',
  });

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
      // Aseguramos que siempre haya un arreglo de 4 periodos (1 al 4)
      const valoracionesCompletas = [1, 2, 3, 4].map(periodo => {
        const existente = nota.valoraciones?.find(v => v.periodo === periodo);
        return {
          periodo,
          valoracion: existente?.valoracion || '',
        };
      });

      setFormData(prev => ({
        ...prev,
        fallas: nota.fallas || 0,
        valoraciones: valoracionesCompletas,
        observaciones: nota.observaciones || '',
        estado: nota.estado || 'Pendiente',
      }));
    }
  }, [nota]);

  // Actualiza el estado solo cuando se realiza un guardado
  const updateFormBeforeSave = () => {
    return {
      ...formData,
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

  const handleValoracionChange = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.valoraciones];
      if (updated[index]) {
        updated[index].valoracion = value;
      }
      return { ...prev, valoraciones: updated };
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box w="full">
      <Box mb={4}>
        <Flex justify="space-between" mb={6} p={4} borderRadius="lg" boxShadow="base">
          <Stack spacing={2} direction="row" align="center">
            <CustomBackRoute />
            <Flex align="center">
              <Icon as={MdSchool} boxSize={8} mr={3} color="primary.500" />
              <VStack align="start" spacing={0}>
                <Text fontSize="2xl" fontWeight="bold">
                  REGISTRO DE CALIFICACIONES NIVEL INICIAL
                </Text>
                <Text fontSize="sm" opacity={0.8}>
                  ESTUDIANTE:{' '}
                  {studentData?.estudiante?.nombres +
                    ' ' +
                    studentData?.estudiante?.apellidos}
                </Text>
              </VStack>
            </Flex>
          </Stack>
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

      <Stack direction="column" spacing={4} w="full">
        {formData.valoraciones.map((valoracion, index) => {
          const esPeriodoActivo =
            valoracion.periodo === parseInt(active_academic_year?.periodo);

          return (
            <FormControl
              key={index}
              display={esPeriodoActivo ? 'block' : 'none'}
            >
              <FormLabel fontSize="sm">
                Valoración Periodo {valoracion.periodo}
              </FormLabel>
              <Textarea
                placeholder="Escribe la valoración"
                value={valoracion?.valoracion || ''}
                onChange={e => handleValoracionChange(index, e.target.value)}
                size="lg"
                variant="filled"
                rows={4}
                _focus={{
                  borderColor: 'green.400',
                  boxShadow: `0 0 0 1px green.400`,
                }}
              />
            </FormControl>
          );
        })}

        <FormControl>
          <FormLabel fontSize="sm">Observaciones</FormLabel>
          <Textarea
            placeholder="Escribe las observaciones"
            value={formData.observaciones}
            onChange={e =>
              setFormData({
                ...formData,
                observaciones: e.target.value,
              })
            }
            size="lg"
            variant="filled"
            rows={2}
            _focus={{
              borderColor: 'green.400',
              boxShadow: `0 0 0 1px green.400`,
            }}
            data-testid="observaciones-input"
            w="full"
          />
        </FormControl>
        <Divider />
        {/* estado del estudiante */}
        <FormControl>
          <FormLabel fontSize="sm">Estado</FormLabel>
          <RadioGroup
            value={formData.estado}
            onChange={e => setFormData({ ...formData, estado: e })}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="Pendiente">Pendiente</Radio>
              <Radio value="Aprobado">Aprobado</Radio>
              <Radio value="Reprobado">Reprobado</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Stack>

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

export default RegistrarCalificacionInicial;
