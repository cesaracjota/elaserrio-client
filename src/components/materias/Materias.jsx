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
  Select,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AlertEliminar } from './AlertEliminar';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiFilter,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import ModalAgregarCurso from './ModalAgregarMateria';
import ModalEditarCurso from './ModalEditarMateria';
import { getMateriasByGrado, getMateriasBySede, reset } from '../../features/materiaSlice';
import { getGradosBySede } from '../../features/gradoSlice';
import { getAllDocentes } from '../../features/usuarioSlice';
import ModalGestionarHorario from './ModalGestionarHorario';
import ModalVerHorarioMateria from './ModalVerHorarioMateria';
import { MdRefresh } from 'react-icons/md';

const Materias = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { sedeSeleccionada } = useSelector(state => state.auth);

  const { materias, isLoading } = useSelector(state => state.materias);

  const { docentes } = useSelector(state => state.usuarios);
  const { grados } = useSelector(state => state.grados);

  useEffect(() => {
    dispatch(getMateriasBySede(sedeSeleccionada._id));
    dispatch(getGradosBySede(sedeSeleccionada._id));
    dispatch(getAllDocentes(sedeSeleccionada._id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, sedeSeleccionada._id]);

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

  const handleChangeGrado = e => {
    dispatch(getMateriasByGrado(e.target.value));
  };

  const handleUpateMaterias = () => {
    dispatch(getMateriasBySede(sedeSeleccionada._id));
  };

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="md">ASIGNATURAS</Heading>
        <ModalAgregarCurso
          grados={grados}
          docentes={docentes}
          sede={sedeSeleccionada?._id}
        />
      </Stack>
      <Stack mt={2} spacing={4} direction="row" justifyContent="space-between">
          <Heading alignSelf={'center'} size="sm">Filtrar por Grados</Heading>
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
              onClick={handleUpateMaterias}
              icon={<Icon as={MdRefresh} fontSize="2xl" />}
              fontSize="2xl"
              colorScheme="primary"
              _dark={{ color: 'white', _hover: { bg: 'primary.300' } }}
              variant={'solid'}
            />
          </Stack>
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
            progressPending={isLoading}
            progressComponent={<Loading />}
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

export default Materias;
