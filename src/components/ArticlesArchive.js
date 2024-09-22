import React, {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import ConvertToShamsiDate from "./ConverToShamsiDate";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper/modules";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
function ArticlesArchive(props) {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation()

    function removeHtmlTags(str) {
        const noTags = str.replace(/<\/?[^>]+(>|$)/g, "");
        const textArea = document.createElement("textarea");
        textArea.innerHTML = noTags;
        return textArea.value;
    }

    const pageParam = searchParams.get('page') || 1
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState({});
    const [categories, setCategories] = useState({});
    const [page, setPage] = useState(`${process.env.REACT_APP_API}articles/archive?page=${pageParam}`);
    function  getArticles(link){
        axios.get(link ?? page, {
            params: {
                category: searchParams.get('category')
            }
        })
            .then(response => {
                setArticles(response.data.articles);
                setCategories(response.data.categories);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                navigate("*")
                setLoading(false);
            });
    }
    useEffect(() => {
        document.title = '21+ Articles'
        getArticles()
        setTimeout(() => window.scrollTo({
            top: 0, behavior: 'smooth'
        }), 100)
    }, [location.search]);


    return (

        <section className="articles articles-archive">
            <div className="container">
                <div className="row">
                    {!loading ?
                        <div className="d-none d-md-block col-12">
                            <div className="space-25"></div>
                            <Breadcrumb name="اخبار و مقالات آموزشی" location="/articles/archive?page=1"/>
                        </div>
                        : null
                    }
                    <div className="space-25"></div>
                    <div className="col-12 section-top">

                        <div className="section-header">
                            <h3 className="head">
                                اخبار و مقالات آموزشی
                            </h3>
                            <h4 className="notice mb-0">
                                مقالات آموزشی بازی مافیا مناسب سطوح مختلف
                            </h4>
                        </div>
                    </div>
                </div>
                {loading ?
                    Array.from({length: 5}).map((_, index) => {
                        return <div key={index} className="col-lg-4 mt-2 mb-3">
                            <article className="article">
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
                                        <Skeleton width={"70%"} height={"10px"}/>
                                    </li>
                                    <li className="footer">
                                        <Skeleton width={"100%"} border={1} height={"30px"}/>
                                    </li>
                                </ul>
                            </article>
                        </div>
                    })
                    :
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="categories">
                                <Swiper
                                    slidesPerView={"auto"}
                                    spaceBetween={20}
                                    modules={[FreeMode,]}
                                    className="pl-3"
                                    freeMode={true}
                                >

                                        <SwiperSlide className="mobile-article">
                                            <Link to="/articles/archive?page=1" className={`cat-item ${searchParams.get('category') === null ? "active" : null}`}>
                                                همه
                                            </Link>
                                        </SwiperSlide>
                                    {categories.map((item, index) => {
                                        return <SwiperSlide className="mobile-article" key={index}>
                                            <Link to={`/articles/archive?page=1&category=${item.slug}`} key={index} className={`cat-item ${searchParams.get('category') === item.slug ? "active" : null}`}>
                                                {item.title}
                                            </Link>
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        {articles.data.map((item, index) => (
                            <div key={index} className="col-lg-4 col-sm-6 mt-2 mb-3">
                                <article className="article">
                                    <div className="img-container">
                                        <Link to={`/article/${item.slug}`}>
                                            {item.image ?
                                                <img src={item.image} alt={item.title}/>
                                                :
                                                <svg className="blank-image" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 426.67 426.67">
                                                    <path
                                                        d="M12.37,362.88l-.43.43c-5.76-12.59-9.39-26.88-10.88-42.67,1.49,15.57,5.55,29.65,11.31,42.24ZM149.33,178.77c28.04,0,50.78-22.73,50.78-50.77s-22.73-50.78-50.77-50.78h0c-28.04,0-50.77,22.74-50.77,50.78,0,28.04,22.73,50.77,50.77,50.77Z"/>
                                                    <path
                                                        d="M302.72,0H123.95C46.29,0,0,46.29,0,123.95v178.77c0,23.25,4.05,43.52,11.95,60.59,18.35,40.53,57.6,63.36,112,63.36h178.77c77.65,0,123.95-46.29,123.95-123.95V123.95C426.67,46.29,380.37,0,302.72,0ZM391.89,224c-16.64-14.29-43.52-14.29-60.16,0l-88.75,76.16c-16.64,14.29-43.52,14.29-60.16,0l-7.25-5.97c-15.15-13.23-39.25-14.51-56.32-2.99l-79.79,53.55c-4.69-11.95-7.47-25.81-7.47-42.03V123.95c0-60.16,31.79-91.95,91.95-91.95h178.77c60.16,0,91.95,31.79,91.95,91.95v102.4l-2.77-2.35Z"/>
                                                </svg>
                                            }
                                        </Link>
                                    </div>
                                   {/* <div className="share">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.38 13.2">
                                            <path
                                                d="M10.06,8.56c-.74,0-1.43.35-1.86.95l-3.66-1.87c.16-.5.13-1.03-.07-1.51l3.83-2.3c.83.96,2.29,1.07,3.26.24.96-.83,1.07-2.29.24-3.26-.83-.96-2.29-1.07-3.26-.24-.51.44-.8,1.08-.8,1.76,0,.29.06.57.16.83l-3.84,2.31c-.84-.96-2.31-1.06-3.27-.22-.96.84-1.06,2.31-.22,3.27.84.96,2.31,1.06,3.27.22.14-.12.26-.25.36-.4l3.65,1.87c-.07.22-.11.45-.11.68,0,1.28,1.04,2.32,2.32,2.32s2.32-1.04,2.32-2.32-1.04-2.32-2.32-2.32h0Z"/>
                                        </svg>
                                    </div>*/}
                                    <ul className="content">
                                        <li className="head">

                                            <h5>
                                                <Link to={`/article/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h5>

                                        </li>
                                        <li className="description">
                                            <p>
                                                {removeHtmlTags(item.description).substring(0, 100)}
                                                ...
                                            </p>
                                        </li>
                                        <li className="footer">
                                            <ul className="foot-items">
                                                <li className="item">
                                                    {item.comment}
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
                                                <li className="item">
                                                    {item.like}
                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                         x="0" y="0" viewBox="0 0 24 24">
                                                        <g>
                                                            <path
                                                                d="M17.5 1.917a6.4 6.4 0 0 0-5.5 3.3 6.4 6.4 0 0 0-5.5-3.3A6.8 6.8 0 0 0 0 8.967c0 4.547 4.786 9.513 8.8 12.88a4.974 4.974 0 0 0 6.4 0c4.014-3.367 8.8-8.333 8.8-12.88a6.8 6.8 0 0 0-6.5-7.05Zm-3.585 18.4a2.973 2.973 0 0 1-3.83 0C4.947 16.006 2 11.87 2 8.967a4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05 1 1 0 0 0 2 0 4.8 4.8 0 0 1 4.5-5.05 4.8 4.8 0 0 1 4.5 5.05c0 2.903-2.947 7.039-8.085 11.346Z">
                                                            </path>
                                                        </g>
                                                    </svg>
                                                </li>
                                                <li className="item release">
                                                    <ConvertToShamsiDate gregorianDate={item.created_at}
                                                                         article={1}/>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.1 18.1">
                                                        <path
                                                            d="M9.96,18.1h-4.53c-.5,0-.9-.4-.9-.9s.4-.9.9-.9h4.53c3.12,0,5.75-2.24,6.25-5.32.28-1.67-.12-3.35-1.11-4.73-.99-1.38-2.45-2.29-4.13-2.56-.33-.05-.68-.08-1.03-.08-3.18,0-5.89,2.39-6.29,5.55-.06.49-.51.84-1.01.78-.49-.06-.84-.51-.78-1C2.39,4.88,5.86,1.81,9.96,1.81c.44,0,.88.04,1.3.1,2.16.35,4.04,1.52,5.31,3.29s1.77,3.92,1.42,6.07c-.65,3.95-4.03,6.82-8.03,6.83ZM7.24,15.39H2.71c-.5,0-.9-.4-.9-.9s.4-.9.9-.9h4.53c.5,0,.9.4.9.9s-.4.9-.9.9ZM5.43,12.67H.9c-.5,0-.9-.4-.9-.9s.4-.9.9-.9h4.53c.5,0,.9.4.9.9s-.4.9-.9.9ZM9.96,10.86c-.5,0-.9-.4-.9-.9v-3.62c0-.5.4-.9.9-.9s.9.4.9.9v3.62c0,.5-.4.9-.9.9ZM11.77,1.8h-3.62c-.5,0-.9-.4-.9-.9s.4-.9.9-.9h3.62c.5,0,.9.4.9.9s-.4.9-.9.9Z"/>
                                                    </svg>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </article>
                            </div>
                        ))}
                    </div>

                }
            </div>
            {!loading && articles.last_page > 1 ?
                <div className="col-12">
                    <div className="space-25"></div>
                    <ul className="pagination">
                        {articles.links.map((item, index) => {
                            const label = item.label.replace(/&laquo;|&raquo;/g, "");
                            return <li key={index}
                                       className={`item ${item.url == page || item.url === null ? "disabled" : ""} ${item.active ? "active" : ""}`}
                                       onClick={() => {
                                           if (item.url && item.url !== page) {
                                               const newPage = new URL(item.url).searchParams.get('page');
                                               const category = searchParams.get('category') ?? "";
                                               setPage(item.url);
                                               getArticles(item.url)
                                               navigate(`?page=${newPage}${category ? `&category=${category}` : ''}`);
                                               setTimeout(() => window.scrollTo({
                                                   top: 0, behavior: 'smooth'
                                               }), 500)

                                           } else return false
                                       }}>
                                {label.trim()}
                            </li>
                        })}
                    </ul>
                </div>
                : null}
            <div className="space-50"></div>
            <div className="space-25"></div>
            <div className="space-50"></div>
        </section>
    );
}

export default ArticlesArchive;
