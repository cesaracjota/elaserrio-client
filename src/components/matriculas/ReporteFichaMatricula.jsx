import React, { useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  pdf,
} from '@react-pdf/renderer';
import { Tooltip, IconButton } from '@chakra-ui/react';
import { FiDownload } from 'react-icons/fi';
import LogoColegio from '../../assets/img/logoColegio.png';
import FirmaRector from '../../assets/img/firmaRector.png'; // Importa la firma del rector
import globalInformation from '../../helpers/globalInformation';
import { CustomToast } from '../../helpers/toast';

// Estilos para el PDF - Diseño profesional mejorado para la ficha de matrícula
const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: '#FFFFFF',
    fontSize: 9, // Letra más pequeña para todo el documento
    fontFamily: 'Helvetica',
  },

  // Encabezado institucional optimizado
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    borderBottom: '1pt solid #1A5276',
    paddingBottom: 8,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 7,
  },
  headerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#1A5276',
  },
  headerSubtitle: {
    fontSize: 7,
    marginBottom: 1,
    color: '#34495E',
  },
  logo: {
    width: 45,
    height: 45,
  },

  // Título principal con diseño mejorado
  mainTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1A5276',
    backgroundColor: '#F8F9F9',
    padding: 6,
    borderRadius: 2,
  },

  // Código de matrícula
  enrollmentCode: {
    fontSize: 8,
    textAlign: 'center',
    marginBottom: 10,
    color: '#34495E',
  },

  // Tablas mejoradas con bordes completos
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#AED6F1',
    borderRadius: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D6EAF8',
  },
  tableHeader: {
    backgroundColor: '#2fa33a',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 8,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1A5276',
  },
  tableCell: {
    padding: 4,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: '#D6EAF8',
  },
  tableCellNoBorder: {
    padding: 4,
    fontSize: 8,
  },

  // Secciones diferenciadas
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    backgroundColor: '#2fa33a',
    color: '#FFFFFF',
    padding: 5,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    textAlign: 'center',
  },

  // Columnas en tablas
  column20: { width: '20%' },
  column25: { width: '25%' },
  column30: { width: '30%' },
  column33: { width: '33.33%' },
  column40: { width: '40%' },
  column50: { width: '50%' },
  column60: { width: '60%' },
  column70: { width: '70%' },
  column75: { width: '75%' },
  column80: { width: '80%' },

  // Estilos para textos
  label: {
    fontWeight: 'bold',
    color: '#34495E',
  },
  value: {
    color: '#2C3E50',
  },

  // Alternancia de colores en las filas
  evenRow: {
    backgroundColor: '#F8FBFD',
  },
  oddRow: {
    backgroundColor: '#FFFFFF',
  },

  // Sección de firmas mejorada
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  signature: {
    width: '45%',
    alignItems: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    marginBottom: 6,
    width: '100%',
  },
  signatureText: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495E',
    marginBottom: 2,
  },
  signatureSubtext: {
    fontSize: 8,
    textAlign: 'center',
    color: '#7F8C8D',
    marginTop: 1,
  },
  signatureImage: {
    width: 120,
    height: 60,
    marginBottom: 5,
    alignSelf: 'center',
  },
  // Sello oficial
  seal: {
    position: 'absolute',
    width: 70,
    height: 70,
    opacity: 0.2,
    right: 80,
    bottom: 90,
  },

  // Pie de página mejorado
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 25,
    right: 25,
    fontSize: 7,
    textAlign: 'center',
    color: '#7F8C8D',
    borderTopWidth: 1,
    borderTopColor: '#D5D8DC',
    paddingTop: 4,
  },

  // Nota legal más compacta
  legalNote: {
    marginTop: 15,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#D5D8DC',
  },
  legalNoteText: {
    fontSize: 7,
    textAlign: 'center',
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
});

// Componente para generar el PDF de ficha de matrícula
const EnrollmentFormPDF = ({ studentData }) => {
  console.log(studentData);
  const academicYear =
    studentData?.academic_year?.year || new Date().getFullYear();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado institucional */}
        <View style={styles.header}>
          <Image src={LogoColegio} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              {globalInformation.gobernacion}
            </Text>
            <Text style={styles.headerSubtitle}>
              {globalInformation.secretaria_educacion}
            </Text>
            <Text style={styles.headerSubtitle}>
              {globalInformation.municipio}
            </Text>
            <Text style={styles.headerTitle}>
              {globalInformation.institucion_educativa}
            </Text>
            <Text style={styles.headerSubtitle}>
              RESOLUCIÓN DE APROBACIÓN DE ESTUDIOS{' '}
              {globalInformation.decretos[0].numero}{' '}
              {globalInformation.decretos[0].fecha}
            </Text>
              <Text style={styles.headerSubtitle}>
                SEDE: {studentData?.sede?.nombre}
              </Text>
              <Text style={styles.headerSubtitle}>
                CODIGO DANE: {studentData?.sede?.codigoDane}
              </Text>
          </View>
          <Image src={globalInformation.logoColegio} style={styles.logo} />
        </View>

        {/* Título principal */}
        <Text style={styles.mainTitle}>
          FICHA DE MATRÍCULA - AÑO ACADÉMICO {academicYear}
        </Text>

        {/* Código de matrícula */}
        <Text style={styles.enrollmentCode}>
          CÓDIGO DE MATRICULA: {studentData?.codigo || 'No registrado'}
        </Text>

        {/* INFORMACIÓN ACADÉMICA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMACIÓN ACADÉMICA</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.evenRow]}>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>AÑO ACADÉMICO:</Text>
                <Text style={styles.value}>{academicYear}</Text>
              </View>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>NIVEL:</Text>
                <Text style={styles.value}>
                  {studentData?.grado?.nivel || 'Primaria'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>GRADO:</Text>
                <Text style={styles.value}>
                  {studentData?.grado?.nombre || '1°'}
                </Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.oddRow]}>
              <View style={[styles.tableCell, styles.column25]}>
                <Text style={styles.label}>TURNO:</Text>
                <Text style={styles.value}>
                  {studentData?.turno || 'Mañana'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column25]}>
                <Text style={styles.label}>SEDE:</Text>
                <Text style={styles.value}>
                  {studentData?.sede?.nombre || 'Principal'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column25]}>
                <Text style={styles.label}>Fecha Matrícula:</Text>
                <Text style={styles.value}>
                  {new Date().toLocaleDateString('es-ES')}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column25]}>
                <Text style={styles.label}>ESTADO:</Text>
                <Text style={styles.value}>MATRICULADO</Text>
              </View>
            </View>
          </View>
        </View>

        {/* DATOS DEL ESTUDIANTE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATOS DEL ESTUDIANTE</Text>
          <View style={styles.table}>
            {/* Fila 1 - Información básica */}
            <View style={[styles.tableRow, styles.evenRow]}>
              <View style={[styles.tableCell, styles.column50]}>
                <Text style={styles.label}>APELLIDOS:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.apellidos || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column50]}>
                <Text style={styles.label}>NOMBRES:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.nombres || 'No registrado'}
                </Text>
              </View>
            </View>

            {/* Fila 2 - Documentación */}
            <View style={[styles.tableRow, styles.oddRow]}>
              <View style={[styles.tableCell, styles.column25]}>
                <Text style={styles.label}>N° DOCUMENTO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.dni || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column25]}>
                <Text style={styles.label}>FECHA NACIMIENTO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.fechaNacimiento || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column25]}>
                <Text style={styles.label}>SEXO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.sexo || 'No especificado'}
                </Text>
              </View>
            </View>

            {/* Fila 3 - Información complementaria */}
            <View style={[styles.tableRow, styles.evenRow]}>
              <View style={[styles.tableCell, styles.column50]}>
                <Text style={styles.label}>DIRECCIÓN:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.direccion || 'No registrada'}
                </Text>
              </View>
            </View>

            {/* Fila 4 - Contacto */}
            <View style={[styles.tableRow, styles.oddRow]}>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>TELEFONO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.telefono || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>CELULAR:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.celular || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column33]}>
                <Text style={styles.label}>CORREO ELECTRONICO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.correo || 'No registrado'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* DATOS DEL APODERADO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATOS DEL APODERADO</Text>
          <View style={styles.table}>
            {/* Fila 1 - Información básica apoderado */}
            <View style={[styles.tableRow, styles.evenRow]}>
              <View style={[styles.tableCellNoBorder, styles.column100]}>
                <Text style={styles.label}>NOMBRES:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.nombre || 'No registrado'}
                </Text>
              </View>
            </View>

            {/* Fila 2 - Documentación apoderado */}
            <View style={[styles.tableRow, styles.oddRow]}>
              <View style={[styles.tableCell, styles.column30]}>
                <Text style={styles.label}>N° DOCUMENTO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.dni || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column40]}>
                <Text style={styles.label}>PARENTESCO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.parentesco || 'No registrado'}
                </Text>
              </View>
            </View>

            {/* Fila 3 - Dirección apoderado */}
            <View style={[styles.tableRow, styles.evenRow]}>
              <View style={[styles.tableCell, styles.column50]}>
                <Text style={styles.label}>DIRECCION:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.direccion ||
                    'Misma dirección del estudiante'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column50]}>
                <Text style={styles.label}>OCUPACIÓN:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.ocupacion || 'No registrada'}
                </Text>
              </View>
            </View>

            {/* Fila 4 - Contacto apoderado */}
            <View style={[styles.tableRow, styles.oddRow]}>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>TELEFONO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.telefono || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCell, styles.column33]}>
                <Text style={styles.label}>CELULAR:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.celular || 'No registrado'}
                </Text>
              </View>
              <View style={[styles.tableCellNoBorder, styles.column33]}>
                <Text style={styles.label}>CORREO ELECTRONICO:</Text>
                <Text style={styles.value}>
                  {studentData?.estudiante?.acudiente?.correo || 'No registrado'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Nota legal */}
        <View style={styles.legalNote}>
          <Text style={styles.legalNoteText}>
            Esta ficha de matrícula tiene carácter de declaración jurada. Los
            datos consignados son de exclusiva responsabilidad de los firmantes.
            La información proporcionada es confidencial y será utilizada
            exclusivamente para fines académicos y administrativos de la
            institución educativa.
          </Text>
        </View>

        {/* Firmas */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <View style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>FIRMA DEL ACUDIENTE</Text>
            <Text style={styles.signatureSubtext}>
              {studentData?.estudiante?.acudiente?.nombre}
            </Text>
          </View>

          <View style={styles.signature}>
            <Image src={FirmaRector} style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>RECTOR(A)</Text>
            <Text style={styles.signatureSubtext}>
              {globalInformation.rector || 'AUGUSTO GÓMEZ GARCÍA'}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Componente botón para generar y descargar la ficha de matrícula
const ReporteFichaMatricula = ({ data, configuracion }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Generar y descargar el PDF
  const generateAndDownloadPdf = async () => {
    if (!data?._id) {
      CustomToast({
        title: 'Error',
        message: 'No hay datos suficientes para generar la ficha de matrícula',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generar el PDF
      const pdfDoc = <EnrollmentFormPDF studentData={data} />;

      // Crear blob y descargar
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);

      const fileName = `ficha_matricula_${data?.estudiante?.apellidos
        ?.toLowerCase()
        .replace(/\s+/g, '_')}_${data?.estudiante?.nombres
        ?.toLowerCase()
        .replace(/\s+/g, '_')}_${academicYear}.pdf`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      CustomToast({
        title: 'Éxito',
        message: 'Ficha de matrícula generada y descargada correctamente',
        type: 'success',
        duration: 3000,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      CustomToast({
        title: 'Error',
        message: error.message || 'Error al generar la ficha de matrícula',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Obtener el año académico actual o usar el proporcionado
  const academicYear = data?.academic_year?.year || new Date().getFullYear();

  return (
    <Tooltip placement="auto" label="Descargar ficha de matrícula">
      <IconButton
        icon={<FiDownload />}
        size="md"
        mr={2}
        colorScheme="blue"
        _dark={{ bg: 'blue.500', color: 'white', _hover: { bg: 'blue.600' } }}
        color="white"
        isRound
        variant="solid"
        aria-label="Descargar ficha de matrícula"
        isLoading={isGenerating}
        isDisabled={
          configuracion?.permitirDescargarFichaMatricula === false
        }
        onClick={generateAndDownloadPdf}
      />
    </Tooltip>
  );
};

export default ReporteFichaMatricula;
