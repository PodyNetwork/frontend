import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";
import { useParticipants } from "@livekit/components-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { etherGift, gift } from "@/utils/gift";
import useBulkUserByUsername from "@/hooks/user/useGetBulkParticipantByusername";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseEther } from "viem";
import { useGiftAnimation } from "../../utils/GiftanimationContext";
import { useGiftMenu } from "../../utils/GiftMenuContext";

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


const gifts = [
  {
    id: "1",
    name: "PodyToken",
    icon: "/icon/Pody.jpg",
    price: 1,
    isAvailable: true,
  },
  {
    id: "2",
    name: "EDUCHAIN",
    icon: "/icon/educhain.png",
    price: 5,
    isHot: true,
    isAvailable: false,
  },
];


const GiftUI: React.FC = () => {
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(
    null
  );
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [visibleParticipants, setVisibleParticipants] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const { profile } = useProfile();
  const participantList = useParticipants();
  const excludedParticipantIds = [profile?.username];
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { userProfiles, isLoading: getParticipantLoading } =
    useBulkUserByUsername(selectedParticipant || "");

  const participants: Participant[] = participantList.map((participant) => ({
    id: participant.identity,
    name: participant.name ?? "Unknown",
  }));

  const { setAnimationData, send } = useGiftAnimation();

  const handleSendGift = async () => {
    const numericAmount = parseFloat(amount) || 0;

    if (!selectedParticipant || !selectedGift || numericAmount <= 0) {
      setErrorMessage("Please select a participant and enter a valid amount.");
      return;
    }
    setErrorMessage("");

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

    setIsLoading(true);

    try {
      const amountInWei = parseEther(amount.toString());

      if(selectedGift === "EDUCHAIN") {
       await etherGift(senderAddress as `0x${string}`,
        recipientAddress as `0x${string}`,
        amountInWei)
      } else { 
        await gift(
          senderAddress as `0x${string}`,
          recipientAddress as `0x${string}`,
          amountInWei
        );
      }

      const newGiftData = {
        participantId: selectedParticipant,
        senderId: profile?.username || "Pody user",
        giftId: selectedGift,
        amount: Number(amount),
      };

      send(new TextEncoder().encode(JSON.stringify(newGiftData)), {
        reliable: true,
      });

      setAnimationData(newGiftData);

      setAmount("0");
    } catch (error) {
      alert(
        (error as Error).message || "An error occurred while sending the gift."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    const validCryptoNumber = /^(\d*(\.\d{0,18})?|\.\d{1,18})?$/;
  
    if (rawValue === "") {
      setAmount("0");
      return;
    }
  
    if (rawValue !== "0" && !rawValue.startsWith("0.")) {
      rawValue = rawValue.replace(/^0+/, "");
    }
  
    if (rawValue === "") {
      rawValue = "0";
    }
  
    if (validCryptoNumber.test(rawValue)) {
      setAmount(rawValue);
    }
  };

  const loadMoreParticipants = () => {
    setVisibleParticipants((prev) => Math.min(prev + 5, participants.length));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
    setVisibleParticipants(5);
  };

  const handleChangeToken = (value: string) => {
    setSelectedGift(value);
  };

  const filteredParticipants = participants
    .filter(
      (participant) =>
        !excludedParticipantIds.includes(participant.id) &&
        participant.name.toLowerCase().includes(searchQuery)
    )
    .slice(0, visibleParticipants);

  const { isGiftOpen, closeGiftMenu } = useGiftMenu();

  const giftHeader = useRef<HTMLDivElement>(null);
  const giftCloseButton = useRef<HTMLDivElement>(null);

  const calculateHeights = useCallback(() => {
    if (giftHeader.current && giftCloseButton.current) {
      const giftHeaderHeight = giftHeader.current.offsetHeight;
      const giftCloseButtonHeight = giftCloseButton.current.offsetHeight;

      const totalHeaderInputHeight = giftHeaderHeight + giftCloseButtonHeight;
      const availableHeight = window.innerHeight - totalHeaderInputHeight;

      document.documentElement.style.setProperty(
        "--max-available-giftCard-height",
        `${availableHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    calculateHeights();

    const handleResize = () => {
      calculateHeights();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateHeights]);

  return (
    <>
      <div
        className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
        ref={giftHeader}
        onClick={closeGiftMenu}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <h2 className="font-semibold text-base md:text-sm text-slate-800 dark:text-white">
              Pody Gift
            </h2>
          </div>
          <ChevronIcon isOpen={isGiftOpen} />
        </div>
      </div>
      <div className="w-full overflow-hidden px-4 py-1" ref={giftCloseButton}>
        <div
          className="mx-auto mt-2 h-1.5 w-[100px] rounded-full bg-muted dark:bg-slate-400 cursor-pointer"
          onClick={closeGiftMenu}
        />
      </div>
      <div className="relative __gift_height_max overflow-y-auto px-4">
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search Participants..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-3 text-xs w-full px-3 py-2 h-10 rounded-md outline-none bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          />

          <div className="flex flex-nowrap max-w-sm relative overflow-x-auto gap-2">
            {filteredParticipants.length < 1 ? (
              <span className="text-xs text-slate-500">
                Opps No Participant to Gift, Invite Participant to classroom to
                start gifting
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

        <div className="mt-4">
          <h3 className="text-sm text-slate-500 dark:text-slate-400">
            Select Gift
          </h3>
          <Select onValueChange={handleChangeToken}>
            <SelectTrigger className="w-full mt-2 h-10 dark:border-slate-500 text-slate-600 dark:text-slate-300 text-sm">
              <SelectValue placeholder="Select a Gift" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-600 dark:border-slate-500">
              <SelectGroup>
                <SelectLabel className="text-slate-600 dark:text-slate-300">Token</SelectLabel>
                {gifts.map((data: GiftItem, index: number) => (
                  <SelectItem
                    key={index}
                    value={data.name}
                    className="dark:hover:bg-slate-500 dark:focus:bg-slate-500"
                  >
                    <button
                      type="button"
                      className="inline-flex w-full py-1 text-xs text-slate-500 dark:text-slate-300"
                    >
                      <div className="inline-flex items-center">
                        <Image
                          src={data.icon}
                          width={50}
                          height={50}
                          alt=""
                          className="h-4 w-4 rounded-full me-2 object-cover"
                        />
                        {data.name}
                      </div>
                    </button>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
            <label className="text-xs text-slate-600 dark:text-slate-300">bhv</label>
          </Select>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg flex flex-col items-center text-center my-5">
          <SendGiftHeader
            selectedParticipant={selectedParticipant}
            participants={participants}
          />

          <input
            type="text"
            value={amount.toString()}
            onChange={handleAmountChange}
            className="text-4xl font-semibold text-center bg-transparent border-none focus:outline-none mb-3 block w-full dark:text-slate-300"
            placeholder="10"
          />

          <button
            onClick={handleSendGift}
            disabled={
              isLoading || getParticipantLoading || !selectedGift || parseFloat(amount) <= 0
            }
            className="bg-pody-secondary text-white px-4 py-2.5 rounded-md font-medium flex items-center text-xs disabled:opacity-40 cursor-pointer"
          >
            {isLoading || getParticipantLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-slate-900 animate-spin dark:text-slate-900 fill-pody-primary me-1.5"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              "Send Gift"
            )}
          </button>
          {errorMessage && (
            <div className="text-sm text-red-400 mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </>
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
      <svg
        className="w-4 h-4 mr-1"
        fill="currentColor"
        viewBox="0 -960 960 960"
      >
        <path d="M480-492.31q-57.75 0-98.87-41.12Q340-574.56 340-632.31q0-57.75 41.13-98.87 41.12-41.13 98.87-41.13 57.75 0 98.87 41.13Q620-690.06 620-632.31q0 57.75-41.13 98.88-41.12 41.12-98.87 41.12ZM180-187.69v-88.93q0-29.38 15.96-54.42 15.96-25.04 42.66-38.5 59.3-29.07 119.65-43.61 60.35-14.54 121.73-14.54t121.73 14.54q60.35 14.54 119.65 43.61 26.7 13.46 42.66 38.5Q780-306 780-276.62v88.93H180Zm60-60h480v-28.93q0-12.15-7.04-22.5-7.04-10.34-19.11-16.88-51.7-25.46-105.42-38.58Q534.7-367.69 480-367.69q-54.7 0-108.43 13.11-53.72 13.12-105.42 38.58-12.07 6.54-19.11 16.88-7.04 10.35-7.04 22.5v28.93Zm240-304.62q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 384.62Z" />
      </svg>
      Send Gift to{" "}
      {selectedParticipant
        ? participants.find((p) => p.id === selectedParticipant)?.name
        : "Participant"}
    </span>
  </p>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
  </svg>
);

export default GiftUI;
