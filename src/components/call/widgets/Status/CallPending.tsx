"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";

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

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      
      if (updatedTimeLeft.days === 0 && updatedTimeLeft.hours === 0 && updatedTimeLeft.minutes === 0 && updatedTimeLeft.seconds === 0) {
        window.location.reload(); 
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pody-dark_secondary text-white p-4">
      <motion.div
        className="mb-8 text-slate-500"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
        >
          <path d="M624.62-560v-240h40v240h-40ZM760-560v-240h40v240h-40Zm-3.54 395.38q-104.38 0-210.73-53.26-106.35-53.27-191.61-138.54-85.27-85.27-138.93-191.23Q161.54-653.62 161.54-758q0-18 12-30t30-12h98.92q17.08 0 29.23 10.15 12.16 10.16 15.69 26.47L367.23-668q2.77 15.54-.5 28.19-3.27 12.66-13.81 21.66l-87 81.84q52.77 88.93 120.5 155.77Q454.15-313.69 544-263.08l84.77-87.84q10.54-10.54 22.73-14.27 12.19-3.73 26.19-.96l84.16 17.23q16.3 3.77 26.46 15.8 10.15 12.04 10.15 29.12v97.38q0 18-12 30t-30 12ZM246.38-573.85l76.77-70.61q3.85-3.08 5-8.46 1.16-5.39-.38-10L310-747.69q-1.54-6.16-5.38-9.23-3.85-3.08-10-3.08h-82.08q-4.62 0-7.69 3.08-3.08 3.07-3.08 7.69 1.15 41 12.85 85.61 11.69 44.62 31.76 89.77Zm334.93 328.77q40.54 20.08 86.42 29.7 45.89 9.61 79.96 10.3 4.62 0 7.69-3.07 3.08-3.08 3.08-7.7v-80.3q0-6.16-3.08-10-3.07-3.85-9.23-5.39l-74-15.15q-4.61-1.54-8.07-.39-3.46 1.16-7.31 5l-75.46 77ZM246.38-573.85Zm334.93 328.77Z" />
        </svg>
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
};

export default CallPendingPage;
