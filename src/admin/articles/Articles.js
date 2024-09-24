

import React, {useEffect, useState} from "react";

import axios from "axios";
import {Link} from "react-router-dom"
import Skeleton from "../../components/Skeleton";
import "../../components/Dashboard.css";



function Articles() {

    const [loading, setLoading] = useState(true);
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(process.env.REACT_APP_API + "admin/articles?page=1");



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
                setArticles(response.data)
                setLoading(false)
                console.log(response.data);
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }
    function removeHtmlTags(str) {
        // Step 1: Remove HTML tags
        const noTags = str.replace(/<\/?[^>]+(>|$)/g, "");
        // Step 2: Decode HTML entities
        const textArea = document.createElement("textarea");
        textArea.innerHTML = noTags;
        return textArea.value;
    }

    useEffect(() => {
        get();
        if (!localStorage.authToken)
            window.location.href = "/";
    }, []);
    return (
        <div className="col-12 mt-3">
            <div className="space-25"></div>
            <div className="section-top">
                <div className="section-header">
                    <h3 className="head">
                        اخبار و مقالات آموزشی
                    </h3>
                    <h4 className="notice mb-0">
                        لیست مقالات موجود در سایت
                    </h4>
                </div>

                <Link to="/admin/articles/add">
                    <div style={{position: "absolute", top: "-5px", left: "5px", padding: "5px 5px 5px 15px"}}
                         className="header-more">
                        <svg className="more-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                            <g>
                                <path
                                    d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm5 12h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2z"></path>
                            </g>
                        </svg>
                        افزودن آیتم
                    </div>
                </Link>

            </div>
            {loading ?
                <div className="faq">
                    <ul className="faq">
                        <li className="question">
                            <div className="question-mark">
                                <Skeleton width="100%" height="100%"/>
                            </div>
                            <div className="content" style={{width: "70%"}}>
                                <div className="head mt-1">
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                                <div className="description">
                                    <Skeleton width="90%" height="10px"/>
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
                                <Skeleton width="100%" height="100%"/>
                            </div>
                            <div className="content" style={{width: "70%"}}>
                                <div className="head mt-1">
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                                <div className="description">
                                    <Skeleton width="90%" height="10px"/>
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
                                <Skeleton width="100%" height="100%"/>
                            </div>
                            <div className="content" style={{width: "70%"}}>
                                <div className="head mt-1">
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                                <div className="description">
                                    <Skeleton width="90%" height="10px"/>
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
                                <Skeleton width="100%" height="100%"/>
                            </div>
                            <div className="content" style={{width: "70%"}}>
                                <div className="head mt-1">
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                                <div className="description">
                                    <Skeleton width="90%" height="10px"/>
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
                                <Skeleton width="100%" height="100%"/>
                            </div>
                            <div className="content" style={{width: "70%"}}>
                                <div className="head mt-1">
                                    <Skeleton width="50%" height="15px"/>
                                </div>
                                <div className="description">
                                    <Skeleton width="90%" height="10px"/>
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

                </div>
                :
                <div className="faq">
                    <ul className="faq">
                        {articles.data.map((item, index) => (
                            <li
                                key={index}
                                className="question">
                                <div className="question-mark article-mark">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                         viewBox="0 0 512 512"><g><path d="M320 170.667h139.52a148.346 148.346 0 0 0-33.941-52.565l-74.325-74.368a148.836 148.836 0 0 0-52.587-33.92v139.52c0 11.781 9.551 21.333 21.333 21.333z"></path><path
                                        d="M468.821 213.333H320c-35.346 0-64-28.654-64-64V.512C252.565.277 249.131 0 245.653 0h-96.32C90.452.071 42.737 47.786 42.667 106.667v298.667c.07 58.88 47.785 106.596 106.666 106.666h213.333c58.881-.07 106.596-47.786 106.667-106.667V223.68c0-3.477-.277-6.912-.512-10.347z"></path></g></svg>
                                </div>
                                <div className="content">
                                    <div className="head">
                                        {item.title}
                                    </div>
                                    <div className="description">
                                        {removeHtmlTags(item.description).substring(0, 100) + " ..."}
                                    </div>
                                </div>
                                <div className="angle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.82 10.67">
                                        <path
                                            d="M5.33,10.67c-.13,0-.25-.05-.34-.14L.14,5.68c-.19-.19-.19-.5,0-.68,0,0,0,0,0,0L4.99.14c.19-.19.5-.19.69,0s.19.5,0,.69L1.17,5.33l4.51,4.51c.19.19.19.5,0,.69-.09.09-.21.14-.34.14h0Z"/>
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            }

            {articles.next_page_url ?
                <ul className="pagination mt-4">
                    {articles.links.map((item, index) => {
                        const label = item.label.replace(/&laquo;|&raquo;/g, "");
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
                            {label.trim()}
                        </li>
                    })}
                </ul>
                : null}
            <div className="space-25"></div>
            <div className="space-50"></div>
            <div className="space-50"></div>



        </div>
    )
}

export default Articles;
