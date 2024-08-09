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


import '../assets/css/bootstrap.min.css'
import "./Header.css";
import {Link} from "react-router-dom";

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
            profileBox : false,
            forgotEmail: "",
            searchModalShow : false,

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

    regReq() {
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'register',this.state.registerRequest)
            .then((response) => {
                console.log(response);

                console.log(response.data.success.token);
                localStorage.setItem("authToken" , response.data.success.token)
                setTimeout(()=> {this.getUserDetails()}, 300)
            })
            .catch((error) =>{
                console.log(error)
                // this.setState({
                //     regFailed:{
                //         status: true,
                //         messages : error.response.data.errors,
                //     }
                // });
                // this.setState({isLoading : false})
            });
    }

    loginReq() {
        this.setState({isLoading : true})
        axios.post(process.env.REACT_APP_API+'login',this.state.loginRequest)
            .then((response) => {
                // console.log("RESPONSE ->", response);
                localStorage.setItem("authToken" , response.data.token)
                setTimeout(()=> {this.getUserDetails()}, 300)

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
            // .catch((error) =>{
            //     this.setState({
            //         regFailed:{
            //             status: true,
            //             messages : error.response.data.error,
            //         }
            //     });
            //     this.setState({isLoading : false})
            //     console.log(error)
            // });

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
                //console.log(response);
                localStorage.setItem("userDetails" , JSON.stringify(response.data.success))
                localStorage.setItem("loggedIn" , true)
                this.setState({loggedIn : true})
                this.setState({isLoading : false})

                setTimeout(()=> { this.props.setLoginModal(false)}, 300)

                console.log("USER_DETAILS ->", response);
            })
            .catch((error) =>{
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <header className="col-12 d-none d-md-block">
                        <nav className="main-header">
                            <ul className="access">
                                <li className="item">
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
                                        <li onClick={() => localStorage.removeItem("authToken")}
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

                        <Modal show={this.props.loginModal} onHide={() => this.props.setLoginModal(!this.props.loginModal)} centered className="login-required">
                            <Modal.Header>
                                <Modal.Title>
                                    <button className="close" onClick={() => this.props.setLoginModal(!this.props.loginModal)}>
                                        <i className="fa-light fa-xmark"/>
                                    </button>
                                </Modal.Title>

                            </Modal.Header>
                            <Modal.Body>
                                {/*<div className="modal-logo">*/}
                                {/*    <img src={Logo} alt="logo"/>*/}

                                {/*</div>*/}
                                <div className="title">
                                    {
                                        this.state.forgot ?
                                            "کلمه عبور را فراموش کرده اید ؟"
                                            :
                                            "ورود یا ساخت حساب کاربری جدید"
                                    }
                                </div>
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
                                                    onChange = {(e) => this.handleInputChange(e)}/>
                                                {
                                                    this.state.regFailed.status && this.state.regFailed.messages.first_name?
                                                        <span className="validate-error">
                                                           {this.state.regFailed.messages.first_name}
                                                       </span>
                                                        : null
                                                }
                                            </div>
                                            <div className="item lastname">
                                                <input
                                                    id="lastName"
                                                    className="input-control"
                                                    type="text"
                                                    placeholder="نام خانوادگی"
                                                    value={this.state.registerRequest.last_name}
                                                    onChange = {(e) => this.handleInputChange(e)}/>
                                                {
                                                    this.state.regFailed.status && this.state.regFailed.messages.last_name?
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
                                            type="text"
                                            placeholder="شماره ملی"
                                            style={{marginTop : "10px"}}
                                            value={this.state.registerRequest.local_id}
                                            onChange = {(e) => this.handleInputChange(e)}/>
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
                                            style={{marginTop : "10px"}}
                                            value={this.state.registerRequest.email}
                                            onChange = {(e) => this.handleInputChange(e)}/>
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
                                            type="text"
                                            placeholder="شماره همراه"
                                            style={{marginTop : "10px"}}
                                            value={this.state.registerRequest.phone}
                                            onChange = {(e) => this.handleInputChange(e)}/>
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
                                            onChange = {(e) => this.handleInputChange(e)}/>
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
                                            onChange = {(e) => this.handleInputChange(e)}/>
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
                                            <span onClick={() => this.setState({reg: !this.state.reg, loginC: true})}>ورود به حساب کاربری</span>
                                        </div>
                                    </div>
                                </Collapse>

                                <Collapse className="login-collapse" in={this.state.loginC}>
                                    <div className="text-center">
                                        <input
                                            id="loginEmail"
                                            className="input-control"
                                            type="email"
                                            placeholder="ایمیل یا شماره همراه"
                                            style={{marginTop : "10px"}}
                                            value={this.state.loginRequest.email}
                                            onChange = {(e) => this.handleInputChange(e)}/>
                                        <input
                                            id="loginPassword"
                                            className="input-control"
                                            type="password"
                                            placeholder="کلمه عبور"
                                            value={this.state.loginRequest.password}
                                            onChange = {(e) => this.handleInputChange(e)}/>
                                        {
                                            this.state.regFailed.status &&  !localStorage.getItem("authToken") ?
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
                                                                this.setState({reg: false, loginC: false, forgot: !this.state.forgot})
                                                            }}>فراموشی کلمه عبور</span>
                                        </div>
                                    </div>
                                </Collapse>

                                <Collapse className="login-collapse" in={this.state.forgot} >
                                    <div  className="text-center">
                                        <input
                                            id="forgotEmail"
                                            className="input-control"
                                            type="email"
                                            placeholder="آدرس ایمیل"
                                            style={{marginTop : "10px"}}
                                            value={this.state.forgotEmail}
                                            onChange = {(e) => this.state.setState({forgotEmail : e.target.value})}/>
                                        {
                                            this.state.regFailed.status ?
                                                <span className="validate-error mb-3">
                                                                   Inserted Credentials Does Not Match !
                                                                </span>
                                                : null
                                        }
                                        <span onClick={this.loginReq} className="auth-btn load-btn login" href="">
                                                           {
                                                               this.state.isLoading?
                                                                   <div className="spinner-container">
                                                                       <div className="loading-spinner custom-spinner">
                                                                       </div>
                                                                   </div>
                                                                   :
                                                                   null
                                                           }
                                            <span className="tag">ارسال کد بازیابی</span>
                                                       </span>
                                        <div className="create">
                                           هنوز ثبت نام نکرده اید
                                            <span onClick={() =>this.setState({reg : true, loginC : false, forgot : false})}>ساخت حساب جدید</span>
                                        </div>
                                    </div>
                                </Collapse>


                                <div className="login-choices">
                                    <div className="content">
                                        برای ورود میتوانید از گزینه های زیر استفاده کنید
                                    </div>
                                    <a href="">
                                        <img src={GoogleLogo} alt="google"/>
                                    </a>
                                    <a href="">
                                        <img src={FacebookLogo} alt="Facebook"/>
                                    </a>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>

                                {/*<a className="auth-btn register" href="">Register</a>*/}

                                <div className="content">
                                    در صورت ورود یا ثبت نام شما
                                    <a className="pl-1 pr-1" href="">قوانین و ضوابط</a>
                                    پذیرفته اید
                                </div>
                            </Modal.Footer>
                        </Modal>
                    </header>
                </div>
            </div>
        );
    }
}

export default Header;

