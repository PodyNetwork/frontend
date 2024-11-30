import { useChatContext } from "@/components/call/utils/ChatContext";
import { useUnreadMessageContext } from "@/components/call/utils/unreadMessageCount";
import React from "react";

const ChatControlMenu = () => {
  const { unreadMessageCount } = useUnreadMessageContext();
  const { toggleChat } = useChatContext();
  return (
    <div className="bg-white dark:bg-[#202124] p-1 rounded-full flex-shrink-0 flex justify-center items-center gap-x-1 text-slate-400 cursor-pointer">
      <div
        className={`__controls_width_icon flex items-center justify-center rounded-full ${
          unreadMessageCount > 0 ? "bg-slate-100" : "bg-transparent"
        }`}
      >
        <label className="sr-only">chat</label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="__controls_icon"
          viewBox="0 -960 960 960"
          style={{ msFilter: "" }}
          fill="currentColor"
          onClick={toggleChat}
        >
          <path d="M250-410h300v-60H250v60Zm0-120h460v-60H250v60Zm0-120h460v-60H250v60ZM100-118.46v-669.23Q100-818 121-839q21-21 51.31-21h615.38Q818-860 839-839q21 21 21 51.31v455.38Q860-302 839-281q-21 21-51.31 21H241.54L100-118.46ZM216-320h571.69q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v523.08L216-320Zm-56 0v-480 480Z" />
        </svg>
      </div>
      {unreadMessageCount > 0 && (
        <p className="text-sm font-medium text-red-500 px-1">
          {unreadMessageCount > 99 ? "99+" : unreadMessageCount}
        </p>
      )}
    </div>
  );
};

export default ChatControlMenu;
