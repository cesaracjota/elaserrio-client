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
  Textarea,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createRol } from '../../features/rolSlice';
import AddMultipleSelectComponent from '../global/AddMultipleSelectComponent';

const ModalAgregarRol = ({ modulosData }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    nombre: '',
    slug: '',
    descripcion: '',
    estado: '',
    modulos: '',
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
    dispatch(createRol(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
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
        REGISTRAR NUEVO ROL
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
          <ModalHeader textAlign="center">REGISTRAR NUEVO ROL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    placeholder="ADMINISTRADOR"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                    textTransform="uppercase"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">SLUG</FormLabel>
                  <Input
                    placeholder="ADMIN_ROLE"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, slug: e.target.value })
                    }
                    textTransform="uppercase"
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">DESCRIPCION</FormLabel>
                  <Textarea
                    placeholder="Descripcion del rol"
                    onChange={e =>
                      setIndice({ ...indice, descripcion: e.target.value })
                    }
                    textTransform="uppercase"
                  />
                </FormControl>
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <AddMultipleSelectComponent
                  name="MODULOS"
                  data={modulosData}
                  handleSelect={e =>
                    setIndice({ ...indice, modulos: e.map(item => item.value) })
                  }
                  // Component={<ModalAgregarModulo />}
                />
              </Stack>

              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl isRequired alignSelf={'center'}>
                  <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                  <RadioGroup
                    onChange={e =>
                      setIndice({ ...indice, estado: e.target.value })
                    }
                    defaultChecked={indice ? indice.estado : ''}
                    colorScheme="primary"
                    size="lg"
                  >
                    <Stack direction="row">
                      <Radio value="activo">Activo</Radio>
                      <Radio value="inactivo">Inactivo</Radio>
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
              isDisabled={indice.nombre === '' || indice.slug === ''}
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

export default ModalAgregarRol;
