import axios from "axios";
import { CustomToast } from "../helpers/toast";
import authService from "./auth.service";
import { apiRequest } from "./axiosHelper.service";

const API_URL = process.env.REACT_APP_API_URL;

const name = 'SEDE';

const successMessage = `Se ha realizado con éxito la operación en ${name}`;
const errorMessage = `Se ha producido un error al realizar la operación en ${name}`;


const getAll = async (token) => {
    return await apiRequest({
        method: 'GET',
        url: `${API_URL}/sedes`,
        token,
        activeToast: false,
        successMessage: null,
        errorMessage
    });
}

const get = async (id, token) => {
    return await apiRequest({
        method: 'GET',
        url: `${API_URL}/sedes/${id}`,
        token,
        activeToast: false,
        successMessage,
        errorMessage
    });
}
const create = async (data, token) => {
    return await apiRequest({
        method: 'POST',
        url: `${API_URL}/sedes`,
        data,
        activeToast: true,
        token,
        successMessage,
        errorMessage
    });
}

// Update grado

const update = async (data, token) => {
    return await apiRequest({
        method: 'PUT',
        url: `${API_URL}/sedes/${data._id}`,
        data,
        activeToast: true,
        token,
        successMessage,
        errorMessage
    });
}

// Delete grado

const deleteSede = async (id, token) => {
    return await apiRequest({
        method: 'DELETE',
        url: `${API_URL}/sedes/${id}`,
        activeToast: true,
        token,
        successMessage,
        errorMessage
    });
}

const sedeService = {
    getAll,
    get,
    create,
    update,
    deleteSede
}

export default sedeService;