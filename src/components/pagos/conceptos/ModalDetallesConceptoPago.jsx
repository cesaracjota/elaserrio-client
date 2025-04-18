import React, { useState, useRef } from 'react'
import { 
    Drawer, 
    DrawerBody,
    DrawerContent, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerOverlay,
    IconButton,
    Button,
    Stack,
    Text,
    Divider,
    Badge,
    Tooltip,
} from '@chakra-ui/react';
import Moment from 'moment';
import { CgEyeAlt } from 'react-icons/cg';

const ModalDetallesConceptoPago = ({ data }) => {

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const btnRef = useRef();

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    }

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                <IconButton
                    aria-label="Ver"
                    icon={<CgEyeAlt />}
                    fontSize="xl"
                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                    colorScheme="blue"
                    variant="ghost"
                    onClick={handleOpenDrawer}
                />
            </Tooltip>
            <Drawer
                isOpen={isOpenDrawer}
                placement='bottom'
                onClose={handleCloseDrawer}
                finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent _dark={{ bg: "primary.1000" }}>
                    <DrawerHeader fontWeight="bold" bg="blue.600" color="gray.200" textAlign="center">INFORMACIÓN BASICA DE LA CATEGORÍA SELECCIONADA</DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" mt={6} px={[0, 10, 40, 60]}>
                            <Stack spacing={4} direction={{base : "column", lg: "row"}} justifyContent="space-between">
                                <Text fontWeight="bold">NOMBRE:</Text>
                                <Text>{ data?.nombre }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{base : "column", lg: "row"}} justifyContent="space-between">
                                <Text fontWeight="bold">DESCRIPCIÓN:</Text>
                                <Text>{ data?.descripcion }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{base : "column", lg: "row"}} justifyContent="space-between">
                                <Text fontWeight="bold">ESTADO:</Text>
                                <Badge
                                    colorScheme={data?.estado === true ? 'green' : 'red'}
                                    variant="solid"
                                    px={6}
                                    py={1.5}
                                    rounded="full"
                                >
                                    {data?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                </Badge>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{base : "column", lg: "row"}} justifyContent="space-between">
                                <Text fontWeight="bold">FECHA CREADA:</Text>
                                <Text>{ Moment(data?.createdAt).format('DD/MM/YYYY - hh:mm:ss A') }</Text>
                            </Stack>
                            <Divider />
                            <Stack spacing={4} direction={{base : "column", lg: "row"}} justifyContent="space-between">
                                <Text fontWeight="bold">FECHA ACTUALIZADA:</Text>
                                <Text>{ Moment(data?.updatedAt).format('DD/MM/YYYY - hh:mm:ss A') }</Text>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter w="full" justifyContent="center" textAlign="center" alignItems="center" display="flex">
                        <Button 
                            colorScheme="blue" 
                            _dark={{ bg: "blue.600", color: "white", _hover: { bg: "blue.700" } }} 
                            size="lg" 
                            onClick={handleCloseDrawer}
                            borderRadius="none"
                        >
                            OK
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ModalDetallesConceptoPago