import React, { useState, useEffect } from 'react';
import { Track } from 'livekit-client';
import { SourceToggle } from "../livekitcustom/SourceToggle";

interface CameraToggleProps {
  visibleControls: {
    camera: boolean;
  };
  localParticipant: {
    isCameraEnabled: boolean;
  }; 
  cameraOnChange: () => void;
  onDeviceError: (error: { source: Track.Source; error: Error }) => void; // More specific error type
  saveVideoInputDeviceId: (deviceId: string) => void;
}

export function CameraToggle({
  visibleControls,
  localParticipant,
  cameraOnChange,
  onDeviceError,
  saveVideoInputDeviceId,
}: CameraToggleProps) {
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);

  // Fetch available video input devices
  useEffect(() => {
    const fetchVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setAvailableDevices(videoDevices);

        // Set the initial device to the first camera (front) if none is selected
        if (videoDevices.length > 0 && !currentDeviceId) {
          setCurrentDeviceId(videoDevices[0].deviceId);
          saveVideoInputDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        onDeviceError({ source: Track.Source.Camera, error: err });
      }
    };

    fetchVideoDevices();
  }, [currentDeviceId, onDeviceError, saveVideoInputDeviceId]);

  // Switch between available cameras
  const toggleCamera = () => {
    if (availableDevices.length > 1) {
      const currentIndex = availableDevices.findIndex((device) => device.deviceId === currentDeviceId);
      const nextDeviceIndex = (currentIndex + 1) % availableDevices.length;
      const newDeviceId = availableDevices[nextDeviceIndex].deviceId;
      
      setCurrentDeviceId(newDeviceId);
      saveVideoInputDeviceId(newDeviceId);
    }
  };

  return (
    visibleControls.camera && (
      <div className="bg-white p-1 rounded-full flex justify-center items-center text-slate-400">
        <div className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full">
          <SourceToggle
            source={Track.Source.Camera}
            showIcon={false}
            onChange={cameraOnChange}
            onDeviceError={(error) => onDeviceError({ source: Track.Source.Camera, error })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 ${!localParticipant.isCameraEnabled && 'text-red-500'}`}
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              {localParticipant.isCameraEnabled ? (
                <path d="M181.92-180q-30.3 0-51.3-21-21-21-21-51.31v-455.38q0-30.31 21-51.31 21-21 51.3-21h455.39q30.3 0 51.3 21 21 21 21 51.31v183.08l140.77-140.77v370.76L709.61-435.39v183.08q0 30.31-21 51.31-21 21-51.3 21H181.92Zm0-60h455.39q5.38 0 8.84-3.46 3.47-3.46 3.47-8.85v-455.38q0-5.39-3.47-8.85-3.46-3.46-8.84-3.46H181.92q-5.38 0-8.84 3.46t-3.46 8.85v455.38q0 5.39 3.46 8.85t8.84 3.46Zm-12.3 0v-480 480Z" />
              ) : (
                <path d="M823.08-329.23L701.54-450.77v84.69l-40-40v-289.3q0-10.77-6.92-17.7-6.93-6.92-17.7-6.92h-289.3l-40-40h329.3q27.62 0 46.12 18.5 18.5 18.5 18.5 46.12v186.15l121.54-121.54v301.54Zm-47.23 207.85L96.77-800.46l28.31-28.31 679.07 679.08-28.3 28.31ZM506.46-561.15Zm-88.31 81.77ZM195.38-758.46 233.85-720h-27.7q-10.77 0-17.69 6.92-6.92 6.93-6.92 17.7v430.76q0 10.77 6.92 17.7 6.92 6.92 17.69 6.92h430.77q10.77 0 17.7-6.92 6.92-6.93 6.92-17.7v-27.69L700-253.85q-3.85 23-21.19 38.43Q661.46-200 636.92-200H206.15q-27.61 0-46.11-18.5t-18.5-46.12v-430.76q0-24.54 15.42-41.89t38.42-21.19Z" />
              )}
            </svg>
          </SourceToggle>
        </div>
        <button onClick={toggleCamera} className="text-xs text-blue-500">
          Switch Camera
        </button>
      </div>
    )
  );
}
