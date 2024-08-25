import Collapse from "react-bootstrap/Collapse";
import Modal from "react-bootstrap/Modal";
import React, {Component} from 'react';
import axios from "axios";

import Logo from "../assets/21logo.svg";
import SearchIcon from "../assets/icons/search.svg";
import ThemeIcon from "../assets/icons/theme.svg";
import UserIcon from "../assets/icons/user.svg";
import GoogleLogo from "../assets/icons/google.svg";
import FacebookLogo from "../assets/icons/facebook.svg";
import toast, { Toaster } from 'react-hot-toast';

import '../assets/css/bootstrap.min.css'
import "./Header.css";
import {Link, useLocation} from "react-router-dom";
import CountDown from "../components/CountDown";
import MobileHeader from "../components/MobileHeader";
import Search from "../components/Search";

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user : props.user,
            isLoggedIn : false,
            login : false,
            loggedIn : localStorage.getItem("authToken") ? true : false,
            isLoading : false,
            forgot : false,
            loginC : true,
            activeAccount : false,
            profileBox : false,
            verifyCode: "",
            forgotPhone: "",
            forgotCode: "",
            resetPasswordConfirmation: "",
            showPassword: false,
            resetPasswordInput: "",
            showResetPassword: false,
            showForgotPassword: false,
            //showSearchModal : false,

            reg : false,
            registerRequest : {
                first_name : "",
                last_name : "",
                local_id : "",
                phone : "",
                email : "",
                password : "",
                password_confirmation : "",
            },
            loginRequest : {
                email : "",
                password : "",
            },
            regSuccess : false,
            regFailed : {
                status : false,
                message : {}
            },
            //city : null
        };
        this.regReq = this.regReq.bind(this)
        this.loginReq = this.loginReq.bind(this)
        this.verifyUser = this.verifyUser.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.checkForgotPassword = this.checkForgotPassword.bind(this)

    }
    handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    first_name : value,
                }
            }));
        }
        if(id === "lastName"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    last_name : value,
                }
            }));
        }
        if(id === "local_id"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    local_id : value,
                }
            }));
        }
        if(id === "email"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    email : value,
                }
            }));
        }
        if(id === "phone"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    phone : value,
                }
            }));
        }
        if(id === "password"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    password : value,
                }
            }));
        }
        if(id === "confirmPassword"){
            this.setState(prevState =>({
                registerRequest:{
                    ...prevState.registerRequest,
                    password_confirmation : value,
                }
            }));
        }
        if(id === "loginEmail"){
            this.setState(prevState =>({
                loginRequest:{
                    ...prevState.loginRequest,
                    email : value,
                }
            }));
        }
        if(id === "loginPassword"){
            this.setState(prevState =>({
                loginRequest:{
                    ...prevState.loginRequest,
                    password : value,
                }
            }));
        }
    }

    forgotPassword (){
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'forgot/password', {phone : this.state.forgotPhone ?? null})
            .then((response) => {
                console.log(response);
                this.setState({
                    showForgotPassword : true,
                    forgot : false
                })
                this.setState({
                    regFailed:{
                        status: false,
                        messages : null,
                    }
                });
                this.setState({isLoading : false})
            })
            .catch((error) =>{
                console.log(error.response.data)
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data.message,
                    }
                });
                this.setState({isLoading : false})
            });
    }
    checkForgotPassword (){
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'forgot/password/code', {
            phone : this.state.forgotPhone ?? null,
            code : this.state.forgotCode ?? null})
            .then((response) => {
                this.setState({
                    regFailed:{
                        status: false,
                        messages : null
                    }
                });
                localStorage.setItem("authToken" , response.data.token)
                this.setState({
                    showResetPassword : true,
                    showForgotPassword : false
                })
                this.setState({isLoading : false})
            })
            .catch((error) =>{
                console.log(error)
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data.message,
                    }
                });
                this.setState({isLoading : false})
            });
    }
    resetPassword (){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'forgot/password/reset', {
            password : this.state.resetPasswordInput ?? null,
            password_confirmation : this.state.resetPasswordConfirmation}, {headers : headers})
            .then((response) => {
                console.log(response);
                this.setState({
                    regFailed:{
                        status: false,
                        messages : null,
                    }
                });
                toast.success(response.data);
                this.setState({isLoading : false})
                setTimeout(()=> { this.props.setLoginModal(false)}, 300)
            })
            .catch((error) =>{
                console.log(error)
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data.message,
                    }
                });
                this.setState({isLoading : false})
            });
    }


    regReq() {
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'register',this.state.registerRequest)
            .then((response) => {
                console.log(response);
                localStorage.setItem("authToken" , response.data.token)

                this.setState({
                    activeAccount : true,
                    reg : false
                })
                setTimeout(()=> {this.getUserDetails()}, 300)
            })
            .catch((error) =>{
                console.log(error)
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data.errors,
                    }
                });
                this.setState({isLoading : false})
            });
    }

    verifyUser(){
        this.setState({isLoading : true})
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        axios.post(process.env.REACT_APP_API+'user/verify',
            {code : this.state.verifyCode}, {headers : headers})
            .then((response) => {
                toast.success(response.data);
                setTimeout(()=> { this.props.setLoginModal(false)}, 300)
                this.setState({isLoading : false})
            })
            .catch((error) =>{
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data,
                    }
                });
                this.setState({isLoading : false})
            });
    }

    loginReq() {
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'login',this.state.loginRequest)
            .then((response) => {
                // console.log("RESPONSE ->", response);
                localStorage.setItem("authToken" , response.data.token)
                setTimeout(()=> {this.getUserDetails()}, 300)
                setTimeout(()=> { this.props.setLoginModal(false)}, 300)

            })
            .catch((error) =>{
                //console.log(this.state.registerRequest)
                console.log(error.response.data.message);
                this.setState({
                    regFailed:{
                        status: true,
                        messages : error.response.data.message,
                    }
                });
                this.setState({isLoading : false})
            });
    }

    getUserDetails () {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        axios.post(process.env.REACT_APP_API+'user', null ,{
            headers: headers
        })
            .then((response) => {
                console.log(response);
                console.log(localStorage);
                localStorage.setItem("userDetails" , JSON.stringify(response.data))
                localStorage.setItem("loggedIn" , true)
                this.setState({loggedIn : true})
                this.setState({isLoading : false})

                toast.success(response.data.name+" عـزیـز، خوش اومدی")

                console.log("USER_DETAILS ->", response);
            })
            .catch((error) =>{
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    render(){
        return (
            <>
                <div className="container d-none d-md-block">
                    <Toaster/>
                    <div className="row">
                        <header className="col-12">
                            <nav className="main-header">
                                <ul className="access">
                                    <li className="item" >
                                        <img src={SearchIcon} alt="Search"/>

                                    </li>
                                    <li className="item">
                                        <img src={ThemeIcon} alt="Theme"/>
                                    </li>
                                    {
                                        !this.state.loggedIn ?
                                            <li onClick={() => this.props.setLoginModal(!this.props.loginModal)}
                                                className="item">
                                                <img src={UserIcon} alt="User"/>
                                            </li>
                                            :
                                            <li onClick={() => this.props.setLoginModal(!this.props.loginModal)}
                                                className="item">
                                                <img src={UserIcon} alt="User"/>
                                            </li>
                                        /*<li className="item">
                                            <Link to="dashboard"> <img src={UserIcon} alt="User"/></Link>
                                        </li>*/
                                    }
                                </ul>

                                <ul className="header-tags">
                                    <li className="item"><a href="/">خانه</a></li>
                                    <li className="item"><a href="/">مسابقات</a></li>
                                    <li className="item"><a href="/">مقالات</a></li>
                                    <li className="item"><a href="/">بازیکنان برتر</a></li>
                                    <li className="item"><a href="/">قوانین</a></li>
                                    <li className="item"><a href="/">تماس با ما</a></li>
                                </ul>


                                <div className="logo">
                                    <a href="/">
                                        <img src={Logo} alt="21Sport"/>
                                    </a>
                                </div>
                            </nav>

                            <Modal show={this.props.loginModal}
                                   onHide={() => this.props.setLoginModal(!this.props.loginModal)} centered
                                   className="login-required custom-modal">
                                <Modal.Header>
                                    <Modal.Title>
                                        {this.state.reg || this.state.loginC  ?
                                            "ورود یا ساخت حساب کاربری جدید"
                                            :this.state.forgot?
                                            "کلمه عبور را فراموش کرده اید ؟"
                                                :this.state.showResetPassword?
                                                    "تغییر کلمه عبور"
                                                    :
                                                    "بازیابی کلمه عبور"
                                        }
                                    </Modal.Title>
                                    <svg onClick={() => this.props.setLoginModal(!this.props.loginModal)}
                                         className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 211 211">
                                        <path
                                            d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                                    </svg>

                                </Modal.Header>
                                <Modal.Body>
                                    {/*<div className="modal-logo">*/}
                                    {/*    <img src={Logo} alt="logo"/>*/}

                                    {/*</div>*/}
                                    {/*<div className="title">*/}
                                    {/*    {*/}
                                    {/*        this.state.forgot ?*/}
                                    {/*            "جای نگرانی نیست، شماره خود را وارد کنید"*/}
                                    {/*            :*/}
                                    {/*            "برای تجربه ای بهتر لطفا با حساب خود وارد شوید"*/}
                                    {/*    }*/}
                                    {/*</div>*/}
                                    <Collapse in={this.state.reg}>
                                        <div className="text-center reg-form">
                                            <div className="name-control d-flex justify-content-between">
                                                <div className="item">
                                                    <input
                                                        id="firstName"
                                                        className="input-control"
                                                        type="text"
                                                        placeholder="نــام"
                                                        value={this.state.registerRequest.first_name}
                                                        onChange={(e) => this.handleInputChange(e)}/>
                                                    {
                                                        this.state.regFailed.status && this.state.regFailed.messages.first_name ?
                                                            <span className="validate-error">
                                                           {this.state.regFailed.messages.first_name}
                                                       </span>
                                                            : null
                                                    }
                                                </div>
                                                <div className="item lastname pr-2">
                                                    <input
                                                        id="lastName"
                                                        className="input-control"
                                                        type="text"
                                                        placeholder="نام خانوادگی"
                                                        value={this.state.registerRequest.last_name}
                                                        onChange={(e) => this.handleInputChange(e)}/>
                                                    {
                                                        this.state.regFailed.status && this.state.regFailed.messages.last_name ?
                                                            <span className="validate-error">
                                                           {this.state.regFailed.messages.last_name}
                                                       </span>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                            <input
                                                id="local_id"
                                                className="input-control"
                                                type="number"
                                                placeholder="شماره ملی"
                                                style={{marginTop: "10px"}}
                                                value={this.state.registerRequest.local_id}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages.local_id ?
                                                    <span className="validate-error">
                                                           {this.state.regFailed.messages.local_id}
                                                       </span>
                                                    : null
                                            }
                                            <input
                                                id="email"
                                                className="input-control"
                                                type="email"
                                                placeholder="آدرس ایمیل"
                                                style={{marginTop: "10px"}}
                                                value={this.state.registerRequest.email}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages.email ?
                                                    <span className="validate-error">
                                                           {this.state.regFailed.messages.email}
                                                       </span>
                                                    : null
                                            }
                                            <input
                                                id="phone"
                                                className="input-control"
                                                type="number"
                                                placeholder="شماره همراه"
                                                style={{marginTop: "10px"}}
                                                value={this.state.registerRequest.phone}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages.phone ?
                                                    <span className="validate-error">
                                                           {this.state.regFailed.messages.phone}
                                                       </span>
                                                    : null
                                            }
                                            <input
                                                id="password"
                                                className="input-control"
                                                type="password"
                                                placeholder="کلمه عبور"
                                                value={this.state.registerRequest.password}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages.password ?
                                                    <span className="validate-error">
                                                           {this.state.regFailed.messages.password}
                                                       </span>
                                                    : null
                                            }
                                            <input
                                                id="confirmPassword" className="input-control"
                                                type="password"
                                                placeholder="تکرار کلمه عبور"
                                                value={this.state.registerRequest.password_confirmation}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages.password_confirmation ?
                                                    <span className="validate-error">
                                                           {this.state.regFailed.messages.password_confirmation}
                                                       </span>
                                                    : null
                                            }


                                            {this.state.isLoading ?
                                                <span
                                                    className="auth-btn load-btn login mt-3">
                                                   <div className="loader-container">
                                                       <div className="loader">
                                                       </div>
                                                   </div>
                                            </span>
                                                :
                                                <span
                                                    onClick={this.regReq}
                                                    className="auth-btn load-btn login mt-3">
                                                <span className="tag">ساخت حساب جدید</span>
                                            </span>
                                            }
                                            <div className="create">
                                                قبلا ثبت نام کردید
                                                <span
                                                    onClick={() => this.setState({reg: !this.state.reg, loginC: true})}>ورود به حساب کاربری</span>
                                            </div>
                                        </div>
                                    </Collapse>

                                    <Collapse className="login-collapse" in={this.state.loginC}>
                                        <div className="text-center">
                                            <input
                                                id="loginEmail"
                                                className="input-control"
                                                type="email"
                                                placeholder="نام کاربری یا شماره همراه"
                                                style={{marginTop: "10px"}}
                                                value={this.state.loginRequest.email}
                                                onChange={(e) => this.handleInputChange(e)}/>
                                            <div className="position-relative">
                                                <input
                                                    id="loginPassword"
                                                    className="input-control"
                                                    type={this.state.showPassword ? "text" : "password"}
                                                    placeholder="کلمه عبور"
                                                    value={this.state.loginRequest.password}
                                                    onChange={(e) => this.handleInputChange(e)}/>
                                                {this.state.showPassword ?

                                                    <svg
                                                        onClick={() => this.setState({showPassword: !this.state.showPassword})}
                                                        className="show-password-icon hide"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 469.03">
                                                        <path
                                                            d="M496.36,179.21c-19.25-31.52-43.54-59.68-71.89-83.36l59.71-59.71c8.18-8.47,7.95-21.97-.52-30.15-8.26-7.98-21.37-7.98-29.63,0l-64.94,65.02c-40.25-23.91-86.27-36.37-133.09-36.04C123.97,34.97,48.74,125.35,15.64,179.21c-20.85,33.73-20.85,76.35,0,110.08,19.25,31.52,43.54,59.68,71.89,83.36l-59.71,59.71c-8.47,8.18-8.71,21.68-.52,30.15,8.18,8.47,21.68,8.71,30.15.52.18-.17.35-.35.52-.52l65.08-65.08c40.2,23.91,86.17,36.39,132.94,36.1,132.03,0,207.26-90.38,240.36-144.25,20.86-33.73,20.86-76.35,0-110.08h0ZM128.05,234.25c-.12-70.55,56.97-127.84,127.52-127.96,26.69-.05,52.73,8.27,74.45,23.78l-30.96,30.96c-13-7.84-27.88-12.02-43.06-12.09-47.11,0-85.3,38.19-85.3,85.3.07,15.18,4.25,30.06,12.09,43.06l-30.96,30.96c-15.46-21.58-23.78-47.47-23.78-74.02h0ZM256,362.21c-26.55,0-52.44-8.32-74.02-23.78l30.96-30.96c13,7.84,27.88,12.02,43.06,12.09,47.11,0,85.3-38.19,85.3-85.3-.07-15.18-4.25-30.06-12.09-43.06l30.96-30.96c41,57.41,27.69,137.19-29.72,178.19-21.72,15.51-47.76,23.83-74.45,23.78h0Z"/>
                                                    </svg>
                                                    :
                                                    <svg
                                                        onClick={() => this.setState({showPassword: !this.state.showPassword})}
                                                        className="show-password-icon"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 398.57">
                                                        <circle cx="256" cy="199.29" r="85.3"/>
                                                        <path
                                                            d="M496.36,144.25C463.28,90.38,388.05,0,256,0S48.72,90.38,15.64,144.25c-20.85,33.73-20.85,76.35,0,110.08,33.08,53.87,108.31,144.25,240.36,144.25s207.28-90.38,240.36-144.25c20.85-33.73,20.85-76.35,0-110.08h0ZM256,327.24c-70.67,0-127.95-57.29-127.95-127.95s57.29-127.95,127.95-127.95,127.95,57.29,127.95,127.95c-.07,70.64-57.32,127.88-127.95,127.95Z"/>
                                                    </svg>
                                                }

                                            </div>
                                            {
                                                this.state.regFailed.status && !localStorage.getItem("authToken") ?
                                                    <div className="validate-error mb-3">
                                                        اطلاعات ورودی نادرست است !
                                                    </div>
                                                    : null
                                            }
                                            {
                                                localStorage.getItem("authToken") ?
                                                    <div className="validate-success mb-3">
                                                    شما با موفقیت وارد شدید
                                                    </div>
                                                    : null
                                            }

                                            {this.state.isLoading ?
                                                <span className="auth-btn load-btn login ">
                                               <div className="loader-container">
                                                   <div className="loader">
                                                   </div>
                                               </div>
                                            </span>
                                                :
                                                <span onClick={this.loginReq} className="auth-btn load-btn login ">
                                               <span className="tag"> ورود به حساب</span>
                                            </span>
                                            }

                                            <div className="create mt-3">
                                                هنوز ثبت نام نکرده اید ؟
                                                <span onClick={() => this.setState({
                                                    reg: true,
                                                    forgot: false,
                                                    loginC: false
                                                })}>ساخت حساب جدید</span>
                                            </div>
                                            <div className="create">
                                                            <span onClick={() => {
                                                                this.setState({
                                                                    reg: false,
                                                                    loginC: false,
                                                                    forgot: !this.state.forgot
                                                                })
                                                            }}>فراموشی کلمه عبور</span>
                                            </div>
                                        </div>
                                    </Collapse>

                                    <Collapse className="login-collapse" in={this.state.forgot}>
                                        <div className="text-center">
                                            <input
                                                id="forgotEmail"
                                                className="input-control"
                                                type="text"
                                                placeholder="شماره همراه"
                                                style={{marginTop: "10px"}}
                                                value={this.state.forgotPhone}
                                                onChange={(e) => this.setState({forgotPhone: e.target.value})}/>
                                            {
                                                this.state.regFailed.status ?
                                                    <span className="validate-error mb-3">
                                                                   شماره تماس وارد شده صحیح نمی باشد
                                                                </span>
                                                    : null
                                            }
                                            {this.state.isLoading ?
                                                <span
                                                    className="auth-btn load-btn login mt-3">
                                                   <div className="loader-container">
                                                       <div className="loader">
                                                       </div>
                                                   </div>
                                            </span>
                                                :
                                                <span
                                                    onClick={this.forgotPassword}
                                                    className="auth-btn load-btn login mt-1">
                                                <span className="tag">ارسال کد بازیابی</span>
                                            </span>
                                            }
                                            <div className="create">
                                                هنوز ثبت نام نکرده اید
                                                <span onClick={() => this.setState({
                                                    reg: true,
                                                    loginC: false,
                                                    forgot: false
                                                })}>ساخت حساب جدید</span>
                                            </div>
                                        </div>
                                    </Collapse>

                                    <Collapse className="login-collapse" in={this.state.activeAccount}>
                                        <div className="text-center">
                                            <div className="count-down">
                                                <span className="txt">لطفا کد ارسال شده را وارد کنید</span>
                                                <CountDown/>
                                            </div>
                                            <input
                                                className="input-control text-center"
                                                type="number"
                                                placeholder="کد 4 رقمی ارسال شده را وارد کنید"
                                                maxLength="4"
                                                value={this.state.verifyCode}
                                                onChange={(e) => this.setState({verifyCode: e.target.value})}/>

                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages ?
                                                    <span className="validate-error mb-3">
                                                           {this.state.regFailed.messages}
                                                       </span>
                                                    : null
                                            }


                                            {this.state.isLoading ?
                                                <span className="auth-btn load-btn login mb-3">
                                               <div className="loader-container">
                                                   <div className="loader">
                                                   </div>
                                               </div>
                                            </span>
                                                :
                                                <span onClick={this.verifyUser} className="auth-btn load-btn login  mb-3">
                                               <span className="tag">تـایـیـد کـد</span>
                                            </span>
                                            }

                                            <div className="create mt-3">
                                                هنوز ثبت نام نکرده اید ؟
                                                <span onClick={() => this.setState({
                                                    reg: true,
                                                    forgot: false,
                                                    loginC: false
                                                })}>ساخت حساب جدید</span>
                                            </div>
                                            <div className="create">
                                                            <span onClick={() => {
                                                                this.setState({
                                                                    reg: false,
                                                                    loginC: false,
                                                                    forgot: !this.state.forgot
                                                                })
                                                            }}>فراموشی کلمه عبور</span>
                                            </div>
                                        </div>
                                    </Collapse>

                                    <Collapse className="login-collapse" in={this.state.showForgotPassword}>
                                        <div className="text-center">
                                            <div className="count-down">
                                                <span className="txt">لطفا کد ارسال شده را وارد کنید</span>
                                                <CountDown phone={this.state.forgotPhone}/>
                                            </div>
                                            <input
                                                className="input-control text-center"
                                                type="number"
                                                placeholder="کد 4 رقمی ارسال شده را وارد کنید"
                                                maxLength="4"
                                                value={this.state.forgotCode}
                                                onChange={(e) => this.setState({forgotCode: e.target.value})}/>

                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages ?
                                                    <span className="validate-error mb-3">
                                                           {this.state.regFailed.messages}
                                                       </span>
                                                    : null
                                            }


                                            {this.state.isLoading ?
                                                <span className="auth-btn load-btn login  mb-3">
                                               <div className="loader-container">
                                                   <div className="loader">
                                                   </div>
                                               </div>
                                            </span>
                                                :
                                                <span onClick={this.checkForgotPassword} className="auth-btn load-btn login  mb-3">
                                               <span className="tag">تـایـیـد کـد</span>
                                            </span>
                                            }

                                        </div>
                                    </Collapse>

                                    <Collapse className="login-collapse" in={this.state.showResetPassword}>
                                        <div className="text-center">
                                            <div className="count-down">
                                                <span className="txt">کلمه عبور جدید خود را وارد کنید</span>
                                            </div>
                                            <input
                                                className="input-control text-center"
                                                type="password"
                                                placeholder="کلمه عبور جدید"
                                                value={this.state.resetPasswordInput}
                                                onChange={(e) => this.setState({resetPasswordInput: e.target.value})}/>
                                            <input
                                                className="input-control text-center"
                                                type="password"
                                                placeholder="تکرار کلمه عبور جدید"
                                                value={this.state.resetPasswordConfirmation}
                                                onChange={(e) => this.setState({resetPasswordConfirmation: e.target.value})}/>

                                            {
                                                this.state.regFailed.status && this.state.regFailed.messages ?
                                                    <span className="validate-error mb-3">
                                                           {this.state.regFailed.messages}
                                                       </span>
                                                    : null
                                            }


                                            {this.state.isLoading ?
                                                <span className="auth-btn load-btn login mb-3">
                                               <div className="loader-container">
                                                   <div className="loader">
                                                   </div>
                                               </div>
                                            </span>
                                                :
                                                <span onClick={this.resetPassword}
                                                      className="auth-btn load-btn login mb-3">
                                               <span className="tag">تغییر کلمه عبور</span>
                                            </span>
                                            }
                                        </div>
                                    </Collapse>

                                    {/*<div className="login-choices">
                                    <div className="content">
                                        برای ورود میتوانید از گزینه های زیر استفاده کنید
                                    </div>
                                    <a href="">
                                        <img src={GoogleLogo} alt="google"/>
                                    </a>
                                    <a href="">
                                        <img src={FacebookLogo} alt="Facebook"/>
                                    </a>
                                </div>*/}

                                </Modal.Body>
                                <Modal.Footer>

                                    {/*<a className="auth-btn register" href="">Register</a>*/}

                                    <div className="content">
                                        در صورت ورود یا ثبت نام شما
                                        <a className="pl-1 pr-1" href="">قوانین و مقررات</a>
                                        را پذیرفته اید
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </header>
                    </div>
                </div>
                <MobileHeader/>
            </>
        );
    }
}

export default Header;

