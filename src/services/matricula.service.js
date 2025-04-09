import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllMatriculas = async (token, desde, hasta, id) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
        params : {
            desde,
            hasta,
            id
        }
    };
    const response = await axios.get(`${API_URL}/matriculas`, config);
    return response.data;
}

const getAllMatriculasByGrado = async (token, gradoId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        }
    };
    const response = await axios.get(`${API_URL}/matriculas/grado/${gradoId}`, config);
    return response.data;
}

// get matricula por curso

const getAllMatriculasByCurso = async (token, cursoId) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    };
    const response = await axios.get(`${API_URL}/matriculas/materia/${cursoId}`, config);
    return response.data;
}


const getMatricula = async (id) => {
    const response = await axios.get(`${API_URL}/matriculas/${id}`);
    return response.data;
}

const createMatricula = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/matriculas`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'ESTUDIANTE MATRICULADO CORRECTAMENTE', message: 'La matricula se ha registrado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data.matricula;
    }
}

const updateMatricula = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/matriculas/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'MATRICULA MODIFICADA', message: 'La matricula ha sido modificada correctamente', type: 'success', duration: 1500, position: 'top' });
    }
    return response.data.matricula;
}

const deleteMatricula = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/matriculas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'MATRICULA ELIMINADA', message: 'La matricula ha sido eliminada correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data.matricula;
    }
}

const pagoService = {
    getAllMatriculas,
    getMatricula,
    getAllMatriculasByGrado,
    getAllMatriculasByCurso,
    createMatricula,
    updateMatricula,
    deleteMatricula,
}

export default pagoService;