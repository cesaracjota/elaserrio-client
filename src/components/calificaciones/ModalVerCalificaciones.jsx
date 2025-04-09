import React, { useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  SimpleGrid,
  Text,
  Badge,
  Progress,
  Card,
  CardBody,
  ModalCloseButton,
  Flex,
  Avatar,
  Stack,
  useColorModeValue,
  Icon,
  IconButton,
  Tooltip,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useToast,
} from '@chakra-ui/react';
import { FaUserGraduate, FaBook, FaFileDownload } from 'react-icons/fa';
import { BsEyeFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getNotasByMatriculaAndMateria } from '../../features/notaSlice';
import { useReactToPrint } from 'react-to-print';

const ModalVerCalificaciones = ({ row, materia }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const bgContent = useColorModeValue('white', 'gray.800');
  const bgHighlight = useColorModeValue('gray.50', 'gray.700');
  const contentRef = useRef();

  const { nota } = useSelector(state => state.calificaciones);

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    dispatch(getNotasByMatriculaAndMateria({
      matriculaId: row._id,
      materiaId: materia._id
    }));
    setIsOpen(true);
  };

  // Función para imprimir/guardar como PDF
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Calificaciones_${row.estudiante?.nombres}_${row.estudiante?.apellidos}_${row.materia?.nombre}`,
    onSuccess: () => toast({
      title: 'Reporte generado',
      description: 'El reporte de calificaciones ha sido generado correctamente',
      status: 'success',
      duration: 3000,
      isClosable: true,
    }),
  });

  // Función para calcular el estado según la nota
  const getEstado = nota => {
    if (!nota || nota === 0) return 'Pendiente';
    return nota >= 3 ? 'Aprobado' : 'Reprobado';
  };

  // Función para obtener color según la calificación
  const getColorScheme = calificacion => {
    if (!calificacion || calificacion === 0) return 'gray';
    if (calificacion >= 4) return 'green';
    if (calificacion >= 3) return 'blue';
    return 'red';
  };

  return (
    <>
      <Tooltip label="Ver calificaciones" placement="auto">
        <IconButton
          colorScheme="primary"
          onClick={handleOpenModal}
          variant="ghost"
          icon={<BsEyeFill />}
          aria-label="Ver calificaciones"
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="4xl">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="md" boxShadow="xl">
          <ModalHeader bg="blue.500" color="white" py={3} px={4}>
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <Icon as={FaBook} mr={2} boxSize={5} />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Reporte de Calificaciones
                  </Text>
                  <Text fontSize="sm" fontWeight="normal">
                    {materia?.nombre}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody p={0} ref={contentRef}>
            {/* Área imprimible */}
            <Box p={5} bg={bgContent}>
              {/* Información del estudiante y docente */}
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={3}
                mb={4}
                p={4}
                bg={bgHighlight}
                borderRadius="md"
                boxShadow="sm"
              >
                {/* Estudiante */}
                <Stack spacing={3} direction={{ base: 'column', md: 'row' }} flex="2">
                  <Avatar
                    name={`${row.estudiante?.nombres} ${row.estudiante?.apellidos}`}
                    size="lg"
                    mr={3}
                    bg="blue.500"
                  />
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      {row.estudiante?.nombres} {row.estudiante?.apellidos}
                    </Text>
                    <HStack mt={1} spacing={2} divider={<Text>|</Text>}>
                      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
                        <b>Grado:</b> {row.grado?.nombre}
                      </Text>
                      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
                        <b>DNI:</b> {row.estudiante?.dni}
                      </Text>
                    </HStack>
                  </Box>
                </Stack>

                {/* Año lectivo */}
                <Box flex="1">
                  <Text fontSize="sm" fontWeight="bold" color="gray.600" _dark={{ color: 'gray.300' }}>
                    Año Lectivo
                  </Text>
                  <Text fontSize="md">{new Date().getFullYear()}</Text>
                </Box>
              </Flex>

              {/* Tarjeta de resumen */}
              <Card 
                mb={4} 
                variant="outline" 
                borderColor={borderColor}
                boxShadow="sm"
              >
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {/* Promedio general con visualización mejorada */}
                    <Box>
                      <Flex justify="space-between" align="center" mb={3}>
                        <Flex align="center">
                          <Icon
                            as={FaUserGraduate}
                            color="blue.500"
                            mr={2}
                            boxSize={4}
                          />
                          <Text fontSize="md" fontWeight="bold">
                            Promedio General
                          </Text>
                        </Flex>
                        <Badge
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="md"
                          colorScheme={getColorScheme(nota?.promedio)}
                          variant="solid"
                        >
                          {nota?.promedio?.toFixed(2) || '0.00'}
                        </Badge>
                      </Flex>
                      <Progress
                        value={(nota?.promedio / 5) * 100}
                        colorScheme={getColorScheme(nota?.promedio)}
                        size="md"
                        borderRadius="full"
                        hasStripe
                        mb={1}
                      />
                      <Flex justify="space-between" fontSize="xs" mt={1}>
                        <Text color="gray.500">0.00</Text>
                        <Text color="gray.500">5.00</Text>
                      </Flex>
                    </Box>

                    {/* Estado actual */}
                    <Box>
                      <Text fontSize="md" fontWeight="bold" mb={2}>
                        Estado Actual
                      </Text>
                      <Flex justify="space-between" align="center">
                        <Box>
                          <Badge
                            fontSize="md"
                            px={3}
                            py={1}
                            borderRadius="full"
                            colorScheme={
                              nota?.promedio >= 3
                                ? 'green'
                                : nota?.promedio > 0
                                ? 'red'
                                : 'gray'
                            }
                          >
                            {getEstado(nota?.promedio)}
                          </Badge>
                        </Box>
                      </Flex>
                    </Box>
                  </SimpleGrid>
                </CardBody>
              </Card>

              {/* Calificaciones por bimestre - Visualización mejorada */}
              <Text fontSize="md" fontWeight="bold" mb={3}>
                Calificaciones por Bimestre
              </Text>
              <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={4}>
                {[1, 2, 3, 4].map(bimestre => {
                  const noutes = nota?.[`bimestre${bimestre}`] || 0;
                  const colorScheme = getColorScheme(noutes);

                  return (
                    <Card
                      key={bimestre}
                      variant="outline"
                      borderColor={borderColor}
                      borderLeftWidth="5px"
                      borderLeftColor={`${colorScheme}.500`}
                      boxShadow="sm"
                      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                      transition="all 0.2s"
                    >
                      <CardBody py={4}>
                        <VStack spacing={2} align="center">
                          <Text fontSize="sm" fontWeight="bold" color="gray.600" _dark={{ color: 'gray.300' }}>
                            Bimestre {bimestre}
                          </Text>
                          <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color={`${colorScheme}.500`}
                          >
                            {noutes.toFixed(2)}
                          </Text>
                          <Badge
                            colorScheme={colorScheme}
                            variant="subtle"
                            fontSize="xs"
                            px={2}
                            py={0.5}
                            borderRadius="full"
                          >
                            {getEstado(noutes)}
                          </Badge>
                        </VStack>
                      </CardBody>
                    </Card>
                  );
                })}
              </SimpleGrid>

              {/* Observaciones - Sección mejorada */}
              <Accordion allowToggle mb={4} borderColor={borderColor}>
                <AccordionItem>
                  <h2>
                    <AccordionButton bg={bgHighlight} _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}>
                      <Box flex="1" textAlign="left" fontWeight="semibold">
                        Observaciones y Comentarios
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text fontSize="sm" whiteSpace="pre-line">
                      {row.observaciones || 'No hay observaciones registradas para este estudiante en esta materia.'}
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </ModalBody>

          <ModalFooter borderTopWidth="1px" borderColor={borderColor} py={3}>
            <Button 
              leftIcon={<FaFileDownload />} 
              colorScheme="blue" 
              mr={3}
              onClick={handlePrint}
            >
              Descargar PDF
            </Button>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalVerCalificaciones;