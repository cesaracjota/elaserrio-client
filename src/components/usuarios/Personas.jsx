import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Icon,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios, reset } from '../../features/usuarioSlice';
import { CustomToast } from '../../helpers/toast';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { ModalAgregarPersona } from './ModalAgregarPersona';
import { ModalDetallesPersona } from './ModalDetallesPersona';
import { ModalEditarPersona } from './ModalEditarPersona';
import { AlertEliminarPersona } from './AlertEliminarPersona';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getRoles } from '../../features/rolSlice';
import { getAllSedes } from '../../features/sedeSlice';

const Personas = () => {
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { usuarios, isError, isLoading, message, currentPage, totalRows } =
    useSelector(state => state.usuarios);

  const { roles } = useSelector(state => state.roles);
  const { sedes } = useSelector(state => state.sedes);

  const [perPage, setPerPage] = useState(10);

  const [page, setPage] = useState(1);

  useEffect(() => {

    dispatch(getAllUsuarios({ page: currentPage, perPage }));
    dispatch(getRoles());
    dispatch(getAllSedes());

    return () => {
      dispatch(reset());
    };
  }, [ dispatch, currentPage, perPage]);

  if (isError) {
    CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
    console.log(message);
  }

  const columns = [
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      cellExport: row => row.nombre,
      cell: row => (
        <Stack spacing={2} direction={{ base: 'column', lg: 'row' }}>
          <Avatar
            size="sm"
            name={row?.nombre}
            src={row?.img}
            fontWeight="bold"
            fontSize="sm"
            color="white"
            alignSelf={'center'}
            display={{
              base: 'none',
              md: 'none',
              lg: 'flex',
            }}
          />
          <Text ml={2} alignSelf={'center'} fontSize="13px">
            {row?.nombre}
          </Text>
        </Stack>
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
      name: 'ROL',
      selector: row => row.rol,
      sortable: true,
      cellExport: row => row.rol,
      center: true,
      cell: row => (
        <div>
          <Badge
            bg={'primary.100'}
            variant="solid"
            textAlign="center"
            fontSize={'9px'}
            py={2}
            px={4}
            rounded="full"
            color="white"
            alignSelf={'center'}
          >
            {row.rol}
          </Badge>
        </div>
      ),
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
                    {row?.sedes?.length}
                </Badge>
            </div>
        ),
        center: true,
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
            w={20}
            textAlign="center"
            fontSize={'9px'}
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
          <ModalDetallesPersona persona={row} />
          <ModalEditarPersona row={row} roles={roles} sedes={sedes} />
          <AlertEliminarPersona row={row} />
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
    data: usuarios,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-between"
        py={4}
        px={0}
      >
        <Heading size="lg">Usuarios</Heading>
        <ModalAgregarPersona roles={roles} sedes={sedes} />
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
          numberOfColumns={columns.length}
          fileName={'PERSONAS' + new Date().toLocaleDateString()}
        >
          <DataTable
            defaultSortField="createdAt"
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
            paginationPerPage={perPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
            paginationDefaultPage={page}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por página:',
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

export default Personas;
