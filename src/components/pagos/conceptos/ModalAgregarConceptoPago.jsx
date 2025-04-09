import React, { useState } from 'react'
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
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createConcepto } from '../../../features/pagos/conceptosPagoSlice';

const ModalAgregarConceptoPago = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        precio: '',
        descripcion: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleSave = () => {
        dispatch(createConcepto(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    return (
        <>
            <Tooltip hasArrow label='Agregar Nuevo Registro' placement='auto'>
                <IconButton
                    bg="primary.100"
                    color="white"
                    _hover={{ bg: 'primary.200' }}
                    _dark={{
                      bg: 'primary.100',
                      color: 'white',
                      _hover: { bg: 'primary.200' },
                    }}
                    aria-label="Agregar"
                    icon={<Icon as={VscAdd} fontSize="2xl" />}
                    variant="solid"
                    rounded="lg"
                    onClick={handleModalOpen}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl" isCentered>
                <ModalOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                    <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                        <ModalHeader textAlign="center">AGREGAR NUEVO REGISTRO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl isRequired>
                                    <FormLabel>NOMBRE</FormLabel>
                                    <Input
                                        placeholder="ESCRIBE EL NOMBRE"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>PRECIO</FormLabel>
                                    <Input
                                        placeholder="10.00"
                                        type="number"
                                        onChange={(e) => setIndice({ ...indice, precio: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme="red" 
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleModalClose}
                                borderRadius="xl"
                            >
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="purple" 
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.codigo === '' || indice.nombre === '' }
                                borderRadius="xl"
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarConceptoPago