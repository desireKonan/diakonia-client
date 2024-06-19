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
                console.log(err);
                setError(errorData);
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