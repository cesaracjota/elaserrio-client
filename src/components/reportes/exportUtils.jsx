// Archivo: utils/exportUtils.js

// Para exportación
export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      console.error('No hay datos para exportar');
      return;
    }
    
    const csvRows = [];
    // Obtener los encabezados
    const headers = Object.keys(data[0]).filter(header => header !== 'id');
    csvRows.push(headers.join(','));
  
    // Convertir cada fila a CSV
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }
  
    // Crear y descargar el archivo
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${filename}.csv`;
    link.href = url;
    link.click();
  };
  
  // Aquí podrías añadir otras funciones de exportación como Excel o PDF
  export const exportToExcel = (data, filename) => {
    // Implementación pendiente
    console.log('Función de exportación a Excel por implementar');
  };
  
  export const exportToPDF = (data, filename) => {
    // Implementación pendiente
    console.log('Función de exportación a PDF por implementar');
  };