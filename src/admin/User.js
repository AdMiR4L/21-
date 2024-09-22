
import UserProfile from "../assets/icons/user-profile.svg";
import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import Modal from "react-bootstrap/Modal";
import AvatarUpload from "../dashboard/AvatarUpload";



function User() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [nickName, setNickName] = useState("");
    const [localId, setLocalId] = useState("");
    const [profileDescription, setProfileDescription] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [postCode, setPostCode] = useState("");
    const [address, setAddress] = useState("");
    const [grade, setGrade] = useState("");
    const [role, setRole] = useState("");
    const [nickNameLoading, setNickNameLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [nickNameError, setNickNameError] = useState([]);
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [sendDataError, setSendDataError] = useState([]);
    const {id} = useParams();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [resetPasswordErrors, setResetPasswordErrors] = useState([]);
    const grades = [21, "A", "B", "C", "D"];
    const roles = ["Admin", "Master", "User"];
    const [gradeSelection, setGradeSelection] = useState(false)
    const [roleSelection, setRoleSelection] = useState(false)
    const [resetPasswordInput, setResetPasswordInput] = useState("");
    const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [familyInput, setFamilyInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [emailInput, setEmailInput] = useState("");


    function get() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setLoading(true)
        axios.get(process.env.REACT_APP_API + 'admin/users/'+id, {
            headers: headers
        })
            .then((response) => {
                setUser(response.data)
                console.log(response)
                setNameInput(response.data.name)
                setFamilyInput(response.data.family)
                setPhoneInput(response.data.phone)
                setEmailInput(response.data.email)
                setLocalId(response.data.local_id)
                setGrade(response.data.grade)
                setRole(response.data.role)
                setBirthDate(response.data.birth_date)
                setPostCode(response.data.post_code)
                setAddress(response.data.address)
                setProfileDescription(response.data.description)
                setNickName(response.data.nickname)
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    function resetPassword (){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        setSendDataLoading(true)
        axios.post(process.env.REACT_APP_API+'admin/user/password', {
            password : resetPasswordInput ?? null,
            password_confirmation : resetPasswordConfirm ?? null}, {headers : headers})
            .then((response) => {
                console.log(response);
                toast.success(response.data);
                setSendDataLoading(false)
                setResetPasswordErrors([])
                setTimeout(()=> { setShowChangePasswordModal(false)}, 300)
            })
            .catch((error) =>{
                console.log(error.response.data.errors)
                const errorMessages = Array.isArray(error.response.data.errors)
                    ? error.response.data.errors
                    : Object.values(error.response.data.errors || {}).flat();
                setResetPasswordErrors(errorMessages)
                setSendDataLoading(false)
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
        axios.post(process.env.REACT_APP_API + 'admin/user/update/'+id,
            {
                name : nameInput ?? null,
                family : familyInput ?? null,
                phone : phoneInput ?? null,
                email : emailInput ?? null,
                nickname : nickName ?? null,
                post_code : postCode ?? null,
                address : address ?? null,
                birth_date: birthDate ?? null,
                local_id: localId ?? null,
                grade: grade ?? null,
                role: role ?? null,
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
                            <div className=" mr-4 d-inline-block">
                                <Skeleton width={"12rem"} height={"25px"}/>
                                <div className="mt-2">
                                    <Skeleton width={"12rem"} border={1} height={"35px"}/>
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
                <Modal show={showChangePasswordModal} onHide={() => setShowChangePasswordModal(false)} centered className="edit-game-modal custom-modal">
                    <Modal.Header>
                        <Modal.Title>
                            تغیر کلمه عبور
                        </Modal.Title>
                        <svg onClick={() => setShowChangePasswordModal(false)}
                             className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 211 211">
                            <path
                                d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                        </svg>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-center">
                            <div className="count-down">
                                <span className="txt">کلمه عبور جدید خود را وارد کنید</span>
                            </div>
                            <input
                                className="input-control text-center mb-3"
                                type="password"
                                placeholder="کلمه عبور جدید"
                                autoComplete="new-password"
                                value={resetPasswordInput || ""}
                                onChange={(e) => setResetPasswordInput(e.target.value)}/>
                            <input
                                className="input-control text-center"
                                type="password"
                                placeholder="تکرار کلمه عبور جدید"
                                autoComplete="new-password"
                                value={resetPasswordConfirm || ""}
                                onChange={(e) => setResetPasswordConfirm(e.target.value)}/>

                            {resetPasswordErrors ?
                                resetPasswordErrors.map((error, index) => (
                                    <span style={{fontFamily :"iranyekan"}} key={index} className="validate-error mt-3">
                                                           {error}
                                   </span>
                                )) : null
                            }

                            <div onClick={() => setShowChangePasswordModal(false)}
                                 className="secondary-btn twin-buttons">انصراف
                            </div>
                            {sendDataLoading ?
                                <div className="twin-buttons primary-btn">
                                    <div className="loader-container ">
                                        <div className="loader">
                                        </div>
                                    </div>
                                </div>
                                :
                                <div onClick={() => resetPassword()}
                                     className="twin-buttons primary-btn">
                                    <span className="tag">تغییر کلمه عبور</span>
                                </div>
                            }
                        </div>

                    </Modal.Body>

                </Modal>

                <div className="space-50"></div>
                <div className="row user-info-page">
                    <div className="col-12">
                        <div className="user-info-top">
                            <div className={`avatar-container ${user.photo_id ? 'has-avatar' : ''}`}>
                                {user.photo_id ?
                                    <img src={user.avatar} alt="profile"/>
                                    :
                                    <img src={UserProfile} alt="profile"/>
                                }
                                <AvatarUpload update={get}/>
                            </div>
                            <div className="next-to-avatar">
                                <div className="account-status">
                                    <div className="attr">
                                        وضعیت حساب کاربری
                                    </div>
                                    {user.status === 1 ?
                                        <div className="active">
                                            <svg className="payment-status-icon mr-0 ml-2"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <circle className="circle success" cx="256" cy="256" r="256"/>
                                                <path className="path"
                                                      d="M387.57,193.22l-141.73,155.36c-9.54,10.9-25.89,10.9-35.43,0l-59.96-66.78c-8.18-9.54-8.18-24.53,1.36-34.07,9.54-8.18,24.53-8.18,34.07,1.36l42.25,47.7,124.02-134.92c9.54-9.54,24.53-10.9,34.07-1.36,9.54,8.18,9.54,24.53,1.36,32.71h0Z"/>
                                            </svg>
                                            احراز شده

                                        </div>
                                        :
                                        <div className="active">
                                            <svg className="payment-status-icon mr-0 ml-2"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 512 512">
                                                <circle className="circle error" cx="256" cy="256" r="256"/>
                                                <path className="path"
                                                      d="M366.97,336.46c9.82,9.82,9.82,25.69,0,35.51-4.7,4.72-11.1,7.36-17.76,7.36-6.43,0-12.85-2.46-17.75-7.36l-75.46-75.46-75.46,75.46c-4.7,4.72-11.09,7.36-17.75,7.36-6.66,0-13.05-2.64-17.76-7.36-9.82-9.82-9.82-25.69,0-35.51l75.46-75.46-75.46-75.46c-9.82-9.82-9.82-25.69,0-35.51,9.82-9.82,25.69-9.82,35.51,0l75.46,75.46,75.46-75.46c9.82-9.82,25.69-9.82,35.51,0,9.82,9.82,9.82,25.69,0,35.51l-75.46,75.46,75.46,75.46Z"/>
                                            </svg>
                                            غیر فعال

                                        </div>
                                    }
                                </div>
                                <div className="change-password"
                                     onClick={() => setShowChangePasswordModal(!showChangePasswordModal)}>
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
                        <input
                            type="text"
                            value={nameInput || ""}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="input-control"/>
                    </div>
                    <div className="col-6">
                        <label className="input-label">نام خانوادگی</label>
                        <input
                            type="text"
                            value={familyInput || ""}
                            onChange={(e) => setFamilyInput(e.target.value)}
                            className="input-control"/>
                    </div>
                    <div className="col-6 mt-3">
                        <label className="input-label">شماره همراه</label>
                        <input
                            type="text"
                            value={phoneInput || ""}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            className="input-control"/>
                    </div>

                    <div className="col-6  mt-3 ">
                        <label className="input-label">کد ملی</label>
                        <input
                            type="number"
                            placeholder="کد ملی 10 رقمی"
                            value={localId || ""}
                            onChange={(e) => setLocalId(e.target.value)}
                            className="input-control"/>
                    </div>
                    <div className="col-6 mt-3">
                        <label className="input-label">سطح پرفایل</label>
                        <div onClick={() => setGradeSelection(!gradeSelection)}
                             className="input-control position-relative">{grade}
                            {gradeSelection ?
                                <ul style={{right: 0, transform: "translateY(10px)"}} className="custom-select-input">
                                    {grades.map((item, index) => (
                                        <li
                                            key={index}
                                            className="item"
                                            onClick={() => {
                                                setGrade(item);
                                                setGradeSelection(!gradeSelection);
                                            }}
                                        >{item}
                                        </li>
                                    ))}
                                </ul> : null}
                        </div>
                    </div>
                    <div className="col-6 mt-3 position-relative">
                        <label className="input-label">سطح دسترسی</label>
                        <div onClick={() => setRoleSelection(!roleSelection)}
                             className="input-control position-relative">{role}
                            {roleSelection ?
                                <ul style={{right: 0, transform: "translateY(10px)"}} className="custom-select-input">
                                    {roles.map((item, index) => (
                                        <li
                                            key={index}
                                            className="item"
                                            onClick={() => {
                                                setRole(item);
                                                setRoleSelection(!roleSelection);
                                            }}
                                        >{item}
                                        </li>
                                    ))}
                                </ul> : null}
                        </div>
                    </div>

                    <div className="col-12  mt-3">
                        <label className="input-label">ایمیل</label>
                        <input
                            type="email"
                            placeholder="آدرس ایمیل"
                            value={emailInput || ""}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="input-control text-left"/>
                    </div>
                    <div className="col-6  mt-3 ">
                        <label className="input-label">تاریخ تولد</label>
                        <div className="input position-relative">
                            <input
                                type="text"
                                placeholder="مثال : 1386/18/02"
                                value={birthDate || ""}
                                onChange={(e) => setBirthDate(e.target.value)}
                                className="input-control"/>
                        </div>
                    </div>

                    <div className="col-6  mt-3 ">
                        <label className="input-label">کد پستی</label>
                        <div className="input position-relative">
                            <input
                                type="number"
                                placeholder="کد پستی 10 رقمی"
                                value={postCode || ""}
                                onChange={(e) => setPostCode(e.target.value)}
                                className="input-control"/>
                            {sendDataError.post_code ?
                                <span className="validate-error ">
                                   {sendDataError.post_code}
                                </span>
                                : null}
                        </div>
                    </div>

                    <div className="col-12  mt-3  position-relative">
                        <label className="input-label">نام کاربری</label>
                        {message ?
                            <div className="message-nick">
                                {message}
                            </div> : null
                        }
                        {nickNameError.length ?
                            <div className="message-nick">
                                {nickNameError}
                            </div> : null
                        }
                        <div className="input-nick position-relative">
                            <input
                                type="text"
                                style={message.length ? {borderColor: "#429434"} : null}
                                placeholder="نام کاربری را وارد کنید"
                                value={nickName || ""}
                                name="nickname"
                                autoComplete="new-nickname"
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
                    <div className="col-12  mt-3 ">
                        <label className="input-label">آدرس</label>
                        <div className="input position-relative">
                            <input
                                type="text"
                                placeholder="نشانی محل سکونت"
                                value={address || ""}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input-control"/>
                        </div>
                    </div>

                    <div className="col-12 mt-3">
                        <label className="input-label">توضیحات پروفایل</label>
                        <div className="input position-relative">
                                <textarea
                                    rows={10}
                                    placeholder="توضیحات پروفایل ..."
                                    value={profileDescription || ""}
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

export default User;
