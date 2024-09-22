import React, {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import ConvertToShamsiDate from "./ConverToShamsiDate";
import {Link, useNavigate, useParams} from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import Comment from "./Comment";
function Article(props) {

    const params = useParams();
    function removeHtmlTags(str) {
        const noTags = str.replace(/<\/?[^>]+(>|$)/g, "");
        const textArea = document.createElement("textarea");
        textArea.innerHTML = noTags;
        return textArea.value;
    }
    const navigate = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken}
    const [loading, setLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [likes, setLikes] = useState();
    const [myLike, setMyLike] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    function  getArticles(){
        axios.get(process.env.REACT_APP_API+"article/"+params.slug, {headers : headers})
            .then(response => {
                setLikes(response.data.article.like)
                if (response.data.like && response.data.like.status === 1)
                    setMyLike(true)
                setLikes(response.data.article.like)
                setArticle(response.data.article);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                navigate("*")
                setLoading(false);
            });
    }

    function likeAttempt(){
        axios.post(process.env.REACT_APP_API+"article/like",{
            article_id : article.id,
        }, {headers : headers})
            .then(response => {
                setMyLike(!myLike)
                if (response.data)
                    setLikes(prevLikes => prevLikes + 1);
                else
                    setLikes(prevLikes => prevLikes - 1);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

    }
    useEffect(() => {
        document.title = '21+ Articles | '+article.title ?? null
        getArticles()
        window.scrollTo(0, 0);
    }, []);


    return (

        <section className="articles">
            <div className="container">
                {!loading ?
                    <div className="d-none d-md-block col-12">
                        <div className="space-25"></div>
                        <Breadcrumb
                            tag={article.title}
                            tagLocation={`/article/${article.slug}`}
                            categoryLocation={`/articles/archive?page=1&category=${article.category?.slug}`}  // Safe navigation here
                            category={article.category?.title}  // Safe navigation here
                            name="اخبار و مقالات آموزشی"
                            location="/articles/archive?page=1"/>
                    </div>
                    : null
                }
                <div className="space-25"></div>
                {!loading ?
                    <div className="access">
                        <div className="article-single-access">
                            <ul className="item pr-2">
                                <li className="attr">دسته </li>
                                <li className="val">
                                    {article.category ? (
                                        <Link to={`/articles/archive?page=1&category=${article.category.slug}`}>
                                            {article.category.title}
                                        </Link>
                                    ) : 'Loading category...'}
                                </li>
                            </ul>
                            <div className="item" style={{cursor: "pointer"}} onClick={() => {
                                const url = window.location.href;  // Current page URL, or you can set any custom URL

                                navigator.clipboard.writeText(url)
                                    .then(() => {
                                        setCopied(true);  // Set copied state to true
                                        setTimeout(() => setCopied(false), 2000);  // Reset after 2 seconds
                                    })
                                    .catch(err => {
                                        console.error('Failed to copy: ', err);
                                    });
                            }}>
                                <div className="attr pr-2">
                                    اشتراک گذازی
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                <g>
                                        <path
                                            d="M10 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3h-2v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3zm7.586 2-6.293 6.293 1.414 1.414L19 6.414V10h2V4a1 1 0 0 0-1-1h-6v2z"></path>
                                    </g>
                                </svg>
                                {copied && (
                                    <div className="message">
                                        لیـنـک کپــی شــد !
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    : null}
                {loading ?
                    <article className="article single">
                        <div className="img-container">
                        <Skeleton border={1} width={"100%"} height={"100%"}/>
                            <svg className="blank-image position-absolute"
                                 style={{zIndex: 5, fill: "rgb(211 211 211)"}}
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 426.67 426.67">
                                <path
                                    d="M12.37,362.88l-.43.43c-5.76-12.59-9.39-26.88-10.88-42.67,1.49,15.57,5.55,29.65,11.31,42.24ZM149.33,178.77c28.04,0,50.78-22.73,50.78-50.77s-22.73-50.78-50.77-50.78h0c-28.04,0-50.77,22.74-50.77,50.78,0,28.04,22.73,50.77,50.77,50.77Z"/>
                                <path
                                    d="M302.72,0H123.95C46.29,0,0,46.29,0,123.95v178.77c0,23.25,4.05,43.52,11.95,60.59,18.35,40.53,57.6,63.36,112,63.36h178.77c77.65,0,123.95-46.29,123.95-123.95V123.95C426.67,46.29,380.37,0,302.72,0ZM391.89,224c-16.64-14.29-43.52-14.29-60.16,0l-88.75,76.16c-16.64,14.29-43.52,14.29-60.16,0l-7.25-5.97c-15.15-13.23-39.25-14.51-56.32-2.99l-79.79,53.55c-4.69-11.95-7.47-25.81-7.47-42.03V123.95c0-60.16,31.79-91.95,91.95-91.95h178.77c60.16,0,91.95,31.79,91.95,91.95v102.4l-2.77-2.35Z"/>
                            </svg>
                        </div>
                        <ul className="content">
                            <li className="head">
                                <Skeleton width={"100px"} height={"20px"}/>
                            </li>
                            <li className="description mb-3">
                                <Skeleton width={"100%"} height={"10px"}/>
                                <Skeleton width={"100%"} height={"10px"}/>
                                <Skeleton width={"100%"} height={"10px"}/>
                                <Skeleton width={"100%"} height={"10px"}/>
                                <Skeleton width={"100%"} height={"10px"}/>
                                <Skeleton width={"70%"} height={"10px"}/>
                            </li>
                            <li className="footer">
                                <Skeleton width={"100%"} border={1} height={"30px"}/>
                            </li>
                        </ul>
                    </article>
                    :
                    <div className="row">
                        <div className="col-12">
                            <article className="article single">
                                <div className="img-container">
                                    {article.image ?
                                        <img src={article.image} alt={article.title}/>
                                        :
                                        <svg className="blank-image" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 426.67 426.67">
                                            <path
                                                d="M12.37,362.88l-.43.43c-5.76-12.59-9.39-26.88-10.88-42.67,1.49,15.57,5.55,29.65,11.31,42.24ZM149.33,178.77c28.04,0,50.78-22.73,50.78-50.77s-22.73-50.78-50.77-50.78h0c-28.04,0-50.77,22.74-50.77,50.78,0,28.04,22.73,50.77,50.77,50.77Z"/>
                                            <path
                                                d="M302.72,0H123.95C46.29,0,0,46.29,0,123.95v178.77c0,23.25,4.05,43.52,11.95,60.59,18.35,40.53,57.6,63.36,112,63.36h178.77c77.65,0,123.95-46.29,123.95-123.95V123.95C426.67,46.29,380.37,0,302.72,0ZM391.89,224c-16.64-14.29-43.52-14.29-60.16,0l-88.75,76.16c-16.64,14.29-43.52,14.29-60.16,0l-7.25-5.97c-15.15-13.23-39.25-14.51-56.32-2.99l-79.79,53.55c-4.69-11.95-7.47-25.81-7.47-42.03V123.95c0-60.16,31.79-91.95,91.95-91.95h178.77c60.16,0,91.95,31.79,91.95,91.95v102.4l-2.77-2.35Z"/>
                                        </svg>
                                    }
                                </div>
                                <div className="head">
                                    <h1>{article.title}</h1>
                                </div>
                                <div className="description">
                                    <div dangerouslySetInnerHTML={{__html: article.description}}></div>
                                </div>
                                <div className="content">
                                    <div className="footer">
                                        <ul className="foot-items">
                                            <li className="item" onClick={() =>setShowCommentsModal(true)} style={{cursor : "pointer"}}>
                                                {article.comment}
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                     x="0" y="0" viewBox="0 0 24 24">
                                                    <g>
                                                        <path
                                                            d="M24 11.247A12.012 12.012 0 1 0 12.017 24H19a5.005 5.005 0 0 0 5-5v-7.753ZM22 19a3 3 0 0 1-3 3h-6.983a10.041 10.041 0 0 1-7.476-3.343 9.917 9.917 0 0 1-2.476-7.814 10.043 10.043 0 0 1 8.656-8.761 10.564 10.564 0 0 1 1.3-.082A9.921 9.921 0 0 1 18.4 4.3a10.041 10.041 0 0 1 3.6 7.042Z"></path>
                                                        <path
                                                            d="M8 9h4a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2ZM16 11H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2ZM16 15H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2Z"></path>
                                                    </g>
                                                </svg>
                                            </li>
                                            <li className="item" style={{ cursor : "pointer"}}
                                                onClick={() => localStorage.authToken ? likeAttempt() : props.setloginModal(true)}>
                                                {likes}
                                                {myLike ?
                                                    <svg className="active" xmlns="http://www.w3.org/2000/svg"
                                                         version="1.1"
                                                         viewBox="0 0 24 24">
                                                        <g>
                                                            <path
                                                                d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Z">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                         x="0" y="0" viewBox="0 0 24 24">
                                                        <g>
                                                            <path
                                                                d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Zm-3.585 18.4a2.973 2.973 0 0 1-3.83 0C4.947 16.006 2 11.87 2 8.967a4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05 1 1 0 0 0 2 0 4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05c0 2.903-2.947 7.039-8.085 11.346Z">
                                                            </path>
                                                        </g>
                                                    </svg>

                                                }
                                            </li>
                                            <li className="item release">
                                                <ConvertToShamsiDate gregorianDate={article.created_at} single={1} />

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                }
            </div>
            {!loading && (<Comment
                setCommentsModal={setShowCommentsModal}
                commentsModal={showCommentsModal}
                id={article.id}
                type={"Article::class"} />)}

            <div className="space-50"></div>
            <div className="space-25"></div>
            <div className="space-50"></div>
        </section>
    );
}

export default Article;
