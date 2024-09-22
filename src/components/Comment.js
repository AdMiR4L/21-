import React, {useEffect, useState} from "react";
import axios from "axios";
import Skeleton from "./Skeleton";
import ConvertToShamsiDate from "./ConverToShamsiDate";
import Avatar from "../assets/avatar.png";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import ScenarioIcon from "../assets/scenario.svg";

function Comment(props) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken}
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState();
    const [comments, setComments] = useState({});








    function commentAttempt(){
        setLoading(true)
        axios.post(process.env.REACT_APP_API+"article/comment/add",{
            article_id : props.id,
            description : comment,
        }, {headers : headers})
            .then(response => {
                toast.success("نظر شما با موفقیت منتشر شد")
                getComments()
                setTimeout(()=> props.setCommentsModal(true))
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
                getComments()
                setLoading(false)
            });

    }

    function  getComments(){
        axios.get(process.env.REACT_APP_API+"articles/comments", {
            params: {
                article_id: props.id
            }
        })
            .then(response => {
                setComments(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getComments()
        //console.log("Modal Height: ", modalHeight);
    }, []);


    return (

        <section className="comments">
            <div className="container">

                <div className="space-25"></div>

                <div className="row">
                    {localStorage.userDetails && localStorage.userDetails.length > 0 && (
                        <div className="col-12">
                            <ul className="user-info">
                               <li className="name">
                                   {JSON.parse(localStorage.userDetails).name+" "+JSON.parse(localStorage.userDetails).family}
                               </li>
                                <li className="avatar">
                                    {JSON.parse(localStorage.userDetails).avatar?
                                        <img src={JSON.parse(localStorage.userDetails).avatar} alt={JSON.parse(localStorage.userDetails).name}/> :
                                        <img src={Avatar} alt={JSON.parse(localStorage.userDetails).name}/>
                                    }
                                </li>
                            </ul>
                            <textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                className="input-control"
                                id="comment"
                                cols="30"
                                rows="3">
                            </textarea>
                        </div>
                    )}
                    {localStorage.authToken && (
                        <div className="col-12">
                            <div className="secondary-btn twin-buttons"
                                 onClick={() => props.setCommentsModal(!props.commentsModal)}>
                                مشاهده نـظـرات
                            </div>

                            {loading ?
                                <div className="primary-btn twin-buttons">
                                    <div className="loader-container">
                                        <div className="loader">
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="primary-btn twin-buttons" onClick={() => commentAttempt()}>
                                    انـتـشــار نـظــر
                                </div>
                            }
                        </div>
                    )}

                </div>
            </div>

            {!loading ?
                <Modal
                    show={props.commentsModal}
                    onHide={() => props.setCommentsModal(!props.commentsModal)}
                    centered
                    className="comments-modal custom-modal "
                >
                    <Modal.Header>
                        <Modal.Title>

                            <div className="title"> نـظـرات</div>
                            <svg onClick={() => props.setCommentsModal(!props.commentsModal)}
                                 className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 211 211">
                                <path
                                    d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                            </svg>


                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <ul className="user-comments">
                            {comments.length ? comments.slice().reverse().map((comment, index) => (
                                    <li key={index} className="comment">
                                        <div className="userinfo">
                                            <ul className="top">
                                                <li className="name">
                                                    {comment.user.name + " " + comment.user.family}
                                                </li>
                                                <li className="date">
                                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"
                                                         viewBox="0 0 24 24">
                                                        <g>
                                                            <path
                                                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm4 13h-4a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v5h3a1 1 0 1 1 0 2Z"></path>
                                                        </g>
                                                    </svg>
                                                    <ConvertToShamsiDate comment={1} gregorianDate={comment.created_at}/>
                                                </li>
                                            </ul>
                                            <div className="cm">
                                                <div className="avatar">
                                                    <div className="img-container">
                                                        {comment.user.avatar ? (
                                                            <img src={comment.user.avatar} alt={comment.user.name}/>
                                                        ) : (
                                                            <img src={Avatar} alt={comment.user.name}/>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="description">{comment.description}</div>
                                            </div>
                                        </div>
                                    </li>
                                )) :
                                <div className="empty">
                                    <img src={ScenarioIcon} loading={"lazy"} alt="scenario"/>
                                    <div className="text">هنوز نظری منتشر نشده است</div>
                                </div>
                            }
                        </ul>

                    </Modal.Body>

                </Modal>
                : null
            }

        </section>
    )
        ;
}

export default Comment;
