import axios from 'axios';
import { CustomToast } from '../helpers/toast';

const baseURL = process.env.REACT_APP_API_URL;

const getAllUsuarios = async (token, desde, hasta) => {
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
};

// get role docentes

const getAllDocentes = async (token, id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.get(`${baseURL}/usuarios/docentes/${id}`, config);
  return response.data;
};

// Get a specific user

const getUser = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.get(`${baseURL}/usuarios/${id}`, config);
  return response.data.usuario;
};

// Create a new user

const createUser = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.post(`${baseURL}/usuarios`, data, config);
  if (response.status === 200 || response.status === 201) {
    CustomToast({ title: 'USUARIO CREADO', message: 'El usuario se ha creado correctamente', type: 'success', duration: 1500, position: 'top' });
    return response.data.usuario;
  }
};

// Update a user

const updateUser = async (data, token) => {
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
    CustomToast({ title: 'USUARIO MODIFICADO', message: 'El usuario se ha modificado correctamente', type: 'success', duration: 1500, position: 'top' });
    return response.data.usuario;
  }
};

// Delete a user

const deleteUser = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.delete(`${baseURL}/usuarios/${id}`, config);
  if (response.status === 200 || response.status === 201) {
    CustomToast({ title: 'USUARIO ELIMINADO', message: 'El usuario se ha eliminado correctamente', type: 'success', duration: 1500, position: 'top' });
    return response.data.usuario;
  }
};

const usuarioService = {
  getAllUsuarios,
  getUser,
  getAllDocentes,
  createUser,
  updateUser,
  deleteUser,
};

export default usuarioService;
