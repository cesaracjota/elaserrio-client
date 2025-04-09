import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllTiposActivo = async () => {
    const response = await axios.get(`${API_URL}/tipos_activo`);
    return response.data;
}

const getTipoActivo = async (id) => {
    const response = await axios.get(`${API_URL}/tipos_activo/${id}`);
    return response.data;
}

const createTipoActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/tipos_activo`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'CATEGORIA REGISTRADO', message: 'La categoria se ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const updateTipoActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/tipos_activo/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'CATEGORIA MODIFICADO', message: 'La categoria ha sido modificada correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const deleteTipoActivo = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/tipos_activo/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'CATEGORIA ELIMINADO', message: 'La categoria ha sido eliminado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const tipos_activoService = {
    getAllTiposActivo,
    getTipoActivo,
    createTipoActivo,
    updateTipoActivo,
    deleteTipoActivo,
}

export default tipos_activoService;