"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import useYuzuAllocation from "@/hooks/yuzu/useGetYuzuAllocation";
import useCheckEligibility from "@/hooks/yuzu/useCheckEligibility";
import useClaimYuzu from "@/hooks/yuzu/useClaimYuzu";
import Link from "next/link";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const targetDate = new Date("2025-03-11T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      } else {
        setHasEnded(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="font-semibold text-sm mt-9">Loading countdown...</div>
    );
  }

  return (
    <div className="font-semibold text-sm mt-9">
      {hasEnded
        ? "Claiming ended"
        : `Claim ends in: ${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
    </div>
  );
};

const ShareButton = () => {
  const handleShareOnTwitter = () => {
    const tweetText = encodeURIComponent(
      "I just claimed my @podynetwork Testnet Yuzu! 🎉 #Yuzu #educhain"
    );
    const tweetUrl = encodeURIComponent(
      "https://testnet.pody.network/yuzu/eligibility"
    );
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}`;

    window.open(twitterIntentUrl, "_blank");
  };

  return (
    <button
      onClick={handleShareOnTwitter}
      className="bg-slate-900 text-white text-sm py-3 px-8 rounded-full cursor-pointer flex items-center gap-1 mx-auto"
    >
      Share on{" "}
      <svg
        id="fi_5968958"
        enableBackground="new 0 0 1226.37 1226.37"
        viewBox="0 0 1226.37 1226.37"
        xmlns="http://www.w3.org/2000/svg"
        className="size-3 text-slate-100"
        fill="currentColor"
      >
        <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z"></path>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </button>
  );
};

const page = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 360,
      startVelocity: 30,
      origin: { x: 0.5, y: 0.5 },
      angle: 90,
      colors: ["#FFD700", "#ff8c00", "#ff007f", "#7b00ff", "#FF69B4"],
      gravity: 0.5,
      scalar: 0.8,
    });

    // Add a second burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        startVelocity: 30,
        origin: { x: 0.25, y: 0.5 }, // Slightly to the left
        angle: 90,
        colors: ["#FFD700", "#ff8c00", "#ff007f", "#7b00ff", "#FF69B4"],
        gravity: 0.5,
        scalar: 0.8,
      });
    }, 500);

    // Add a third burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 360,
        startVelocity: 30,
        origin: { x: 0.75, y: 0.5 }, // Slightly to the right
        angle: 90,
        colors: ["#FFD700", "#ff8c00", "#ff007f", "#7b00ff", "#FF69B4"],
        gravity: 0.5,
        scalar: 0.8,
      });
    }, 1000);
  };

  const {
    yuzuAllocation,
    isLoading: yuzuAllocationLoading,
    refetch,
  } = useYuzuAllocation();
  const { isEligible } = useCheckEligibility();

  const {
    claimed,
    isLoading: yuzuClaimLoading,
    isSuccess,
    data,
  } = useClaimYuzu();

  const handleClaim = async () => {
    await claimed();
    refetch();
  };

  isSuccess && triggerConfetti();

  return (
    <main className="relaive flex flex-col w-full __bg_yuzu" aria-label="class">
      <div className="w-full min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <nav className="flex justify-center py-8">
            <Image
              src="/logo/pody logo dark.png"
              width={60}
              height={60}
              className="object-containt w-20"
              alt="Pody logo"
            />
          </nav>
          <div className="relative w-full">
            <div className="max-w-md mx-auto py-3">
              <h2 className="text-center text-3xl font-bold text-slate-50 leading-tight">
                Pody Testnet Yuzu eligibility
              </h2>
              <div className="mt-10 bg-slate-100 text-center rounded-xl px-6 md:px-12 py-6 shadow-md shadow-slate-100">
                <div className="relative">
                  <div className="flex justify-center">
                    <Image
                      src="/yuzu/capybara.png"
                      width={300}
                      height={300}
                      alt="Capy"
                      className="w-72"
                    />
                  </div>
                  <h3 className="text-lg mt-4 text-slate-900">Yuzu Earned</h3>
                  <div className="mt-2 font-bold flex justify-center">
                    {yuzuAllocationLoading ? (
                      <div className="animate-pulse">
                        <h4 className="text-4xl bg-gray-300 rounded-lg w-24 h-10"></h4>
                      </div>
                    ) : (
                      <h4 className="text-4xl">
                        {yuzuAllocation?.allocation || "0.000"}{" "}
                        <span className="text-[#F05A28]">Yuzu</span>
                      </h4>
                    )}
                  </div>

                  <div className="text-sm mt-3 flex justify-center">
                    {yuzuAllocationLoading ? (
                      <p className="animate-pulse bg-gray-300 rounded-lg w-64 h-4"></p>
                    ) : (
                      <>
                        {isEligible ? <p className="text-red-500 text-sm mt-2">You are eligible</p> : <p>You are not eligible</p>}
                      </>
                    )}
                  </div>
                  <div className="mt-6">
                    {isEligible ? (
                      <>
                        {yuzuAllocation?.claimed ? (
                          <ShareButton />
                        ) : (
                          <button
                            onClick={handleClaim}
                            disabled={
                              yuzuClaimLoading ||
                              yuzuAllocationLoading ||
                              yuzuAllocation?.claimed
                            }
                            className={`bg-slate-300 text-sm py-3 px-8 rounded-full cursor-pointer text-slate-800 ${
                              yuzuAllocation?.claimed &&
                              "bg-slate-900 text-white"
                            }`}
                          >
                            {yuzuClaimLoading ? (
                              // Display a loading spinner inside the button
                              <div className="flex items-center justify-center">
                                <svg
                                  className="animate-spin h-5 w-5 mr-2 text-[#F05A28]"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Claiming...
                              </div>
                            ) : yuzuAllocation?.claimed ? (
                              "Yuzu Claimed"
                            ) : (
                              "Claim Yuzu"
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <Link href="https://pody.network/login">
                        <button
                        className={`bg-slate-300 text-sm py-3 px-8 rounded-full cursor-pointer text-slate-800`}
                      >
                        Join Mainnet
                      </button>
                      </Link>
                    )}
                  </div>

                  {isSuccess && (
                    <p className="text-green-500 text-sm mt-2">
                      {data?.message}
                    </p>
                  )}
                  <Countdown />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto text-slate-100">
            <div>
              <ul className="flex items-center gap-3 mx-auto justify-center mt-10">
                <li>
                  <svg
                    id="fi_5968830"
                    enableBackground="new 0 0 1227 1227"
                    viewBox="0 0 1227 1227"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-8 text-slate-100"
                    fill="currentColor"
                  >
                    <path d="m654.53 592.55 276.12 394.95h-113.32l-225.32-322.28v-.02l-33.08-47.31-263.21-376.5h113.32l212.41 303.85z"></path>
                    <path d="m1094.42 0h-961.84c-73.22 0-132.58 59.36-132.58 132.58v961.84c0 73.22 59.36 132.58 132.58 132.58h961.84c73.22 0 132.58-59.36 132.58-132.58v-961.84c0-73.22-59.36-132.58-132.58-132.58zm-311.8 1040.52-228.01-331.84-285.47 331.84h-73.78l326.49-379.5-326.49-475.17h249.02l215.91 314.23 270.32-314.23h73.78l-311.33 361.9h-.02l338.6 492.77z"></path>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </li>
                <li>
                  <svg
                    id="fi_5968759"
                    enableBackground="new 0 0 512.6 512.6"
                    className="size-8 text-slate-100"
                    fill="currentColor"
                    viewBox="0 0 512.6 512.6"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="m227.6 270.06c0 20.56-14.73 37.29-33.25 37.29-18.23 0-33.25-16.73-33.25-37.29 0-20.55 14.73-37.29 33.25-37.29 18.66 0 33.54 16.89 33.25 37.29z"></path>
                      <path d="m350.53 270.06c0 20.56-14.58 37.29-33.25 37.29-18.23 0-33.25-16.73-33.25-37.29 0-20.55 14.73-37.29 33.25-37.29 18.67 0 33.54 16.89 33.25 37.29z"></path>
                      <path d="m457.21 0h-401.82c-30.59 0-55.39 24.8-55.39 55.39v401.82c0 30.59 24.8 55.39 55.39 55.39h401.82c30.59 0 55.39-24.8 55.39-55.39v-401.82c0-30.59-24.8-55.39-55.39-55.39zm-18.12 349.4c-.02.34-.2.64-.48.85-31.64 23.24-62.3 37.35-92.53 46.7-.48.15-1-.03-1.29-.44-6.99-9.72-13.33-19.97-18.89-30.73-.32-.63-.03-1.39.63-1.64 10.07-3.8 19.66-8.36 28.87-13.74.73-.43.78-1.47.1-1.97-1.95-1.45-3.89-2.98-5.74-4.51-.35-.28-.82-.34-1.21-.14-59.84 27.64-125.39 27.64-185.93 0-.4-.18-.87-.12-1.2.16-1.85 1.52-3.79 3.04-5.73 4.49-.67.5-.61 1.54.11 1.97 9.22 5.28 18.8 9.94 28.86 13.75.66.25.97 1 .65 1.63-5.44 10.78-11.79 21.03-18.9 30.74-.31.4-.82.58-1.3.43-30.09-9.35-60.74-23.46-92.38-46.7-.27-.21-.46-.53-.49-.87-6.44-69.03 6.7-138.92 54.66-210.58.12-.19.29-.34.5-.42 23.59-10.84 48.88-18.81 75.3-23.36.49-.07.97.15 1.21.57 3.27 5.79 7 13.2 9.53 19.26 27.85-4.25 56.14-4.25 84.58 0 2.52-5.93 6.12-13.47 9.38-19.26.24-.44.72-.66 1.21-.57 26.43 4.57 51.72 12.54 75.3 23.36.21.08.38.23.48.44 41.78 61.45 62.42 130.77 54.7 210.58z"></path>
                    </g>
                  </svg>
                </li>
                <li>
                  <svg
                    className="size-8 text-slate-100"
                    fill="currentColor"
                    viewBox="0 0 176 176"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_3536705"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="telegram">
                        <path d="m123.33 62.35-44.63 36.48-2.1 1.72a2.27 2.27 0 0 0 -.84 1.48l-.47 3.88-1.29 10.9a.5.5 0 0 1 -1 .09l-3.63-10.9-3.75-11.15a2.24 2.24 0 0 1 1.08-2.66l46.44-26.62 8.74-5c1.27-.74 2.57.86 1.45 1.78z"></path>
                        <path d="m152 0h-128a24 24 0 0 0 -24 24v128a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24v-128a24 24 0 0 0 -24-24zm-9.11 50.94-17.18 75.91c-.81 3.56-5.33 5.17-8.5 3l-25.94-17.6-13.21 12.49a4.54 4.54 0 0 1 -7.32-1.62l-4.77-14-4.77-14-25.57-7a3.32 3.32 0 0 1 -.29-6.41l98.78-35.59 1.82-.65c3.83-1.34 7.79 1.76 6.95 5.47z"></path>
                      </g>
                    </g>
                  </svg>
                </li>
              </ul>
            </div>
            <div className="text-xs leading-relaxed my-8">
              This page is intended to help the Pody Network community claim
              their Yuzu Points. These points were allocated based on
              participants' activities during the testnet phase. Please note
              that this is not an airdrop from the Pody Network. Community
              members can earn additional Yuzu Points by engaging with the Pody
              Network Mainnet. Stay active and explore more opportunities to
              increase your Yuzu Points!
            </div>
            <div className="flex flex-row flex-wrap items-center gap-3 my-5 text-sm justify-between">
              <div>Copyright © 2025 Pody Network. All rights reserved</div>
              <div>
                <ul className="flex flex-row items-center gap-3">
                  <li>Terms</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
