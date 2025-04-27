import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
  Tag,
  Progress,
} from '@chakra-ui/react';
import {
  BookOpen,
  Calendar,
  Users,
  ClipboardList,
  BarChart2,
  GraduationCap,
} from 'lucide-react';

const DashboardDocenteTitular = ({ reportes}) => {
  const [greeting, setGreeting] = useState('');
  const cardBg = useColorModeValue('white', 'primary.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.500', 'gray.400');
  const accentColor = useColorModeValue('primary.600', 'primary.300');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  return (
    <Box minH="100vh">
      <VStack spacing={4} align="stretch">
        {/* Encabezado */}
        <Card
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          _dark={{ bg: 'primary.900' }}
          borderColor={borderColor}
        >
          <CardBody>
            <Grid templateColumns={{ base: '1fr', lg: '1fr auto' }} gap={4}>
              <GridItem>
                <VStack align="start" spacing={2}>
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    color={secondaryTextColor}
                  >
                    {greeting},
                    <Text
                      as="span"
                      fontWeight="semibold"
                      color={accentColor}
                      ml={1}
                    >
                      Docente Titular
                    </Text>
                  </Text>
                  <Heading size="lg" color={textColor}>
                    Panel de Gestión Académica
                  </Heading>
                  <Text fontSize="md" color={secondaryTextColor}>
                    Administre sus clases, tareas y estudiantes desde aquí.
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Estadísticas */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 2 }} spacing={4}>
            <Card
              borderRadius="lg"
              boxShadow="sm"
              _dark={{ bg: 'primary.900'}}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <Flex justify="space-between" mb={2}>
                  <Icon as={Users} boxSize={6} color={accentColor} />
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  {reportes?.resumen?.totalEstudiantesMatriculados || 0}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  TOTAL DE ESTUDIANTES MATRICULADOS
                </Text>
                <Progress
                  mt={2}
                  size="xs"
                  value={
                    reportes?.resumen?.totalEstudiantesMatriculados / reportes?.resumen?.totalEstudiantesGeneral
                  }
                  colorScheme="blue"
                  borderRadius="full"
                />
              </CardBody>
            </Card>
            <Card
              borderRadius="lg"
              boxShadow="sm"
              _dark={{ bg: 'primary.900'}}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <Flex justify="space-between" mb={2}>
                  <Icon as={BookOpen} boxSize={6} color={accentColor} />
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  {reportes?.resumen?.totalGradosAsignados || 0}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  TOTAL DE ESTUDIANTES MATRICULADOS
                </Text>
                <Progress
                  mt={2}
                  size="xs"
                  value={
                    reportes?.resumen?.totalGradosAsignados / 100
                  }
                  colorScheme="blue"
                  borderRadius="full"
                />
              </CardBody>
            </Card>
            <Card
              borderRadius="lg"
              boxShadow="sm"
              _dark={{ bg: 'primary.900'}}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <Flex justify="space-between" mb={2}>
                  <Icon as={Users} boxSize={6} color={accentColor} />
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  {reportes?.resumen?.totalMateriasAsignadas || 0}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  TOTAL DE MATERIAS ASIGNADAS
                </Text>
                <Progress
                  mt={2}
                  size="xs"
                  value={
                    reportes?.resumen?.totalMateriasAsignadas / 100
                  }
                  colorScheme="blue"
                  borderRadius="full"
                />
              </CardBody>
            </Card>
        </SimpleGrid>

        {/* Notificaciones */}
        <Card
          bg={cardBg}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={textColor}>
                Materias Asignadas
              </Heading>
            </Flex>
            <VStack spacing={3} align="stretch">
              {reportes?.materias?.map((data, i) => (
                <Flex
                  key={i}
                  p={4}
                  borderWidth="1px"
                  borderRadius="xl"
                  borderLeftWidth="8px"
                  borderLeftColor={data?.brand_color || '#000000'}
                  align="center"
                  justify="space-between"
                >
                  <Box>
                    <Text fontWeight="medium" color={textColor} fontSize="sm">
                      {data?.nombre || 'No nombre'}
                    </Text>
                    <Text fontSize="xs" color={secondaryTextColor}>
                      {data?.descripcion || 'No descripción'}
                    </Text>
                  </Box>
                  <Tag bg={data?.brand_color} color={'white'} px={2} variant={'subtle'}>
                    <Icon as={GraduationCap} mr={2} boxSize={4} />
                    {data?.grado?.nombre || 'Grado'}
                  </Tag>
                </Flex>
              ))}
            </VStack>
          </CardBody>
        </Card>
        <Card
          bg={cardBg}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <CardBody>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={textColor}>
                Grados a Cargo
              </Heading>
            </Flex>
            <VStack spacing={3} align="stretch">
              {reportes?.gradosAsignados?.map((data, i) => (
                <Flex
                  key={i}
                  p={4}
                  borderWidth="1px"
                  borderRadius="xl"
                  borderLeftWidth="8px"
                  borderLeftColor={'teal'}
                  align="center"
                  justify="space-between"
                >
                  <Tag colorScheme='teal' color={'white'} px={2} variant={'solid'}>
                    <Icon as={GraduationCap} mr={2} boxSize={4} />
                    {data?.nombre || 'S/N'}
                  </Tag>
                  <Box>
                    <Text fontSize="xs" color={secondaryTextColor}>
                      {data?.nivel || 'No nivel'}
                    </Text>
                  </Box>                  
                </Flex>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default DashboardDocenteTitular;
