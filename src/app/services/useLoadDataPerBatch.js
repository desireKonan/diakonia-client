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
            if (response.status === 200) {
                setData(response.data.content);
                setTotalCount(response.data.totalElements);
                handlePageChange(params.page);
                setError(null);
            }
        } catch (err) {
            var errorData = err.response.data['errorMessage'];
            console.error(errorData);
            setError(errorData);
        } finally {
            setLoading(false);
        }
    }, [url, page, rowsPerPage]); 

    useEffect(() => {
        fetchData(url);
    }, [page, rowsPerPage]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        const newRowsPerPage = parseInt(event, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(page);
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