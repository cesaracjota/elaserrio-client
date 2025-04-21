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
  Stack,
  VStack,
  Badge,
  Icon,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
  Progress,
} from '@chakra-ui/react';
import {
  Settings,
  User,
  Users,
  FileText,
  ChevronRight,
  Activity,
  BarChart2,
  Layers,
  Download,
  PieChart,
  Monitor,
} from 'lucide-react';

const AdminDashboard = () => {
  const [greeting, setGreeting] = useState('');

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const secondaryTextColor = useColorModeValue('gray.500', 'gray.400');

  // Admin-specific styling
  const accentColor = useColorModeValue('primary.600', 'primary.300');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = '';

    if (hour < 12) greetingText = 'Buenos días';
    else if (hour < 18) greetingText = 'Buenas tardes';
    else greetingText = 'Buenas noches';

    setGreeting(greetingText);
  }, []);

  // Admin mock data
  const adminData = {
    stats: [
      { label: 'Estudiantes', value: '1,245', icon: Users, percentage: 8 },
      { label: 'Docentes', value: '78', icon: User, percentage: 3 },
      { label: 'Cursos', value: '42', icon: FileText, percentage: 0 },
      { label: 'Ocupación', value: '86%', icon: Activity, percentage: 4 },
    ],
    notifications: [
      {
        type: 'alert',
        message: 'Nuevo reporte financiero disponible',
        time: 'Hace 10 minutos',
      },
      {
        type: 'info',
        message: '3 profesores pendientes de aprobación',
        time: 'Hace 1 hora',
      },
      {
        type: 'success',
        message: 'Backup del sistema completado',
        time: 'Hace 2 horas',
      },
    ],
    quickLinks: [
      { icon: Users, label: 'Gestión de Estudiantes' },
      { icon: Layers, label: 'Organización Académica' },
      { icon: PieChart, label: 'Informes' },
      { icon: Settings, label: 'Configuración' },
      { icon: Monitor, label: 'Estado del Sistema' },
      { icon: Download, label: 'Exportar Datos' },
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
      {/* Main Content */}
      <Stack spacing={4} direction="column">
        {/* Admin Welcome Section */}
        <Card
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          _dark={{ bg: 'primary.900' }}
          borderColor={borderColor}
          mb={5}
          position="relative"
          overflow="hidden"
        >
          <CardBody p={{ base: 4, md: 6 }}>
            <Grid templateColumns={{ base: '1fr', lg: '1fr auto' }} gap={4}>
              <GridItem>
                <VStack align="start" spacing={2}>
                  <Flex align="center">
                    <Text
                      fontSize="md"
                      fontWeight="medium"
                      color={secondaryTextColor}
                    >
                      {greeting},
                    </Text>
                    <Text
                      fontSize="md"
                      fontWeight="semibold"
                      color={accentColor}
                      ml={1}
                    >
                      Administrador
                    </Text>
                  </Flex>

                  <Heading size="lg" color={textColor}>
                    Panel de Control Administrativo
                  </Heading>

                  <Text fontSize="md" color={secondaryTextColor}>
                    Gestione la institución desde este panel centralizado con
                    acceso a todas las áreas.
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
                  colorScheme="primary"
                  variant="outline"
                  size="md"
                >
                  Ver informes
                </Button>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>

        {/* Admin Stats Cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4} mb={5}>
          {adminData.stats.map((stat, index) => (
            <Card
              key={index}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              _dark={{ bg: 'primary.900' }}
              borderColor={borderColor}
              overflow="hidden"
              transition="transform 0.2s"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
            >
              <CardBody p={4}>
                <Flex justify="space-between" mb={2}>
                  <Icon as={stat.icon} boxSize={6} color={accentColor} />
                  <Badge
                    variant="subtle"
                    colorScheme={
                      stat.percentage > 0
                        ? 'green'
                        : stat.percentage < 0
                        ? 'red'
                        : 'gray'
                    }
                  >
                    {stat.percentage > 0
                      ? `+${stat.percentage}%`
                      : stat.percentage < 0
                      ? `${stat.percentage}%`
                      : '='}
                  </Badge>
                </Flex>
                <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={1}>
                  {stat.value}
                </Text>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {stat.label}
                </Text>

                {stat.percentage !== 0 && (
                  <Progress
                    size="xs"
                    mt={2}
                    value={80}
                    colorScheme={stat.percentage > 0 ? 'green' : 'red'}
                    borderRadius="full"
                  />
                )}
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Admin Main Content Grid */}
        <SimpleGrid columns={1} spacing={5} mb={5}>
          {/* Recent Notifications */}
          <GridItem colSpan={{ base: 1, lg: 1 }}>
            <Card
              bg={cardBg}
              borderRadius="lg"
              boxShadow="sm"
              borderWidth="1px"
              _dark={{ bg: 'primary.900' }}
              borderColor={borderColor}
              height="100%"
            >
              <CardBody p={{ base: 4, md: 5 }}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md" color={textColor}>
                    Notificaciones Recientes
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
                  {adminData.notifications.map((notification, index) => (
                    <Flex
                      key={index}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                      borderLeftWidth="4px"
                      borderLeftColor={getNotificationColor(notification.type)}
                      _dark={{ bg: 'primary.900' }}
                      align="center"
                      justify="space-between"
                    >
                      <Box>
                        <Text
                          fontWeight="medium"
                          color={textColor}
                          fontSize="sm"
                        >
                          {notification.message}
                        </Text>
                        <Text fontSize="xs" color={secondaryTextColor} mt={1}>
                          {notification.time}
                        </Text>
                      </Box>
                      <IconButton
                        aria-label="Ver detalles"
                        icon={<ChevronRight size={16} />}
                        size="sm"
                        variant="ghost"
                      />
                    </Flex>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default AdminDashboard;
