import React, { useState, useRef, useEffect } from "react";
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
          rotation: 45, // Add a rotation effect for dynamic movement
        },
        {
          opacity: 1,
          scale: 1.15, // A more subtle scaling for elegance
          y: -250,
          rotation: 0, // Reset to neutral rotation
          duration: 2,
          ease: "power3.out", // Smooth and organic easing
          onComplete: () => {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after a duration
          },
        }
      );

      tl.to(giftRef.current, {
        opacity: 0,
        scale: 0.85,
        y: -300, // Moving upwards slightly more for fade-out
        duration: 1.8,
        ease: "power1.in", // Softer ease for smoother end
        delay: 2,
        onComplete: () => {
          setShowAnimation(false);
        },
      });

      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 8000);

      return () => {
        clearTimeout(timer);
        tl.kill();
      };
    }
  }, [animationData]);

  const generateConfetti = () => {
    const newConfetti = [];
    for (let i = 0; i < 50; i++) {
      // More confetti for a grand effect
      const randomX = gsap.utils.random(-250, 250);
      const randomY = gsap.utils.random(-150, 150);
      const randomRotation = gsap.utils.random(0, 360);
      const randomScale = gsap.utils.random(0.6, 1.2);
      const duration = gsap.utils.random(2.5, 4); // Confetti fall duration

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
  };

  useEffect(() => {
    if (showConfetti) {
      generateConfetti();
    }
  }, [showConfetti]);

  if (!animationData || !showAnimation) return null;

  const isSender = animationData.senderId === profile?.username;
  const isReceiver = animationData.participantId === profile?.username;

  return (
    <>
      {showAnimation && (
        <div
          ref={giftRef}
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-2 px-4 text-sm rounded-full shadow-xl flex items-center gap-x-2 z-50"
        >
          <Image
            src="/icon/pody.jpg"
            width={50}
            height={50}
            alt="Gift"
            className="h-8 w-8 rounded-full object-cover"
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

      {/* Confetti Burst */}
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
                  y: y - gsap.utils.random(400, 700), // More randomized upward motion
                  rotate: rotation + 720,
                  scale: scale,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6, // Smaller scale for smoother fade-out
                  transition: { duration: 1.5, ease: "easeOut" },
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
