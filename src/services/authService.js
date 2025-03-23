import axios from "axios";

const API_URL = 'https://openingteste.mpac.mp.br/api/v1/login';

const login = async ({ email, password }) => {
    try {
        const response = await axios.post(API_URL, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

export { login };
