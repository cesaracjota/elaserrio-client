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
import { Tooltip, IconButton, Button } from '@chakra-ui/react';
import { FiFileText } from 'react-icons/fi';
import LogoColegio from '../../assets/img/logoColegio.png';
import FirmaRector from '../../assets/img/firmaRector.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotasByStudent } from '../../features/notaSlice';
import globalInformation from '../../helpers/globalInformation';
import { CustomToast } from '../../helpers/toast';

// Estilos mejorados con diseño profesional y esquema de colores verde
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    fontSize: 10,
  },

  // Encabezado institucional
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2ecc71',
    paddingBottom: 10,
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
    color: '#000000',
    marginBottom: 3,
  },
  schoolDecrees: {
    fontSize: 7,
    color: '#2c3e50',
    marginBottom: 1,
  },
  schoolCode: {
    fontSize: 8,
    fontWeight: 600,
    color: '#2c3e50',
    marginTop: 2,
  },

  // Información del estudiante en 3 columnas
  studentContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#e8f8f5',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    marginBottom: 15,
  },
  studentInfoColumn: {
    width: '33.33%',
    paddingHorizontal: 5,
  },
  studentInfoLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: '#2c3e50',
    marginBottom: 2,
  },
  studentInfoValue: {
    fontSize: 8,
    color: '#34495e',
    marginBottom: 5,
  },

  // Tabla de evaluación
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 3,
    marginBottom: 20,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#27ae60',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eaecee',
  },
  tableHeaderCell: {
    padding: 6,
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
    color: 'white',
    borderRightWidth: 1,
    borderRightColor: '#bdc3c7',
  },
  tableCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eaecee',
    justifyContent: 'center',
  },
  subjectNameCell: {
    padding: 10,
    fontSize: 9,
    fontWeight: 700,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#bdc3c7',
    backgroundColor: '#f0faf5',
  },
  periodRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eaecee',
    minHeight: 25,
  },
  periodCell: {
    padding: 6,
    fontSize: 8,
    fontWeight: 600,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eaecee',
  },
  valoracionCell: {
    padding: 6,
    fontSize: 8,
    textAlign: 'left',
  },
  noValoracion: {
    color: '#95a5a6',
    fontStyle: 'italic',
  },
  evenRow: {
    backgroundColor: '#f8fcf9',
  },
  subjectDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#27ae60',
    marginBottom: 0,
  },

  // Sección de firmas
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  signature: {
    width: 200,
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#27ae60',
    marginBottom: 5,
    marginTop: 5,
  },
  signatureText: {
    fontSize: 8,
    color: '#34495e',
    textAlign: 'center',
  },
  signatureImage: {
    width: 120,
    height: 60,
    marginBottom: 2,
    alignSelf: 'center',
  },

  // Pie de página
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 7,
    color: '#7f8c8d',
  },
});

// Componente para el reporte preescolar
const AcademicReportPDF = ({
  studentData,
  evaluaciones,
  schoolInfo,
  sede,
  periodoActual,
}) => {
  // Extraer información del estudiante
  const student = studentData?.estudiante || {};
  const academicYear = studentData?.academic_year || '2025';
  const grade = studentData?.grado || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado con información de la institución */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src={LogoColegio} />
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
            <Text style={styles.schoolCode}>SEDE: {sede?.nombre}</Text>
            <Text style={styles.schoolCode}>
              CÓDIGO DANE: {sede?.codigoDane}
            </Text>
          </View>
        </View>

        {/* Información del estudiante en 3 columnas */}
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
            <Text style={styles.studentInfoLabel}>GRADO Y NIVEL:</Text>
            <Text style={styles.studentInfoValue}>
              {grade?.nombre || 'PREESCOLAR'} - {grade?.nivel || 'INICIAL'}
            </Text>
            <Text style={styles.studentInfoLabel}>AÑO LECTIVO:</Text>
            <Text style={styles.studentInfoValue}>
              {academicYear?.year} - {academicYear?.periodo}
            </Text>
          </View>
          <View style={styles.studentInfoColumn}>
            <Text style={styles.studentInfoLabel}>JORNADA:</Text>
            <Text style={styles.studentInfoValue}>
              {student?.turno || 'MAÑANA'}
            </Text>
          </View>
        </View>

        {/* Tabla de experiencias y valoraciones solo para el periodo actual */}
        <View style={styles.table}>
          {/* Encabezado de la tabla */}
          <View style={styles.tableHeaderRow}>
            <View style={[styles.tableHeaderCell, { width: '30%' }]}>
              <Text>EXPERIENCIAS</Text>
            </View>
            <View style={[styles.tableHeaderCell, { width: '70%' }]}>
              <Text>VALORACIÓN</Text>
            </View>
          </View>

          {/* Filas de experiencias con valoraciones solo del periodo actual */}
          {evaluaciones?.map((exp, index) => {
            // Contador para alternar colores entre materias
            const isEvenExp = index % 2 === 0;

            // Obtener valoración del periodo actual
            const valoracionActual = exp.valoraciones?.find(
              val => val.periodo === periodoActual
            );

            // Creamos una estructura para cada materia
            return (
              <View key={index}>
                {/* Fila del nombre de la materia */}
                <View
                  style={[styles.tableRow, isEvenExp ? styles.evenRow : null]}
                >
                  {/* Columna del nombre de la materia */}
                  <View style={[styles.subjectNameCell, { width: '30%' }]}>
                    <Text>{exp.nombre}</Text>
                  </View>

                  {/* Columna para las filas de periodos - Solo el periodo actual */}
                  <View style={[styles.valoracionCell, { width: '70%' }]}>
                    {valoracionActual ? (
                      <Text>{valoracionActual.valoracion}</Text>
                    ) : (
                      <Text style={styles.noValoracion}>
                        No hay valoración registrada para este periodo
                      </Text>
                    )}
                  </View>
                </View>

                {/* Separador entre materias */}
                {index < evaluaciones.length - 1 && (
                  <View style={styles.subjectDivider} />
                )}
              </View>
            );
          })}
        </View>

        {/* Sección de firmas */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Image src={FirmaRector} style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Rector(a)</Text>
            <Text style={[styles.signatureText, { fontWeight: 700 }]}>
              {globalInformation?.rector || 'RAÚL JHONEDINSON MARTÍNEZ SUÁREZ'}
            </Text>
          </View>
          <View style={styles.signature}>
            <View style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Docente Titular</Text>
            <Text style={[styles.signatureText, { fontWeight: 700 }]}>
              {grade?.docente_titular?.nombre || 'CÉSAR AUGUSTO ACOSTA'}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Componente botón para generar y descargar el reporte
const ReporteIndividualEstudianteInicialCalificacion = ({
  data,
  configuracion,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch();

  const { sedeSeleccionada } = useSelector(state => state.auth);

  // convert to number
  const periodoActual = parseInt(data?.academic_year?.periodo);

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

      // Procesar notas para incluir nombre de materia
      const evaluaciones = notas.map(nota => ({
        ...nota,
        nombre: nota.materia?.nombre || 'Sin nombre',
      }));

      // Generar PDF
      const contenido = (
        <AcademicReportPDF
          studentData={data}
          sede={sedeSeleccionada}
          evaluaciones={evaluaciones}
          schoolInfo={defaultSchoolInfo}
          periodoActual={periodoActual}
        />
      );

      // Crear blob y descargar
      const blob = await pdf(contenido).toBlob();
      const url = URL.createObjectURL(blob);

      const fileName = `boletin_${data?.estudiante?.nombres
        ?.toLowerCase()
        .replace(/\s+/g, '_')}_periodo${periodoActual}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      CustomToast({
        title: 'Éxito',
        message: `Boletín académico del periodo ${periodoActual} generado y descargado correctamente`,
        type: 'success',
        duration: 3000,
        position: 'top',
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      CustomToast({
        title: 'Error',
        message:
          error.message ||
          `Error al generar el boletín académico del periodo ${periodoActual}. Revise si el estudiante tiene evaluaciones registradas.`,
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
      label={`Generar boletín académico del periodo ${periodoActual}`}
      placement="auto"
    >
      <Button
        colorScheme="teal"
        variant="outline"
        size="sm"
        isLoading={isGenerating}
        leftIcon={<FiFileText />}
        onClick={generateAndDownloadPdf}
        loadingText="Generando boletín..."
        isDisabled={
          configuracion?.permitirDescargarBoletin === false || // si hay configuración y no permite ver
          configuracion == !null
        }
      >
        Periodo {periodoActual}
      </Button>
    </Tooltip>
  );
};

export default ReporteIndividualEstudianteInicialCalificacion;
