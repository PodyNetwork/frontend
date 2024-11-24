"use client";
import { useState, useRef } from "react";

export default function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      // Get screen media with audio (captures tab audio)
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true, // Capture system (tab) audio
      });

      // Get audio from microphone
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true, // Capture microphone audio
      });

      // Combine both streams: screen (tab audio) + mic
      const combinedStream = new MediaStream([
        ...screenStream.getTracks(),
        ...micStream.getTracks(),
      ]);

      // Set up MediaRecorder to record both screen and mic audio
      mediaRecorderRef.current = new MediaRecorder(combinedStream);
      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        chunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Store the stream for later cleanup
      streamRef.current = combinedStream;
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      // Stop the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
    }
  };

  return (
    <div>
      <h1>Screen and Mic Recorder</h1>
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {videoUrl && (
        <div>
          <h3>Recorded Video</h3>
          <video controls src={videoUrl} width="600" />
        </div>
      )}
    </div>
  );
}
