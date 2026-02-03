import { useState, useEffect } from "react";
import { useSystem } from "../Context/SystemContext";

export const useUptime = () => {
    const [startTime] = useState(Date.now());//this is when the timer start
    const [now, setNow] = useState(Date.now());//this is the state we use to change and save data.
    const { dispatch } = useSystem();

    //Using a background fucntion that will run every second to change the time
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        const logAdd = setInterval(() => {
            dispatch({
                type: 'ADD_LOG',
                payload: '[SYSTEM] Session duration: 10m. Optimization recommended.',
                logType: 'success'
            })
        }, 10 * 60 * 1000)
        //clearing the interval so we do not get CPU overload
        return () => {
            clearInterval(timer)
            clearInterval(logAdd)
        }
    }, []);

    const timerFormatter = new Intl .DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    })

    const elapsed = Math.floor((now - startTime) / 1000);//what is the elapsed?
    const minutes = Math.floor(elapsed / 60);//We are calculating the minutes
    const seconds = elapsed % 60//Second.

    return {
        currentTime: timerFormatter.format(now),//this is the currentTime
        upTime: `${minutes}m ${seconds}s`//sending the Time
    }
}