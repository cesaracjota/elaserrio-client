import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Avatar,
  Stack,
  Icon,
  Tag,
  IconButton,
  Tooltip,
  Box,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { customStyles } from '../../helpers/customStyles';
import { getGradosBySede } from '../../features/gradoSlice';
import DownloadStudentReport from './StudentReport';
import { getMateria } from '../../features/materiaSlice';
import { getAllMatriculasByCurso, reset } from '../../features/matriculaSlice';
import { getAllNotasByMateria } from '../../features/notaSlice';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import {
  FaFileExcel,
  FaGraduationCap,
} from 'react-icons/fa';
import { getAllConfiguraciones } from '../../features/configuracionSlice';
import { MdOutlinePlaylistAddCheckCircle } from 'react-icons/md';

const DetalleMateria = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const themeTable = useColorModeValue('default', 'solarized');

  const { materia } = useSelector(state => state.materias);
  const { notasByMateria } = useSelector(state => state.calificaciones);
  const { matriculas, isLoading } = useSelector(state => state.matriculas);

  const [search, setSearch] = useState('');

  const { sedeSeleccionada } = useSelector(state => state.auth);
  const { configuracion } = useSelector(state => state.configuraciones);

  useEffect(() => {
    dispatch(getAllMatriculasByCurso(params.id));
    dispatch(getAllNotasByMateria(params.id));
    dispatch(getMateria(params.id));
    dispatch(getGradosBySede(sedeSeleccionada._id));
    dispatch(getAllConfiguraciones());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, params.id, sedeSeleccionada._id]);

  const filteredData = matriculas.filter(row =>
    (row.estudiante?.nombres + ' ' + row.estudiante?.apellidos)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      matriculas.map(row => ({
        Estudiante: row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
        Grado: row.grado?.nombre,
        // agrega más campos si deseas
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Estudiantes');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `${materia.nombre}.xlsx`);
  };

  const columns = [
    {
      name: 'ESTUDIANTE',
      selector: row => row.nombres + ' ' + row.apellidos,
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
      selector: row => row.grado?.nombre + ' ' + row.grado?.nivel,
      sortable: true,
      cellExport: row => row.grado?.nombre + ' ' + row.grado?.nivel,
      resizable: true,
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <Stack direction="row" spacing={2}>
          <Link
            to={`/mis-asignaturas/${row._id}/registrar-calificacion/${materia?._id}`}
          >
            <IconButton
              aria-label="Editar materia"
              icon={<MdOutlinePlaylistAddCheckCircle size={32} />}
              isDisabled={!configuracion?.permitirRegistrarNotas}
              size="lg"
              isRound
              colorScheme="green"
              variant="outline"
            />
          </Link>
        </Stack>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Box
        borderTop="8px solid"
        borderColor={materia.brand_color}
        borderRadius="2xl"
        bg={'white'}
        boxShadow={'base'}
        _dark={{
          bg: 'primary.1000',
          color: 'white',
        }}
        p={6}
      >
        <Flex justify="space-between" align="center">
          <Stack
            spacing={2}
            w="full"
            direction="row"
            justifyContent={'space-between'}
            alignSelf={'center'}
          >
            <Heading size="md" alignSelf={'center'}>
              {materia.nombre}
            </Heading>
            <Stack direction="row" spacing={2}>
              <Tag colorScheme={'purple'} px={4} variant={'outline'}>
                <Icon as={FaGraduationCap} mr={2} boxSize={4} />
                GRADO: {materia?.grado?.nombre}
              </Tag>
            </Stack>
          </Stack>
        </Flex>

        <Stack
          direction="row"
          justifyContent={'space-between'}
          spacing={4}
          py={2}
        >
          <Input
            placeholder="Buscar estudiante..."
            variant={'filled'}
            size="lg"
            maxW={'50%'}
            colorScheme="primary"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Stack direction={'row'} spacing={2}>
            <Tooltip label={'Exportar a Excel'} placement="auto">
              <IconButton
                aria-label="Exportar a Excel"
                icon={<FaFileExcel size={24} />}
                size="lg"
                colorScheme="green"
                variant="solid"
                onClick={exportToExcel}
              />
            </Tooltip>
            <DownloadStudentReport students={notasByMateria} />
          </Stack>
        </Stack>

        <DataTable
          columns={columns}
          data={filteredData}
          defaultSortField="createdAt"
          defaultSortAsc={true}
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
              _dark={{
                color: 'gray.300',
                _hover: { color: 'white' },
              }}
            />
          }
          paginationIconNext={
            <Icon
              as={FiChevronRight}
              boxSize={6}
              _dark={{
                color: 'gray.300',
                _hover: { color: 'white' },
              }}
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
          responsive={true}
          noDataComponent={
            <Text mb={4} fontSize="lg">
              NO HAY REGISTROS
            </Text>
          }
        />
      </Box>
    </div>
  );
};

export default DetalleMateria;
