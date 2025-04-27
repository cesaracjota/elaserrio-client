import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const getAllMatriculas = async (token, desde, hasta, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      params: {
        desde,
        hasta,
        id,
      },
    };
    const response = await axios.get(`${API_URL}/matriculas`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATRICULAS',
      message: error.response.data.msg || 'Error al obtener matriculas',
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

const getAllMatriculasByGrado = async (token, gradoId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/matriculas/grado/${gradoId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATRICULAS POR GRADO',
      message:
        error.response.data.msg || 'Error al obtener matriculas por grado',
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

// get matricula por curso

const getAllMatriculasByCurso = async (token, cursoId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/matriculas/materia/${cursoId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATRICULAS POR CURSO',
      message:
        error.response.data.msg || 'Error al obtener matriculas por curso',
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

const getMatricula = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/matriculas/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATRICULA',
      message: error.response.data.msg || 'Error al obtener matricula',
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

const createMatricula = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.post(`${API_URL}/matriculas`, data, config);
    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: 'ESTUDIANTE MATRICULADO CORRECTAMENTE',
        message: 'La matricula se ha registrado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data.matricula;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR REGISTRANDO MATRICULA',
      message: error.response.data.msg || 'Error al registrar matricula',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const updateMatricula = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await axios.put(
      `${API_URL}/matriculas/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'MATRICULA MODIFICADA',
        message: 'La matricula ha sido modificada correctamente',
        type: 'success',
        duration: 1500,
        position: 'top',
      });
    }
    return response.data.matricula;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO MATRICULA',
      message: error.response.data.msg || 'Error al modificar matricula',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const updatedPromedioRankingPorGrado = async (idGrado, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${API_URL}/matriculas/actualizarpromedioranking/${idGrado}`,
    {},
    config
  );
  if (response.status === 200 || response.status === 201) {
    CustomToast({
      title: 'PROMEDIOS Y RANKING ACTUALIZADOS',
      message: 'Los promedios y ranking han sido actualizados correctamente',
      type: 'success',
      duration: 1500,
      position: 'top',
    });
  }
};

const deleteMatricula = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.delete(`${API_URL}/matriculas/${id}`, config);
  if (response.status === 200 || response.status === 201) {
    CustomToast({
      title: 'MATRICULA ELIMINADA',
      message: 'La matricula ha sido eliminada correctamente',
      type: 'success',
      duration: 1500,
      position: 'bottom',
    });
    return response.data.matricula;
  }
};

const matriculaService = {
  getAllMatriculas,
  getMatricula,
  getAllMatriculasByGrado,
  getAllMatriculasByCurso,
  createMatricula,
  updateMatricula,
  updatedPromedioRankingPorGrado,
  deleteMatricula,
};

export default matriculaService;
