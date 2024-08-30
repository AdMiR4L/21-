import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import EmptyIcon from "../assets/empty.svg";


function Search(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [articles , setArticles] = useState([]);
    const [users , setUsers] = useState([]);
    const [games , setGames] = useState([]);

    function search(event) {
        setSearchText(event)
        if (event.length >= 3){
            setIsLoading(true)
            axios.post(process.env.REACT_APP_API+"search",{search : event}, null ).then((response) => {
                if (response.data.articles)
                    setArticles(response.data.articles)
                if (response.data.users)
                    setUsers(response.data.users)
                if (response.data.games)
                    setGames(response.data.games)
                console.log(response.data);
                setIsLoading(false)
            })
        }
    }



    return (
        <Modal show={props.showSearchModal}
               onHide={() => props.setShowSearchModal(!props.showSearchModal)}
               className="search-modal">
            <Modal.Header>
                <div className="search-input">
                    {isLoading ?
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div> :
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 55.13 55.15">
                            <path
                                d="M54.22,49.86l-7.44-7.42c8.85-11.23,7.05-27.58-4.09-36.6C37.26,1.44,30.42-.58,23.46.15c-6.97.73-13.23,4.13-17.63,9.57-9.09,11.23-7.35,27.77,3.88,36.86,9.46,7.65,23.16,7.72,32.71.21l7.42,7.45c.61.61,1.4.91,2.2.91s1.59-.3,2.2-.91c.59-.58.91-1.36.91-2.19s-.32-1.61-.91-2.2ZM46.22,26.28c0,11.01-8.96,19.97-19.98,19.97S6.27,37.29,6.27,26.28,15.23,6.32,26.24,6.32s19.98,8.96,19.98,19.97Z"/>
                        </svg>
                    }

                    <input
                        type="text"
                        value={searchText}
                        placeholder="جستجو ..."
                        autoFocus
                        onChange={(e) => search(e.target.value)}
                        className="input"/>
                    <div className="back-container" onClick={() => props.setShowSearchModal(!props.showSearchModal)}>
                        <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.55 241.84">
                            <path d="M266.29,138.28c9.51,0,17.25-7.74,17.25-17.25s-7.74-17.25-17.25-17.25H50.31L124.57,29.52c6.76-6.71,6.8-17.67.1-24.43-6.7-6.75-17.66-6.79-24.42-.09L11.23,94.23C4.03,101.38.05,110.88,0,121.01c.1,10.04,4.08,19.48,11.22,26.59l89.04,89.25c6.7,6.66,17.61,6.66,24.32-.01,6.76-6.7,6.8-17.65.1-24.4l-.11-.11-74.28-74.04h216Z"/>
                        </svg>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body>
                {articles.length?
                    <ul className="search-modal-results">
                        <li className="head">
                            <div className="icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512.01 469.83">
                                    <path
                                        d="M470.56,90.72L313.25,15.77c-34.63-20.68-77.73-21.05-112.7-.96L41.46,90.72c-.6.3-1.22.62-1.79.96C1.92,113.26-11.19,161.37,10.4,199.12c7.32,12.8,18.08,23.28,31.06,30.27l43.88,20.91v104.53c.03,46.74,30.44,88.04,75.07,101.93,31.06,8.99,63.26,13.38,95.6,13.06,32.33.36,64.53-4,95.6-12.95,44.63-13.89,75.05-55.19,75.07-101.93v-104.68l42.67-20.4v175.96c0,11.78,9.55,21.33,21.33,21.33s21.33-9.55,21.33-21.33V149.81c.14-25.05-19.64-48.19-41.45-59.09h0ZM384.01,354.93c.01,27.96-18.13,52.69-44.8,61.08-27.05,7.73-55.07,11.48-83.2,11.14-28.13.34-56.15-3.41-83.2-11.14-26.67-8.39-44.81-33.12-44.8-61.08v-84.31l70.76,33.71c17.46,10.37,37.4,15.82,57.71,15.77,19.33.14,38.33-4.98,54.98-14.8l72.55-34.67v84.31ZM452.28,190.88l-160.9,76.8c-22.43,13.06-50.24,12.69-72.32-.96L61.64,191.84c-17.55-9.46-24.1-31.36-14.64-48.9,3.2-5.93,8-10.85,13.85-14.2L220.75,52.36c22.44-13.03,50.23-12.67,72.32.96l157.31,74.94c11.57,6.42,18.81,18.56,18.96,31.79.02,12.53-6.43,24.19-17.07,30.83h0Z"/>
                                </svg>
                            </div>
                           <div className="title"> آموزش و مقالات</div>
                        </li>
                        {articles.map((article, key) => (
                            <li key={key} className="item">
                                {article.title}
                            </li>
                        ))}
                    </ul> : null
                }

                {users.length?
                    <ul className="search-modal-results">
                        <li className="head">
                            <div className="icon-container">
                                <svg  xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512">
                                    <path
                                        d="M384,512h-42.67v-107.58c-.04-34.82-28.26-63.05-63.08-63.08H105.75c-34.82.04-63.05,28.26-63.08,63.08v107.58H0v-107.58c.07-58.37,47.37-105.68,105.75-105.75h172.5c58.37.07,105.68,47.37,105.75,105.75v107.58ZM192,256c-70.69,0-128-57.31-128-128S121.31,0,192,0s128,57.31,128,128c-.07,70.66-57.34,127.93-128,128ZM192,42.67c-47.13,0-85.33,38.21-85.33,85.33s38.21,85.33,85.33,85.33,85.33-38.21,85.33-85.33-38.21-85.33-85.33-85.33Z"/>
                                </svg>
                            </div>
                            <div className="title">کاربران</div>
                        </li>
                        {users.map((user, key) => (
                            <li key={key} className="item">
                                {user.nickname}
                            </li>
                        ))}
                    </ul> : null
                }

                {games.length?
                    <ul className="search-modal-results">
                        <li className="head">
                            <div className="icon-container">
                                <svg  xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 384 512">
                                    <path
                                        d="M384,512h-42.67v-107.58c-.04-34.82-28.26-63.05-63.08-63.08H105.75c-34.82.04-63.05,28.26-63.08,63.08v107.58H0v-107.58c.07-58.37,47.37-105.68,105.75-105.75h172.5c58.37.07,105.68,47.37,105.75,105.75v107.58ZM192,256c-70.69,0-128-57.31-128-128S121.31,0,192,0s128,57.31,128,128c-.07,70.66-57.34,127.93-128,128ZM192,42.67c-47.13,0-85.33,38.21-85.33,85.33s38.21,85.33,85.33,85.33,85.33-38.21,85.33-85.33-38.21-85.33-85.33-85.33Z"/>
                                </svg>
                            </div>
                            <div className="title">کاربران</div>
                        </li>
                        {users.map((user, key) => (
                            <li key={key} className="item">
                                {user.nickname}
                            </li>
                        ))}
                    </ul> : null
                }

                {articles.length === 0 && users.length === 0 && games.length === 0 && searchText.length > 3 ?
                    <div className="empty">
                        <img loading={"lazy"} src={EmptyIcon} alt="svg"/>
                        <div className="text">موردی برای جستجوی شما یافت نشد</div>
                    </div>
                : null}

            </Modal.Body>

        </Modal>
    );
}

export default Search;
