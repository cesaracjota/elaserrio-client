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
  Select,
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

const CertificadoPDF = ({ data, identifier }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {/* Puedes agregar el logo de la institución */}
        <Image style={styles.logo} src={LOGO} />
        <Text style={styles.title}>Certificado de Trabajo</Text>
      </View>

      <View>
        <Text style={styles.text}>
          Por la presente se certifica que{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.nombre}</Text>, con DNI{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.dni}</Text>, ha trabajado
          en nuestra institución desempeñando el cargo de{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.cargo}</Text> en el
          departamento de{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.departamento}</Text>, desde
          el <Text style={{ fontWeight: 'bold' }}>{data.fechaInicio}</Text>{' '}
          hasta el <Text style={{ fontWeight: 'bold' }}>{data.fechaFin}</Text>.
        </Text>

        <Text style={styles.text}>
          Durante su tiempo en nuestra institución, el/la Sr./Sra.{' '}
          <Text style={{ fontWeight: 'bold' }}>{data.nombre}</Text> ha
          demostrado ser un/a empleado/a competente y dedicado/a, contribuyendo
          significativamente a los objetivos de nuestra institución.
        </Text>

        <Text style={styles.text}>
          Este certificado se expide a solicitud del interesado/a para los fines
          que estime conveniente.
        </Text>

        {/* Identificador único */}
        <Text style={styles.identifier}>Identificador único: {identifier}</Text>
      </View>

      <View style={styles.signature}>
        <Text>Firma del Director</Text>
      </View>

      {/* Footer con información de contacto o institución */}
      <View style={styles.footer}>
        <Text>
          Institución Educativa Simon Bolivar | Dirección: Asoc. Campo Sol Mz J
          Lt 16 D - Carapongo, Lima, Peru| Teléfono: (51) 930 208 194
        </Text>
      </View>
    </Page>
  </Document>
);

const ModalGeneraCertificadoTrabajo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();

  const initialValues = {
    nombre: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: '',
    dni: '',
    departamento: '',
  };

  const [indice, setIndice] = useState(initialValues);
  const [identifier, setIdentifier] = useState('');

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIndice(initialValues);
    setIdentifier('');
  };

  const generateUniqueIdentifier = () => {
    return (
      'CT-' +
      Date.now().toString(36) +
      Math.random().toString(36).substr(2, 5).toUpperCase()
    );
  };

  const handleGenerateCertificado = () => {
    setIsGenerating(true);
    const newIdentifier = generateUniqueIdentifier();
    setIdentifier(newIdentifier);

    // Simular un proceso de generación
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'Certificado generado',
        description: `ID único: ${newIdentifier}. El certificado está listo para descargar.`,
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
        bg={'gray.500'}
        color={'white'}
        _hover={{ bg: 'gray.600' }}
        _dark={{
          bg: 'gray.600',
          color: 'white',
          _hover: { bg: 'gray.700' },
        }}
        variant="solid"
        rounded={'xl'}
        onClick={handleModalOpen}
      >
        Generar Certificado de Trabajo
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent  _dark={{ bg: 'primary.1000' }}>
          <ModalHeader borderTopRadius="md">
            Generar Certificado de Trabajo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel>Apellidos y Nombres del Trabajador</FormLabel>
                  <Input
                    placeholder="Ingrese apellidos y nombres"
                    value={indice.nombre}
                    onChange={e =>
                      setIndice({
                        ...indice,
                        nombre: e.target.value.toUpperCase(),
                      })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>DNI</FormLabel>
                  <Input
                    placeholder="Ingrese DNI"
                    value={indice.dni}
                    onChange={e =>
                      setIndice({ ...indice, dni: e.target.value })
                    }
                    maxLength={8}
                  />
                </FormControl>
              </Stack>
              <FormControl isRequired>
                <FormLabel>Cargo</FormLabel>
                <Input
                  placeholder="Ingrese cargo"
                  value={indice.cargo}
                  onChange={e =>
                    setIndice({ ...indice, cargo: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Departamento</FormLabel>
                <Select
                  placeholder="Seleccione departamento"
                  value={indice.departamento}
                  onChange={e =>
                    setIndice({ ...indice, departamento: e.target.value })
                  }
                >
                  <option value="Administración">Administración</option>
                  <option value="Docencia">Docencia</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </Select>
              </FormControl>
              <Stack
                spacing={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent="space-between"
              >
                <FormControl isRequired>
                  <FormLabel>Fecha de Inicio</FormLabel>
                  <Input
                    type="date"
                    value={indice.fechaInicio}
                    onChange={e =>
                      setIndice({ ...indice, fechaInicio: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Fecha de Fin</FormLabel>
                  <Input
                    type="date"
                    value={indice.fechaFin}
                    onChange={e =>
                      setIndice({ ...indice, fechaFin: e.target.value })
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
              onClick={handleGenerateCertificado}
              isLoading={isGenerating}
              loadingText="Generando..."
              leftIcon={<DownloadIcon />}
              isDisabled={
                Object.values(indice).some(value => value === '') ||
                isGenerating
              }
            >
              Generar Certificado
            </Button>
            {identifier && (
              <PDFDownloadLink
                document={
                  <CertificadoPDF data={indice} identifier={identifier} />
                }
                fileName={`certificado_trabajo_${indice.nombre
                  .replace(/\s+/g, '_')
                  .toLowerCase()}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <Button
                    bg={'primary.100'}
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
                  >
                    Descargar PDF
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalGeneraCertificadoTrabajo;
