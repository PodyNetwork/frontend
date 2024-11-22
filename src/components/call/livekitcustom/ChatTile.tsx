import type {
  ChatMessage,
  ChatOptions,
  MessageDecoder,
  MessageEncoder,
} from "@livekit/components-core";
import * as React from "react";
import { useMaybeLayoutContext } from "@livekit/components-react";
import { useChat } from "@livekit/components-react";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import useProfile from "@/hooks/user/useProfile";
import { useCallback, useEffect, useRef } from "react";
import { useUnreadMessageContext } from "../utils/unreadMessageCount";
import { useChatContext } from "../utils/ChatContext";
import { useGiftMenu } from "../utils/GiftMenuContext";

export interface ChatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ChatOptions {
  messageDecoder?: MessageDecoder;
  messageEncoder?: MessageEncoder;
  channelTopic?: string;
}

export default function ChatTile({
  messageDecoder,
  messageEncoder,
  channelTopic,
  ...props
}: ChatProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const lastReadMsgAt = React.useRef<ChatMessage["timestamp"]>(0);
  // const unreadMessageCount = React.useRef(0);
  const notifiedParticipants = React.useRef(new Set<string>());

  const chatOptions = React.useMemo(
    () => ({ messageDecoder, messageEncoder, channelTopic }),
    [messageDecoder, messageEncoder, channelTopic]
  );

  const { send, chatMessages, isSending } = useChat(chatOptions);
  const layoutContext = useMaybeLayoutContext();
  const { isChatOpen, toggleChat } = useChatContext();
  const { openGiftMenu } = useGiftMenu();

  const { profile } = useProfile();

  const { setUnreadMessageCount } = useUnreadMessageContext(); // Access context

  const playNotificationSound = React.useCallback(() => {
    const audio = new Audio("/audio/podynotif.mp3");
    audio.play();
  }, []);

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const inputValue = inputRef.current?.value.trim();
      if (inputValue && send) {
        await send(inputValue); // No prefix
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    },
    [send]
  );

  useEffect(() => {
    ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
  }, [chatMessages]);

  useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) return;

    const unreadCount = chatMessages.reduce((count, msg) => {
      const participantId = msg?.from?.identity;
      const isCurrentUser = participantId === profile?.username;

      if (
        participantId &&
        !isCurrentUser &&
        !notifiedParticipants.current.has(participantId)
      ) {
        playNotificationSound();
        notifiedParticipants.current.add(participantId);
      }

      return msg.timestamp > lastReadMsgAt.current ? count + 1 : count;
    }, 0);

    if (isChatOpen) {
      lastReadMsgAt.current =
        chatMessages[chatMessages.length - 1]?.timestamp || 0;
      setUnreadMessageCount(0);
    } else {
      setUnreadMessageCount(unreadCount);
    }
  }, [
    chatMessages,
    isChatOpen,
    layoutContext,
    playNotificationSound,
    profile?.username,
    setUnreadMessageCount,
  ]);
  const chatHeader = useRef<HTMLDivElement>(null);
  const chatInput = useRef<HTMLDivElement>(null);

  const calculateHeights = useCallback(() => {
    if (chatHeader.current && chatInput.current) {
      const chatHeaderHeight = chatHeader.current.offsetHeight;
      const chatInputHeight = chatInput.current.offsetHeight;

      const totalHeaderInputHeight = chatHeaderHeight + chatInputHeight;
      const availableHeight = window.innerHeight - totalHeaderInputHeight;

      document.documentElement.style.setProperty(
        "--max-available-chat-height",
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
    <div
      className={`w-full relative __chat_full h-full bg-white dark:bg-pody-dark_secondary __shadow_pody transition-all duration-300 ease-in-out`}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div
          className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
          onClick={toggleChat}
          ref={chatHeader}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <h2 className="font-semibold text-base md:text-sm text-slate-800 dark:text-white">
                Chat
              </h2>
            </div>
            <ChevronIcon isOpen={isChatOpen} />
          </div>
        </div>
        <div className="flex-col __chat_max_height flex flex-1 select-text">
          <ul
            className="flex-grow overflow-y-auto px-4 pt-2 flex flex-col"
            ref={ulRef}
          >
            {chatMessages.map((msg, idx, allMsg) => {
              const isLastFromSender =
                idx === allMsg.length - 1 || allMsg[idx + 1].from !== msg.from;
              const showTimestamp = isLastFromSender;

              const time = new Date(msg.timestamp).toLocaleTimeString(
                navigator?.language || "en-US",
                { timeStyle: "short" }
              );

              const isCurrentUser = msg.from?.identity === profile?.username;

              return (
                <div key={msg.id} className="flex flex-col mb-2">
                  <div
                    className={`flex ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isCurrentUser && (
                      <div className="w-8 h-8 max-w-8 max-h-8 md:w-6 md:min-w-6 md:h-6 md:max-h-6 me-2">
                        <AvatarParticipant
                          name={msg.from?.identity || "unknown user"}
                        />
                      </div>
                    )}
                    <div
                      className={`flex flex-col w-10/12 break-words ${
                        isCurrentUser ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`rounded-lg relative p-2.5 md:p-2 ${
                          isCurrentUser
                            ? "bg-blue-100 text-right text-slate-700"
                            : "bg-[#f8fafd] text-left text-slate-700"
                        }`}
                        style={{
                          width: "fit-content", // Keeps the width based on content size
                          maxWidth: "100%",
                        }}
                      >
                        <p className="text-sm md:text-xs">{msg.message}</p>
                      </div>
                      <div className="block">
                        <div className="w-full flex flow-row gap-x-2">
                          {!isCurrentUser && isLastFromSender && (
                            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                              <h3>{msg.from?.name ?? msg.from?.identity}</h3>
                            </div>
                          )}
                          {showTimestamp && (
                            <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                              <span className="opacity-75">{time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {isCurrentUser && (
                      <div className="w-8 h-8 max-w-8 max-h-8 md:w-6 md:min-w-6 md:h-6 md:max-h-6 ms-2">
                        <AvatarParticipant
                          name={msg.from?.identity || "unknown user"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="relative w-full max-w-full">
          <div
            className="px-2.5 py-4 w-full max-w-full bg-white dark:bg-pody-dark border-t border-slate-100 dark:border-slate-800 flex flex-row items-center gap-x-1.5"
            ref={chatInput}
          >
            <form onSubmit={handleSubmit} className="relative flex-1">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Message..."
                  className="w-full px-3 h-10 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100 outline-none text-sm pr-10"
                  disabled={isSending}
                  ref={inputRef}
                />
                <SendButton isSending={isSending} />
              </div>
            </form>
            <div className="font-bold cursor-pointer" onClick={openGiftMenu}>
              <GiftButtonIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

const SendButton = ({ isSending }: { isSending: boolean }) => (
  <button type="submit" disabled={isSending} className="absolute right-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="fi_2907795"
      className={`h-5 w-5 text-slate-500 ${
        isSending ? "opacity-30" : "opacity-100"
      }`}
      data-name="Layer 1"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M14.76 22.65a2.3 2.3 0 0 1-2-1.23l-3.48-6.36a.8.8 0 0 0-.34-.34l-6.36-3.43A2.34 2.34 0 0 1 3 7l16.57-5.53a2.35 2.35 0 0 1 3 3L17 21.05a2.31 2.31 0 0 1-2 1.59ZM20 2.9 3.43 8.43a.84.84 0 0 0-.58.73.83.83 0 0 0 .44.81l6.36 3.43a2.3 2.3 0 0 1 .95.95l3.4 6.36a.83.83 0 0 0 .81.44.84.84 0 0 0 .73-.58L21.1 4A.84.84 0 0 0 20 2.9"></path>
      <path d="M9.67 15.08a.7.7 0 0 1-.53-.22.74.74 0 0 1 0-1.06L20.9 2A.75.75 0 0 1 22 3.1L10.2 14.86a.74.74 0 0 1-.53.22"></path>
    </svg>
  </button>
);

const GiftButtonIcon = () => (
  <div className="h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      id="fi_66834"
      className="w-5 h-5"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 293.373 293.373"
      fill="currentColor"
    >
      <path d="M130.265 162.904H34.991c-7.549 0-13.726 6.176-13.726 13.725v103.02c0 7.549 6.177 13.725 13.726 13.725h96.876c3.229 0 3.229-3.469 3.229-3.469V167.568c-.001 0-.001-4.664-4.831-4.664M258.383 162.904h-95.177c-5.797 0-4.929 6.037-4.929 6.037v121.076s-.047 3.354 3.44 3.354h96.664c7.549 0 13.726-6.176 13.726-13.725V176.629c.002-7.549-6.175-13.725-13.724-13.725M135.095 81.846s0-4.651-4.596-4.651H19.491c-7.549 0-13.726 6.177-13.726 13.725v42.845c0 7.549 6.177 13.725 13.726 13.725h111.384c4.22 0 4.22-3.66 4.22-3.66zM273.882 77.195H162.52c-4.241 0-4.241 4.041-4.241 4.041v62.679s0 3.575 5.156 3.575h110.447c7.549 0 13.726-6.176 13.726-13.725V90.92c0-7.548-6.177-13.725-13.726-13.725M88.41 67.04c-6.28 0-12.016-.498-17.046-1.481-12.776-2.496-21.557-7.354-26.845-14.85-4.738-6.718-6.188-15-4.311-24.617C43.496 9.266 54.796 0 72.024 0c3.646 0 7.65.421 11.902 1.252 10.816 2.113 24.65 8.315 37.007 16.59 20.965 14.041 22.002 22.77 20.958 28.115-1.535 7.854-8.876 13.466-22.443 17.158-9.166 2.494-20.479 3.925-31.038 3.925M72.025 21.999c-6.672 0-8.965 1.864-10.224 8.311-1.03 5.271.269 7.112.695 7.717 1.784 2.53 6.431 4.64 13.086 5.939 3.591.702 8.028 1.073 12.827 1.073 10.553 0 19.85-1.599 26.019-3.348.449-.127 1.146-.658.399-1.103-8.065-6.57-22.82-15.343-35.119-17.746-2.865-.558-5.451-.843-7.683-.843M205.281 67.04h-.002c-10.559 0-21.871-1.431-31.037-3.925-13.568-3.691-20.908-9.304-22.443-17.157-1.043-5.345-.008-14.074 20.959-28.115 12.355-8.275 26.189-14.477 37.007-16.59 4.252-.831 8.256-1.252 11.899-1.252 17.232 0 28.531 9.267 31.816 26.093 1.879 9.616.43 17.898-4.309 24.616-5.288 7.497-14.068 12.354-26.847 14.85-5.028.981-10.764 1.48-17.043 1.48m-26.242-26.588c-.715.415-.369 1.07.002 1.177 6.166 1.773 15.561 3.411 26.238 3.411 4.801 0 9.236-.371 12.828-1.073 6.654-1.3 11.303-3.409 13.086-5.939.428-.605 1.728-2.446.695-7.717C230.63 23.864 228.336 22 221.663 22c-2.231 0-4.815.284-7.682.844-12.3 2.402-26.877 11.037-34.942 17.608"></path>
    </svg>
  </div>

);
