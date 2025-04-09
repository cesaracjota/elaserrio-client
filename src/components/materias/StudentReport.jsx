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

// Enhanced styles for a professional portrait layout with improved header
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 10,
  },

  // Improved Header section with centered elements
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2C3E50',
    paddingBottom: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    marginBottom: 8,
    alignSelf: 'center',
  },
  schoolInfoContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#2C3E50',
    marginBottom: 4,
    textAlign: 'center',
  },
  schoolAddress: {
    fontSize: 9,
    color: '#34495E',
    marginBottom: 3,
    textAlign: 'center',
  },
  schoolContact: {
    fontSize: 9,
    color: '#34495E',
    marginBottom: 6,
    textAlign: 'center',
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: 900,    
    color: '#34495E',
    marginTop: 4,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    width: '90%',
    alignSelf: 'center',
    marginTop: 2,
    marginBottom: 2,
  },

  // Report info section
  reportInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
  },
  reportInfoColumn: {
    width: '50%',
    marginBottom: 5,
  },
  reportInfoLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: '#7F8C8D',
  },
  reportInfoValue: {
    fontSize: 9,
    fontWeight: 400,
    color: '#2C3E50',
  },

  // Table styles
  tableContainer: {
    marginTop: 8,
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 3,
  },
  tableHeader: {
    backgroundColor: '#3498DB',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEDEF',
    minHeight: 20,
  },
  tableRowEven: {
    backgroundColor: '#F8F9F9',
  },
  tableRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  tableCell: {
    padding: 4,
    fontSize: 7,
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableCellBordered: {
    borderRightWidth: 1,
    borderRightColor: '#EBEDEF',
  },
  tableCellHeader: {
    fontWeight: 700,
    color: '#FFFFFF',
  },
  tableHeaderCell: {
    padding: 5,
    fontSize: 7,
    fontWeight: 700,
    textAlign: 'center',
    alignSelf: 'center',
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
    width: '15%',
  },
  cellFinal: {
    width: '20%',
  },

  // Bimester header
  bimesterHeader: {
    backgroundColor: '#2980B9',
    padding: 2,
    fontSize: 6,
    fontWeight: 700,
    color: 'white',
    textAlign: 'center',
  },

  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    fontSize: 7,
    color: '#7F8C8D',
    textAlign: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
  },

  // Legend and signature section
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#BDC3C7',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  legendColor: {
    width: 8,
    height: 8,
    marginRight: 3,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 7,
    color: '#34495E',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
  },
  signature: {
    width: 150,
    textAlign: 'center',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#34495E',
    marginBottom: 3,
  },
  signatureText: {
    fontSize: 7,
    color: '#34495E',
  },
});

// Component for calculating performance indicators
const getPerformanceColor = average => {
  if (average >= 3) return '#27AE60';
  return '#E74C3C'; // Needs Improvement
};

// Component to generate the PDF document
const StudentReport = ({ students, schoolInfo, courseInfo }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Improved Header with School Info and Logo - Now Centered */}
      <View style={styles.headerContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            src={schoolInfo.logoUrl || '/placeholder-logo.png'}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        {/* School Information - Centered */}
        <View style={styles.schoolInfoContainer}>
          <Text style={styles.schoolName}>{schoolInfo.name.toUpperCase()}</Text>
          <Text style={styles.schoolAddress}>{schoolInfo.address}</Text>
          <Text style={styles.schoolContact}>
            📞 {schoolInfo.phone} | ✉️ {schoolInfo.email}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.reportTitle}>📄 REPORTE DE CALIFICACIONES</Text>
        </View>
      </View>

      {/* Course Information */}
      <View style={styles.reportInfoContainer}>
        <View style={styles.reportInfoColumn}>
          <Text style={styles.reportInfoLabel}>GRADO:</Text>
          <Text style={styles.reportInfoValue}>{courseInfo.grade}</Text>
        </View>
        <View style={styles.reportInfoColumn}>
          <Text style={styles.reportInfoLabel}>CURSO:</Text>
          <Text style={styles.reportInfoValue}>{courseInfo.curso}</Text>
        </View>
        <View style={styles.reportInfoColumn}>
          <Text style={styles.reportInfoLabel}>PROFESOR(A):</Text>
          <Text style={styles.reportInfoValue}>{courseInfo.teacher}</Text>
        </View>
        <View style={styles.reportInfoColumn}>
          <Text style={styles.reportInfoLabel}>AÑO LECTIVO:</Text>
          <Text style={styles.reportInfoValue}>{courseInfo.academicYear}</Text>
        </View>
      </View>

      {/* Table */}
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

            {/* Bimester 1 */}
            <View style={[styles.tableHeaderCell, styles.cellBimester]}>
              <Text style={styles.bimesterHeader}>BIM. 1</Text>
              <Text style={styles.tableCellHeader}>PROM</Text>
            </View>

            {/* Bimester 2 */}
            <View style={[styles.tableHeaderCell, styles.cellBimester]}>
              <Text style={styles.bimesterHeader}>BIM. 2</Text>
              <Text style={styles.tableCellHeader}>PROM</Text>
            </View>

            {/* Bimester 3 */}
            <View style={[styles.tableHeaderCell, styles.cellBimester]}>
              <Text style={styles.bimesterHeader}>BIM. 3</Text>
              <Text style={styles.tableCellHeader}>PROM</Text>
            </View>

            {/* Bimester 4 */}
            <View style={[styles.tableHeaderCell, styles.cellBimester]}>
              <Text style={styles.bimesterHeader}>BIM. 4</Text>
              <Text style={styles.tableCellHeader}>PROM</Text>
            </View>

            {/* Final grade */}
            <View style={[styles.tableHeaderCell, styles.cellFinal]}>
              <Text>PROM. FINAL</Text>
            </View>
          </View>

          {/* Student rows */}
          {students.map((student, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                ]}
              >
                {/* Student number */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellNumber,
                    styles.tableCellBordered,
                  ]}
                >
                  <Text>{index + 1}</Text>
                </View>

                {/* Student name */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellName,
                    styles.tableCellBordered,
                    { textAlign: 'left' },
                  ]}
                >
                  <Text>
                    {student.matricula?.estudiante?.apellidos},{' '}
                    {student.matricula?.estudiante?.nombres}
                  </Text>
                </View>

                {/* Bimester 1 */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellBimester,
                    styles.tableCellBordered,
                    {
                      fontWeight: 'bold',
                      color: getPerformanceColor(student?.bimestre1),
                    },
                  ]}
                >
                  <Text>{student?.bimestre1.toFixed(2)}</Text>
                </View>

                {/* Bimester 2 */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellBimester,
                    styles.tableCellBordered,
                    {
                      fontWeight: 'bold',
                      color: getPerformanceColor(student?.bimestre2),
                    },
                  ]}
                >
                  <Text>{student?.bimestre2?.toFixed(2)}</Text>
                </View>

                {/* Bimester 3 */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellBimester,
                    styles.tableCellBordered,
                    {
                      fontWeight: 'bold',
                      color: getPerformanceColor(student?.bimestre3),
                    },
                  ]}
                >
                  <Text>{student?.bimestre3?.toFixed(2)}</Text>
                </View>

                {/* Bimester 4 */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellBimester,
                    styles.tableCellBordered,
                    {
                      fontWeight: 'bold',
                      color: getPerformanceColor(student?.bimestre4),
                    },
                  ]}
                >
                  <Text>{student?.bimestre4?.toFixed(2)}</Text>
                </View>

                {/* Final average */}
                <View
                  style={[
                    styles.tableCell,
                    styles.cellFinal,
                    {
                      fontWeight: 'bold',
                      color: getPerformanceColor(student?.promedio),
                    },
                  ]}
                >
                  <Text>{student?.promedio.toFixed(2)}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Legend for performance indicators */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#27AE60' }]} />
          <Text style={styles.legendText}>Excelente (3 - 5)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#E74C3C' }]} />
          <Text style={styles.legendText}>Necesita Mejorar (0 - 3)</Text>
        </View>
      </View>

      {/* Signature section */}
      <View style={styles.signatureSection}>
        <View style={styles.signature}>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Director(a)</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Profesor(a)</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureLine}></View>
          <Text style={styles.signatureText}>Sello Institucional</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>
          Reporte generado el{' '}
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
      </View>
    </Page>
  </Document>
);

// Enhanced download component with better styling
const DownloadStudentReport = ({ students, schoolInfo, courseInfo }) => {
  // Default values for demo purposes
  const defaultSchoolInfo = {
    name: globalInformation.colegioNombre,
    logoUrl: globalInformation.logoColegio,
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
      }}
    >
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
          <button
            style={{
              padding: '12px 24px',
              backgroundColor: '#3498DB',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Generando PDF...' : 'Descargar Reporte Académico'}
          </button>
        )}
      </PDFDownloadLink>
      <p style={{ fontSize: '12px', color: '#7F8C8D' }}>
        Formato PDF optimizado para impresión vertical
      </p>
    </div>
  );
};

export default DownloadStudentReport;