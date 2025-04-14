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
import { FiFileText } from 'react-icons/fi';
import LogoColegio from '../../assets/img/logoColegio.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotasByStudent } from '../../features/notaSlice';
import globalInformation from '../../helpers/globalInformation';
import { CustomToast } from '../../helpers/toast';

// Estilos mejorados para un diseño más profesional
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontSize: 10,
  },

  // Encabezado de la institución - Diseño renovado
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
    paddingBottom: 12,
  },
  logoContainer: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  schoolInfoContainer: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 3,
  },
  schoolDecrees: {
    fontSize: 7,
    color: '#34495E',
    marginBottom: 1,
  },
  schoolCode: {
    fontSize: 8,
    fontWeight: 600,
    color: '#34495E',
    marginTop: 2,
  },

  // Información del estudiante - Más organizada
  studentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
  studentInfoColumn: {
    width: '33%',
  },
  studentInfoLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 2,
  },
  studentInfoValue: {
    fontSize: 10,
    fontWeight: 600,
    color: '#34495E',
    marginBottom: 8,
  },

  // Tabla de calificaciones - Estilo moderno
  tableContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#3498DB',
    backgroundColor: '#ECF0F1',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECEE',
    minHeight: 24,
  },
  tableRowAlternate: {
    backgroundColor: '#F8FAFC',
  },
  tableHeaderCell: {
    padding: 6,
    fontSize: 6,
    fontWeight: 700,
    textAlign: 'center',
    color: '#2C3E50',
    borderRightWidth: 1,
    borderRightColor: '#BDC3C7',
  },
  tableCell: {
    padding: 6,
    fontSize: 7,
    textAlign: 'center',
    color: '#2C3E50',
    borderRightWidth: 1,
    borderRightColor: '#EAECEE',
    justifyContent: 'center',
  },
  tableCellLeft: {
    padding: 6,
    fontSize: 7,
    textAlign: 'left',
    justifyContent: 'center',
    color: '#2C3E50',
    borderRightWidth: 1,
    borderRightColor: '#EAECEE',
  },

  // Celdas de notas
  gradeCell: {
    padding: 6,
    fontSize: 7,
    fontWeight: 600,
    textAlign: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EAECEE',
  },

  // Observaciones en tabla
  observationRow: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 6,
    fontSize: 6,
    paddingVertical: 2,
  },
  observationText: {
    fontSize: 6,
    paddingHorizontal: 6,
    fontWeight: 600,
    color: '#2C3E50',
  },
  observationLabel: {
    fontWeight: 700,
    color: '#2C3E50',
  },

  // Tamaños de columnas
  cellSubject: {
    width: '25%',
  },
  cellPeriod: {
    width: '7%',
  },
  cellFinal: {
    width: '7%',
  },
  cellObservation: {
    width: '28%',
  },
  cellResult: {
    width: '12%',
  },
  cellDocente: {
    width: '25%',
  },

  // Sección de resumen y promedios
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  summaryBox: {
    width: '48%',
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E7E9',
  },
  summaryTitle: {
    fontWeight: 700,
    fontSize: 9,
    color: '#2C3E50',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#3498DB',
    paddingBottom: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryLabel: {
    fontSize: 8,
    color: '#34495E',
  },
  summaryValue: {
    fontSize: 8,
    fontWeight: 600,
    color: '#2C3E50',
  },
  averageValue: {
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'center',
    marginTop: 5,
    padding: 5,
    backgroundColor: '#3498DB',
    color: 'white',
    borderRadius: 3,
  },

  // Leyenda de valoración
  legendContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E5E7E9',
  },
  legendTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 5,
  },
  legendText: {
    fontSize: 8,
    lineHeight: 1.3,
    color: '#34495E',
  },
  legendScale: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  legendItem: {
    width: '23%',
    padding: 3,
    borderRadius: 3,
    alignItems: 'center',
  },
  legendItemText: {
    fontSize: 7,
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
  },

  // Firmas
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  signature: {
    width: 200,
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#2C3E50',
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    color: '#34495E',
    textAlign: 'center',
  },

  // Pie de página
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7E9',
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 7,
    color: '#7F8C8D',
  },

  // Badge para desempeño
  performanceBadge: {
    fontSize: 6,
    fontWeight: 700,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    color: 'white',
  },
});

// Función para determinar el desempeño según la calificación
const getPerformanceLevel = average => {
  if (average >= 4.7) return 'SUPERIOR';
  if (average >= 4.0) return 'ALTO';
  if (average >= 3.0) return 'BASICO';
  return 'BAJO';
};

// Función para obtener el color según la calificación
const getGradeColor = grade => {
  if (grade >= 4.7) return '#27AE60'; // Verde oscuro - Superior
  if (grade >= 4.0) return '#2ECC71'; // Verde - Alto
  if (grade >= 3.0) return '#F39C12'; // Naranja - Básico
  return '#E74C3C'; // Rojo - Bajo
};

// Componente principal del reporte
const AcademicReportPDF = ({ studentData, subjectData, schoolInfo, sede }) => {
  // Extraer información del estudiante
  const student = studentData?.estudiante || {};
  const academicYear = studentData?.academic_year || '2025';
  const grade = studentData?.grado || {};

  // Determinar posición ranking
  const position = studentData?.ranking || '0';
  const totalStudents = grade?.totalEstudiantes || '0';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con información de la institución */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src={schoolInfo?.logoUrl || LogoColegio} />
          </View>
          <View style={styles.schoolInfoContainer}>
            <Text style={styles.schoolName}>
              {globalInformation?.colegioNombre ||
                'INSTITUCION EDUCATIVA EL ASERRÍO'}
            </Text>
            {globalInformation?.decretos?.map((decreto, index) => (
              <Text key={index} style={styles.schoolDecrees}>
                {decreto?.tipo} N° {decreto.numero} del {decreto.fecha}
              </Text>
            ))}
            {/* SEDE */}
            <Text style={styles.schoolCode}>SEDE: {sede?.nombre}</Text>
            <Text style={styles.schoolCode}>
              CÓDIGO DANE: {sede?.codigoDane}
            </Text>
          </View>
        </View>

        {/* Información del estudiante */}
        <View style={styles.studentContainer}>
          <View style={styles.studentInfoColumn}>
            <Text style={styles.studentInfoLabel}>NOMBRES Y APELLIDOS:</Text>
            <Text style={styles.studentInfoValue}>
              {student?.nombres} {student?.apellidos}
            </Text>
            <Text style={styles.studentInfoLabel}>IDENTIFICACIÓN:</Text>
            <Text style={styles.studentInfoValue}>{student?.dni}</Text>
          </View>
          <View style={styles.studentInfoColumn}>
            <Text style={styles.studentInfoLabel}>GRADO:</Text>
            <Text style={styles.studentInfoValue}>
              {grade?.nombre || '10A'} | {grade?.nivel || 'NIVEL'}
            </Text>
            <Text style={styles.studentInfoLabel}>AÑO LECTIVO:</Text>
            <Text style={styles.studentInfoValue}>{academicYear?.year}</Text>
          </View>
          <View style={styles.studentInfoColumn}>
            <Text style={styles.studentInfoLabel}>PERIODO:</Text>
            <Text style={styles.studentInfoValue}>{academicYear?.periodo}</Text>
            <Text style={styles.studentInfoLabel}>PUESTO:</Text>
            <Text style={styles.studentInfoValue}>
              {position} de {totalStudents}
            </Text>
          </View>
        </View>

        {/* Tabla de calificaciones */}
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Encabezado de la tabla */}
            <View style={styles.tableHeaderRow}>
              <View style={[styles.tableHeaderCell, styles.cellSubject]}>
                <Text>ASIGNATURAS</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellPeriod]}>
                <Text>P. 1</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellPeriod]}>
                <Text>P. 2</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellPeriod]}>
                <Text>P. 3</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellPeriod]}>
                <Text>P. 4</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellFinal]}>
                <Text>PROM.</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellFinal]}>
                <Text>NC</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellFinal]}>
                <Text>IH</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellFinal]}>
                <Text>FAL.</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellResult]}>
                <Text>VAL.</Text>
              </View>
              <View style={[styles.tableHeaderCell, styles.cellDocente]}>
                <Text>DOCENTE</Text>
              </View>
            </View>

            {/* Filas de asignaturas */}
            {(subjectData || []).map((subject, index) => {
              const bimestre1 = parseFloat(subject?.bimestre1) || 0;
              const bimestre2 = parseFloat(subject?.bimestre2) || 0;
              const bimestre3 = parseFloat(subject?.bimestre3) || 0;
              const bimestre4 = parseFloat(subject?.bimestre4) || 0;
              const promedio = parseFloat(subject?.promedio) || 0;
              const ncMinimo = 12.0;
              // el nc es la nota que necesita para aprobar el curso por ejemplo de los 4 periodos si un estudiante aprueba con 3.0 suman 12 entonces 12 es el rango que deberian pasar por lo tanto el nc es el restante de 12 - la sumatoria de notas por los 4 periodos
              const nc =
                ncMinimo - (bimestre1 + bimestre2 + bimestre3 + bimestre4);
              const ih = subject?.materia?.intensidadHorariaSemanal || 0;
              const fallas = subject?.fallas || 0;
              const performanceLevel = getPerformanceLevel(promedio);
              const gradeColor = getGradeColor(promedio);
              const isEvenRow = index % 2 === 0;
              const indicadoresPeriodo =
                subject?.indicadores?.find(i => i.periodo === academicYear?.periodo)
                  ?.indicador || [];

              return (
                <React.Fragment key={index}>
                  {/* Fila principal con notas */}
                  <View
                    style={[
                      styles.tableRow,
                      isEvenRow && styles.tableRowAlternate,
                    ]}
                  >
                    <View style={[styles.tableCellLeft, styles.cellSubject]}>
                      <Text style={{ fontWeight: 600 }}>
                        {subject?.materia?.nombre || 'MATERIA'}
                      </Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellPeriod]}>
                      <Text>{bimestre1 > 0 ? bimestre1.toFixed(1) : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellPeriod]}>
                      <Text>{bimestre2 > 0 ? bimestre2.toFixed(1) : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellPeriod]}>
                      <Text>{bimestre3 > 0 ? bimestre3.toFixed(1) : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellPeriod]}>
                      <Text>{bimestre4 > 0 ? bimestre4.toFixed(1) : '—'}</Text>
                    </View>
                    <View style={[styles.gradeCell, styles.cellFinal]}>
                      <Text style={{ color: gradeColor }}>
                        {promedio.toFixed(2)}
                      </Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellFinal]}>
                      <Text>{nc > 0 ? nc.toFixed(2) : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellFinal]}>
                      <Text>{ih > 0 ? ih : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellFinal]}>
                      <Text>{fallas > 0 ? fallas : '—'}</Text>
                    </View>
                    <View style={[styles.tableCell, styles.cellResult]}>
                      <View
                        style={[
                          styles.performanceBadge,
                          { backgroundColor: gradeColor },
                        ]}
                      >
                        <Text>{performanceLevel}</Text>
                      </View>
                    </View>
                    <View style={[styles.tableCellLeft, styles.cellDocente]}>
                      <Text>{subject?.profesor?.nombre || '—'}</Text>
                    </View>
                  </View>

                  {/* Si hay observaciones, mostrarlas */}

                  {indicadoresPeriodo.map((item, index) => (
                    <View style={styles.observationRow} key={index}>
                      <Text style={styles.observationText}>
                        <Text style={styles.observationLabel}>
                          {"- "}
                        </Text>
                        {item?.indicador || '—'}
                      </Text>
                    </View>
                  ))}
                </React.Fragment>
              );
            })}
          </View>
        </View>

        {/* Sección de resumen */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>RESUMEN ACADÉMICO</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Materias evaluadas:</Text>
              <Text style={styles.summaryValue}>
                {subjectData?.length || 0}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Puesto del grado:</Text>
              <Text style={styles.summaryValue}>
                {position} de {totalStudents}
              </Text>
            </View>
            <Text style={styles.averageValue}>
              PROMEDIO GENERAL: {studentData?.promedioGeneral.toFixed(3) || 0} 
            </Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>ESCALA DE VALORACIÓN</Text>
            <View style={styles.legendScale}>
              <View style={[styles.legendItem, { backgroundColor: '#E74C3C' }]}>
                <Text style={styles.legendItemText}>BAJO</Text>
                <Text style={styles.legendItemText}>1.0 - 2.9</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: '#F39C12' }]}>
                <Text style={styles.legendItemText}>BÁSICO</Text>
                <Text style={styles.legendItemText}>3.0 - 3.9</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: '#2ECC71' }]}>
                <Text style={styles.legendItemText}>ALTO</Text>
                <Text style={styles.legendItemText}>4.0 - 4.6</Text>
              </View>
              <View style={[styles.legendItem, { backgroundColor: '#27AE60' }]}>
                <Text style={styles.legendItemText}>SUPERIOR</Text>
                <Text style={styles.legendItemText}>4.7 - 5.0</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Sección de firmas */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Rector(a)</Text>
            <Text style={[styles.signatureText, { fontWeight: 700 }]}>
              {globalInformation?.rector || 'NOMBRE DEL RECTOR(A)'}
            </Text>
          </View>
          <View style={styles.signature}>
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Docente Titular</Text>
            <Text style={[styles.signatureText, { fontWeight: 700 }]}>
              {grade?.docente_titular?.nombre ||
                'NOMBRE DEL DOCENTE TITULAR'}
            </Text>
          </View>
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>
            {globalInformation?.direccionColegio ||
              'Dirección de la Institución'}
          </Text>
          <Text>
            Generado:{' '}
            {new Date().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Componente botón para generar y descargar el reporte
const ReportButton = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch();

  const { sedeSeleccionada } = useSelector(state => state.auth);

  const defaultSchoolInfo = {
    name: globalInformation.colegioNombre || 'INSTITUCION EDUCATIVA EL ASERRÍO',
    logoUrl: globalInformation.logoColegio,
    address: globalInformation.direccionColegio,
    phone: globalInformation.telefonoColegio,
    email: globalInformation.emailColegio,
  };

  const generateAndDownloadPdf = async () => {
    if (!data?._id) {
      CustomToast({
        title: 'Error',
        message: 'No se encontraron datos del estudiante',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Obtener notas del estudiante
      const notas = await dispatch(getAllNotasByStudent(data._id)).unwrap();

      // Validar que haya datos
      if (!notas || !notas.length) {
        throw new Error(
          'No se encontraron datos de calificaciones para este estudiante'
        );
      }

      // Generar el PDF
      const pdfDoc = (
        <AcademicReportPDF
          studentData={data}
          sede={sedeSeleccionada}
          subjectData={notas}
          schoolInfo={defaultSchoolInfo}
        />
      );

      // Crear blob y descargar
      const blob = await pdf(pdfDoc).toBlob();
      const url = URL.createObjectURL(blob);

      const fileName = `boletin_${data?.estudiante?.nombres
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
        message: 'Boletín académico generado y descargado correctamente',
        type: 'success',
        duration: 3000,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      CustomToast({
        title: 'Error',
        message:
          error.msg ||
          'Error al generar el boletín académico revise si tiene notas',
        type: 'error',
        duration: 3000,
        position: 'top',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Tooltip label="Generar boletín académico" placement="auto">
      <IconButton
        icon={<FiFileText />}
        size="md"
        mr={2}
        color={'white'}
        colorScheme="primary"
        isRound
        variant="solid"
        aria-label="Generar boletín PDF"
        isLoading={isGenerating}
        onClick={generateAndDownloadPdf}
        isDisabled={!data?._id}
      />
    </Tooltip>
  );
};

export default ReportButton;
