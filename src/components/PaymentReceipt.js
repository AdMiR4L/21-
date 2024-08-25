
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import "./PaymentReceipt.css"
import ConvertToShamsiDate from "./ConverToShamsiDate";
import ClockIcon from "../assets/icons/clock.svg";
import ScenarioIcon from "../assets/icons/scenario.svg";
import CubeIcon from "../assets/icons/cube.svg";
import LevelIcon from "../assets/icons/level.svg";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function PaymentReceipt(){
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('');
    const navigate = useNavigate();

    const [sendLoading, setSendLoading] = useState(false);
    const [errors, setErrors] = useState({ message: '', chair: [] });
    const [userChoosenChair, setUserChoosenChair] = useState({});

    function chooseUserForChairs(){
        setSendLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        axios.post(process.env.REACT_APP_API+'choose/user/chair',
            {
                game_id : order.game_id ?? null,
                order_id : order.id ?? null,
                chairs : userChoosenChair ? userChoosenChair : null,
            }, {headers : headers})
            .then((response) => {
                    console.log(response.data)
                    toast.success(response.data);
                    setErrors({ message: '', chair: [] })
                    setSendLoading(false)
                    verifyPayment()
            })
            .catch((error) =>{
                console.log(error)
                setErrors(error.response.data)
                setSendLoading(false)
            });
    }
    function  verifyPayment(){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        axios.get(`${process.env.REACT_APP_API}game/payment/status/${id}`, { headers })
            .then(response => {
                console.log(response.data); // Access the data you received
                setOrder(response.data);
                JSON.parse(response.data.reserve[0].chair_no).forEach(item => {
                    setUserChoosenChair(prevState => ({
                        ...prevState,
                        [item]: "",
                    }));
                });
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
              navigate("*")
                setLoading(false);
            });
    }
    useEffect(() => {
        verifyPayment()
    }, []);

    return (
        <div>
            {!loading ? (
                <div className="container">
                    <Toaster/>
                    <div className="row">
                        <div className="col-12">
                            <div className="space-50"></div>
                            <div className="receipt">
                                <div className="payment-status">
                                    {order.status === 1 ?
                                        <div className="pay-head">
                                            <div className="icon-status-container success">
                                                <svg className="payment-status-icon" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 512 512">
                                                    <circle className="circle success" cx="256" cy="256" r="256"/>
                                                    <path className="path"
                                                          d="M387.57,193.22l-141.73,155.36c-9.54,10.9-25.89,10.9-35.43,0l-59.96-66.78c-8.18-9.54-8.18-24.53,1.36-34.07,9.54-8.18,24.53-8.18,34.07,1.36l42.25,47.7,124.02-134.92c9.54-9.54,24.53-10.9,34.07-1.36,9.54,8.18,9.54,24.53,1.36,32.71h0Z"/>
                                                </svg>
                                            </div>
                                            <div className="message">
                                                پرداخت با موفقیت انجام شد
                                            </div>
                                        </div>
                                        :
                                        <div className="pay-head">
                                            <div className="icon-status-container">
                                              {/*  <svg className="icon-status-container" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 522 522">
                                                    <path  className="circle error" d="M261,0C117.08,0,0,117.08,0,261s117.08,261,261,261,261-117.08,261-261S404.92,0,261,0Z"/>
                                                    <path className="path" d="M357.11,326.36c8.5,8.51,8.5,22.25,0,30.76-4.08,4.09-9.61,6.38-15.38,6.37-5.57,0-11.13-2.13-15.38-6.37l-65.36-65.36-65.36,65.36c-4.07,4.08-9.61,6.38-15.38,6.37-5.77,0-11.3-2.29-15.38-6.37-8.5-8.51-8.5-22.25,0-30.76l65.36-65.36-65.36-65.36c-8.5-8.51-8.5-22.25,0-30.76,8.51-8.5,22.25-8.5,30.76,0l65.36,65.36,65.36-65.36c8.51-8.5,22.25-8.5,30.76,0,8.5,8.51,8.5,22.25,0,30.76l-65.36,65.36,65.36,65.36Z"/>
                                                </svg>*/}

                                                <svg className="payment-status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <circle className="circle error" cx="256" cy="256" r="256"/>
                                                    <path className="path" d="M366.97,336.46c9.82,9.82,9.82,25.69,0,35.51-4.7,4.72-11.1,7.36-17.76,7.36-6.43,0-12.85-2.46-17.75-7.36l-75.46-75.46-75.46,75.46c-4.7,4.72-11.09,7.36-17.75,7.36-6.66,0-13.05-2.64-17.76-7.36-9.82-9.82-9.82-25.69,0-35.51l75.46-75.46-75.46-75.46c-9.82-9.82-9.82-25.69,0-35.51,9.82-9.82,25.69-9.82,35.51,0l75.46,75.46,75.46-75.46c9.82-9.82,25.69-9.82,35.51,0,9.82,9.82,9.82,25.69,0,35.51l-75.46,75.46,75.46,75.46Z"/>
                                                </svg>
                                            </div>
                                            <div className="message">
                                                در پرداخت شما خطایی بوجود آمده است
                                            </div>
                                        </div>
                                    }
                                    <ul className="final-invoice">
                                    <li className="item">
                                            <span className="attr">شماره تراکنش</span>
                                            <span className="value">#{order.id}</span>
                                        </li>
                                        <li className="item">
                                            <span className="attr">زمان تراکنش</span>
                                            <span className="value"><ConvertToShamsiDate
                                                gregorianDate={order.created_at}/></span>
                                        </li>
                                        <li className="item">
                                            <span className="attr">درگاه پرداخت</span>
                                            <span className="value">زرین پال</span>
                                        </li>
                                        <li className="item">
                                        <span className="attr">قیمت هر تیکت</span>
                                            <span
                                                className="value">{
                                                new Intl.NumberFormat('en-US').format(order.game.price)}
                                                <span className="notice mr-1">تومان</span>
                                            </span>
                                        </li>
                                        <li className="item">
                                            <span className="attr">تعداد صندلی ها</span>
                                            <span
                                                className="value">
                                                {JSON.parse(order.reserve[0].chair_no).length}
                                                <span className="notice mr-1">عدد</span>
                                            </span>
                                        </li>
                                        <li className="item">
                                            <span className="attr">مجموع پرداختی</span>
                                            <span
                                                className="value">
                                                {new Intl.NumberFormat('en-US').format(order.amount)}
                                                <span className="notice mr-1">تومان</span>
                                            </span>
                                        </li>
                                    </ul>
                                    <div className="invoice-notice"> رسید و اطلاعات تراکنش در پروفایل شما ذخیره میشود
                                    </div>
                                </div>


                                    {JSON.parse(order.reserve[0].chair_no).length === 1 ?
                                        <ul className="extra-chairs">
                                            {JSON.parse(order.reserve[0].chair_no).map((item, index) => {
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="chair-container">
                                                            <div
                                                                className="chair">
                                          <span className="number">
                                            #<span className="key">{item}</span>
                                          </span>
                                                                <svg
                                                                    className="chair-icon"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 31.53 42.55"
                                                                >
                                                                    <path
                                                                        className="seat"
                                                                        d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"
                                                                    />
                                                                    <g>
                                                                        <path
                                                                            data-name="Path 2078"
                                                                            className="mark"
                                                                            d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"
                                                                        />
                                                                        <path
                                                                            data-name="Path 2080"
                                                                            className="check"
                                                                            d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"
                                                                        />
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            }
                                            <ul className="player-info">
                                                <li className="head">
                                                    <div className="name">
                                                        {order.user.name + " " + order.user.family}
                                                    </div>
                                                    <div className="level">
                                                        Lv.
                                                        <span className="lvl"> {order.user.level}</span>
                                                        <div className="icon-container">
                                                            <img src={LevelIcon} alt="Level"/>
                                                        </div>

                                                    </div>
                                                </li>
                                                <li className="foot">
                                                    <div className="item pr-0">

                                                        <svg className="score-icon" xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 23.21 23.21">
                                                            <path id="Path_48" data-name="Path 48" className="cls-1"
                                                                  d="M22.05,1.16h-3.48V0H4.64v1.16H1.16C.56,1.13.04,1.59,0,2.2c0,.04,0,.08,0,.12v2.78c0,2.66,2,4.91,4.64,5.22v.12c-.02,3.28,2.26,6.13,5.46,6.85l-.81,2.44h-2.67c-.49.01-.91.34-1.04.81l-.93,2.67h13.92l-.93-2.67c-.13-.47-.56-.8-1.04-.81h-2.67l-.81-2.44c3.2-.72,5.47-3.57,5.45-6.85v-.12c2.65-.31,4.64-2.56,4.64-5.22v-2.78c.03-.61-.43-1.13-1.04-1.16-.04,0-.08,0-.13,0ZM4.64,8.01c-1.33-.34-2.28-1.53-2.32-2.9v-1.63h2.32v4.53ZM13.93,11.61l-2.32-1.28-2.32,1.27.58-2.32-1.74-2.32h2.44l1.04-2.32,1.04,2.32h2.44l-1.74,2.32.58,2.32ZM20.89,5.11c0,1.39-.97,2.59-2.32,2.9V3.48h2.32v1.63Z"/>
                                                        </svg>
                                                        <span className="strong">{order.user.score}</span>
                                                        امتیاز
                                                    </div>
                                                    <div className="item reg-date">
                                                        {order.user.nickname ?
                                                            order.user.nickname
                                                            :
                                                            "نام کاربری انتخاب نشده"}
                                                    </div>
                                                </li>
                                            </ul>
                                        </ul>

                                        : order.status === 1 && order.reserve[0].status !== 2 ?
                                            <ul className="extra-chairs multi-chairs">
                                                <li className="notice text-right pr-1 mb-2">
                                                    توجه داشته باشید کاربر حتما باید ثبت نام کرده باشد
                                                </li>
                                                {JSON.parse(order.reserve[0].chair_no).map((item, index) => {
                                                    return (
                                                        <li key={index} className="item">
                                                            <div className="chair-container">
                                                                <div
                                                                    className="chair">
                                                                      <span className="number choose">
                                                                        #<span className="key">{item}</span>
                                                                      </span>
                                                                    <svg
                                                                        className="chair-icon"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 31.53 42.55"
                                                                    >
                                                                        <path
                                                                            className="seat"
                                                                            d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"
                                                                        />
                                                                        <g>
                                                                            <path
                                                                                data-name="Path 2078"
                                                                                className="mark"
                                                                                d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"
                                                                            />
                                                                            <path
                                                                                data-name="Path 2080"
                                                                                className="check"
                                                                                d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"
                                                                            />
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="input-container">
                                                                <input
                                                                    placeholder="نام کاربری یا شماره تلفن کاربر"
                                                                    className="input-control"
                                                                    value={userChoosenChair[item]}
                                                                    onChange={(e) =>
                                                                        setUserChoosenChair(prevState => ({
                                                                            ...prevState,
                                                                            [item]: e.target.value,
                                                                        }))}
                                                                    type="text"/>
                                                                {errors.chair.length && errors.chair.includes(item) ?
                                                                    <div className="error">{errors.message}</div> : null
                                                                }
                                                            </div>


                                                        </li>
                                                    )
                                                })
                                                }


                                                {sendLoading ?
                                                    <li className="primary-btn load-btn">
                                                        <div className="loader-container">
                                                            <div className="loader">
                                                            </div>
                                                        </div>
                                                    </li>
                                                    :
                                                    <li className="primary-btn load-btn"
                                                        onClick={() => chooseUserForChairs()}>
                                                        تـایـیـد جـایگـاه
                                                    </li>
                                                }

                                            </ul>



                                        : order.reserve[0].status === 2 ?
                                                <ul className="extra-chairs multi-chairs">
                                                    <li className="notice text-right pr-1 mb-2">
                                                        توجه داشته باشید کاربر حتما باید ثبت نام کرده باشد
                                                    </li>
                                                    {order.reserve.slice(1).map((item, index) => {
                                                        return (
                                                            <li key={index} className="item">
                                                                <div className="chair-container">
                                                                    <div
                                                                        className="chair">
                                                                          <span className="number">
                                                                            #<span className="key">{JSON.parse(item.chair_no)[0]}</span>
                                                                          </span>
                                                                        <svg
                                                                            className="chair-icon"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 31.53 42.55"
                                                                        >
                                                                            <path
                                                                                className="seat"
                                                                                d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"
                                                                            />
                                                                            <g>
                                                                                <path
                                                                                    data-name="Path 2078"
                                                                                    className="mark"
                                                                                    d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"
                                                                                />
                                                                                <path
                                                                                    data-name="Path 2080"
                                                                                    className="check"
                                                                                    d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"
                                                                                />
                                                                            </g>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <ul className="player-info">
                                                                    <li className="head">
                                                                        <div className="name">
                                                                            {item.user.name + " " + item.user.family}
                                                                        </div>
                                                                        <div className="level">
                                                                            Lv.
                                                                            <span
                                                                                className="lvl"> {item.user.level}</span>
                                                                            <div className="icon-container">
                                                                                <img src={LevelIcon} alt="Level"/>
                                                                            </div>

                                                                        </div>
                                                                    </li>
                                                                    <li className="foot">
                                                                        <div className="item pr-0">

                                                                            <svg className="score-icon"
                                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                                 viewBox="0 0 23.21 23.21">
                                                                                <path id="Path_48" data-name="Path 48"
                                                                                      className="cls-1"
                                                                                      d="M22.05,1.16h-3.48V0H4.64v1.16H1.16C.56,1.13.04,1.59,0,2.2c0,.04,0,.08,0,.12v2.78c0,2.66,2,4.91,4.64,5.22v.12c-.02,3.28,2.26,6.13,5.46,6.85l-.81,2.44h-2.67c-.49.01-.91.34-1.04.81l-.93,2.67h13.92l-.93-2.67c-.13-.47-.56-.8-1.04-.81h-2.67l-.81-2.44c3.2-.72,5.47-3.57,5.45-6.85v-.12c2.65-.31,4.64-2.56,4.64-5.22v-2.78c.03-.61-.43-1.13-1.04-1.16-.04,0-.08,0-.13,0ZM4.64,8.01c-1.33-.34-2.28-1.53-2.32-2.9v-1.63h2.32v4.53ZM13.93,11.61l-2.32-1.28-2.32,1.27.58-2.32-1.74-2.32h2.44l1.04-2.32,1.04,2.32h2.44l-1.74,2.32.58,2.32ZM20.89,5.11c0,1.39-.97,2.59-2.32,2.9V3.48h2.32v1.63Z"/>
                                                                            </svg>
                                                                            <span
                                                                                className="strong">{item.user.score}</span>
                                                                            امتیاز
                                                                        </div>
                                                                        <div className="item reg-date">
                                                                            {item.user.nickname ?
                                                                                item.user.nickname
                                                                                :
                                                                                "نام کاربری انتخاب نشده"}
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        )
                                                    })
                                                    }

                                                </ul>

                                                : null
                                    }

                                <div className="event-date">
                                    تاریخ رویداد :
                                    <ConvertToShamsiDate name={1} gregorianDate={order.game.created_at}/>
                                </div>
                                <Link to={"/game/" + order.game_id}>
                                    <div className="cube-card">
                                        <div className="head mt-2">
                                            <div className="right">
                                                <div className="number">ســالـن {order.game.salon}</div>
                                                <div className="manager">
                                                    گرداننده سالن :
                                                    <span className="cube-god">
                                                        {order.game.god_id ?
                                                            order.game.god.name + " " + order.game.god.family
                                                            :
                                                            "هنوز مشخص نشده است"
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="cube-num">
                                                <img src={CubeIcon} alt="cube"/>
                                                <div className="cube">CUBE</div>
                                                <div className="tag">#{order.game.salon}</div>
                                            </div>
                                        </div>
                                        <div className="cube">
                                            <div className="cube-info">
                                                <ul className="cube-box">
                                                    <li className="event">
                                                        <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                        <div className="time">
                                                                <span
                                                                    className="start">{order.game.clock.split('-')[0]}</span>
                                                            <span className="dot">الی</span>
                                                            <span
                                                                className="end">{order.game.clock.split('-')[1]}</span>
                                                            <div className="notice">شــروع و پـایـان</div>
                                                        </div>
                                                    </li>
                                                </ul>
                                                {order.game.status === 0 ? (
                                                    <div className="status standby">STANDBY</div>
                                                ) : order.game.status === 1 ? (
                                                    <div className="status live">LIVE</div>
                                                ) : (
                                                    <div className="status ended">ENDED</div>
                                                )}
                                                <ul className="cube-box">

                                                    <li className="event">
                                                        <div className="time">
                                                                <span className="end cap">
                                                                    {order.game.game_scenario ?
                                                                        order.game.scenario.name
                                                                        : "در انتظار"}
                                                                </span>

                                                            <div className="notice">سناریو رویداد</div>
                                                        </div>
                                                        <img className="mr-2" src={ScenarioIcon} alt="user"/>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <ul className="mentions">
                                    <li className="item">
                                        لطفا 15 دقیقه قبل از شروع رویداد در مجموعه حضور داشته باشید.
                                    </li>
                                    <li className="item">
                                        حضور شما در مجموعه به معنای خواندن و پذیرفتن قوانین و مقررات می باشد.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-12">
                            <ul className="invoice-btn">
                                <li className="item">
                                <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M448,256h-64c-23.53,0-42.67,19.14-42.67,42.67s-19.14,42.67-42.67,42.67h-85.33c-23.53,0-42.67-19.14-42.67-42.67s-19.14-42.67-42.67-42.67h-64c-35.29,0-64,28.71-64,64v85.33c0,58.82,47.85,106.67,106.67,106.67h298.67c58.82,0,106.67-47.85,106.67-106.67v-85.33c0-35.29-28.71-64-64-64ZM469.33,405.33c0,35.29-28.71,64-64,64H106.67c-35.29,0-64-28.71-64-64v-85.33c0-11.78,9.55-21.33,21.33-21.33l64-.04v.04c0,47.06,38.27,85.33,85.33,85.33h85.33c47.06,0,85.33-38.27,85.33-85.33h64c11.78,0,21.33,9.55,21.33,21.33v85.33ZM155.58,151.91c-8.33-8.33-8.33-21.84,0-30.17,8.33-8.33,21.84-8.33,30.17,0h0l48.92,48.92V21.33c0-11.78,9.55-21.33,21.33-21.33s21.33,9.55,21.33,21.33v149.33l48.92-48.92c8.33-8.33,21.84-8.33,30.17,0,8.33,8.33,8.33,21.84,0,30.17h0l-70.25,70.25c-7.95,7.95-18.73,12.43-29.97,12.46l-.19.04-.19-.04c-11.25-.03-22.02-4.51-29.97-12.46l-70.25-70.25Z"/>
                                    </svg>
                                    دانـلـود رسـیـد
                                </li>
                                <li className="item">
                                    <Link to={"/game/" + order.game_id}>
                                        <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.97 511.95">
                                            <path d="M436.61,41.91L315.31,4.66c-55.7-16.96-114.73,13.77-132.78,69.12l-4.01,11.5h-71.85C47.79,85.35.07,133.07,0,191.95v213.33c.07,58.88,47.79,106.6,106.67,106.67h128c32.75-.11,63.61-15.34,83.63-41.26,4.87.71,9.78,1.08,14.7,1.11,47.05.04,88.51-30.9,101.87-76.01l72.87-221.85c16.19-56.04-15.42-114.73-71.13-132.03ZM234.67,469.28H106.67c-35.35,0-64-28.65-64-64v-213.33c0-35.35,28.65-64,64-64h128c35.35,0,64,28.65,64,64v213.33c0,35.35-28.65,64-64,64ZM466.92,161.29l-72.79,221.87c-7.4,25.12-29.39,43.16-55.47,45.53,1.75-7.68,2.65-15.53,2.67-23.4v-213.33c-.07-58.88-47.79-106.6-106.67-106.67h-10.82c11.44-32.24,46.21-49.78,78.93-39.83l121.3,37.25c33.22,10.25,52.23,45.11,42.84,78.59h0ZM256,277.28c0,30.93-32.94,72.34-57.9,93.4-15.84,13.4-39.03,13.4-54.87,0-24.96-21.06-57.9-62.46-57.9-93.4,0-23.56,19.1-42.67,42.67-42.67s42.67,19.1,42.67,42.67c0-23.56,19.1-42.67,42.67-42.67s42.67,19.1,42.67,42.67Z"/>
                                        </svg>
                                        بازگشت به بازی
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                        <div className="space-25"></div>
                    </div>
                </div>
            ) : (
                <p>nooooo</p>
            )}
        </div>
    );
}

export default PaymentReceipt;
