import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button,
    Icon,
    Flex,
    Tooltip,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { AiOutlineAlert } from 'react-icons/ai';
import { deleteAcademicYear } from '../../features/academicYearSlice';

export const AlertEliminar = ({ row }) => {

    const dispatch = useDispatch();

    const [isOpenAlert, setIsOpenAlert] = useState(false);

    const handleOpenAlert = () => {
        setIsOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setIsOpenAlert(false);
    }

    const handleDelete = (id) => {
        dispatch(deleteAcademicYear(id));
    }

    return (
        <>
            <Tooltip hasArrow label='Eliminar' placement='auto'>
                <IconButton
                    aria-label="Eliminar"
                    onClick={() => handleOpenAlert(row?._id)}
                    icon={<Icon as={MdDelete} />}
                    fontSize="2xl"
                    colorScheme="red"
                    _dark={{ color: "white", bg: 'red.500', _hover: { bg: "red.600" } }}
                    variant={'solid'}
                    ml={2}
                />
            </Tooltip>
            <AlertDialog
                motionPreset='slideInBottom'
                onClose={handleCloseAlert}
                isOpen={isOpenAlert}
                isCentered
                size="xl"
            >
                <AlertDialogOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />

                <AlertDialogContent py={6} _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                    <Flex textAlign="center" justifyContent="center" p={2}>
                        <Icon as={AiOutlineAlert} fontSize="9xl" color="red.500" />
                    </Flex>
                    <AlertDialogHeader textAlign="center" fontSize="3xl">¿Está seguro de eliminar? </AlertDialogHeader>
                    <AlertDialogBody textAlign="center" fontSize="xl">
                        ¡No podrás revertir esto!
                    </AlertDialogBody>
                    <AlertDialogFooter justifyContent="center" fontWeight="normal">
                        <Button
                            onClick={handleCloseAlert}
                            size="lg"
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
                            ml={3}
                            onClick={() => handleDelete(row._id)}
                            size="lg"
                            borderRadius="xl"
                        >
                            ¡SÍ BÓRRALO!
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
