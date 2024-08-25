
import CubeIcon from "../assets/icons/cube.svg";
import ClockIcon from "../assets/icons/clock.svg";
import UserIcon from "../assets/icons/user-bold.svg";
import './Cubes.css'
import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import AvatarImage from "../assets/delete/avatar.jpg";
import LevelIcon from "../assets/icons/level.svg";
import axios from "axios";
import {Link} from "react-router-dom";
import ConvertToShamsiDate from "../components/ConverToShamsiDate";

function Cubes() {

    const [showCube, setShowCube] = useState(false);
    const [games, setCubes] = useState();
    const [isLoading, setIsLoading] = useState(true);


    function getCubes() {
        axios.get( process.env.REACT_APP_API + "games")
            .then(response => {
                setCubes(response.data)
                setIsLoading(false)

                console.log(response)
            });

    }

    const groupedGames = Array.isArray(games) ? games.reduce((groups, game) => {
        if (!groups[game.salon]) {
            groups[game.salon] = [];
        }
        groups[game.salon].push(game);
        return groups;
    }, {}) : {};

    const times = x => f => {
        if (x > 0) {
            f()
            times (x - 1) (f)
        }
    }

    useEffect(() => {
        getCubes()
    }, []);

    return (
        <section className="cubes">
            <div className="container">
                <div className="row">
                    <div className="col-12 section-top">
                        <div className="section-header">
                            <h3 className="head">
                                برنامه مافیا سالن ها
                            </h3>
                            <h4 className="notice mb-0">
                                امروز
                                {/*<span className="date">26 تیر 1403</span>*/}
                                <span className="date"><ConvertToShamsiDate gregorianDate={new Date()} name={1}/> </span>
                                ، برای خرید بلیط روی ساعت و سالن مورد نظر خود کلیک کنید
                            </h4>
                        </div>
                        <div className="header-more">
                            <svg className="more-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 56.88 56.87">
                                <path
                                    d="M56.88,28.43c0,15.71-12.73,28.44-28.44,28.44S0,44.14,0,28.43c0-1.12.91-2.03,2.03-2.03s2.03.91,2.03,2.03c-.02,13.48,10.89,24.43,24.37,24.45,13.48.02,24.43-10.89,24.45-24.37.02-13.48-10.89-24.43-24.37-24.45-4.81,0-9.51,1.41-13.52,4.06h1.26c1.12,0,2.03.91,2.03,2.03s-.91,2.03-2.03,2.03h-6.09c-1.12,0-2.03-.91-2.03-2.03v-6.09c0-1.12.91-2.03,2.03-2.03s2.03.91,2.03,2.03v1.04C25.08-3.87,42.8-.7,51.78,12.19c3.32,4.77,5.1,10.44,5.1,16.24ZM46.72,28.43c0,10.1-8.18,18.28-18.28,18.28s-18.28-8.18-18.28-18.28S18.34,10.15,28.44,10.15s18.28,8.18,18.28,18.28h0ZM35.66,30.81l-5.19-3.46v-9.07c0-1.12-.91-2.03-2.03-2.03s-2.03.91-2.03,2.03v10.16c0,.68.34,1.31.9,1.69l6.09,4.06c.93.62,2.19.37,2.82-.56.62-.93.37-2.19-.56-2.82h0Z"/>
                            </svg>
                            تــاریـخـچـه بــــازی هـا
                        </div>
                    </div>
                </div>
                {
                    !isLoading ?
                        <div className="row">
                            {Object.keys(groupedGames).map(salon => (
                                <div className="col-lg-4" key={salon}>
                                    <div className="cube-card">
                                        <div className="head">
                                            <div className="right">
                                                <div className="number">ســالـن {salon}</div>
                                                <div className="manager">
                                                    گرداننده سالن :
                                                    <span className="cube-god"> امین رضایی </span>
                                                </div>
                                            </div>
                                            <div className="cube-num">
                                                <img src={CubeIcon} alt="cube"/>
                                                <div className="cube">CUBE</div>
                                                <div className="tag">#{salon}</div>
                                            </div>
                                        </div>
                                        {groupedGames[salon].map((game, index) => (
                                            <Link key={index} to={"game/"+game.id}>
                                                <div className="cube">
                                                    <div className="cube-info">
                                                        <ul className="cube-box">
                                                            <li className="event">
                                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                                <div className="time">
                                                                <span
                                                                    className="start">{game.clock.split('-')[0]}</span>
                                                                    <span className="dot">الی</span>
                                                                    <span
                                                                        className="end">{game.clock.split('-')[1]}</span>
                                                                    <div className="notice">شــروع و پـایـان</div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                        <div className="more">+</div>
                                                        <ul className="cube-box">
                                                            {game.available_capacity <= 0 ?
                                                                <li className="event closed">
                                                                    <svg className="close"
                                                                         xmlns="http://www.w3.org/2000/svg"
                                                                         viewBox="0 0 56.67 56.67">
                                                                        <path className="cls-1"
                                                                              d="M28.33,0C12.69,0,0,12.69,0,28.33s12.69,28.33,28.33,28.33,28.33-12.69,28.33-28.33C56.65,12.69,43.97.02,28.33,0ZM38.77,35.43c.92.92.92,2.42,0,3.34-.92.92-2.42.92-3.34,0l-7.1-7.1-7.09,7.1c-.92.92-2.42.92-3.34,0-.92-.92-.92-2.42,0-3.34l7.1-7.1-7.1-7.09c-.92-.92-.92-2.42,0-3.34.92-.92,2.42-.92,3.34,0l7.09,7.1,7.1-7.1c.92-.92,2.42-.92,3.34,0,.92.92.92,2.42,0,3.34l-7.1,7.09,7.1,7.1Z"/>
                                                                    </svg>
                                                                    <div className="full">
                                                                        طرفیت تکمیل
                                                                    </div>
                                                                </li>
                                                                :
                                                                <li className="event">
                                                                    <div className="time">
                                                                <span
                                                                    className="start cap">{game.available_capacity}</span>
                                                                        <span className="dot">/</span>
                                                                        <span
                                                                            className="end">{+game.capacity + +game.extra_capacity}</span>
                                                                        <div className="notice">ظـرفیت میـز</div>
                                                                    </div>
                                                                    <img className="mr-2" src={UserIcon} alt="user"/>
                                                                </li>
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}


                            {/*<div className="col-lg-4">
                                <div className="cube-card">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number">ســالـن یــک</div>
                                            <div className="manager">
                                                گرداننده سالن :
                                                <span className="cube-god">
                                            امین رضایی
                                        </span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#1</div>
                                        </div>
                                    </div>

                                    <div className="cube-info" onClick={() => setShowCube(!showCube)}>
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cube-card">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number">ســالـن دو</div>
                                            <div className="manager">
                                                گرداننده سالن :
                                                <span className="cube-god">
                                            امین رضایی
                                        </span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#2</div>
                                        </div>
                                    </div>

                                    <div className="cube-info" onClick={() => navigate("game")}>
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="status live">LIVE</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="status standby">STANDBY</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cube-card">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number">ســالـن ســه</div>
                                            <div className="manager">
                                                گرداننده سالن :
                                                <span className="cube-god">
                                            امین رضایی
                                        </span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#3</div>
                                        </div>
                                    </div>

                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>

                                        <ul className="cube-box">
                                            <li className="event closed">

                                                <svg className="close" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 56.67 56.67">
                                                    <path className="cls-1"
                                                          d="M28.33,0C12.69,0,0,12.69,0,28.33s12.69,28.33,28.33,28.33,28.33-12.69,28.33-28.33C56.65,12.69,43.97.02,28.33,0ZM38.77,35.43c.92.92.92,2.42,0,3.34-.92.92-2.42.92-3.34,0l-7.1-7.1-7.09,7.1c-.92.92-2.42.92-3.34,0-.92-.92-.92-2.42,0-3.34l7.1-7.1-7.1-7.09c-.92-.92-.92-2.42,0-3.34.92-.92,2.42-.92,3.34,0l7.09,7.1,7.1-7.1c.92-.92,2.42-.92,3.34,0,.92.92.92,2.42,0,3.34l-7.1,7.09,7.1,7.1Z"/>
                                                </svg>
                                                <div className="full">
                                                    طرفیت تکمیل
                                                </div>


                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cube-info">
                                        <ul className="cube-box">
                                            <li className="event">
                                                <img className="ml-2" src={ClockIcon} alt="clock"/>
                                                <div className="time">
                                                    <span className="start">16</span>
                                                    <span className="dot">الی</span>
                                                    <span className="end">18</span>
                                                    <div className="notice">شــروع و پـایـان</div>
                                                </div>

                                            </li>
                                        </ul>
                                        <div className="more">+</div>
                                        <ul className="cube-box">
                                            <li className="event">

                                                <div className="time">
                                                    <span className="start cap">5</span>
                                                    <span className="dot">/</span>
                                                    <span className="end">20</span>
                                                    <div className="notice">ظـرفیت میـز</div>
                                                </div>

                                                <img className="mr-2" src={UserIcon} alt="user"/>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>*/}
                        </div>

                        :

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="cube-card ">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number"> ســالـن اول</div>
                                            <div className="manager">
                                                <span className="c-skeleton-line"></span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#1</div>
                                        </div>
                                    </div>
                                    <div className="cube">
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cube-card ">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number"> ســالـن دوم</div>
                                            <div className="manager">
                                                <span className="c-skeleton-line"></span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#2</div>
                                        </div>
                                    </div>
                                    <div className="cube">
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="cube-card ">
                                    <div className="head">
                                        <div className="right">
                                            <div className="number"> ســالـن ســوم</div>
                                            <div className="manager">
                                                <span className="c-skeleton-line"></span>
                                            </div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#3</div>
                                        </div>
                                    </div>
                                    <div className="cube">
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                        <div className="cube-loading c-skeleton-square"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }

            </div>
            <Modal show={showCube} onHide={() => setShowCube(!showCube)} centered className="cube-info-modal">
                {/*<Modal.Header>
                    <Modal.Title>
                        <button className="close" onClick={() => setShowCube(!showCube)}>
                            <i className="fa-light fa-xmark"/>
                        </button>
                    </Modal.Title>
                </Modal.Header>*/}

                <Modal.Body>
                    {/*<div className="modal-logo">*/}
                    {/*    <img src={Logo} alt="logo"/>*/}

                    {/*</div>*/}
                    <div className="title">
                        برنامه مافیا سالن یک
                    </div>
                    <div className="info">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.06 23.06">
                                    <path
                                        d="M21.49,18.87h-3.67c-2.31,0-4.19-1.88-4.19-4.19s1.88-4.19,4.19-4.19h3.67c.29,0,.52-.23.52-.52h0v-1.57c0-1.1-.85-1.99-1.93-2.08l-3.01-5.26c-.28-.49-.73-.83-1.27-.98-.54-.14-1.1-.07-1.58.21L3.91,6.29h-1.81c-1.16,0-2.1.94-2.1,2.1v12.58c0,1.16.94,2.1,2.1,2.1h17.82c1.16,0,2.1-.94,2.1-2.1v-1.57c0-.29-.23-.52-.52-.52h0,0ZM17.73,4.3l1.14,1.99h-4.57l3.43-1.99ZM5.99,6.29L14.76,1.19c.24-.14.51-.18.78-.1.27.07.49.24.63.49h0s-8.1,4.72-8.1,4.72c0,0-2.07,0-2.07,0Z"/>
                                    <path
                                        d="M21.49,11.53h-3.67c-1.73,0-3.15,1.41-3.15,3.15s1.41,3.15,3.15,3.15h3.67c.87,0,1.57-.71,1.57-1.57v-3.15c0-.87-.71-1.57-1.57-1.57h0ZM17.82,15.73c-.58,0-1.05-.47-1.05-1.05s.47-1.05,1.05-1.05,1.05.47,1.05,1.05c0,.58-.47,1.05-1.05,1.05Z"/>
                                </svg>
                                <span className="attr">قیمت</span>
                                <span className="val price">35،000</span>
                                <span className="notice">تومان</span>
                            </li>
                        </ul>
                        <ul className="mafia-info">
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
                        </ul>


                        <div className="god">
                            <div className="avatar">
                                <div className="img-container">
                                    <img src={AvatarImage} alt="avatar"/>
                                </div>
                            </div>
                            <ul className="player-info">
                                <li className="tag">
                                    گرداننده این رویداد
                                </li>
                                <li className="head">
                                    <div className="name">
                                        محمد خامی
                                    </div>
                                    <div className="level">
                                        Lv.
                                        <span className="lvl">8</span>
                                        <div className="icon-container">
                                            <img src={LevelIcon} alt="Level"/>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
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
        </section>
    );
}

export default Cubes;