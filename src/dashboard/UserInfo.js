
import UserProfile from "../assets/icons/user-profile.svg";
import GamesIcon from '../assets/dashboard-game.svg';
import ScoresIcon from '../assets/dashboard-trophy.svg';
import React, {Component, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import LevelIcon from "../assets/icons/level.svg";
import AvatarUpload from "./AvatarUpload";
import Skeleton from "../components/Skeleton";


function UserInfo() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [nickName, setNickName] = useState("");
    const [localId, setLocalId] = useState("");
    const [profileDescription, setProfileDescription] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [nickNameLoading, setNickNameLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [nickNameError, setNickNameError] = useState([]);
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [sendDataError, setSendDataError] = useState([]);


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

    function checkNickName (nickname){
        setNickName(nickname)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        if (nickname.length > 3){
            setNickNameLoading(true)
            axios.post(process.env.REACT_APP_API + 'user/nickname',
                {nickname : nickname},
                {headers: headers})
                .then((response) => {
                    setMessage(response.data)
                    console.log(response.data)
                    setNickNameError([]);
                    setNickNameLoading(false)
                })
                .catch((error) => {
                    setMessage([])
                    setNickNameError(error.response.data.errors.nickname);
                    console.log(error.response.data)
                    setNickNameLoading(false)
                });
        }

    }

    function updateProfile (){
        setSendDataLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        console.log(sendDataError)
        axios.post(process.env.REACT_APP_API + 'user/update',
            {
                nickname : nickName ?? null,
                post_code : postCode ?? null,
                address : address ?? null,
                birth_date: birthDate ?? null,
                local_id: localId ?? null,
                description : profileDescription ?? null},
            {headers: headers})
            .then((response) => {
                setSendDataLoading(false)
                toast.success(response.data)
                console.log(response)
                setMessage("")
                setSendDataError([])
                setTimeout(function (){ get()},500)
            })
            .catch((error) => {
                console.log(error)
                setSendDataError(error.response.data.errors)
                setSendDataLoading(false)
            });

    }

    useEffect(() => {
        get();
        window.scrollTo(0, 0);
    }, []);
    const location = useLocation();
    return (
        loading ?
            <div className="container my-profile">
                <div className="space-50"></div>
                <div className="row user-info-page">
                    <div className="col-12">
                        <div className="user-info-top d-block text-right">
                            <div className="avatar-container loading">
                                <Skeleton width={"100%"} height={"100%"} border={1}/>
                            </div>
                            <div className=" mr-4 mt-3 d-inline-block">
                                <Skeleton width={"10rem"} height={"30px"}/>
                               <div className="mt-2">
                                   <Skeleton width={"5rem"} height={"20px"}/>
                               </div>

                            </div>
                        </div>
                        <div className="space-50"></div>
                    </div>
                    <div className="col-6 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-6 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-6 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-6 mt-3 text-right">
                        <Skeleton width={"60px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-12 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-6 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-6 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-12 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-12 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"45px"}/>
                    </div>
                    <div className="col-12 mt-3 text-right">
                        <Skeleton width={"80px"} height={"20px"}/>
                        <Skeleton width={"100%"} border={1} height={"200px"}/>
                    </div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                    <div className="space-25"></div>
                </div>
            </div>
            :
            <div className="container my-profile">
                <div className="space-50"></div>
                {/*<div className="icon-container">*/}
                {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.5">*/}
                {/*        <path*/}
                {/*            d="M10.75,15.5c-2.62,0-4.75-2.13-4.75-4.75s2.13-4.75,4.75-4.75,4.75,2.13,4.75,4.75-2.13,4.75-4.75,4.75ZM10.75,7.5c-1.79,0-3.25,1.46-3.25,3.25s1.46,3.25,3.25,3.25,3.25-1.46,3.25-3.25-1.46-3.25-3.25-3.25Z"/>*/}
                {/*        <path*/}
                {/*            d="M10.75,21.5c-1.18,0-2.14-.77-2.4-1.92l-.14-.63c-.06-.25-.21-.46-.43-.6-.22-.14-.48-.18-.73-.13-.11.02-.21.07-.31.13l-.54.34c-.99.63-2.22.49-3.06-.34-.83-.83-.97-2.06-.34-3.06l.34-.54c.17-.27.2-.59.08-.88-.12-.29-.37-.5-.68-.57l-.63-.14C.77,12.89,0,11.93,0,10.75c0-1.18.77-2.14,1.92-2.4l.63-.14c.52-.12.84-.63.73-1.15-.02-.11-.07-.21-.13-.3l-.34-.55c-.63-1-.49-2.22.34-3.06.83-.83,2.06-.97,3.06-.34l.54.34c.27.17.59.2.88.08s.5-.37.57-.68l.14-.63c.26-1.15,1.23-1.92,2.4-1.92h0c1.18,0,2.14.77,2.4,1.92l.14.63c.06.25.21.46.43.6s.48.18.73.13c.11-.02.21-.07.3-.13l.55-.34c.99-.63,2.22-.49,3.06.34.83.83.97,2.06.34,3.06l-.34.55c-.14.22-.18.48-.13.73s.21.46.42.6c.09.06.2.1.3.13l.63.14c1.15.26,1.92,1.23,1.92,2.4,0,1.18-.77,2.14-1.92,2.4l-.63.14c-.25.06-.47.21-.6.42-.14.22-.18.48-.12.73.02.11.07.21.13.3l.34.55c.63,1,.49,2.22-.34,3.06-.83.83-2.06.97-3.06.34l-.54-.34c-.45-.28-1.05-.15-1.33.3-.06.09-.1.19-.12.3l-.14.63c-.26,1.15-1.22,1.92-2.4,1.92ZM7.27,16.7c1.13,0,2.14.78,2.4,1.92l.14.63c.12.55.57.75.94.75s.81-.2.94-.75l.14-.63c.06-.28.17-.54.32-.77.72-1.15,2.25-1.49,3.4-.77l.54.34c.48.3.93.13,1.2-.13s.44-.71.13-1.2l-.34-.55c-.15-.24-.26-.5-.32-.77-.15-.64-.03-1.3.32-1.86.35-.56.9-.94,1.54-1.09l.63-.14c.55-.12.75-.57.75-.94s-.2-.82-.75-.94l-.63-.14c-.27-.06-.53-.17-.77-.32-.56-.35-.94-.9-1.09-1.54-.14-.64-.03-1.3.32-1.86l.34-.54c.3-.48.13-.93-.13-1.2-.26-.26-.71-.43-1.2-.13l-.55.34c-.24.15-.5.26-.77.32-.64.14-1.3.03-1.86-.32-.56-.35-.94-.9-1.09-1.54l-.14-.63c-.12-.55-.57-.75-.94-.75h0c-.37,0-.81.2-.94.75l-.14.63c-.18.78-.72,1.43-1.46,1.73-.74.31-1.58.23-2.26-.19l-.55-.34c-.48-.3-.93-.13-1.2.13-.26.26-.44.71-.13,1.2l.34.55c.15.24.26.5.32.78.3,1.32-.54,2.65-1.86,2.94l-.63.14c-.55.12-.75.57-.75.94,0,.37.2.81.75.94l.63.14c.78.18,1.43.72,1.73,1.46s.23,1.58-.19,2.26l-.34.54c-.3.48-.13.93.13,1.2.26.26.71.43,1.2.13l.55-.34c.24-.15.5-.26.78-.32.18-.04.36-.06.54-.06Z"/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
                {/*مشخصات کاربری*/}
                <div className="row user-info-page">
                    <div className="col-12">
                        <div className="user-info-top">
                            <div className="avatar-container">
                                {user.photo_id ?
                                    // <img src={process.env.REACT_APP_API+user.photo.path} alt={user.name}/>
                                    <img src={UserProfile} alt="profile"/>
                                    :
                                    <img src={UserProfile} alt="profile"/>
                                }
                                <AvatarUpload/>
                            </div>
                            <div className="next-to-avatar">
                                <div className="account-status">
                                    <div className="attr">
                                        وضعیت حساب کاربری
                                    </div>
                                    {user.status === 1 ?
                                        <div className="active">
                                            <svg className="payment-status-icon mr-0 ml-2" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <circle className="circle success" cx="256" cy="256" r="256"/>
                                                <path className="path"
                                                      d="M387.57,193.22l-141.73,155.36c-9.54,10.9-25.89,10.9-35.43,0l-59.96-66.78c-8.18-9.54-8.18-24.53,1.36-34.07,9.54-8.18,24.53-8.18,34.07,1.36l42.25,47.7,124.02-134.92c9.54-9.54,24.53-10.9,34.07-1.36,9.54,8.18,9.54,24.53,1.36,32.71h0Z"/>
                                            </svg>
                                            احراز شده

                                        </div>
                                        :
                                        <div className="active">
                                            <svg className="payment-status-icon mr-0 ml-2" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <circle className="circle error" cx="256" cy="256" r="256"/>
                                                <path className="path"
                                                      d="M366.97,336.46c9.82,9.82,9.82,25.69,0,35.51-4.7,4.72-11.1,7.36-17.76,7.36-6.43,0-12.85-2.46-17.75-7.36l-75.46-75.46-75.46,75.46c-4.7,4.72-11.09,7.36-17.75,7.36-6.66,0-13.05-2.64-17.76-7.36-9.82-9.82-9.82-25.69,0-35.51l75.46-75.46-75.46-75.46c-9.82-9.82-9.82-25.69,0-35.51,9.82-9.82,25.69-9.82,35.51,0l75.46,75.46,75.46-75.46c9.82-9.82,25.69-9.82,35.51,0,9.82,9.82,9.82,25.69,0,35.51l-75.46,75.46,75.46,75.46Z"/>
                                            </svg>
                                            غیر فعال

                                        </div>
                                    }
                                </div>
                                <div className="change-password">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                         viewBox="0 0 469.333 469.333">
                                        <g>
                                            <path
                                                d="M248.533 192c-17.6-49.707-64.853-85.333-120.533-85.333-70.72 0-128 57.28-128 128s57.28 128 128 128c55.68 0 102.933-35.627 120.533-85.333h92.8v85.333h85.333v-85.333h42.667V192h-220.8zM128 277.333c-23.573 0-42.667-19.093-42.667-42.667S104.427 192 128 192s42.667 19.093 42.667 42.667-19.094 42.666-42.667 42.666z"
                                            ></path>
                                        </g>
                                    </svg>
                                    تغییر کلمه عبور
                                </div>
                                {/*<AvatarUpload/>*/}

                            </div>
                        </div>

                        <div className="space-50"></div>
                    </div>
                    <div className="col-6">
                        <label className="input-label">نام</label>
                        <div className="input-control disabled">{user.name}</div>
                    </div>
                    <div className="col-6">
                        <label className="input-label">نام خانوادگی</label>
                        <div className="input-control">{user.family}</div>
                    </div>
                    <div className="col-6 mt-3">
                        <label className="input-label">شماره همراه</label>
                        <div className="input-control">{user.phone}</div>
                    </div>

                    {user.local_id ?
                        <div className="col-6 mt-3">
                            <label className="input-label">کد ملی</label>
                            <div className="input-control">{user.local_id}</div>
                        </div> :
                        <div className="col-6  mt-3 ">
                            <label className="input-label">کد ملی</label>
                            {message ?
                                <div className="message">
                                    {message}
                                </div> : null
                            }
                            <div className="input position-relative">
                                <input
                                    type="number"
                                    placeholder="کد ملی 10 رقمی"
                                    value={localId}
                                    onChange={(e) => setLocalId(e.target.value)}
                                    className="input-control"/>
                                {!nickNameLoading ?
                                    <div className="spinner-container position-absolute">
                                        <div className="spinner"></div>
                                    </div> : null}
                                {sendDataError.hasOwnProperty() ?
                                    <span className="validate-error">
                                   {sendDataError.local_id}
                                </span>
                                    : null}
                                {sendDataError.local_id ?
                                    <span className="validate-error ">
                                   {sendDataError.local_id}
                                </span>
                                    : null}
                            </div>
                        </div>
                    }
                    {user.email ?
                        <div className="col-12  mt-3">
                            <label className="input-label">ایمیل</label>
                            <div className="input-control text-left">{user.email}</div>
                        </div> : null}
                    {user.birth_date ?
                        <div className="col-6 mt-3">
                            <label className="input-label">تاریخ تولد</label>
                            <div className="input-control">{user.birth_date}</div>
                        </div> :
                        <div className="col-6  mt-3 ">
                            <label className="input-label">تاریخ تولد</label>
                            <div className="input position-relative">
                                <input
                                    type="text"
                                    placeholder="مثال : 1386/18/02"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="input-control"/>
                            </div>
                        </div>
                    }

                    {user.post_code ?
                        <div className="col-6 mt-3">
                            <label className="input-label">کد پستی</label>
                            <div className="input-control">{user.post_code}</div>
                        </div> :
                        <div className="col-6  mt-3 ">
                            <label className="input-label">کد پستی</label>
                            <div className="input position-relative">
                                <input
                                    type="number"
                                    placeholder="کد پستی 10 رقمی"
                                    value={postCode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                    className="input-control"/>
                                {sendDataError.post_code ?
                                    <span className="validate-error ">
                                   {sendDataError.post_code}
                                </span>
                                    : null}
                            </div>
                        </div>
                    }

                    {user.nickname ?
                        <div className="col-12  mt-3">
                            <label className="input-label">نام کاربری</label>
                            <div className="input-control">{user.nickname}</div>
                        </div> :
                        <div className="col-12  mt-3  position-relative">
                            <label className="input-label">نام کاربری</label>
                            {message ?
                                <div className="message-nick">
                                    {message}
                                </div> : null
                            }
                            {nickNameError.length ?
                                <div className="message-nick">
                                    نام کاربری مجاز نیست
                                </div> : null
                            }
                            <div className="input-nick position-relative">
                                <input
                                    type="text"
                                    style={message.length ? {borderColor: "#429434"} : null}
                                    placeholder="نام کاربری را وارد کنید"
                                    value={nickName}
                                    onChange={(e) => checkNickName(e.target.value)}
                                    className="input-control nickname-input"/>
                                {nickNameLoading ?
                                    <div style={{top: "2px"}} className="spinner-container position-absolute">
                                        <div className="spinner"></div>
                                    </div> : null}
                                {message.length ?
                                    <svg className="payment-status-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <circle className="circle success" cx="256" cy="256" r="256"></circle>
                                        <path className="path"
                                              d="M387.57,193.22l-141.73,155.36c-9.54,10.9-25.89,10.9-35.43,0l-59.96-66.78c-8.18-9.54-8.18-24.53,1.36-34.07,9.54-8.18,24.53-8.18,34.07,1.36l42.25,47.7,124.02-134.92c9.54-9.54,24.53-10.9,34.07-1.36,9.54,8.18,9.54,24.53,1.36,32.71h0Z"></path>
                                    </svg> : null}
                                {nickNameError.length ?
                                    <svg className="payment-status-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <circle className="circle error" cx="256" cy="256" r="256"/>
                                        <path className="path"
                                              d="M366.97,336.46c9.82,9.82,9.82,25.69,0,35.51-4.7,4.72-11.1,7.36-17.76,7.36-6.43,0-12.85-2.46-17.75-7.36l-75.46-75.46-75.46,75.46c-4.7,4.72-11.09,7.36-17.75,7.36-6.66,0-13.05-2.64-17.76-7.36-9.82-9.82-9.82-25.69,0-35.51l75.46-75.46-75.46-75.46c-9.82-9.82-9.82-25.69,0-35.51,9.82-9.82,25.69-9.82,35.51,0l75.46,75.46,75.46-75.46c9.82-9.82,25.69-9.82,35.51,0,9.82,9.82,9.82,25.69,0,35.51l-75.46,75.46,75.46,75.46Z"/>
                                    </svg> : null}
                            </div>
                            {sendDataError.nickname ?
                                <span className="validate-error ">
                                   {sendDataError.nickname}
                                </span>
                                : null}
                        </div>
                    }
                    {user.address ?
                        <div className="col-12 mt-3">
                            <label className="input-label">آدرس</label>
                            <div className="input-control">{user.address}</div>
                        </div> :
                        <div className="col-12  mt-3 ">
                            <label className="input-label">آدرس</label>
                            <div className="input position-relative">
                                <input
                                    type="text"
                                    placeholder="نشانی محل سکونت"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="input-control"/>
                            </div>
                        </div>
                    }

                    <div className="col-12 mt-3">
                        <label className="input-label">توضیحات پروفایل</label>
                        <div className="input position-relative">
                                <textarea
                                    rows={10}
                                    placeholder="توضیحات پروفایل ..."
                                    value={profileDescription}
                                    onChange={(e) => setProfileDescription(e.target.value)}
                                    className="input-control"/>
                        </div>
                    </div>


                    <div className="col-12">
                        {sendDataLoading ?
                            <span className="primary-btn twin-btn">
                                   <div className="loader-container">
                                       <div className="loader">
                                       </div>
                                   </div>
                                </span>
                            :
                            <li className="primary-btn twin-btn" onClick={() => updateProfile()}>
                                <svg className="game-setting-icons" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512.04 512.08">
                                    <path
                                        d="M0,154.32c0-7.51,3.93-14.44,10.35-18.28L220.74,9.81c21.7-13.08,48.85-13.08,70.55,0l210.37,126.23c10.1,6.07,13.36,19.18,7.29,29.28-1.8,2.99-4.3,5.49-7.29,7.29l-210.37,126.23c-21.7,13.05-48.83,13.05-70.53,0L10.35,172.63C3.93,168.77,0,161.83,0,154.34v-.02ZM490.67,405.41h-42.67v-42.67c0-11.78-9.55-21.33-21.33-21.33s-21.33,9.55-21.33,21.33v42.67h-42.67c-11.78,0-21.33,9.55-21.33,21.33s9.55,21.33,21.33,21.33h42.67v42.67c0,11.78,9.55,21.33,21.33,21.33s21.33-9.55,21.33-21.33v-42.67h42.67c11.78,0,21.33-9.55,21.33-21.33s-9.55-21.33-21.33-21.33ZM266.99,467.58L32.32,326.78c-10.1-6.06-23.21-2.79-29.27,7.32-6.06,10.1-2.79,23.21,7.32,29.27l234.67,140.8c10.1,6.06,23.2,2.79,29.26-7.31,6.06-10.1,2.79-23.2-7.31-29.26v-.02ZM479.7,229.35l-223.68,134.21L32.32,229.35c-10.1-6.06-23.21-2.79-29.27,7.32s-2.79,23.21,7.32,29.27l234.67,140.8c6.76,4.06,15.21,4.06,21.97,0l234.67-140.8c10.1-6.06,13.38-19.17,7.32-29.27s-19.17-13.38-29.27-7.32h-.02Z"/>
                                </svg>
                                بروز رسانی پروفایل
                            </li>
                        }
                    </div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                    <div className="space-25"></div>

                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 21.5">*/}
                    {/*    <path d="M13.25,7h-7c-.08,0-.17,0-.25.01v-2.89c0-1.45,1.18-2.62,2.62-2.62h2.3c1.42,0,2.57,1.15,2.57,2.57,0,.41.34.75.75.75s.75-.34.75-.75c0-2.25-1.83-4.07-4.07-4.07h-2.3c-2.27,0-4.12,1.85-4.12,4.12v3.13c-2.6.76-4.5,3.16-4.5,6v2c0,3.45,2.8,6.25,6.25,6.25h7c3.45,0,6.25-2.8,6.25-6.25v-2c0-3.45-2.8-6.25-6.25-6.25ZM18,15.25c0,2.62-2.13,4.75-4.75,4.75h-7c-2.62,0-4.75-2.13-4.75-4.75v-2c0-2.62,2.13-4.75,4.75-4.75h7c2.62,0,4.75,2.13,4.75,4.75v2Z"/>*/}
                    {/*    <path d="M9.75,11c-.96,0-1.75.79-1.75,1.75,0,.7.41,1.3,1,1.58v1.42c0,.41.34.75.75.75s.75-.34.75-.75v-1.42c.59-.28,1-.88,1-1.58,0-.96-.79-1.75-1.75-1.75ZM9.5,12.75c0-.14.11-.25.25-.25s.25.11.25.25c0,.28-.5.28-.5,0Z"/>*/}
                    {/*</svg>*/}
                    {/*تغییر کلمه عبور*/}

                </div>
            </div>
    )
}

export default UserInfo;
