import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const name = 'NOTA';

const getAll = async (token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/notas`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO NOTAS',
      message: error.response.data.msg || 'Error al obtener notas',
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

const get = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/notas/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO NOTA',
      message: error.response.data.msg || 'Error al obtener nota',
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

const getAllNotasByMateria = async (materiaId, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/notas/materia/${materiaId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO NOTAS POR MATERIA',
      message: error.response.data.msg || 'Error al obtener notas por materia',
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

const getAllNotasByStudent = async (matriculaId, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/notas/estudiante/${matriculaId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO NOTAS POR ESTUDIANTE',
      message:
        error.response.data.msg || 'Error al obtener notas por estudiante',
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

// Get all notas by estudiante id

const obtenerNotasPorMatriculaAndMateria = async (
  matriculaId,
  materiaId,
  token
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/notas/${matriculaId}/${materiaId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO NOTAS POR ESTUDIANTE Y MATERIA',
      message:
        error.response.data.msg ||
        'Error al obtener notas por estudiante y materia',
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

const create = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(`${API_URL}/notas`, data, config);
    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: `${name} REGISTRADO`,
        message: `La ${name} se ha creado correctamente`,
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR CREANDO NOTA',
      message: error.response.data.msg || 'Error al crear nota',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

// actualizar el ranking estudiantes de una materia
const actualizarRankingPorMateria = async (idMateria, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/notas/ranking/${idMateria}`,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: `RANKING ACTUALIZADO`,
        message: `El ranking de estudiantes ha sido actualizada correctamente`,
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ACTUALIZANDO RANKING',
      message: error.response.data.msg || 'Error al actualizar ranking',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

// Update nota
const update = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/notas/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: `${name} MODIFICADO`,
        message: `El ${name} ha sido modificada correctamente`,
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO NOTA',
      message: error.response.data.msg || 'Error al modificar nota',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

// Delete grado

const deleteNota = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${API_URL}/notas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast(
        `${name} ELIMINADO`,
        `El ${name} ha sido eliminada correctamente`,
        'success',
        1500,
        'bottom'
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO NOTA',
      message: error.response.data.msg || 'Error al eliminar nota',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const calificacionService = {
  getAll,
  get,
  getAllNotasByMateria,
  getAllNotasByStudent,
  obtenerNotasPorMatriculaAndMateria,
  create,
  actualizarRankingPorMateria,
  update,
  deleteNota,
};

export default calificacionService;
