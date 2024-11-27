import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import Image from "next/image";
import useLoading from "@/hooks/useLoading";
import { useRouter } from "next/navigation";

const FeaturesCard = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    {
      id: 0,
      title: "Earn Rewards",
      content: [
        "The longer you participate in a classroom, the more the points you earn.",
      ],
      img: "/abstract/abstractAngle.png",
    },
    {
      id: 1,
      title: "Schedule Call",
      content: [
        "Not ready to start the class right away? You can schedule it for later.",
      ],
      img: "/abstract/abstractCircle.png",
    },
    {
      id: 2,
      title: "Reward Boost",
      content: [
        "Increase your earnings per second by minting more NFTs from the dashboard.",
      ],
      img: "/abstract/abstractCircular.png",
    },
    {
      id: 3,
      title: "Gifting",
      content: [
        "Send PodyToken and EDU gifts directly to participants' wallets during live classrooms.",
      ],
      img: "/abstract/absrtactRounded.png",
    },
  ];


  const navigate = useRouter();
  const { startLoading, loading } = useLoading();

  const navigateToDashboard = useCallback(() => {
    startLoading();
    navigate.push("/dashboard");
  }, [navigate, startLoading]);

  return (
    <div className="flex flex-col md:flex-row gap-y-1 overflow-x-auto mt-28">
      {cards.map((card, index) => (
        <div
          key={index}
          onClick={() => setActiveCard(index)}
          onMouseEnter={() => setActiveCard(index)}
          className={`flex flex-col relative overflow-hidden justify-between min-h-[300px] p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
            activeCard === index
              ? "md:flex-[1.8] bg-gradient-to-br from-white via-slate-100 via-opacity-90 to-slate-100"
              : "md:flex-[0.75] bg-gradient-to-b from-[#dbd1fb] via-[#dbd1fb] to-[#E9EADB]"
          }`}
        >
          <span className="text-2xl font-medium text-slate-800 z-40 relative">{`0${
            index + 1
          }`}</span>

          <div className="mt-4 flex flex-col gap-3 z-40 relative">
            <h3 className="text-xl font-medium">{card.title}</h3>

            {card.content && activeCard === index && (
              <motion.ul
                className="list-none p-0 m-0 text-sm text-slate-600 max-w-72"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {card.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-none p-0 m-0 text-sm text-slate-600 mb-[6px]"
                  >
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>

          {/* Learn More Button */}
          {activeCard === index && (
            <motion.button
              onClick={navigateToDashboard}
              className="self-start bg-pody-secondary text-white text-sm px-5 py-2 rounded-full border-none cursor-pointer transition-colors duration-200 hover:bg-pody-secondary/80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              disabled={loading}
            >
              {loading ? "...loading" : "Start Earning"}
            </motion.button>
          )}

          {activeCard === index && (
            <motion.div
              className="absolute bottom-0 right-0 w-[35%]"
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.2 }} 
            >
              <Image
                src={card.img}
                className="w-full object-cover mx-auto"
                width={483}
                height={516}
                alt="discover"
              />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeaturesCard;
