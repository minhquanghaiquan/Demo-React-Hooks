import React, { useState, useEffect } from "react";
import useClock from '../../hooks/useClock'
import PropTypes from 'prop-types';

Clock.propTypes = {};

// function FormatDate(date) {
//     const hours = `0${date.getHours()}`.slice(-2);
//     const minutes = `0${date.getMinutes()}`.slice(-2);
//     const seconds =  `0${date.getSeconds()}`.slice(-2);
//     return `${hours}:${minutes}:${seconds}`
// }

function Clock() {
    const {timeString} = useClock();
    // const [timeString, setTimeString] = useState('');

    // useEffect(()=> {
    //     const clockInterval = setInterval(() => {
    //         const now = new Date();
    //         const newTimeString = FormatDate(now);
    //         setTimeString(newTimeString);
    //     },1000);

    //     return () => {
    //         console.log('Clock cleanup');
    //         clearInterval(clockInterval);
    //     }
    // }, []);
    return (
        <p>{timeString}</p>
    );
}

export default Clock;