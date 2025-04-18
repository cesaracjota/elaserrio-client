import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const name = 'MATERIA';

const getAll= async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    };
    const response = await axios.get(`${API_URL}/materias`, config);
    return response.data;
}

const get = async (id) => {
    const response = await axios.get(`${API_URL}/materias/${id}`);
    return response.data;
}

const getMateriasBySede = async (id) => {
    const response = await axios.get(`${API_URL}/materias/sede/${id}`);
    return response.data;
}

const getMateriasByTeacher = async (id) => {
    const response = await axios.get(`${API_URL}/materias/docente/${id}`);
    return response.data;
}

const getMateriasByGrado = async (id) => {
    const response = await axios.get(`${API_URL}/materias/grado/${id}`);
    return response.data;
}

const create = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/materias`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: `${name} REGISTRADO`, message: `El ${name} se ha creado correctamente`, type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const update = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/materias/${data?._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: `${name} MODIFICADO`, message: `El ${name} ha sido modificada correctamente`, type: 'success', duration: 1500, position: 'bottom' });
    }
    return response.data;
}

const deleteMateria = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/materias/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: `${name} ELIMINADO`, message: `El ${name} ha sido eliminado correctamente`, type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const materiaService = {
    getAll,
    get,
    getMateriasBySede,
    getMateriasByTeacher,
    getMateriasByGrado,
    create,
    update,
    deleteMateria,
}

export default materiaService;