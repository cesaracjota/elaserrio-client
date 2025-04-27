import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';
// import { CustomToast } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// get reports by query params

const getAllReports = async (token, query) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      params: query,
    };

    const response = await axios.get(`${baseURL}/reportes`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO AÑOS ACADEMICOS',
      message: error.response.data.msg || 'Error al obtener años academicos',
      type: 'error',
      duration: 2000,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 2000);
    }

    throw error;
  }
};

const getAllReportesAdminBySede = async (token, idSede) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      params: {
        sede: idSede,
      },
    };

    const response = await axios.get(`${baseURL}/reportes/admin`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO AÑOS ACADEMICOS',
      message: error.response.data.msg || 'Error al obtener años academicos',
      type: 'error',
      duration: 2000,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 2000);
    }

    throw error;
  }
};

const getAllReportesDocenteTitularBySede = async (token, idSede) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            params: {
                sede: idSede,
            },
        };
    
        const response = await axios.get(`${baseURL}/reportes/docente-titular`, config);
        return response.data;
    } catch (error) {
        console.log(error);
        CustomToast({
            title: 'ERROR OBTENIENDO AÑOS ACADEMICOS',
            message: error.response.data.msg || 'Error al obtener años academicos',
            type: 'error',
            duration: 2000,
            position: 'top',
        });
    
        if (error.response?.status === 401) {
            setTimeout(() => {
                authService.logout();
                window.location.reload();
            }, 2000);
        }
    
        throw error;
    }
};

const getAllReportesDocenteBySede = async (token, idSede) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            params: {
                sede: idSede,
            },
        };
    
        const response = await axios.get(`${baseURL}/reportes/docente`, config);
        return response.data;
    } catch (error) {
        console.log(error);
        CustomToast({
            title: 'ERROR OBTENIENDO AÑOS ACADEMICOS',
            message: error.response.data.msg || 'Error al obtener años academicos',
            type: 'error',
            duration: 2000,
            position: 'top',
        });
    
        if (error.response?.status === 401) {
            setTimeout(() => {
                authService.logout();
                window.location.reload();
            }, 2000);
        }
    
        throw error;
    }
};

// Get reportes modalidad EBR
const getReportesEBR = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseURL}/reportes/reporte_hoy`, config);
  return response.data;
};

const getDataBetweenDates = (desde, hasta, token) => {
  return new Promise(resolve => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      params: {
        desde,
        hasta,
      },
    };

    axios
      .get(`${baseURL}/reportes/reporte_fechas`, config)
      .then(response => {
        setTimeout(() => {
          CustomToast(
            'Reporte generado',
            'Los datos se han generado correctamente',
            'success',
            2500,
            'top'
          );
          resolve(response.data);
        }, 1500);
      })
      .catch(error => {
        // Manejo de errores aquí
        console.error(error);
        resolve(null); // Opcionalmente, puedes rechazar la promesa en caso de error
      });
  });
};

const reporteService = {
  getAllReports,
  getAllReportesAdminBySede,
  getAllReportesDocenteTitularBySede,
  getAllReportesDocenteBySede,
  getReportesEBR,
  getDataBetweenDates,
};

export default reporteService;
