import http from "./http";

const { useState, useEffect } = require("react")

const useFetch = (url = "", initialData) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");

    const fetchData = async(url) => {
        try {
            var response = await http.get(url);
            if(response.status === 200) {
                setData(response.data);
            }
        } catch(err) {
            setError(`Error: ${error}`);
        }
    }

    useEffect(() => {
        setLoading(true);
        setData(initialData);
        setError("");
        fetchData(url);
        setLoading(false);
    }, []);

    return { data, error, loading };
}

export default useFetch;