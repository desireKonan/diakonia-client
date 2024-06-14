import axios from "axios";

const http = axios.create({
    baseURL: process.env.REACT_APP_DIAKONIA_URL,
    headers: {
        "X-DIAKONIA-API-Version": 1,
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});


http.interceptors.request.use(
    (response) => {
        const token = localStorage.getItem('token');
        if(token) {
            response.headers["Authorization"] = `Bearer ${token}`;
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default http;
