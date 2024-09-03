

import React, {Component, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import LevelIcon from "../assets/icons/level.svg";
import {Link} from "react-router-dom"
import Skeleton from "../components/Skeleton";

function Admin() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        if (!localStorage.authToken)
            window.location.href = "/";
    }, []);
    const location = useLocation();
    return (
        loading ?
            <div className="container my-profile">
                <div className="container my-profile">
                    <div className="space-50"></div>
                    <div className="row">
                        <div className="dashboard">
                            <ul className="user-info">
                                <li className="head">
                                    <div className="avatar">
                                        <Skeleton width={"100%"} height={"100%"}  />
                                    </div>

                                    <div className="names">
                                        <div className="name">
                                            <Skeleton width={"40px"} height={"20px"}/>
                                        </div>
                                        <div className="grade">
                                            <Skeleton width={"80px"} height={"20px"}/>
                                        </div>
                                    </div>
                                    <div className="grades mt-2">
                                        <Skeleton width={"50%"} height={"20px"}/>


                                        <Skeleton width={"100px"} height={"25px"}/>

                                    </div>
                                </li>
                                <li className="foot">


                                </li>
                            </ul>
                            <ul className="experience">
                                <li className="level"></li>
                                <li className="w-100">
                                    <Skeleton width={"100%"} height={"15px"}/>
                                </li>
                                <li className="xp-count">
                                    <Skeleton width={"100px"} height={"30px"}/>
                                    <Skeleton width={"60px"} height={"30px"}/>
                                </li>
                            </ul>
                            <div className="wallet">
                                <Skeleton width={"100%"} height={"25px"}/>
                                <div className="title">
                                    <Skeleton width={"40%"} height={"20px"}/>
                                </div>
                                <div className="balance">
                                    <Skeleton width={"60px"} height={"20px"}/>
                                </div>
                            </div>
                            <div className="space-25"></div>
                            <ul className="scores row no-gutters">
                                <div className="col-6 pl-2">
                                    <Skeleton width={"100%"} border={1} height={"150px"}/>
                                </div>
                                <div className="col-6 pr-2">
                                    <Skeleton width={"100%"} border={1} height={"150px"}/>
                                </div>
                            </ul>

                            <ul className="user-access">
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                </div>
            </div>
            :
            <div className="container my-profile">
                <div className="space-50"></div>
                <div className="row">
                    <div className="dashboard">

                        <ul className="user-access">
                                <li className="item">
                                    <Link to={"/admin/users"}>
                                        <div className="icon-container">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.51">
                                                <path
                                                    d="M18.22,5.28c.07.07.15.13.24.16.09.04.19.06.29.06s.2-.02.29-.06c.09-.04.17-.09.24-.16l2-2c.29-.29.29-.77,0-1.06s-.77-.29-1.06,0l-.72.72V.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2.19l-.72-.72c-.29-.29-.77-.29-1.06,0s-.29.77,0,1.06l2,2Z"/>
                                                <path
                                                    d="M10.75,16.5c.41,0,.75-.34.75-.75v-.25h.25c1.52,0,2.75-1.23,2.75-2.75s-1.23-2.75-2.75-2.75h-.25v-2.5h.31c.57,0,1.07.39,1.21.94.1.4.51.64.91.54.4-.1.64-.51.54-.91-.31-1.21-1.41-2.06-2.66-2.06h-.31v-.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.25h-.25c-1.52,0-2.75,1.23-2.75,2.75s1.23,2.75,2.75,2.75h.25v2.5h-.31c-.57,0-1.07-.39-1.21-.94-.1-.4-.51-.64-.91-.54-.4.1-.64.51-.54.91.31,1.21,1.41,2.06,2.66,2.06h.32v.25c0,.41.34.75.75.75ZM11.5,11.5h.25c.69,0,1.25.56,1.25,1.25s-.56,1.25-1.25,1.25h-.25v-2.5ZM9.75,10c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25h.25v2.5h-.25Z"/>
                                                <path
                                                    d="M19.96,6.79c-.39.13-.6.56-.46.95,1.66,4.82-.91,10.1-5.74,11.76-2.33.8-4.84.65-7.07-.43-2.22-1.08-3.89-2.97-4.69-5.3C.34,8.94,2.92,3.66,7.74,2c1.92-.66,4.03-.67,5.96-.02.4.13.82-.08.95-.47s-.08-.82-.47-.95c-2.24-.75-4.69-.74-6.92.02C1.65,2.51-1.34,8.64.59,14.25c.93,2.71,2.87,4.9,5.45,6.16,1.49.73,3.09,1.09,4.71,1.09,1.18,0,2.36-.2,3.51-.59,5.6-1.93,8.6-8.06,6.67-13.66-.13-.39-.56-.6-.95-.46Z"/>
                                            </svg>
                                        </div>
                                        <div className="text">مدیریت کاربران</div>

                                        <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 181.31 330.27">
                                            <g>
                                                <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                            </g>
                                        </svg>
                                    </Link>
                                </li>

                        </ul>
                    </div>
                </div>
                <div className="space-50"></div>
                <div className="space-50"></div>
            </div>
    )
}

export default Admin;
