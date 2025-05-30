import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge,
    Box,
    Heading,
    Icon,
    IconButton,
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getAllPagos, updateEstadoPago, reset } from '../../features/pagos/pagoSlice';
import ModalRegistrarPago from './ModalRegistrarPago';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { RiArrowDownSLine } from 'react-icons/ri';
import { CgEyeAlt } from 'react-icons/cg';
import { FaFileInvoice } from 'react-icons/fa';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';

const Pagos = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { pagos, isLoading, isError, message, currentPage, totalRows } = useSelector((state) => state.pagos);

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        if (isError) {
            CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
            console.log(message);
        }

        dispatch(getAllPagos({ page: currentPage, perPage }))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, currentPage, perPage, isError, message]);

    // actualizar estado de un pago registrado en este caso pendiente

    const handleUpdateEstado = (data) => {
        dispatch(updateEstadoPago(data));
    }

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true,
            width: '120px'
        },
        {
            name: 'ESTUDIANTE',
            selector: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            resizable: true,
            cell: row => (
                <div>
                    <Link
                        to={`/estudiantes/pagos/${row?.estudiante?._id}`}
                    >
                        <Stack spacing={1} direction="row" align={'center'}>
                            <Avatar
                                size="sm"
                                name={row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}
                                src={row?.estudiante?.img}
                                fontWeight="bold"
                                fontSize="sm"
                                color="white"
                                display={{ base: "none", lg: "flex" }}
                            />
                            <Text noOfLines={1} fontSize="12px" color={'primary.200'} _hover={{ color: 'primary.300' }}>{row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}</Text>
                        </Stack>
                    </Link>
                </div>
            )
        },
        {
            name: 'CONCEPTO',
            selector: row => row.concepto?.map(data => data.nombre).join(', '),
            sortable: true,
            cellExport: row => row.concepto?.map(data => data.nombre).join(', '),
            resizable: true,
        },
        {
            name: 'IMPORTE',
            selector: row => row.importe,
            sortable: true,
            cellExport: row => row.importe,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        bg={'messenger.600'}
                        variant="solid"
                        w={24}
                        py={2}
                        textAlign="center"
                        rounded="full"
                        color="white"
                    >
                        S/{row.importe}
                    </Badge>
                </div>
            ),
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
                        colorScheme={row.estado === 'PENDIENTE' ? 'gray' : row.estado === 'INCOMPLETO' ? 'red' : 'green'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado}
                    </Badge>
                </div>
            ),
            width: '120px'
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell: row => (
                <Menu
                    placement="start"
                >
                    <MenuButton
                        as={IconButton}
                        icon={<RiArrowDownSLine fontSize={16} />}
                        variant='ghost'
                        rounded="full"
                        alignSelf="center"
                    />
                    <MenuList>
                        <MenuItem
                            as={Stack}
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Link to={{
                                pathname: '/pagos/' + row._id
                            }}>
                                <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<CgEyeAlt />}
                                        fontSize="2xl"
                                        _dark={{ color: "white", bg: 'blue.600', _hover: { bg: "blue.700" } }}
                                        colorScheme="blue"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            </Link>
                            <Link to={{
                                pathname: '/pagos/boleta/' + row._id
                            }}>
                                <Tooltip hasArrow label='Ver la Boleta' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<FaFileInvoice />}
                                        fontSize="xl"
                                        _dark={{ color: "white", bg: 'purple.600', _hover: { bg: "purple.700" } }}
                                        colorScheme="purple"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            </Link>
                            {row.estado !== 'CANCELADO' ? (
                                <Tooltip hasArrow label='Actualizar Estado' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<MdOutlinePublishedWithChanges />}
                                        onClick={() => handleUpdateEstado(row)}
                                        fontSize="xl"
                                        _dark={{ color: "white", bg: 'green.600', _hover: { bg: "green.700" } }}
                                        colorScheme="green"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            ) : null}
                            <AlertEliminar row={row} />
                        </MenuItem>
                    </MenuList>
                </Menu>
            ),
        }
    ]

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getAllPagos({ page, perPage }));
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getAllPagos({ page: 1, perPage: newPerPage }));
    };

    const tableData = {
        columns: columns,
        data: pagos,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <Heading size="lg" fontWeight="bold">Pagos</Heading>
                <ModalRegistrarPago />
            </Stack>
            <Box
                borderRadius="2xl"
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000" }}
                mt={2}
                pt={2}
            >
                <DataTableExtensions
                    {...tableData}
                    print={false}
                    exportHeaders={true}
                    filterPlaceholder="BUSCAR"
                    numberOfColumns={7}
                    fileName={'PAGO_EBR' + new Date().toLocaleDateString()}
                >
                    <DataTable
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination={true}
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
                        noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Pagos;