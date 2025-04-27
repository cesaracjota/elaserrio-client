// src/services/auth.service.js

import axios from "axios";
import { CustomToast } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        CustomToast({
            title: 'BIENVENIDO(A)',
            message: 'Se ha registrado correctamente.',
            type: 'success',
            duration: 3000,
            position: 'bottom-right'
        });
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(`${baseURL}/login`, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        // Puedes activar este toast si quieres
        CustomToast({ title: 'Bienvenido(a)', message: 'Bienvenido a la plataforma.', type: 'success', duration: 3000, position: 'bottom-right' });
    }
    return response.data;
};

const updateProfile = async (userData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // aquí nos aseguramos de mandar el token
        }
    };

    const response = await axios.put(`${baseURL}/auth/update/${userData._id}`, userData, config);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        CustomToast({
            title: 'Perfil actualizado',
            message: 'Los datos se han actualizado correctamente.',
            type: 'success',
            duration: 2500,
            position: 'bottom-right'
        });
    }
    return response.data;
};

const forgotPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/forgot-password`, data);
    if (response.data?.ok) {
        CustomToast({
            title: 'CORREO ENVIADO',
            message: 'Se ha enviado un correo electrónico.',
            type: 'success',
            duration: 2500,
            position: 'bottom'
        });
    }
    return response.data;
};

const resetPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/reset-password`, data);
    if (response.data?.ok) {
        CustomToast({
            title: 'CONTRASEÑA ACTUALIZADA',
            message: 'La contraseña se ha actualizado correctamente.',
            type: 'success',
            duration: 2500,
            position: 'top'
        });
    }
    return response.data;
};

const logout = () => {
    CustomToast({
        title: 'FINALIZANDO SESIÓN...',
        message: '¡Hasta pronto!',
        type: 'loading',
        duration: 2000,
        position: 'top'
    });
    localStorage.removeItem('user');
    localStorage.removeItem('sedeSeleccionada');
};

const authService = {
    register,
    login,
    updateProfile,
    forgotPassword,
    resetPassword,
    logout
};

export default authService;