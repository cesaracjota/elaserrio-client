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
import { FiEye } from 'react-icons/fi';
import LogoColegio from '../../assets/img/logoColegio.png';
import globalInformation from '../../helpers/globalInformation';
import { CustomToast } from '../../helpers/toast';

// Estilos para el PDF - Diseño mejorado y profesional
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Helvetica',
  },

  // Encabezado institucional mejorado
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    borderBottom: '2pt solid #1A5276',
    paddingBottom: 10,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#1A5276',
  },
  headerSubtitle: {
    fontSize: 8,
    marginBottom: 1,
    color: '#34495E',
  },
  logo: {
    width: 50,
    height: 50,
  },

  // Título principal con diseño mejorado
  mainTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1A5276',
    backgroundColor: '#F8F9F9',
    padding: 8,
    borderRadius: 4,
  },

  // Datos del estudiante con diseño mejorado
  studentInfoBox: {
    border: '1pt solid #AED6F1',
    padding: 12,
    marginBottom: 15,
    borderRadius: 4,
    backgroundColor: '#EBF5FB',
  },
  studentInfoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1A5276',
    borderBottom: '1pt solid #AED6F1',
    paddingBottom: 5,
  },
  studentInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  studentInfoLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    width: 160,
    color: '#34495E',
  },
  studentInfoValue: {
    flex: 1,
  },

  // Sección de observaciones unificada y mejorada
  observationsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
    color: '#1A5276',
    backgroundColor: '#F8F9F9',
    padding: 5,
    borderRadius: 4,
  },

  // Tabla unificada con mejor diseño
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#AED6F1',
    marginBottom: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D6EAF8',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1A5276',
    backgroundColor: '#2E86C1',
  },
  tableHeaderCell: {
    padding: 8,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#AED6F1',
    color: '#FFFFFF',
  },
  tableCell: {
    padding: 8,
    fontSize: 6,
    borderRightWidth: 1,
    borderRightColor: '#D6EAF8',
    flex: 1,
  },
  periodCell: {
    width: '12%',
    padding: 8,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#D6EAF8',
    backgroundColor: '#EBF5FB',
  },
  tableColumnHeader: {
    flex: 1,
    padding: 8,
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#AED6F1',
    color: '#FFFFFF',
  },

  // Alternancia de colores en filas
  evenRow: {
    backgroundColor: '#F8F9F9',
  },
  oddRow: {
    backgroundColor: '#FFFFFF',
  },

  // Notas adicionales con estilo mejorado
  notesSection: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D5D8DC',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1A5276',
  },
  notesText: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#34495E',
  },

  // Sección de observaciones por periodo mejorada
  periodSection: {
    marginBottom: 20,
  },
  periodHeader: {
    backgroundColor: '#2E86C1',
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  periodTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  observationTypeLabel: {
    fontWeight: 'bold',
    color: '#1A5276',
    fontSize: 9,
    marginBottom: 3,
  },
  observationText: {
    fontSize: 9,
    textAlign: 'justify',
    lineHeight: 1.4,
  },

  // Nuevo estilo para la sección de comportamiento unificada
  behaviorSection: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6EAF8',
    borderRadius: 4,
  },
  behaviorTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2874A6',
    marginBottom: 5,
  },

  // Firmas con estilo mejorado
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  signatures: {
    width: 200,
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 9,
    textAlign: 'center',
    color: '#34495E',
  },

  // Pie de página mejorado
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#7F8C8D',
    borderTopWidth: 1,
    borderTopColor: '#D5D8DC',
    paddingTop: 5,
  },

  // Nueva estructura para las observaciones en dos columnas
  observationHalfCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#D6EAF8',
  },

  // Para las observaciones adicionales
  additionalNotesRow: {
    borderTopWidth: 1,
    borderTopColor: '#D6EAF8',
    backgroundColor: '#FAFAFA',
  },
});

// Componente para generar el PDF del observador
const StudentObserverPDF = ({ studentData }) => {
  const academicYear =
    studentData?.academic_year?.year || new Date().getFullYear();
  const currentPeriod = studentData?.academic_year?.periodo || 'Periodo actual';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado institucional */}
        <View style={styles.header}>
          <Image src={globalInformation.logoColegio} style={styles.logo} />
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
              DANE: {globalInformation.codigo_dane}
            </Text>
          </View>
          <Image src={LogoColegio} style={styles.logo} />
        </View>

        {/* Título principal */}
        <Text style={styles.mainTitle}>
          SEGUIMIENTO ACADÉMICO Y COMPORTAMENTAL {academicYear}
        </Text>

        {/* Datos del estudiante */}
        <View style={styles.studentInfoBox}>
          <Text style={styles.studentInfoTitle}>
            INFORMACIÓN DEL ESTUDIANTE
          </Text>

          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>NOMBRES Y APELLIDOS:</Text>
            <Text style={styles.studentInfoValue}>
              {studentData?.estudiante?.nombres}{' '}
              {studentData?.estudiante?.apellidos}
            </Text>
          </View>

          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>
              NÚMERO DE IDENTIFICACIÓN:
            </Text>
            <Text style={styles.studentInfoValue}>
              {studentData?.estudiante?.dni}
            </Text>
          </View>

          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>DIRECCIÓN:</Text>
            <Text style={styles.studentInfoValue}>
              {studentData?.estudiante?.direccion || 'NO REGISTRADA'}
            </Text>
          </View>

          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>GRADO:</Text>
            <Text style={styles.studentInfoValue}>
              {studentData?.grado?.nombre}
            </Text>
          </View>

          <View style={styles.studentInfoRow}>
            <Text style={styles.studentInfoLabel}>AÑO ACADÉMICO:</Text>
            <Text style={styles.studentInfoValue}>
              {academicYear} - {currentPeriod}
            </Text>
          </View>
        </View>

        {/* Sección unificada de observaciones */}
        <Text style={styles.observationsTitle}>
          SEGUIMIENTO INTEGRAL DEL ESTUDIANTE
        </Text>

        {/* Tabla unificada de observaciones por periodo */}
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeaderRow}>
            <View style={[styles.tableHeaderCell, { width: '12%' }]}>
              <Text>PERIODO</Text>
            </View>
            <View style={[styles.tableHeaderCell, { flex: 1 }]}>
              <Text>OBSERVACIÓN ACADÉMICA</Text>
            </View>
            <View
              style={[styles.tableHeaderCell, { flex: 1, borderRightWidth: 0 }]}
            >
              <Text>OBSERVACIÓN COMPORTAMENTAL</Text>
            </View>
          </View>

          {/* Mostrar observaciones por periodos */}
          {studentData?.observacionesPeriodo?.length > 0 ? (
            studentData.observacionesPeriodo.map((nota, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  <View style={styles.periodCell}>
                    <Text>{nota.periodo}</Text>
                  </View>
                  <View style={styles.observationHalfCell}>
                    <Text style={styles.observationText}>
                      {nota?.academica ||
                        'Sin observaciones académicas registradas.'}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.observationHalfCell,
                      { borderRightWidth: 0 },
                    ]}
                  >
                    <Text style={styles.observationText}>
                      {nota?.comportamental ||
                        'Sin observaciones comportamentales registradas.'}
                    </Text>
                  </View>
                </View>

                {/* Si hay notas adicionales, mostrarlas en una fila separada */}
                {nota.observaciones && nota.observaciones.trim() !== '' && (
                  <View style={[styles.tableRow, styles.additionalNotesRow]}>
                    <View
                      style={[
                        styles.periodCell,
                        { backgroundColor: '#F5F5F5' },
                      ]}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 8 }}>
                        NOTAS
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.tableCell,
                        { flex: 2, borderRightWidth: 0 },
                      ]}
                    >
                      <Text style={{ fontStyle: 'italic', fontSize: 8 }}>
                        {nota.observaciones}
                      </Text>
                    </View>
                  </View>
                )}
              </React.Fragment>
            ))
          ) : (
            <View style={styles.tableRow}>
              <View style={styles.periodCell}>
                <Text>-</Text>
              </View>
              <View
                style={[styles.tableCell, { flex: 2, borderRightWidth: 0 }]}
              >
                <Text
                  style={{ textAlign: 'center', padding: 10, color: '#7F8C8D' }}
                >
                  NO SE ENCONTRARON OBSERVACIONES REGISTRADAS PARA EL ESTUDIANTE
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Espacio para comentarios y recomendaciones */}
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>RECOMENDACIONES GENERALES:</Text>
          <Text style={styles.notesText}>
            El presente documento recoge las observaciones académicas y
            comportamentales del estudiante durante el año lectivo. Se
            recomienda hacer seguimiento periódico de estas observaciones para
            apoyar el proceso formativo del estudiante.
          </Text>
        </View>

        {/* Firmas */}
        <View style={styles.signatureSection}>
          <View style={styles.signatures}>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>DOCENTE TITULAR</Text>
          </View>
          <View style={styles.signatures}>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>ACUDIENTE</Text>
          </View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>
            {globalInformation.institucion_educativa} • Documento generado el{' '}
            {new Date().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}{' '}
            a las{' '}
            {new Date().toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          <Text style={{ marginTop: 3 }}>
            Este documento tiene carácter informativo y de seguimiento
            académico.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Componente botón para generar y descargar el reporte
const ObserverButton = ({ data, configuracion }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Generar y descargar el PDF
  const generateAndDownloadPdf = async () => {
    if (!data?._id) {
      CustomToast({
        title: 'Error',
        message: 'No hay datos para generar el observador',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generar el PDF
      const pdfDoc = <StudentObserverPDF studentData={data} />;

      // Crear blob y descargar
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);

      const fileName = `observador_${data?.estudiante?.nombres
        ?.toLowerCase()
        .replace(/\s+/g, '_')}_${data?.estudiante?.apellidos
        ?.toLowerCase()
        .replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      CustomToast({
        title: 'Éxito',
        message:
          'Observador del estudiante generado y descargado correctamente',
        type: 'success',
        duration: 3000,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      CustomToast({
        title: 'Error',
        message:
          error.message || 'Error al generar el observador del estudiante',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Tooltip
      placement="auto"
      label={
        data?.observacionesPeriodo?.length > 0
          ? 'Ver observador del estudiante'
          : 'No hay observaciones para este estudiante'
      }
    >
      <IconButton
        icon={<FiEye />}
        size="md"
        mr={2}
        colorScheme="teal"
        _dark={{ bg: 'teal.500', color: 'white', _hover: { bg: 'teal.600' } }}
        color="white"
        isRound
        variant="solid"
        aria-label="Ver observador"
        isLoading={isGenerating}
        onClick={generateAndDownloadPdf}
        isDisabled={
          !data.observacionesPeriodo?.length || // si no hay observaciones, deshabilitar
          configuracion?.permitirDescargarObservadores === false || // si hay configuración y no permite ver
          configuracion ==! null
        }
      />
    </Tooltip>
  );
};

export default ObserverButton;
