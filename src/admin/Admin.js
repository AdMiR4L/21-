

import React, {Component, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import LevelIcon from "../assets/icons/level.svg";
import {Link} from "react-router-dom"
import Skeleton from "../components/Skeleton";

function Admin() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        if (!localStorage.authToken)
            window.location.href = "/";
    }, []);
    const location = useLocation();
    return (
        loading ?
            <div className="container my-profile">
                <div className="container my-profile">
                    <div className="space-50"></div>
                    <div className="row">
                        <div className="dashboard">
                            <ul className="user-info">
                                <li className="head">
                                    <div className="avatar">
                                        <Skeleton width={"100%"} height={"100%"}  />
                                    </div>

                                    <div className="names">
                                        <div className="name">
                                            <Skeleton width={"40px"} height={"20px"}/>
                                        </div>
                                        <div className="grade">
                                            <Skeleton width={"80px"} height={"20px"}/>
                                        </div>
                                    </div>
                                    <div className="grades mt-2">
                                        <Skeleton width={"50%"} height={"20px"}/>


                                        <Skeleton width={"100px"} height={"25px"}/>

                                    </div>
                                </li>
                                <li className="foot">


                                </li>
                            </ul>
                            <ul className="experience">
                                <li className="level"></li>
                                <li className="w-100">
                                    <Skeleton width={"100%"} height={"15px"}/>
                                </li>
                                <li className="xp-count">
                                    <Skeleton width={"100px"} height={"30px"}/>
                                    <Skeleton width={"60px"} height={"30px"}/>
                                </li>
                            </ul>
                            <div className="wallet">
                                <Skeleton width={"100%"} height={"25px"}/>
                                <div className="title">
                                    <Skeleton width={"40%"} height={"20px"}/>
                                </div>
                                <div className="balance">
                                    <Skeleton width={"60px"} height={"20px"}/>
                                </div>
                            </div>
                            <div className="space-25"></div>
                            <ul className="scores row no-gutters">
                                <div className="col-6 pl-2">
                                    <Skeleton width={"100%"} border={1} height={"150px"}/>
                                </div>
                                <div className="col-6 pr-2">
                                    <Skeleton width={"100%"} border={1} height={"150px"}/>
                                </div>
                            </ul>

                            <ul className="user-access">
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>
                                <li className="item">
                                    <div className="ml-2">
                                        <Skeleton width={"45px"} border={1} height={"45px"}/>
                                    </div>
                                    <Skeleton width={"100%"} height={"20px"}/>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                </div>
            </div>
            :
            <div className="container my-profile">
                <div className="space-50"></div>
                <div className="row">
                    <div className="dashboard admin-dashboard">
                        <div className="sell-info">

                        </div>
                        <ul className="user-access">
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M8.25 6a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0M16.25 7a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M2.25 7a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0M5.625 14.813a3.563 3.563 0 0 1 3.563-3.563h5.624a3.563 3.563 0 0 1 3.563 3.563V16.5c0 2.9-2.35 5.25-5.25 5.25h-2.25a5.25 5.25 0 0 1-5.25-5.25z"
                                                  clip-rule="evenodd"></path>
                                            <path fill-rule="evenodd"
                                                  d="M4.813 12.75c-1.14 0-2.063.923-2.063 2.063V18A2.25 2.25 0 0 0 5 20.25h.5a.75.75 0 0 1 0 1.5H5A3.75 3.75 0 0 1 1.25 18v-3.187a3.563 3.563 0 0 1 3.563-3.563.75.75 0 0 1 0 1.5M19.188 12.75c1.139 0 2.062.923 2.062 2.063V18A2.25 2.25 0 0 1 19 20.25h-.5a.75.75 0 0 0 0 1.5h.5A3.75 3.75 0 0 0 22.75 18v-3.187a3.563 3.563 0 0 0-3.562-3.563.75.75 0 0 0 0 1.5"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مدیریت کاربران</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M18.429 8.81C18.429 5.05 15.549 2 12 2S5.571 5.05 5.571 8.81v3.41c0 .44-.235.842-.606 1.04l-.647.341C3.51 14.031 3 14.905 3 15.861c0 1.394 1.067 2.524 2.384 2.524h13.232c1.317 0 2.384-1.13 2.384-2.524 0-.956-.51-1.83-1.318-2.258l-.647-.342a1.18 1.18 0 0 1-.606-1.042z"
                                                  clip-rule="evenodd"></path>
                                            <path
                                                d="M4.035 8.12a.71.71 0 0 1 .432.913.763.763 0 0 1-.959.445l.253-.683c-.253.683-.254.682-.254.682h-.003L3.5 9.474l-.011-.004a1 1 0 0 1-.096-.04 2.262 2.262 0 0 1-.735-.557c-.385-.442-.691-1.124-.656-2.12.035-.995.388-1.66.804-2.083.202-.204.405-.338.567-.423a2 2 0 0 1 .304-.13l.01-.002.006-.002h.002s.002 0 .206.693l-.204-.694a.75.75 0 0 1 .926.492c.11.376-.11.77-.495.89l-.041.019a.8.8 0 0 0-.197.149c-.143.146-.365.464-.389 1.13-.023.666.176.994.31 1.147a.8.8 0 0 0 .224.18M19.966 8.12a.71.71 0 0 0-.433.913c.14.377.57.576.96.445l-.253-.683c.252.683.253.682.253.682h.004l.004-.002.01-.004a1 1 0 0 0 .096-.04q.082-.035.2-.104c.155-.093.348-.238.535-.452.386-.443.692-1.125.657-2.12s-.388-1.661-.804-2.084a2.3 2.3 0 0 0-.773-.518l-.098-.034-.011-.003-.005-.002h-.003l-.205.693.204-.694a.75.75 0 0 0-.926.492c-.11.376.11.77.495.89q.01.003.041.019c.045.024.118.07.196.149.144.146.366.464.39 1.13.023.666-.176.994-.31 1.147a.8.8 0 0 1-.224.18M9.763 19.628a.76.76 0 0 1 .94.432l.015.027a.7.7 0 0 0 .145.16c.144.118.466.307 1.137.307.67 0 .993-.189 1.137-.308a.7.7 0 0 0 .16-.186.76.76 0 0 1 .94-.432.717.717 0 0 1 .474.914L14 20.313l.711.23-.001.003-.002.005-.003.01-.04.092a2 2 0 0 1-.103.188 2.2 2.2 0 0 1-.449.503c-.44.363-1.117.656-2.113.656s-1.674-.293-2.113-.656a2.2 2.2 0 0 1-.449-.503 1.7 1.7 0 0 1-.143-.28l-.003-.01-.002-.005v-.002l-.001-.001.711-.23-.712.229a.717.717 0 0 1 .475-.915"></path>
                                        </svg>
                                    </div>
                                    <div className="text">ناتیفیکیشن</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M7 8.4H5.6A2.6 2.6 0 0 0 3 11v9a1 1 0 0 0 1 1h3zM9 21h6V5.6A2.6 2.6 0 0 0 12.4 3h-.8A2.6 2.6 0 0 0 9 5.6V21m8 0v-8h1.4a2.6 2.6 0 0 1 2.6 2.6v2.8a2.6 2.6 0 0 1-2.6 2.6H17"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">تراکنش ها</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/faq"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M2 9.5A5.5 5.5 0 0 1 7.5 4h9A5.5 5.5 0 0 1 22 9.5v5a5.5 5.5 0 0 1-5.5 5.5H3a1 1 0 0 1-1-1zm7.25.38c0-1.557 1.431-2.63 2.944-2.63h.103a2.7 2.7 0 0 1 .944.17c.773.288 1.311.897 1.465 1.623.156.736-.103 1.507-.744 2.04l-.657.546-.16.129-.012.01-.118.095a.4.4 0 0 0-.078.079c-.005.008-.065.1-.065.534a.75.75 0 0 1-1.5 0c0-.534.065-.972.301-1.342.115-.18.249-.31.364-.408.045-.039.135-.111.209-.17l.1-.081.657-.546c.228-.189.272-.402.236-.575-.039-.181-.187-.404-.524-.53a1.2 1.2 0 0 0-.418-.074h-.103c-.91 0-1.444.61-1.444 1.13a.75.75 0 1 1-1.5 0M12 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">سوالات متداول</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>

                            <li className="item">
                                <Link to={"/admin/articles"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M21.833 17.851c-1.247 1.178-2.99 1.899-4.883 1.899h-9.9c-1.894 0-3.636-.72-4.883-1.899A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.333-4.149M22 8.303v6.636c-.673 1.89-2.637 3.311-5.05 3.311h-9.9c-2.413 0-4.377-1.422-5.05-3.311V8.5A5.5 5.5 0 0 1 7.5 3h9.197A5.303 5.303 0 0 1 22 8.303M7 9.25a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 7 9.25m0 3a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75m8-11a.75.75 0 0 1 .75.75v2.286a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75m-6 0a.75.75 0 0 1 .75.75v2.286a.75.75 0 1 1-1.5 0V2A.75.75 0 0 1 9 1.25"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مقالات و آموزش</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M20.864 11.113V10.3c0-1.78-1.517-3.13-3.218-3.074-1.038.033-2.24.026-3.316-.091-1.114-.122-1.955-.35-2.383-.665-.46-.338-.628-.663-.973-1.327q-.06-.116-.128-.246C10.061 3.4 8.651 2 6.736 2H5.608c-1.867 0-3.38 1.531-3.38 3.42v11.204C1.37 19.163 3.033 22 5.561 22h10.924c1.298 0 2.493-.792 3.117-2.067l1.953-3.985c.837-1.707.426-3.66-.692-4.835M5.608 3.379A2.03 2.03 0 0 0 3.59 5.42v8.338l.806-1.644c.624-1.275 1.82-2.067 3.117-2.067h10.924c.374 0 .73.062 1.06.176-.043-.908-.846-1.649-1.809-1.618-1.067.034-2.34.03-3.505-.098-1.128-.123-2.295-.372-3.04-.921-.73-.538-1.043-1.148-1.375-1.795l-.128-.247C8.971 4.263 7.93 3.38 6.736 3.38zm8.438 12.184c0-.38.305-.69.681-.69h1.819c.376 0 .681.31.681.69 0 .381-.305.69-.681.69h-1.819a.686.686 0 0 1-.681-.69"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">دسته بندی ها</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M7.5 3A5.5 5.5 0 0 0 2 8.5v7A5.5 5.5 0 0 0 7.5 21h9a5.5 5.5 0 0 0 5.5-5.5v-7A5.5 5.5 0 0 0 16.5 3zm.75 4.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5zM9 16.25a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 .75-.75M7.25 11.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5zm8.776-3.523c-.351-.319-.85-.276-1.076-.03-.269.291-.278.758.043 1.106.229.248.69.29 1.043-.04.271-.253.302-.711-.01-1.036m1.03-1.09c-.852-.793-2.322-.92-3.21.043-.849.922-.753 2.275.044 3.14.89.964 2.32.836 3.17.039.93-.869.902-2.307.025-3.195L17.07 6.9zM12.75 13.75a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v.75a1.75 1.75 0 0 1-1.75 1.75h-2a1.75 1.75 0 0 1-1.75-1.75zm1-2.5a2.5 2.5 0 0 0-2.5 2.5v.75a3.25 3.25 0 0 0 3.25 3.25h2a3.25 3.25 0 0 0 3.25-3.25v-.75a2.5 2.5 0 0 0-2.5-2.5z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">کارکتر ها</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path
                                                d="M8.024 3.446a4.58 4.58 0 0 0-4.578 4.578v6.08a4.28 4.28 0 0 0 2.797 4.017c.188.611.48 1.177.854 1.676A5.73 5.73 0 0 1 2 14.104v-6.08A6.024 6.024 0 0 1 8.024 2h3.995c1.69 0 3.301.71 4.442 1.955l1.04 1.136A5.5 5.5 0 0 0 16.5 5h-1.043l-.062-.068a4.58 4.58 0 0 0-3.376-1.486z"></path>
                                            <rect width="16" height="17" x="6" y="5" rx="5.5"></rect>
                                        </svg>
                                    </div>
                                    <div className="text">سناریو ها</div>

                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M7.5 2A5.5 5.5 0 0 0 2 7.5v8.114a7.8 7.8 0 0 1 1.684-.32c1.237-.105 2.635.029 3.992.453.5.156.997.353 1.48.593 1.073-1.22 3.27-2.588 5.78-3.007 2.274-.379 4.838.019 7.064 2.004V7.5A5.5 5.5 0 0 0 16.5 2zm14.424 15.415-.002.002c-2.055-2.485-4.535-2.972-6.74-2.604-2.044.34-3.814 1.414-4.716 2.321 1.481 1.079 2.685 2.667 3.195 4.866h2.84a5.5 5.5 0 0 0 5.423-4.585M12.113 22c-.742-2.639-2.725-4.146-4.885-4.821a9.1 9.1 0 0 0-3.417-.39c-.707.059-1.307.207-1.767.407A5.5 5.5 0 0 0 7.5 22zM15.5 7.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5m-2.25.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مدیریت اسلایدر</div>
                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M8.111 3C4.736 3 2 6.166 2 10.071v3.858C2 17.834 4.736 21 8.111 21h7.778C19.264 21 22 17.834 22 13.929V10.07C22 6.166 19.264 3 15.889 3zm2.639 9a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M12 9.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5m7.715.845c-.041.429-.394.742-.79.699l-.851-.093c-1.175-.127-2.152-1.237-2.217-2.518l-.046-.928c-.022-.43.282-.8.678-.825s.735.304.757.734l.046.928c.026.515.458 1.005.93 1.057l.852.092c.395.043.682.425.64.854m-14.64.699c-.396.043-.749-.27-.79-.699-.04-.429.246-.81.64-.854l.853-.092c.472-.052.904-.542.93-1.057l.046-.928c.022-.43.36-.759.757-.734.396.025.7.394.678.825l-.046.928c-.065 1.28-1.042 2.39-2.217 2.518zm14.64 3.11c-.041-.428-.394-.74-.79-.698l-.851.093c-1.175.127-2.152 1.237-2.217 2.518l-.046.928c-.022.43.282.8.678.825s.735-.304.757-.734l.046-.928c.026-.515.458-1.005.93-1.057l.852-.092c.395-.043.682-.425.64-.854m-14.64-.698c-.396-.043-.749.27-.79.699-.04.429.246.81.64.854l.853.092c.472.052.904.542.93 1.057l.046.928c.022.43.36.759.757.734.396-.025.7-.394.678-.825l-.046-.928c-.065-1.28-1.042-2.39-2.217-2.518z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مدیریت لندینگ</div>
                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M7.5 4A5.5 5.5 0 0 0 2 9.5V19a1 1 0 0 0 1 1h13.5a5.5 5.5 0 0 0 5.5-5.5v-5A5.5 5.5 0 0 0 16.5 4zm8.493 7.002a1 1 0 1 0 0 2h.018a1 1 0 0 0 0-2zm-5.002 1a1 1 0 0 1 1-1h.018a1 1 0 1 1 0 2h-.018a1 1 0 0 1-1-1m-3-1a1 1 0 1 0 0 2h.018a1 1 0 1 0 0-2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مدیریت نظرات</div>
                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M7.5 3A5.5 5.5 0 0 0 2 8.5v6.75h20V8.5A5.5 5.5 0 0 0 16.5 3zm14.357 13.75H2.143A5.5 5.5 0 0 0 7.5 21h9a5.5 5.5 0 0 0 5.357-4.25m-5.97-8.254c.478.545.48 1.466.004 2.012a.75.75 0 0 0 1.131.986c.97-1.113.965-2.879-.009-3.988a.75.75 0 1 0-1.127.99m-2.45.707a.49.49 0 0 1 .001.598.75.75 0 0 0 1.132.985 1.99 1.99 0 0 0-.006-2.573.75.75 0 1 0-1.127.99"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="text">تماس با ما</div>
                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>
                            <li className="item">
                                <Link to={"/admin/users"}>
                                    <div className="icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                  d="M17.275 5q-.032.123-.032.263v3.475c0 .559.453 1.012 1.013 1.012h3.48q.14 0 .264-.033v6.784A5.504 5.504 0 0 1 16.491 22h-5.008a5.504 5.504 0 0 1-5.508-5.5v-6c0-3.038 2.466-5.5 5.508-5.5zm-5.29 12.25a.75.75 0 0 1 .75-.75h3.506a.75.75 0 1 1 0 1.5h-3.506a.75.75 0 0 1-.75-.75m-.251-3.75a.75.75 0 1 0 0 1.5h5.509a.75.75 0 1 0 0-1.5z"
                                                  clip-rule="evenodd"></path>
                                            <path
                                                d="M18.745 8.25V6.44l1.812 1.81zM7.386 3.378c-2.26 0-4.093 1.955-4.093 4.365v6.115c0 1.816 1.207 3.332 2.812 3.686.099.512.269 1 .5 1.45C4.041 18.875 2 16.62 2 13.859V7.743C2 4.571 4.411 2 7.386 2h4.17c.694 0 1.352.323 1.802.885l1.508 1.88a.7.7 0 0 1 .123.235h-1.636l-.977-1.22a1.05 1.05 0 0 0-.82-.402z"></path>
                                        </svg>
                                    </div>
                                    <div className="text">مدیریت صفحات</div>
                                    <svg className="point-icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 181.31 330.27">
                                        <g>
                                            <path d="M165.33,330.27c-4.24,0.01-8.32-1.68-11.31-4.69L4.69,176.24c-6.24-6.24-6.25-16.35-0.02-22.6
                                            c0.01-0.01,0.01-0.01,0.02-0.02L154.02,4.29c6.46-6.02,16.59-5.67,22.61,0.8c5.73,6.14,5.73,15.67,0,21.82L38.63,164.93
                                            l138.01,138.03c6.24,6.25,6.24,16.38-0.01,22.63C173.62,328.58,169.56,330.26,165.33,330.27z"/>
                                        </g>
                                    </svg>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="space-50"></div>
                <div className="space-50"></div>
            </div>
    )
}

export default Admin;
