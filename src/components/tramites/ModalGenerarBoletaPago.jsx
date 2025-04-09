import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import LOGO from '../../assets/img/logoColegio.png';
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';

// Definimos los estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#f5f5f5',
    fontFamily: 'Times-Roman',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 1.5,
    marginBottom: 12,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    flexGrow: 1,
  },
  signature: {
    marginTop: 40,
    fontSize: 12,
    textAlign: 'center',
    borderTop: '1pt solid black',
    paddingTop: 10,
    width: '60%',
    alignSelf: 'center',
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    textAlign: 'center',
    color: 'grey',
  },
  identifier: {
    fontSize: 10,
    marginTop: 10,
    color: 'grey',
    textAlign: 'center',
  },
});

const BoletaPagoPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={LOGO} />
        <Text style={styles.title}>Boleta de Pago</Text>
      </View>

      <View>
        <Text style={styles.text}>
          Esta boleta certifica que el trabajador{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.nombre}</Text>, con DNI{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.dni}</Text>, ha recibido el
          pago correspondiente por su trabajo como{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.cargo}</Text> durante el
          mes de <Text style={{ fontWeight: 'bold' }}>{data.mes}</Text>.
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.cell}>Concepto</Text>
            <Text style={styles.cell}>Monto (S/.)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Sueldo Bruto</Text>
            <Text style={styles.cell}>{data.sueldoBruto}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Descuentos</Text>
            <Text style={styles.cell}>{data.descuentos}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.cell}>Sueldo Neto</Text>
            <Text style={styles.cell}>{data.sueldoNeto}</Text>
          </View>
        </View>
      </View>

      <View style={styles.signature}>
        <Text>Firma del Empleador</Text>
      </View>

      <View style={styles.footer}>
        <Text>
          Institución Educativa Simon Bolivar | Dirección: Asoc. Campo Sol Mz J
          Lt 16 D - Carapongo, Lima, Peru | Teléfono: (51) 930 208 194
        </Text>
      </View>
    </Page>
  </Document>
);

const ModalGeneraBoletaPago = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  const initialValues = {
    nombre: '',
    dni: '',
    cargo: '',
    mes: '',
    sueldoBruto: '',
    descuentos: '',
    sueldoNeto: '',
  };

  const [data, setData] = useState(initialValues);

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setData(initialValues);
  };

  const handleGenerateBoleta = () => {
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Boleta generada',
        description: `La boleta de pago está lista para descargar.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <>
      <Button
        leftIcon={<ExternalLinkIcon />}
        bg={'green.500'}
        color={'white'}
        _hover={{ bg: 'green.600' }}
        _dark={{
          bg: 'green.600',
          color: 'white',
          _hover: { bg: 'green.700' },
        }}
        variant="solid"
        rounded={'xl'}
        onClick={handleModalOpen}
      >
        Generar Boleta de Pago
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isCentered
        size={'6xl'}
      >
        <ModalOverlay />
        <ModalContent _dark={{ bg: 'primary.1000' }}>
          <ModalHeader>Generar Boleta de Pago</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel>Nombre del Trabajador</FormLabel>
                  <Input
                    placeholder="Ingrese nombre completo"
                    value={data.nombre}
                    onChange={e =>
                      setData({ ...data, nombre: e.target.value.toUpperCase() })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>DNI</FormLabel>
                  <Input
                    placeholder="Ingrese DNI"
                    value={data.dni}
                    onChange={e => setData({ ...data, dni: e.target.value })}
                    maxLength={8}
                  />
                </FormControl>
              </Stack>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel>Cargo</FormLabel>
                  <Input
                    placeholder="Ingrese cargo"
                    value={data.cargo}
                    onChange={e => setData({ ...data, cargo: e.target.value })}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Mes de Pago</FormLabel>
                  <Input
                    placeholder="Ingrese el mes"
                    value={data.mes}
                    onChange={e => setData({ ...data, mes: e.target.value })}
                  />
                </FormControl>
              </Stack>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel>Sueldo Bruto</FormLabel>
                  <Input
                    placeholder="Ingrese sueldo bruto"
                    value={data.sueldoBruto}
                    onChange={e =>
                      setData({ ...data, sueldoBruto: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Descuentos</FormLabel>
                  <Input
                    placeholder="Ingrese descuentos"
                    value={data.descuentos}
                    onChange={e =>
                      setData({ ...data, descuentos: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sueldo Neto</FormLabel>
                  <Input
                    placeholder="Ingrese sueldo neto"
                    value={data.sueldoNeto}
                    onChange={e =>
                      setData({ ...data, sueldoNeto: e.target.value })
                    }
                  />
                </FormControl>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleGenerateBoleta}
              isLoading={isGenerating}
              loadingText="Generando..."
              isDisabled={
                Object.values(data).some(value => value === '') || isGenerating
              }
            >
              Generar Boleta
            </Button>
            <PDFDownloadLink
              document={<BoletaPagoPDF data={data} />}
              fileName={`boleta_pago_${data.nombre
                .replace(/\s+/g, '_')
                .toLowerCase()}.pdf`}
            >
              {({ loading }) => (
                <Button
                  bg="primary.100"
                  color={'white'}
                  _hover={{ bg: 'primary.200' }}
                  _dark={{
                    bg: 'primary.100',
                    color: 'white',
                    _hover: { bg: 'primary.200' },
                  }}
                  isLoading={loading}
                  leftIcon={<DownloadIcon />}
                  ml={3}
                  isDisabled={Object.values(data).some(value => value === '')}
                >
                  Descargar PDF
                </Button>
              )}
            </PDFDownloadLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalGeneraBoletaPago;