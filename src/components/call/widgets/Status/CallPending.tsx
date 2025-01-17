"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import CallWaiting from "./CallWaiting";
import useCreateCallToken from "@/hooks/call/useCreateCallToken";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import HostLobby from "./HostLobby";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CallPendingPage: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = useCallback((): Partial<TimeLeft> => {
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;

    let timeLeft: Partial<TimeLeft> = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<Partial<TimeLeft>>(
    calculateTimeLeft()
  );

  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { createCallToken, accessToken } = useCreateCallToken();
  const { profile } = useProfile();

  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      if (
        updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0
      ) {
        if (call && profile?.id === call?.userId && !accessToken) {
          setShowStartButton(true);
        }

        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [accessToken, calculateTimeLeft, call, createCallToken, profile?.id]);

  const handleStartCall = () => {
    if (call && !accessToken) {
      createCallToken.mutate({ callId: call._id }, {
        onSuccess: () => {
          setShowStartButton(false);
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error creating call token:", error);
        }
      });
    }
  };

  const targetTimeCal = new Date(targetDate).getTime();
  const currentTimeCal = new Date().getTime();
  const differenceCal = targetTimeCal - currentTimeCal;

  if (differenceCal > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
        <motion.div
          className="mb-8 text-slate-500"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
        </motion.div>

        <div className="mb-4">
          <h2 className="xs:text-xl md:text-xl font-medium">
            This Call hasn&apos;t started Yet
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-6">
              {Object.keys(timeLeft).map((interval, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-semibold text-slate-400">
                    {timeLeft[interval as keyof TimeLeft] !== undefined
                      ? timeLeft[interval as keyof TimeLeft]
                      : "0"}
                  </div>
                  <div className="text-xs font-medium uppercase text-gray-600 dark:text-gray-400">
                    {interval}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 w-full max-w-xs">
          <Link href="/dashboard">
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition duration-300 ease-in-out">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if(call?.userId === profile?.id) return <HostLobby showStartButton={showStartButton} handleStartCall={handleStartCall} />

  return <CallWaiting />;
};

export default CallPendingPage;
