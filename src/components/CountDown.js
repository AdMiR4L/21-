import React, { useState, useEffect } from 'react';
import axios from "axios";
import toast from "react-hot-toast";

function CountdownTimer(props) {
    const initialTime = 120; // 2 minutes (120 seconds)

    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [isTimeUp, setIsTimeUp] = useState(false);

    function resendCode() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('authToken')}
        axios.post(process.env.REACT_APP_API+'user/send/code',
            null, {headers : headers})
            .then((response) => {
                console.log(response)
                toast.success(response.data);
            })
            .catch((error) =>{
                console.log(error)
            });
    }
    function resendForgotPasswordCode(){
        axios.post(process.env.REACT_APP_API+'forgot/password',
            {phone : props.phone},null, )
            .then((response) => {
                console.log(response)
                toast.success(response.data);
            })
            .catch((error) =>{
                console.log(error)
            });
    }
    useEffect(() => {
        if (timeLeft === 0) {
            setIsTimeUp(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const resetTimer = () => {
        setTimeLeft(initialTime);
        setIsTimeUp(false);
    };

    return (
        <div>
            {isTimeUp ? (
                <div className="sendSMSAgain" onClick={() => {
                    resetTimer()
                    if (props.phone)
                        resendForgotPasswordCode()
                    else
                    resendCode()
                }}>ارسال مجدد</div>
            ) : (
                <div className="sendSMSAgain static">{formatTime(timeLeft)}</div>
            )}
        </div>
    );
}

export default CountdownTimer;
