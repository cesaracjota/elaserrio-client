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
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { VscEdit } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { updateRol } from '../../features/rolSlice';
import EditMultipleSelectComponent from '../global/EditMultipleSelectComponent';

const ModalEditarRol = ({ row, modulosData }) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    _id: null,
    nombre: '',
    slug: '',
    descripcion: '',
    estado: '',
    modulos: null,
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
    dispatch(updateRol(indice));
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip hasArrow label="Editar" placement="auto">
        <IconButton
          colorScheme="blackAlpha"
          _dark={{ color: 'white', _hover: { bg: 'whiteAlpha.200' } }}
          aria-label="Editar"
          icon={<Icon as={VscEdit} fontSize="2xl" />}
          variant={'ghost'}
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
          <ModalHeader textAlign="center">ACTUALIZAR ROL</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction="column"
              justifyContent="space-between"
              p={4}
            >
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <FormControl>
                  <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                  <Input
                    defaultValue={indice ? indice.nombre : ''}
                    placeholder="Escribe el nombre de la categoria"
                    type="text"
                    onChange={e =>
                      setIndice({ ...indice, nombre: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">SLUG</FormLabel>
                  <Input
                    placeholder="ADMIN_ROLE"
                    type="text"
                    defaultValue={indice ? indice.slug : ''}
                    onChange={e =>
                      setIndice({ ...indice, slug: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <FormControl>
                <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                <Textarea
                  defaultValue={indice ? indice.descripcion : ''}
                  placeholder="Escribe la descripcion"
                  type="text"
                  onChange={e =>
                    setIndice({ ...indice, descripcion: e.target.value })
                  }
                />
              </FormControl>
              <Stack spacing={4} direction="row" justifyContent="space-between">
                <EditMultipleSelectComponent
                  name="MODULOS"
                  data={modulosData}
                  dataEdit={indice.modulos}
                  handleSelect={e =>
                    setIndice({ ...indice, modulos: e.map(item => item.value) })
                  }
                  // Component={<ModalAgregarModulo />}
                />
              </Stack>
              <Stack direction="row" justifyContent="space-between" w="full">
                <Text fontWeight="semibold">ESTADO</Text>
                <RadioGroup
                  onChange={e =>
                    setIndice({ ...indice, estado: e })
                  }
                  defaultValue={indice ? indice.estado : ''}
                  colorScheme="primary"
                  size="lg"
                >
                  <Stack direction="row">
                    <Radio value="activo">Activo</Radio>
                    <Radio value="inactivo">Inactivo</Radio>
                  </Stack>
                </RadioGroup>
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
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.300' },
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

export default ModalEditarRol;
