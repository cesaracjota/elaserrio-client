import axios from 'axios';
import { CustomToast } from '../helpers/toast';

const API_URL = process.env.REACT_APP_API_URL;

const name = 'CONFIGURACION';

const getAll = async token => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.get(`${API_URL}/configuraciones`, config);
  return response.data;
};

const get = async id => {
  const response = await axios.get(`${API_URL}/configuraciones/${id}`);
  return response.data;
};

const create = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.post(`${API_URL}/configuraciones`, data, config);
  if (response.status === 201 || response.status === 200) {
    CustomToast({
      title: `${name} CREADO`,
      description: `El ${name} ha sido creado correctamente`,
      status: 'success',
      duration: 1500,
      isClosable: true,
      position: 'bottom',
    });
    return response.data;
  }
};

// Update grado

const update = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${API_URL}/configuraciones/${data._id}`,
    data,
    config
  );
  if (response.status === 200 || response.status === 201) {
    CustomToast(
      `${name} MODIFICADO`,
      `El ${name} ha sido modificada correctamente`,
      'success',
      1500,
      'bottom'
    );
  }
  return response.data;
};

// Delete grado

const deleteConfiguracion = async (id, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.delete(
    `${API_URL}/configuraciones/${id}`,
    config
  );
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
};

const configuracionService = {
  getAll,
  get,
  create,
  update,
  deleteConfiguracion,
};

export default configuracionService;
