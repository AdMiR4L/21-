import React, { useState, useRef } from 'react';
import axios from 'axios';
import UserProfile from "../assets/icons/user-profile.svg";
import Modal from "react-bootstrap/Modal";
import LevelIcon from "../assets/icons/level.svg";

const AvatarUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const hiddenFileInput = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setProgress(0);
        setUploaded(false);
        setShowCropModal(true)


        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }



    };

    const handleUpload = () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        })
            .then(() => {
                setUploaded(true);
            })
            .catch((err) => {
                console.error('Upload failed:', err);
                setUploaded(false);
            });
    };

    return (
        <div>
            <div onClick={() => hiddenFileInput.current.click()} className="avatar-upload-btn"></div>
            <input className="d-none" ref={hiddenFileInput} type="file" onChange={handleFileChange}/>
            {/*<button onClick={handleUpload} disabled={!file}>*/}
            {/*    Upload*/}
            {/*</button>*/}

            {file && (
                <div>
                    <p>Progress: {progress}%</p>
                    {uploaded && <p>Upload Complete!</p>}
                </div>
            )}
            <Modal show={showCropModal} onHide={() => setShowCropModal(false)} centered className="edit-game-modal custom-modal">
                <Modal.Header>
                    <Modal.Title>
                        انتخاب تصویر پروفایل
                    </Modal.Title>
                    <svg onClick={() => setShowCropModal(false)}
                         className="modal-cross-icon" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 211 211">
                        <path
                            d="M105.5,0C47.23,0,0,47.23,0,105.5s47.23,105.5,105.5,105.5,105.5-47.23,105.5-105.5C210.93,47.26,163.74.07,105.5,0ZM146.18,132.63c3.81,3.68,3.92,9.75.24,13.56-3.68,3.81-9.75,3.92-13.56.24-.08-.08-.16-.16-.24-.24l-27.12-27.13-27.12,27.13c-3.81,3.68-9.88,3.57-13.56-.24-3.59-3.72-3.59-9.61,0-13.33l27.12-27.13-27.12-27.13c-3.81-3.68-3.92-9.75-.24-13.56,3.68-3.81,9.75-3.92,13.56-.24.08.08.16.16.24.24l27.12,27.13,27.12-27.13c3.68-3.81,9.75-3.92,13.56-.24,3.81,3.68,3.92,9.75.24,13.56-.08.08-.16.16-.24.24l-27.12,27.13,27.12,27.13Z"/>
                    </svg>

                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <div onClick={() => hiddenFileInput.current.click()} className="primary-btn">انتخاب تصویر</div>
                            </div>
                            <div className="col-6">
                                <div onClick={() => handleUpload()} className="primary-btn"> آپلود تصویر</div>
                            </div>
                        </div>
                    </div>
                    <div className="choose-avatar-container">
                        <img src={imagePreview} alt=""/>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default AvatarUpload;
