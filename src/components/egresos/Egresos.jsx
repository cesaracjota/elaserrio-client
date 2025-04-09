import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { CustomToast } from '../../helpers/toast';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import {
  getAllEgresos,
  reset,
} from '../../features/egresoSlice';
import ModalRegistrarEgreso from './ModalRegistrarEgreso';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';
import { CgEyeAlt } from 'react-icons/cg';
import { FaFileInvoice } from 'react-icons/fa';
import ModalEditarEgreso from './ModalEditarEgreso';
import jsPDF from 'jspdf';
import LOGO from '../../assets/img/logoColegio.png';

const Egresos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector(state => state.auth);

  const { egresos, isLoading, isError, message, currentPage, totalRows } =
    useSelector(state => state.egresos);

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    if (isError) {
      CustomToast({ title: 'Error', message, type: 'error', duration: 1500, position: 'top' });
      console.log(message);
    }

    dispatch(getAllEgresos({ page: currentPage, perPage }));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, currentPage, perPage, isError, message]);

  // actualizar estado de un pago registrado en este caso pendiente

  const handleDownloadEgreso = (data) => {
    const doc = new jsPDF();
    
    doc.addImage(LOGO, 'PNG', 10, 10, 30, 30); // Posición y tamaño del logo
  
    // Encabezado
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    //centrado
    
    doc.text('COMPROBANTE DE EGRESO', 70, 25);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString(); // Fecha actual
    doc.text(`Fecha: ${currentDate}`, 160, 25); // Añade la fecha en la esquina derecha
  
    // Línea separadora
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40); // Posición de la línea
  
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40);
  
    // Añadir los datos
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const dataFields = [
      { label: 'Concepto', value: data.concepto },
      { label: 'Descripción', value: data.descripcion },
      { label: 'Monto', value: `S/. ${data.monto}` },
      { label: 'Categoría', value: data.categoria },
      { label: 'Método de Pago', value: data.metodoPago },
      { label: 'Comprobante', value: data.comprobante },
      { label: 'Presupuestado', value: data.presupuestado ? 'SI' : 'NO' },
      { label: 'Departamento', value: data.departamento },
      { label: 'Observaciones', value: data.observaciones },
    ];
  
    let yPosition = 60; // Posición vertical inicial para los detalles
    dataFields.forEach((field, index) => {
      doc.text(`${field.label}:`, 20, yPosition);
      doc.text(field.value, 70, yPosition);
      yPosition += 10;
    });
  
    // Pie de página
    doc.setLineWidth(0.5);
    doc.line(10, 270, 200, 270); // Línea separadora
  
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Gracias por su confianza. Para más detalles, visite nuestro sitio web.', 50, 280);
  
    // Añadir otra línea o detalles adicionales si es necesario
    doc.setFontSize(10);
    doc.text('www.simonBolivar.edu.pe | 930-208-194', 75, 290);
  
    // Descargar el PDF automáticamente
    doc.save(`Comprobante_Egreso_${data.concepto}.pdf`);
  };
  
  const columns = [
    {
      name: 'CODIGO',
      selector: row => row.codigo,
      sortable: true,
      cellExport: row => row.codigo,
      resizable: true,
      width: '120px',
    },
    {
      name: 'RESPONSABLE',
      selector: row => row.responsable?.nombre,
      sortable: true,
      cellExport: row => row.responsable?.nombre,
      resizable: true,
      cell: row => (
        <Stack spacing={1} direction="row" align={'center'}>
          <Avatar
            size="sm"
            name={row.responsable?.nombre}
            src={row?.responsable?.img}
            fontWeight="bold"
            fontSize="sm"
            color="white"
            display={{ base: 'none', lg: 'flex' }}
          />
          <Text
            noOfLines={1}
            fontSize="12px"
          >
            {row.responsable?.nombre}
          </Text>
        </Stack>
      ),
    },
    {
        name: 'CATEGORIA',
        selector: row => row.categoria,
        sortable: true,
        cellExport: row => row.categoria,
        resizable: true,
    },
    {
      name: 'MONTO',
      selector: row => row.monto,
      sortable: true,
      cellExport: row => row.monto,
      center: true,
      cell: row => (
        <div>
          <Badge
            bg={'primary.100'}
            variant="solid"
            w={24}
            py={2}
            textAlign="center"
            rounded="full"
            color="white"
          >
            S/{row.monto}
          </Badge>
        </div>
      ),
    },
    {
      name: 'ACCIONES',
      export: false,
      center: true,
      cell: row => (
        <Stack direction="row" spacing={1} alignItems="center">
              <Link
                to={{
                  pathname: '/egresos/' + row._id,
                }}
              >
                <Tooltip hasArrow label="Ver Detalles" placement="auto">
                  <IconButton
                    aria-label="Ver"
                    icon={<CgEyeAlt />}
                    fontSize="2xl"
                    _dark={{
                      color: 'white',
                      bg: 'blue.600',
                      _hover: { bg: 'blue.700' },
                    }}
                    colorScheme="blue"
                    variant={'solid'}
                  />
                </Tooltip>
              </Link>
                  <IconButton
                    aria-label="Ver"
                    icon={<FaFileInvoice />}
                    onClick={() => handleDownloadEgreso(row)}
                    fontSize="xl"
                    _dark={{
                      color: 'white',
                      bg: 'purple.600',
                      _hover: { bg: 'purple.700' },
                    }}
                    colorScheme="purple"
                    variant={'solid'}
                  />
              <ModalEditarEgreso row={row} />
              <AlertEliminar row={row} />
        </Stack>
      ),
    },
  ];

  const handlePageChange = page => {
    setPage(page);
    dispatch(getAllEgresos({ page, perPage }));
  };

  const handleRowsPerPageChange = newPerPage => {
    setPerPage(newPerPage);
    dispatch(getAllEgresos({ page: 1, perPage: newPerPage }));
  };

  const tableData = {
    columns: columns,
    data: egresos,
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
        <Heading size="lg" fontWeight="bold">
          Gestion de Egresos
        </Heading>
        <ModalRegistrarEgreso />
      </Stack>
      <Box
        borderRadius="2xl"
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
          fileName={'EGRESOS' + new Date().toLocaleDateString()}
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
            paginationServer
            paginationPerPage={perPage}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
            paginationDefaultPage={page}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
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

export default Egresos;
