import axios from 'axios';
import { CustomToast } from '../helpers/toast';
import authService from './auth.service';

const API_URL = process.env.REACT_APP_API_URL;

const name = 'ACCESO';

const getAllAccesos = async token => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.get(`${API_URL}/accesos`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    CustomToast({
      title: `${name} OBTENIDO`,
      message: `El ${name} ha sido obtenido incorrectamente`,
      type: 'error',
      duration: 1500,
      position: 'bottom',
    });
    if (error.response?.status === 401) {
      setTimeout(() => {
        authService.logout();
        window.location.reload();
      }, 2000);
    }
  }
};

const deleteAcceso = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios.delete(`${API_URL}/accesos/${id}`, config);
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
  } catch (error) {
    console.log(error);
    CustomToast({
      title: `${name} ELIMINADO`,
      message: `El ${name} ha sido eliminado incorrectamente`,
      type: 'error',
      duration: 1500,
      position: 'bottom',
    });
  }
};

const accesoService = {
  getAllAccesos,
  deleteAcceso,
};

export default accesoService;
