import React, { useEffect, useRef, useState } from 'react';

const CameraToggle = () => {
    const videoRef = useRef(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        const getMediaStream = async () => {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: isFrontCamera ? 'user' : 'environment' },
                });
                setStream(newStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = newStream;
                }
            } catch (error) {
                console.error('Error accessing the camera', error);
            }
        };

        getMediaStream();

        // Cleanup function to stop the stream when the component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isFrontCamera]);

    const toggleCamera = () => {
        setIsFrontCamera(prev => !prev);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }} />
            <button onClick={toggleCamera}>
                Switch to {isFrontCamera ? 'Back' : 'Front'} Camera
            </button>
        </div>
    );
};

export default CameraToggle;
