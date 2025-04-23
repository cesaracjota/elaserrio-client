import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from '@react-pdf/renderer';
import globalInformation from '../../helpers/globalInformation';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { FaFilePdf } from 'react-icons/fa';

// Enhanced styles for a premium professional design
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  
  // Premium Header with centered styling
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#3498DB',
    borderBottomStyle: 'solid',
  },
  
  logoContainer: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  
  schoolInfoContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  
  schoolName: {
    fontSize: 16,
    fontWeight: 800,
    color: '#2C3E50',
    marginBottom: 5,
    textAlign: 'center',
  },
  
  schoolAddress: {
    fontSize: 9,
    color: '#34495E',
    marginBottom: 2,
    textAlign: 'center',
  },
  
  schoolContact: {
    fontSize: 9,
    color: '#34495E',
    textAlign: 'center',
  },
  
  reportTitleContainer: {
    backgroundColor: '#3498DB',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  
  reportTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // Course Information section with cards
  reportInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  
  reportInfoColumn: {
    width: '50%',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  reportInfoIcon: {
    fontSize: 10,
    marginRight: 5,
    color: '#3498DB',
  },
  
  reportInfoLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: '#495057',
    width: 80,
  },
  
  reportInfoValue: {
    fontSize: 10,
    fontWeight: 600,
    color: '#212529',
    flex: 1,
  },

  // Enhanced Table with modern styling
  tableContainer: {
    marginBottom: 20,
  },
  
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  
  tableHeader: {
    backgroundColor: '#3498DB',
  },
  
  tableHeaderRow: {
    flexDirection: 'row',
  },
  
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    minHeight: 25,
    alignItems: 'center',
  },
  
  tableRowEven: {
    backgroundColor: '#F8F9FA',
  },
  
  tableRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  
  tableCell: {
    padding: 8,
    fontSize: 8,
    justifyContent: 'center',
  },
  
  tableCellBordered: {
    borderRightWidth: 1,
    borderRightColor: '#DEE2E6',
  },
  
  tableCellHeader: {
    fontWeight: 700,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  tableHeaderCell: {
    padding: 10,
    fontSize: 8,
    fontWeight: 700,
    textAlign: 'center',
    color: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#2980B9',
  },

  // Cell size variations
  cellNumber: {
    width: '5%',
  },
  
  cellName: {
    width: '35%',
  },
  
  cellBimester: {
    width: '12%',
  },
  
  cellFinal: {
    width: '20%',
  },

  // Bimester header with gradient effect
  bimesterHeader: {
    backgroundColor: '#2980B9',
    padding: 3,
    fontSize: 7,
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
    marginBottom: 3,
  },

  // Performance indicators with badges
  performanceBadge: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
  },

  // Enhanced Legend and signature section
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#DEE2E6',
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  
  legendColor: {
    width: 12,
    height: 12,
    marginRight: 5,
    borderRadius: 3,
  },
  
  legendText: {
    fontSize: 8,
    color: '#212529',
  },
  
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  
  signature: {
    width: 150,
    textAlign: 'center',
  },
  
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#6C757D',
    marginBottom: 5,
  },
  
  signatureText: {
    fontSize: 8,
    color: '#495057',
    fontWeight: 600,
  },

  signatureImage: {
    width: 120,
    height: 60,
    marginBottom: 5,
    alignSelf: 'center',
  },

  // Enhanced Footer with contact information
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#6C757D',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: 1,
    borderTopColor: '#DEE2E6',
  },
  
  watermark: {
    position: 'absolute',
    top: '50%', 
    left: '50%',
    width: 200,
    height: 200,
    opacity: 0.1,
    transform: 'translate(-50%, -50%)',
  },
  
  // Statistics summary section
  summaryContainer: {
    marginTop: 10,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#F1F8FF',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
  
  summaryTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 8,
  },
  
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  
  summaryLabel: {
    fontSize: 8,
    color: '#495057',
  },
  
  summaryValue: {
    fontSize: 8,
    fontWeight: 600,
    color: '#212529',
  },
});

// Helper function to calculate performance indicators with improved visual feedback
const getPerformanceData = (average) => {
  if (average >= 4.5) return { color: '#1E7E34', text: 'Excelente', bgColor: '#D4EDDA' };
  if (average >= 4.0) return { color: '#117A8B', text: 'Muy Bueno', bgColor: '#D1ECF1' };
  if (average >= 3.5) return { color: '#5B6770', text: 'Bueno', bgColor: '#E2E3E5' };
  if (average >= 3.0) return { color: '#856404', text: 'Aceptable', bgColor: '#FFF3CD' };
  return { color: '#721C24', text: 'Por Mejorar', bgColor: '#F8D7DA' };
};

// Function to calculate class performance statistics
const calculateStatistics = (students) => {
  const validGrades = students.filter(s => s.promedio > 0);
  if (validGrades.length === 0) return { avg: 0, max: 0, min: 0, passing: 0, failing: 0 };
  
  const avg = validGrades.reduce((sum, s) => sum + s.promedio, 0) / validGrades.length;
  const max = Math.max(...validGrades.map(s => s.promedio));
  const min = Math.min(...validGrades.map(s => s.promedio));
  const passing = validGrades.filter(s => s.promedio >= 3).length;
  const failing = validGrades.filter(s => s.promedio < 3).length;
  
  return { avg, max, min, passing, failing };
};

// Enhanced component to generate the PDF document
const StudentReport = ({ students, schoolInfo, courseInfo }) => {
  const stats = calculateStatistics(students);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* School logo watermark */}
        <Image
          src={schoolInfo.logoUrl || '/placeholder-logo.png'}
          style={styles.watermark}
        />
        
        {/* Centered Header with School Logo and Info */}
        <View style={styles.headerContainer}>
          <Image
            src={schoolInfo.logoUrl || '/placeholder-logo.png'}
            style={styles.logoContainer}
          />
          
          <View style={styles.schoolInfoContainer}>
            <Text style={styles.schoolName}>{schoolInfo.name.toUpperCase()}</Text>
            <Text style={styles.schoolAddress}>📍 {schoolInfo.address}</Text>
            <Text style={styles.schoolContact}>📞 {schoolInfo.phone} | ✉️ {schoolInfo.email}</Text>
          </View>
        </View>
        
        {/* Report Title */}
        <View style={styles.reportTitleContainer}>
          <Text style={styles.reportTitle}>INFORME DE CALIFICACIONES</Text>
        </View>
        
        {/* Course Information Cards */}
        <View style={styles.reportInfoContainer}>
          <View style={styles.reportInfoColumn}>
            <Text style={styles.reportInfoIcon}>📚</Text>
            <Text style={styles.reportInfoLabel}>GRADO:</Text>
            <Text style={styles.reportInfoValue}>{courseInfo.grade}</Text>
          </View>
          
          <View style={styles.reportInfoColumn}>
            <Text style={styles.reportInfoIcon}>📝</Text>
            <Text style={styles.reportInfoLabel}>ASIGNATURA:</Text>
            <Text style={styles.reportInfoValue}>{courseInfo.curso}</Text>
          </View>
          
          <View style={styles.reportInfoColumn}>
            <Text style={styles.reportInfoIcon}>👨‍🏫</Text>
            <Text style={styles.reportInfoLabel}>PROFESOR(A):</Text>
            <Text style={styles.reportInfoValue}>{courseInfo.teacher}</Text>
          </View>
          
          <View style={styles.reportInfoColumn}>
            <Text style={styles.reportInfoIcon}>🗓️</Text>
            <Text style={styles.reportInfoLabel}>AÑO LECTIVO:</Text>
            <Text style={styles.reportInfoValue}>{courseInfo.academicYear}</Text>
          </View>
        </View>
        
        {/* Enhanced Table */}
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Table header */}
            <View style={[styles.tableHeaderRow, styles.tableHeader]}>
              <View style={[styles.tableHeaderCell, styles.cellNumber]}>
                <Text>N°</Text>
              </View>
              
              <View style={[styles.tableHeaderCell, styles.cellName]}>
                <Text>ESTUDIANTE</Text>
              </View>
              
              {/* Bimester headers */}
              {[1, 2, 3, 4].map(bim => (
                <View key={bim} style={[styles.tableHeaderCell, styles.cellBimester]}>
                  <Text style={styles.bimesterHeader}>PER. {bim}</Text>
                </View>
              ))}
              
              {/* Final grade */}
              <View style={[styles.tableHeaderCell, styles.cellFinal]}>
                <Text>PROMEDIO FINAL</Text>
              </View>
            </View>
            
            {/* Student rows */}
            {students.map((student, index) => {
              // Calculate performance for final grade
              const performanceData = getPerformanceData(student?.promedio);
              
              return (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                  ]}
                >
                  {/* Student number */}
                  <View style={[styles.tableCell, styles.cellNumber, styles.tableCellBordered]}>
                    <Text>{index + 1}</Text>
                  </View>
                  
                  {/* Student name */}
                  <View style={[styles.tableCell, styles.cellName, styles.tableCellBordered, { textAlign: 'left' }]}>
                    <Text>{student.matricula?.estudiante?.apellidos}, {student.matricula?.estudiante?.nombres}</Text>
                  </View>
                  
                  {/* Bimesters */}
                  {[1, 2, 3, 4].map(bim => {
                    const grade = student[`bimestre${bim}`];
                    const bimPerformance = getPerformanceData(grade);
                    
                    return (
                      <View key={bim} style={[styles.tableCell, styles.cellBimester, styles.tableCellBordered]}>
                        <Text style={{ color: bimPerformance.color, fontWeight: 'bold' }}>
                          {grade?.toFixed(2)}
                        </Text>
                      </View>
                    );
                  })}
                  
                  {/* Final average with badge */}
                  <View style={[styles.tableCell, styles.cellFinal]}>
                    <View style={[styles.performanceBadge, { backgroundColor: performanceData.bgColor }]}>
                      <Text style={{ color: performanceData.color }}>
                        {student?.promedio.toFixed(2)} - {performanceData.text}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        
        {/* Performance Summary - Now positioned below the student table */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>RESUMEN DE RENDIMIENTO DEL CURSO</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Promedio del curso:</Text>
            <Text style={styles.summaryValue}>{stats.avg.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Calificación más alta:</Text>
            <Text style={styles.summaryValue}>{stats.max.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Calificación más baja:</Text>
            <Text style={styles.summaryValue}>{stats.min.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estudiantes aprobados:</Text>
            <Text style={styles.summaryValue}>{stats.passing} de {students.length} ({Math.round(stats.passing/students.length*100)}%)</Text>
          </View>
        </View>
        
        {/* Enhanced Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#D4EDDA' }]} />
            <Text style={styles.legendText}>Excelente (4.5 - 5.0)</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#D1ECF1' }]} />
            <Text style={styles.legendText}>Muy Bueno (4.0 - 4.49)</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#E2E3E5' }]} />
            <Text style={styles.legendText}>Bueno (3.5 - 3.99)</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFF3CD' }]} />
            <Text style={styles.legendText}>Aceptable (3.0 - 3.49)</Text>
          </View>
          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F8D7DA' }]} />
            <Text style={styles.legendText}>Por Mejorar (0 - 2.99)</Text>
          </View>
        </View>
        
        {/* Professional Signature section */}
        <View style={styles.signatureSection}>
          <View style={styles.signature}>
            <Image src={schoolInfo.firmaUrl} style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Rector(a) Académico</Text>
          </View>
          
          <View style={styles.signature}>
            <View style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Docente Titular</Text>
          </View>
          
          <View style={styles.signature}>
            <View style={styles.signatureImage} />
            <View style={styles.signatureLine}></View>
            <Text style={styles.signatureText}>Docente</Text>
          </View>
        </View>
        
        {/* Enhanced Footer */}
        <View style={styles.footer}>
          <Text>
            Documento generado el {new Date().toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })} a las {new Date().toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            })} | {schoolInfo.name} • {schoolInfo.address} • {schoolInfo.phone}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Enhanced download component with professional button styling
const DownloadStudentReport = ({ students, schoolInfo, courseInfo }) => {
  // Default values for demo purposes
  const defaultSchoolInfo = {
    name: globalInformation.colegioNombre,
    logoUrl: globalInformation.logoColegio,
    firmaUrl: globalInformation.firmaRector,
    address: globalInformation.direccionColegio,
    phone: globalInformation.telefonoColegio,
    email: globalInformation.emailColegio,
  };

  const defaultCourseInfo = {
    grade: students[0]?.materia?.grado?.nombre,
    curso: students[0]?.materia?.nombre,
    teacher: students[0]?.profesor?.nombre,
    academicYear: students[0]?.matricula?.academic_year?.year,
  };

  return (
    <PDFDownloadLink
      document={
        <StudentReport
          students={students}
          schoolInfo={schoolInfo || defaultSchoolInfo}
          courseInfo={courseInfo || defaultCourseInfo}
        />
      }
      fileName="reporte_academico.pdf"
    >
      {({ loading }) => (
        <Tooltip label="Descargar Informe de Calificaciones" placement="auto">
          <IconButton
            icon={<FaFilePdf size={24} />}
            isLoading={loading}
            size="lg"
            colorScheme="red"
            variant="solid"
            borderRadius="md"
            shadow="md"
          />
        </Tooltip>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadStudentReport;