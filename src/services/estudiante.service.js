import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllEstudiantes = async (page, perPage, id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            page,
            perPage,
            id
        }

    }
    const response = await axios.get(`${API_URL}/estudiantes`, config);
    return response.data.estudiantes;
}

const getEstudiante = async (id) => {
    const response = await axios.get(`${API_URL}/estudiantes/${id}`);
    return response.data.estudiante;
}

const getEstudianteByDni = async (dni) => {
    const response = await axios.get(`${API_URL}/estudiantes/dni/${dni}`);
    return response.data;
}

const getEstudianteSearch = async (search, idSede) => {
    if (!search) {
        return [];
    }
    const config = {
        params: {
            search: search,
            idSede: idSede
        }
    }
    const response = await axios.get(`${API_URL}/estudiantes/buscar/estudiantes`, config);

    return response.data;
}

const getStudentsByGrade = async (id) => {
    const response = await axios.get(`${API_URL}/estudiantes/grado/${id}`);
    return response.data;
}

const createEstudiante = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/estudiantes`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'ESTUDIANTE REGISTRADO', message: 'El estudiante ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const updateEstudiante = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/estudiantes/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'ESTUDIANTE MODIFICADO', message: 'El estudiante ha sido modificada correctamente', type: 'success', duration: 1500, position: 'bottom' });
    }
    return response.data;
}

const deleteEstudiante = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/estudiantes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'ESTUDIANTE ELIMINADO', message: 'El estudiante ha sido eliminado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data.estudiante;
    }
}

const estudianteService = {
    getAllEstudiantes,
    getEstudiante,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
    getEstudianteByDni,
    getEstudianteSearch,
    getStudentsByGrade
}

export default estudianteService;