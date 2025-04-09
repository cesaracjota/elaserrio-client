import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const name = 'NOTA';

const getAll= async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    };
    const response = await axios.get(`${API_URL}/notas`, config);
    return response.data;
}

const get = async (id) => {
    const response = await axios.get(`${API_URL}/notas/${id}`);
    return response.data;
}

const getAllNotasByMateria = async (materiaId) => {
    const response = await axios.get(`${API_URL}/notas/materia/${materiaId}`);
    return response.data;
}

const getAllNotasByStudent = async (matriculaId, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    };
    const response = await axios.get(`${API_URL}/notas/estudiante/${matriculaId}`, config);
    return response.data;
}

// Get all notas by estudiante id


const obtenerNotasPorMatriculaAndMateria = async (matriculaId, materiaId) => {
    const response = await axios.get(`${API_URL}/notas/${matriculaId}/${materiaId}`);
    return response.data;
}

const create = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/notas`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: `${name} REGISTRADO`, message: `La ${name} se ha creado correctamente`, type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

// Update grado

const update = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/notas/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: `${name} MODIFICADO`, message: `El ${name} ha sido modificada correctamente`, type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

// Delete grado

const deleteNota = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/notas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast(`${name} ELIMINADO`, `El ${name} ha sido eliminada correctamente`, 'success', 1500, 'bottom');
        return response.data;
    }
}

const calificacionService = {
    getAll,
    get,
    getAllNotasByMateria,
    getAllNotasByStudent,
    obtenerNotasPorMatriculaAndMateria,
    create,
    update,
    deleteNota
}

export default calificacionService;