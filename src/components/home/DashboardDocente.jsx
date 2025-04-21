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
} from '@chakra-ui/react';
import {
  Book,
  ClipboardList,
  Calendar,
  ChevronRight,
} from 'lucide-react';

const DashboardDocente = () => {
  const [greeting, setGreeting] = useState('');
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

  const materiasAsignadas = [
    { nombre: 'Matemática 7°B', icon: Book, tareasPendientes: 5 },
    { nombre: 'Ciencias Naturales 6°A', icon: Book, tareasPendientes: 2 },
    { nombre: 'Geometría 7°A', icon: Book, tareasPendientes: 0 },
  ];

  return (
    <Box minH="100vh">
      <VStack spacing={5} align="stretch">
        {/* Encabezado */}
        <Card borderRadius="lg" boxShadow="sm" borderWidth="1px" _dark={{ bg: 'primary.900'}} borderColor={borderColor}>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: '1fr auto' }} gap={4}>
              <GridItem>
                <VStack align="start" spacing={2}>
                  <Text fontSize="md" fontWeight="medium" color={secondaryTextColor}>
                    {greeting},
                    <Text as="span" fontWeight="semibold" color={accentColor} ml={1}>
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

              <GridItem display="flex" alignItems="center" justifyContent="flex-end">
                <Button
                  leftIcon={<Calendar size={16} />}
                  colorScheme="teal"
                  variant="outline"
                >
                  Ver horario
                </Button>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Materias Asignadas */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {materiasAsignadas.map((materia, i) => (
            <Card
              key={i}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              _dark={{ bg: 'primary.900'}}
              borderColor={borderColor}
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
            >
              <CardBody>
                <Flex justify="space-between" align="center" mb={2}>
                  <Icon as={materia.icon} boxSize={6} color={accentColor} />
                  <Badge
                    colorScheme={materia.tareasPendientes > 0 ? 'orange' : 'green'}
                    variant="subtle"
                  >
                    {materia.tareasPendientes > 0
                      ? `${materia.tareasPendientes} tareas`
                      : 'Sin tareas'}
                  </Badge>
                </Flex>
                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                  {materia.nombre}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default DashboardDocente;