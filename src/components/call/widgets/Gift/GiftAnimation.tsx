import React, { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import useProfile from "@/hooks/user/useProfile";
import { useGiftAnimation } from "../../utils/GiftanimationContext";
import Image from "next/image";

type ConfettiItem = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
};

const GiftAnimationPage: React.FC = () => {
  const { animationData } = useGiftAnimation();
  const { profile } = useProfile();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [giftQueue, setGiftQueue] = useState<any[]>([]); // Queue to hold gifts

  const giftRef = useRef<HTMLDivElement | null>(null);
  const confettiTimeoutRef = useRef<any>(null);

  const generateConfetti = useCallback(() => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      const randomX = gsap.utils.random(-200, 200);
      const randomY = gsap.utils.random(-150, 150);
      const randomRotation = gsap.utils.random(0, 360);
      const randomScale = gsap.utils.random(0.5, 1.5);
      const duration = gsap.utils.random(2, 3);

      newConfetti.push({
        id: crypto.randomUUID(),
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        scale: randomScale,
        duration,
      });
    }
    setConfetti(newConfetti);
  }, []);

  const processGiftQueue = useCallback(() => {
    if (giftQueue.length > 0 && animationData) {
      const currentGift = giftQueue[0];
      const tl = gsap.timeline({
        onComplete: () => {
          setGiftQueue((prevQueue) => prevQueue.slice(1));
        },
      });

      tl.fromTo(
        giftRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          onComplete: () => {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
          },
        }
      )
      .to(giftRef.current, {
        opacity: 0,
        y: -150, 
        duration: 1.5,
        ease: "power1.in",
      })
      .to(giftRef.current, {
        opacity: 0,
        y: -200, 
        duration: 2,
        ease: "power1.out",
        delay: 4,
      });

      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearTimeout(confettiTimeoutRef.current);
        tl.kill(); 
      };
    }
  }, [giftQueue, animationData]);

  useEffect(() => {
    if (animationData) {
      setGiftQueue((prevQueue) => [...prevQueue, animationData]); 
      setShowAnimation(true); 
    }
  }, [animationData]);

  useEffect(() => {
    if (showConfetti) {
      generateConfetti();
    }
  }, [showConfetti, generateConfetti]);

  useEffect(() => {
    processGiftQueue();
  }, [giftQueue, processGiftQueue]); 

  if (!showAnimation || giftQueue.length === 0) return null;

  const isSender = animationData?.senderId === profile?.username;
  const isReceiver = animationData?.participantId === profile?.username;

  return (
    <>
      {showAnimation && animationData && (
        <div
          ref={giftRef}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-b bg-slate-400 text-white p-1.5 text-xs rounded-full shadow-xl flex items-center gap-x-2 z-50"
        >
          <Image
            src="/icon/pody.jpg"
            width={50}
            height={50}
            alt="Gift"
            className="h-6 w-6 rounded-full object-cover"
          />
          <div>
            {isSender ? (
              "You"
            ) : (
              <span className="capitalize">{animationData?.senderId}</span>
            )}{" "}
            sent {animationData?.amount} {animationData?.giftId} to{" "}
            {isReceiver ? "You" : animationData?.participantId}!
          </div>
        </div>
      )}

      {showConfetti && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-40">
          <AnimatePresence>
            {confetti.map(({ id, x, y, rotation, scale, duration }) => (
              <motion.div
                key={id}
                initial={{
                  opacity: 1,
                  x: x,
                  y: y,
                  rotate: rotation,
                  scale: scale,
                }}
                animate={{
                  opacity: 1,
                  x: x + gsap.utils.random(-400, 400),
                  y: y - gsap.utils.random(600, 1000),
                  rotate: rotation + 1080,
                  scale: scale,
                  filter: "brightness(1.5)",
                }}
                exit={{
                  opacity: 0,
                  y: "-100vh", 
                  scale: 0.5,
                  transition: {
                    duration: 2,
                    ease: "easeOut",
                  },
                }}
                style={{
                  position: "absolute",
                  left: `50%`,
                  top: `50%`,
                }}
                transition={{
                  duration: duration,
                  ease: "easeOut",
                }}
              >
                <span className="text-xl">🎁</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default GiftAnimationPage;
