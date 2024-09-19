
import UserProfile from "../assets/icons/user-profile.svg";

import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import AvatarUpload from "./AvatarUpload";
import Skeleton from "../components/Skeleton";
import Modal from "react-bootstrap/Modal";
import CubeIcon from "../assets/icons/cube.svg";
import ConvertToShamsiDate from "../components/ConverToShamsiDate";



function Transactions() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(process.env.REACT_APP_API + "user/transactions?page=1");
    const [transactions, setTransactions] = useState([]);


    function get(link) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setLoading(true)
        axios.get(link ?? page, {
            headers: headers
        })
            .then((response) => {
                console.log(response.data[0])
                setTransactions(response.data[0])
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        get();
        document.title = '21+ | My Transactions'
        window.scrollTo({
            top: 0,   // The Y position you want to scroll to
            behavior: 'smooth' // Enables smooth scrolling
        });
    }, []);
    return (
        loading ?
            <div className="container my-profile">
                <div className="space-50"></div>
                <ul className="transictions">
                    {Array.from({length : 6}).map((_, i) => (
                        <li key={i} className="item">
                            <ul className="head">
                                <li className="head-item">
                                    <Skeleton width={"100px"} height={"15px"}/>
                                    <div className="number-order">
                                        <svg style={{opacity: 0.2}} xmlns="http://www.w3.org/2000/svg" className="icon"
                                             version="1.1"
                                             x="0" y="0" viewBox="0 0 24 24">
                                            <g>
                                                <path
                                                    d="M19 1H5a1 1 0 0 0-.65.25A4 4 0 0 1 7 4.6 1.75 1.75 0 0 1 7 5v17a1 1 0 0 0 .58.91 1 1 0 0 0 1.07-.15l2.85-2.44 2.85 2.44a1 1 0 0 0 1.3 0l2.85-2.44 2.85 2.44A1 1 0 0 0 22 23a1.06 1.06 0 0 0 .42-.09A1 1 0 0 0 23 22V5a4 4 0 0 0-4-4zm-1 14h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-4h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-4h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM5 5v8H2a1 1 0 0 1-1-1V4.6A2 2 0 0 1 5 5z"></path>
                                            </g>
                                        </svg>
                                        <Skeleton width={"60px"} height={"20px"} borderRadius={5}/>
                                    </div>
                                </li>
                                <li className="head-item">
                                    <Skeleton width={"60px"} height={"15px"}/>
                                    <div className="number-order order-date">
                                        <Skeleton width={"60px"} height={"20px"} borderRadius={5}/>

                                    </div>
                                </li>
                            </ul>
                            <div className="transiction-cube align-items-center">
                                <div className="d-flex flex-column text-right mt-2">
                                    <Skeleton width={"120px"} height={"20px"}/>
                                    <div className="mt-2">
                                        <Skeleton width={"85px"} height={"15px"}/>
                                    </div>
                                </div>
                                <div className="cube-num ">
                                    <img style={{opacity: 0.4}} src={CubeIcon} alt="cube"/>
                                    <div className="cube pl-1">CUBE</div>
                                    <div className="tag mt-1"><Skeleton width={"30px"} height={"15px"}
                                                                        borderRadius={5}/></div>
                                </div>
                            </div>
                            <div className="transiction-footer d-flex align-items-center">
                                <div className="id d-flex">
                                    <svg className="icon" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                         x="0" y="0"
                                         viewBox="0 0 486 486">
                                        <g>
                                            <path
                                                d="M243 0C108.8 0 0 108.8 0 243s108.8 243 243 243 243-108.8 243-243S377.2 0 243 0zm69.8 338.8c-10.6 12.9-24.4 21.6-40.5 26-7 1.9-10.2 5.6-9.8 12.9.3 7.2 0 14.3-.1 21.5 0 6.4-3.3 9.8-9.6 10-4.1.1-8.2.2-12.3.2-3.6 0-7.2 0-10.8-.1-6.8-.1-10-4-10-10.6-.1-5.2-.1-10.5-.1-15.7-.1-11.6-.5-12-11.6-13.8-14.2-2.3-28.2-5.5-41.2-11.8-10.2-5-11.3-7.5-8.4-18.3 2.2-8 4.4-16 6.9-23.9 1.8-5.8 3.5-8.4 6.6-8.4 1.8 0 4.1.9 7.2 2.5 14.4 7.5 29.7 11.7 45.8 13.7 2.7.3 5.4.5 8.1.5 7.5 0 14.8-1.4 21.9-4.5 17.9-7.8 20.7-28.5 5.6-40.9-5.1-4.2-11-7.3-17.1-10-15.7-6.9-32-12.1-46.8-21-24-14.4-39.2-34.1-37.4-63.3 2-33 20.7-53.6 51-64.6 12.5-4.5 12.6-4.4 12.6-17.4 0-4.4-.1-8.8.1-13.3.3-9.8 1.9-11.5 11.7-11.8H246c18.6 0 18.6.8 18.7 20.9.1 14.8.1 14.8 14.8 17.1 11.3 1.8 22 5.1 32.4 9.7 5.7 2.5 7.9 6.5 6.1 12.6-2.6 9-5.1 18.1-7.9 27-1.8 5.4-3.5 7.9-6.7 7.9-1.8 0-4-.7-6.8-2.1-14.4-7-29.5-10.4-45.3-10.4-2 0-4.1.1-6.1.2-4.7.3-9.3.9-13.7 2.8-15.6 6.8-18.1 24-4.8 34.6 6.7 5.4 14.4 9.2 22.3 12.5 13.8 5.7 27.6 11.2 40.7 18.4 41.2 23 52.4 75.3 23.1 110.9z">
                                            </path>
                                        </g>
                                    </svg>
                                    <Skeleton width={"60px"} height={"20px"}/>
                                </div>

                                <div className="transiction-status">
                                    <Skeleton width={"120px"} height={"25px"}/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="space-50"></div>
                <div className="space-50"></div>
            </div>
            :
            <div className="container my-profile">

                <div className="space-50"></div>
                <div className="col-12">
                    <h3 className="title-dashboard">
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
                        تراکنش های من
                    </h3>
                    <ul className="transictions">
                        {transactions.data.map((transaction, index) => {
                            return <Link key={index} to={"/verify/zarinpal/" + transaction.id}>
                                <li className="item">
                                    <ul className="head">
                                        <li className="head-item">
                                            شماره تراکنش
                                            <div className="number-order">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" version="1.1"
                                                     x="0" y="0" viewBox="0 0 24 24">
                                                    <g>
                                                        <path
                                                            d="M19 1H5a1 1 0 0 0-.65.25A4 4 0 0 1 7 4.6 1.75 1.75 0 0 1 7 5v17a1 1 0 0 0 .58.91 1 1 0 0 0 1.07-.15l2.85-2.44 2.85 2.44a1 1 0 0 0 1.3 0l2.85-2.44 2.85 2.44A1 1 0 0 0 22 23a1.06 1.06 0 0 0 .42-.09A1 1 0 0 0 23 22V5a4 4 0 0 0-4-4zm-1 14h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-4h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-4h-6a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zM5 5v8H2a1 1 0 0 1-1-1V4.6A2 2 0 0 1 5 5z"></path>
                                                    </g>
                                                </svg>
                                                #{transaction.id}
                                            </div>
                                        </li>
                                        <li className="head-item">
                                            تــاریـــخ تـراکـنـش
                                            <div className="number-order order-date">
                                                <ConvertToShamsiDate gregorianDate={transaction.created_at}/>

                                            </div>
                                        </li>
                                    </ul>
                                    <div className="transiction-cube">
                                        <div className="time">
                                    <span
                                        className="start ml-2">{transaction.game.clock.split('-')[0]}</span>
                                            <span className="dot">الی</span>
                                            <span
                                                className="end mr-2">{transaction.game.clock.split('-')[1]}</span>
                                            <div className="notice">شــروع و پـایـان رویـداد</div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#{transaction.game.salon}</div>
                                        </div>
                                    </div>
                                    <div className="transiction-footer">
                                        <div className="id">
                                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                 x="0" y="0"
                                                 viewBox="0 0 486 486">
                                                <g>
                                                    <path
                                                        d="M243 0C108.8 0 0 108.8 0 243s108.8 243 243 243 243-108.8 243-243S377.2 0 243 0zm69.8 338.8c-10.6 12.9-24.4 21.6-40.5 26-7 1.9-10.2 5.6-9.8 12.9.3 7.2 0 14.3-.1 21.5 0 6.4-3.3 9.8-9.6 10-4.1.1-8.2.2-12.3.2-3.6 0-7.2 0-10.8-.1-6.8-.1-10-4-10-10.6-.1-5.2-.1-10.5-.1-15.7-.1-11.6-.5-12-11.6-13.8-14.2-2.3-28.2-5.5-41.2-11.8-10.2-5-11.3-7.5-8.4-18.3 2.2-8 4.4-16 6.9-23.9 1.8-5.8 3.5-8.4 6.6-8.4 1.8 0 4.1.9 7.2 2.5 14.4 7.5 29.7 11.7 45.8 13.7 2.7.3 5.4.5 8.1.5 7.5 0 14.8-1.4 21.9-4.5 17.9-7.8 20.7-28.5 5.6-40.9-5.1-4.2-11-7.3-17.1-10-15.7-6.9-32-12.1-46.8-21-24-14.4-39.2-34.1-37.4-63.3 2-33 20.7-53.6 51-64.6 12.5-4.5 12.6-4.4 12.6-17.4 0-4.4-.1-8.8.1-13.3.3-9.8 1.9-11.5 11.7-11.8H246c18.6 0 18.6.8 18.7 20.9.1 14.8.1 14.8 14.8 17.1 11.3 1.8 22 5.1 32.4 9.7 5.7 2.5 7.9 6.5 6.1 12.6-2.6 9-5.1 18.1-7.9 27-1.8 5.4-3.5 7.9-6.7 7.9-1.8 0-4-.7-6.8-2.1-14.4-7-29.5-10.4-45.3-10.4-2 0-4.1.1-6.1.2-4.7.3-9.3.9-13.7 2.8-15.6 6.8-18.1 24-4.8 34.6 6.7 5.4 14.4 9.2 22.3 12.5 13.8 5.7 27.6 11.2 40.7 18.4 41.2 23 52.4 75.3 23.1 110.9z">
                                                    </path>
                                                </g>
                                            </svg>
                                            {new Intl.NumberFormat('en-US').format(transaction.amount)}
                                            <span className="notice mr-1">تومان</span>
                                        </div>

                                        <div className="transiction-status">
                                            {transaction.status === 1 ?
                                                <div className="icon-status-container success">
                                                    <svg className="payment-status-icon"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <circle className="circle success" cx="256" cy="256" r="256"/>
                                                        <path className="path"
                                                              d="M387.57,193.22l-141.73,155.36c-9.54,10.9-25.89,10.9-35.43,0l-59.96-66.78c-8.18-9.54-8.18-24.53,1.36-34.07,9.54-8.18,24.53-8.18,34.07,1.36l42.25,47.7,124.02-134.92c9.54-9.54,24.53-10.9,34.07-1.36,9.54,8.18,9.54,24.53,1.36,32.71h0Z"/>
                                                    </svg>
                                                    <div className="text">پرداخت شـده</div>
                                                </div>
                                                :
                                                <div className="icon-status-container error">
                                                    <svg className="payment-status-icon"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 512 512">
                                                        <circle className="circle error" cx="256" cy="256" r="256"/>
                                                        <path className="path"
                                                              d="M366.97,336.46c9.82,9.82,9.82,25.69,0,35.51-4.7,4.72-11.1,7.36-17.76,7.36-6.43,0-12.85-2.46-17.75-7.36l-75.46-75.46-75.46,75.46c-4.7,4.72-11.09,7.36-17.75,7.36-6.66,0-13.05-2.64-17.76-7.36-9.82-9.82-9.82-25.69,0-35.51l75.46-75.46-75.46-75.46c-9.82-9.82-9.82-25.69,0-35.51,9.82-9.82,25.69-9.82,35.51,0l75.46,75.46,75.46-75.46c9.82-9.82,25.69-9.82,35.51,0,9.82,9.82,9.82,25.69,0,35.51l-75.46,75.46,75.46,75.46Z"/>
                                                    </svg>

                                                    <div className="text">پرداخت نشده</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        })}
                    </ul>
                </div>
                {transactions.last_page > 1 ?
                    <ul className="pagination">
                        {transactions.links.map((item, index) => {
                            const label = item.label.replace(/&laquo;|&raquo;/g, "");
                            return <li key={index}
                                       className={`item ${item.url == page || item.url === null ? "disabled" : ""}`}
                                       onClick={() => {
                                           if (item.url && item.url !== page) {
                                               setPage(item.url);
                                               get(item.url)
                                               setTimeout(() => window.scrollTo({
                                                   top: 0, behavior: 'smooth'}), 500)
                                           } else return false
                                       }}>
                                {label.trim()}
                            </li>
                        })}
                    </ul>
                    : null}
                <div className="space-50"></div>
                <div className="space-50"></div>
                <div className="space-25"></div>

            </div>
    )
}

export default Transactions;
