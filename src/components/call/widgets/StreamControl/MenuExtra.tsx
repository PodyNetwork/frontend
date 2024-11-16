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
  AudioLines, Gift,
  Maximize,
  MessageSquareText,
  Minimize,
  Moon,
  PhoneOff, ScreenShare, Smile,
  Sun,
  UserPlus,
  Users
} from "lucide-react";
import { useFullscreen } from "../../utils/FullscreenContext";
import { useParticipantBar } from "../../utils/ParticipantBarContext";
import { useGiftMenu } from "../../utils/GiftMenuContext";
import { useState, useEffect } from "react";
import { useKrispNoiseFilter } from "@livekit/components-react/krisp";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface MenuExtraProps {
  username: string;
  overflowItem: any[];
}

const MenuExtra: React.FC<MenuExtraProps> = ({ username, overflowItem }) => {
  const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen();
  const { isParticipantBarVisible, hideParticipantBar, showParticipantBar } =
    useParticipantBar();
  const { isGiftOpen, openGiftMenu, closeGiftMenu } = useGiftMenu();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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

  const krisp = useKrispNoiseFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-white dark:bg-[#202124] flex-shrink-0 h-10 w-10 rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
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
        {overflowItem.length > 0 && <DropdownMenuSeparator /> }
        <DropdownMenuGroup>
          {overflowItem.length > 0 &&
            overflowItem.map((overflowItem, index) => {
              switch (overflowItem) {
                case "chat":
                  return (
                    <DropdownMenuItem key={index}>
                      <MessageSquareText />
                      <span>Chat</span>
                    </DropdownMenuItem>
                  );
                case "ShareScreen":
                  return (
                    <DropdownMenuItem key={index}>
                      <ScreenShare />
                      <span>Share Screen</span>
                    </DropdownMenuItem>
                  );
                case "endCall":
                  return (
                    <DropdownMenuItem key={index}>
                      <PhoneOff />
                      <span>End Call</span>
                    </DropdownMenuItem>
                  );
                case "LeaveCall":
                  return (
                    <DropdownMenuItem key={index}>
                      <span>Leave Call</span>
                    </DropdownMenuItem>
                  );
                case "reaction":
                  return (
                    <DropdownMenuItem key={index}>
                      <Smile />
                      <span>Reaction</span>
                    </DropdownMenuItem>
                  );
                default:
                  return null;
              }
            })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={toggleDarkMode}>
            {isDarkMode ? <Sun /> : <Moon />}
            <span>{isDarkMode ? "Day Class" : "Night Class"}</span>
            <DropdownMenuShortcut>⌘+S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus />
            <span>Share Classroom</span>
            <DropdownMenuShortcut>⌘+S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={isGiftOpen ? closeGiftMenu : openGiftMenu}>
            <Gift />
            <span>Gift Participant</span>
            <DropdownMenuShortcut>⌘+G</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
          >
            {isFullscreen ? <Minimize /> : <Maximize />}
            <span>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
            <DropdownMenuShortcut>⌘+F</DropdownMenuShortcut>
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
              <DropdownMenuShortcut>⌘+P</DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuExtra;

