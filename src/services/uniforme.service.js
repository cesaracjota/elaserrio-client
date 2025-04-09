import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllUniformes = async () => {
    const response = await axios.get(`${API_URL}/uniformes`);
    return response.data;
}

const getUniforme = async (id) => {
    const response = await axios.get(`${API_URL}/uniformes/${id}`);
    return response.data;
}

const createUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/uniformes`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'ARTICULO REGISTRADO', message: 'El articulo se ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const updateUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/uniformes/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'ARTICULO MODIFICADO', message: 'El articulo ha sido modificado correctamente', type: 'success', duration: 1500, position: 'top' });
        return response.data;
    }
}

const deleteUniforme = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/uniformes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'ARTICULO ELIMINADO', message: 'El articulo ha sido eliminado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const uniformeService = {
    getAllUniformes,
    getUniforme,
    createUniforme,
    updateUniforme,
    deleteUniforme,
}

export default uniformeService;