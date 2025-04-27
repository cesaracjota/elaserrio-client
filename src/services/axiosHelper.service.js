// src/helpers/axiosHelper.js
import axios from "axios";
import { CustomToast } from "../helpers/toast";
import authService from "../services/auth.service";

export const apiRequest = async ({ method, url, data = null, token = null, activeToast = false, successMessage = null, errorMessage = null }) => {
    try {
        const config = {
            method,
            url,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': token })
            },
            ...(data && { data })
        };

        const response = await axios(config);
        if (response.status === 201 || response.status === 200) {
            if (activeToast) {
                CustomToast({
                    title: 'SUCCESS',
                    message : successMessage || 'Operación realizada correctamente',
                    type: 'success',
                    duration: 1500,
                    position: 'bottom'
                });
            }
            return response.data;
        }

    } catch (error) {
        console.error(error);

        const message = error?.response?.data?.msg || "Ocurrió un error inesperado";
        CustomToast({
            title: 'ERROR',
            message : message || errorMessage || 'Error al realizar la operación',
            type: 'error',
            duration: 1500,
            position: 'bottom'
        });

        if (error.response?.status === 401) {
            setTimeout(() => {
                authService.logout();
                window.location.reload();
            }, 2000);
        }

        throw error;
    }
};
