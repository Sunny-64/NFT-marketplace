import React, { useState, useRef, useEffect } from 'react'

function Countdown(props) {
    const [countdown, setCountDown] = useState(0);
    const timerId = useRef(); 

    useEffect(() => {
        timerId.current = setInterval(() => {
            
        }, 1000)
    })
    return (
        <p></p>
    )
}

export default Countdown
