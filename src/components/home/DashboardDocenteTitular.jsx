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
  IconButton,
  Badge,
  Progress,
} from '@chakra-ui/react';
import {
  BookOpen,
  Calendar,
  Users,
  FileText,
  ChevronRight,
  ClipboardList,
  BarChart2,
  AlertCircle,
} from 'lucide-react';

const DashboardDocenteTitular = () => {
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

  const docenteData = {
    stats: [
      { label: 'Mis Estudiantes', value: '32', icon: Users },
      { label: 'Mis Cursos', value: '4', icon: BookOpen },
      { label: 'Tareas por Calificar', value: '12', icon: ClipboardList },
      { label: 'Próximas Clases', value: '3', icon: Calendar },
    ],
    notifications: [
      {
        type: 'alert',
        message: 'Entrega pendiente en Matemática - 6°A',
        time: 'Hace 20 minutos',
      },
      {
        type: 'info',
        message: 'Reunión con padres programada',
        time: 'Ayer',
      },
      {
        type: 'success',
        message: 'Clase registrada exitosamente',
        time: 'Hace 3 días',
      },
    ],
  };

  const getNotificationColor = type => {
    switch (type) {
      case 'alert':
        return 'red.500';
      case 'success':
        return 'green.500';
      default:
        return 'blue.500';
    }
  };

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

              <GridItem
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button
                  leftIcon={<BarChart2 size={16} />}
                  colorScheme="blue"
                  variant="outline"
                >
                  Ver resumen académico
                </Button>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Estadísticas */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
          {docenteData.stats.map((stat, index) => (
            <Card
              key={index}
              borderRadius="lg"
              boxShadow="sm"
              _dark={{ bg: 'primary.900'}}
              borderWidth="1px"
              borderColor={borderColor}
            >
              <CardBody>
                <Flex justify="space-between" mb={2}>
                  <Icon as={stat.icon} boxSize={6} color={accentColor} />
                  <Badge colorScheme="blue" variant="subtle">
                    Hoy
                  </Badge>
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                  {stat.value}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {stat.label}
                </Text>
                <Progress
                  mt={2}
                  size="xs"
                  value={Math.floor(Math.random() * 100)}
                  colorScheme="blue"
                  borderRadius="full"
                />
              </CardBody>
            </Card>
          ))}
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
                Notificaciones
              </Heading>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="blue"
                rightIcon={<ChevronRight size={14} />}
              >
                Ver todas
              </Button>
            </Flex>
            <VStack spacing={3} align="stretch">
              {docenteData.notifications.map((n, i) => (
                <Flex
                  key={i}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  borderLeftWidth="4px"
                  borderLeftColor={getNotificationColor(n.type)}
                  align="center"
                  justify="space-between"
                >
                  <Box>
                    <Text fontWeight="medium" color={textColor} fontSize="sm">
                      {n.message}
                    </Text>
                    <Text fontSize="xs" color={secondaryTextColor}>
                      {n.time}
                    </Text>
                  </Box>
                  <IconButton
                    aria-label="Detalles"
                    icon={<ChevronRight size={16} />}
                    size="sm"
                    variant="ghost"
                  />
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
