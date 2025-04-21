// Archivo: components/ReportTable.jsx
import React, { useMemo } from 'react';
import {
  Box,
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
  Tooltip,
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
  Input,
  Button,
  Select,
  Heading,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SettingsIcon,
  ExternalLinkIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

const ReportTable = ({
  reportes,
  isLoading,
  globalFilter,
  setGlobalFilter,
  exportData,
  exportSingleRecord,
}) => {
  // Definición de columnas para TanStack Table
  const columns = useMemo(
    () => [
      {
        accessorKey: 'estudiante',
        header: 'Documento de Identidad',
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'nombres',
        header: 'Nombres',
        cell: info => info.getValue(),
        size: 140,
      },
      {
        accessorKey: 'apellidos',
        header: 'Apellidos',
        cell: info => info.getValue(),
        size: 140,
      },
      {
        accessorKey: 'grado',
        header: 'Grado',
        cell: info => info.getValue(),
        size: 150,
      },
      {
        accessorKey: 'periodo',
        header: 'Periodo',
        cell: info => info.getValue(),
        size: 100,
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
          <HStack spacing={2}>
            <Menu>
              <Tooltip label="Más opciones" placement="top">
                <MenuButton
                  as={IconButton}
                  size="sm"
                  variant="outline"
                  icon={<ChevronDownIcon />}
                  aria-label="Más opciones"
                />
              </Tooltip>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    console.log('Imprimir registro:', row.original.id)
                  }
                >
                  Imprimir ficha
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    console.log('Editar registro:', row.original.id)
                  }
                >
                  Editar información
                </MenuItem>
                <MenuItem onClick={() => exportSingleRecord(row.original)}>
                  Exportar registro
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ),
        size: 120,
      },
    ],
    [exportSingleRecord]
  );

  // Configurar TanStack Table
  const table = useReactTable({
    data: reportes,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading size="md">REPORTES</Heading>
        <Stack direction="row" spacing={2}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              leftIcon={<DownloadIcon />}
              ml={{ base: 0, sm: 'auto' }}
              isDisabled={isLoading || reportes?.length === 0}
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
          <ColumnVisibilityControl table={table} />
        </Stack>
      </Flex>

      {/* TanStack Table */}
      <Box mt={6} overflowX="auto">
        {isLoading ? (
          <Flex justify="center" align="center" height="300px">
            <Spinner size="xl" color="primary.500" thickness="4px" />
          </Flex>
        ) : (
          <>
            <Stack direction="row" mb={4} spacing={4} justifyContent={'left'}>
              <InputGroup
                size="md"
                variant="outline"
                borderRadius="md"
                colorScheme="primary"
                width={{ base: 'full', lg: '40%' }}
                bg={'primary.50'}
                _dark={{ bg: 'primary.1000' }}
              >
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="search"
                  placeholder="Buscar..."
                  // search table 
                />
              </InputGroup>
            </Stack>

            <TableContent table={table} columns={columns} />
            <TablePagination table={table} />
          </>
        )}
      </Box>
    </>
  );
};

// Sub-componente para controlar la visibilidad de columnas
const ColumnVisibilityControl = ({ table }) => {
  return (
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
          <PopoverHeader fontWeight="bold">Mostrar columnas</PopoverHeader>
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
  );
};

// Sub-componente para el contenido de la tabla
const TableContent = ({ table, columns }) => {
  return (
    <Table size={{ base: 'sm', lg: 'md' }} variant="simple" colorScheme="gray">
      <Thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                cursor={header.column.getCanSort() ? 'pointer' : 'default'}
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
      <Tbody>
        {table.getRowModel().rows?.length > 0 ? (
          table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id} px={4}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

// Sub-componente para la paginación
const TablePagination = ({ table }) => {
  return (
    <Box mt={4}>
      <Flex
        justify="right"
        align="center"
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: 4, md: 0 }}
      >
        {/* Selector de filas por página */}
        <Flex align="center" gap={2}>
          <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
            Rows per page:
          </Text>
          <Select
            size="sm"
            variant="outline"
            width="70px"
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 50].map(pageSize => (
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
            : '0–0 of 0'}
        </Text>

        {/* Botones de navegación */}
        <Flex gap={1}>
          <IconButton
            icon={<ChevronLeftIcon boxSize={4} transform="scaleX(1.2)" />}
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
            icon={<ChevronRightIcon boxSize={4} transform="scaleX(1.2)" />}
            variant="ghost"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
            aria-label="Última página"
            borderRadius="md"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ReportTable;
