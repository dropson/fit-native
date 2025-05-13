import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from "./env";

const axionsInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: false,
});

axionsInstance.interceptors.request.use(
    async (config) => {

        const token = await SecureStore.getItemAsync('session');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axionsInstance;
