import {
  Box,
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
import { getGradosByDocente, getGradosBySede } from '../../features/gradoSlice';
import { MdRefresh } from 'react-icons/md';
import { getActiveAcademicYear } from '../../features/academicYearSlice';
import ObserverButton from '../calificaciones/ReporteObservacionesEstudiante';
import ModalRegistrarObservaciones from './ModalRegistrarObservaciones';
import { getAllConfiguraciones } from '../../features/configuracionSlice';
import ModalEditarMatricula from './ModalEditarMatricula';
import ReporteFichaMatricula from './ReporteFichaMatricula';

const Matriculas = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { sedeSeleccionada, user } = useSelector(state => state.auth);

  const { matriculas, currentPage, totalRows } = useSelector(
    state => state.matriculas
  );

  const { configuracion } = useSelector(state => state.configuraciones);

  const { grados, mis_grados } = useSelector(state => state.grados);

  const [perPage, setPerPage] = useState(10);

  const [page, setPage] = useState(1);

  const misGradoIds = mis_grados.map(g => g._id.toString());

  const matriculaFiltro = matriculas.filter(m =>
    misGradoIds.includes(m.grado?._id?.toString())
  );

  useEffect(() => {
    dispatch(getActiveAcademicYear());
    if (user?.usuario?.rol === 'ADMIN_ROLE') {
      dispatch(getGradosBySede(sedeSeleccionada?._id));
    }
    dispatch(
      getAllMatriculas({
        page: currentPage,
        perPage,
        idSede: sedeSeleccionada?._id,
      })
    );
    dispatch(getAllConfiguraciones());
    if (user?.usuario?.rol === 'DOCENTE_TITULAR_ROLE') {
      dispatch(getGradosByDocente(user?.usuario?.id));
    }

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, currentPage, perPage, sedeSeleccionada?._id, user?.usuario?.id, user?.usuario?.rol]); 

  const columns = [
    {
      name: 'CODIGO',
      selector: row => row.codigo,
      sortable: true,
      cellExport: row => row.codigo,
      resizable: true,
      width: '110px',
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
      selector: row => row.grado?.nombre + ' - ' + row.grado?.nivel,
      sortable: true,
      cellExport: row => row.grado?.nombre + ' - ' + row.grado?.nivel,
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
          <ModalRegistrarObservaciones
            row={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
          />
          <ObserverButton
            data={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
          />
          <ReportButton
            data={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
          />
          <ModalEditarMatricula
            data={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
            grados={grados}
            mis_grados={mis_grados}
          />
          <ReporteFichaMatricula
            data={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
          />
          <AlertEliminar
            row={row}
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
          />
        </div>
      ),
      width: '350px',
    },
  ];

  const handlePageChange = page => {
    setPage(page);
    dispatch(
      getAllMatriculas({
        page,
        perPage,
        idSede: sedeSeleccionada?._id,
      })
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
      getAllMatriculas({
        page: 1,
        perPage,
        idSede: sedeSeleccionada?._id,
      })
    );
  };

  const tableData = {
    columns: columns,
    data: user?.usuario?.rol === 'ADMIN_ROLE' ? matriculas : matriculaFiltro,
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Box>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={6}
        mb={4}
      >
        <StatCard
          title="Total Matrículas"
          value={
            user?.usuario?.rol === 'ADMIN_ROLE'
              ? matriculas.length || '0'
              : matriculaFiltro.length || '0'
          }
          colorScheme="blue"
        />
        <StatCard
          title="Activas"
          value={
            user?.usuario?.rol === 'ADMIN_ROLE'
              ? matriculas?.filter(m => m.estado === 'Activa')?.length || '0'
              : matriculaFiltro?.filter(m => m.estado === 'Activa')?.length || '0'
          }
          colorScheme="green"
        />
        <StatCard
          title="Finalizadas"
          value={
            user?.usuario?.rol === 'ADMIN_ROLE'
              ? matriculas?.filter(m => m.estado === 'Finalizada')?.length || '0'
              : matriculaFiltro?.filter(m => m.estado === 'Finalizada')?.length ||
                '0'
          }
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
          <Heading size="md">LISTA DE ESTUDIANTES MATRICULADOS</Heading>
          <ModalRegistrarMatricula
            configuracion={
              user?.usuario?.rol === 'ADMIN_ROLE' ? null : configuracion
            }
            grados={grados}
            mis_grados={mis_grados}
          />
        </HStack>
      </Stack>
      <Stack
        mt={2}
        spacing={4}
        display={user?.usuario?.rol === 'ADMIN_ROLE' ? 'block' : 'none'}
        direction="row"
        justifyContent="space-between"
      >
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
                  {data.nombre} - {data.nivel}
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
    </Box>
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
