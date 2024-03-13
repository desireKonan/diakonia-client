import http from "./http";

const { useState, useEffect } = require("react")

const useFetch = (url = "") => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setData([]);
        setError("");
        http.get(url)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                setError(`Error: ${error}`);
            });
        setLoading(false);
    }, []);

    return { data, error, loading };
}

export default useFetch;