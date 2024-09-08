import React, { useState, useRef } from 'react';
import axios from 'axios';
import UserProfile from "../assets/icons/user-profile.svg";
import Modal from "react-bootstrap/Modal";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import toast from "react-hot-toast";

const AvatarUpload = (props) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [showCropModal, setShowCropModal] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const [croppedImage, setCroppedImage] = useState("");
    const hiddenFileInput = useRef(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const MAX_SIZE = 2 * 1024 * 1024;
    const cropperRef = useRef();

    const handleFileChange = (e) => {
        if (e.target.files[0]){
            setFile(e.target.files[0]);
            setProgress(0);
            setUploaded(false);
            setShowCropModal(true)

            setError(null);
            setImagePreview(null);

            if (e.target.files[0].size > MAX_SIZE) {
                setError("Image size exceeds 2MB");
                toast.error("حجم تصویر نباید بیشتر از 2 مگابایت باشد")
                setShowCropModal(false)
                return;
            }

            if (e.target.files[0]) {
                setFileLoading(true)
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
                setFileLoading(false)
            }
        }
    };

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCroppedImage(cropper.getCroppedCanvas().toDataURL())
        // console.log(cropper.getCroppedCanvas().toDataURL());
    };

    const handleZoom = (e) => {
        const cropper = cropperRef.current.cropper;

        // Get the canvas data (the visible part of the image)
        const canvasData = cropper.getCanvasData();
        const containerData = cropper.getContainerData();

        // Prevent zooming out if the canvas width is less than or equal to the container width
        if (canvasData.width <= containerData.width && e.detail.ratio < 1) {
            e.preventDefault();  // Prevent zoom out
        }
    };




    const handleUpload = () => {
        if (!file) return;

        setIsLoading(true);
        fetch(croppedImage)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('file', blob, file.name); // append the file to the form data

                axios.post(process.env.REACT_APP_API+'user/avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Bearer " + localStorage.authToken},
                        onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted)
                    }
                }).then(response => {
                    toast.success("تصویر پروفایل شما بروزرسانی شد");
                    setShowCropModal(false);
                    setImagePreview(null)
                    setFile(null)
                    setTimeout(() => { setShowCropModal(false); props.update() }, 500)
                }).catch(error => {
                    console.error('Image upload failed:', error);
                    toast.error("مشکلی در آپلود بوجود آمده، لطفا دوباره تلاش کنید");
                });
                setIsLoading(false);
            });
    };

    return (
        <div>
            <div onClick={() => hiddenFileInput.current.click()} className="avatar-upload-btn"></div>
            <input className="d-none" ref={hiddenFileInput} type="file" onChange={handleFileChange}/>
            <Modal show={showCropModal} onHide={() => setShowCropModal(false)} centered className="full-screen-modal-bellow-md">
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
                    <div className="col-12">
                        <ul className="notices">
                            <li className="item">
                                تصویر انتخاب شده نباید بیشتر از 2 مگابایت باشد
                            </li>
                            <li className="item">
                                لطفا از تصویر اصلی خود برای پروفایل استفاده کنید
                            </li>
                            <li className="item">
                                لطفا از استفاده تصاویر نا متعارف پرهیز کنید
                            </li>
                        </ul>
                    </div>
                    {!isLoading &&
                        <div className="buttons">
                            <div onClick={() => hiddenFileInput.current.click()}
                                 className="secondary-btn twin-buttons">انتخاب
                                تصویر
                            </div>
                            <div onClick={() => handleUpload()} className="primary-btn twin-buttons"> آپلود تصویر</div>
                        </div>
                    }
                    {file && isLoading && (
                        <div className="progress-container" style={{marginTop: '20px'}}>
                            <div className="progress-bar" style={{
                                height: '10px',
                                backgroundColor: '#ddd',
                                borderRadius: '5px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${progress}%`,   // Dynamic width
                                    height: '100%',
                                    backgroundColor: progress === 100 ? 'green' : 'blue',  // Change color when upload is complete
                                    transition: 'width 0.5s ease'  // Smooth transition effect
                                }}>
                                </div>
                            </div>
                            <div className="w-100 text-center" style={{
                                fontFamily : "sans-serif",
                            }}>{progress}%</div>
                        </div>
                    )}
                    <div className="choose-avatar-container">
                        {/*<img src={imagePreview} alt=""/>*/}
                        {fileLoading ?
                            <div className="image-loading">
                                Loading
                                <div className="loader-container">
                                    <div className="loader">
                                    </div>
                                </div>
                            </div>
                            :
                            <Cropper
                                src={imagePreview}
                                style={{height: "100%", width: "100%"}}
                                // Cropper.js options
                                initialAspectRatio={1}
                                aspectRatio={1}
                                guides={false}
                                crop={onCrop}
                                zoomable={false}
                                //zoom={handleZoom}
                                ref={cropperRef}
                            />
                        }
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    );
};

export default AvatarUpload;
