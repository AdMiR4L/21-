

import React, {Component, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";

import {Link} from "react-router-dom"
import Skeleton from "../components/Skeleton";
import UserProfile from "../assets/icons/user-profile.svg";

function Admin() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    function get() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setLoading(true)
        axios.get(process.env.REACT_APP_API + 'admin/users', {
            headers: headers
        })
            .then((response) => {
                setUsers(response.data.data)
                setLoading(false)
                console.log(response);
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("")
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(false);
    function search(value) {
        setSearchInput(value)
        setUserSearchLoading(true)
        setTimeout(() =>{
            if (value.length > 3){
                axios.post(process.env.REACT_APP_API+'find/user', {username : value})
                    .then((response) => {
                        console.log(response);
                        setUserSearchResults(response.data)
                        setUserSearchLoading(false);
                        setTimeout(() => { setShowSearchResult(true)}, 500)
                    })
                    .catch((error) =>{
                        console.log(error)
                    });
            }
        }, 500)
    }


    useEffect(() => {
        get();
        if (!localStorage.authToken)
            window.location.href = "/";
    }, []);
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
            <div className="container my-profile admin-users">
                <div className="space-50"></div>
                <div className="search-input">
                    {userSearchLoading ?
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div> :
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 55.13 55.15">
                            <path
                                d="M54.22,49.86l-7.44-7.42c8.85-11.23,7.05-27.58-4.09-36.6C37.26,1.44,30.42-.58,23.46.15c-6.97.73-13.23,4.13-17.63,9.57-9.09,11.23-7.35,27.77,3.88,36.86,9.46,7.65,23.16,7.72,32.71.21l7.42,7.45c.61.61,1.4.91,2.2.91s1.59-.3,2.2-.91c.59-.58.91-1.36.91-2.19s-.32-1.61-.91-2.2ZM46.22,26.28c0,11.01-8.96,19.97-19.98,19.97S6.27,37.29,6.27,26.28,15.23,6.32,26.24,6.32s19.98,8.96,19.98,19.97Z"/>
                        </svg>
                    }

                    <input
                        type="text"
                        value={searchInput}
                        placeholder="جستجو ..."
                        autoFocus
                        onChange={(e) => search(e.target.value)}
                        className="input"/>

                    {showSearchResult ? (
                        <ul className="custom-select-input user-select-input">
                            {userSearchResults.map((user, index) => (
                                <Link to={"/admin/users/"+user.id}>
                                    <li
                                        key={user.id} // Assuming each user has a unique ID
                                        className="item">
                                        <ul className="users">
                                            <li className="user-item">
                                                <svg className="user-icons" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 384 512">
                                                    <path
                                                        d="M384,512h-42.67v-107.58c-.04-34.82-28.26-63.05-63.08-63.08H105.75c-34.82.04-63.05,28.26-63.08,63.08v107.58H0v-107.58c.07-58.37,47.37-105.68,105.75-105.75h172.5c58.37.07,105.68,47.37,105.75,105.75v107.58ZM192,256c-70.69,0-128-57.31-128-128S121.31,0,192,0s128,57.31,128,128c-.07,70.66-57.34,127.93-128,128ZM192,42.67c-47.13,0-85.33,38.21-85.33,85.33s38.21,85.33,85.33,85.33,85.33-38.21,85.33-85.33-38.21-85.33-85.33-85.33Z"/>
                                                </svg>
                                                {user.name + " " + user.family}
                                            </li>

                                            <li className="user-item">

                                                <svg className="user-icons" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 341.33 512">
                                                    <path
                                                        d="M234.67,512H106.67c-58.82,0-106.67-47.85-106.67-106.67V106.67C0,47.85,47.85,0,106.67,0h128c58.82,0,106.67,47.85,106.67,106.67v298.67c0,58.82-47.85,106.67-106.67,106.67ZM106.67,42.67c-35.29,0-64,28.71-64,64v298.67c0,35.29,28.71,64,64,64h128c35.29,0,64-28.71,64-64V106.67c0-35.29-28.71-64-64-64H106.67ZM213.33,405.33c0-11.78-9.55-21.33-21.33-21.33h-42.67c-11.78,0-21.33,9.55-21.33,21.33s9.55,21.33,21.33,21.33h42.67c11.78,0,21.33-9.55,21.33-21.33Z"/>
                                                </svg>
                                                {user.phone}
                                            </li>
                                        </ul>

                                    </li>
                                </Link>
                            ))}
                            {userSearchResults.length <= 0 ?
                                <li className="item">کاربری یافت نشد!</li>
                                : null}
                        </ul>
                    ) : null}

                </div>
                <div className="space-50"></div>
                <div className="row">
                    <div className="user-table">
                        {users.map((user, index) => (
                            <Link key={index} to={"/admin/users/" + user.id}>
                                <div  className="user-row">
                                    <div className="user-info">
                                        <div className="user-name-family">
                                            <p className="user-name">{user.name}</p>
                                            <p className="user-family">{user.family}</p>
                                        </div>
                                        {user.nickname ?
                                            <p className="user-username">@{user.nickname}</p> :
                                            <p className="user-username">نام کاربری انتخاب نشده</p>}
                                        <p className="user-phone">{user.phone}</p>
                                    </div>
                                    <div className="user-profile-pic">
                                        {user.photo_id ?
                                            // <img src={process.env.REACT_APP_API+user.photo.path} alt={user.name}/>
                                            <img src={UserProfile} alt="profile"/>
                                            :
                                            <img src={UserProfile} alt="profile"/>
                                        }
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="space-50"></div>
                <div className="space-50"></div>
            </div>
    )
}

export default Admin;
