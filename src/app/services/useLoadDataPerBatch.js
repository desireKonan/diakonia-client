import http from "./http";
import { useState, useEffect, useCallback } from "react";

const useLoadDataPerBatch = (url, params = { page: 0, size: 15 }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(params.page);
    const [rowsPerPage, setRowsPerPage] = useState(params.size);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = useCallback(async (_url) => {
        try {
            setLoading(true);
            const response = await http.get(_url, {
                params: {
                    page: page,
                    size: rowsPerPage
                }
            });
            console.log('Response du fetch pour la page ', params.page, ' , donnees: ', response.data, 'Reponses ', response.status);
            if (response.status === 200) {
                setData(response.data.content);
                setTotalCount(response.data.totalElements);
                handlePageChange(params.page);
                console.log(response.data.content, response.data.totalElements, params.page);
                setError(null);
            }
        } catch (err) {
            var errorData = err.response.data['errorMessage'];
            console.error(errorData);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage]); 

    useEffect(() => {
        fetchData(url);
    }, [page, rowsPerPage]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    return {
        data,
        error,
        loading,
        page,
        totalCount,
        rowsPerPage,
        handlePageChange,
        handleRowsPerPageChange,
    };
}

export default useLoadDataPerBatch;