import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
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
  Radio,
  RadioGroup,
  Select,
  Stack,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createUsuario } from '../../features/usuarioSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import AddMultipleSelectComponent from '../global/AddMultipleSelectComponent';

export const ModalAgregarPersona = ({ sedes }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    correo: '',
    sexo: '',
    password: '',
    rol: '',
    sedes: [],
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
    dispatch(createUsuario(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <>
      <Button
        bg="primary.100"
        color="white"
        _hover={{ bg: 'primary.200' }}
        _dark={{
          bg: 'primary.100',
          color: 'white',
          _hover: { bg: 'primary.200' },
        }}
        aria-label="Agregar"
        leftIcon={<Icon as={VscAdd} fontSize="lg" />}
        variant="solid"
        rounded={'xl'}
        onClick={handleModalOpen}
      >
        Nuevo Registro
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
          <ModalHeader textAlign="center">AGREGAR NUEVO USUARIO</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'column' }}
              justifyContent="space-between"
              p={4}
            >
              <Stack spacing={4} direction={{ base: 'column', lg: 'row' }}>
                <FormControl>
                  <FormLabel fontWeight="semibold">
                    NOMBRES Y APELLIDOS
                  </FormLabel>
                  <Input
                    placeholder="Ingrese los nombres y apellidos"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="semibold">CORREO</FormLabel>
                  <Input
                    placeholder="Ingrese el correo"
                    defaultValue={'@gmail.com'}
                    type="email"
                    onChange={e =>
                      setIndice({ ...indice, correo: e.target.value })
                    }
                  />
                  <FormHelperText textColor={'red.500'}>
                    {indice.correo.includes('@')
                      ? ''
                      : indice.correo.length > 0
                      ? 'El correo debe contener el caracter @'
                      : ''}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={4} justifyContent={'center'} alignItems="center">
                <FormControl>
                  <FormLabel fontWeight="semibold">SEXO</FormLabel>
                  <RadioGroup
                    onChange={value => setIndice({ ...indice, sexo: value })}
                    value={indice?.sexo}
                    colorScheme="primary"
                    size={'lg'}
                  >
                    <Stack direction="row">
                      <Radio value="M">Masculino</Radio>
                      <Radio value="F">Femenino</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={4}>
              <FormControl>
                <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingrese la contraseña"
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
                <FormHelperText textColor={'red.500'}>
                  {indice.password.length > 0 && indice.password.length < 6
                    ? 'debe tener al menos 6 caracteres'
                    : ''}
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight="semibold">ROL</FormLabel>
                <Select
                  onChange={e => setIndice({ ...indice, rol: e.target.value })}
                  placeholder="SELECCIONE ROL DEL USUARIO"
                >
                  <option value="ADMIN_ROLE">ADMINISTRADOR</option>
                  <option value="DOCENTE_ROLE">DOCENTE</option>
                  {/* <option value="SECRETARIA_ROLE">SECRETARIA</option> */}
                  <option value="DOCENTE_TITULAR_ROLE">DOCENTE TITULAR</option>
                </Select>
              </FormControl>
              </Stack>              
              <AddMultipleSelectComponent
                name="SEDES"
                data={sedes}
                handleSelect={e =>
                  setIndice({ ...indice, sedes: e.map(item => item.value) })
                }
              />
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
              borderRadius="xl"
              disabled={
                indice.nombre === '' ||
                indice.correo === '' ||
                indice.password === '' ||
                indice.rol === '' ||
                indice.sedes.length === 0
              }
            >
              GUARDAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
