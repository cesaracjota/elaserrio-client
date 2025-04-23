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
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select as SelectChakra,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getEstudianteSearch, reset } from '../../features/estudianteSlice';
import { CustomToast } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { updateMatricula } from '../../features/matriculaSlice';
import { FiEdit3 } from 'react-icons/fi';

const ModalEditarMatricula = ({ data, configuracion, grados, mis_grados }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sedeSeleccionada, user } = useSelector(state => state.auth);
  const { isError, message } = useSelector(state => state.matriculas);

  useEffect(() => {
    dispatch(getEstudianteSearch(''));
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  if (isError) {
    CustomToast({
      title: 'Error',
      message,
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    console.log(message);
  }

  const initialValues = {
    estudiante: null,
    grado: null,
    sede: sedeSeleccionada?._id,
    observaciones: '',
    estado: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = data => {
    setIndice(data);
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = () => {
    dispatch(updateMatricula(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  return (
    <>
      <IconButton
        icon={<FiEdit3 />}
        colorScheme="cyan"
        color="white"
        _dark={{
          bg: 'cyan.500',
          color: 'white',
          _hover: { bg: 'cyan.600' },
        }}
        isRound
        fontSize={'sm'}
        isDisabled={
          configuracion?.permitirModificarMatriculas === false
        }
        onClick={() => handleModalOpen(data)}
        mr={2}
      />
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="5xl">
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="lg">
          <ModalHeader textAlign="center">
            MODIFICAR NUEVA MATRICULA
          </ModalHeader>
          <ModalBody>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              justifyContent="space-between"
              w={'full'}
            >
              <Stack
                spacing={4}
                direction="column"
                w={'full'}
                justifyContent="space-between"
              >
                <Stack
                  spacing={6}
                  direction={'column'}
                  w={'full'}
                  justifyContent="space-between"
                >
                  <Card
                    borderRadius="lg"
                    w={'full'}
                    border={'1px'}
                    borderColor={'gray.200'}
                    _dark={{ bg: 'primary.1000', borderColor: 'gray.600' }}
                  >
                    <CardHeader borderBottomWidth="1px" py={2}>
                      Estudiante Seleccionado
                    </CardHeader>
                    <CardBody py={2}>
                      {indice.estudiante !== null ? (
                        <Stack>
                          <Flex align="center">
                            <Avatar
                              name={
                                indice?.estudiante?.nombres +
                                ' ' +
                                indice?.estudiante?.apellidos
                              }
                              src={indice?.estudiante?.foto}
                              size="sm"
                              color={'white'}
                              fontWeight={'bold'}
                              mr={4}
                            />
                            <Box>
                              <Text fontSize="sm" fontWeight="bold">
                                {indice?.estudiante?.nombres +
                                  ' ' +
                                  indice?.estudiante?.apellidos}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                DNI: {indice?.estudiante?.dni}
                              </Text>
                            </Box>
                          </Flex>
                        </Stack>
                      ) : (
                        <Text textAlign="center" color="gray.500" py={2}>
                          Seleccione un estudiante para ver los detalles
                        </Text>
                      )}
                    </CardBody>
                  </Card>
                  <Stack
                    spacing={4}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {user?.usuario?.rol === 'ADMIN_ROLE' ? (
                      <FormControl>
                        <FormLabel>GRADO A MATRICULAR</FormLabel>
                        <SelectChakra
                          onChange={e =>
                            setIndice({ ...indice, grado: e.target.value })
                          }
                          defaultValue={indice?.grado?._id || ''}
                        >
                          <option>SELECCIONE GRADO A MATRICULAR</option>
                          {grados?.map(data => (
                            <option key={data?._id} value={data?._id}>
                              {data.nombre} - {data.nivel}
                            </option>
                          ))}
                        </SelectChakra>
                      </FormControl>
                    ) : (
                      <FormControl>
                        <FormLabel>GRADO A MATRICULAR</FormLabel>
                        <SelectChakra
                          onChange={e =>
                            setIndice({ ...indice, grado: e.target.value })
                          }
                          defaultValue={indice?.grado?._id || ''}
                        >
                          <option>SELECCIONE GRADO A MATRICULAR</option>
                          {mis_grados?.map(data => (
                            <option key={data?._id} value={data?._id}>
                              {data.nombre} - {data.nivel}
                            </option>
                          ))}
                        </SelectChakra>
                      </FormControl>
                    )}                  
                  </Stack>
                  <FormControl>
                    <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                    <Textarea
                      placeholder="Notas adicionales..."
                      defaultValue={indice?.observaciones}
                      onChange={e =>
                        setIndice({ ...indice, observaciones: e.target.value })
                      }
                      rows={4}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                    <RadioGroup
                      value={indice?.estado}
                      onChange={e => setIndice({ ...indice, estado: e })}
                    >
                      <Stack direction="row">
                        <Radio value={'Activa'}>Activa</Radio>
                        <Radio value={'Retirado'}>Retirado</Radio>
                        <Radio value={'Suspendida'}>Suspendida</Radio>
                        <Radio value={'Finalizada'}>Finalizada</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
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
              colorScheme="primary"
              _dark={{
                bg: 'primary.500',
                color: 'white',
                _hover: { bg: 'primary.600' },
              }}
              size="lg"
              mr={3}
              onClick={handleSave}
              isDisabled={!indice.estudiante || !indice.grado}
              borderRadius="xl"
            >
              MODIFICAR MATRICULA
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarMatricula;
