import React, { useEffect } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
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
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from '../matriculas/AlertEliminar';
import '../../theme/solarizedTheme';
import {
  getAllMatriculasByGrado,
  reset,
  updatedPromedioRankingPorGrado,
} from '../../features/matriculaSlice';
import { MdSystemUpdate } from 'react-icons/md';
import ModalRegistrarObservaciones from '../matriculas/ModalRegistrarObservaciones';
import ObserverButton from '../calificaciones/ReporteObservacionesEstudiante';
import ReportButton from '../calificaciones/ReporteEstudianteCalificacion';

const EstudiantesPorGrado = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const grado = useParams();

  const { matriculas, isLoading, isError, message } = useSelector(
    state => state.matriculas
  );

  useEffect(() => {
    dispatch(getAllMatriculasByGrado(grado?.id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, grado.id, grado?._id]);

  if (isError) {
    CustomToast({
      title: 'Error',
      message,
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    console.log(message);
  }

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
          <ModalRegistrarObservaciones row={row} />
          <ObserverButton data={row} />
          <ReportButton data={row} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '240px',
    },
  ];

  const tableData = {
    columns: columns,
    data: matriculas,
  };
  
  const handleUpdatePromedioRanking = () => {
    dispatch(updatedPromedioRankingPorGrado(grado?.id));
  };

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <HStack
          spacing={4}
          direction="row"
          w={'full'}
          justifyContent={'space-between'}
        >
          <Heading size="md">Estudiantes Matriculados por Grado</Heading>
          <Button
            onClick={handleUpdatePromedioRanking}
            colorScheme="primary"
            variant="outline"
            size="sm"
            ml={2}
            isLoading={isLoading}
            leftIcon={<MdSystemUpdate />}
          >
            Actualizar Promedios y Ranking de Este Grado
          </Button>
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
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
            paginationDefaultPage={1}
            paginationTotalRows={matriculas.length}
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
    </>
  );
};

export default EstudiantesPorGrado;
