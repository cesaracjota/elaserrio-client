import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuario } from '../../features/usuarioSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import EditMultipleSelectComponent from '../global/EditMultipleSelectComponent';

export const ModalEditarPersona = ({ row, roles, sedes, cursos }) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    uid: null,
    nombre: '',
    correo: '',
    password: '',
    rol: '',
    sedes: [],
    estado: null,
  };

  const [indice, setIndice] = useState(initialValues);

  console.log(indice);

  const handleModalOpen = data => {
    setIsModalOpen(true);
    setIndice(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateUsuario(indice));
    setIsModalOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="gray"
          _dark={{ color: 'white', _hover: { bg: 'gray.500' } }}
          aria-label="Editar"
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant="solid"
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
          <ModalHeader textAlign="center">ACTUALIZAR USUARIO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <FormControl>
                <FormLabel fontWeight="semibold">NOMBRES</FormLabel>
                <Input
                  defaultValue={indice ? indice.nombre : ''}
                  placeholder="Escribe los nombres"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, nombre: e.target.value })
                  }
                />
              </FormControl>
              <Stack
                spacing={4}
                direction={{ base: 'column', md: 'row', lg: 'row' }}
                mt={4}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold">CORREO</FormLabel>
                  <Input
                    defaultValue={indice ? indice.correo : ''}
                    placeholder="Escribe el correo"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, correo: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Si desea, puede modificar el password"
                      onChange={e =>
                        setIndice({ ...indice, password: e.target.value })
                      }
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.75rem"
                        bg="primary.100"
                        color="white"
                        _hover={{ bg: 'primary.200' }}
                        _dark={{
                          bg: 'primary.100',
                          color: 'white',
                          _hover: { bg: 'primary.200' },
                        }}
                        size="sm"
                        onClick={handleShowClick}
                      >
                        {showPassword ? (
                          <Icon as={ViewIcon} />
                        ) : (
                          <Icon as={ViewOffIcon} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
              {user?.usuario?.rol === 'ADMIN_ROLE' ? (
                <Stack
                  spacing={4}
                  direction={'column'}
                  alignItems="center"
                  mt={4}
                >
                  <FormControl>
                    <FormLabel fontWeight="semibold">ROL</FormLabel>
                    <Select
                      defaultValue={indice ? indice.rol : ''}
                      onChange={e =>
                        setIndice({ ...indice, rol: e.target.value })
                      }
                      colorScheme="primary"
                    >
                      {/* <option value="SUPER_ADMIN_ROLE">SUPER ADMINISTRADOR</option> */}
                      <option value="ADMIN_ROLE">ADMINISTRADOR</option>
                      <option value="DOCENTE_ROLE">DOCENTE</option>
                      <option value="DOCENTE_TITULAR_ROLE">DOCENTE TITULAR</option>
                      {/*<option value="ESTUDIANTE_ROLE">ESTUDIANTE</option>
                      <option value="SECRETARIA_ROLE">SECRETARIA</option> */}
                    </Select>
                  </FormControl>

                  <EditMultipleSelectComponent
                    name="SEDES"
                    data={sedes}
                    dataEdit={indice.sedes}
                    handleSelect={e =>
                      setIndice({ ...indice, sedes: e.map(item => item.value) })
                    }
                  />

                  <FormControl>
                    <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                    <Switch
                      onChange={e =>
                        setIndice({ ...indice, estado: e.target.checked })
                      }
                      value={indice ? indice.estado : null}
                      colorScheme={'primary'}
                      isChecked={indice.estado === true ? true : false}
                      size="lg"
                    />
                  </FormControl>
                </Stack>
              ) : null}
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
