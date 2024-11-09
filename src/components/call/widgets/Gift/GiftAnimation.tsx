import useProfile from "@/hooks/user/useProfile";
import { useGiftAnimation } from "../../utils/GiftanimationContext";
import { motion } from "framer-motion";
import { useContext } from "react";


const GiftAnimationPage: React.FC = () => {
    const { animationData } = useGiftAnimation();
    const { profile } = useProfile();
  
    const animationVariants = {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
    };
  
    if (!animationData) return null;
  
    // Show the animation for the sender and recipient
    const isSender = animationData.participantId === profile?.username;
  
    return (
      <motion.div
        className="fixed bg-blue-500 text-white p-4 rounded-lg shadow-lg"
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        🎁{" "}
        {isSender ? "You sent" : "You received"}{" "}
        {animationData.amount} x {animationData.giftId}!
      </motion.div>
    );
  };
  

export default GiftAnimationPage;
