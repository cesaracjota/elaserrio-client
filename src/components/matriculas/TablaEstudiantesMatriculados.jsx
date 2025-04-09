import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import { AlertEliminar } from './AlertEliminar';
import { getAllPagos, reset } from '../../features/pagos/pagoSlice';
import '../../theme/solarizedTheme';
import { customStyles } from '../../helpers/customStyles';
import { Loading } from '../../helpers/Loading';
import {
  getAllMatriculasByGrado,
} from '../../features/matriculaSlice';
import { getGrados } from '../../features/gradoSlice';
import {
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';

const TablaEstudiantesMatriculados = ({ location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { matriculas, isLoading, isError, message, currentPage, totalRows } =
    useSelector(state => state.matriculas);
  const params = useParams(location);

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(getGrados());

    dispatch(
      getAllMatriculasByGrado({
        page: currentPage,
        perPage,
        gradoId: params.id,
      })
    );

    if (isError) {
      CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
      console.log(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    navigate,
    dispatch,
    currentPage,
    perPage,
    isError,
    message,
    params.id,
  ]);

  const columns = [
    {
      name: 'PERIODO ACADEMICO',
      selector: row => row.academic_year.year,
      sortable: true,
      cellExport: row => row.academic_year.year,
      resizable: true,
      width: '120px',
    },
    {
      name: 'ESTUDIANTE',
      selector: row =>
        row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
      sortable: true,
      cellExport: row =>
        row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
      resizable: true,
      cell: row => (
        <div>
          <Stack spacing={1} direction="row" align={'center'}>
            <Avatar
              size="sm"
              name={row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}
              src={row?.estudiante?.img}
              fontWeight="bold"
              fontSize="sm"
              color="white"
              display={{ base: 'none', lg: 'flex' }}
            />
            <Text noOfLines={1} fontSize="12px">
              {row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}
            </Text>
          </Stack>
        </div>
      ),
    },
    {
      name: 'GRADO',
      selector: row => row.grado.nombre,
      sortable: true,
      cellExport: row => row.grado.nombre,
      resizable: true,
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
            colorScheme={row.estado === false ? 'red' : 'green'}
            variant="solid"
            w={28}
            textAlign="center"
            py={2}
            rounded="full"
          >
            {row.estado === false ? 'INACTIVO' : 'ACTIVO'}
          </Badge>
        </div>
      ),
      width: '120px',
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <div>
          <AlertEliminar row={row} />
        </div>
      ),
    },
  ];

  const handlePageChange = page => {
    setPage(page);
    dispatch(getAllPagos({ page, perPage }));
  };

  const handleRowsPerPageChange = newPerPage => {
    setPerPage(newPerPage);
    dispatch(getAllPagos({ page: 1, perPage: newPerPage }));
  };

  const tableData = {
    columns: columns,
    data: matriculas,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg" fontWeight="bold">
          Estudiantes Matriculados por Grados
        </Heading>
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
                NO DATA FOUND
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
};

export default TablaEstudiantesMatriculados;
