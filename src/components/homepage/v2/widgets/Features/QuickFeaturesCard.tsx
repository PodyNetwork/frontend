import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const QuickFeaturesCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const progressControls = useAnimation();
  const autoScrollRef = useRef<number | null>(null);

  const cards = [
    { id: 1, points: "3,000,000+", description: "Points Accumulated", img: "/abstract/avstractSquare.webp" },
    { id: 2, points: "300+", description: "Students & Teacher", img: "/abstract/abstractCubic.webp" },
    { id: 3, points: "2,000+", description: "Classroom Created", img: "/abstract/abstractcube.webp" },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    resetAutoScroll();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    resetAutoScroll();
  };

  const resetAutoScroll = useCallback(() => {
    if (autoScrollRef.current !== null) {
      clearInterval(autoScrollRef.current);
    }
    autoScrollRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    }, 6000);
  }, [cards.length]);

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (autoScrollRef.current !== null) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [resetAutoScroll]);

  useEffect(() => {
    const animateCard = async () => {
      await controls.start({ opacity: 0, x: -50, transition: { duration: 0.5 } });
      controls.start({ opacity: 1, x: 0, transition: { duration: 0.5 } });
    };

    const progressWidth = ((currentIndex + 1) / cards.length) * 100;
    progressControls.start({
      width: `${progressWidth}%`,
      transition: { duration: 1.5, ease: "easeInOut" },
    });

    animateCard();
  }, [currentIndex, controls, progressControls, cards.length]);

  return (
    <div className="md:ml-auto __ml_zero flex flex-col gap-2">
      <motion.div
        key={cards[currentIndex].id}
        animate={controls}
        className="min-w-52 max-w-48 __feature_card_x_wid p-5 rounded-3xl bg-gradient-to-br from-white via-slate-100 via-opacity-90 to-slate-200 __shadow_pody gap-y-4 flex flex-col"
      >
        <Image
          src={cards[currentIndex].img}
          className="w-32 h-32 mx-auto object-cover"
          width={483}
          height={516}
          alt={cards[currentIndex].description} 
          priority
          
          quality={75}
        />
        <div>
          <h5 className="font-medium text-base">{cards[currentIndex].points}</h5>
          <p className="text-sm">{cards[currentIndex].description}</p>
        </div>
      </motion.div>

      <div className="flex flex-row items-center gap-x-3 mt-2">
        <div className="flex flex-row gap-x-2">
          <button
            onClick={handlePrev}
            className="border border-slate-500 text-slate-500 rounded-full p-px flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="border border-slate-500 text-slate-500 rounded-full p-px flex justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="relative h-[0.2rem] w-full bg-gray-200">
            <motion.div
              animate={progressControls}
              className="absolute top-0 left-0 h-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickFeaturesCard;
