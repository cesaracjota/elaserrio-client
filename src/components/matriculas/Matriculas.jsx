import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  HStack,
  Avatar,
  Badge,
  Icon,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ModalRegistrarMatricula from './ModalRegistrarMatricula';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiFilter,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import '../../theme/solarizedTheme';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMatriculas,
  getAllMatriculasByGrado,
  reset,
} from '../../features/matriculaSlice';
import { AlertEliminar } from './AlertEliminar';
import ReportButton from '../calificaciones/ReporteEstudianteCalificacion';
import { getGradosBySede } from '../../features/gradoSlice';
import { MdRefresh } from 'react-icons/md';
import { getAllAcademicYear } from '../../features/academicYearSlice';
import ObserverButton from '../calificaciones/ReporteObservacionesEstudiante';
import ModalRegistrarObservaciones from './ModalRegistrarObservaciones';
import { getAllConfiguraciones } from '../../features/configuracionSlice';

const Matriculas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { sedeSeleccionada } = useSelector(state => state.auth);

  const { matriculas, currentPage, totalRows } = useSelector(
    state => state.matriculas
  );

  const { configuracion } = useSelector(state => state.configuraciones);

  const { academic_year } = useSelector(state => state.academic_year);

  const { grados } = useSelector(state => state.grados);

  const [perPage, setPerPage] = useState(10);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllAcademicYear());
    dispatch(getGradosBySede(sedeSeleccionada?._id));
    dispatch(
      getAllMatriculas({
        page: currentPage,
        perPage,
        idSede: sedeSeleccionada?._id,
      })
    );
    dispatch(getAllConfiguraciones());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, currentPage, perPage, sedeSeleccionada?._id]);

  const columns = [
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
          <Stack spacing={2} direction="row">
            <Avatar
              size="sm"
              name={row.estudiante?.nombres + ' ' + row.estudiante?.apellidos}
              src={row?.img}
              fontWeight="bold"
              fontSize="sm"
              color="white"
              display={{ base: 'none', sm: 'none', lg: 'flex' }}
            />
            <Text ml={2} noOfLines={2} fontSize="12px" alignSelf={'center'}>
              {row.estudiante?.nombres + ' ' + row.estudiante?.apellidos}
            </Text>
          </Stack>
        </div>
      ),
    },
    {
      name: 'GRADO',
      selector: row => row.grado?.nombre,
      sortable: true,
      cellExport: row => row.grado?.nombre,
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
            colorScheme={
              row.estado === 'Activa'
                ? 'green'
                : row.estado === 'Retirado'
                ? 'blue'
                : 'red'
            }
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
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <div>
          <ModalRegistrarObservaciones row={row} configuracion={configuracion} />
          <ObserverButton data={row} configuracion={configuracion} />
          <ReportButton data={row} configuracion={configuracion} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '240px',
    },
  ];

  const handlePageChange = page => {
    setPage(page);
    dispatch(
      getAllMatriculas({ page, perPage, idSede: sedeSeleccionada?._id })
    );
  };

  const handleRowsPerPageChange = newPerPage => {
    setPerPage(newPerPage);
    dispatch(
      getAllMatriculas({
        page: 1,
        perPage: newPerPage,
        idSede: sedeSeleccionada?._id,
      })
    );
  };

  const handleChangeGrado = e => {
    dispatch(getAllMatriculasByGrado(e.target.value));
  };

  const handleUpdateMatricula = () => {
    dispatch(
      getAllMatriculas({ page: 1, perPage, idSede: sedeSeleccionada?._id })
    );
  };

  const tableData = {
    columns: columns,
    data: matriculas,
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Container maxW="full">
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={6}
        mb={4}
      >
        <StatCard
          title="Total Matrículas"
          value={matriculas.length}
          colorScheme="blue"
        />
        <StatCard
          title="Activas"
          value={matriculas.filter(m => m.estado === 'Activa').length}
          colorScheme="green"
        />
        <StatCard
          title="Finalizadas"
          value={matriculas.filter(m => m.estado === 'Finalizada').length}
          colorScheme="red"
        />
      </Grid>
      <Stack spacing={4} direction="row" justifyContent="space-between">
        <HStack
          spacing={4}
          direction="row"
          w={'full'}
          justifyContent={'space-between'}
        >
          <Heading size="md">Lista de Estudiantes Matriculadas</Heading>
          <ModalRegistrarMatricula academic_year={academic_year} configuracion={configuracion} />
        </HStack>
      </Stack>
      <Stack mt={2} spacing={4} direction="row" justifyContent="space-between">
        <HStack
          spacing={4}
          direction="row"
          justifyContent={'space-between'}
          w={'full'}
        >
          <Heading size="sm">Filtrar por Grados</Heading>
          <Stack direction="row" spacing={4}>
            <Select
              onChange={handleChangeGrado}
              icon={<Icon as={FiFilter} fontSize="xl" />}
              defaultValue={null}
              colorScheme="primary"
              placeholder="Selecciona un grado"
            >
              {grados?.map(data => (
                <option key={data._id} value={data._id}>
                  {data.nombre}
                </option>
              ))}
            </Select>

            <IconButton
              aria-label="Actualizar"
              onClick={handleUpdateMatricula}
              icon={<Icon as={MdRefresh} fontSize="2xl" />}
              fontSize="2xl"
              colorScheme="primary"
              _dark={{ color: 'white', _hover: { bg: 'primary.300' } }}
              variant={'solid'}
            />
          </Stack>
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
            defaultSortOrder="asc"
            pagination
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
                NO HAY REGISTROS
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </Container>
  );
};

export default Matriculas;

const StatCard = ({ title, value, colorScheme }) => (
  <Box
    _dark={{ bg: 'primary.1000' }}
    p={4}
    borderRadius="2xl"
    boxShadow="md"
    borderWidth="1px"
  >
    <Stat>
      <StatLabel color="gray.500" mb={1}>
        {title}
      </StatLabel>
      <StatNumber fontSize="3xl" color={`${colorScheme}.600`}>
        {value}
      </StatNumber>
    </Stat>
  </Box>
);
