import http from "./http";

const { useState, useEffect } = require("react")

const useFetch = (url = "", initialData) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async (_url) => {
            try {
                const response = await http.get(_url);
                if(response.status === 200) {
                    console.log(response.data);
                    setData(response.data);
                }
            } catch(err) {
                setError(`Error: ${error}`);
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