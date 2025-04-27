import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Box,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Icon,
  HStack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Tooltip,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiUserPlus,
  FiTrash2,
  FiPlus,
  FiCheck,
  FiInfo,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getEstudianteSearch } from '../../features/estudianteSlice';
import { updateCurso } from '../../features/cursoSlice';

const ModalMatricularEstudiante = ({ curso }) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const tableHeaderBg = useColorModeValue('gray.50', 'gray.800');
  const hoverBg = useColorModeValue('blue.50', 'blue.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState([]);
  const { sedeSeleccionada } = useSelector(state => state.auth);
  const { estudiantes } = useSelector(state => state.estudiantes);

  useEffect(() => {
    if (isOpen) {
      dispatch(getEstudianteSearch('', sedeSeleccionada?._id));
    }
  }, [isOpen, dispatch]);

  const handleSelect = estudiante => {
    setSelected(prev =>
      prev.some(s => s._id === estudiante._id)
        ? prev.filter(s => s._id !== estudiante._id)
        : [...prev, estudiante]
    );
  };

  const handleSearchStudent = value => {
    setSearchTerm(value);
    dispatch(getEstudianteSearch(value, sedeSeleccionada?._id));
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const handleConfirm = () => {
    const data = {
      ...curso,
      estudiantes: selected.map(e => e._id),
    }
    dispatch(updateCurso(data));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelected([]);
    setSearchTerm('');
  };

  return (
    <>
      <Button
        colorScheme="primary"
        rightIcon={<FiUserPlus />}
        onClick={() => setIsOpen(true)}
        borderRadius="xl"
        size="lg"
      >
        Matricular Estudiantes
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="6xl">
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />

        <ModalContent _dark={{ bg: 'primary.1000' }}>
          <ModalHeader>
            <HStack spacing={3} justify="space-between">
              <HStack>
                <Icon as={FiUserPlus} boxSize={6} />
                <Text fontSize="xl" fontWeight="700">
                  Gestión de Matrículas
                </Text>
              </HStack>
              <Badge
                colorScheme="primary"
                variant="solid"
                fontSize="md"
                px={3}
                py={1}
              >
                {selected.length} estudiantes seleccionados
              </Badge>
            </HStack>
          </ModalHeader>

          <ModalBody p={6}>
            <Flex h="full" gap={6}>
              <Box
                flex="1"
                borderWidth={1}
                borderRadius="sm"
                borderColor={borderColor}
                bg={cardBg}
                shadow="sm"
                overflow="hidden"
                display="flex"
                flexDirection="column"
              >
                <Box
                  p={4}
                  borderBottomWidth={1}
                  borderColor={borderColor}
                  bg={tableHeaderBg}
                >
                  <Flex justify="space-between" align="center">
                    <InputGroup w="full" size="sm">
                      <InputLeftElement color="gray.400">
                        <FiSearch size={14} />
                      </InputLeftElement>
                      <Input
                        placeholder="Buscar por nombre, apellidos o numero de identidad"
                        borderRadius="md"
                        w={'full'}
                        // color
                        focusBorderColor='primary.100'
                        value={searchTerm}
                        onChange={e => handleSearchStudent(e.target.value)}
                        bg={useColorModeValue('white', 'gray.700')}
                        size="sm"
                      />
                    </InputGroup>
                  </Flex>
                </Box>

                <Box overflow="auto" flexGrow={1}>
                  <Table variant="simple" size="sm">
                    <Thead
                      position="sticky"
                      top={0}
                      zIndex={1}
                      bg={tableHeaderBg}
                    >
                      <Tr>
                        <Th>Estudiante</Th>
                        <Th>Nº DE IDENTIDAD</Th>
                        <Th width="10%" textAlign="center">
                          Acción
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {estudiantes
                        ?.filter(e => !selected.some(s => s._id === e._id))
                        .map(estudiante => (
                          <Tr
                            key={estudiante._id}
                            _hover={{ bg: hoverBg }}
                            cursor="pointer"
                          >
                            <Td>
                              <HStack spacing={3}>
                                <Avatar
                                  name={`${estudiante.nombres} ${estudiante.apellidos}`}
                                  size="xs"
                                />
                                <Box>
                                  <Text
                                    fontSize={['8px', '10px']}
                                    fontWeight="500"
                                  >{`${estudiante.nombres} ${estudiante.apellidos}`}</Text>
                                  <Text fontSize="10px" color="gray.500">
                                    {estudiante.correo}
                                  </Text>
                                </Box>
                              </HStack>
                            </Td>
                            <Td>
                              <Badge colorScheme="gray" variant="subtle">
                                {estudiante.dni}
                              </Badge>
                            </Td>
                            <Td textAlign="center">
                              <Tooltip label="Agregar a matrícula">
                                <IconButton
                                  icon={<FiPlus />}
                                  colorScheme="primary"
                                  variant="solid"
                                  size="sm"
                                  onClick={() => handleSelect(estudiante)}
                                  borderRadius="lg"
                                  aria-label="Agregar estudiante"
                                />
                              </Tooltip>
                            </Td>
                          </Tr>
                        ))}

                      {(estudiantes.length === 0 ||
                        estudiantes.every(e =>
                          selected.some(s => s._id === e._id)
                        )) && (
                        <Tr>
                          <Td colSpan={4} textAlign="center" py={10}>
                            <Icon
                              as={FiSearch}
                              boxSize={8}
                              color="gray.400"
                              mb={2}
                            />
                            <Text color="gray.500">
                              {estudiantes.length === 0
                                ? 'No se encontraron estudiantes'
                                : 'Todos los estudiantes han sido seleccionados'}
                            </Text>
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Box>

                <Box
                  p={3}
                  borderTopWidth={1}
                  borderColor={borderColor}
                  bg={tableHeaderBg}
                >
                  <HStack fontSize="sm" color="gray.600">
                    <Icon as={FiInfo} />
                    <Text>
                      Mostrando{' '}
                      {
                        estudiantes.filter(
                          e => !selected.some(s => s._id === e._id)
                        ).length
                      }{' '}
                      estudiantes
                    </Text>
                  </HStack>
                </Box>
              </Box>

              {/* Panel derecho - Estudiantes seleccionados */}
              <Box
                flex="1"
                borderWidth={1}
                borderRadius="sm"
                borderColor={borderColor}
                bg={cardBg}
                shadow="sm"
                overflow="hidden"
                display="flex"
                flexDirection="column"
              >
                <Box
                  p={4}
                  borderBottomWidth={1}
                  borderColor={borderColor}
                  bg={tableHeaderBg}
                >
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Icon as={FiUserPlus} color="green.500" />
                      <Heading size="sm">Estudiantes Seleccionados</Heading>
                    </HStack>
                    {selected.length > 0 && (
                      <Button
                        variant="solid"
                        colorScheme="red"
                        size="sm"
                        leftIcon={<FiTrash2 />}
                        onClick={clearSelection}
                      >
                        Limpiar
                      </Button>
                    )}
                  </Flex>
                </Box>

                <Box overflow="auto" flexGrow={1}>
                  <Table variant="simple" size="sm">
                    <Thead
                      position="sticky"
                      top={0}
                      zIndex={1}
                      bg={tableHeaderBg}
                    >
                      <Tr>
                        <Th width="5%">Nº</Th>
                        <Th width="55%">Estudiante</Th>
                        <Th width="25%">Nº DE IDENTIDAD</Th>
                        <Th width="15%" textAlign="center">
                          Acción
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selected.map((estudiante, index) => (
                        <Tr key={estudiante._id}>
                          <Td>{index + 1}</Td>
                          <Td>
                            <HStack spacing={3}>
                              <Avatar
                                name={`${estudiante.nombres} ${estudiante.apellidos}`}
                                size="xs"
                                bg="green.500"
                              />
                              <Box>
                                <Text fontWeight="500">{`${estudiante.nombres} ${estudiante.apellidos}`}</Text>
                                <Text fontSize="xs" color="gray.500">
                                  {estudiante.email}
                                </Text>
                              </Box>
                            </HStack>
                          </Td>
                          <Td>
                            <HStack>
                              <Badge variant="subtle" colorScheme="blue">
                                {estudiante.dni}
                              </Badge>
                              <Badge
                                colorScheme="green"
                                variant="solid"
                                borderRadius="full"
                                size="sm"
                              >
                                Listo
                              </Badge>
                            </HStack>
                          </Td>
                          <Td textAlign="center">
                            <Tooltip label="Eliminar">
                              <IconButton
                                icon={<FiTrash2 />}
                                aria-label="Remover"
                                variant="outline"
                                colorScheme="red"
                                size="sm"
                                onClick={() => handleSelect(estudiante)}
                                borderRadius="lg"
                              />
                            </Tooltip>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>

                  {selected.length === 0 && (
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      py={10}
                      color="gray.500"
                      h="80%"
                    >
                      <Icon as={FiUserPlus} boxSize={10} mb={3} />
                      <Text fontSize="lg" fontWeight="medium">
                        No hay estudiantes seleccionados
                      </Text>
                      <Text fontSize="sm" maxW="md" textAlign="center" mt={1}>
                        Utiliza la tabla izquierda para agregar estudiantes
                      </Text>
                    </Flex>
                  )}
                </Box>
                <Box
                  p={3}
                  borderTopWidth={1}
                  borderColor={borderColor}
                  bg={tableHeaderBg}
                >
                  <HStack justify="space-between">
                    <HStack fontSize="sm" color="gray.600">
                      <Icon as={FiCheck} color="green.500" />
                      <Text>
                        {selected.length} estudiantes listos para matrícula
                      </Text>
                    </HStack>
                    {selected.length > 0 && (
                      <Badge colorScheme="green" px={2} py={1}>
                        Todos verificados
                      </Badge>
                    )}
                  </HStack>
                </Box>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter
            borderTopWidth={1}
            borderColor={borderColor}
            bg={useColorModeValue('gray.50', 'gray.900')}
          >
            <Button
              variant="outline"
              mr={3}
              onClick={handleCloseModal}
              borderRadius="lg"
              size="lg"
            >
              Cancelar
            </Button>
            <Button
              colorScheme="primary"
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.300' },
              }}
              loadingText="Guardando..."
              spinnerPlacement="start"
              isDisabled={!selected.length}
              borderRadius="lg"
              size="lg"
              px={8}
              onClick={handleConfirm}
            >
              Confirmar Matrícula ({selected.length})
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMatricularEstudiante;
