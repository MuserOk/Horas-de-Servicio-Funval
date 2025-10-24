import axios from "axios";

const api = axios.create({
    baseURL: "https://www.hs-service.api.crealape.com/api/v1",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("hs_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;