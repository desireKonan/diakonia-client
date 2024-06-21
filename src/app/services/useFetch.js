import http from "./http";
import { useState, useEffect } from "react";

const useFetch = (url = "", initialData) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async (_url) => {
            try {
                const response = await http.get(_url);
                if(response.status === 200) {
                    setData(response.data);
                }
            } catch(err) {
                var errorData = err.response.data['errorMessage'];
                var errorCode = err.response.data['statusCode'];
                let messageError = '';
                switch(errorCode) {
                    case 404:
                        messageError = `Element non trouvé : ${errorData}`;
                        break;
                    case 401:
                        messageError = `Resource non authorisé : ${errorData}`;
                        break;
                    case 500:
                        messageError = `Erreur côté serveur : ${errorData}`;
                        break;
                }
                console.error(messageError);
                setError(messageError);
            }
            setLoading(false);
        }

        setLoading(true);
        setData(initialData);
        setError("");
        fetchData(url);
    }, []);

    return { data, error, loading };
}

export default useFetch;