import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createAcademicYear } from '../../features/academicYearSlice';

const ModalAgregarApertura = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    year: '',
    startDate: '',
    endDate: '',
    numBimestres: '',
    periodo: "1",
    isActive: true,
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = () => {
    dispatch(createAcademicYear(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleRadioChange = value => {
    setIndice(prevState => ({
      ...prevState,
      isActive: value === 'true', // RadioGroup value is a string
    }));
  };

  return (
    <>
      <Button
        colorScheme="primary"
        _dark={{
          bg: 'primary.100',
          color: 'white',
          _hover: { bg: 'primary.300' },
        }}
        onClick={handleModalOpen}
        variant="solid"
        rounded={'xl'}
      >
        REGISTRAR NUEVO AÑO
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="5xl"
        isCentered
      >
        <ModalOverlay
          bg="rgba(11,15,25, 0.8)"
          backdropFilter="auto"
          backdropBlur="2px"
        />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
          <ModalHeader textAlign="center">
            REGISTRAR NUEVO AÑO ACADEMICO
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">Año</FormLabel>
                <Input
                  placeholder="2024"
                  type="text"
                  onChange={e => setIndice({ ...indice, year: e.target.value })}
                  textTransform="uppercase"
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>Fecha Inicio</FormLabel>
                  <Input
                    type="date"
                    onChange={e =>
                      setIndice({ ...indice, startDate: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>Fecha Fin</FormLabel>
                  <Input
                    type="date"
                    onChange={e =>
                      setIndice({ ...indice, endDate: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">Periodo</FormLabel>
                  <RadioGroup
                    onChange={e => setIndice({ ...indice, periodo: e })}
                    value={indice?.periodo || ''}
                  >
                    <Stack direction="row">
                      <Radio value={"1"}>I</Radio>
                      <Radio value={"2"}>II</Radio>
                      <Radio value={"3"}>III</Radio>
                      <Radio value={"4"}>IV</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                <FormControl isRequired alignSelf={'center'}>
                  <FormLabel fontWeight={'semibold'}>Estado</FormLabel>
                  <RadioGroup
                    onChange={handleRadioChange}
                    value={indice.isActive.toString()}
                  >
                    <Stack direction="row">
                      <Radio value="true">Activo</Radio>
                      <Radio value="false">Inactivo</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Stack>
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
              bg="primary.100"
              color="white"
              _hover={{ bg: 'primary.200' }}
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.200' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              isDisabled={
                indice.year === '' ||
                indice.startDate === '' ||
                indice.endDate === ''
              }
              borderRadius="xl"
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAgregarApertura;
