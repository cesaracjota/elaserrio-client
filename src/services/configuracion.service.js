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

const createOrUpdateConfiguracion = async (data, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const response = await axios.put(
    `${API_URL}/configuraciones`,
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
    CustomToast({
      title: `${name} ELIMINADO`,
      message: `El ${name} ha sido eliminada correctamente`,
      type: 'success',
      duration: 1500,
      position: 'bottom',
    });
    return response.data;
  }
};

const configuracionService = {
  getAll,
  createOrUpdateConfiguracion,
  deleteConfiguracion,
};

export default configuracionService;
