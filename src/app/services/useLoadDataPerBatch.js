import http from "./http";
import { useState, useEffect, useCallback, useMemo } from "react";

const useLoadDataPerBatch = (url, initialData, params = { page: 0, size: 15 }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");
    const [page, setPage] = useState(params.page);
    const [totalCount, setTotalCount] = useState(0);

    const fetchData = useCallback(async (_url) => {
        try {
            setLoading(false);
            const response = await http.get(_url, {
                params: {
                    page: page,
                    size: params.size
                }
            });
            console.log('Response du fetch pour la page ', params.page, ' , donnees: ', response.data);
            if (response.status === 200) {
                setData(response.data.content);
                setTotalCount(response.data.numberOfElements);
                handlePageChange(params.page);
            }
            setError(null);
        } catch (err) {
            var errorData = err.response.data['errorMessage'];
            console.error(errorData);
            setError(errorData);
        } finally {
            setLoading(true);
        }
    });

    const handlePageChange = useCallback(
        (_, newPage) => {
            setPage(newPage);
        },
        []
    );

    useEffect(() => {
        fetchData(url);
    }, [page, url]);

    const memoizedData = useMemo(() => data, [data]);

    return { data: memoizedData, error, loading, page, totalCount, handlePageChange };
}

export default useLoadDataPerBatch;