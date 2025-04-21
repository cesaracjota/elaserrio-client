import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  Select,
  Switch
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateAcademicYear } from '../../features/academicYearSlice';
import moment from 'moment';

const ModalEditarApertura = ({ row }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    year: '',
    startDate: '',
    endDate: '',
    numBimestres: '',
    periodo: '',
    isActive: false,
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = data => {
    setIsModalOpen(true);
    setIndice(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateAcademicYear(indice));
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="gray"
          _dark={{ color: 'white', _hover: { bg: 'gray.500' } }}
          aria-label="Editar"
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant={'solid'}
          onClick={() => handleModalOpen(row)}
          ml={2}
        />
      </Tooltip>
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
          <ModalHeader textAlign="center">ACTUALIZAR GRADO</ModalHeader>
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
                  defaultValue={indice ? indice.year : ''}
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
                    value={moment.utc(indice?.startDate).format('YYYY-MM-DD')}
                    type="date"
                    onChange={e =>
                      setIndice({ ...indice, startDate: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={'semibold'}>Fecha Fin</FormLabel>
                  <Input
                    value={moment.utc(indice?.endDate).format('YYYY-MM-DD')}
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
                  <Select
                    onChange={e => setIndice({ ...indice, periodo: e.target.value })}
                    defaultValue={indice.periodo || ''}
                  >
                    <option value={"1"}>I</option>
                    <option value={"2"}>II</option>
                    <option value={"3"}>III</option>
                    <option value={"4"}>IV</option>
                  </Select>
                </FormControl>

                <FormControl isRequired alignSelf={'center'}>
                  <FormLabel fontWeight={'semibold'}>Habilitar año académico</FormLabel>
                  <Switch
                    colorScheme="green"
                    size="lg"
                    isChecked={indice.isActive}
                    onChange={e =>
                      setIndice({ ...indice, isActive: e.target.checked })
                    }
                    value={indice.isActive.toString()}
                  />
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
              onClick={handleUpdate}
              borderRadius="xl"
            >
              ACTUALIZAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarApertura;
