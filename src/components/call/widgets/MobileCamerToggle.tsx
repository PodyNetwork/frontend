import React, { useEffect, useRef, useState } from 'react';

const CameraToggle = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const getMediaStream = async () => {
            // Stop the current stream if it exists
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

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
    }, [isFrontCamera, stream]); // Added stream as a dependency

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
