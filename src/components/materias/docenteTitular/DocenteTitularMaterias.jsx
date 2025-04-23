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
import { useNavigate, useParams } from 'react-router-dom';
import { AlertEliminar } from '../AlertEliminar';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';
import ModalAgregarCurso from '../ModalAgregarMateria';
import ModalEditarCurso from '../ModalEditarMateria';
import { getMateriasByGrado, reset } from '../../../features/materiaSlice';
import { getGradosBySede } from '../../../features/gradoSlice';
import { getAllDocentes } from '../../../features/usuarioSlice';
import ModalGestionarHorario from '../ModalGestionarHorario';
import ModalVerHorarioMateria from '../ModalVerHorarioMateria';

const DocenteTitularMaterias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user, sedeSeleccionada } = useSelector(state => state.auth);

  const { materias, isLoading } = useSelector(state => state.materias);

  const { docentes } = useSelector(state => state.usuarios);
  const { grados } = useSelector(state => state.grados);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getMateriasByGrado(id));
    dispatch(getGradosBySede(sedeSeleccionada?._id));
    dispatch(getAllDocentes(sedeSeleccionada._id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, sedeSeleccionada._id, id]);

  const columns = [
    {
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true,
      cellExport: row => row.nombre,
      resizable: true,
      cell: row => (
        <Stack direction="row" alignItems="start">
          <Text fontSize="sm" alignSelf={'center'}>
            {row.nombre}
          </Text>
          <Badge
            bg="darkgreen"
            color={'white'}
            variant={'subtle'}
            fontSize="8px"
            fontWeight={'normal'}
            textAlign="left"
            py={1.5}
            px={2}
            rounded="lg"
            ml={2}
          >
            {row.grado.nombre}
            <Text fontSize="7px" color="gray.400">
              {row.grado.nivel}
            </Text>
          </Badge>
        </Stack>
      ),
      width: '350px',
    },
    {
      name: 'COLOR',
      selector: row => row.brand_color,
      sortable: true,
      cellExport: row => row.brand_color,
      resizable: true,
      cell: row => (
        <div>
          <Badge
            bg={row.brand_color}
            variant="solid"
            w={8}
            textAlign="center"
            py={4}
            rounded="full"
          />
        </div>
      ),
      center: true,
    },
    {
      name: 'DOCENTE ASIGNADO',
      selector: row => row?.docente?.nombre || 'SIN DOCENTE',
      sortable: true,
      cellExport: row => row?.docente?.nombre || 'SIN DOCENTE',
      cell: row => (
        <Stack direction="row" alignItems="center" alignSelf={'center'}>
          <Avatar
            name={row?.docente?.nombre || 'SIN ASIGNAR'}
            src={row?.docente?.foto}
            size="sm"
            color={'white'}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box alignSelf={'center'}>
            <Text fontSize="sm" fontWeight="bold">
              {row?.docente?.nombre || 'SIN ASIGNAR'}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {row?.docente?.correo}
            </Text>
          </Box>
        </Stack>
      ),
      width: '250px',
    },
    {
      name: 'ACCIONES',
      sortable: true,
      export: false,
      center: true,
      cell: row => (
        <div>
          <ModalVerHorarioMateria materia={row} />
          <ModalGestionarHorario row={row} />
          <ModalEditarCurso
            row={row}
            grados={grados}
            docentes={docentes}
            sede={sedeSeleccionada?._id}
          />
          <AlertEliminar row={row} />
        </div>
      ),
      width: '250px',
    },
  ];

  const tableData = {
    columns: columns,
    data: materias,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg">ASIGNATURAS</Heading>
        <ModalAgregarCurso
          grados={grados}
          docentes={docentes}
          sede={sedeSeleccionada?._id}
        />
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
          fileName={'ASIGNATURAS'}
        >
          <DataTable
            defaultSortField="createdAt"
            defaultSortAsc={false}
            defaultSortOrder="desc"
            pagination={true}
            sortServer={true}
            fixedHeader={true}
            sortPosition="left"
            sortable={true}
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

export default DocenteTitularMaterias;
