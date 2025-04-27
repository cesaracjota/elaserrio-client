import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  Tooltip,
  Tr,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateMatricula } from '../../features/matriculaSlice';
import { MdOutlineAddTask } from 'react-icons/md';

const ModalRegistrarObservaciones = ({ row, configuracion }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleModalOpen = data => {
    setIsModalOpen(true);    
    setFormData(
      data.observacionesPeriodo.reduce((acc, periodo) => {
        acc[`periodo${periodo.periodo}Academica`] = periodo.academica || '';
        acc[`periodo${periodo.periodo}Comportamental`] = periodo.comportamental || '';
        return acc;
      }, {})
    );
  }

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
  };

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
      <Tooltip
        label={'Registrar observaciones del estudiante'}
        placement="auto"
        hasArrow
      >
        <IconButton
          colorScheme="purple"
          _dark={{ bg: 'purple.500', color: 'white', _hover: { bg: 'purple.600' } }}
          isRound
          onClick={() => handleModalOpen(row)}
          icon={<MdOutlineAddTask />}
          isDisabled={
            configuracion?.permitirRegistrarObservadores === false
          }
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
