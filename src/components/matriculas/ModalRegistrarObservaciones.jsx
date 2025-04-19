import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tooltip,
  Tr,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMatricula, getMatricula } from '../../features/matriculaSlice';
import { MdOutlineAddTask } from 'react-icons/md';
import { getAllNotasByStudent, reset } from '../../features/notaSlice';

const ModalRegistrarObservaciones = ({ row, configuracion }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { matricula } = useSelector(state => state.matriculas);
  const { notasByStudent } = useSelector(state => state.calificaciones);
  const [currentTab, setCurrentTab] = useState(0);

  // Simplified form structure with period-specific fields
  const [formData, setFormData] = useState({
    periodo1Academica: '',
    periodo1Comportamental: '',
    periodo2Academica: '',
    periodo2Comportamental: '',
    periodo3Academica: '',
    periodo3Comportamental: '',
    periodo4Academica: '',
    periodo4Comportamental: '',
  });

  // Handle modal open
  const handleModalOpen = () => {
    // Fetch student data when opening the modal
    dispatch(getMatricula(row._id));
    dispatch(getAllNotasByStudent(row._id));
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      periodo1Academica: '',
      periodo1Comportamental: '',
      periodo2Academica: '',
      periodo2Comportamental: '',
      periodo3Academica: '',
      periodo3Comportamental: '',
      periodo4Academica: '',
      periodo4Comportamental: '',
    });
    setCurrentTab(0);
    dispatch(reset()); // Cleanup
  };

  // Load existing data when matricula data is available
  useEffect(() => {
    if (isModalOpen && matricula && matricula._id === row._id) {
      if (
        matricula.observacionesPeriodo &&
        matricula.observacionesPeriodo.length > 0
      ) {
        // Map the array structure to our flattened form structure
        const newFormData = { ...formData };

        matricula.observacionesPeriodo.forEach(obs => {
          const periodoNum = obs.periodo;
          newFormData[`periodo${periodoNum}Academica`] = obs.academica || '';
          newFormData[`periodo${periodoNum}Comportamental`] =
            obs.comportamental || '';
        });

        setFormData(newFormData);
      }
    }
  }, [isModalOpen, matricula, row._id, formData]);

  // Simple handler for form inputs
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Convert our flat form structure back to the array structure for API
    const observacionesPeriodo = [
      {
        periodo: 1,
        academica: formData.periodo1Academica,
        comportamental: formData.periodo1Comportamental,
      },
      {
        periodo: 2,
        academica: formData.periodo2Academica,
        comportamental: formData.periodo2Comportamental,
      },
      {
        periodo: 3,
        academica: formData.periodo3Academica,
        comportamental: formData.periodo3Comportamental,
      },
      {
        periodo: 4,
        academica: formData.periodo4Academica,
        comportamental: formData.periodo4Comportamental,
      },
    ];

    // Prepare data to update
    const dataToUpdate = {
      _id: row._id,
      observacionesPeriodo,
    };

    dispatch(updateMatricula(dataToUpdate));
    handleModalClose();
  };

  return (
    <>
      <Tooltip label={!configuracion?.permitirRegistrarObservadores ? "No tiene permiso para registrar observaciones" : "Registrar observaciones"} placement="auto" hasArrow>
        <IconButton
          colorScheme="purple"
          isRound
          onClick={handleModalOpen}
          icon={<MdOutlineAddTask />}
          isDisabled={!configuracion?.permitirRegistrarObservadores}
          mr={2}
          aria-label="Registrar observaciones"
        />
      </Tooltip>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="none">
          <ModalHeader textAlign="center">
            REGISTRAR OBSERVACIONES DEL ESTUDIANTE
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex
                align="center"
                justify="center"
                borderBottom="1px"
                borderColor="gray.200"
                py={3}
                _dark={{ borderColor: 'gray.600' }}
                boxShadow={'base'}
                borderRadius="md"
              >
                <Avatar name={row.estudiante.nombres} size="sm" mr={4} />
                <Box>
                  <Text fontSize="sm" fontWeight="bold">
                    {row.estudiante.nombres} {row.estudiante.apellidos}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    DNI: {row.estudiante.dni}
                  </Text>
                </Box>
              </Flex>
            </Stack>
            {notasByStudent && notasByStudent.length > 0 ? (
              <Card mt={4} borderRadius="xl" variant="outline" size="sm">
                <CardHeader>
                  <HStack spacing={4}>
                    <Icon
                      as={MdOutlineAddTask}
                      boxSize={6}
                      color="primary.500"
                    />
                    <Text fontSize="lg" fontWeight="bold">
                      Materias y Notas
                    </Text>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Materia</Th>
                        <Th>Indicadores</Th>
                        <Th isNumeric>Promedio</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {notasByStudent.map(nota => (
                        <Tr key={nota._id}>
                          <Td>{nota.materia.nombre}</Td>
                          <Td>
                            {nota.indicadores &&
                              nota.indicadores.map(item => (
                                <div key={item._id}>
                                  {item.indicador &&
                                  item.indicador.length > 0 ? (
                                    item.indicador.map((subItem, index) => (
                                      <p key={index}> - {subItem.indicador}</p> // Muestra cada indicador
                                    ))
                                  ) : null }
                                </div>
                              ))}
                          </Td>
                          <Td isNumeric>{nota.promedio}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </CardBody>
              </Card>
            ) : (
              <Alert
                status="warning"
                variant={'top-accent'}
                borderRadius={'md'}
                mt={4}
              >
                <AlertIcon />
                <AlertTitle mr={2}>
                  No hay registro de observaciones indicadas por el docente.
                </AlertTitle>
                <AlertDescription>
                  Puede Registrar observaciones generales segun corresponda a su
                  criterio.
                </AlertDescription>
              </Alert>
            )}
            <Tabs
              isFitted
              variant="enclosed"
              mt={4}
              index={currentTab}
              onChange={index => setCurrentTab(index)}
            >
              <TabList mb="1em">
                <Tab>Período 1</Tab>
                <Tab>Período 2</Tab>
                <Tab>Período 3</Tab>
                <Tab>Período 4</Tab>
              </TabList>
              <TabPanels>
                {/* Período 1 */}
                <TabPanel>
                  <Stack spacing={6}>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN ACADÉMICA - PERÍODO 1
                      </FormLabel>
                      <Textarea
                        name="periodo1Academica"
                        placeholder="Ingrese las observaciones académicas..."
                        value={formData.periodo1Academica}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN COMPORTAMENTAL - PERÍODO 1
                      </FormLabel>
                      <Textarea
                        name="periodo1Comportamental"
                        placeholder="Ingrese las observaciones comportamentales..."
                        value={formData.periodo1Comportamental}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                  </Stack>
                </TabPanel>

                {/* Período 2 */}
                <TabPanel>
                  <Stack spacing={6}>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN ACADÉMICA - PERÍODO 2
                      </FormLabel>
                      <Textarea
                        name="periodo2Academica"
                        placeholder="Ingrese las observaciones académicas..."
                        value={formData.periodo2Academica}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN COMPORTAMENTAL - PERÍODO 2
                      </FormLabel>
                      <Textarea
                        name="periodo2Comportamental"
                        placeholder="Ingrese las observaciones comportamentales..."
                        value={formData.periodo2Comportamental}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                  </Stack>
                </TabPanel>

                {/* Período 3 */}
                <TabPanel>
                  <Stack spacing={6}>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN ACADÉMICA - PERÍODO 3
                      </FormLabel>
                      <Textarea
                        name="periodo3Academica"
                        placeholder="Ingrese las observaciones académicas..."
                        value={formData.periodo3Academica}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN COMPORTAMENTAL - PERÍODO 3
                      </FormLabel>
                      <Textarea
                        name="periodo3Comportamental"
                        placeholder="Ingrese las observaciones comportamentales..."
                        value={formData.periodo3Comportamental}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                  </Stack>
                </TabPanel>

                {/* Período 4 */}
                <TabPanel>
                  <Stack spacing={6}>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN ACADÉMICA - PERÍODO 4
                      </FormLabel>
                      <Textarea
                        name="periodo4Academica"
                        placeholder="Ingrese las observaciones académicas..."
                        value={formData.periodo4Academica}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontWeight="semibold">
                        OBSERVACIÓN COMPORTAMENTAL - PERÍODO 4
                      </FormLabel>
                      <Textarea
                        name="periodo4Comportamental"
                        placeholder="Ingrese las observaciones comportamentales..."
                        value={formData.periodo4Comportamental}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </FormControl>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              mr={3}
              onClick={handleModalClose}
              borderRadius="xl"
            >
              CANCELAR
            </Button>
            <Button
              colorScheme="primary"
              _dark={{
                bg: 'primary.500',
                color: 'white',
                _hover: { bg: 'primary.600' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              borderRadius="xl"
            >
              GUARDAR OBSERVACIONES
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRegistrarObservaciones;
