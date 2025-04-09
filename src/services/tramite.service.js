import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllTramites= async (token, desde, hasta) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        params : {
            desde,
            hasta
        }
    };
    const response = await axios.get(`${API_URL}/tramites`, config);
    return response.data;
}

const getTramite = async (id) => {
    const response = await axios.get(`${API_URL}/tramites/${id}`);
    return response.data;
}

const createTramite = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/tramites`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'TRAMITE REGISTRADO', message: 'El tramite se ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data.tramite;
    }
}

const updateTramite = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/tramites/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'TRAMITE MODIFICADO', message: 'El tramite ha sido modificado correctamente', type: 'success', duration: 1500, position: 'top' });
    }
    return response.data;
}

const updateEstadoTramite = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/tramites/estado/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'ESTADO ACTUALIZADO', message: 'Estado del tramite ha sido actualizado', type: 'success', duration: 1500, position: 'top' });
    }
    return response.data.pago;
}

const deleteTramite = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/tramites/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'TRAMITE ELIMINADO', message: 'El tramite ha sido eliminado correctamente', type: 'success', duration: 1500, position: 'top' });
        return response.data;
    }
}

const tramiteService = {
    getAllTramites,
    getTramite,
    createTramite,
    updateTramite,
    deleteTramite,
    updateEstadoTramite,
}

export default tramiteService;