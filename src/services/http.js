import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:9002/',
    headers: {
        "X-DIAKONIA-API-Version": 1,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});


http.interceptors.request.use((config) => {
    return config;
});

export default http;
