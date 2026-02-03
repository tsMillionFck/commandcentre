import { useState, useEffect } from "react";
import { useSystem } from "../Context/SystemContext";

export const useSystemMonitor = () => {
    const [matrix, setMatrix] = useState({ cpu: 20, ram: 45});
    const { dispatch } = useSystem();

    useEffect(() => {
        const interval = setInterval(() => {
            const newCpu = Math.floor(Math.random() * (60 - 10) + 10);
            const newRam = Math.floor(Math.random() * (85 - 70) + 10);

            if (newCpu > 60) {
                dispatch({
                    type: "ADD_LOG",
                    payload: `SYSTEM ALERT: CPU load at ${newCpu}%`,
                    logType: 'warning'
                })
            }
            if (newRam > 90) {
                dispatch({
                    type: 'ADD_LOG',
                    payload: `SYSTEM ALERT: RAM load at ${newRam}%`,
                    logType: 'warning'
                })
            }

            setMatrix({
                cpu: newCpu,
                ram: newRam
            })
        }, 2000)

        return () => clearInterval(interval);
    }, [])

    return matrix;
}