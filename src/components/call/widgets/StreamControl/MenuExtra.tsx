import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Copy,
  Gift,
  Hand,
  Maximize,
  MessageSquareText,
  Minimize,
  Moon,
  PhoneOff,
  ScreenShare,
  Smile,
  Sun,
  UserPlus,
  Users,
} from "lucide-react";
import { useFullscreen } from "../../utils/FullscreenContext";
import { useParticipantBar } from "../../utils/ParticipantBarContext";
import { useGiftMenu } from "../../utils/GiftMenuContext";
import { useState, useEffect } from "react";
import { shareOnMobile } from "react-mobile-share";
import useGetCallByURL from "@/hooks/call/useGetCallByURL";
import useProfile from "@/hooks/user/useProfile";
import { useParams } from "next/navigation";
import { useUnreadMessageContext } from "../../utils/unreadMessageCount";
import { useChatContext } from "../../utils/ChatContext";
import { useDialog } from "../../utils/DialogContext";
import { useHandRaise } from "../../utils/HandRaiseContext";
import { isMobile } from "react-device-detect";
import { AnimatePresence, motion } from "framer-motion";

type OverflowItem =
  | "chat"
  | "ShareScreen"
  | "reaction"
  | "raisehand"
  | "disconnect";

interface MenuExtraProps {
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overflowItem: any[];
}

const MenuExtra: React.FC<MenuExtraProps> = ({ username, overflowItem }) => {
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();
  const { isParticipantBarVisible, hideParticipantBar, showParticipantBar } =
    useParticipantBar();
  const { isGiftOpen, openGiftMenu, closeGiftMenu } = useGiftMenu();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const { url } = useParams();
  const { call } = useGetCallByURL(url as string);
  const { profile } = useProfile();

  // const { isPipActive, activatePip, deactivatePip } = usePipContext();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const { unreadMessageCount } = useUnreadMessageContext();
  const { isChatOpen, openChat, closeChat, toggleChat } = useChatContext();

  const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "g") {
          event.preventDefault();
          if (isGiftOpen) {
            closeGiftMenu();
          } else {
            openGiftMenu();
          }
        } else if (event.key === "f") {
          event.preventDefault();
          if (isFullscreen) {
            exitFullscreen();
          } else {
            enterFullscreen();
          }
        } else if (event.key === "c") {
          event.preventDefault();
          if (isChatOpen) {
            closeChat();
          } else {
            openChat();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    isGiftOpen,
    openGiftMenu,
    closeGiftMenu,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    isChatOpen,
    openChat,
    closeChat,
  ]);

  const { openDialog } = useDialog();
  const { handleRaiseHand, isCooldown } = useHandRaise();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const referralLink = `https://pody.network/classroom/${
      call?.url || "unknown"
    }`;
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => console.error("Failed to copy text:", error));
  };

  const renderOverflowItem = (item: OverflowItem, index: number) => {
    switch (item) {
      case "chat":
        return (
          <DropdownMenuItem
            key={`${overflowItem}-${index}`}
            onClick={toggleChat}
          >
            <MessageSquareText />
            <span>Chat</span>
            {unreadMessageCount > 0 && (
              <span className="bg-red-500 text-slate-100 text-xs rounded-sm px-1 py-px">
                {unreadMessageCount}
              </span>
            )}
            {!isMobile && (
              <DropdownMenuShortcut>
                {isMac ? "⌘" : "ctrl"}+C
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        );
      case "ShareScreen":
        return (
          !isMobile && (
            <DropdownMenuItem key={`${overflowItem}-${index}`}>
              <ScreenShare />
              <span>Share Screen</span>
            </DropdownMenuItem>
          )
        );
      case "raisehand":
        return (
          <DropdownMenuItem
            className={`${
              isCooldown ? "opacity-50 cursor-not-allowed text-red-500" : ""
            }`}
            onClick={handleRaiseHand}
            key={`${overflowItem}-${index}`}
          >
            <Hand />
            <span>Raise Hand</span>
          </DropdownMenuItem>
        );
      case "disconnect":
        return (
          <DropdownMenuItem
            key={`${overflowItem}-endCall-${index}`}
            onClick={() => openDialog("leaveControl")}
          >
            <PhoneOff />
            <span>Leave Classroom</span>
          </DropdownMenuItem>
        );
      case "reaction":
        return (
          <DropdownMenuItem key={`${overflowItem}-${index}`}>
            <Smile />
            <span>Reaction</span>
          </DropdownMenuItem>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-white dark:bg-[#202124] flex-shrink-0 __controls_width_noicon rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="__controls_icon"
              viewBox="0 -960 960 960"
              style={{ msFilter: "" }}
              fill="currentColor"
            >
              <path d="M249.23-420q-24.75 0-42.37-17.63-17.63-17.62-17.63-42.37 0-24.75 17.63-42.37Q224.48-540 249.23-540q24.75 0 42.38 17.63 17.62 17.62 17.62 42.37 0 24.75-17.62 42.37Q273.98-420 249.23-420ZM480-420q-24.75 0-42.37-17.63Q420-455.25 420-480q0-24.75 17.63-42.37Q455.25-540 480-540q24.75 0 42.37 17.63Q540-504.75 540-480q0 24.75-17.63 42.37Q504.75-420 480-420Zm230.77 0q-24.75 0-42.38-17.63-17.62-17.62-17.62-42.37 0-24.75 17.62-42.37Q686.02-540 710.77-540q24.75 0 42.37 17.63 17.63 17.62 17.63 42.37 0 24.75-17.63 42.37Q735.52-420 710.77-420Z" />
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-none shadow-none __shadow_pody mb-1.5 text-slate-500">
          <DropdownMenuLabel>{username}</DropdownMenuLabel>
          {overflowItem.length > 0 && <DropdownMenuSeparator />}
          <DropdownMenuGroup>
            {overflowItem.map(renderOverflowItem)}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={toggleDarkMode}>
              {isDarkMode ? <Sun /> : <Moon />}
              <span>{isDarkMode ? "Day Class" : "Night Class"}</span>
            </DropdownMenuItem>
            {isMobile ? (
              <DropdownMenuItem
                onClick={() =>
                  shareOnMobile({
                    text: `Hey, ${
                      profile?.username || "someone"
                    } has invited you to their classroom on Pody`,
                    url: call?.url || "",
                    title: "Pody Classroom",
                  })
                }
              >
                <UserPlus />
                <span>Share Classroom</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleCopy}>
                <Copy />
                <span>Copy Classroom Link</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={isGiftOpen ? closeGiftMenu : openGiftMenu}
            >
              <Gift />
              <span>Gift Participant</span>
              {!isMobile && (
                <DropdownMenuShortcut>
                  {isMac ? "⌘" : "ctrl"}+G
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={activatePip}>
            <Gift />
            <span>{isPipActive ? "Exit Picture-in-Picture" : "Enter Picture-in-Picture"}</span>
          </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={isFullscreen ? exitFullscreen : enterFullscreen}
              className="hidden lg:flex"
            >
              {isFullscreen ? <Minimize /> : <Maximize />}
              <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
              {!isMobile && (
                <DropdownMenuShortcut>
                  {isMac ? "⌘" : "ctrl"}+F
                </DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
            {isFullscreen && (
              <DropdownMenuItem
                onClick={
                  isParticipantBarVisible
                    ? hideParticipantBar
                    : showParticipantBar
                }
              >
                <Users />
                <span>
                  {isParticipantBarVisible
                    ? "Hide Participants"
                    : "Show Participants"}
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {copied && (
        <div className="fixed bottom-24 md:bottom-16 left-1/2 transform -translate-x-1/2 space-y-px w-max max-w-[75%]">
          <AnimatePresence>
            <motion.div
              className="bg-slate-400 text-white p-1.5 text-center text-xs rounded-full shadow-xl block max-w-sm px-3 py-2"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Classroom Link Copied
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default MenuExtra;
