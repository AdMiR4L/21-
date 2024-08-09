
import './Game.css';
import CubeIcon from "../assets/icons/cube.svg";
import GoalIcon from '../assets/icons/goal.svg';
import React, {useEffect, useState} from "react";
import Avatar from "../assets/avatar.png";
import LevelIcon from "../assets/icons/level.svg";
import Paying from "../assets/paying.svg";
import Sadad from "../assets/pay-s.svg";
import ZarinPal from "../assets/zarinpal.svg";
import Gift from "../assets/gift.svg";
import FAQImage from "../assets/faq.png";
import Breadcrumb from "../layouts/Breadcrumb";
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function Game() {
    const { id } = useParams();

    const [game, setGame] = useState();
    const [reserves, setReserves] = useState();
    const [unavailable, setUnavailable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChairs, setSelectedChairs] = useState([]);
    const [showReserveModal, setShowReserveModal] = useState(false);


    function getGame() {
        axios.get( process.env.REACT_APP_API + "games/"+id)
            .then(response => {
                setGame(response.data.game)
                setReserves(response.data.reserves)
                setUnavailable(response.data.unavailable);
                setIsLoading(false)

                console.log(response)
            });

    }

    function handleChairClick (index){
        setSelectedChairs((prevSelectedChairs) => {
            if (prevSelectedChairs.includes(index)) {
                // Remove chair from selected list if already selected
                return prevSelectedChairs.filter(chair => chair !== index);
            } else {
                // Add chair to selected list if not selected
                return [...prevSelectedChairs, index];
            }

        });
    }


    function reserveAttempt () {
        const data = {
            game_id : id,
            chair_no : JSON.stringify(selectedChairs),
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        axios.post(process.env.REACT_APP_API+'game/reserve', data ,{
            headers: headers
        })
            .then((response) => {
                console.log("Reserve Detail ->", response);
            })
            .catch((error) =>{
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        getGame()
    }, []);



    return (

        <div className="container">
            <Modal show={showReserveModal} onHide={() => setShowReserveModal(!showReserveModal)} centered className="cube-info-modal">
                {/*<Modal.Header>
                    <Modal.Title>
                        <button className="close" onClick={() => setShowCube(!showCube)}>
                            <i className="fa-light fa-xmark"/>
                        </button>
                    </Modal.Title>
                </Modal.Header>*/}
                <Modal.Body>
                {!isLoading ?
                    <div className="modal-mafi">
                        {/*<div className="modal-logo">*/}
                        {/*    <img src={Logo} alt="logo"/>*/}

                        {/*</div>*/}
                        <div className="title">
                            برنامه مافیا سالن
                            {game.salon}
                        </div>
                        <div className="info modal-mafia-info">
                            <ul className="mafia-info">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.1 23.07">
                                        <path
                                            d="M10.76.8l-2.94,5.96-6.58.96c-.79.11-1.33.85-1.22,1.63.05.31.19.6.42.82l4.77,4.64-1.13,6.55c-.13.78.39,1.53,1.18,1.66.31.05.63,0,.91-.15l5.89-3.09,5.89,3.09c.7.37,1.58.1,1.95-.61.15-.28.2-.6.14-.91l-1.12-6.55,4.76-4.64c.57-.56.58-1.47.02-2.04-.22-.23-.51-.37-.82-.42l-6.58-.96L13.34.8c-.35-.71-1.22-1.01-1.93-.65-.28.14-.51.37-.65.65Z"/>
                                    </svg>
                                    <span className="attr">سطح </span>
                                    <span></span>
                                    <span className="val">بدون محدودیت</span>
                                </li>
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.17 60.17">
                                        <path
                                            d="M51.57,60.17h6.45c1.19,0,2.15-.96,2.15-2.15v-6.45c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v4.3h-4.3c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM8.6,55.87h-4.3v-4.3c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v6.45c0,1.19.96,2.15,2.15,2.15h6.45c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM10.74,51.57h38.68c1.19,0,2.15-.96,2.15-2.15,0-5.96-2.61-9.74-4.97-11.51-1.32-.98-2.63-1.39-3.62-1.39-2.28,0-3.99.65-5.7,1.47-1.91.92-3.81,2.11-7.19,2.11-3.55,0-5.84-1.19-7.81-2.12-1.77-.84-3.36-1.47-5.09-1.47-1,0-2.35.45-3.68,1.51-2.36,1.88-4.92,5.8-4.92,11.38,0,1.19.96,2.15,2.15,2.15ZM42.57,25.79h-25.69c.97,2.27,2.28,4.42,3.85,6.16,2.51,2.81,5.65,4.58,9,4.58s6.49-1.77,9-4.58c1.56-1.75,2.88-3.89,3.84-6.16h0ZM6.45,23.64h47.27c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15H6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM15.04,17.19h29.36c-.14-8.35-6.69-15.04-14.68-15.04s-14.54,6.69-14.68,15.04ZM8.6,0H2.15C.96,0,0,.96,0,2.15v6.45c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15v-4.3h4.3c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM51.57,4.3h4.3v4.3c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15V2.15c0-1.19-.96-2.15-2.15-2.15h-6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15Z"/>
                                    </svg>
                                    <span className="attr">شناسه رویداد</span>
                                    <span className="val price"> {game.id}#</span>
                                </li>
                            </ul>
                            <ul className="mafia-info">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                                        <path
                                            d="M479.82,144h-95.82c-35.35,0-64-28.65-64-64V0h-192C57.3,0,0,57.3,0,128v224c0,70.7,57.3,128,128,128h224c70.7,0,128-57.3,128-128v-203.14c0-1.62-.06-3.25-.18-4.86ZM216,336h-96c-8.84,0-16-7.16-16-16s7.16-16,16-16h96c8.84,0,16,7.16,16,16s-7.16,16-16,16ZM360,240H120c-8.84,0-16-7.16-16-16s7.16-16,16-16h240c8.84,0,16,7.16,16,16s-7.16,16-16,16Z"/>
                                        <path
                                            d="M384,112h84.32c-2.51-3.57-5.41-6.9-8.65-9.93l-90.92-84.86c-4.99-4.66-10.66-8.46-16.75-11.28v74.06c0,17.67,14.33,32,32,32Z"/>
                                    </svg>
                                    <span className="attr">سناریو </span>
                                    <span></span>
                                    <span className="val">{game.mode}</span>
                                </li>
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.62 60.62">
                                        <path
                                            d="M30.31,0C13.57,0,0,13.57,0,30.31s13.57,30.31,30.31,30.31,30.31-13.57,30.31-30.31c0-16.74-13.57-30.31-30.31-30.31h0ZM40.52,40.52c-1.08,1.08-2.82,1.08-3.9,0l-8.26-8.26c-.52-.52-.81-1.22-.81-1.95V13.78c0-1.52,1.23-2.76,2.75-2.76s2.76,1.23,2.76,2.75h0v15.39l7.46,7.46c1.08,1.08,1.08,2.82,0,3.9h0Z"/>
                                    </svg>
                                    <span className="attr">زمان</span>
                                    <span className="val price">{game.clock.split('-')[0]}</span>
                                    <span className="notice pl-1">الی</span>
                                    <span className="val price">{game.clock.split('-')[1]}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-divide-head">صندلی های انتخاب شده</div>

                        <ul className="selected-chairs extra-chairs">
                            {selectedChairs.map((item) => {
                                return <li key={item} className="item" onClick={() => {
                                    handleChairClick(item);
                                    console.log(selectedChairs);
                                    if (selectedChairs.length <= 1) setShowReserveModal(false)
                                }}>
                                    <div className="chair-container">
                                        <div className="tag">REMOVE</div>
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
                                                    <path className="mark"
                                                          d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"></path>
                                                    <path className="check"
                                                          d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </li>
                            })
                            }
                        </ul>
                        <ul className="invoice">
                            <li className="fee">

                                <div className="attr">
                                    <svg className="invoice-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 351.33">
                                        <path
                                            d="M497,126.4c8.28,0,15-6.72,15-15v-37.44c0-46.31-27.65-73.96-73.96-73.96h-86.7v47.13c-.74,19.88-29.27,19.87-30,0V0H73.96C27.65,0,0,27.65,0,73.97v37.44c0,8.28,6.72,15,15,15,65.28,2.48,65.25,96.07,0,98.53-8.28,0-15,6.72-15,15v37.44c0,46.31,27.65,73.96,73.96,73.96h247.37v-47.13c.74-19.88,29.27-19.87,30,0v47.13h86.7c46.31,0,73.96-27.65,73.96-73.96v-37.44c0-8.28-6.72-15-15-15-65.27-2.48-65.25-96.07,0-98.53h0ZM351.33,239.93c-.74,19.88-29.27,19.87-30,0v-32.13c.74-19.88,29.27-19.87,30,0v32.13ZM351.33,143.53c-.74,19.88-29.27,19.87-30,0v-32.13c.74-19.88,29.27-19.87,30,0v32.13Z"/>
                                    </svg>
                                    قیمت هر تیکت
                                </div>
                                <span className="val">{new Intl.NumberFormat('en-US').format(game.price)}</span>
                                <span className="notice pr-1">تومان</span>
                            </li>


                            <li className="total">
                                <div className="attr">مجموع پـرداختی</div>
                                <span
                                    className="val price">{new Intl.NumberFormat('en-US').format(game.price * selectedChairs.length)}</span>
                                <span className="notice pr-2">تومان</span>
                            </li>
                        </ul>

                        {game.price === 0 ?
                            <div className="payment-method">
                                <a href="/" className="item">
                                    <div className="img-container">
                                        <img src={Gift} alt="paying"/>
                                    </div>
                                    <div className="content">
                                   <span className="head">
                                      ثبت نام رایگان
                                   </span>
                                        <span className="notice">
                                       شرکت در این رویداد رایگان است!
                                   </span>
                                    </div>
                                    <div className="arr">
                                        <i className="fa-light fa-circle-arrow-left"></i>
                                    </div>
                                </a>
                            </div>
                            :
                            <ul className="payment-method">
                                <li>
                                    <a href="/" className="item">
                                        <div className="img-container">
                                            <img src={Sadad} alt="sadad"/>
                                        </div>
                                        <div className="content">
                           <span className="head">
                               پرداخت آنلاین بانک ملی
                           </span>
                                            <span className="notice">
                               پرداخت توسط درگاه  آنلاین سداد، بانک ملی انجام میشود
                           </span>
                                        </div>
                                        <div className="arr">
                                            <i className="fa-light fa-circle-arrow-left"></i>
                                        </div>
                                    </a>
                                </li>


                                <li>
                                    <a href="/" className="item">
                                        <div className="img-container mt-0">
                                            <img src={ZarinPal} alt="zarinpal"/>
                                        </div>
                                        <div className="content">
                           <span className="head">
                               پرداخت با درگاه واسط زرین پال
                           </span>
                                            <span className="notice">
                               پرداخت توسط درگاه واسط زرین پال انجام میشود
                           </span>
                                        </div>
                                        <div className="arr">
                                            <i className="fa-light fa-circle-arrow-left"></i>
                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a className="item" href="/">
                                        <div className="img-container">
                                            <img src={Paying} alt="paying"/>
                                        </div>
                                        <div className="content">
                               <span className="head">
                                   پرداخت حضوری
                               </span>
                                            <span className="notice">
                                   پرداخت توسط شما هنگام ورود به مجموعه انجام خواهد شد
                               </span>
                                        </div>
                                        <div className="arr">
                                            <i className="fa-light fa-circle-arrow-left"></i>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        }


                    </div>
                    :
                    null}
                </Modal.Body>

                <Modal.Footer>
                    <div className="content">
                        <span> لطفا قبل از اقدام به پرداخت </span>
                        <Link className="color-primary" to="/">قوانین و ضوابط</Link>
                        <span>را مطالعه فرمایید</span>
                    </div>
                </Modal.Footer>
            </Modal>

            <div className="space-50"></div>
            <Breadcrumb name="رویداد مافیا" location="/"/>
            <div className="space-25"></div>
            {!isLoading ?
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-top mt-0">
                            <div className="section-header ">
                                <h3 className="head">
                                    برنامه مافیا سالن
                                    {game.salon}
                                </h3>
                                <div className="cube-num">
                                    <img src={CubeIcon} alt="cube"/>
                                    <div className="cube">CUBE</div>
                                    <div className="tag">#1</div>
                                </div>
                                <h4 className="notice mb-0">
                                    امروز
                                    <span className="date">26 تیر 1403</span>
                                    ، شما میتوانید با کلیک بر روی صندلی ها، یک یا چند جایگاه رزرو کنید
                                </h4>
                            </div>
                        </div>
                        <div className="game-page-info">
                            <ul className="mafia-info">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                                        <path d="M479.82,144h-95.82c-35.35,0-64-28.65-64-64V0h-192C57.3,0,0,57.3,0,128v224c0,70.7,57.3,128,128,128h224c70.7,0,128-57.3,128-128v-203.14c0-1.62-.06-3.25-.18-4.86ZM216,336h-96c-8.84,0-16-7.16-16-16s7.16-16,16-16h96c8.84,0,16,7.16,16,16s-7.16,16-16,16ZM360,240H120c-8.84,0-16-7.16-16-16s7.16-16,16-16h240c8.84,0,16,7.16,16,16s-7.16,16-16,16Z"/>
                                        <path d="M384,112h84.32c-2.51-3.57-5.41-6.9-8.65-9.93l-90.92-84.86c-4.99-4.66-10.66-8.46-16.75-11.28v74.06c0,17.67,14.33,32,32,32Z"/>
                                    </svg>
                                    <span className="attr">سناریو </span>
                                    <span></span>
                                    <span className="val">{game.mode}</span>

                                    <svg className="q-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path  d="M256.8,0C114.8-.4-.4,114.8,0,256.8c.4,140.4,117.5,255.2,257.9,255.2h254.1v-254.1C512,117.5,397.2.4,256.8,0ZM278.8,386.4c-6.7,5.9-15,8.9-25,8.9s-18.3-3-25-8.9-10-13.5-10-22.7,3.3-16.8,10-22.7,15-8.9,25-8.9,18.3,3,25,8.9,10,13.5,10,22.7-3.4,16.7-10,22.7ZM338,219.1c-4.1,8.5-10.7,17.2-19.8,26l-21.5,20c-6.1,5.9-10.4,11.9-12.7,18.1-2.4,6.2-3.7,14-3.9,23.5h-53.6c0-18.2,2.1-32.6,6.2-43.1,4.2-10.7,11.1-20.1,20-27.4,9.2-7.7,16.3-14.8,21.1-21.2,4.7-6.1,7.2-13.6,7.2-21.2,0-18.8-8.1-28.3-24.3-28.3-7-.2-13.7,2.8-18.1,8.2-4.6,5.5-7.1,12.9-7.3,22.3h-63.2c.3-25,8.1-44.4,23.6-58.3s37.2-20.9,65.1-20.9,49.4,6.4,64.7,19.3,22.9,31.1,22.9,54.8c-.1,9.7-2.2,19.4-6.4,28.2Z"/>
                                    </svg>
                                </li>
                                <li className="item">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.06 23.06">
                                        <path
                                            d="M21.49,18.87h-3.67c-2.31,0-4.19-1.88-4.19-4.19s1.88-4.19,4.19-4.19h3.67c.29,0,.52-.23.52-.52h0v-1.57c0-1.1-.85-1.99-1.93-2.08l-3.01-5.26c-.28-.49-.73-.83-1.27-.98-.54-.14-1.1-.07-1.58.21L3.91,6.29h-1.81c-1.16,0-2.1.94-2.1,2.1v12.58c0,1.16.94,2.1,2.1,2.1h17.82c1.16,0,2.1-.94,2.1-2.1v-1.57c0-.29-.23-.52-.52-.52h0,0ZM17.73,4.3l1.14,1.99h-4.57l3.43-1.99ZM5.99,6.29L14.76,1.19c.24-.14.51-.18.78-.1.27.07.49.24.63.49h0s-8.1,4.72-8.1,4.72c0,0-2.07,0-2.07,0Z"/>
                                        <path
                                            d="M21.49,11.53h-3.67c-1.73,0-3.15,1.41-3.15,3.15s1.41,3.15,3.15,3.15h3.67c.87,0,1.57-.71,1.57-1.57v-3.15c0-.87-.71-1.57-1.57-1.57h0ZM17.82,15.73c-.58,0-1.05-.47-1.05-1.05s.47-1.05,1.05-1.05,1.05.47,1.05,1.05c0,.58-.47,1.05-1.05,1.05Z"/>
                                    </svg>
                                    <span className="attr">قیمت</span>
                                    <span className="val price">{new Intl.NumberFormat('en-US').format(game.price)}</span>
                                    <span className="notice">تومان</span>
                                </li>
                            </ul>
                            <ul className="mafia-info left">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.1 23.07">
                                        <path
                                            d="M10.76.8l-2.94,5.96-6.58.96c-.79.11-1.33.85-1.22,1.63.05.31.19.6.42.82l4.77,4.64-1.13,6.55c-.13.78.39,1.53,1.18,1.66.31.05.63,0,.91-.15l5.89-3.09,5.89,3.09c.7.37,1.58.1,1.95-.61.15-.28.2-.6.14-.91l-1.12-6.55,4.76-4.64c.57-.56.58-1.47.02-2.04-.22-.23-.51-.37-.82-.42l-6.58-.96L13.34.8c-.35-.71-1.22-1.01-1.93-.65-.28.14-.51.37-.65.65Z"/>
                                    </svg>
                                    <span className="attr">سطح </span>
                                    <span></span>
                                    <span className="val">بدون محدودیت</span>
                                </li>
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.17 60.17">
                                        <path
                                            d="M51.57,60.17h6.45c1.19,0,2.15-.96,2.15-2.15v-6.45c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v4.3h-4.3c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM8.6,55.87h-4.3v-4.3c0-1.19-.96-2.15-2.15-2.15s-2.15.96-2.15,2.15v6.45c0,1.19.96,2.15,2.15,2.15h6.45c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM10.74,51.57h38.68c1.19,0,2.15-.96,2.15-2.15,0-5.96-2.61-9.74-4.97-11.51-1.32-.98-2.63-1.39-3.62-1.39-2.28,0-3.99.65-5.7,1.47-1.91.92-3.81,2.11-7.19,2.11-3.55,0-5.84-1.19-7.81-2.12-1.77-.84-3.36-1.47-5.09-1.47-1,0-2.35.45-3.68,1.51-2.36,1.88-4.92,5.8-4.92,11.38,0,1.19.96,2.15,2.15,2.15ZM42.57,25.79h-25.69c.97,2.27,2.28,4.42,3.85,6.16,2.51,2.81,5.65,4.58,9,4.58s6.49-1.77,9-4.58c1.56-1.75,2.88-3.89,3.84-6.16h0ZM6.45,23.64h47.27c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15H6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15ZM15.04,17.19h29.36c-.14-8.35-6.69-15.04-14.68-15.04s-14.54,6.69-14.68,15.04ZM8.6,0H2.15C.96,0,0,.96,0,2.15v6.45c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15v-4.3h4.3c1.19,0,2.15-.96,2.15-2.15s-.96-2.15-2.15-2.15ZM51.57,4.3h4.3v4.3c0,1.19.96,2.15,2.15,2.15s2.15-.96,2.15-2.15V2.15c0-1.19-.96-2.15-2.15-2.15h-6.45c-1.19,0-2.15.96-2.15,2.15s.96,2.15,2.15,2.15Z"/>
                                    </svg>
                                    <span className="attr">شناسه رویداد</span>
                                    <span className="val price">{game.id}#</span>
                                </li>
                            </ul>
                            <div className="god">
                                <div className="avatar">
                                    <div className="img-container">
                                        {
                                            game.god.avatar ?
                                                <img src={Avatar} alt="avatar"/>
                                                :
                                                <img src={game.god.avatar.path} alt="avatar"/>
                                        }
                                    </div>
                                </div>
                                <ul className="player-info">
                                    <li className="tag">
                                        گرداننده این رویداد
                                    </li>
                                    <li className="head">
                                        <div className="name">
                                            {game.god.name+" "+game.god.family}
                                        </div>
                                        <div className="level">
                                            Lv.
                                            <span className="lvl">{game.god.level}</span>
                                            <div className="icon-container">
                                                <img src={LevelIcon} alt="Level"/>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>


                            {/*<ul className="mafia-info">
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496.94 359.23">
                                        <path
                                            d="M491.14,270.08c-13.48-12.2-48.04-8.73-105.34-3.01l-10.84,1.05,25.15-221.06c.08-.23.08-.53.08-.83C400.19,2.26,272.11,0,246.44,0S92.76,2.26,92.76,46.23v.83l25.15,221.14c-34.67-4.08-96.38-12.41-111.96,1.58-3.84,3.54-5.95,8.21-5.95,13.63,0,39.68,118.44,75.82,248.47,75.82s248.47-36.14,248.47-75.82c0-5.27-1.96-9.94-5.8-13.33ZM356.59,281.83c-.23.45-.53.9-.98,1.36-7,6.93-46.68,15.81-109.18,15.81-66.64,0-107.44-10.16-110.08-16.94,0-.3,0-.6-.08-.9l-4.59-25.6c72.51,17.32,149.61,17.24,229.57-.3-.08.77-4.75,27.35-4.67,26.58h0Z"/>
                                    </svg>
                                    <span className="attr">سناریو </span>
                                    <span></span>
                                    <span className="val">شماره یک</span>
                                    <span>?</span>
                                </li>
                                <li className="item">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.62 60.62">
                                        <path
                                            d="M30.31,0C13.57,0,0,13.57,0,30.31s13.57,30.31,30.31,30.31,30.31-13.57,30.31-30.31c0-16.74-13.57-30.31-30.31-30.31h0ZM40.52,40.52c-1.08,1.08-2.82,1.08-3.9,0l-8.26-8.26c-.52-.52-.81-1.22-.81-1.95V13.78c0-1.52,1.23-2.76,2.75-2.76s2.76,1.23,2.76,2.75h0v15.39l7.46,7.46c1.08,1.08,1.08,2.82,0,3.9h0Z"/>
                                    </svg>
                                    <span className="attr">زمان</span>
                                    <span className="val price">16</span>
                                    <span className="notice">الی</span>
                                    <span className="val price">18</span>
                                </li>
                            </ul>*/}


                        </div>
                        <ul className="extra-chairs">
                            {Array.from({ length: game.extra_capacity }).map((_, index) => {
                                const chairNumber = index + 19;
                                const isReserved = unavailable.includes(chairNumber);
                                if (isReserved)
                                return (
                                <li key={chairNumber} className="item">
                                    <div className="chair-container">
                                        <div className="tag">EXTRA</div>
                                        <div className="chair unavailable">
                                          <span className="number">
                                            #<span className="key">{chairNumber}</span>
                                          </span>


                                            <svg  className="chair-icon unavailable" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.52 42.55">
                                                <path className="seat" d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                <g>
                                                    <path  className="mark" d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                    <path  className="check" d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </li>
                                );
                                return (
                                    <li key={chairNumber} className="item">
                                        <div className="chair-container" onClick={() => handleChairClick(chairNumber)}>
                                            <div className="tag">EXTRA</div>
                                            <div className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                          <span className="number">
                                            #<span className="key">{chairNumber}</span>
                                          </span>
                                                <svg
                                                    className={`chair-icon ${selectedChairs.includes(chairNumber) ? 'selected' : 'available'}`}
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

                            })}
                        </ul>

                        <div className="faq">
                            <div className="section-top">
                                <div className="section-header">
                                    <h3 className="head">
                                        سوالات قبل از خرید تیکت
                                    </h3>
                                    <h4 className="notice mb-0">
                                        سوالاتی که شاید برای شما نیز پیش بیاید
                                    </h4>
                                </div>
                            </div>
                            <ul className="faq">
                                <li className="question">
                                    <div className="question-mark">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                            <path
                                                d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <div className="head">
                                            چند روز قبل از شروع رویداد، تیکت رویداد را بخریم؟
                                        </div>
                                        <div className="description">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="question">
                                    <div className="question-mark">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                            <path
                                                d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <div className="head">
                                            چند روز قبل از شروع رویداد، تیکت رویداد را بخریم؟
                                        </div>
                                        <div className="description">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                                <li className="question">
                                    <div className="question-mark">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                            <path
                                                d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <div className="head">
                                            چند روز قبل از شروع رویداد، تیکت رویداد را بخریم؟
                                        </div>
                                        <div className="description">
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                                        </div>
                                    </div>
                                    <div className="angle">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                            <path
                                                d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            <ul className="faq-footer">
                                <div className="img-container">
                                    <img src={FAQImage} alt="faq"/>
                                </div>
                                <div className="content">
                                    <div className="head">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                                            <path
                                                d="M16.83,11.56v-.02l-.02-9.26c0-1.26-1.03-2.28-2.28-2.28H2.28C1.02,0,0,1.02,0,2.28v9.24c0,1.26,1.02,2.28,2.28,2.29h1.57v1.52c0,.42.34.76.76.76.16,0,.32-.05.46-.15l2.84-2.13,6.62.02c1.26,0,2.29-1.01,2.29-2.27ZM8.38,10.71h0c-.42,0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76c0,.42-.34.76-.76.76ZM10.44,6.48c-.27.49-.71.87-1.24,1.06v.08c.02.42-.31.77-.73.79-.42.02-.77-.31-.79-.73,0-.02,0-.04,0-.06v-.48c0-.5.37-.93.87-1,.37-.05.65-.38.65-.75,0-.44-.37-.79-.8-.78-.19,0-.37.07-.51.19-.36.22-.83.1-1.04-.27-.21-.35-.11-.79.22-1.02.73-.5,1.68-.55,2.47-.14,1.11.6,1.52,1.99.91,3.1Z"/>
                                            <path
                                                d="M23.71,10.71h-5.36v.83c0,1.82-1.28,3.39-3.07,3.74h6.85c.42.02.75.37.73.79-.01.4-.33.72-.73.73h-9.14c-.42,0-.76-.34-.76-.76,0-.3.18-.58.45-.7h-3.5s0,6.84,0,6.84c0,1.26,1.02,2.28,2.29,2.28h5.15l2.89,1.44c.38.19.83.03,1.02-.34.05-.1.08-.22.08-.34v-.76h3.1c1.26,0,2.28-1.02,2.29-2.28v-9.19c0-1.26-1.02-2.28-2.28-2.29ZM22.14,19.85h-9.14c-.42-.02-.75-.37-.73-.79.01-.4.33-.72.73-.73h9.14c.42.02.75.37.73.79-.01.4-.33.72-.73.73Z"/>
                                        </svg>
                                        ارتـبـاط بـا پشـتـیـبـانی
                                    </div>
                                    <div className="btn">
                                        مشـاهـده بیـشـتـر
                                    </div>
                                </div>
                            </ul>
                        </div>
                        <div className="space-50"></div>
                    </div>
                    <div className="col-lg-6">
                        <div className="game">
                            <div className="game-container">
                                <ul className="chairs right-side">
                                    {Array.from({ length: 9 }).map((_, index) => {
                                            const chairNumber = index + 1;
                                            const isReserved = unavailable.includes(chairNumber);
                                            if (isReserved)
                                              return (
                                                  <li key={index} className="item">
                                                      <div className="chair unavailable">
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                          <svg className="chair-icon unavailable"
                                                               xmlns="http://www.w3.org/2000/svg"
                                                               viewBox="0 0 31.52 42.55">
                                                              <path className="seat"
                                                                    d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                              <g>
                                                                  <path className="mark"
                                                                        d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                                  <path className="check"
                                                                        d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                              </g>
                                                          </svg>
                                                      </div>
                                                  </li>
                                              )
                                            else
                                                return (
                                                    <li key={index} className="item">
                                                        <div onClick={() => handleChairClick(chairNumber)}
                                                             className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                            <svg className="chair-icon available"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 31.53 42.55">
                                                                <path className="seat"
                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"/>
                                                                <g>
                                                                    <path data-name="Path 2078" className="mark"
                                                                          d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"/>
                                                                    <path data-name="Path 2080" className="check"
                                                                          d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"/>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </li>
                                                )
                                        }
                                    )}

                                </ul>
                                <ul className="chairs left-side">
                                    {Array.from({ length: 9 }).map((_, index) => {
                                            const chairNumber = index + 10;
                                            const isReserved = unavailable.includes(chairNumber);
                                            if (isReserved)
                                                return (
                                                    <li key={index} className="item">
                                                        <div className="chair unavailable">
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                            <svg className="chair-icon unavailable"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 31.52 42.55">
                                                                <path className="seat"
                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09-1.91.01-3.45,1.56-3.45,3.47,0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21h.01ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47s-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37h-.01ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31.17-.42.51-.75.93-.92.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62h0Z"/>
                                                                <g>
                                                                    <path className="mark"
                                                                          d="M6.56,9.2c0,.38,0,.77.06,1.15l.17,1.03c.46,1.91,1.53,3.63,3.05,4.89.06.06.17.11.23.17.53.41,1.11.76,1.72,1.04l.34.17c.5.23,1.02.41,1.55.52.29.06.52.12.8.17.42.05.84.07,1.26.06,5.08,0,9.2-4.12,9.2-9.19C24.95,4.12,20.83,0,15.75,0,10.67,0,6.56,4.12,6.56,9.19c0,0,0,0,0,0"/>
                                                                    <path className="check"
                                                                          d="M11.79,11.78c-.35.37-.35.95,0,1.32.16.17.39.28.63.29.24,0,.47-.11.63-.29l2.7-2.65,2.64,2.64c.31.35.84.38,1.18.08.03-.02.05-.05.08-.08.35-.37.35-.95,0-1.32l-2.64-2.64,2.64-2.64c.37-.37.36-.96,0-1.32s-.96-.36-1.32,0h0l-2.64,2.64-2.59-2.64c-.35-.38-.94-.41-1.32-.07-.38.35-.41.94-.07,1.32.02.02.05.05.07.07l2.64,2.64-2.64,2.64Z"/>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </li>
                                                )
                                            else
                                                return (
                                                    <li key={index} className="item">
                                                        <div onClick={() => handleChairClick(chairNumber)}
                                                             className={`chair ${selectedChairs.includes(chairNumber) ? 'selected' : ''}`}>
                                                        <span className="number">
                                                             #<span className="key">{chairNumber}</span>
                                                        </span>
                                                            <svg className="chair-icon available"
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 viewBox="0 0 31.53 42.55">
                                                                <path className="seat"
                                                                      d="M30.95,25.68h0c-.72-1.03-1.91-1.61-3.16-1.54-.28,0-.53.03-.77.09l-.8.18,1.73-6.72c.71-2.74-.55-5.57-3.07-6.87-5.71-3.02-12.53-3.02-18.24,0-2.51,1.3-3.78,4.13-3.07,6.87l1.73,6.7-.79-.17c-.35-.07-.71-.1-1.06-.09C1.54,24.14,0,25.69,0,27.6c0,.45.09.88.26,1.3,1.35,3.3,3.66,6.03,6.7,7.89l.46.29-3.03,4.11c-.13.18-.19.41-.15.64s.16.43.35.56c.38.28.92.2,1.2-.18l3.2-4.34.36.15c2.03.84,4.17,1.26,6.36,1.26h.04c2.25,0,4.39-.42,6.42-1.26l.36-.15,3.21,4.34c.14.18.34.3.57.33.23.03.46-.03.64-.17.38-.28.46-.82.18-1.2l-3.03-4.1.46-.28c3.04-1.87,5.35-4.6,6.7-7.89.44-1.06.31-2.26-.32-3.21ZM5.26,17.26c-.51-1.96.38-3.97,2.18-4.9,5.21-2.77,11.43-2.77,16.65,0,1.8.92,2.69,2.94,2.18,4.9l-2.42,9.37-.15.11c-2.37,1.65-5.15,2.47-7.93,2.47-2.78,0-5.56-.82-7.93-2.47l-.15-.11-2.42-9.37ZM29.67,28.24c-2.31,5.65-7.76,9.31-13.86,9.31h-.02c-6.17,0-11.61-3.65-13.93-9.3-.17-.42-.17-.89,0-1.31s.51-.75.93-.92c.21-.09.39-.14.65-.13.59-.09,1.25.16,1.68.67,1.69,2.13,5.72,4.4,10.63,4.4s8.95-2.27,10.62-4.39c.32-.42.82-.68,1.37-.68.62-.1,1.32.18,1.74.74.34.49.4,1.09.19,1.62Z"/>
                                                                <g>
                                                                    <path data-name="Path 2078" className="mark"
                                                                          d="M24.95,9.19c0,.34-.02.67-.06,1.01-.55,5.05-5.1,8.69-10.14,8.14-5.05-.55-8.69-5.1-8.14-10.14C7.17,3.14,11.71-.5,16.76.06c4.66.51,8.19,4.45,8.19,9.14"/>
                                                                    <path data-name="Path 2080" className="check"
                                                                          d="M14.49,13.4c-1.17-1.17-2.34-2.36-3.52-3.53-.13-.13-.13-.34,0-.47l1.36-1.35c.13-.13.34-.13.47,0l1.93,1.93,4.98-4.98c.13-.13.34-.13.48,0l1.36,1.36c.13.13.13.34,0,.47,0,0,0,0,0,0l-6.58,6.57c-.13.13-.34.13-.47,0,0,0,0,0,0,0"/>
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </li>
                                                )
                                        }
                                    )}

                                </ul>
                                <ul className="content">
                                    <li className="item date mb-0 mt-0">
                                        <span className="number">1403</span>
                                        <span className="slash">/</span>
                                        <span className="number">03</span>
                                        <span className="slash">/</span>
                                        <span className="number">23</span>
                                    </li>
                                    <li className="item mt-0 ">
                                        <span className="val">{game.clock.split('-')[0]}</span>
                                        <span className="notice">الی</span>
                                        <span className="val">{game.clock.split('-')[1]}</span>
                                        <div className="notice">شـروع و پـایـان</div>
                                        <div className="status standby">STANDBY</div>
                                    </li>
                                    <li className="goal">
                                        <div className="img-container">
                                            <img src={GoalIcon} alt="goal"/>
                                        </div>
                                        <div className="txt">SEASON</div>
                                        <div className="xp">
                                          {/*  <span className="notice">فصل</span>*/}
                                            شاهد

                                        </div>
                                    </li>
                                    {
                                        selectedChairs.length ?
                                            <li className="reserve-btn-container" onClick={() => setShowReserveModal(true) }>
                                                <div className="reserve-btn">رزرو جایگاه انتخاب شده</div>
                                            </li>
                                            :
                                            null
                                    }
                                    <li className="tag item mb-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 116.25 67.4">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M13.67.04l6.85.02c2.27.03,3.41,1.16,3.42,3.38-.01,2.3-1.16,3.45-3.44,3.44l-6.82.02c-4.55-.03-6.82,2.24-6.82,6.82s2.28,6.81,6.84,6.84h6.8c2.28.04,3.42,1.17,3.42,3.38s-1.13,3.42-3.38,3.44h-6.84C4.59,27.36.03,22.8.02,13.69.02,4.58,4.57.02,13.67.04Z"/>
                                                    <path
                                                        d="M32.91,27.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26s-.46-1.12-.46-1.73,1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.3-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.27,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.13,10.57,5.13,11.16s-.15,1.18-.46,1.73c-.31.55-.73.97-1.28,1.26-.55.29-1.11.44-1.68.44h-20.49ZM47.82,20.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                    <path
                                                        d="M65.78,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v3.38h13.67c2.26.03,3.39,1.17,3.4,3.42-.03,2.28-1.17,3.42-3.4,3.42l-13.67.02v6.84c-.01,2.24-1.16,3.38-3.44,3.4-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45Z"/>
                                                    <path
                                                        d="M95.24,0l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32V3.45c.01-2.26,1.15-3.41,3.42-3.45ZM100.31,13.78c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                </g>
                                                <g>
                                                    <path
                                                        d="M13.67,40.03l6.87-.02c2.23.01,3.36,1.16,3.38,3.45-.02,2.26-1.15,3.37-3.37,3.33l-6.85.03c-1.16,0-2.29.29-3.38.88s-1.94,1.43-2.55,2.53-.92,2.25-.92,3.44.3,2.32.91,3.4c.6,1.08,1.45,1.93,2.54,2.53,1.09.6,2.22.91,3.41.91s2.38-.28,3.6-.85c1.21-.56,2.09-1.44,2.64-2.62h-2.85c-2.3.01-3.46-1.11-3.47-3.35,0-2.28,1.14-3.44,3.42-3.47l6.87.03c2.3.05,3.46,1.2,3.47,3.45,0,2.37-.6,4.64-1.8,6.81-1.2,2.17-2.89,3.86-5.07,5.06-2.18,1.2-4.46,1.8-6.84,1.8s-4.63-.6-6.8-1.8c-2.18-1.2-3.87-2.89-5.07-5.06-1.2-2.17-1.8-4.44-1.8-6.81s.61-4.67,1.83-6.86c1.22-2.19,2.92-3.88,5.1-5.06,2.18-1.18,4.43-1.77,6.74-1.77Z"/>
                                                    <path
                                                        d="M34.23,67.38c-.58,0-1.14-.15-1.68-.44-.54-.29-.97-.71-1.27-1.26-.31-.55-.46-1.12-.46-1.73s1.7-4.31,5.11-11.16c3.41-6.85,5.26-10.54,5.55-11.08.29-.54.72-.96,1.26-1.26.55-.3,1.12-.45,1.71-.45s1.16.15,1.7.45c.54.3.96.72,1.26,1.26.3.54,2.16,4.24,5.59,11.08,3.42,6.85,5.14,10.57,5.14,11.16s-.15,1.18-.46,1.73c-.31.55-.74.97-1.28,1.26-.55.29-1.11.44-1.67.44h-20.49ZM49.13,60.49l-4.68-9.62-4.7,9.62h9.38Z"/>
                                                    <path
                                                        d="M64.96,40.03c1.15.02,2,.31,2.55.87.55.56,3.13,3.13,7.74,7.72,4.56-4.56,7.12-7.13,7.69-7.72.57-.59,1.42-.88,2.55-.88,2.27.01,3.41,1.14,3.42,3.4l.02,20.51c0,2.27-1.15,3.42-3.45,3.45-2.26-.01-3.4-1.16-3.44-3.45v-12.08c-2.29,2.36-3.72,3.83-4.28,4.4-.56.58-1.41.86-2.54.86s-1.93-.3-2.52-.89c-.59-.59-2.02-2.03-4.3-4.31v12.01c-.01,2.26-1.15,3.4-3.42,3.42-2.29.01-3.43-1.13-3.42-3.42v-20.51c0-2.27,1.13-3.4,3.4-3.4Z"/>
                                                    <path
                                                        d="M95.74,40l17.29.04c2.13.03,3.2,1.14,3.21,3.31,0,2.32-1.15,3.5-3.45,3.54h-13.62v13.62h13.59c2.3.01,3.45,1.16,3.45,3.45-.01,2.24-1.14,3.38-3.38,3.4h-17.09c-2.27,0-3.41-1.1-3.42-3.32v-20.59c.01-2.26,1.15-3.41,3.42-3.45ZM100.81,53.77c.02-2.28,1.15-3.44,3.38-3.47h6.87c2.28.02,3.43,1.17,3.47,3.43-.05,2.28-1.2,3.42-3.45,3.42h-6.87c-2.26.01-3.39-1.12-3.4-3.38Z"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </li>
                                    <li className="d-flex justify-content-center">
                                        <div className="game-21-badge">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.18 39.53">
                                                <g>
                                                    <path
                                                        d="M3.32,17.74h3.14c.06-.36.12-.71.19-1.06.55-2.41,2.79-4.05,5.26-3.85,1.12.09,2.18.53,3.04,1.26,1.43,1.13,2.06,2.99,1.61,4.76-.4,1.86-1.25,3.59-2.49,5.03-.79.96-1.65,1.87-2.52,2.76-2.11,2.17-4.24,4.31-6.35,6.47-.95.97-1.87,1.95-2.8,2.94-.08.1-.12.22-.12.35.07.53-.16,1.06-.6,1.38-.46.41-1.52,1.51-1.66,1.64,0-.11-.01-.16-.01-.22,0-1.27-.01-2.54,0-3.81.01-.15.08-.29.18-.4,2.18-2.22,4.37-4.44,6.56-6.65,1.47-1.49,2.95-2.98,4.38-4.5,1.08-1.12,1.99-2.4,2.67-3.81.29-.56.48-1.16.58-1.78.25-1.5-.76-2.92-2.26-3.18-.22-.04-.44-.05-.66-.03-1.39.03-2.57,1.04-2.8,2.42-.11.72-.17,1.45-.19,2.18,0,.1,0,.21,0,.32H.81c.02-.28.04-.55.07-.81.1-.98.14-1.98.33-2.93.46-2.51,1.85-4.75,3.89-6.27,3.07-2.33,6.52-3.04,10.17-1.76,3.25,1.04,5.72,3.71,6.5,7.03.25,1.15.29,2.34.11,3.5-.36,2.65-1.42,5.16-3.05,7.28-.89,1.26-1.87,2.45-2.94,3.56-2.38,2.41-4.74,4.82-7.11,7.24-.08.08-.48.51-.48.51,0,0,.88-.02,1.19-.02,1.19,0,2.38-.06,3.57-.07,2.25-.03,4.5-.05,6.75-.07.06,0,.13,0,.21-.01v-2.83h-6.61s.04-.09.07-.13c.63-.64,1.26-1.27,1.89-1.91.13-.14.33-.22.52-.2,2,0,3.99,0,5.99,0h.3v7.34H3.11c.11-.12.17-.19.24-.25,2.48-2.51,4.97-5.01,7.43-7.54,1.53-1.57,3.04-3.16,4.49-4.8,1.58-1.79,2.87-3.83,3.82-6.02.84-1.74.97-3.73.39-5.57-.81-2.72-3.12-4.72-5.93-5.13-2.79-.58-5.68.25-7.74,2.21-1.42,1.27-2.3,3.04-2.46,4.93-.01.15-.01.3-.02.49"/>
                                                    <path
                                                        d="M31.12,31.07h-7.68V7.47h-6.74c.42-.69.82-1.34,1.22-2,1.06-1.77,2.12-3.55,3.18-5.33C21.18,0,21.27,0,21.4,0h9.72v31.07ZM25.73,5.2v23.56h3.12V2.28s-.04-.02-.06-.02h-6.23c-.07.01-.15.05-.19.11-.54.87-1.07,1.75-1.6,2.63-.03.05-.05.11-.09.19h5.05Z"/>
                                                    <path
                                                        d="M28.86,37.2v2.33h-2.72v-2.31h-2.31v-2.72h2.31v-2.31h2.72v2.3h2.32v2.73h-2.32Z"/>
                                                </g>
                                            </svg>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="game-start">
                            شروع بازی
                        </div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                        <div className="space-50"></div>
                    </div>
                </div>
                :
                <div className="row">
                    Loading
                </div>
            }
        </div>
    );
}

export default Game;
