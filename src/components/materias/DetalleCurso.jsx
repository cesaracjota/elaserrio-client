import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Avatar,
  Stack,
  Icon,
  Tag,
  CardFooter,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
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
import ModalRegistrarCalificacion from '../calificaciones/ModalRegistrarCalificacion';
import DownloadStudentReport from './StudentReport';
import { getMateria } from '../../features/materiaSlice';
import { getAllMatriculasByCurso, reset } from '../../features/matriculaSlice';
import { getAllNotasByMateria } from '../../features/notaSlice';

const DetalleMateria = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const themeTable = useColorModeValue('default', 'solarized');

  const { materia } = useSelector(state => state.materias);
  const { notasByMateria } = useSelector(state => state.calificaciones);
  const { matriculas, isLoading } = useSelector(state => state.matriculas);

  const { sedeSeleccionada } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllMatriculasByCurso(params.id));
    dispatch(getAllNotasByMateria(params.id));
    dispatch(getMateria(params.id));
    dispatch(getGradosBySede(sedeSeleccionada._id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, params.id, sedeSeleccionada._id]);

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
      selector: row => row.grado?.nombre,
      sortable: true,
      cellExport: row => row.grado?.nombre,
      resizable: true,
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <Stack direction="row" spacing={2}>
          <ModalRegistrarCalificacion
            row={row}
            studentId={row._id}
            course={materia}
          />
        </Stack>
      ),
    },
  ];

  const tableData = {
    columns: columns,
    data: matriculas,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card
      borderTop="8px solid"
      borderColor={materia.brand_color}
      borderRadius="2xl"
      _dark={{
        bg: 'primary.1000',
        color: 'white',
      }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Stack
            spacing={2}
            w="full"
            direction="row"
            justifyContent={'space-between'}
          >
            <Heading size="md">{materia.nombre}</Heading>
            <Tag
              colorScheme={'primary'}
              px={2}
              py={1}
              color={'white'}
              rounded={'lg'}
            >
              GRADO: {materia?.grado?.nombre}
            </Tag>
          </Stack>
        </Flex>
      </CardHeader>

      <CardBody>
        <DataTableExtensions
          {...tableData}
          print={false}
          exportHeaders={true}
          filterPlaceholder="BUSCAR"
          numberOfColumns={7}
          fileName={'ESTUDIANTES'}
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
            pointerOnHover={true}
            responsive={true}
            noDataComponent={
              <Text mb={4} fontSize="lg">
                NO HAY REGISTROS
              </Text>
            }
          />
        </DataTableExtensions>
      </CardBody>

      {matriculas?.length > 0 && (
        <CardFooter borderTopWidth="1px">
          <Flex justify="flex-end" w="full">
            <DownloadStudentReport students={notasByMateria} />
          </Flex>
        </CardFooter>
      )}
    </Card>
  );
};

export default DetalleMateria;
