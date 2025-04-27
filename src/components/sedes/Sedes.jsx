import React, { useEffect } from 'react';
import {
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
import { getAllSedes, reset } from '../../features/sedeSlice';
import ModalAgregarSede from './ModalAgregarSede';
import ModalEditarSede from './ModalEditarSede';

const Sedes = () => {
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { sedes, isLoading } = useSelector(
    state => state.sedes
  );

  useEffect(() => {
    dispatch(getAllSedes());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const columns = [
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      cellExport: row => row.nombre,
      resizable: true,
    },
    {
      name: 'CODIGO DANE',
      selector: row => row.codigoDane,
      sortable: true,
      cellExport: row => row.codigoDane,
      resizable: true,
    },
    {
      name: 'TELEFONO',
      selector: row => row.telefono,
      sortable: true,
      cellExport: row => row.telefono,
      resizable: true,
    },
    {
      name: 'ESTADO',
      selector: row => {
        return row.estado === true ? 'ACTIVO' : 'INACTIVO';
      },
      sortable: true,
      cellExport: row => (row.estado === true ? 'ACTIVO' : 'INACTIVO'),
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
            {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
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
          <ModalEditarSede row={row} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '180px',
    },
  ];

  const tableData = {
    columns: columns,
    data: sedes,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="md">SEDES</Heading>
        <ModalAgregarSede />
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
          fileName={'SEDES'}
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
                NO SEDES ENCONTRADOS
              </Text>
            }
          />
        </DataTableExtensions>
      </Box>
    </>
  );
};

export default Sedes;
