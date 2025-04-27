import React, { useEffect } from 'react';
import {
  Badge,
  Box,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { getGradosByDocente, reset } from '../../features/gradoSlice';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { MdOutlineSchool, MdOutlineStreetview } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';

const MisGrados = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  const { mis_grados, isLoading } = useSelector(state => state.grados);

  useEffect(() => {
    dispatch(getGradosByDocente(user?.usuario?.id));

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, sedeSeleccionada?._id]);

  const columns = [
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      cellExport: row => row.nombre,
      resizable: true,
    },
    {
      name: 'NIVEL',
      selector: row => row.nivel,
      sortable: true,
      cellExport: row => row.nivel,
      resizable: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      sortable: true,
      cellExport: row => (row.estado === true ? 'ACTIVO' : 'INACTIVO'),
      center: true,
      cell: row => (
        <div>
          <Badge
            colorScheme={row.estado === 'activo' ? 'green' : 'red'}
            variant="solid"
            w={24}
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
      sortable: true,
      export: false,
      center: true,
      cell: row => (
        <div>
          <Link
            to={{
              pathname: `/mis-grados/${sedeSeleccionada?._id}/grados/${row._id}`,
              state: { grado: row?.nombre },
            }}
          >
            <IconButton
              colorScheme="primary"
              _dark={{
                bg: 'primary.100',
                color: 'white',
                _hover: { bg: 'primary.300' },
              }}
              aria-label="Ver Estudiantes"
              icon={<Icon as={TiGroup} fontSize="2xl" />}
              variant="solid"
              rounded="xl"
              mr={2}
            />
          </Link>
          <Link
            to={{
              pathname: `/mis-grados/${sedeSeleccionada?._id}/grados/${row._id}/asignaturas/listView`,
              state: { grado: row?.nombre },
            }}
          >
            <IconButton
              colorScheme="teal"
              _dark={{
                bg: 'teal.500',
                color: 'white',
                _hover: { bg: 'teal.600' },
              }}
              aria-label="Ver Estudiantes"
              icon={<Icon as={MdOutlineStreetview} fontSize="2xl" />}
              variant="solid"
              rounded="xl"
              mr={2}
            />
          </Link>
          <Link
            to={`/mis-grados/${sedeSeleccionada?._id}/grados/${row._id}/asignaturas/gridView`}
          >
            <IconButton
              colorScheme="pink"
              _dark={{
                bg: 'pink.500',
                color: 'white',
                _hover: { bg: 'pink.600' },
              }}
              aria-label="Ver Estudiantes"
              icon={<Icon as={MdOutlineSchool} fontSize="2xl" />}
              variant="solid"
              rounded="xl"
            />
          </Link>
        </div>
      ),
      width: '180px',
    },
  ];

  const tableData = {
    columns: columns,
    data: mis_grados,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size={'md'}>LISTA DE GRADOS A CARGO</Heading>
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
          fileName={'GRADOS'}
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

export default MisGrados;
