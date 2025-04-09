import React, { useEffect } from 'react';
import {
  Badge,
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'moment';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getAllAcademicYear, reset } from '../../features/academicYearSlice';
import ModalAgregarApertura from './ModalAgregarApertura';
import { AlertEliminar } from './AlertEliminar';
import ModalEditarApertura from './ModalEditarApertura';

const PeriodoEscolar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { academic_year, isLoading, isError, message } = useSelector(
    state => state.academic_year
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!user.token) {
      navigate('/login');
    }

    dispatch(getAllAcademicYear());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isError) {
    CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
    console.log(message);
  }

  const columns = [
    {
      name: 'AÑO ACADÉMICO',
      selector: row => row.year,
      sortable: true,
      cellExport: row => row.year,
      resizable: true,
    },
    {
      name: 'BIMESTRES',
      selector: row => row.numBimestres,
      sortable: true,
      cellExport: row => row.numBimestres,
      resizable: true,
    },
    {
      name: 'FECHA INICIO',
      selector: row => Moment(row.startDate).format('DD-MM-YYYY'),
      sortable: true,
      cellExport: row => Moment(row.startDate).format('DD-MM-YYYY'),
      resizable: true,
    },
    {
      name: 'FECHA FIN',
      selector: row => Moment(row.endDate).format('DD-MM-YYYY'),
      sortable: true,
      cellExport: row => Moment(row.endDate).format('DD-MM-YYYY'),
      resizable: true,
    },
    {
      name: 'ESTADO',
      selector: row => {
        return row.isActive === true ? 'ACTIVO' : 'INACTIVO';
      },
      sortable: true,
      cellExport: row => (row.isActive === true ? 'ACTIVO' : 'INACTIVO'),
      center: true,
      cell: row => (
        <div>
          <Badge
            colorScheme={row.isActive === true ? 'green' : 'red'}
            variant="solid"
            w={24}
            textAlign="center"
            py={2}
            rounded="full"
          >
            {row.isActive === true ? 'ACTIVO' : 'INACTIVO'}
          </Badge>
        </div>
      ),
    },
    {
      name: 'ACCIONES',
      sortable: true,
      export: false,
      center: true,
      cell: row => (
        <div>
          <ModalEditarApertura row={row} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '180px',
    },
  ];

  const tableData = {
    columns: columns,
    data: academic_year,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <HStack spacing={4} direction="row">
          <ModalAgregarApertura />
        </HStack>
        <HStack spacing={4} direction="row">
          <Text fontSize="lg" fontWeight={'bold'}>
            Gestión de Periodos Escolares
          </Text>
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
          filterPlaceholder="BUSCAR"
          numberOfColumns={7}
          fileName={'CATEGORIAS_EQUIPOS'}
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
            paginationRowsPerPageOptions={[5, 10, 25, 50]}
            paginationPerPage={10}
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

export default PeriodoEscolar;
