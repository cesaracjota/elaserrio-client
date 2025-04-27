import React, { useEffect } from 'react';
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Tooltip,
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
  FiMonitor,
  FiSmartphone,
  FiTablet,
  FiGlobe,
  FiMapPin,
  FiClock,
} from 'react-icons/fi';
import { 
  FaWindows, 
  FaApple, 
  FaLinux, 
  FaAndroid, 
  FaChrome, 
  FaFirefox, 
  FaSafari, 
  FaEdge, 
  FaInternetExplorer, 
  FaOpera 
} from 'react-icons/fa';
import { customStyles } from '../../helpers/customStyles';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { getAllAccesos, resetAccesos } from '../../features/accesoSlice';
import moment from 'moment';
import 'moment/locale/es';

const Accesos = () => {
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { accesos, isLoading } = useSelector(state => state.accesos);

  useEffect(() => {
    moment.locale('es');
    dispatch(getAllAccesos());

    return () => {
      dispatch(resetAccesos());
    };
  }, [dispatch]);

  // Función para mostrar el tiempo transcurrido
  const getTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  // Función para obtener el icono del dispositivo
  const getDeviceIcon = (tipo) => {
    switch (tipo) {
      case 'mobile':
        return <Icon as={FiSmartphone} boxSize={5} color="blue.500" />;
      case 'tablet':
        return <Icon as={FiTablet} boxSize={5} color="purple.500" />;
      default:
        return <Icon as={FiMonitor} boxSize={5} color="green.500" />;
    }
  };

  // Función para obtener el icono del sistema operativo
  const getOSIcon = (sistema) => {
    switch (sistema) {
      case 'windows':
        return <Icon as={FaWindows} boxSize={4} color="blue.500" />;
      case 'mac':
        return <Icon as={FaApple} boxSize={4} color="gray.500" />;
      case 'linux':
        return <Icon as={FaLinux} boxSize={4} color="orange.500" />;
      case 'android':
        return <Icon as={FaAndroid} boxSize={4} color="green.500" />;
      case 'ios':
        return <Icon as={FaApple} boxSize={4} color="gray.500" />;
      default:
        return <Icon as={FiGlobe} boxSize={4} color="gray.500" />;
    }
  };

  // Función para obtener el icono del navegador
  const getBrowserIcon = (navegador) => {
    switch (navegador) {
      case 'chrome':
        return <Icon as={FaChrome} boxSize={4} color="green.500" />;
      case 'firefox':
        return <Icon as={FaFirefox} boxSize={4} color="orange.500" />;
      case 'safari':
        return <Icon as={FaSafari} boxSize={4} color="blue.500" />;
      case 'edge':
        return <Icon as={FaEdge} boxSize={4} color="blue.500" />;
      case 'ie':
        return <Icon as={FaInternetExplorer} boxSize={4} color="blue.500" />;
      case 'opera':
        return <Icon as={FaOpera} boxSize={4} color="red.500" />;
      default:
        return <Icon as={FiGlobe} boxSize={4} color="gray.500" />;
    }
  };

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
      width: '300px',
    },
    {
      name: 'DISPOSITIVO',
      sortable: true,
      cellExport: row => `${row.dispositivo?.tipo || 'desconocido'} - ${row.dispositivo?.navegador || 'desconocido'} - ${row.dispositivo?.sistema || 'desconocido'}`,
      cell: row => {
        const deviceInfo = row.dispositivo || {};
        const tipo = deviceInfo.tipo || 'desconocido';
        const navegador = deviceInfo.navegador || 'desconocido';
        const sistema = deviceInfo.sistema || 'desconocido';
        
        return (
          <Flex direction="row" alignItems="center" gap={2}>
              {getDeviceIcon(tipo)}
              {getBrowserIcon(navegador)}
              {getOSIcon(sistema)}
          </Flex>
        );
      },
      width: '150px',
    },
    {
      name: 'UBICACIÓN',
      sortable: true,
      cellExport: row => `${row.ubicacion?.pais || 'Desconocido'}, ${row.ubicacion?.ciudad || 'Desconocido'}`,
      cell: row => {
        const ubicacion = row.ubicacion || {};
        return (
          <Flex direction="column">
            <Flex alignItems="center" gap={1}>
              <Icon as={FiMapPin} color="red.500" />
              <Text fontSize="sm">
                {ubicacion.ciudad || 'Desconocido'}, {ubicacion.pais || 'Desconocido'}
              </Text>
            </Flex>
            <Text fontSize="xs" color="gray.500">
              IP: {row.ip || 'No disponible'}
            </Text>
          </Flex>
        );
      },
      width: '200px',
    },
    {
      name: 'FECHA HORA',
      sortable: true,
      cellExport: row => moment(row.fechaHora).format('DD-MM-YYYY - HH:mm:ss'),
      cell: row => (
        <Flex direction="column">
          <Text fontSize="sm">
            {moment(row.fechaHora).format('DD-MM-YYYY - HH:mm:ss')}
          </Text>
          <Flex alignItems="center" gap={1}>
            <Icon as={FiClock} color="blue.500" />
            <Text fontSize="xs" color="gray.500">
              {getTimeAgo(row.fechaHora)}
            </Text>
          </Flex>
        </Flex>
      ),
      width: '200px',
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
            defaultSortField="fechaHora"
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