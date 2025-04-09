import axios from "axios";
import { CustomToast } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Get category

const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
}

const getCategory = async (id) => {
    const response = await axios.get(`${API_URL}/categorias/${id}`);
    return response.data;
}

// Create category

const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.post(`${API_URL}/categorias`, categoryData, config);
    if (response.status === 201 || response.status === 200) {
        CustomToast({ title: 'CATEGORIA CREADA', message: 'La categoria se ha creado correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

// Update category

const updateCategory = async (categoryData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    const response = await axios.put(`${API_URL}/categorias/${categoryData._id}`, categoryData, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'CATEGORIA MODIFICADA', message: 'La categoria ha sido modificada correctamente', type: 'success', duration: 1500, position: 'bottom' });
    }
    return response.data;
}

// Delete category

const deleteCategory = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };
    const response = await axios.delete(`${API_URL}/categorias/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'CATEGORIA ELIMINADA', message: 'La categoria ha sido eliminada correctamente', type: 'success', duration: 1500, position: 'bottom' });
        return response.data;
    }
}

const categoryService = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

export default categoryService;