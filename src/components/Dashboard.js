
import './Game.css';
import UserProfile from "../assets/icons/user-profile.svg";
import GamesIcon from '../assets/dashboard-game.svg';
import ScoresIcon from '../assets/dashboard-trophy.svg';
import React, {Component, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import LevelIcon from "../assets/icons/level.svg";
import {Link} from "react-router-dom"
import Skeleton from "./Skeleton";

function Dashboard() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


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
    function logOut(){
        localStorage.removeItem("authToken");
        window.location.href = "/";
    }

    useEffect(() => {
        get();
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
                        <div className="warning">
                            با درود به شما کاربر عزیز، صفحه پروفایل در حال توسعه میباشد!
                        </div>
                        <ul className="user-info">
                            <li className="head">
                                <div className="avatar">
                                    {user.photo_id ?
                                        // <img src={process.env.REACT_APP_API+user.photo.path} alt={user.name}/>
                                        <img src={UserProfile} alt="profile"/>
                                        :
                                        <img src={UserProfile} alt="profile"/>
                                    }
                                </div>

                                <div className="names">
                                    <div className="name">
                                        {user.name + " " + user.family}
                                    </div>
                                    <div className="grade">
                                        سطح پروفایل
                                        <span className="mark">{user.grade}</span>
                                    </div>
                                </div>
                                <div className="grades">
                                    <div className="level">
                                        Lv.
                                        <span className="lvl">{user.level}</span>
                                        <div className="icon-container">
                                            <img src={LevelIcon} alt="Level"/>
                                        </div>
                                    </div>


                                    {user.nickname ?
                                        <div className="nickname">
                                            {user.nickname}
                                        </div>
                                        :
                                        <div className="nickname not">
                                            نام کاربری انتخاب نشده
                                        </div>
                                    }
                                </div>
                            </li>
                            <li className="foot">


                            </li>
                        </ul>
                        <ul className="experience">
                            <li className="level"></li>
                            <li className="range">
                                <div style={{width: user.xp / user.level * 10 + "%"}} className="xp-range"></div>
                            </li>
                            <li className="xp-count">
                                <div className="info">
                                    {user.xp}
                                    <span className="slash">/</span>
                                    {user.level * 10}
                                </div>
                                <div className="txt">EXP</div>
                            </li>
                        </ul>
                        <div className="wallet">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.08">
                                <path
                                    d="M492,141.08c11.05,0,20-8.95,20-20v-21c0-55.18-44.89-100.08-100.08-100.08H100c-.78,0-1.55.06-2.3.14-26.41.91-51.78,12.23-70.07,31.39C8.9,51.15-.86,76.68.06,103.54c-.04.51-.06,1.02-.06,1.54v286.92C0,458.21,53.87,512.08,120.08,512.08h291.85c55.18,0,100.08-44.89,100.08-100.08v-151.85c0-55.18-44.89-100.08-100.08-100.08H100c-32.11,0-58.44-25.1-59.93-57.14-.76-16.29,5.1-31.84,16.5-43.79,11.57-12.12,27.81-19.07,44.57-19.07.51,0,1.01-.04,1.51-.08h309.28c33.13,0,60.08,26.95,60.08,60.08v21c0,11.05,8.95,20,20,20ZM100,200.08h311.92c33.13,0,60.08,26.95,60.08,60.08v151.85c0,33.13-26.95,60.08-60.08,60.08H120.08c-44.15,0-80.08-35.92-80.08-80.08v-211.84c16.73,12.53,37.51,19.92,60,19.92Z"/>
                                <circle cx="407" cy="336.08" r="25"/>
                                <path
                                    d="M100,80.08c-11.05,0-20,8.95-20,20s8.95,20,20,20h312c11.05,0,20-8.95,20-20s-8.95-20-20-20H100Z"/>
                            </svg>
                            <div className="title">موجودی کیف پول</div>
                            <div className="balance">
                                0
                                <span className="notice pr-1">
                                    تومان
                                </span>
                            </div>
                        </div>
                        <div className="space-25"></div>
                        <ul className="scores row no-gutters">
                            <div className="col-6 pl-2">
                                <div className="info-card">
                                    <img src={GamesIcon} alt="games" className="bg-icon"/>
                                    <div className="title">
                                        امتیازات
                                    </div>
                                    <div className="count">
                                        {user.score}
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 pr-2">
                                <div className="info-card">
                                    <img src={ScoresIcon} alt="score" className="bg-icon"/>

                                    <div className="title">
                                        تعداد برد

                                    </div>
                                    <div className="count">
                                        {user.win}
                                    </div>
                                </div>
                            </div>
                        </ul>

                        <ul className="user-access">
                            <li className="item">
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
                                <div className="text">تاریخچه تراکنش ها</div>

                                <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.31 330.27">
                                    <g>
                                        <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                    </g>
                                </svg>

                            </li>
                            <li className="item">
                                <div className="icon-container">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.51">
                                        <path
                                            d="M19.11,3.89c-.42-.38-.88-.73-1.39-1l-3.89-2.1c-1.94-1.05-4.25-1.05-6.18,0l-3.89,2.1c-1.2.65-2.17,1.63-2.82,2.83h0s0,0,0,0c0,0,0,0,0,0-.05.08-.08.17-.12.25-.1.2-.21.41-.29.62,0,.02-.01.04-.02.05-.34.88-.52,1.83-.52,2.79v2.64c0,2.79,1.45,5.29,3.77,6.55l3.89,2.09c.97.53,2.03.79,3.09.79s2.12-.26,3.09-.79l3.89-2.09c2.33-1.26,3.77-3.77,3.77-6.55v-2.64c0-2.18-.89-4.18-2.39-5.55ZM10.74,10.42L2.66,5.81s.01-.02.02-.03c.03-.05.07-.09.11-.13.11-.14.23-.28.36-.41.06-.06.12-.12.18-.18.12-.11.24-.21.36-.31.07-.05.13-.11.2-.15.18-.13.36-.25.56-.36.01,0,.03-.02.04-.03l3.89-2.1c1.49-.81,3.26-.81,4.75,0l3.89,2.1c.29.16.56.35.82.55.07.05.13.11.19.17.2.18.39.37.56.58.03.04.06.07.09.1l-7.94,4.82ZM4.48,17.3c-1.84-.99-2.98-3-2.98-5.23v-2.64c0-.35.04-.7.1-1.05.01-.08.03-.17.05-.25.07-.34.16-.68.29-1,0,0,0,0,0,0l8.06,4.6v8.21s-.08-.01-.11-.02c-.2-.04-.4-.08-.6-.15-.07-.02-.13-.04-.2-.06-.24-.09-.48-.19-.72-.31l-3.89-2.1ZM20,12.07c0,2.23-1.14,4.24-2.98,5.23l-3.89,2.1c-.23.12-.47.22-.71.31-.07.03-.14.05-.22.07-.19.06-.37.1-.56.14-.04,0-.09.02-.13.03v-8.23l7.96-4.83s.03.07.05.1c.03.07.06.15.08.22.06.16.11.32.16.48.02.08.05.16.07.25.04.17.07.34.1.51.01.08.03.15.04.23.03.25.05.5.05.76v2.64Z"/>
                                    </svg>
                                </div>
                                تـاریخچه بـــــازی هـا
                                <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 181.31 330.27">
                                    <g>
                                        <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                    </g>
                                </svg>
                            </li>
                            <li className="item">
                                <div className="icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.5">
                                        <path
                                            d="M15.98,21.5c-.48,0-.95-.16-1.36-.47l-3.41-2.59c-.27-.21-.64-.21-.9,0l-3.42,2.59c-.79.6-1.83.62-2.65.05-.85-.59-1.21-1.67-.89-2.67l1.3-4.18c.11-.36,0-.75-.3-.99l-3.4-2.58c-.83-.63-1.14-1.67-.81-2.67.32-.96,1.17-1.59,2.17-1.59h4.22c.34,0,.64-.24.75-.59l1.3-4.17c.34-1.2,1.6-1.9,2.8-1.56.76.21,1.36.82,1.57,1.57l1.3,4.16c.11.35.41.59.75.59h4.22c.99,0,1.84.62,2.17,1.59.33,1,.02,2.05-.81,2.67l-3.41,2.59c-.29.22-.41.62-.3.98l1.3,4.19c.31,1-.05,2.08-.89,2.67-.4.28-.84.42-1.29.42ZM10.75,16.79c.48,0,.96.15,1.36.46l3.41,2.58c.39.3.75.11.88.02.25-.18.47-.53.32-1l-1.3-4.18c-.3-.95.03-2,.81-2.61l3.42-2.59c.37-.28.39-.7.29-1-.04-.13-.23-.56-.74-.56h-4.22c-1,0-1.88-.66-2.18-1.64l-1.3-4.18c-.08-.28-.28-.48-.54-.55-.41-.12-.84.12-.95.53v.02s-1.31,4.18-1.31,4.18c-.31.98-1.18,1.64-2.18,1.64H2.3c-.51,0-.7.43-.74.56-.1.3-.08.72.29,1l3.41,2.58c.8.62,1.12,1.67.82,2.62l-1.3,4.18c-.15.47.07.82.32,1,.13.09.49.28.88-.02l3.41-2.59c.4-.31.88-.46,1.36-.46Z"/>
                                    </svg>
                                </div>
                                اَچــیـــومـنـت هـــا
                                <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 181.31 330.27">
                                    <g>
                                        <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                    </g>
                                </svg>
                            </li>
                            <li className="item">
                                <div className="icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 21.5">
                                        <path
                                            d="M8.75,7.5c-2.07,0-3.75-1.68-3.75-3.75s1.68-3.75,3.75-3.75,3.75,1.68,3.75,3.75-1.68,3.75-3.75,3.75ZM8.75,1.5c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25,2.25-1.01,2.25-2.25-1.01-2.25-2.25-2.25Z"/>
                                        <path
                                            d="M11.25,21.5h-5c-3.45,0-6.25-2.8-6.25-6.25v-1.5c0-2.62,2.13-4.75,4.75-4.75h8c2.62,0,4.75,2.13,4.75,4.75v1.5c0,3.45-2.8,6.25-6.25,6.25ZM4.75,10.5c-1.79,0-3.25,1.46-3.25,3.25v1.5c0,2.62,2.13,4.75,4.75,4.75h5c2.62,0,4.75-2.13,4.75-4.75v-1.5c0-1.79-1.46-3.25-3.25-3.25H4.75Z"/>
                                    </svg>
                                </div>
                                مشـاهده پروفـایـل
                                <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 181.31 330.27">
                                    <g>
                                        <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                    </g>
                                </svg>
                            </li>
                            <li className="item">
                                <Link to="/dashboard/user/info">
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.5">
                                            <path
                                                d="M10.75,15.5c-2.62,0-4.75-2.13-4.75-4.75s2.13-4.75,4.75-4.75,4.75,2.13,4.75,4.75-2.13,4.75-4.75,4.75ZM10.75,7.5c-1.79,0-3.25,1.46-3.25,3.25s1.46,3.25,3.25,3.25,3.25-1.46,3.25-3.25-1.46-3.25-3.25-3.25Z"/>
                                            <path
                                                d="M10.75,21.5c-1.18,0-2.14-.77-2.4-1.92l-.14-.63c-.06-.25-.21-.46-.43-.6-.22-.14-.48-.18-.73-.13-.11.02-.21.07-.31.13l-.54.34c-.99.63-2.22.49-3.06-.34-.83-.83-.97-2.06-.34-3.06l.34-.54c.17-.27.2-.59.08-.88-.12-.29-.37-.5-.68-.57l-.63-.14C.77,12.89,0,11.93,0,10.75c0-1.18.77-2.14,1.92-2.4l.63-.14c.52-.12.84-.63.73-1.15-.02-.11-.07-.21-.13-.3l-.34-.55c-.63-1-.49-2.22.34-3.06.83-.83,2.06-.97,3.06-.34l.54.34c.27.17.59.2.88.08s.5-.37.57-.68l.14-.63c.26-1.15,1.23-1.92,2.4-1.92h0c1.18,0,2.14.77,2.4,1.92l.14.63c.06.25.21.46.43.6s.48.18.73.13c.11-.02.21-.07.3-.13l.55-.34c.99-.63,2.22-.49,3.06.34.83.83.97,2.06.34,3.06l-.34.55c-.14.22-.18.48-.13.73s.21.46.42.6c.09.06.2.1.3.13l.63.14c1.15.26,1.92,1.23,1.92,2.4,0,1.18-.77,2.14-1.92,2.4l-.63.14c-.25.06-.47.21-.6.42-.14.22-.18.48-.12.73.02.11.07.21.13.3l.34.55c.63,1,.49,2.22-.34,3.06-.83.83-2.06.97-3.06.34l-.54-.34c-.45-.28-1.05-.15-1.33.3-.06.09-.1.19-.12.3l-.14.63c-.26,1.15-1.22,1.92-2.4,1.92ZM7.27,16.7c1.13,0,2.14.78,2.4,1.92l.14.63c.12.55.57.75.94.75s.81-.2.94-.75l.14-.63c.06-.28.17-.54.32-.77.72-1.15,2.25-1.49,3.4-.77l.54.34c.48.3.93.13,1.2-.13s.44-.71.13-1.2l-.34-.55c-.15-.24-.26-.5-.32-.77-.15-.64-.03-1.3.32-1.86.35-.56.9-.94,1.54-1.09l.63-.14c.55-.12.75-.57.75-.94s-.2-.82-.75-.94l-.63-.14c-.27-.06-.53-.17-.77-.32-.56-.35-.94-.9-1.09-1.54-.14-.64-.03-1.3.32-1.86l.34-.54c.3-.48.13-.93-.13-1.2-.26-.26-.71-.43-1.2-.13l-.55.34c-.24.15-.5.26-.77.32-.64.14-1.3.03-1.86-.32-.56-.35-.94-.9-1.09-1.54l-.14-.63c-.12-.55-.57-.75-.94-.75h0c-.37,0-.81.2-.94.75l-.14.63c-.18.78-.72,1.43-1.46,1.73-.74.31-1.58.23-2.26-.19l-.55-.34c-.48-.3-.93-.13-1.2.13-.26.26-.44.71-.13,1.2l.34.55c.15.24.26.5.32.78.3,1.32-.54,2.65-1.86,2.94l-.63.14c-.55.12-.75.57-.75.94,0,.37.2.81.75.94l.63.14c.78.18,1.43.72,1.73,1.46s.23,1.58-.19,2.26l-.34.54c-.3.48-.13.93.13,1.2.26.26.71.43,1.2.13l.55-.34c.24-.15.5-.26.78-.32.18-.04.36-.06.54-.06Z"/>
                                        </svg>
                                    </div>
                                    مشخصات کاربری
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
                            <li className="item" onClick={() => {
                                logOut()
                            }}>
                                <div className="icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 21.5">
                                        <path
                                            d="M15,7.25v-3.18c0-2.25-1.83-4.07-4.07-4.07h-2.3c-2.27,0-4.12,1.85-4.12,4.12v3.13c-2.6.76-4.5,3.16-4.5,6v2c0,3.45,2.8,6.25,6.25,6.25h7c3.45,0,6.25-2.8,6.25-6.25v-2c0-2.84-1.9-5.24-4.5-6ZM6,4.12c0-1.45,1.18-2.62,2.62-2.62h2.3c1.42,0,2.57,1.15,2.57,2.57v2.94c-.08,0-.17-.01-.25-.01h-7c-.08,0-.17,0-.25.01v-2.89ZM18,15.25c0,2.62-2.13,4.75-4.75,4.75h-7c-2.62,0-4.75-2.13-4.75-4.75v-2c0-2.62,2.13-4.75,4.75-4.75h7c2.62,0,4.75,2.13,4.75,4.75v2Z"/>
                                        <path
                                            d="M11.4,13.31s.02-.07.03-.11c.04-.14.07-.29.07-.45,0-.96-.79-1.75-1.75-1.75s-1.75.79-1.75,1.75c0,.16.03.3.07.45.01.04.02.07.03.11.04.12.09.23.16.34.01.02.02.04.03.06.08.12.17.23.28.32.03.03.06.05.08.07.09.07.19.14.29.19.02.01.04.03.06.04v1.42c0,.41.34.75.75.75s.75-.34.75-.75v-1.42s.04-.03.06-.04c.1-.05.2-.12.29-.19.03-.02.06-.04.08-.07.1-.1.2-.2.28-.32.01-.02.02-.04.03-.06.06-.11.12-.22.16-.34Z"/>
                                    </svg>
                                </div>
                                خـروج از حـسـاب
                                <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 181.31 330.27">
                                    <g>
                                        <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                    </g>
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="space-50"></div>
                <div className="space-50"></div>
            </div>
    )
}

export default Dashboard;
