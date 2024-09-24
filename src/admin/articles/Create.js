


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
                setArticle(response.data)
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
                             className="input-control position-relative"> انتخاب دسته بندی
                            {categorySelection ?
                                <ul style={{right: 0, transform: "translateY(10px)"}} className="custom-select-input">
                                    {categories.map((item, index) => (
                                        <li
                                            key={index}
                                            className="item"
                                            onClick={() => {
                                                setCategory(item.id);
                                                setCategorySelection(!categorySelection);
                                            }}
                                        >{item.title}
                                        </li>
                                    ))}
                                </ul> : null}
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
