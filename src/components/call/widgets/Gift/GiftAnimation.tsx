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

  const giftRef = useRef<HTMLDivElement | null>(null);
  const confettiTimeoutRef = useRef<any>(null);

  const generateConfetti = useCallback(() => {
    const newConfetti = [];
    for (let i = 0; i < 30; i++) {
      const randomX = gsap.utils.random(-250, 250);
      const randomY = gsap.utils.random(-150, 150);
      const randomRotation = gsap.utils.random(0, 360);
      const randomScale = gsap.utils.random(0.6, 1.2);
      const duration = gsap.utils.random(2.5, 4);

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

  useEffect(() => {
    if (animationData) {
      setShowAnimation(true);

      const tl = gsap.timeline();

      tl.fromTo(
        giftRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          opacity: 1,
          scale: 1.15,
          y: -50, 
          duration: 2,
          ease: "power3.out",
          onComplete: () => {
            setShowConfetti(true);
            // Hide confetti after 3 seconds
            setTimeout(() => setShowConfetti(false), 3000);
          },
        }
      );

      tl.to(giftRef.current, {
        opacity: 0, 
        y: -150, 
        duration: 2, 
        ease: "power1.in",  
        delay: 3,  
        onComplete: () => {
          setShowAnimation(false);
        },
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
  }, [animationData]);

  useEffect(() => {
    if (showConfetti) {
      generateConfetti();
    }
  }, [showConfetti, generateConfetti]);

  if (!animationData || !showAnimation) return null;

  const isSender = animationData.senderId === profile?.username;
  const isReceiver = animationData.participantId === profile?.username;

  return (
    <>
      {showAnimation && (
        <div
          ref={giftRef}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-b bg-slate-400 text-white p-2 text-xs rounded-full shadow-xl flex items-center gap-x-2 z-50"
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
              <span className="capitalize">{animationData.senderId}</span>
            )}{" "}
            sent {animationData.amount} {animationData.giftId} to{" "}
            {isReceiver ? "You" : animationData.participantId}!
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
                  x: x + gsap.utils.random(-350, 350),
                  y: y - gsap.utils.random(400, 700),
                  rotate: rotation + 720,
                  scale: scale,
                }}
                exit={{
                  opacity: 0, // Fade out as it exits
                  y: "-50vh", // Move it up at a moderate pace (adjust this as needed)
                  scale: 0.6,
                  transition: {
                    duration: 2, // Slow down the duration of the fade and movement
                    ease: "easeOut", // Smooth easing for the movement
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
