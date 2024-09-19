
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
import ClockIcon from "../assets/icons/clock.svg";
import UserIcon from "../assets/icons/user-bold.svg";



function History() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(process.env.REACT_APP_API + "user/history?page=1");
    const [histories, setHistories] = useState([]);


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
                setHistories(response.data[0])
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        get();
        console.log(page);
        document.title = '21+ | My Game History'
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

                <div className="space-50"></div>
                <div className="col-12">
                    <h3 className="title-dashboard">
                        <div className="icon-container">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.5 21.51">
                                <path
                                    d="M19.11,3.89c-.42-.38-.88-.73-1.39-1l-3.89-2.1c-1.94-1.05-4.25-1.05-6.18,0l-3.89,2.1c-1.2.65-2.17,1.63-2.82,2.83h0s0,0,0,0c0,0,0,0,0,0-.05.08-.08.17-.12.25-.1.2-.21.41-.29.62,0,.02-.01.04-.02.05-.34.88-.52,1.83-.52,2.79v2.64c0,2.79,1.45,5.29,3.77,6.55l3.89,2.09c.97.53,2.03.79,3.09.79s2.12-.26,3.09-.79l3.89-2.09c2.33-1.26,3.77-3.77,3.77-6.55v-2.64c0-2.18-.89-4.18-2.39-5.55ZM10.74,10.42L2.66,5.81s.01-.02.02-.03c.03-.05.07-.09.11-.13.11-.14.23-.28.36-.41.06-.06.12-.12.18-.18.12-.11.24-.21.36-.31.07-.05.13-.11.2-.15.18-.13.36-.25.56-.36.01,0,.03-.02.04-.03l3.89-2.1c1.49-.81,3.26-.81,4.75,0l3.89,2.1c.29.16.56.35.82.55.07.05.13.11.19.17.2.18.39.37.56.58.03.04.06.07.09.1l-7.94,4.82ZM4.48,17.3c-1.84-.99-2.98-3-2.98-5.23v-2.64c0-.35.04-.7.1-1.05.01-.08.03-.17.05-.25.07-.34.16-.68.29-1,0,0,0,0,0,0l8.06,4.6v8.21s-.08-.01-.11-.02c-.2-.04-.4-.08-.6-.15-.07-.02-.13-.04-.2-.06-.24-.09-.48-.19-.72-.31l-3.89-2.1ZM20,12.07c0,2.23-1.14,4.24-2.98,5.23l-3.89,2.1c-.23.12-.47.22-.71.31-.07.03-.14.05-.22.07-.19.06-.37.1-.56.14-.04,0-.09.02-.13.03v-8.23l7.96-4.83s.03.07.05.1c.03.07.06.15.08.22.06.16.11.32.16.48.02.08.05.16.07.25.04.17.07.34.1.51.01.08.03.15.04.23.03.25.05.5.05.76v2.64Z"/>
                            </svg>
                        </div>
                        تاریخچه بازی های من
                    </h3>
                    <ul className="transictions">
                        {histories.data.map((history, index) => {
                            return <Link key={index} to={"/game/" +history.game.id}>
                                <div className="item">
                                    <ul className="head">
                                        <li className="head-item">
                                            شناسه رویداد
                                            <div className="number-order">
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                     x="0" y="0" viewBox="0 0 128 128"
                                                     className="icon">

                                                    <g>
                                                        <path  d="M88.27 33.926c-.157-2.015-.34-3.99-.585-5.961 0-4.399-3.595-7.965-8.03-7.965H23.419c3.392 3.14 5.625 7.661 7.189 12.86 2.391 7.954 3.413 18.112 4.487 28.778l.213 2.116c1.17 11.547 2.514 23.7 5.691 34.93 1.6 5.653 3.865 8.777 6.252 10.448 2.33 1.631 5.08 2.09 8.17 1.775l.102-.028a13.015 13.015 0 0 0 2.858-1.191c1.644-.94 2.903-2.209 3.131-3.891.294-2.169-.27-3.287-.68-3.827a2.703 2.703 0 0 0-.613-.595 1.576 1.576 0 0 0-.16-.097l-.004-.003a2.18 2.18 0 0 1-1.277-2.421 2.198 2.198 0 0 1 2.161-1.765h39.045c-1.05-2.885-1.886-6.375-2.539-9.726-.344-1.769-1.113-4.311-2.027-7.334-.864-2.854-1.857-6.136-2.743-9.598a43.427 43.427 0 0 1-3.97 1.676c-.238 1.133-.813 2.161-1.542 3.031-1.11 1.326-2.686 2.432-4.472 3.28-3.576 1.7-8.397 2.557-13.321 1.812a2.187 2.187 0 0 1-1.846-2.49 2.2 2.2 0 0 1 2.51-1.83c4.052.614 7.978-.113 10.754-1.432 1.39-.66 2.391-1.422 2.987-2.133.593-.707.674-1.215.632-1.52a2.184 2.184 0 0 1 1.49-2.374c12.683-4.155 20.441-13.608 25-23.965 3.579-8.132 5.13-16.712 5.518-23.413-10.499 9.416-20.206 13.968-28.11 17.674-1.06.497-2.086.978-3.077 1.454-4.663 2.237-8.396 4.278-11.293 7.095-2.835 2.758-4.975 6.369-6.188 11.921a2.193 2.193 0 0 1-1.618 1.658c-1.207.299-1.961.874-2.48 1.58-.549.75-.912 1.758-1.093 2.985-.37 2.493.082 5.337.478 7.2a2.185 2.185 0 0 1-1.702 2.589 2.202 2.202 0 0 1-2.61-1.688c-.415-1.96-1.013-5.438-.525-8.735.247-1.668.79-3.42 1.89-4.921a8.332 8.332 0 0 1 3.643-2.82c1.424-5.644 3.838-9.696 7.12-12.889 3.455-3.36 7.767-5.657 12.46-7.909 1.011-.485 2.049-.972 3.11-1.47l.003-.002a803.69 803.69 0 0 0 1.847-.869zm16.07 5.517a2.213 2.213 0 0 0-2.993-.858c-8.499 4.648-19.634 15.396-29.018 25.684-9.394 10.298-17.427 20.575-19.617 24.517-.587 1.057-.2 2.386.866 2.968s2.405.198 2.992-.859c1.918-3.45 9.63-13.395 19.025-23.694 9.404-10.309 20.1-20.535 27.879-24.79a2.176 2.176 0 0 0 .866-2.968z"></path><path
                                                    d="M12.898 20.078c.56-.084 1.197-.039 1.896.13 5.016 1.214 8.324 4.96 10.645 11.092H7v-4.404c0-3.452 2.56-6.315 5.898-6.818zM108.508 110.878H63.81c1.01-1.169 1.818-2.65 2.068-4.5.269-1.981.067-3.608-.395-4.919H120c-1.03 5.364-5.784 9.419-11.492 9.419z"
                                                    className=""></path>
                                                    </g>

                                                </svg>
                                                #{history.id}
                                            </div>
                                        </li>
                                        <li className="head-item">
                                            تــاریـــخ رویــــداد
                                            <div className="number-order order-date">
                                                <ConvertToShamsiDate
                                                    gregorianDate={history.created_at}/>

                                            </div>
                                        </li>
                                    </ul>
                                    <div className="transiction-footer top-label">
                                        <div className="id">
                                            <span className="notice ml-1">برنده رویداد</span>
                                            <span className="win-side">
                                                {history.game.win_side?
                                                    history.game.win_side === 1 ?
                                                        "مافیا":
                                                        "شهر"
                                                    :"در انتظار"}
                                            </span>
                                        </div>

                                        <div className="id">
                                            <span className="notice ml-1">سناریو</span>
                                            {history.game.scenario.name}
                                        </div>
                                    </div>
                                    <div className="transiction-cube">
                                        <div className="time">
                                    <span
                                        className="start ml-2">{history.game.clock.split('-')[0]}</span>
                                            <span className="dot">الی</span>
                                            <span
                                                className="end mr-2">{history.game.clock.split('-')[1]}</span>
                                            <div className="notice">شــروع و پـایـان رویـداد</div>
                                        </div>
                                        <div className="cube-num">
                                            <img src={CubeIcon} alt="cube"/>
                                            <div className="cube">CUBE</div>
                                            <div className="tag">#{history.game.salon}</div>
                                        </div>
                                    </div>
                                    <div className="transiction-footer">
                                        <div className="id">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                 x="0" y="0" viewBox="0 0 24 24"
                                                 style={{height : 24}}
                                                 className="icon">
                                                <g>
                                                    <path d="M16.75 20c1.79 0 3.25-1.46 3.25-3.25 0-3.17-2.58-5.75-5.75-5.75h-4.5C6.58 11 4 13.58 4 16.75 4 18.54 5.46 20 7.25 20zM8 6c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4z">

                                                    </path></g></svg>
                                            <span className="notice ml-1">نقش شما</span>
                                            {history.character.name}
                                        </div>

                                        <div className="id">
                                            <svg className="icon" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 40.79 56.72">
                                            <path id="Path_45" data-name="Path 45" className="cls-1"
                                                      d="M29.47,39.75l2.6-4.21,4.68-1.6.52-4.92,3.52-3.46-1.67-4.65,1.68-4.66-3.52-3.46-.52-4.92-4.69-1.6-2.59-4.21-4.92.59-4.16-2.66-4.17,2.66-4.91-.59-2.59,4.21-4.68,1.6-.52,4.92-3.52,3.46,1.67,4.65-1.67,4.65,3.52,3.46.52,4.92,4.68,1.6,2.6,4.21,4.91-.59,4.17,2.66,4.16-2.65,4.92.59ZM6.05,20.92c0-7.92,6.42-14.34,14.34-14.34s14.34,6.42,14.34,14.34-6.42,14.34-14.34,14.34c-7.92,0-14.34-6.43-14.34-14.34h0Z"/>
                                                <path id="Path_46" data-name="Path 46" className="cls-1"
                                                      d="M20.39,9.9c-6.08,0-11.01,4.93-11.01,11.01,0,6.08,4.93,11.01,11.01,11.01,6.08,0,11.01-4.93,11.01-11.01h0c0-6.08-4.93-11.01-11.01-11.01ZM15.43,42.61l-5.85.7-3.08-5-1.05-.36L.93,52.08l8.14-.45,6.37,5.09,3.75-11.71-3.76-2.4ZM34.26,38.31l-3.08,5-5.85-.7-3.77,2.4,3.75,11.71,6.37-5.09,8.14.45-4.52-14.13-1.04.36Z"/>
                                            </svg>
                                            <span className="notice ml-1">امتیاز</span>
                                            <span className="score">
                                                {history.score ?? 0}
                                            </span>
                                        </div>
                                    </div>


                                </div>
                            </Link>
                        })}
                    </ul>
                </div>
                {histories.next_page_url ?
                    <ul className="pagination">
                        {histories.links.map((item, index) => {
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

export default History;
