import useProfile from "@/hooks/user/useProfile";
import { useGiftAnimation } from "../../utils/GiftanimationContext";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

const GiftAnimationPage: React.FC = () => {
  const { animationData } = useGiftAnimation();
  const { profile } = useProfile();

  useEffect(() => {
    if (animationData) {
      console.log("Gift received:", animationData);
    }
  }, [animationData]);

  const animationVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  if (!animationData) return null;

  const isSender = animationData.senderId === profile?.username;
  const isReceiver = animationData.participantId === profile?.username;

  return (
    <motion.div
      className="fixed bg-pody-secondary/90 text-white p-2 text-sm rounded-full shadow-lg flex gap-x-2"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div>
        <Image
          src="/icon/pody.jpg"
          width={50}
          height={50}
          alt=""
          className="h-6 w-6 rounded-full object-cover"
        />
      </div>
      <div>
        {isSender ? (
          "You"
        ) : (
          <span className="capitalize">{animationData.senderId}</span>
        )}{" "}
        sent {animationData.amount} {animationData.giftId} to{" "}
        {isReceiver ? "You" : animationData.participantId}!
      </div>
    </motion.div>
  );
};

export default GiftAnimationPage;
