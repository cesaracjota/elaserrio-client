import React, { useEffect } from 'react'
import {
    Stack,
    Text,
    Divider,
    Badge,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomToast } from '../../helpers/toast';
import { Loading } from '../../helpers/Loading';
import { getEgreso, reset } from '../../features/egresoSlice';
import moment from 'moment';

const DetallesEgreso = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { egreso, isLoading, isError, message } = useSelector((state) => state.egresos);

    const params = useParams(location);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getEgreso(params.id));

        return () => {
            dispatch(reset());
        }

    }, [user, navigate, dispatch, params.id]);

    if (isError) {
        CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
        console.log(message);
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Stack
                direction="column"
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full">
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'start'}>DETALLES DEL EGRESO</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CÓDIGO</Text>
                            <Text>{egreso?.codigo}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CATEGORÍA</Text>
                            <Text>{egreso?.categoria}</Text>
                        </Stack>
                        <Stack spacing={1} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">MONTO EGRESADO</Text>
                            <Badge
                                colorScheme={'purple'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                S/{egreso?.monto}
                            </Badge>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Text fontWeight="bold">DESCRIPCIÓN</Text>
                        <Text fontWeight="normal">
                            {egreso?.descripcion}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Text fontWeight="bold">FECHA REGISTRADA</Text>
                        <Text fontWeight="normal">
                            {moment(egreso?.createdAt).format('DD-MM-YYYY - HH:mm:ss A')}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full">
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'start'}>DETALLES DEL AUTORIZANTE DEL EGRESO</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">NOMBRES</Text>
                            <Text>{egreso?.responsable?.nombre}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">ROL</Text>
                            <Text>{egreso?.responsable?.rol === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'DOCENTE'}</Text>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-around" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CORREO</Text>
                            <Text>{egreso?.responsable?.correo}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
            >
                <Accordion allowMultiple defaultIndex={[0]}>
                    <AccordionItem>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <Text fontWeight="bold" alignSelf={'center'}>OBSERVACIONES</Text>
                                        </Box>
                                        {isExpanded ? (
                                            <MinusIcon fontSize='14px' />
                                        ) : (
                                            <AddIcon fontSize='14px' />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {egreso?.observaciones}
                                </AccordionPanel>

                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Stack>
        </>
    )
}

export default DetallesEgreso;
