
import './Game.css';
import React, {useEffect, useState} from "react";
import {json, Link, useParams} from 'react-router-dom';
import axios from "axios";
import ConvertToShamsiDate from "./ConverToShamsiDate";
import CubeIcon from "../assets/icons/cube.svg";
import ClockIcon from "../assets/icons/clock.svg";
import UserIcon from "../assets/icons/user-bold.svg";
import Collapse from "react-bootstrap/Collapse";
import Skeleton from "./Skeleton";
import AvatarImage from "../assets/avatar.png";
import LevelIcon from "../assets/icons/level.svg";


function LeaderBoard() {

    const [leaderBoard, setLeaderBoard] = useState({});
    const [loading, setLoading] = useState(true);


    function get() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken}
        setLoading(true)
        axios.get(process.env.REACT_APP_API + "games/leaderboard", {headers : headers})
            .then((response) => {
                console.log(response.data)
                setLeaderBoard(response.data)
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        get();
        document.title = '21+ | Leaderboard'
        window.scrollTo(0, 0);
    }, []);
    return <section className="games-archive">
        <div className="container">
            <div className="row">
                <div className="space-25"></div>
                <div className="col-12">
                    <div className="section-top">
                        <div className="section-header">
                            <h3 className="head">
                                 بازیکنان برتر ( لـیـدر بُرد )
                            </h3>
                            <h4 className="notice mb-0">
                                بازیکنان برتر بر اساس بیشترین امتیاز رده بندی میشوند
                            </h4>
                        </div>
                    </div>
                    {loading ?
                        <div className="top-players">
                            <ul className="player-cards">
                                {Array.from({length: 10}).map((_, index) => {
                                        return (
                                            <li key={index} className="player">
                                                <div className="avatar">
                                                    <div className="img-container">
                                                        <Skeleton width={"100%"} height={"100%"}/>
                                                    </div>
                                                </div>
                                                <ul className="player-info ">
                                                    <li className="head mb-0">
                                                        <div className="name w-100 text-right">
                                                            <Skeleton width={"30%"} height={"25px"}/>
                                                        </div>
                                                    </li>
                                                    <li className="foot ">
                                                        <div className="item w-100">
                                                            <Skeleton width={"70%"} height={"15px"}/>
                                                        </div>
                                                        <div className="item ml-2">
                                                            <Skeleton width={"50px"} height={"15px"}/>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        )
                                    }
                                )}
                                <li className="w-100 mb-0 pr-2 pl-2">
                                    <Skeleton width={"100%"} height={"35px"}/>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="top-players">
                            <ul className="player-cards">
                                {leaderBoard.players.map((player, index) => {
                                    return (
                                        <li key={index} className="player" style={index === 49 ? {borderBottom : "transparent"} : null}>
                                            <div className="avatar">
                                                <div className="img-container">
                                                    {player.avatar ?
                                                        <img className="avatar-img" src={player.avatar} alt={player.name}/>
                                                        :
                                                        <img className="avatar-img" src={AvatarImage} alt={player.name}/>
                                                    }

                                                </div>
                                                <div className="number">#{index + 1}</div>
                                            </div>
                                            <ul className="player-info">
                                                <li className="head">
                                                    <div className="name">
                                                        {player.name + " " + player.family}
                                                    </div>
                                                    <div className="level">
                                                        Lv.
                                                        <span className="lvl">{player.level}</span>
                                                        <div className="icon-container">
                                                            <img src={LevelIcon} alt="Level"/>
                                                        </div>

                                                    </div>
                                                </li>
                                                <li className="foot">
                                                    <div className="item">
                                                        <svg className="win-icon" xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 40.79 56.72">
                                                            <path id="Path_45" data-name="Path 45" className="cls-1"
                                                                  d="M29.47,39.75l2.6-4.21,4.68-1.6.52-4.92,3.52-3.46-1.67-4.65,1.68-4.66-3.52-3.46-.52-4.92-4.69-1.6-2.59-4.21-4.92.59-4.16-2.66-4.17,2.66-4.91-.59-2.59,4.21-4.68,1.6-.52,4.92-3.52,3.46,1.67,4.65-1.67,4.65,3.52,3.46.52,4.92,4.68,1.6,2.6,4.21,4.91-.59,4.17,2.66,4.16-2.65,4.92.59ZM6.05,20.92c0-7.92,6.42-14.34,14.34-14.34s14.34,6.42,14.34,14.34-6.42,14.34-14.34,14.34c-7.92,0-14.34-6.43-14.34-14.34h0Z"/>
                                                            <path id="Path_46" data-name="Path 46" className="cls-1"
                                                                  d="M20.39,9.9c-6.08,0-11.01,4.93-11.01,11.01,0,6.08,4.93,11.01,11.01,11.01,6.08,0,11.01-4.93,11.01-11.01h0c0-6.08-4.93-11.01-11.01-11.01ZM15.43,42.61l-5.85.7-3.08-5-1.05-.36L.93,52.08l8.14-.45,6.37,5.09,3.75-11.71-3.76-2.4ZM34.26,38.31l-3.08,5-5.85-.7-3.77,2.4,3.75,11.71,6.37-5.09,8.14.45-4.52-14.13-1.04.36Z"/>
                                                        </svg>
                                                        <span className="strong">{player.win}</span>
                                                        برد
                                                    </div>
                                                    <div className="item">

                                                        <svg className="score-icon" xmlns="http://www.w3.org/2000/svg"
                                                             viewBox="0 0 23.21 23.21">
                                                            <path id="Path_48" data-name="Path 48" className="cls-1"
                                                                  d="M22.05,1.16h-3.48V0H4.64v1.16H1.16C.56,1.13.04,1.59,0,2.2c0,.04,0,.08,0,.12v2.78c0,2.66,2,4.91,4.64,5.22v.12c-.02,3.28,2.26,6.13,5.46,6.85l-.81,2.44h-2.67c-.49.01-.91.34-1.04.81l-.93,2.67h13.92l-.93-2.67c-.13-.47-.56-.8-1.04-.81h-2.67l-.81-2.44c3.2-.72,5.47-3.57,5.45-6.85v-.12c2.65-.31,4.64-2.56,4.64-5.22v-2.78c.03-.61-.43-1.13-1.04-1.16-.04,0-.08,0-.13,0ZM4.64,8.01c-1.33-.34-2.28-1.53-2.32-2.9v-1.63h2.32v4.53ZM13.93,11.61l-2.32-1.28-2.32,1.27.58-2.32-1.74-2.32h2.44l1.04-2.32,1.04,2.32h2.44l-1.74,2.32.58,2.32ZM20.89,5.11c0,1.39-.97,2.59-2.32,2.9V3.48h2.32v1.63Z"/>
                                                        </svg>
                                                        <span className="strong">{player.score}</span>
                                                        امتیاز
                                                    </div>
                                                    <div className="item reg-date">
                                                <span className="ml-1">
                                                    از
                                                </span>
                                                        <ConvertToShamsiDate leaderboard={1}
                                                                             gregorianDate={player.created_at}/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div>
            {leaderBoard.self_rank?
                <div className="my-rank">
                    <div className="player">
                        <div className="avatar">
                            <div className="img-container">
                                {leaderBoard.self.avatar ?
                                    <img className="avatar-img" src={leaderBoard.self.avatar} alt={leaderBoard.self}/>
                                    :
                                    <img className="avatar-img" src={AvatarImage} alt={leaderBoard.self.name}/>
                                }

                            </div>
                            <div className="number">#{leaderBoard.self_rank}</div>
                        </div>
                        <ul className="player-info">
                            <li className="head">
                                <div className="name">
                                    {leaderBoard.self.name + " " + leaderBoard.self.family}
                                </div>
                                <div className="level">
                                    Lv.
                                    <span className="lvl">{leaderBoard.self.level}</span>
                                    <div className="icon-container">
                                        <img src={LevelIcon} alt="Level"/>
                                    </div>

                                </div>
                            </li>
                            <li className="foot">
                                <div className="item">
                                    <svg className="win-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 40.79 56.72">
                                        <path id="Path_45" data-name="Path 45" className="cls-1"
                                              d="M29.47,39.75l2.6-4.21,4.68-1.6.52-4.92,3.52-3.46-1.67-4.65,1.68-4.66-3.52-3.46-.52-4.92-4.69-1.6-2.59-4.21-4.92.59-4.16-2.66-4.17,2.66-4.91-.59-2.59,4.21-4.68,1.6-.52,4.92-3.52,3.46,1.67,4.65-1.67,4.65,3.52,3.46.52,4.92,4.68,1.6,2.6,4.21,4.91-.59,4.17,2.66,4.16-2.65,4.92.59ZM6.05,20.92c0-7.92,6.42-14.34,14.34-14.34s14.34,6.42,14.34,14.34-6.42,14.34-14.34,14.34c-7.92,0-14.34-6.43-14.34-14.34h0Z"/>
                                        <path id="Path_46" data-name="Path 46" className="cls-1"
                                              d="M20.39,9.9c-6.08,0-11.01,4.93-11.01,11.01,0,6.08,4.93,11.01,11.01,11.01,6.08,0,11.01-4.93,11.01-11.01h0c0-6.08-4.93-11.01-11.01-11.01ZM15.43,42.61l-5.85.7-3.08-5-1.05-.36L.93,52.08l8.14-.45,6.37,5.09,3.75-11.71-3.76-2.4ZM34.26,38.31l-3.08,5-5.85-.7-3.77,2.4,3.75,11.71,6.37-5.09,8.14.45-4.52-14.13-1.04.36Z"/>
                                    </svg>
                                    <span className="strong">{leaderBoard.self.win}</span>
                                    برد
                                </div>
                                <div className="item">

                                    <svg className="score-icon" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 23.21 23.21">
                                        <path id="Path_48" data-name="Path 48" className="cls-1"
                                              d="M22.05,1.16h-3.48V0H4.64v1.16H1.16C.56,1.13.04,1.59,0,2.2c0,.04,0,.08,0,.12v2.78c0,2.66,2,4.91,4.64,5.22v.12c-.02,3.28,2.26,6.13,5.46,6.85l-.81,2.44h-2.67c-.49.01-.91.34-1.04.81l-.93,2.67h13.92l-.93-2.67c-.13-.47-.56-.8-1.04-.81h-2.67l-.81-2.44c3.2-.72,5.47-3.57,5.45-6.85v-.12c2.65-.31,4.64-2.56,4.64-5.22v-2.78c.03-.61-.43-1.13-1.04-1.16-.04,0-.08,0-.13,0ZM4.64,8.01c-1.33-.34-2.28-1.53-2.32-2.9v-1.63h2.32v4.53ZM13.93,11.61l-2.32-1.28-2.32,1.27.58-2.32-1.74-2.32h2.44l1.04-2.32,1.04,2.32h2.44l-1.74,2.32.58,2.32ZM20.89,5.11c0,1.39-.97,2.59-2.32,2.9V3.48h2.32v1.63Z"/>
                                    </svg>
                                    <span className="strong">{leaderBoard.self.score}</span>
                                    امتیاز
                                </div>
                                <div className="item reg-date">
                                                <span className="ml-1">
                                                    از
                                                </span>
                                    <ConvertToShamsiDate leaderboard={1}
                                                         gregorianDate={leaderBoard.self.created_at}/>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
                :null}
            {leaderBoard.self_rank ?
                <>
                    <div className="space-50"></div>
                    <div className="space-25"></div>
                </>
                : null}
            <div className="space-50"></div>
            <div className="space-50"></div>
            <div className="space-25"></div>
        </div>

    </section>

}

export default LeaderBoard;
