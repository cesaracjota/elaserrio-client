import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { VscAdd } from 'react-icons/vsc';
import ModalEditarDocente from './ModalEditarDocente';
import moment from 'moment';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getAllUsuarios, reset } from '../../features/usuarioSlice';

const Estudiantes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { usuarios, isLoading, isError, message, currentPage, totalRows } =
    useSelector(state => state.usuarios);

  const [perPage, setPerPage] = useState(10);

  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getAllUsuarios({ page: currentPage, perPage }));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, currentPage, perPage]);

  if (isError) {
    CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
    console.log(message);
  }

  console.log(usuarios);

  const docentes = usuarios?.filter(
    usuario => usuario?.rol?.slug === 'DOCENTE_ROLE'
  );

  const columns = [
    {
      name: 'NOMBRES',
      selector: row => row.apellidos + ' ' + row.nombres,
      sortable: true,
      cellExport: row => row.apellidos + ' ' + row.nombres,
      resizable: true,
      cell: row => (
        <div>
          <Stack spacing={2} direction="row" align={'center'}>
            <Avatar
              size="sm"
              name={row.nombre}
              fontWeight="bold"
              src={row?.img}
              fontSize="sm"
              color="white"
              display={{ base: 'none', lg: 'flex' }}
            />
            <Text ml={1} fontSize="12px">
              {row.nombre}
            </Text>
          </Stack>
        </div>
      ),
    },
    {
      name: 'CORREO',
      selector: row => row.correo,
      sortable: true,
      cellExport: row => row.correo,
      resizable: true,
    },
    {
      name: 'SEDE ASIGNADO',
      selector: row => row.sedes.length,
      sortable: true,
      cellExport: row => row.sedes.length,
      cell: row => (
        <div>
          <Badge
            bg={'yellow.600'}
            variant="solid"
            textAlign="center"
            fontSize={'10px'}
            py={2}
            px={3}
            rounded="full"
            color="white"
            alignSelf={'center'}
          >
            {
              row.sedes.length <= 2 ? row.sedes.map((sede) => sede.nombre).join(', ') : `${row.sedes.length} SEDES ASIGNADAS`
            }
          </Badge>
        </div>
      ),
      center: true,
    },
    {
      name: 'ESTADO',
      selector: row => {
        return row.estado;
      },
      sortable: true,
      cellExport: row => row.estado,
      center: true,
      cell: row => (
        <div>
          <Badge
            colorScheme={
              row.estado === true
                ? 'green'
                : row.estado === 'RETIRADO'
                ? 'gray'
                : 'red'
            }
            variant="solid"
            w={28}
            textAlign="center"
            py={2}
            rounded="full"
          >
            {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
          </Badge>
        </div>
      ),
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <div>
          <Link
            to={{
              pathname: '/docentes/' + row._id,
              state: { activos: row },
            }}
          >
            <Tooltip hasArrow label="Ver Detalles" placement="auto">
              <IconButton
                aria-label="Ver"
                icon={<CgEyeAlt />}
                fontSize="2xl"
                _dark={{ color: 'white', _hover: { bg: 'blue.800' } }}
                colorScheme="blue"
                variant={'ghost'}
              />
            </Tooltip>
          </Link>
          <ModalEditarDocente row={row} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '220px',
    },
  ];

  const handlePageChange = page => {
    setPage(page);
    dispatch(getAllUsuarios({ page, perPage }));
  };

  const handleRowsPerPageChange = newPerPage => {
    setPerPage(newPerPage);
    dispatch(getAllUsuarios({ page: 1, perPage: newPerPage }));
  };

  const tableData = {
    columns: columns,
    data: docentes,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg">Docentes</Heading>
        <Link
          to={{
            pathname: '/docentes/agregar',
          }}
        >
          <Button
            colorScheme="purple"
            _dark={{
              bg: 'purple.600',
              color: 'white',
              _hover: { bg: 'purple.600' },
            }}
            aria-label="Agregar"
            leftIcon={<Icon as={VscAdd} fontSize="lg" />}
            variant="solid"
            rounded={'xl'}
          >
            Nuevo Registro
          </Button>
        </Link>
      </Stack>
      <Box
        borderRadius="2xl"
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
          filterPlaceholder="BUSCAR"
          fileName={'DOCENTES' + moment().format('DD-MM-YYYY')}
        >
          <DataTable
            defaultSortField="createdAt"
            defaultSortAsc={false}
            defaultSortOrder="desc"
            pagination={true}
            paginationIconFirstPage={
              <Icon
                as={FiChevronsLeft}
                boxSize={6}
                _dark={{ color: 'gray.300' }}
              />
            }
            paginationIconLastPage={
              <Icon
                as={FiChevronsRight}
                boxSize={6}
                _dark={{ color: 'gray.300' }}
              />
            }
            paginationIconPrevious={
              <Icon
                as={FiChevronLeft}
                boxSize={6}
                _dark={{ color: 'gray.300', _hover: { color: 'white' } }}
              />
            }
            paginationIconNext={
              <Icon
                as={FiChevronRight}
                boxSize={6}
                _dark={{ color: 'gray.300', _hover: { color: 'white' } }}
              />
            }
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
            noDataComponent={
              <Text mb={4} fontSize="lg">
                NO SE ENCONTRARON DATOS
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
};

export default Estudiantes;
