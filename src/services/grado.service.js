import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const getAllGrados = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/grados`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO GRADOS',
      message: error.response.data.msg || 'Error al obtener grados',
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

const getGrado = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/grados/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO GRADO',
      message: error.response.data.msg || 'Error al obtener grado',
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

const getGradosBySede = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/grados/sede/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO GRADOS',
      message: error.response.data.msg || 'Error al obtener grados',
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

const getGradosByDocente = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/grados/docente/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO GRADOS',
      message: error.response.data.msg || 'Error al obtener grados',
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

// Create grado

const createGrado = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.post(`${API_URL}/grados`, data, config);
    if (response.status === 201 || response.status === 200) {
      CustomToast({
        title: 'GRADO REGISTRADO',
        message: 'El grado se ha creado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR CREANDO GRADO',
      message: error.response.data.msg || 'Error al crear grado',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

// Update grado

const updateGrado = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${API_URL}/grados/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'GRADO MODIFICADO',
        message: 'El grado ha sido modificada correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO GRADO',
      message: error.response.data.msg || 'Error al modificar grado',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

// Delete grado

const deleteGrado = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${API_URL}/grados/${id}`, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'GRADO ELIMINADO',
        message: 'El grado ha sido eliminado correctamente',
        type: 'success',
        duration: 1500,
        position: 'bottom',
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO GRADO',
      message: error.response.data.msg || 'Error al eliminar grado',
      type: 'error',
      duration: 1500,
      position: 'top',
    });

    throw error;
  }
};

const gradoService = {
  getAllGrados,
  getGrado,
  getGradosBySede,
  getGradosByDocente,
  createGrado,
  updateGrado,
  deleteGrado,
};

export default gradoService;
