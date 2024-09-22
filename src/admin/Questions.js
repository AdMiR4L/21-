

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "../components/Dashboard.css";
import axios from "axios";
import toast from "react-hot-toast";

import {Link} from "react-router-dom"
import Skeleton from "../components/Skeleton";

import FAQImage from "../assets/faq.png";
import Modal from "react-bootstrap/Modal";

function Questions() {
    const [questions, setQuestions] = useState();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sendDataLoading, setSendDataLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [answer , setAnswer] = useState("");
    const [editAnswer , setEditAnswer] = useState("");
    const [editId , setEditId] = useState("");


    function get() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setLoading(true)
        axios.get(process.env.REACT_APP_API + 'admin/questions', {
            headers: headers
        })
            .then((response) => {
                setQuestions(response.data)
                setLoading(false)
                console.log(response.data);
            })
            .catch((error) => {
                //console.log(this.state.registerRequest)
                console.log(error);
            });
    }

    function addQuestion() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setSendDataLoading(true)
        axios.post(process.env.REACT_APP_API + 'admin/question/add',{
            title: title,
            description: answer,
        }, {
            headers: headers
        })
            .then((response) => {
                setSendDataLoading(false)
                toast.success(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setSendDataLoading(false)
            });
    }
    function editQuestion() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.authToken
        }
        setSendDataLoading(true)
        axios.post(process.env.REACT_APP_API + 'admin/question/edit',{
            id: editId,
            title: editTitle,
            description: editAnswer,
        }, {
            headers: headers
        })
            .then((response) => {
                setSendDataLoading(false)
                toast.success(response.data)
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                setSendDataLoading(false)
            });
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
                        سوالات متداول
                    </h3>
                    <h4 className="notice mb-0">
                        سوالاتی که شاید برای شما نیز پیش بیاید
                    </h4>
                </div>

                    <div style={{position : "absolute", top: "-5px", left : "5px", padding: "5px 5px 5px 15px"}} className="header-more" onClick={() =>setShowAddModal(true)}>
                        <svg className="more-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24">
                            <g>
                                <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm5 12h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2z"></path>
                            </g>
                        </svg>
                        افزودن آیتم
                    </div>
              
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
                        {questions.data.map((item, index) => (
                            <li
                                onClick={() => {
                                    setShowEditModal(true)
                                    setEditId(item.id)
                                    setEditAnswer(item.description)
                                    setEditTitle(item.title)
                                }}
                                key={index}
                                className="question">
                                <div className="question-mark">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                        <path
                                            d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                                    </svg>
                                </div>
                                <div className="content">
                                    <div className="head">
                                        {item.title}
                                    </div>
                                    <div className="description">
                                        {item.description.substring(0, 100) + " ..."}
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


            {/*<Modal
                show={question.show}
                onHide={() => setQuestion(prevState => ({...prevState, show: false}))}
                centered
                className="question-modal custom-modal"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="question-mark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                <path
                                    d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                            </svg>
                        </div>
                        سوالات متداول
                    </Modal.Title>
                    <svg onClick={() => setQuestion(prevState => ({...prevState, show: false}))}
                         className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 211 211">
                        <path
                            d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                    </svg>

                </Modal.Header>
                <Modal.Body>
                    <ul className="question-content">
                        <li className="title">{question.title}</li>
                        <li className="description">{question.description}</li>
                    </ul>

                </Modal.Body>

            </Modal>*/}


            <Modal
                show={showAddModal}
                onHide={()=> setShowAddModal(false)}
                centered
                className="question-modal custom-modal"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="question-mark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                <path
                                    d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                            </svg>
                        </div>
                        افزودن سوال جدید
                    </Modal.Title>
                    <svg onClick={() => setShowAddModal(!showAddModal)}
                         className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 211 211">
                        <path
                            d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                    </svg>

                </Modal.Header>
                <Modal.Body>
                    <ul className="question-content">
                        <li className="item">
                            <label className="input-label">عنوان سوال</label>
                            <input
                                type="text"
                                value={title}
                                placeholder="عنوان سوال را وارد کنید"
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-control"/>
                        </li>
                        <li className="item">
                            <label className="input-label">پاسخ سوال</label>
                            <textarea className="input-control" onChange={(e) => setAnswer(e.target.value)} value={answer}
                                      placeholder="پاسخ سوال را وارد کنید" cols="30" rows="6"></textarea>
                        </li>

                        <li className="secondary-btn twin-buttons" onClick={() => setShowAddModal(false)}>انصراف</li>
                        {sendDataLoading ?
                            <li className="primary-btn twin-buttons">
                                <div className="loader-container">
                                    <div className="loader">
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="primary-btn twin-buttons " onClick={() => addQuestion()}>
                                افزودن آیتم
                            </li>
                        }
                    </ul>
                </Modal.Body>
            </Modal>

            <Modal
                show={showEditModal}
                onHide={()=> setShowEditModal(false)}
                centered
                className="question-modal custom-modal"
            >
                <Modal.Header>
                    <Modal.Title>
                        <div className="question-mark">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 15.73">
                                <path
                                    d="M4.76,6.83c.16.13.31.31.45.53.14.22.25.47.35.75.1.28.17.58.23.89.05.32.08.64.08.96v1.24h-2.18v-1.24c0-.36-.08-.71-.23-1.04-.15-.33-.37-.62-.65-.88-.12-.11-.25-.22-.39-.33-.14-.11-.28-.22-.42-.33-.18-.14-.35-.28-.52-.42-.17-.14-.33-.28-.48-.42-.35-.33-.6-.73-.76-1.2-.16-.47-.24-.96-.24-1.49s.13-1.06.39-1.53c.26-.47.59-.88,1-1.22.41-.35.88-.62,1.39-.81.51-.19,1.03-.29,1.55-.29.67,0,1.26.1,1.79.31.52.21.96.51,1.32.9.36.39.63.86.81,1.41.16.5.25,1.06.25,1.67v.18h-2.18c0-.42-.05-.78-.16-1.08s-.25-.53-.43-.71-.39-.3-.63-.38c-.24-.08-.49-.12-.76-.12-.29,0-.56.04-.8.12-.25.08-.46.2-.64.35s-.32.32-.42.53c-.1.2-.15.42-.15.66,0,.36.07.69.21.99.14.3.35.56.62.77l1.61,1.23ZM4.8,15.73l-1.63-1.66,1.69-1.68,1.64,1.68-1.7,1.66Z"/>
                            </svg>
                        </div>
                        ویرایش سوال
                    </Modal.Title>
                    <svg onClick={() => setShowEditModal(!showEditModal)}
                         className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 211 211">
                        <path
                            d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                    </svg>

                </Modal.Header>
                <Modal.Body>
                    <ul className="question-content">
                        <li className="item">
                            <label className="input-label">عنوان سوال</label>
                            <input
                                type="text"
                                value={editTitle}
                                placeholder="عنوان سوال را وارد کنید"
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-control"/>
                        </li>
                        <li className="item">
                            <label className="input-label">پاسخ سوال</label>
                            <textarea className="input-control" onChange={(e) => setAnswer(e.target.value)} value={editAnswer}
                                      placeholder="پاسخ سوال را وارد کنید" cols="30" rows="6"></textarea>
                        </li>

                        <li className="secondary-btn twin-buttons" onClick={() => setShowEditModal(false)}>انصراف</li>
                        {sendDataLoading ?
                            <li className="primary-btn twin-buttons">
                                <div className="loader-container">
                                    <div className="loader">
                                    </div>
                                </div>
                            </li>
                            :
                            <li className="primary-btn twin-buttons " onClick={() => editQuestion()}>
                                ویرایش آیتم
                            </li>
                        }
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Questions;
