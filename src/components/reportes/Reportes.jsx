import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  Badge,
  Flex,
  Spinner,
  useToast,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Checkbox,
  InputLeftElement,
  Center,
  Icon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAcademicYear } from '../../features/academicYearSlice';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  DownloadIcon,
  ChevronDownIcon,
  RepeatIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingsIcon,
  ExternalLinkIcon,
  Search2Icon,
  InfoIcon,
} from '@chakra-ui/icons';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { getAllReports, reset } from '../../features/reporteSlice';
import ObserverButton from '../calificaciones/ReporteObservacionesEstudiante';
import ReportButton from '../calificaciones/ReporteEstudianteCalificacion';
import { getAllConfiguraciones } from '../../features/configuracionSlice';
import ReporteFichaMatricula from '../matriculas/ReporteFichaMatricula';

// Para exportación
const exportToCSV = (data, filename) => {
  const csvRows = [];
  // Obtener los encabezados
  const headers = Object.keys(data[0]).filter(
    header => header !== 'id' && typeof data[0][header] !== 'object'
  );
  csvRows.push(headers.join(','));

  // Convertir cada fila a CSV
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return `"${value}"`;
    });
    csvRows.push(values.join(','));
  }

  // Crear y descargar el archivo
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${filename}.csv`;
  link.href = url;
  link.click();
};

const Reportes = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { sedeSeleccionada } = useSelector(state => state.auth);

  // Estado para filtros
  const [filtros, setFiltros] = useState({
    academicYear: '',
    tipo: '',
    termino: '',
    sede: sedeSeleccionada?._id || '',
  });

  const [search, setSearch] = useState('');

  const { academic_year } = useSelector(state => state.academic_year);

  // Asumimos que reportes es el array de resultados directamente
  const { reportes, isLoading } = useSelector(state => state.reportes);
  // Acceder a los datos correctamente - analizar estructura de reportes
  const reportData = useMemo(() => {

    if (!reportes || !Array.isArray(reportes)) return [];

    // Transformar los datos para la tabla
    return reportes.map(item => ({
      _id: item._id,
      codigo: item.codigo || 'N/A',
      dni: item.estudiante?.dni || 'N/A',
      estudiante: item.estudiante || 'N/A',
      academic_year: item.academic_year || 'N/A',
      grado: item.grado || 'N/A',
      nombreGrado: item.grado?.nombre || 'N/A',
      nombres: item.estudiante?.nombres || 'N/A',
      apellidos: item.estudiante?.apellidos || 'N/A',
      nivel: item.grado?.nivel || 'N/A',
      sede: item.sede?.nombre || 'N/A',
      periodo: `${item.academic_year?.year || 'N/A'}`,
      promedioGeneral: parseFloat(item.promedioGeneral) || 'N/A',
      indicadores: item.indicadores || 'N/A',
      observacionesPeriodo: item.observacionesPeriodo || 'N/A',
      estado: item.estado || 'Activo',
      _original: item,
    }));
  }, [reportes]);

  // Definición de columnas para TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'codigo',
        header: 'Código',
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'dni',
        header: 'Documento',
        cell: info => info.getValue(),
        size: 120,
      },
      {
        id: 'nombreCompleto',
        header: 'Nombre completo',
        cell: info => {
          const { nombres, apellidos } = info.row.original;
          return `${nombres} ${apellidos}`;
        },
        size: 200,
      },
      {
        id: 'gradoNivel',
        header: 'Grado y Nivel',
        cell: info => {
          const { nombreGrado, nivel } = info.row.original;
          return `${nombreGrado} - ${nivel}`;
        },
        size: 180,
      },
      {
        accessorKey: 'periodo',
        header: 'Año',
        cell: info => info.getValue(),
        size: 150,
      },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: info => (
          <Badge
            colorScheme={
              info.getValue() === 'Activo'
                ? 'green'
                : info.getValue() === 'Inactivo'
                ? 'red'
                : 'blue'
            }
            borderRadius="full"
            px={2}
            py={1}
          >
            {info.getValue()}
          </Badge>
        ),
        size: 120,
      },
      {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => (
          <HStack spacing={0}>
            <ObserverButton data={row.original} configuracion={null} />
            <ReportButton data={row.original} configuracion={null} />
            <ReporteFichaMatricula data={row.original} configuracion={null} />
          </HStack>
        ),
        size: 120,
      }      
    ],
    []
  );

  // Configurar TanStack Table
  const table = useReactTable({
    data: reportData,
    columns,
    state: {
      globalFilter: search,
    },
    onGlobalFilterChange: setSearch,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
      globalFilter: search,
    },
  });

  useEffect(() => {
    dispatch(getAllAcademicYear());
    dispatch(getAllConfiguraciones());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Función para buscar con filtros
  const handleBuscar = () => {
    dispatch(getAllReports(filtros));
  };

  const handleLimpiar = () => {
    setFiltros({
      academicYear: '',
      sede: sedeSeleccionada?._id || '',
      tipo: '',
      termino: '',
    });
    setSearch('');
    table.setPageIndex(0);
    dispatch(reset());
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  // funcion de busqueda en la tabla
  const handleSearch = e => {
    const { value } = e.target;
    setSearch(value);
  };

  // Funciones de exportación
  const exportData = format => {
    toast({
      title: `Exportando datos en formato ${format.toUpperCase()}`,
      description: 'El archivo se descargará en breve',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    if (format === 'csv') {
      exportToCSV(
        reportData,
        `reportes_estudiantes_${new Date().toISOString().split('T')[0]}`
      );
    } else {
      // Implementar otros formatos de exportación
      console.log(`Exportando en formato ${format}`);
    }
  };

  return (
    <>
      {/* Sección de filtros */}
      <Stack
        spacing={4}
        direction={'column'}
        mb={4}
        boxShadow={'base'}
        p={4}
        rounded="lg"
        bg="white"
        _dark={{ bg: 'primary.900' }}
      >
        <Stack spacing={4} p={2} direction="column" rounded="lg">
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }}>
            <FormControl>
              <FormLabel>Año Académico</FormLabel>
              <Select
                placeholder="Seleccione un año académico"
                name="academicYear"
                defaultValue={filtros.academicYear}
                onChange={handleChange}
              >
                <option value="general">General</option>
                {academic_year.map((year, index) => (
                  <option key={index} value={year._id}>
                    {year.year}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Buscar Por</FormLabel>
              <Select
                placeholder="Seleccione tipo de búsqueda"
                name="tipo"
                value={filtros.tipo}
                onChange={handleChange}
              >
                <option value="dni">Documento de Identidad</option>
                <option value="nombres">Nombres</option>
                <option value="apellidos">Apellidos</option>
                <option value="codigo">Código de Matrícula</option>
              </Select>
            </FormControl>
          </Stack>

          <Stack spacing={4} direction={'column'}>
            <FormControl>
              <FormLabel>Término de búsqueda</FormLabel>
              <Input
                placeholder={'Buscar por ' + filtros?.tipo}
                name="termino"
                value={filtros.termino}
                onChange={handleChange}
                onKeyPress={e => {
                  if (e.key === 'Enter') handleBuscar();
                }}
              />
            </FormControl>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Button
                colorScheme="primary"
                _dark={{ bg: 'primary.400' }}
                color="white"
                onClick={handleBuscar}
                leftIcon={<SearchIcon />}
                isLoading={isLoading}
                loadingText="Buscando"
                isDisabled={
                  isLoading ||
                  !filtros.academicYear ||
                  !filtros.tipo ||
                  !filtros.termino
                }
              >
                Buscar información
              </Button>
              <Button
                variant="outline"
                onClick={handleLimpiar}
                leftIcon={<RepeatIcon />}
                isDisabled={isLoading}
              >
                Limpiar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
        <Box
          p={6}
          boxShadow="base"
          bg="white"
          _dark={{
            bg: 'primary.900',
            color: 'white',
          }}
          rounded="lg"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={6}>
            <Heading size="md">REPORTES</Heading>
            <Stack direction="row" spacing={2}>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<DownloadIcon />}
                  ml={{ base: 0, sm: 'auto' }}
                  isDisabled={isLoading || !reportData?.length}
                >
                  Exportar
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => exportData('excel')}>
                    <HStack>
                      <ExternalLinkIcon />
                      <Text>Excel (.xlsx)</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => exportData('csv')}>
                    <HStack>
                      <ExternalLinkIcon />
                      <Text>CSV</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem onClick={() => exportData('pdf')}>
                    <HStack>
                      <ExternalLinkIcon />
                      <Text>PDF</Text>
                    </HStack>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <IconButton
                    icon={<SettingsIcon />}
                    aria-label="Configuración de columnas"
                    variant="outline"
                    colorScheme="gray"
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent width="250px">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">
                      Mostrar columnas
                    </PopoverHeader>
                    <PopoverBody>
                      <Stack spacing={2}>
                        {table.getAllLeafColumns().map(column => {
                          // No incluir la columna de acciones en la lista de columnas que se pueden ocultar
                          if (column.id === 'acciones') return null;

                          return (
                            <Checkbox
                              key={column.id}
                              isChecked={column.getIsVisible()}
                              onChange={column.getToggleVisibilityHandler()}
                            >
                              {column.columnDef.header}
                            </Checkbox>
                          );
                        })}
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Stack>
          </Flex>

          {/* TanStack Table */}
          <Box mt={6} overflowX="auto">
            {isLoading ? (
              <Flex justify="center" align="center" height="300px">
                <Spinner size="xl" color="primary.500" thickness="4px" />
              </Flex>
            ) : reportData?.length > 0 ? (
              <>
                <Stack
                  direction="row"
                  mb={4}
                  spacing={4}
                  justifyContent={'left'}
                >
                  <InputGroup
                    size="md"
                    variant="outline"
                    borderRadius="md"
                    colorScheme="primary"
                    width={{ base: 'full', lg: '40%' }}
                  >
                    <InputLeftElement pointerEvents="none">
                      <Search2Icon color="gray.300" />
                    </InputLeftElement>
                    <Input
                      placeholder="Filtrar resultados..."
                      value={search ?? ''}
                      onChange={handleSearch}
                      onKeyPress={e => {
                        if (e.key === 'Enter') handleBuscar();
                      }}
                      size="md"
                      variant="outline"
                      focusBorderColor='primary.500'
                      borderRadius="md"
                      colorScheme="primary"
                      bg={'primary.50'}
                      _dark={{ bg: 'primary.1000' }}
                      type="search"                      
                    />
                  </InputGroup>
                </Stack>
                <Table size={{ base: 'sm', lg: 'sm' }} variant="simple">
                  <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <Tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <Th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            cursor={
                              header.column.getCanSort() ? 'pointer' : 'default'
                            }
                            whiteSpace="nowrap"
                            px={4}
                            color="gray.600"
                            _dark={{ color: 'gray.200' }}
                            width={header.column.columnDef.size}
                          >
                            <HStack spacing={1}>
                              <Box>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </Box>
                              {header.column.getCanSort() && (
                                <Box>
                                  {{
                                    asc: <ArrowUpIcon boxSize={3} />,
                                    desc: <ArrowDownIcon boxSize={3} />,
                                  }[header.column.getIsSorted()] ?? null}
                                </Box>
                              )}
                            </HStack>
                          </Th>
                        ))}
                      </Tr>
                    ))}
                  </Thead>
                  <Tbody fontSize={'6px'}>
                    {table.getRowModel().rows?.length > 0 ? (
                      table.getRowModel().rows.map(row => (
                        <Tr key={row.id} fontSize={'4px'}>
                          {row.getVisibleCells().map(cell => (
                            <Td key={cell.id} px={4} fontSize={'4px'}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Td>
                          ))}
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={columns?.length} textAlign="center">
                          <Box py={4}>
                            <Text fontSize="lg" fontWeight="medium" mb={2}>
                              No hay datos para mostrar
                            </Text>
                            <Text color="gray.500">
                              Prueba con otros criterios de búsqueda
                            </Text>
                          </Box>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>

                {/* Paginación */}
                <Box mt={4}>
                  <Flex
                    justify="right"
                    align="center"
                    flexDirection={{ base: 'column', md: 'row' }}
                    gap={{ base: 4, md: 0 }}
                  >
                    {/* Selector de filas por página con Select normal */}
                    <Flex align="center" gap={2}>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        _dark={{ color: 'gray.400' }}
                      >
                        Por página:
                      </Text>
                      <Select
                        size="sm"
                        variant="outline"
                        width="70px"
                        value={table.getState().pagination.pageSize}
                        onChange={e =>
                          table.setPageSize(Number(e.target.value))
                        }
                      >
                        {[5, 10, 20, 30, 50, 100].map(pageSize => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </Select>
                    </Flex>

                    {/* Indicador de rango de registros */}
                    <Text
                      fontSize="sm"
                      color="gray.600"
                      _dark={{ color: 'gray.400' }}
                      px={2}
                    >
                      {table.getFilteredRowModel().rows?.length > 0
                        ? `${
                            table.getState().pagination.pageIndex *
                              table.getState().pagination.pageSize +
                            1
                          }–${Math.min(
                            (table.getState().pagination.pageIndex + 1) *
                              table.getState().pagination.pageSize,
                            table.getFilteredRowModel().rows?.length
                          )} of ${table.getFilteredRowModel().rows?.length}`
                        : `0–0 of 0`}
                    </Text>

                    {/* Botones de navegación */}
                    <Flex gap={1}>
                      <IconButton
                        icon={
                          <ChevronLeftIcon
                            boxSize={4}
                            transform="scaleX(1.2)"
                          />
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        isDisabled={!table.getCanPreviousPage()}
                        aria-label="Primera página"
                        borderRadius="md"
                      />
                      <IconButton
                        icon={<ChevronLeftIcon boxSize={5} />}
                        variant="ghost"
                        size="sm"
                        onClick={() => table.previousPage()}
                        isDisabled={!table.getCanPreviousPage()}
                        aria-label="Página anterior"
                        borderRadius="md"
                      />
                      <IconButton
                        icon={<ChevronRightIcon boxSize={5} />}
                        variant="ghost"
                        size="sm"
                        onClick={() => table.nextPage()}
                        isDisabled={!table.getCanNextPage()}
                        aria-label="Página siguiente"
                        borderRadius="md"
                      />
                      <IconButton
                        icon={
                          <ChevronRightIcon
                            boxSize={4}
                            transform="scaleX(1.2)"
                          />
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          table.setPageIndex(table.getPageCount() - 1)
                        }
                        isDisabled={!table.getCanNextPage()}
                        aria-label="Última página"
                        borderRadius="md"
                      />
                    </Flex>
                  </Flex>
                </Box>
              </>
            ) : (
              <Center py={10} flexDirection="column">
                <Icon as={InfoIcon} boxSize={10} color="gray.400" mb={4} />
                <Text fontSize="lg" fontWeight="medium" mb={2}>
                  No hay información para mostrar
                </Text>
                <Text color="gray.500" textAlign="center">
                  Intenta con diferentes términos de búsqueda o ajusta los
                  filtros
                </Text>
              </Center>
            )}
          </Box>
        </Box>
    </>
  );
};

export default Reportes;
