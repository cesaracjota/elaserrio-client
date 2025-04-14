import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Heading,
    HStack,
    Icon,
    IconButton,
    Stack,
    Text,
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getEstudiantes, reset } from '../../features/estudianteSlice';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { VscEdit } from 'react-icons/vsc';

const Estudiantes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { sedeSeleccionada } = useSelector((state) => state.auth);

    const { estudiantes, isLoading, isError, message, currentPage, totalRows } = useSelector((state) => state.estudiantes);
    
    const [perPage, setPerPage] = useState(10);

    const [page, setPage] = useState(1);

    useEffect(() => {

        dispatch(getEstudiantes({ page: currentPage, perPage, id: sedeSeleccionada?._id }));

        return () => {
            dispatch(reset())
        }

    }, [navigate, dispatch, currentPage, perPage, sedeSeleccionada?._id]);

    if (isError) {
        CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
        console.log(message);
    }

    const columns = [
        {
            name: 'NOMBRES',
            selector: row => row.nombres + ' ' + row.apellidos,
            sortable: true,
            cellExport: row => row.nombres + ' ' + row.apellidos,
            resizable: true,
            cell: row => (
                <div>
                    <Stack spacing={2} direction="row">
                        <Avatar
                            size="sm"
                            name={row?.nombres + ' ' + row?.apellidos}
                            src={row?.img}
                            fontWeight="bold"
                            fontSize="sm"
                            color="white"
                            display={{ base: "none", sm: 'none', lg: "flex" }}
                        />
                        <Text ml={2} noOfLines={2} fontSize="12px" alignSelf={"center"}>{row.nombres + ' ' + row.apellidos}</Text>
                    </Stack>
                </div>
            )
        },
        {
            name: 'DNI',
            selector: row => row.dni,
            sortable: true,
            cellExport: row => row.dni,
            resizable: true
        },
        {
            name: 'TURNO',
            selector: row => row.turno,
            sortable: true,
            cellExport: row => row.turno,
            resizable: true
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado },
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === 'ACTIVO' ? 'green' : row.estado === 'RETIRADO' ? 'blue' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell: row => (
                <div>
                    {/* <Link to={{
                        pathname: '/estudiantes/pagos/' + row._id
                    }}>
                        <Tooltip hasArrow label='Ver Historial de Pagos' placement='auto'>
                            <IconButton
                                aria-label="Ver"
                                icon={<FaFileInvoice />}
                                fontSize="2xl"
                                colorScheme="primary"
                                _dark={{ color: "white", _hover: { bg: "primary.300" } }}
                                variant={'solid'}
                            />
                        </Tooltip>
                    </Link> */}
                    <Link to={{
                        pathname: `/${sedeSeleccionada?._id}/estudiantes/${row._id}`,
                        state: { estudiante: row }
                    }}>
                        <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                            <IconButton
                                aria-label="Ver"
                                icon={<CgEyeAlt />}
                                fontSize="2xl"
                                colorScheme="primary"
                                _dark={{ color: "white", _hover: { bg: "primary.300" } }}
                                variant={'solid'}
                                ml={2}
                            />
                        </Tooltip>
                    </Link>
                    <Link to={{
                        pathname: `/${sedeSeleccionada?._id}/estudiantes/editar/${row._id}`,
                        state: { estudiante: row }
                    }}>
                        <Tooltip hasArrow label='Editar' placement='auto'>
                            <IconButton
                                aria-label="Editar"
                                colorScheme="gray"
                                _dark={{ color: "white", _hover: { bg: "gray.500" } }}
                                icon={<Icon as={VscEdit} fontSize="2xl" />}
                                variant="solid"
                                ml={2}
                            />
                        </Tooltip>
                    </Link>
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '240px'
        }
    ];

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getEstudiantes({ page, perPage }));
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getEstudiantes({ page: 1, perPage: newPerPage }));
    };

    const tableData = {
        columns: columns,
        data: estudiantes
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row" w={'full'} justifyContent={'space-between'}>
                    <Heading size="md">Lista de Estudiantes</Heading>
                    <Link to={{
                        pathname: `/${sedeSeleccionada?._id}/estudiantes/nuevo`,
                        state: { idSede: sedeSeleccionada?._id }
                    }}>
                        <Button colorScheme="primary" color={'white'} variant="solid" size="md" rounded="lg">
                            AGREGAR ESTUDIANTE
                        </Button>
                    </Link>
                </HStack>
            </Stack>
            <Box
                borderRadius="2xl"
                borderTop={'2px'}
                borderTopColor={'primary.100'}
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: 'primary.1000' }}
                mt={2}
                pt={2}
            >
                <DataTableExtensions
                    {...tableData}
                    print={false}
                    exportHeaders={true}
                    filterPlaceholder="BUSCAR ESTUDIANTE"
                    numberOfColumns={columns.length}
                    fileName={'ESTUDIANTES' + new Date().toLocaleDateString()}
                >
                    <DataTable
                        defaultSortField="nombre"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination
                        paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationServer
                        paginationPerPage={perPage}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
                        paginationDefaultPage={page}
                        paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por pagina:',
                            rangeSeparatorText: 'de',
                            noRowsPerPage: false,
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }}
                        theme={themeTable}
                        customStyles={customStyles}
                        pointerOnHover={true}
                        responsive={true}
                        noDataComponent={<Text mb={4} fontSize="lg">NO HAY REGISTROS</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Estudiantes;