import { useState } from "react";
import { toast } from "sonner";

// it will take a  callback function as a parameter and it will return data, loading, error, and a function to call the api

const useFecth = (callBack) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null)
        try {
            const response = await callBack(...args)
            setData(response)
            setError(null)
        } catch (error) {
            setError(error)
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { data, loading, error, fn, setData }

}

export default useFecth;