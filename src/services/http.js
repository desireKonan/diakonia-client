import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:9002/',
    headers: {
        "X-DIAKONIA-API-Version": 1,
        "Accept": "application/json",
        "Content-Type": "application/json",
        //"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEZXNpcmUuS09OQU4iLCJpYXQiOjE2OTg1MTY0NjYsImV4cCI6MTY5ODY4OTI2Nn0.1Ily5EwPLV1yQFHtu6vF6egsXqs7QDbRuUIFs2TpoOk"
    }
});


http.interceptors.request.use((config) => {
    return config;
});

export default http;
