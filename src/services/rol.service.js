import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const name = 'ROL';

const getAllRoles = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
        },
    };
    const response = await axios.get(`${API_URL}/roles`, config);
    return response.data;
}

const getRol = async (id) => {
    const response = await axios.get(`${API_URL}/roles/${id}`);
    return response.data;
}

const createRol = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/roles`, data, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast(`${name} REGISTRADO`, `El ${name} se ha creado correctamente`, 'success', 1500, 'bottom');
        return response.data;
    }
}

// Update grado

const updateRol = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/roles/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast(`${name} MODIFICADO`, `El ${name} ha sido modificada correctamente`, 'success', 1500, 'bottom');
    }
    return response.data;
}

// Delete grado

const deleteRol = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/roles/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast(`${name} ELIMINADO`, `El ${name} ha sido eliminada correctamente`, 'success', 1500, 'bottom');

        return response.data;
    }
}

const rolService = {
    getAllRoles,
    getRol,
    createRol,
    updateRol,
    deleteRol
}

export default rolService;