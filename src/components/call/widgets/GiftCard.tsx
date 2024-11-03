import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";
import { useDataChannel, useParticipants } from "@livekit/components-react";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { gift } from "@/utils/gift";
import { useGiftMenu } from "../utils/GiftMenuContext";
import useBulkUserByUsername from "@/hooks/user/useGetBulkParticipantByusername";

type Participant = {
  id: string;
  name: string;
};

type GiftItem = {
  id: string;
  name: string;
  icon: string;
  price: number;
  isHot?: boolean;
};

type GiftUIProps = {
  gifts: GiftItem[];
  onGiftSend: (gift: {
    participantId: string;
    giftId: string;
    amount: number;
  }) => void;
};

const GiftUI: React.FC<GiftUIProps> = ({ gifts, onGiftSend }) => {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );
  const [amount, setAmount] = useState<number>(0);
  const [visibleParticipants, setVisibleParticipants] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [animationData, setAnimationData] = useState<{
    giftId: string;
    amount: number;
  } | null>(null);

  const { profile } = useProfile();
  const participantList = useParticipants();
  const excludedParticipantIds = [profile?.username];

  const { userProfiles, isLoading: getParticipantLoading } =
    useBulkUserByUsername(selectedParticipant || "");

  const participants: Participant[] = participantList.map((participant) => ({
    id: participant.identity,
    name: participant.name ?? "Unknown",
  }));

  const { send } = useDataChannel("gift", (msg) => {
    const giftData = JSON.parse(new TextDecoder().decode(msg.payload));
    triggerGiftAnimation(giftData);
  });

  const handleSendGift = async () => {
    if (!selectedParticipant || amount <= 0) {
      return alert("Please select a participant and enter a valid amount.");
    }

    const participantData = userProfiles?.find(
      (p) => p.username === selectedParticipant
    );
    if (getParticipantLoading)
      return console.log("Loading participant data, please wait...");

    if (!participantData) {
      return alert("Participant not found. Please try again.");
    }

    const senderAddress = profile?.walletAddress;
    const recipientAddress = participantData.walletAddress;

    try {
      const amountInWei = BigInt(amount * 10 ** 18);
      await gift(
        senderAddress as `0x${string}`,
        recipientAddress as `0x${string}`,
        amountInWei
      );

      const giftData = {
        participantId: selectedParticipant,
        giftId: "token",
        amount: Number(amountInWei),
      };
      send(new TextEncoder().encode(JSON.stringify(giftData)), {});
      onGiftSend(giftData);
      setAmount(0);
    } catch (error) {
      alert(
        (error as Error).message || "An error occurred while sending the gift."
      );
    }
  };

  const triggerGiftAnimation = (giftData: {
    participantId: string;
    giftId: string;
    amount: number;
  }) => {
    setAnimationData(giftData);
    setTimeout(() => setAnimationData(null), 2000);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
      const validCryptoNumber = /^(\d*(\.\d{0,18})?|\.\d{1,18})$/;
      if (validCryptoNumber.test(rawValue) || rawValue === "") {
      setAmount(rawValue ? parseFloat(rawValue) : 0);
    }
  };

  const loadMoreParticipants = () => {
    setVisibleParticipants((prev) => Math.min(prev + 5, participants.length));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setVisibleParticipants(5);
  };

  const filteredParticipants = participants
    .filter(
      (participant) =>
        !excludedParticipantIds.includes(participant.id) &&
        participant.name.toLowerCase().includes(searchQuery)
    )
    .slice(0, visibleParticipants);

  const { closeGiftMenu } = useGiftMenu();

  return (
    <div className="w-full">
      <div
        className="mx-auto mt-2 h-1.5 w-[100px] rounded-full bg-muted dark:bg-slate-400 cursor-pointer"
        onClick={closeGiftMenu}
      />

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search participants..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-3 text-xs w-full px-3 py-2 rounded-lg outline-none bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
        />

        <div className="flex flex-nowrap max-w-sm relative overflow-x-auto gap-2">
          {filteredParticipants.length < 1 ? (
            <span className="text-sm text-slate-500">
              No participants to gift
            </span>
          ) : (
            filteredParticipants.map((participant) => (
              <ParticipantItem
                key={participant.id}
                participant={participant}
                selectedParticipant={selectedParticipant}
                setSelectedParticipant={setSelectedParticipant}
              />
            ))
          )}
          {visibleParticipants < participants.length && (
            <LoadMoreButton onClick={loadMoreParticipants} />
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg flex flex-col items-center text-center my-5">
        <SendGiftHeader
          selectedParticipant={selectedParticipant}
          participants={participants}
        />

        <input
          type="text"
          value={amount.toString()}
          onChange={handleAmountChange}
          className="text-4xl font-semibold text-center bg-transparent border-none focus:outline-none mb-4 block w-full dark:text-slate-300"
          placeholder="0.00" // Optional: hint for the expected input format
        />

        <button
          onClick={handleSendGift}
          disabled={getParticipantLoading}
          className="bg-pody-secondary text-white px-4 py-1.5 rounded-md font-medium flex items-center text-xs"
        >
          {getParticipantLoading ? "Loading..." : "Send Gift"}
        </button>
      </div>

      {animationData && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: "rgba(255, 255, 0, 0.8)",
            borderRadius: "10px",
            fontSize: "1.5rem",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          🎁 You received a {animationData.amount} x {animationData.giftId}!
        </motion.div>
      )}
    </div>
  );
};

const ParticipantItem: React.FC<{
  participant: Participant;
  selectedParticipant: string | null;
  setSelectedParticipant: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ participant, selectedParticipant, setSelectedParticipant }) => (
  <div className="max-w-10 flex flex-col items-center">
    <div
      onClick={() => setSelectedParticipant(participant.id)}
      className={`min-w-10 max-w-10 h-10 rounded-full border ${
        selectedParticipant === participant.id
          ? "border-blue-500"
          : "border-slate-200"
      } relative cursor-pointer`}
    >
      <AvatarParticipant name={participant.name || "Unknown"} />
      {selectedParticipant === participant.id && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white z-50" />
      )}
    </div>
    <div className="text-xs truncate max-w-10 text-slate-700 dark:text-slate-300 mt-1">
      {participant.name}
    </div>
  </div>
);

const LoadMoreButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="min-w-10 max-w-10 h-10 bg-slate-200 text-slate-600 py-2 rounded-full font-medium"
  >
    -
  </button>
);

const SendGiftHeader: React.FC<{
  selectedParticipant: string | null;
  participants: Participant[];
}> = ({ selectedParticipant, participants }) => (
  <p className="text-slate-500 flex items-center space-x-1 mb-2">
    <span className="inline-flex items-center justify-center text-sm font-medium dark:text-slate-300">
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM2 15a6 6 0 0112 0H2zM14 8a3 3 0 106 0 3 3 0 00-6 0zM20 15a6 6 0 00-8 5h8a6 6 0 000-5z" />
      </svg>
      Send Gift to{" "}
      {selectedParticipant
        ? participants.find((p) => p.id === selectedParticipant)?.name
        : "Participant"}
    </span>
  </p>
);

export default GiftUI;
