import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AudioLines,
  ChartArea,
  CircleDollarSign,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Maximize,
  MessageSquare,
  Plus,
  PlusCircle,
  Presentation,
  Settings,
  Share,
  User,
  UserPlus,
  Users,
} from "lucide-react";

const MenuExtra = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-white h-10 w-10 rounded-full flex justify-center items-center text-slate-400 cursor-pointer">
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
        <DropdownMenuLabel>0x3ax</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPlus />
            <span>Share Classroom</span>
            <DropdownMenuShortcut>⌘+S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Maximize />
            <span>Fullscreen</span>
            <DropdownMenuShortcut>⌘+F</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <AudioLines />
            <span>Noise Suppression</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Presentation />
            <span>WhiteBoard</span>
            <DropdownMenuShortcut>⌘+B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <CircleDollarSign />
          <span>Earning Stats</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <ChartArea />
          <span>Participant Stats</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuExtra;
