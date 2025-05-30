import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createActivo } from '../../features/activoSlice';
import { Link, useNavigate } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import { FaArrowLeft } from 'react-icons/fa';
import { Loading } from '../../helpers/Loading';
import { getTipoActivos, reset } from '../../features/tipoActivoSlice';
import { RiFileList2Fill } from 'react-icons/ri';
import ModalAgregarCategoria from './categorias/ModalAgregarCategoria';

const AgregarActivo = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { tipo_activos, isLoading, isError, message } = useSelector((state) => state.tipo_activos);

    const listaTiposActivo = tipo_activos.filter(t_activo => t_activo.estado !== false)

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getTipoActivos());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if (isError) {
        CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
        console.log(message);
    }

    const initialValues = {
        codigo: 0,
        nombre: '',
        tipo_activo: '',
        modelo: '',
        marca: '',
        color: '',
        procesador: '',
        ram: '',
        accesorios: '',
        condicion: '',
        cantidad: '',
        fecha_compra: '',
        descripcion: '',
        ubicacion: '',
        responsable: '',
        img: '',
        observaciones: '',
        fecha_anulacion: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createActivo(indice)).then(() => {
            setCargando(false);
            navigate('/ebr/equipos');
        })
        setIndice(initialValues);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/equipos'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'black'}>Agregar Nuevo Equipo</Text>
                </HStack>
            </Stack>

            <form onSubmit={handleSave}>
                <Box
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.1000" }}
                    mt={4}
                    p={6}
                >

                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl display="none">
                                <FormLabel fontWeight={'semibold'}>CÓDIGO</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Ingrese el codigo'
                                        defaultValue={indice.codigo !== '' ? indice.codigo : ''}
                                        onChange={(e) => setIndice({ ...indice, codigo: 0 })}
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                <Input
                                    placeholder="Escribe el nombre"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                <Input
                                    placeholder='Ejemplo: 100'
                                    type="number"
                                    onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>TIPOS / CATEGORIA</FormLabel>
                                <Stack direction="row" justifyContent="space-between" w="full">
                                    <Select
                                        placeholder="Selecciona una opción"
                                        onChange={(e) => setIndice({ ...indice, tipo_activo: e.target.value })}
                                    >
                                        {listaTiposActivo.map((tipo_activo) => (
                                            <option key={tipo_activo._id} value={tipo_activo?._id}>
                                                {tipo_activo?.nombre}
                                            </option>
                                        ))}
                                    </Select>
                                    <ModalAgregarCategoria />
                                </Stack>
                            </FormControl>
                        </Stack>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                            <Textarea
                                placeholder="Escribe la descripcion"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                rows={2}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                            <Input
                                type="text"
                                placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>UBICACIÓN DEL EQUIPO</FormLabel>
                            <Input
                                type="text"
                                placeholder='Ejemplo: Oficina 1'
                                onChange={(e) => setIndice({ ...indice, ubicacion: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>RESPONSABLE</FormLabel>
                            <Input
                                type="text"
                                placeholder='Ejemplo: Juan Perez'
                                onChange={(e) => setIndice({ ...indice, responsable: e.target.value })}
                            />
                        </FormControl>
                    </Stack>

                </Box>

                    <Stack spacing={4} direction="row" justifyContent="space-between" py={6}>
                        <Text fontSize="lg" fontWeight={'black'}>Más Detalles del activo / equipo</Text>
                        <Icon as={RiFileList2Fill} fontSize="xl" />
                    </Stack>

                <Box
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.1000" }}
                    p={6}
                >

                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>MODELO</FormLabel>
                                <Input
                                    placeholder='Ejemplo: HP - ELITEBOOK 840'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, modelo: e.target.value })}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>MARCA</FormLabel>
                                <Input
                                    placeholder='Ejemplo: LENOVO'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, marca: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>COLOR</FormLabel>
                                <Input
                                    placeholder='Ejemplo: ROJO'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, color: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>PROCESADOR</FormLabel>
                                <Input
                                    placeholder='Ejemplo: HP - ELITEBOOK 840'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, procesador: e.target.value })}
                                />
                                <FormHelperText>
                                    <Text fontSize="xs" color="yellow.500">
                                        *Si no tiene procesador o ram, dejar en blanco
                                    </Text>
                                </FormHelperText>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>RAM</FormLabel>
                                <Input
                                    placeholder='Ejemplo: 16GB'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, ram: e.target.value })}
                                />
                                <FormHelperText>
                                    <Text fontSize="xs" color="yellow.500">
                                        *Si no tiene procesador o ram, dejar en blanco
                                    </Text>
                                </FormHelperText>
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CONDICIÓN</FormLabel>
                                <Input
                                    placeholder='Ejemplo: BUENO / REGULAR / MALO'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, condicion: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>FECHA DE COMPRA</FormLabel>
                                <Input
                                    type="date"
                                    onChange={(e) => setIndice({ ...indice, fecha_compra: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>ACCESORIOS</FormLabel>
                                <Input
                                    placeholder='Ejemplo: MOUSE, TECLADO, CABLE DE RED'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, accesorios: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.observaciones : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    placeholder="Escribe las observaciones acerca del articulo"
                                    rows={2}
                                />
                            </FormControl>
                            <Stack spacing={4} direction="row">
                                <FormControl isRequired>
                                    <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                    <RadioGroup
                                        onChange={(e) => setIndice({ ...indice, estado: e })}
                                    >
                                        <Stack direction='row'>
                                            <Radio value={"activo"}>Activo</Radio>
                                            <Radio value={"inactivo"}>Inactivo</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>

                                <FormControl hidden={indice.estado !== "inactivo"}>
                                    <FormLabel fontWeight={'semibold'}>FECHA DE ANULACIÓN / INACTIVIDAD</FormLabel>
                                    <Input
                                        type="date"
                                        onChange={(e) => setIndice({ ...indice, fecha_anulacion: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>

                        </Stack>

                        <Stack spacing={4} direction="row" justifyContent="right">
                            <Button
                                colorScheme="purple"
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                loadingText='Guardando...'
                                spinnerPlacement='start'
                                size="lg"
                                type='submit'
                                isLoading={cargando ? true : false}
                                disabled={indice.nombre === '' || indice.codigo === '' || indice.tipo_activo === '' || indice.modelo === '' || indice.marca === '' ? true : false}
                                borderRadius="xl"
                            >
                                Guardar
                            </Button>
                        </Stack>

                    </Stack>
                </Box>
            </form>

        </>
    )
}

export default AgregarActivo;