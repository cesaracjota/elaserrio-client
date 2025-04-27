import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const baseURL = process.env.REACT_APP_API_URL;

const getAllUsuarios = async (token, desde, hasta) => {
  try {
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
    const response = await axios.get(`${baseURL}/usuarios`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO USUARIOS',
      message: error.response.data.msg || 'Error al obtener usuarios',
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

// get role docentes

const getAllDocentes = async (token, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${baseURL}/usuarios/docentes/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO USUARIOS',
      message: error.response.data.msg || 'Error al obtener usuarios',
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

// get role docente titular

const getAllDocenteTitular = async (token, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(
      `${baseURL}/usuarios/docente_titular/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO DOCENTES',
      message: error.response.data.msg || 'Error al obtener usuarios',
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

// Get a specific user

const getUser = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${baseURL}/usuarios/${id}`, config);
    return response.data.usuario;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR OBTENIENDO USUARIO',
      message: error.response.data.msg || 'Error al obtener usuarios',
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

// Create a new user

const createUser = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.post(`${baseURL}/usuarios`, data, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'USUARIO CREADO',
        message: 'El usuario se ha creado correctamente',
        type: 'success',
        duration: 1500,
        position: 'top',
      });
      return response.data.usuario;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR CREANDO USUARIO',
      message: error.response.data.msg || 'Error al crear usuario',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

// Update a user

const updateUser = async (data, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.put(
      `${baseURL}/usuarios/${data._id}`,
      data,
      config
    );
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'USUARIO MODIFICADO',
        message: 'El usuario se ha modificado correctamente',
        type: 'success',
        duration: 1500,
        position: 'top',
      });
      return response.data.usuario;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR MODIFICANDO USUARIO',
      message: error.response.data.msg || 'Error al modificar usuario',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

// Delete a user

const deleteUser = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${baseURL}/usuarios/${id}`, config);
    if (response.status === 200 || response.status === 201) {
      CustomToast({
        title: 'USUARIO ELIMINADO',
        message: 'El usuario se ha eliminado correctamente',
        type: 'success',
        duration: 1500,
        position: 'top',
      });
      return response.data.usuario;
    }
  } catch (error) {
    console.log(error);
    CustomToast({
      title: 'ERROR ELIMINANDO USUARIO',
      message: error.response.data.msg || 'Error al eliminar usuario',
      type: 'error',
      duration: 1500,
      position: 'top',
    });
    throw error;
  }
};

const usuarioService = {
  getAllUsuarios,
  getUser,
  getAllDocentes,
  getAllDocenteTitular,
  createUser,
  updateUser,
  deleteUser,
};

export default usuarioService;
