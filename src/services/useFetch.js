import http from "./http";

const { useState, useEffect } = require("react")

const useFetch = (url = "") => {
    const [loading, setLoading] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('Loading...');
        setData([]);
        setError(null);
        http.get(url)
            .then(res => {
                setLoading(false);
                setData(res.data);

            })
            .catch(error => {
                setLoading(false);
                setError(`Error: ${error}`);
            });
    }, []);

    return { data, error, loading };
}

export default useFetch;