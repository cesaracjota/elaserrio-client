import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FiSearch, FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMateriasByTeacher, reset } from '../../features/materiaSlice';
import { Loading } from '../../helpers/Loading';

const MisMaterias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { materiasByTeacher, isLoading } = useSelector(state => state.materias);

  useEffect(() => {

    dispatch(getMateriasByTeacher(user?.usuario?.id));

    return () => {
      dispatch(reset());
    };
  }, [user?.usuario?.id, dispatch]);

  const hoverEffect = {
    transform: 'translateY(-2px)',
    transition: 'all 0.5s ease',
    boxShadow: 'base',
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
        {materiasByTeacher.map(course => (
          <Card
            key={course._id}
            borderTop="8px solid"
            borderColor={course.brand_color || '#000000'}
            borderRadius={'2xl'}
            _dark={{
              borderColor: course.brand_color,
              bg: 'primary.1000',
              color: 'white',
              _hover: { bg: 'primary.900' },
            }}
            _hover={hoverEffect}
            variant="elevated"
            position="relative"
            overflow="hidden"
          >
            <CardHeader>
              <Stack direction={['column', 'row']} justifyContent="space-between" alignItems="center">
                <Heading size="md">{course.nombre}</Heading>
                <Tag
                  colorScheme={'primary'}
                  px={2}
                  py={1}
                  color={'white'}
                >
                  GRADO: {course.grado.nombre}
                </Tag>
              </Stack>
            </CardHeader>
            <CardBody>
              <Flex
                direction="column"
                justify="space-between"
                h="full" // Aseguramos que ocupe toda la altura
                gap={4}
              >
                {/* Descripción que ocupa el espacio disponible */}
                <Box flex={1}>
                  <Text noOfLines={3} color="gray.500" fontSize={'sm'} h="full">
                    {course?.descripcion}
                  </Text>
                </Box>
                <Box>
                  <HStack
                    spacing={4}
                    w="full"
                    justifyContent="flex-end"
                  >
                    <Text fontSize="sm" color="gray.500">TOTAL DE ESTUDIANTES</Text>
                    <Badge colorScheme="primary" color={'white'} px={3} py={1} borderRadius="full" flexShrink={0}>
                      <HStack spacing={1} w={'full'}>
                        <Icon as={FiUsers} />
                        <Text>{course.totalEstudiantes}</Text>
                      </HStack>
                    </Badge>
                  </HStack>
                </Box>
              </Flex>
            </CardBody>

            <CardFooter borderTopWidth="1px">
              <Flex justifyContent="space-between" w="full">
                <Button
                  variant="outline"
                  w={'full'}
                  colorScheme="primary"
                  rightIcon={<FiSearch color="primary.500" />}
                  onClick={() => {
                    navigate(`/mis-asignaturas/${course._id}`);
                  }}
                >
                  VER ASIGNATURA
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {materiasByTeacher.length === 0 && (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" color="gray.500">
            NO TIENES ASIGNATURAS ASIGNADAS
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default MisMaterias;
