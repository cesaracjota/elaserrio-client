import React, { useEffect } from 'react';
import {
    Avatar,
  AvatarBadge,
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
import { AlertEliminar } from './AlertEliminar';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getAllAccesos, resetAccesos } from '../../features/accesoSlice';

const Accesos = () => {
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { accesos, isLoading } = useSelector(state => state.accesos);

  useEffect(() => {
    dispatch(getAllAccesos());

    return () => {
      dispatch(resetAccesos());
    };
  }, [dispatch]);

  const columns = [
    {
      name: 'USUARIO',
      selector: row => row?.usuario?.nombre || 'SIN INFORMACIÓN',
      sortable: true,
      cellExport: row => row?.usuario?.nombre || 'SIN INFORMACIÓN',
      cell: row => (
        <Stack direction="row" alignItems="center" alignSelf={'center'}>
          <Avatar
            name={row?.usuario?.nombre || 'SIN INFORMACIÓN'}
            src={row?.usuario?.foto}
            size="sm"
            color={'white'}
          >
            <AvatarBadge boxSize="1.25em" bg="primary.500" />
          </Avatar>
          <Box alignSelf={'center'}>
            <Text fontSize="sm" fontWeight="bold">
              {row?.usuario?.nombre || 'SIN INFORMACIÓN'}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {row?.usuario?.correo}
            </Text>
          </Box>
        </Stack>
      ),
      width: '250px',
    },
    {
      name: 'ROL',
      selector: row => row.usuario?.rol,
      sortable: true,
      cellExport: row => row.usuario?.rol,
    },
    {
      name: 'USER AGENT',
      selector: row => row.userAgent,
      sortable: true,
      cellExport: row => row.userAgent,
    },
    {
      name: 'IP',
      selector: row => row.ip,
      sortable: true,
      cellExport: row => row.ip,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      sortable: true,
      cellExport: row => row.estado,
      center: true,
      cell: row => (
        <div>
          <Badge
            colorScheme={row.estado === true ? 'green' : 'red'}
            variant="solid"
            w={24}
            textAlign="center"
            py={2}
            rounded="full"
          >
            {row?.estado === true ? 'ACTIVO' : 'INACTIVO'}
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
          <AlertEliminar row={row} />
        </div>
      ),
      width: '140px',
    },
  ];

  const tableData = {
    columns: columns,
    data: accesos,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg">REGISTRO DE ACCESOS</Heading>
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
          print={true}
          exportHeaders={true}
          filterPlaceholder="BUSCAR"
          numberOfColumns={7}
          fileName={'ACCESOS'}
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
                NO HAY INFORMACIÓN PARA MOSTRAR
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
};

export default Accesos;
