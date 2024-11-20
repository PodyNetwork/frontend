import { useState } from "react";
import Image from "next/image";
import discoverImage from "/public/abstract/discoverAbstract.png";
import user from "/public/avatar/user1.webp";
import user2 from "/public/avatar/user2.webp";
import user3 from "/public/avatar/user3.jpeg";
import { motion } from "framer-motion";
import QuickFeaturesCard from "./QuickFeaturesCard";

const PodyFeatures = () => {
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
        "You can increase your earnings per second by minting more NFTs directly from the dashboard.",
      ],
      img: "/abstract/abstractCircular.png",
    },
    {
      id: 3,
      title: "Earning Statistics",
      content: [
        "Track your points in real-time, redeem them, and seamlessly transfer them on-chain.",
      ],
      img: "/abstract/absrtactRounded.png",
    },
  ];
  return (
    <section className="w-full relative">
      <div className="flex flex-col py-24 w-full text-slate-900 max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid __discover_lyout gap-6 justify-between">
          <div className="flex flex-col gap-y-4">
            <div>
              <h2 className="text-5xl xs:text-7xl md:text-8xl lg:text-8xl font-extrabold">Discover</h2>
              <h3 className="text-xl mt-2">Pody&apos;s Unique Features</h3>
            </div>
            <div className="mt-auto relative">
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex items-center -space-x-5 __img_participant_dsc">
                  <Image
                    src={user}
                    width={483}
                    height={516}
                    className="z-50"
                    alt="pody users avatar"
                  />
                  <Image
                    src={user2}
                    width={483}
                    height={516}
                    className="z-40"
                    alt="pody users avatar"
                  />
                  <Image
                    src={user3}
                    width={483}
                    height={516}
                    alt="pody users avatar"
                  />
                </div>
                <div className="w-28">
                  <p className="text-xs">1M+ satisified Teacher & Learners</p>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            className="w-full __discover_img"
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }} 
            whileHover={{ scale: 1.1 }}
          >
            <Image
              src={discoverImage}
              className="w-full object-contain" 
              width={183}
              height={516}
              alt="discover"
            />
          </motion.div>
          <div className="flex flex-col __flex_row_fts gap-y-4 __span-2">
            <QuickFeaturesCard />
            <div className="relative mt-auto pt-12">
              <h2 className="text-4xl font-extrabold">
                Advanced Host Management
              </h2>
              <h3 className="text-base mt-2">
                You can remove students from the call or grant them speaking
                privileges.
              </h3>
            </div>
          </div>
        </div>
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
              <span className="text-2xl font-medium text-slate-800 z-50 relative">{`0${
                index + 1
              }`}</span>

              <div className="mt-4 flex flex-col gap-3 z-50 relative">
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
                  className="self-start bg-pody-secondary text-white text-sm px-5 py-2 rounded-full border-none cursor-pointer transition-colors duration-200 hover:bg-pody-secondary/80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Start Earning
                </motion.button>
              )}

              {activeCard === index && (
                <motion.div
                  className="absolute bottom-0 right-0 w-[35%]"
                  initial={{ opacity: 0, scale: 0.8 }} // Starts smaller and transparent
                  animate={{ opacity: 1, scale: 1.1 }} // Scales up slightly
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.2 }} // Adds a hover effect to scale up further
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
      </div>
    </section>
  );
};

export default PodyFeatures;
