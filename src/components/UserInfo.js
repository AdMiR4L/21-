
import './Game.css';
import UserProfile from "../assets/icons/user-profile.svg";
import GamesIcon from '../assets/dashboard-game.svg';
import ScoresIcon from '../assets/dashboard-trophy.svg';
import React, {Component, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import LevelIcon from "../assets/icons/level.svg";


function UserInfo() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    function get() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setLoading(true)
        axios.post(process.env.REACT_APP_API + 'user', null, {
            headers: headers
        })
            .then((response) => {
                setUser(response.data)
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    useEffect(() => {
        get();
    }, []);
    const location = useLocation();
    return (
        loading ?
            <div className="container my-profile">

            </div>
            :
            <div className="container my-profile">
                <div className="space-50"></div>
                <div className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.5">
                        <path
                            d="M10.75,15.5c-2.62,0-4.75-2.13-4.75-4.75s2.13-4.75,4.75-4.75,4.75,2.13,4.75,4.75-2.13,4.75-4.75,4.75ZM10.75,7.5c-1.79,0-3.25,1.46-3.25,3.25s1.46,3.25,3.25,3.25,3.25-1.46,3.25-3.25-1.46-3.25-3.25-3.25Z"/>
                        <path
                            d="M10.75,21.5c-1.18,0-2.14-.77-2.4-1.92l-.14-.63c-.06-.25-.21-.46-.43-.6-.22-.14-.48-.18-.73-.13-.11.02-.21.07-.31.13l-.54.34c-.99.63-2.22.49-3.06-.34-.83-.83-.97-2.06-.34-3.06l.34-.54c.17-.27.2-.59.08-.88-.12-.29-.37-.5-.68-.57l-.63-.14C.77,12.89,0,11.93,0,10.75c0-1.18.77-2.14,1.92-2.4l.63-.14c.52-.12.84-.63.73-1.15-.02-.11-.07-.21-.13-.3l-.34-.55c-.63-1-.49-2.22.34-3.06.83-.83,2.06-.97,3.06-.34l.54.34c.27.17.59.2.88.08s.5-.37.57-.68l.14-.63c.26-1.15,1.23-1.92,2.4-1.92h0c1.18,0,2.14.77,2.4,1.92l.14.63c.06.25.21.46.43.6s.48.18.73.13c.11-.02.21-.07.3-.13l.55-.34c.99-.63,2.22-.49,3.06.34.83.83.97,2.06.34,3.06l-.34.55c-.14.22-.18.48-.13.73s.21.46.42.6c.09.06.2.1.3.13l.63.14c1.15.26,1.92,1.23,1.92,2.4,0,1.18-.77,2.14-1.92,2.4l-.63.14c-.25.06-.47.21-.6.42-.14.22-.18.48-.12.73.02.11.07.21.13.3l.34.55c.63,1,.49,2.22-.34,3.06-.83.83-2.06.97-3.06.34l-.54-.34c-.45-.28-1.05-.15-1.33.3-.06.09-.1.19-.12.3l-.14.63c-.26,1.15-1.22,1.92-2.4,1.92ZM7.27,16.7c1.13,0,2.14.78,2.4,1.92l.14.63c.12.55.57.75.94.75s.81-.2.94-.75l.14-.63c.06-.28.17-.54.32-.77.72-1.15,2.25-1.49,3.4-.77l.54.34c.48.3.93.13,1.2-.13s.44-.71.13-1.2l-.34-.55c-.15-.24-.26-.5-.32-.77-.15-.64-.03-1.3.32-1.86.35-.56.9-.94,1.54-1.09l.63-.14c.55-.12.75-.57.75-.94s-.2-.82-.75-.94l-.63-.14c-.27-.06-.53-.17-.77-.32-.56-.35-.94-.9-1.09-1.54-.14-.64-.03-1.3.32-1.86l.34-.54c.3-.48.13-.93-.13-1.2-.26-.26-.71-.43-1.2-.13l-.55.34c-.24.15-.5.26-.77.32-.64.14-1.3.03-1.86-.32-.56-.35-.94-.9-1.09-1.54l-.14-.63c-.12-.55-.57-.75-.94-.75h0c-.37,0-.81.2-.94.75l-.14.63c-.18.78-.72,1.43-1.46,1.73-.74.31-1.58.23-2.26-.19l-.55-.34c-.48-.3-.93-.13-1.2.13-.26.26-.44.71-.13,1.2l.34.55c.15.24.26.5.32.78.3,1.32-.54,2.65-1.86,2.94l-.63.14c-.55.12-.75.57-.75.94,0,.37.2.81.75.94l.63.14c.78.18,1.43.72,1.73,1.46s.23,1.58-.19,2.26l-.34.54c-.3.48-.13.93.13,1.2.26.26.71.43,1.2.13l.55-.34c.24-.15.5-.26.78-.32.18-.04.36-.06.54-.06Z"/>
                    </svg>
                </div>
                مشخصات کاربری
            </div>
    )
}

export default UserInfo;
