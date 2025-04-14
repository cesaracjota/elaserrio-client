import React, { useEffect } from 'react';
import {
  Avatar,
  AvatarBadge,
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
import { CustomToast } from '../../helpers/toast';
import { AlertEliminar } from './AlertEliminar';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { getGradosBySede, reset } from '../../features/gradoSlice';
import ModalAgregarGrado from './ModalAgregarGrado';
import ModalEditarGrado from './ModalEditarGrado';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getAllAcademicYear } from '../../features/academicYearSlice';
import { TiGroup } from "react-icons/ti";
import { getAllDocentesTitulares } from '../../features/usuarioSlice';

const Grados = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  const { grados, isLoading, isError, message } = useSelector(
    state => state.grados
  );

  const { academic_year } = useSelector(state => state.academic_year);
  const { docentes_titulares } = useSelector(state => state.usuarios);

  useEffect(() => {
    dispatch(getAllDocentesTitulares(sedeSeleccionada?._id));
    dispatch(getGradosBySede(sedeSeleccionada?._id));
    dispatch(getAllAcademicYear());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, sedeSeleccionada?._id]);

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
      name: 'DOCENTE TITULAR',
      selector: row => row?.docente_titular?.nombre || 'SIN ASIGNAR',
      sortable: true,
      cellExport: row => row?.docente_titular?.nombre || 'SIN ASIGNAR',
      cell: row => (
        <Stack direction="row" alignItems="center" alignSelf={'center'}>
          <Avatar
            name={row?.docente_titular?.nombre || 'SIN ASIGNAR'}
            src={row?.docente_titular?.foto}
            size="sm"
            color={'white'}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box alignSelf={'center'}>
            <Text fontSize="sm" fontWeight="bold">
              {row?.docente_titular?.nombre || 'SIN ASIGNAR'}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {row?.docente_titular?.correo}
            </Text>
          </Box>
        </Stack>
      ),
      width: '250px',
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
                pathname: `/${sedeSeleccionada?._id}/grados/${row._id}`,
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
            />
          </Link>
          <ModalEditarGrado row={row} academic_year={academic_year} docentes={docentes_titulares} />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '180px',
    },
  ];

  const tableData = {
    columns: columns,
    data: grados,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size={'lg'}>GRADOS</Heading>
        <ModalAgregarGrado academic_year={academic_year} docentes={docentes_titulares} />
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

export default Grados;
