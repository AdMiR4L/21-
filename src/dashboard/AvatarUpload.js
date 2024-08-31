import React, { useState, useRef } from 'react';
import axios from 'axios';

const AvatarUpload = () => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const hiddenFileInput = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setProgress(0);
        setUploaded(false);
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
            <div onClick={()=>hiddenFileInput.current.click()} className="choose-image">انتخاب تصویر</div>
            <input className="d-none" ref={hiddenFileInput} type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={!file}>
                Upload
            </button>

            {file && (
                <div>
                    <p>Progress: {progress}%</p>
                    {uploaded && <p>Upload Complete!</p>}
                </div>
            )}
        </div>
    );
};

export default AvatarUpload;
