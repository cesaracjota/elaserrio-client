import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const getAllAcademicYear = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/academic_year`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO AÑOS ACADEMICOS',
      message: error.response.data.msg || 'Error al obtener años academicos',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 3000);
    }

    throw error;
  }
};

const getAcademicYear = async id => {
  try {
    const response = await axios.get(`${API_URL}/academic_year/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO AÑO ACADEMICO',
      message: error.response.data.msg || 'Error al obtener el año academico',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const getActiveAcademicYear = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/academic_year/active`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO AÑO ACADEMICO ACTIVO',
      message:
        error.response.data.msg || 'Error al obtener el año academico activo',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const createAcademicYear = async (data, token) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json', Authorization: token },
    };

    const response = await axios.post(`${API_URL}/academic_year`, data, config);

    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: 'AÑO ACADÉMICO CREADO',
        message: 'El año académico se ha creado correctamente.',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
    }
    return response.data;
  } catch (error) {
    const msg =
      error?.response?.data?.msg ||
      'Ocurrió un error al crear el año académico.';

    CustomToast({
      title: 'ERROR AL CREAR AÑO ACADÉMICO',
      message: msg,
      type: 'error',
      duration: 2000,
      position: 'top',
    });
    throw error;
  }
};

const updateAcademicYear = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/academic_year/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'AÑO ACADEMICO MODIFICADO',
        message: 'El año academico ha sido modificado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO AÑO ACADEMICO',
      message: error.response.data.msg || 'Error al modificar el año academico',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const deleteAcademicYear = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(
      `${API_URL}/academic_year/${id}`,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'AÑO ACADEMICO ELIMINADO',
        message: 'El año academico ha sido eliminado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO AÑO ACADEMICO',
      message: error.response.data.msg || 'Error al eliminar el año academico',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const activoService = {
  getAllAcademicYear,
  getAcademicYear,
  getActiveAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};

export default activoService;
