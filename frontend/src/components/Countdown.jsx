import React, { useState, useRef, useEffect, useCallback } from 'react'


function Countdown(props) {
    const [countdown, setCountDown] = useState(0);

    const getRemainingTime = useCallback(() => {
        const now = new Date().getTime();
        const endTimestamp = props.endTime * 1000; // Convert seconds to milliseconds
        const remainingTime = endTimestamp - now;
        return remainingTime;
    }, [props.endTime])
    

    useEffect(() => {
        const calculateCountdown = () => {
            const remainingTime = getRemainingTime();
            // setCountDown(remainingTime); 
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
            return remainingTime > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : 0;
        };

        const intervalId = setInterval(() => {
            setCountDown(calculateCountdown()); 
        }, 1000)
        return () => clearInterval(intervalId); 
    }, [getRemainingTime, setCountDown]);
    return (
        <p>{!props?.text ? countdown : props?.text  + countdown}</p>
    )
}

export default Countdown
