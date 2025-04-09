import axios from "axios";
import { CustomToast } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Send Email

const sendEmail = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }
    const response = await axios.post(`${baseURL}/email/send`, data, config);
    if (response.status === 200 || response.status === 201) {
        CustomToast({ title: 'CORREO ENVIADO', message: 'Se le ha enviado el correo al cliente', type: 'success', duration: 1500, position: 'top' });
        return response.data;
    }
}

const sendEmailService = {
    sendEmail
}

export default sendEmailService;