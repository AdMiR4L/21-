import React, { useEffect, useState } from 'react';
import LaravelEcho from './LaravelEcho';
import EmptyIcon from "../assets/empty.svg";
import axios from "axios";
import toast from "react-hot-toast";

const NotificationComponent = ({ user }) => {
    const [notifications, setNotifications] = useState([]);
    const [show, setShow] = useState(false);
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.authToken}

    function getNotifications() {
        axios.get(process.env.REACT_APP_API+"user/notifications", {headers : headers})
            .then(response => {
                setNotifications(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }
    function readNotifications() {
        axios.post(process.env.REACT_APP_API+"user/notifications/read",null, {headers : headers})
            .then(response => {
               toast.success(response.data)
                getNotifications()
            }).catch(error =>{
            console.log(error);
        })
    }
    function removeNotifications() {
        axios.post(process.env.REACT_APP_API+"user/notifications/remove",null, {headers : headers})
            .then(response => {
                toast.success(response.data)
                setNotifications([])
            }).catch(error =>{
            console.log(error);
        })
    }

    useEffect(() => {
        const channel = LaravelEcho.private(`notifications.${user.id}`);
        channel.listen('.UsersNotification', (data) => {
            console.log('Notification received:', data);
            setNotifications((prevNotifications) => [
                {data,read_at: null},
                ...prevNotifications
            ]);
        });
        getNotifications();
        return () => {
            channel.stopListening('.UsersNotification'); // Stop the specific event listener
            LaravelEcho.leaveChannel(`notifications.${user.id}`); //
        };
    }, [user.id]);

    return (
        <div>
            <div className="item" onClick={() => setShow(!show)}>
                <svg className="back-icon notification-icon" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 57.1 61.48">
                    <path
                        d="M51.65,32.26l-1.79-.95v-9.37C49.86,9.84,40.3,0,28.55,0S7.24,9.84,7.24,21.93l.03,9.38-1.85.96C2.05,34.06-.02,37.53,0,41.32,0,46.92,4.45,51.47,9.92,51.47h37.26c5.47,0,9.92-4.55,9.92-10.15,0-3.85-2.09-7.33-5.45-9.06ZM47.18,45.05H9.92c-1.93,0-3.5-1.67-3.5-3.75,0-1.41.76-2.69,1.97-3.34l1.83-.95c2.12-1.1,3.44-3.29,3.44-5.71v-9.38c0-8.55,6.68-15.51,14.89-15.51s14.89,6.96,14.89,15.51v9.36c0,2.39,1.29,4.57,3.44,5.73l1.82.94c1.2.62,1.97,1.93,1.97,3.35,0,2.06-1.57,3.73-3.5,3.73Z"/>
                    <path
                        d="M33.65,54.84h-10.19c-1.83,0-3.32,1.49-3.32,3.32s1.49,3.32,3.32,3.32h10.19c1.83,0,3.32-1.49,3.32-3.32s-1.49-3.32-3.32-3.32Z"/>
                </svg>
            </div>
            {notifications.filter(notification => notification.read_at === null).length > 0 ?
                <div className="has-notify" onClick={() => setShow(!show)}>
                    {notifications.filter(notification => notification.read_at === null).length}
                </div>
                : null}

            {show ?
                <div className="notify-box">
                    <div className={`head ${notifications.length > 0 ? "has" : null}`}>
                        اعلانات
                        {/*{notifications.length > 0 ?*/}
                        {/*    <div className="count">*/}
                        {/*        مجموع*/}
                        {/*        {notifications.length}*/}
                        {/*    </div>*/}
                        {/*    : null}*/}
                    </div>
                    <ul className="notifications">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li className="notification-item" key={index}>
                                    <div className={`title ${notification.data.read_at ? "read" : null}`}>{notification.data.title}</div>
                                    {notification.data.character ?
                                        <div className="message">
                                            کارکتر شما مشخص شد
                                            <span className="character">
                                                {notification.data.character}
                                            </span>
                                        </div> :
                                        <div className="message">
                                            {notification.data.message}
                                        </div>
                                    }

                                </li>
                            ))
                        ) : (
                            <li className="empty">
                                <img loading={"lazy"} src={EmptyIcon} alt="empty"/>
                                <div className="text">موردی وجود ندارد</div>
                            </li>
                        )}
                    </ul>
                    {notifications.length > 0 ?
                        <ul className="notif-footer">
                            <li className="item" onClick={() => readNotifications()}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 24 24" className="">
                                    <g>
                                    <path d="M18.581 2.14 12.316.051a1 1 0 0 0-.632 0L5.419 2.14A4.993 4.993 0 0 0 2 6.883V12c0 7.563 9.2 11.74 9.594 11.914a1 1 0 0 0 .812 0C12.8 23.74 22 19.563 22 12V6.883a4.993 4.993 0 0 0-3.419-4.743Zm-1.863 7.577-4.272 4.272a1.873 1.873 0 0 1-1.335.553h-.033a1.872 1.872 0 0 1-1.345-.6l-2.306-2.4a1 1 0 1 1 1.441-1.382l2.244 2.34L15.3 8.3a1 1 0 0 1 1.414 1.414Z"></path>
                                </g>
                                </svg>
                                خـوانـدن
                            </li>
                            <li className="item" onClick={() => removeNotifications()}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                                    <g>
                                        <path
                                            d="M448 85.333h-66.133C371.66 35.703 328.002.064 277.333 0h-42.667c-50.669.064-94.327 35.703-104.533 85.333H64c-11.782 0-21.333 9.551-21.333 21.333S52.218 128 64 128h21.333v277.333C85.404 464.214 133.119 511.93 192 512h128c58.881-.07 106.596-47.786 106.667-106.667V128H448c11.782 0 21.333-9.551 21.333-21.333S459.782 85.333 448 85.333zM234.667 362.667c0 11.782-9.551 21.333-21.333 21.333-11.783 0-21.334-9.551-21.334-21.333v-128c0-11.782 9.551-21.333 21.333-21.333 11.782 0 21.333 9.551 21.333 21.333v128zm85.333 0c0 11.782-9.551 21.333-21.333 21.333-11.782 0-21.333-9.551-21.333-21.333v-128c0-11.782 9.551-21.333 21.333-21.333 11.782 0 21.333 9.551 21.333 21.333v128zM174.315 85.333c9.074-25.551 33.238-42.634 60.352-42.667h42.667c27.114.033 51.278 17.116 60.352 42.667H174.315z"></path>
                                    </g>
                                </svg>
                                پاکسـازی
                            </li>
                        </ul>
                        : null}
                </div>
                : null
            }
        </div>
    );
};

export default NotificationComponent;
