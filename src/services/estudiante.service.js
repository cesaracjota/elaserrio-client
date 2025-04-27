import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const getAllEstudiantes = async (page, perPage, id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      params: {
        page,
        perPage,
        id,
      },
    };
    const response = await axios.get(`${API_URL}/estudiantes`, config);
    return response.data.estudiantes;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO ESTUDIANTES',
      message: error.response.data.msg || 'Error al obtener estudiantes',
      type: 'error',
      duration: 1500,
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

const getEstudiante = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/estudiantes/${id}`, config);
    return response.data.estudiante;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO ESTUDIANTE',
      message: error.response.data.msg || 'Error al obtener estudiante',
      type: 'error',
      duration: 1500,
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

const getEstudianteByDni = async (dni, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  const response = await axios.get(`${API_URL}/estudiantes/dni/${dni}`, config);
  return response.data;
};

const getEstudianteSearch = async (search, idSede, token) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            params: {
                search: search,
                idSede: idSede
            }
        }
        const response = await axios.get(`${API_URL}/estudiantes/buscar/estudiantes`, config);
        return response.data;
    } catch (error) {
        console.log(error);
        CustomToast({
            title: 'ERROR OBTENIENDO ESTUDIANTES',
            message: error.response.data.msg || 'Error al obtener estudiantes',
            type: 'error',
            duration: 1500,
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
}

const getStudentsByGrade = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/estudiantes/grade/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO ESTUDIANTES POR GRADO',
      message:
        error.response.data.msg || 'Error al obtener estudiantes por grado',
      type: 'error',
      duration: 1500,
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

const createEstudiante = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.post(`${API_URL}/estudiantes`, data, config);
    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: 'ESTUDIANTE REGISTRADO',
        message: 'El estudiante ha creado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR CREANDO ESTUDIANTE',
      message: error.response.data.msg || 'Error al crear estudiante',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const updateEstudiante = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/estudiantes/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'ESTUDIANTE MODIFICADO',
        message: 'El estudiante ha sido modificada correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO ESTUDIANTE',
      message: error.response.data.msg || 'Error al modificar estudiante',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const deleteEstudiante = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${API_URL}/estudiantes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'ESTUDIANTE ELIMINADO',
        message: 'El estudiante ha sido eliminado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data.estudiante;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO ESTUDIANTE',
      message: error.response.data.msg || 'Error al eliminar estudiante',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const estudianteService = {
  getAllEstudiantes,
  getEstudiante,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
  getEstudianteByDni,
  getEstudianteSearch,
  getStudentsByGrade,
};

export default estudianteService;
