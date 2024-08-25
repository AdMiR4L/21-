import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Logo from "../assets/21logo.svg";
import Search from "./Search";
import Modal from "react-bootstrap/Modal";


function MobileHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSearchModal, setShowSearchModal] = useState(false);


    return (
        <header className="d-md-none">
            <Search showSearchModal={showSearchModal} setShowSearchModal={setShowSearchModal}  />
            <nav className="phone-nav-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <ul className="phone-nav">
                                <li className="item">
                                    <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.16 52.64">
                                        <path d="M3.76,0h52.64c2.08,0,3.76,1.68,3.76,3.76h0c0,2.08-1.68,3.76-3.76,3.76H3.76C1.68,7.52,0,5.84,0,3.76h0C0,1.68,1.68,0,3.76,0ZM60.16,48.88h0c0-2.08-1.68-3.76-3.76-3.76h-12.53c-2.08,0-3.76,1.68-3.76,3.76h0c0,2.08,1.68,3.76,3.76,3.76h12.53c2.08,0,3.76-1.68,3.76-3.76ZM60.16,26.32h0c0-2.08-1.68-3.76-3.76-3.76H23.81c-2.08,0-3.76,1.68-3.76,3.76h0c0,2.08,1.68,3.76,3.76,3.76h32.59c2.08,0,3.76-1.68,3.76-3.76Z"/>
                                    </svg>

                                </li>
                                <li className="item ml-auto" onClick={() => setShowSearchModal(!showSearchModal)}>


                                    <svg className="back-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 55.13 55.15">
                                        <path
                                            d="M54.22,49.86l-7.44-7.42c8.85-11.23,7.05-27.58-4.09-36.6C37.26,1.44,30.42-.58,23.46.15c-6.97.73-13.23,4.13-17.63,9.57-9.09,11.23-7.35,27.77,3.88,36.86,9.46,7.65,23.16,7.72,32.71.21l7.42,7.45c.61.61,1.4.91,2.2.91s1.59-.3,2.2-.91c.59-.58.91-1.36.91-2.19s-.32-1.61-.91-2.2ZM46.22,26.28c0,11.01-8.96,19.97-19.98,19.97S6.27,37.29,6.27,26.28,15.23,6.32,26.24,6.32s19.98,8.96,19.98,19.97Z"/>
                                    </svg>
                                   {/* <div className="input-control">جستجو</div>*/}
                                </li>
                                {location.pathname === "/" || location.pathname.startsWith('/verify/zarinpal') ?
                                    <li className="logo">
                                        <Link to={"/"}><img src={Logo} alt="logo"/></Link>
                                    </li>
                                    :
                                    <li className="logo item"  onClick={() => navigate(-1)}>
                                        <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.33 55.33">

                                            <path d="M27.33,3.46c0,.92-.37,1.8-1.02,2.45L8.61,23.62c-2.25,2.25-2.25,5.91,0,8.16h0s17.69,17.69,17.69,17.69c1.33,1.38,1.29,3.57-.09,4.9-1.34,1.3-3.47,1.3-4.81,0L3.71,36.69c-4.95-4.96-4.95-12.99,0-17.96L21.42,1.01c1.35-1.35,3.54-1.35,4.9,0,.65.65,1.02,1.53,1.01,2.45Z"/>
                                        </svg>
                                       {/* <svg className="back-icon" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 242.23 512.09">
                                            <path
                                                d="M220.78,512.09c-5.67.03-11.12-2.19-15.15-6.19L31.34,331.61c-41.71-41.6-41.79-109.14-.19-150.85.06-.06.13-.13.19-.19L205.63,6.27c8.37-8.37,21.93-8.37,30.29,0,8.37,8.37,8.37,21.93,0,30.29L61.63,210.86c-24.96,24.99-24.96,65.47,0,90.45l174.29,174.29c8.37,8.3,8.42,21.8.12,30.17-.04.04-.08.08-.12.12-4.03,3.99-9.48,6.22-15.15,6.19h0Z"/>
                                        </svg>*/}
                                       {/* <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M0,106.67v298.67c.07,58.88,47.79,106.6,106.67,106.67h298.67c58.88-.07,106.6-47.79,106.67-106.67V106.67c-.07-58.88-47.79-106.6-106.67-106.67H106.67C47.79.07.07,47.79,0,106.67ZM405.33,42.67c35.35,0,64,28.65,64,64v298.67c0,35.35-28.65,64-64,64H106.67c-35.35,0-64-28.65-64-64V106.67c0-35.35,28.65-64,64-64h298.67ZM279.91,134.25c-8.33,8.33-8.33,21.83,0,30.17l70.23,70.25-222.14.15c-11.78,0-21.33,9.55-21.33,21.33s9.55,21.33,21.33,21.33l222.17-.15-70.25,70.25c-8.69,7.96-9.28,21.45-1.33,30.14,7.96,8.69,21.45,9.28,30.14,1.33.28-.26.55-.52.82-.79l.53-.51,76.5-76.48c25-24.99,25-65.51,0-90.51,0,0,0,0,0,0l-76.5-76.5c-8.33-8.33-21.83-8.33-30.17,0h0Z"/>
                                        </svg>*/}
                                       {/* <svg className="back-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256,256-114.84,256-256S397.16,0,256,0ZM313.75,347.58c8.34,8.34,8.34,21.82,0,30.17-4,4.01-9.42,6.26-15.08,6.25-5.66,0-11.09-2.24-15.08-6.25l-106.67-106.67c-8.34-8.34-8.34-21.82,0-30.17l106.67-106.67c8.34-8.34,21.82-8.34,30.17,0s8.34,21.82,0,30.17l-91.58,91.58,91.58,91.58h0Z"/>
                            </svg>*/}
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
            <div className="space-50"></div>
        </header>
    );
}

export default MobileHeader;
