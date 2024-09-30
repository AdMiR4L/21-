


import React, {useEffect, useState} from "react";
import "../../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "../../components/Skeleton";



function Create() {

    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState([]);
    const [categories, setCategories] = useState([]);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken
    }
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [articleStatus, setArticleStatus] = useState("");
    const [categorySelection , setCategorySelection] = useState(false);


    // function getArticle() {
    //     setLoading(true)
    //     axios.post(process.env.REACT_APP_API + 'admin/articles', null, {
    //         headers: headers
    //     })
    //         .then((response) => {
    //             console.log(response)
    //             setArticle(response.data)
    //             setLoading(false)
    //         })
    //         .catch((error) => {
    //             //console.log(this.state.registerRequest)
    //             console.log(error);
    //         });
    // }
    function getCategories() {
        setLoading(true)
        axios.get(process.env.REACT_APP_API + 'admin/categories', {
            headers: headers
        })
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }
    function addArticle() {
        setLoading(true)
        axios.post(process.env.REACT_APP_API + 'admin/articles/add', {
            title : title,
            description : description,
            category : category,
            status : articleStatus,
        }, {
            headers: headers
        })
            .then((response) => {
                console.log(response)
                setArticle(response.data)
                setLoading(false)
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }


    useEffect(() => {
        //getArticle();
        getCategories();
        window.scrollTo(0, 0);
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
                <div className="row user-info-page">
                    <div className="col-12">

                        <div className="space-50"></div>
                    </div>
                    <div className="col-6">
                        <label className="input-label">عنوان</label>
                        <input
                            className="input-control"
                            placeholder="عنوان مقاله یا آموزش"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"/>
                    </div>
                    <div className="col-6 position-relative">
                        <label className="input-label">دسته بندی</label>
                        <div onClick={() => setCategorySelection(!categorySelection)}
                             className="input-control position-relative">
                            {/* Check if category is set and category.id is valid */}
                            {category && category.id ? categories.find(obj => obj.id === category.id)?.title : "انتخاب دسته بندی"}
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                 className={categorySelection ? "active angle-icon" : "angle-icon"}
                                 viewBox="0 0 24 24">
                                <g><path d="M9 20a1 1 0 0 1-.707-1.707L14.586 12 8.293 5.707a1 1 0 0 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7A1 1 0 0 1 9 20z"></path></g></svg>
                           {/* <svg className={categorySelection ? "active angle-icon" : "angle-icon"}
                                 xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                                <g>
                                    <path
                                        d="M12 14.75a.744.744 0 0 1-.53-.22l-4-4a.75.75 0 0 1 1.06-1.06L12 12.939l3.47-3.469a.75.75 0 0 1 1.06 1.06l-4 4a.744.744 0 0 1-.53.22z"></path>
                                </g>
                            </svg>*/}
                            {categorySelection ? (
                                <ul style={{right: 0, transform: "translateY(10px)"}} className="custom-select-input">
                                    {categories.map((item, index) => (
                                        <li
                                            key={index}
                                            className="item"
                                            onClick={() => {
                                                setCategory(item); // Store the entire item object, not just item.id
                                                setCategorySelection(false); // Close the dropdown after selection
                                            }}
                                        >
                                            {item.title}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    </div>


                    {/*<div className="col-12 mt-3">*/}
                    {/*    <label className="input-label">توضیحات پروفایل</label>*/}
                    {/*    <div className="input position-relative">*/}
                    {/*            <textarea*/}
                    {/*                rows={10}*/}
                    {/*                placeholder="توضیحات پروفایل ..."*/}
                    {/*                value={profileDescription}*/}
                    {/*                onChange={(e) => setProfileDescription(e.target.value)}*/}
                    {/*                className="input-control"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    <div className="col-12">
                        <li className="secondary-btn twin-buttons" onClick={() => console.log(1)}>انصراف</li>
                        {sendDataLoading ?
                            <li className="primary-btn twin-buttons">
                                <div className="loader-container">
                                    <div className="loader">
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="primary-btn twin-buttons " onClick={() => addArticle()}>
                                افزودن آیتم
                            </li>
                        }
                    </div>
                    <div className="space-50"></div>
                    <div className="space-50"></div>
                    <div className="space-25"></div>


                </div>
            </div>
    )
}

export default Create;
