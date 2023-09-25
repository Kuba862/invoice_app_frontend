import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options) => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await axios(url, options);
            setResponse(res.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
        };
        fetchData();
    }, []);
    return { response, error, isLoading };
    };

export default useFetch;