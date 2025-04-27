import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  Card,
  CardBody,
  VStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Button,
  Grid,
  GridItem,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react';
import { Book, Calendar, GraduationCap, Users } from 'lucide-react';
import ModalVerHorarioMateria from '../materias/ModalVerHorarioMateria';

const DashboardDocente = ({ reportes }) => {
  const [greeting, setGreeting] = useState('');
  const cardBg = useColorModeValue('white', 'primary.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.500', 'gray.400');
  const accentColor = useColorModeValue('teal.600', 'teal.300');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  return (
    <VStack spacing={5} align="stretch">
      {/* Encabezado */}
      <Card
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        _dark={{ bg: 'primary.900' }}
        borderColor={borderColor}
      >
        <CardBody>
          <Grid templateColumns={{ base: '1fr', md: '1fr auto' }} gap={4}>
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
                    Docente
                  </Text>
                </Text>
                <Heading size="lg" color={textColor}>
                  Panel Docente
                </Heading>
                <Text fontSize="md" color={secondaryTextColor}>
                  Consulta tus materias asignadas y gestiona tus tareas.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      {/* Materias Asignadas */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
        <Card
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          _dark={{ bg: 'primary.900' }}
          borderColor={borderColor}
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
        >
          <CardBody>
            <Flex justify="space-between" align="center" mb={2}>
              <Icon as={Book} boxSize={6} color={accentColor} />
              <Badge colorScheme="green" variant="subtle">
                {reportes?.resumen?.totalMateriasAsignadas || 0}
              </Badge>
            </Flex>
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Total Materias Asignadas:{' '}
              {reportes?.resumen?.totalMateriasAsignadas || 0}
            </Text>
          </CardBody>
        </Card>
        <Card
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          _dark={{ bg: 'primary.900' }}
          borderColor={borderColor}
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
        >
          <CardBody>
            <Flex justify="space-between" align="center" mb={2}>
              <Icon as={Users} boxSize={6} color={accentColor} />
              <Badge colorScheme="green" variant="subtle">
                {reportes?.resumen?.totalEstudiantesMatriculados || 0}
              </Badge>
            </Flex>
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              Total Estudiantes Matriculados:{' '}
              {reportes?.resumen?.totalEstudiantesMatriculados || 0}
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
      <SimpleGrid columns={1} spacing={4}>
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
                  <Tag
                    bg={data?.brand_color}
                    color={'white'}
                    px={2}
                    variant={'subtle'}
                  >
                    <TagLeftIcon as={GraduationCap} boxSize={4} />
                    <TagLabel>
                      {data?.grado?.nombre} - {data?.grado?.nivel}
                    </TagLabel>
                  </Tag>
                </Flex>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>
    </VStack>
  );
};

export default DashboardDocente;
