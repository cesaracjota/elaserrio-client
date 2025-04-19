import axios from "axios";
import { CustomToast } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        CustomToast({ title: 'BIENVENIDO(A)', message: 'Se ha registraado correctamente.', type: 'success', duration: 3000, position: 'bottom-right' });
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            // CustomToast({ title: 'BIENVENIDO(A)', message: 'Bienvenido(a) a la plataforma.', type: 'success', duration: 3000, position: 'bottom-right' });
            return response.data;
        }
    
}

// updated my profile
const updateProfile = async (userData, token) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }

    const response = await axios.put(`${baseURL}/auth/update/${userData._id}`, userData, config);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        CustomToast('Perfil actualizado', 'Los datos se han actualizado correctamente', 'success', 2500);
        return response.data;
    }
}

// reset password

const forgotPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/forgot-password`, data);
    if(response.data.ok === true) {
        CustomToast({ title: 'CORREO ENVIADO', message: 'Se ha enviado un correo electrónico.', type: 'success', duration: 2500, position: 'bottom' });
    }
    return response.data;
}

// reset password
const resetPassword = async (data) => {
    const response = await axios.post(`${baseURL}/auth/reset-password`, data);
    if(response.data.ok === true){
        CustomToast({ title: 'CONTRASEÑA ACTUALIZADA', message: 'La contraseña se ha actualizado correctamente.', type: 'success', duration: 2500, position: 'top' });
    }
    return response.data;
}

// Logout user
const logout = () => {
    CustomToast({ title: 'FINALIZANDO SESIÓN ...', message: 'HASTA PRONTO!', type: 'loading', duration: 2000, position: 'top' });
    localStorage.removeItem("user");
    localStorage.removeItem("sedeSeleccionada");
}

const authService = {
    register,
    login,
    updateProfile,
    logout,
    forgotPassword,
    resetPassword
}

export default authService;