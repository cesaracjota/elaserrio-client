import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  Container,
  Icon,
  Progress,
  HStack,
  VStack,
  Stat,
  StatNumber,
  StatLabel,
  Badge,
  Divider
} from '@chakra-ui/react';
import {
  Users,
  User,
  BookOpen,
  Shield,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = ({ reportes }) => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Set greeting based on time of day
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const hour = now.getHours();
      let greetingText = '';

      if (hour < 12) greetingText = 'Buenos días';
      else if (hour < 18) greetingText = 'Buenas tardes';
      else greetingText = 'Buenas noches';

      setGreeting(greetingText);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Calculate percentages
  const matriculadosPercent = Math.round((reportes.totalEstudiantesMatriculados / reportes.totalEstudiantesGeneral) * 100) || 0;
  const docenteTitularPercent = Math.round((reportes.totalDocentesTitulares / reportes.totalDocentes) * 100) || 0;

  return (
    <>
        <Card
          mb={6}
          position="relative"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="lg"
          bg="linear(to-br, primary.400, primary.600)"
          color="white"
        >
          <Box
            bgImage="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/background/background-4.jpg"
            bgSize="cover"
            bgPosition="center"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.6}
          />
          <CardBody p={{ base: 6, md: 8 }} position="relative">
            <Flex justify="space-between" align="center">
              <Box>
                <Flex align="center">
                  <Text
                    fontSize="xl"
                    fontWeight="medium"
                    color="white"
                  >
                    {greeting},
                  </Text>
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color="white"
                    ml={1}
                  >
                    Administrador
                  </Text>
                </Flex>
                <Heading size="xl" mt={2}>
                  Panel de Control
                </Heading>
                <Text fontSize="md" color="whiteAlpha.800" mt={2} maxW="lg">
                  Gestión centralizada con acceso a estadísticas en tiempo real
                </Text>
              </Box>
              
              <Box textAlign="right" display={{ base: 'none', md: 'block' }}>
                <Text fontSize="3xl" fontWeight="bold">
                  {formatTime(currentTime)}
                </Text>
                <Text fontSize="md" color="whiteAlpha.800">
                  {formatDate(currentTime)}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        {/* Main Content - Just 3 attractive cards */}
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={4}>
          {/* Card 1: Students */}
          <Card
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            position="relative"
          >
            <Box
              bg="primary.50"
              _dark={{ bg: 'primary.900' }}
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="40%"
              borderBottomLeftRadius="40%"
              borderBottomRightRadius="40%"
            />
            <CardBody p={6} position="relative">
              <Flex justify="space-between" align="center" mb={4}>
                <Flex align="center">
                  <Icon as={Users} boxSize={8} color="blue.500" />
                  <Heading size="md" ml={2}>Estudiantes</Heading>
                </Flex>
                <Badge colorScheme="blue" fontSize="sm" p={2} borderRadius="full">
                  <Flex align="center">
                    <Icon as={TrendingUp} mr={1} boxSize={3} />
                    <Text>Activo</Text>
                  </Flex>
                </Badge>
              </Flex>
              
              <Stat mt={4}>
                <StatNumber fontSize="4xl" fontWeight="bold">
                  {reportes.totalEstudiantesMatriculados}
                </StatNumber>
                <StatLabel fontSize="sm" color="gray.500">
                  ESTUDIANTES MATRICULADOS
                </StatLabel>
              </Stat>
              
              <Box mt={6}>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" fontWeight="medium">Capacidad Total:</Text>
                  <Text fontSize="sm" fontWeight="medium">{reportes.totalEstudiantesGeneral}</Text>
                </Flex>
                <Progress 
                  value={matriculadosPercent} 
                  colorScheme="blue" 
                  size="sm" 
                  borderRadius="full" 
                  mb={1}
                />
                <Text fontSize="xs" textAlign="right" color="gray.500">
                  {matriculadosPercent}% de capacidad ocupada
                </Text>
                
                <Divider my={4} />
                
                <HStack justify="space-between">
                  <Text fontSize="sm">Espacios Disponibles</Text>
                  <Text fontSize="sm" fontWeight="bold" color="blue.500">
                    {reportes.totalEstudiantesGeneral - reportes.totalEstudiantesMatriculados}
                  </Text>
                </HStack>
              </Box>
            </CardBody>
          </Card>
          
          {/* Card 2: Teachers */}
          <Card
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            position="relative"
          >
            <Box
              bg="purple.50"
              _dark={{ bg: 'primary.900' }}
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="40%"
              borderBottomLeftRadius="40%"
              borderBottomRightRadius="40%"
            />
            <CardBody p={6} position="relative">
              <Flex justify="space-between" align="center" mb={4}>
                <Flex align="center">
                  <Icon as={User} boxSize={8} color="purple.500" />
                  <Heading size="md" ml={2}>Docentes</Heading>
                </Flex>
                <Badge colorScheme="purple" fontSize="sm" p={2} borderRadius="full">
                  <Flex align="center">
                    <Icon as={TrendingUp} mr={1} boxSize={3} />
                    <Text>Activo</Text>
                  </Flex>
                </Badge>
              </Flex>
              
              <Stat mt={4}>
                <StatNumber fontSize="4xl" fontWeight="bold">
                  {reportes.totalDocentes}
                </StatNumber>
                <StatLabel fontSize="sm" color="gray.500">
                  TOTAL DOCENTES
                </StatLabel>
              </Stat>
              
              <Box mt={6}>
                <Flex justify="space-between" mb={1}>
                  <Text fontSize="sm" fontWeight="medium">Docentes Titulares:</Text>
                  <Text fontSize="sm" fontWeight="medium">{reportes.totalDocentesTitulares}</Text>
                </Flex>
                <Progress 
                  value={docenteTitularPercent} 
                  colorScheme="purple" 
                  size="sm" 
                  borderRadius="full" 
                  mb={1}
                />
                <Text fontSize="xs" textAlign="right" color="gray.500">
                  {docenteTitularPercent}% de titularidad
                </Text>
                
                <Divider my={4} />
                
                <HStack justify="space-between">
                  <Text fontSize="sm">Materias por Docente</Text>
                  <Text fontSize="sm" fontWeight="bold" color="purple.500">
                    {(reportes.totalMaterias / reportes.totalDocentes).toFixed(1)}
                  </Text>
                </HStack>
              </Box>
            </CardBody>
          </Card>
          
          {/* Card 3: System Overview */}
          <Card
            borderRadius="xl"
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            position="relative"
          >
            <Box
              bg="green.50"
              _dark={{ bg: 'primary.900' }}
              position="absolute"
              top={0}
              left={0}
              right={0}
              height="40%"
              borderBottomLeftRadius="40%"
              borderBottomRightRadius="40%"
            />
            <CardBody p={6} position="relative">
              <Flex justify="space-between" align="center" mb={4}>
                <Flex align="center">
                  <Icon as={BookOpen} boxSize={8} color="green.500" />
                  <Heading size="md" ml={2}>Sistema</Heading>
                </Flex>
                <Badge colorScheme="green" fontSize="sm" p={2} borderRadius="full">
                  <Flex align="center">
                    <Icon as={TrendingUp} mr={1} boxSize={3} />
                    <Text>Operativo</Text>
                  </Flex>
                </Badge>
              </Flex>
              
              <VStack spacing={4} mt={4} align="stretch">
                <Box p={3} bg="white" _dark={{ bg: 'primary.800' }} borderRadius="lg" boxShadow="sm">
                  <Flex justify="space-between" align="center">
                    <Flex align="center">
                      <Icon as={BookOpen} color="green.500" mr={2} />
                      <Text fontWeight="medium">Materias</Text>
                    </Flex>
                    <Text fontWeight="bold" fontSize="xl">{reportes.totalMaterias}</Text>
                  </Flex>
                </Box>
                
                <Box p={3} bg="white" _dark={{ bg: 'primary.800' }} borderRadius="lg" boxShadow="sm">
                  <Flex justify="space-between" align="center">
                    <Flex align="center">
                      <Icon as={Shield} color="orange.500" mr={2} />
                      <Text fontWeight="medium">Usuarios</Text>
                    </Flex>
                    <Text fontWeight="bold" fontSize="xl">{reportes.totalUsuarios}</Text>
                  </Flex>
                </Box>
                
                <Box p={3} bg="white" _dark={{ bg: 'primary.800' }} borderRadius="lg" boxShadow="sm">
                  <Flex justify="space-between" align="center">
                    <Flex align="center">
                      <Icon as={TrendingUp} color="blue.500" mr={2} />
                      <Text fontWeight="medium">Tasa Ocupación</Text>
                    </Flex>
                    <Text 
                      fontWeight="bold" 
                      fontSize="xl" 
                      color={matriculadosPercent > 80 ? "red.500" : "green.500"}
                    >
                      {matriculadosPercent}%
                    </Text>
                  </Flex>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
    </>
  );
};

export default AdminDashboard;