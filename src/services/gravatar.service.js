import axios from "axios";

const baseURL = 'https://api.gravatar.com/v3';

// Generate gravatar
const generateGravatar = async (email) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 8OR(uuX67MlKRrW$KE8onnuCK7w1%KjGKw1FJuEKQXHCeGPAzlJwhtTjcxtUYyTH'
        }
    }
    const response = await axios.get(`${baseURL}/me/profile`, config);
    return response.data;
}

const gravatarService = {
    generateGravatar
}

export default gravatarService;