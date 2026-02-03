import { useState, useEffect } from "react";
import { useSystem } from '../Context/SystemContext.jsx'

export const useMacroData = () => {
    const [macro, setMacro] = useState(null);
    const [loading, setLoading] = useState({
        message: '',
        status: true
    })
    const { dispatch } = useSystem()

    useEffect(() => {
        const fetchMacro = async () => {
            try {
                const response = await fetch('https://api.alternative.me/fng/');
                const data = await response.json();

                if (data.data && data.data[0]) {
                    setMacro(data.data[0]);
                    setLoading({
                        message: "Sucess",
                        status: false
                    })
                }
            } catch (error) {
                setLoading({
                    message: `Failed to Fetch the Data: ${error.message}`,
                    status: false
                })
            }
        };

        fetchMacro();
    }, [])

    useEffect(() => {
        if (loading.status === false && macro) {
            dispatch({
                type: 'ADD_LOG',
                payload: `Fear & Greed Index: ${macro.value_classification}`,
                logType: 'success'
            })
        }
    }, [loading.status])

    return { macro, loading }
}