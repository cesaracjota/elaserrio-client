import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Get libro

const getAllGrados = async () => {
    const response = await axios.get(`${API_URL}/grados`);
    return response.data;
}

const getGrado = async (id) => {
    const response = await axios.get(`${API_URL}/grados/${id}`);
    return response.data;
}

const getGradosBySede = async (id) => {
    const response = await axios.get(`${API_URL}/grados/sede/${id}`);
    return response.data;
}

const getGradosByDocente = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.get(`${API_URL}/grados/docente/${id}`, config);
    return response.data;
}

// Create grado

const createGrado = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/grados`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'GRADO REGISTRADO', message: 'El grado se ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

// Update grado

const updateGrado = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/grados/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'GRADO MODIFICADO', message: 'El grado ha sido modificada correctamente', type: 'success', duration: 1500, position: 'bottom' });
    }
    return response.data;
}

// Delete grado

const deleteGrado = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/grados/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'GRADO ELIMINADO', message: 'El grado ha sido eliminado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const gradoService = {
    getAllGrados,
    getGrado,
    getGradosBySede,
    getGradosByDocente,
    createGrado,
    updateGrado,
    deleteGrado,
}

export default gradoService;