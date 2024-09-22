
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


function GameHistory(props) {

    const [games, setGames] = useState();
    const [loading, setLoading] = useState(true);
    const [collapsedSalons, setCollapsedSalons] = useState({});
    const [page, setPage] = useState(process.env.REACT_APP_API + "games/archive?page=1");
    const toggleCollapse = (date, salon) => {
        setCollapsedSalons(prevState => ({
            ...prevState,
            [date]: {
                ...prevState[date],
                [salon]: !prevState[date]?.[salon] // Toggle collapse state for the salon
            }
        }));
    };

    function get(link) {

        setLoading(true)
        axios.get(link ?? page, null)
            .then((response) => {
                console.log(response.data)
                setGames(response.data)


                const initialCollapsedSalons = {};
                Object.keys(response.data.data).forEach(date => {
                    initialCollapsedSalons[date] = {};
                    Object.keys(response.data.data[date]).forEach(salon => {
                        initialCollapsedSalons[date][salon] = false; // Set all salons to collapsed by default
                    });
                });
                setCollapsedSalons(initialCollapsedSalons);


                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        get();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'})
        document.title = '21+ | Games History'
        window.scrollTo(0, 0);
    }, []);
    return <section className="games-archive">
        <div className="container">
            <div className="row">
                <div className="space-25"></div>
                <div className="col-12 section-top">

                    <div className="section-header">
                        <h3 className="head">
                            تاریخچه بازی ها
                        </h3>
                        <h4 className="notice mb-0">
                            بازی های انجام شده در روز های گذشته، به ترتیب از جدید ترین
                        </h4>
                    </div>
                </div>
            </div>
            <div className="row">
                {loading ?
                    Array.from({length : 7 }).map((_, index) => (
                    <div key={index} className="col-12">
                        <div className="history-card">
                            <div className="history-head d-flex justify-content-between">
                                <Skeleton width="80px" height="25px" />
                                <Skeleton width="100px" height="20px"/>
                            </div>
                        </div>
                        <div className="row">
                            {Array.from({length : 3 }).map((_, index) => (
                                <div key={index} className="col-lg-4">
                                    <div className="cube-card archive">
                                        <div className="head mb-0 pt-2">
                                            <div className="right">
                                                <div className="number d-flex">
                                                    <Skeleton width="80px" height="20px"/>
                                                </div>
                                                <div className="manager">
                                                    <Skeleton width="150px" height="15px"/>
                                                </div>
                                            </div>
                                            <div className="cube-num">
                                                <img src={CubeIcon} alt="cube"/>
                                                <div className="cube">CUBE</div>
                                                <div className="tag"><Skeleton width="30px" borderRadius={5}
                                                                               height="15px"/></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))
                    :
                    Object.keys(games.data).map((date, index) => {
                        return <div className="col-12" key={index}>
                            <div className="history-card">
                                <div className="history-head">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 64 64">
                                        <g>
                                            <path
                                                d="M56.562 17.372C56.246 12.117 51.858 8 46.573 8H44V6a2 2 0 0 0-4 0v2H24V6a2 2 0 0 0-4 0v2h-2.573c-5.286 0-9.674 4.117-9.989 9.372-.593 9.884-.582 19.91.033 29.799.312 5.022 4.335 9.045 9.357 9.357 5.033.313 10.102.469 15.171.469 5.068 0 10.138-.156 15.171-.469 5.022-.312 9.045-4.335 9.357-9.357.616-9.884.627-19.909.035-29.799zm-4.026 29.551a6.006 6.006 0 0 1-5.613 5.613c-9.902.615-19.944.615-29.846 0a6.006 6.006 0 0 1-5.613-5.613A241.309 241.309 0 0 1 11.147 24h41.707c.252 7.64.155 15.323-.318 22.923zM22 16a2 2 0 0 0 2-2v-2h16v2a2 2 0 0 0 4 0v-2h2.573c3.173 0 5.807 2.465 5.996 5.611.047.794.067 1.593.106 2.389h-41.35c.04-.796.059-1.595.106-2.389C11.62 14.465 14.253 12 17.427 12H20v2a2 2 0 0 0 2 2z"></path>
                                            <circle cx="22" cy="33" r="3"></circle>
                                            <circle cx="32" cy="33" r="3"></circle>
                                            <circle cx="22" cy="43" r="3"></circle>
                                            <circle cx="42" cy="33" r="3"></circle>
                                            <circle cx="42" cy="43" r="3"></circle>
                                            <circle cx="32" cy="43" r="3"></circle>
                                        </g>
                                    </svg>
                                    <ConvertToShamsiDate gregorianDate={date} archive={1}/>
                                </div>
                            </div>
                            <div className="row">
                                {Object.keys(games.data[date]).slice().reverse().map(salon => (
                                    <div className="col-lg-4" key={salon}>
                                        <div className="cube-card archive" style={{cursor: "pointer"}}>
                                            <div className="head mb-0 pt-2" onClick={() => toggleCollapse(date, salon)}>
                                                <div className="right">
                                                    <div className="number d-flex">
                                                        <div> طـبــقـــه</div>
                                                        <span className="pr-1">
                                                        {salon === "1" ? "اول" :
                                                            salon === "2" ? "دوم"
                                                                : "سوم"}
                                                    </span>
                                                    </div>
                                                    <div className="manager">
                                                          <span className="cube-god">{salon === "1" ? "First" :
                                                              salon === "2" ? "Second"
                                                                  : "Third"}</span>
                                                        Floor
                                                    </div>
                                                </div>
                                                <div className="cube-num">
                                                    <img src={CubeIcon} alt="cube"/>
                                                    <div className="cube">CUBE</div>
                                                    <div className="tag">#{salon}</div>
                                                </div>
                                            </div>
                                            <Collapse className="login-collapse" in={collapsedSalons[date][salon]}>
                                                <div className="salon-content">
                                                    {games.data[date][salon].map((game, index) => (
                                                        <Link key={index} to={"/game/" + game.id} onClick={(e) => {
                                                            if (game.status === 0)
                                                                e.preventDefault();
                                                        }}>
                                                            <div className="cube">
                                                                <div
                                                                    className={`cube-info ${game.status === 0 ? "disabled" : null}`}>
                                                                    <ul className="cube-box">
                                                                        <li className="event">
                                                                            <img className="ml-2" src={ClockIcon}
                                                                                 alt="clock"/>
                                                                            <div className="time">
                                                                <span
                                                                    className="start">{game.clock.split('-')[0]}</span>
                                                                                <span className="dot">الی</span>
                                                                                <span
                                                                                    className="end">{game.clock.split('-')[1]}</span>
                                                                                <div className="notice">شــروع و پـایـان
                                                                                    رویـداد
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                    <ul className="cube-box">
                                                                        {game.win_side !== null ?
                                                                            <li className="event closed flex-column">
                                                                                <div className="full">
                                                                                    سناریو
                                                                                    {" " + game.scenario.name}
                                                                                </div>
                                                                                {game.win_side === 0 ? (
                                                                                    <div
                                                                                        className="status mafia">مافـیـا</div>
                                                                                ) : game.win_side === 1 ? (
                                                                                    <div
                                                                                        className="status city">شــهــر</div>
                                                                                ) : (
                                                                                    <div
                                                                                        className="status">مستقل</div>
                                                                                )}
                                                                            </li>
                                                                            : game.status === 1 ?
                                                                                <li className="event closed flex-column">
                                                                                    <div className="full no-score">
                                                                                        بدون نتیجه
                                                                                    </div>
                                                                                  </li>
                                                                                  :
                                                                                  <li className="event closed flex-column">
                                                                                      <div className="full">
                                                                                          <svg className="close ml-1"
                                                                                               xmlns="http://www.w3.org/2000/svg"
                                                                                               viewBox="0 0 56.67 56.67">
                                                                                              <path className="cls-1"
                                                                                                    d="M28.33,0C12.69,0,0,12.69,0,28.33s12.69,28.33,28.33,28.33,28.33-12.69,28.33-28.33C56.65,12.69,43.97.02,28.33,0ZM38.77,35.43c.92.92.92,2.42,0,3.34-.92.92-2.42.92-3.34,0l-7.1-7.1-7.09,7.1c-.92.92-2.42.92-3.34,0-.92-.92-.92-2.42,0-3.34l7.1-7.1-7.1-7.09c-.92-.92-.92-2.42,0-3.34.92-.92,2.42-.92,3.34,0l7.09,7.1,7.1-7.1c.92-.92,2.42-.92,3.34,0,.92.92.92,2.42,0,3.34l-7.1,7.09,7.1,7.1Z"/>
                                                                                          </svg>
                                                                                          برگزار نشد
                                                                                      </div>
                                                                                  </li>
                                                                          }
                                                                      </ul>
                                                                  </div>
                                                              </div>
                                                          </Link>
                                                      ))}
                                                  </div>
                                              </Collapse>

                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                    })
                }
                {!loading && games.pagination.last_page > 1 ?
                    <div className="col-12">
                        <div className="space-25"></div>
                        <ul className="pagination">
                            {games.pagination.links.map((item, index) => {
                                return <li key={index}
                                           className={`item ${item.url == page || item.url === null ? "disabled" : ""} ${item.active ? "active" : ""}`}
                                           onClick={() => {
                                               if (item.url && item.url !== page) {
                                                   setPage(item.url);
                                                   get(item.url)
                                                   setTimeout(() => window.scrollTo({
                                                       top: 0, behavior: 'smooth'}), 500)

                                               } else return false
                                           }}>
                                    {item.label}
                                </li>
                            })}
                        </ul>
                    </div>
                    : null}
                <div className="space-50"></div>
                <div className="space-50"></div>
                <div className="space-25"></div>
            </div>
        </div>

    </section>

}

export default GameHistory;
