import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllEgresos = async (token, desde, hasta) => {
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
    const response = await axios.get(`${API_URL}/egresos`, config);
    return response.data;
}

const getEgreso = async (id) => {
    const response = await axios.get(`${API_URL}/egresos/${id}`);
    return response.data;
}

const createEgreso = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/egresos`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast('EGRESO REGISTRADO', 'El egreso se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data.egreso;
    }
}

const updateEgreso = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/egresos/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast('EGRESO MODIFICADO', 'El egreso ha sido modificada correctamente', 'success', 1500, 'top');
    }
    return response.data;
}

const updateEstadoEgreso = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/egresos/estado/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast('ESTADO ACTUALIZADO', 'Estado del egreso ha sido actualizada', 'success', 1500, 'top');
    }
    return response.data.pago;
}

const deleteEgreso = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/egresos/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast('EGRESO ELIMINADO', 'El egresos se ha eliminado correctamente', 'success', 1500, 'top');
        return response.data;
    }
}

const egresoService = {
    getAllEgresos,
    getEgreso,
    createEgreso,
    updateEgreso,
    deleteEgreso,
    updateEstadoEgreso,
}

export default egresoService;