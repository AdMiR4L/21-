import FAQImage from '../assets/faq.png';
import './FAQ.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Modal from "react-bootstrap/Modal";
import LevelIcon from "../assets/icons/level.svg";


function FAQ() {

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState({});
    const [question, setQuestion] = useState({
        show : false,
        title : null,
        description : null,
    });
    function  getQuestions(){
        axios.get(process.env.REACT_APP_API+"questions", null)
            .then(response => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getQuestions()
    }, []);

    return (
        <aside className="col-12 mt-3">
            <div className="section-top">
                <div className="section-header">
                    <h3 className="head">
                        سوالات متداول
                    </h3>
                    <h4 className="notice mb-0">
                        سوالاتی که شاید برای شما نیز پیش بیاید
                    </h4>
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
                    </ul>
                    <ul className="faq-footer">
                        <div className="img-container">
                            <img loading={"lazy"} src={FAQImage} alt="faq"/>
                        </div>
                        <div className="content w-50 mt-3">
                            <div className="mb-2">
                                <Skeleton width="60%" height="20px"/>
                            </div>
                            <div className="head">
                                <Skeleton width="100%" height="40px" borderRadius={10}/>
                            </div>

                        </div>
                    </ul>
                </div>
                :
                <div className="faq">
                    <ul className="faq">
                        {questions.map((item, index) => (
                            <li
                                key={index}
                                className="question"   onClick={() => setQuestion({
                                show: true,
                                title: item.title,
                                description: item.description,
                            })}>
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
                                        {item.description.substring(0, 100)+" ..."}
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
                    <ul className="faq-footer">
                        <div className="img-container">
                            <img src={FAQImage} alt="faq"/>
                        </div>
                        <div className="content">
                            <div className="head">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                                    <path
                                        d="M16.83,11.56v-.02l-.02-9.26c0-1.26-1.03-2.28-2.28-2.28H2.28C1.02,0,0,1.02,0,2.28v9.24c0,1.26,1.02,2.28,2.28,2.29h1.57v1.52c0,.42.34.76.76.76.16,0,.32-.05.46-.15l2.84-2.13,6.62.02c1.26,0,2.29-1.01,2.29-2.27ZM8.38,10.71h0c-.42,0-.76-.34-.76-.76s.34-.76.76-.76.76.34.76.76c0,.42-.34.76-.76.76ZM10.44,6.48c-.27.49-.71.87-1.24,1.06v.08c.02.42-.31.77-.73.79-.42.02-.77-.31-.79-.73,0-.02,0-.04,0-.06v-.48c0-.5.37-.93.87-1,.37-.05.65-.38.65-.75,0-.44-.37-.79-.8-.78-.19,0-.37.07-.51.19-.36.22-.83.1-1.04-.27-.21-.35-.11-.79.22-1.02.73-.5,1.68-.55,2.47-.14,1.11.6,1.52,1.99.91,3.1Z"/>
                                    <path
                                        d="M23.71,10.71h-5.36v.83c0,1.82-1.28,3.39-3.07,3.74h6.85c.42.02.75.37.73.79-.01.4-.33.72-.73.73h-9.14c-.42,0-.76-.34-.76-.76,0-.3.18-.58.45-.7h-3.5s0,6.84,0,6.84c0,1.26,1.02,2.28,2.29,2.28h5.15l2.89,1.44c.38.19.83.03,1.02-.34.05-.1.08-.22.08-.34v-.76h3.1c1.26,0,2.28-1.02,2.29-2.28v-9.19c0-1.26-1.02-2.28-2.28-2.29ZM22.14,19.85h-9.14c-.42-.02-.75-.37-.73-.79.01-.4.33-.72.73-.73h9.14c.42.02.75.37.73.79-.01.4-.33.72-.73.73Z"/>
                                </svg>
                                مـشـاهـده بیـشـتـر
                            </div>
                            <div className="btn">
                                ارتباط با پشتیبانی
                            </div>
                        </div>
                    </ul>
                </div>
            }



            <Modal
                show={question.show}
                onHide={() => setQuestion(prevState => ({ ...prevState, show: false }))}
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

            </Modal>
        </aside>
    );
}

export default FAQ;