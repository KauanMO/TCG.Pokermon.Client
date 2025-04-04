import { baseUrl, getUserId } from "./config";
import axios from "axios";

const defaultUrl = `${baseUrl}/users`;

const login = async (loginFormData) => {
    const response = await axios.post(`${defaultUrl}/login`,
        loginFormData
    );

    if (response.status == 200) return response.data;

    console.warn(response);
}

const getUserInfo = async () => {
    const response = await axios.get(`${defaultUrl}/${getUserId()}`);

    if (response.status == 200) return response.data

    console.warn(response);
}

export {
    login,
    getUserInfo
}