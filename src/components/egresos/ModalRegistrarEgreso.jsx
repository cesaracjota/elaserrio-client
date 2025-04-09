import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select as SelectChakra,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createEgreso } from '../../features/egresoSlice';

const ModalRegistrarEgreso = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialValues = {
    concepto: '',
    descripcion: '',
    monto: 0,
    categoria: '',
    metodoPago: '',
    proveedor: '',
    comprobante: '',
    responsable: '',
    departamento: '',
    presupuestado: false,
    observaciones: '',
  };

  const [indice, setIndice] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
  };

  const handleSave = e => {
    e.preventDefault();
    dispatch(createEgreso(indice));
    setIsModalOpen(false);
    setIndice(initialValues);
  };

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
        Nuevo Registro de Egreso
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
        <ModalOverlay />
        <form onSubmit={handleSave}>
          <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="none">
            <ModalHeader textAlign="center">REGISTRAR NUEVO EGRESO</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
                mt={4}
              >
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">
                    Concepto de Egreso
                  </FormLabel>
                  {/* input de concepto de pago */}
                  <Input
                    type={'text'}
                    placeholder="Escribe el concepto de egreso"
                    onChange={e =>
                      setIndice({ ...indice, concepto: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
              <Stack
                spacing={4}
                direction="column"
                justifyContent="space-between"
                mt={4}
              >
                <FormControl>
                  <FormLabel fontWeight="semibold">
                    Descripción del egreso
                  </FormLabel>
                  <Textarea
                    placeholder="Descripcion del egreso"
                    onChange={e =>
                      setIndice({ ...indice, descripcion: e.target.value })
                    }
                    rows={2}
                  />
                </FormControl>
                <Stack
                  spacing={4}
                  direction={{ base: 'column', lg: 'row' }}
                  justifyContent="space-between"
                  mt={4}
                >
                  {/* monto, categoria y metodo de pago */}
                  <FormControl>
                    <FormLabel fontWeight="semibold">Monto (S/.)</FormLabel>
                    <Input
                      type={'number'}
                      onChange={e =>
                        setIndice({
                          ...indice,
                          monto: parseInt(e.target.value),
                        })
                      }
                      placeholder="Ingrese el monto"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold">Categoria</FormLabel>
                    <SelectChakra
                      placeholder="Selecciona una opción"
                      onChange={e =>
                        setIndice({ ...indice, categoria: e.target.value })
                      }
                    >
                      <option value="Salarios">Salarios</option>
                      <option value="Material Didáctico">
                        Material Didáctico
                      </option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Equipamiento">Equipamiento</option>
                      <option value="Otros">Otros</option>
                    </SelectChakra>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="semibold">Departamento</FormLabel>
                    <Input
                      type={'text'}
                      onChange={e =>
                        setIndice({ ...indice, departamento: e.target.value })
                      }
                      placeholder="Ingrese el departamento"
                    />
                  </FormControl>
                </Stack>
                <Stack
                  spacing={4}
                  direction={{ base: 'column', lg: 'row' }}
                  justifyContent="space-between"
                  mt={4}
                >
                  <FormControl isRequired>
                    <FormLabel fontWeight={'semibold'}>Presupuestado</FormLabel>
                    <Switch
                      onChange={e =>
                        setIndice({
                          ...indice,
                          presupuestado: e.target.checked,
                        })
                      }
                      colorScheme="red"
                      size="lg"
                      isChecked={indice?.presupuestado === true ? true : false}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={'semibold'}>Comprobante</FormLabel>
                    <Input
                      type={'text'}
                      onChange={e =>
                        setIndice({ ...indice, comprobante: e.target.value })
                      }
                      placeholder="Podría ser un número de factura o recibo"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={'semibold'}>
                      METODO DE PAGO
                    </FormLabel>
                    <SelectChakra
                      placeholder="Selecciona una opción"
                      onChange={e =>
                        setIndice({ ...indice, metodoPago: e.target.value })
                      }
                    >
                      <option value="EFECTIVO">EFECTIVO</option>
                      <option value="TARJETA DE CREDITO">
                        TARJETA DE CREDITO
                      </option>
                      <option value="TRANSFERENCIA BANCARIA">
                        TRANSFERENCIA BANCARIA
                      </option>
                      <option value="YAPE">YAPE</option>
                      <option value="OTRO">OTRO</option>
                    </SelectChakra>
                  </FormControl>
                </Stack>
                <FormControl>
                  <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                  <Textarea
                    placeholder="Observaciones adicionales de la entrega"
                    onChange={e =>
                      setIndice({ ...indice, observaciones: e.target.value })
                    }
                    rows={2}
                  />
                </FormControl>
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
                type="submit"
                isDisabled={
                  !indice?.concepto ||
                  !indice?.monto ||
                  !indice?.categoria ||
                  !indice?.metodoPago
                }
                borderRadius="xl"
              >
                REGISTRAR PAGO
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ModalRegistrarEgreso;
