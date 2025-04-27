import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const name = 'MATERIA';

const getAll = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/materias`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATERIAS',
      message: error.response.data.msg || 'Error al obtener materias',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 1000);
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
    const response = await axios.get(`${API_URL}/materias/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATERIA',
      message: error.response.data.msg || 'Error al obtener materia',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 1000);
    }

    throw error;
  }
};

const getMateriasBySede = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/materias/sede/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATERIAS',
      message: error.response.data.msg || 'Error al obtener materias',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 1000);
    }

    throw error;
  }
};

const getMateriasByTeacher = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${API_URL}/materias/docente/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATERIAS',
      message: error.response.data.msg || 'Error al obtener materias',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 1000);
    }

    throw error;
  }
};

const getMateriasByGrado = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/materias/grado/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO MATERIAS',
      message: error.response.data.msg || 'Error al obtener materias',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 1000);
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
    const response = await axios.post(`${API_URL}/materias`, data, config);
    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: `${name} REGISTRADO`,
        message: `El ${name} se ha creado correctamente`,
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR CREANDO MATERIA',
      message: error.response.data.msg || 'Error al crear materia',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const update = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/materias/${data?._id}`,
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
    }
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO MATERIA',
      message: error.response.data.msg || 'Error al modificar materia',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const deleteMateria = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${API_URL}/materias/${id}`, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: `${name} ELIMINADO`,
        message: `El ${name} ha sido eliminado correctamente`,
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO MATERIA',
      message: error.response.data.msg || 'Error al eliminar materia',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const materiaService = {
  getAll,
  get,
  getMateriasBySede,
  getMateriasByTeacher,
  getMateriasByGrado,
  create,
  update,
  deleteMateria,
};

export default materiaService;
