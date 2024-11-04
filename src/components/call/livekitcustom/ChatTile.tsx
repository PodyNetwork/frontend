import type { ChatMessage, ChatOptions } from "@livekit/components-core";
import * as React from "react";
import { useMaybeLayoutContext } from "@livekit/components-react";
import type { MessageFormatter } from "@livekit/components-react";
import { useChat } from "@livekit/components-react";
import { useMyContext } from "../utils/MyContext";
import { AvatarParticipant } from "@/components/Avatar/AvatarParticipant";
import GiftUI from "../widgets/GiftCard";
import { useGiftMenu } from "../utils/GiftMenuContext";
import useProfile from "@/hooks/user/useProfile";

export interface ChatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ChatOptions {
  messageFormatter?: MessageFormatter;
}

export default function ChatTile({
  messageFormatter,
  messageDecoder,
  messageEncoder,
  channelTopic,
  ...props
}: ChatProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const lastReadMsgAt = React.useRef<ChatMessage["timestamp"]>(0);
  const unreadMessageCount = React.useRef(0);
  const notifiedParticipants = React.useRef(new Set<string>());

  const chatOptions = React.useMemo(
    () => ({ messageDecoder, messageEncoder, channelTopic }),
    [messageDecoder, messageEncoder, channelTopic]
  );

  const { send, chatMessages, isSending } = useChat(chatOptions);
  const layoutContext = useMaybeLayoutContext();
  const { isChatOpen, setIsChatOpen } = useMyContext();
  const { isGiftOpen, openGiftMenu } = useGiftMenu();

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

  React.useEffect(() => {
    ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
  }, [chatMessages]);

  React.useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) return;

    const unreadCount = chatMessages.reduce((count, msg) => {
      const participantId = msg?.from?.identity;
      if (participantId && !notifiedParticipants.current.has(participantId)) {
        playNotificationSound();
        notifiedParticipants.current.add(participantId);
      }
      return msg.timestamp > lastReadMsgAt.current ? count + 1 : count;
    }, 0);

    if (isChatOpen) {
      lastReadMsgAt.current =
        chatMessages[chatMessages.length - 1]?.timestamp || 0;
      unreadMessageCount.current = 0;
    } else {
      if (
        unreadCount > 0 &&
        layoutContext.widget.state?.unreadMessages !== unreadCount
      ) {
        layoutContext.widget.dispatch?.({
          msg: "unread_msg",
          count: unreadCount,
        });
      }
      unreadMessageCount.current = unreadCount;
    }
  }, [chatMessages, isChatOpen, layoutContext, playNotificationSound]);

  const gifts = [
    { id: "1", name: "PodyToken", icon: "/icon/Pody.jpg", price: 1, isAvailable: true, },
    {
      id: "2",
      name: "EDUCHAIN",
      icon: "/icon/educhain.png",
      price: 5,
      isHot: true,
      isAvailable: false,
    },
    {
      id: "3",
      name: "BNB",
      icon: "/icon/Binance-coin.png",
      price: 5,
      isHot: true,
      isAvailable: false,
    }
  ];

  const handleGiftSend = (gift: any) => {
    console.log("Gift sent:", gift);
  };

  const { profile } = useProfile();

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 w-full md:w-[20rem] h-[55vh] md:h-screen overflow-y-auto bg-white dark:bg-slate-800 __shadow_pody transition-all duration-300 ease-in-out ${
        isChatOpen
          ? "translate-y-0"
          : "translate-y-full"
      }`}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div
          className="px-4 py-3 border-b dark:border-slate-700 cursor-pointer"
          onClick={() => setIsChatOpen((open) => !open)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <h2 className="font-semibold text-base md:text-sm text-slate-800 dark:text-white">
                Chat
              </h2>
              {!isChatOpen && unreadMessageCount.current > 0 && (
                <p className="bg-red-500 w-5 h-5 flex items-center justify-center text-slate-300 rounded-full text-xs">
                  {unreadMessageCount.current}
                </p>
              )}
            </div>
            <ChevronIcon isOpen={isChatOpen} />
          </div>
        </div>
        <div className={`flex-col h-full ${isGiftOpen ? "hidden" : "flex"}`}>
          <ul
            className="flex-grow overflow-y-auto px-4 py-3 flex flex-col"
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
                    <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                      <div
                        className={`rounded-lg relative p-2.5 md:p-2 ${
                          isCurrentUser
                            ? "bg-blue-100 text-right text-slate-700"
                            : "bg-[#f8fafd] text-left text-slate-700"
                        }`}
                        style={{
                          width: "fit-content",
                        }}
                      >
                        <p className="text-sm md:text-xs">{msg.message}</p>
                      </div>
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

          <div className="px-2.5 py-3 border-t dark:border-slate-700 flex flex-row items-center gap-x-2">
            <form onSubmit={handleSubmit} className="relative flex-1">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white outline-none text-sm pr-10"
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
        {isChatOpen && isGiftOpen && (
          <div className="px-4">
            <GiftUI gifts={gifts} onGiftSend={handleGiftSend} />
          </div>
        )}
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
  <button type="submit" disabled={isSending} className="absolute right-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 text-blue-500 ${
        isSending ? "opacity-30" : "opacity-100"
      }`}
      viewBox="0 -960 960 960"
      fill="currentColor"
    >
      <path d="M140-190v-580l688.46 290L140-190Zm60-90 474-200-474-200v147.69L416.92-480 200-427.69V-280Zm0 0v-400 400Z" />
    </svg>
  </button>
);

const GiftButtonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    className="w-5 h-5"
    viewBox="0 0 406.215 406.215"
  >
    <defs>
      <linearGradient id="cool-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#0ea5e9", stopOpacity: 1 }} />{" "}
        <stop offset="50%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />{" "}
        <stop offset="100%" style={{ stopColor: "#4f46e5", stopOpacity: 1 }} />{" "}
      </linearGradient>
    </defs>
    <path
      fill="url(#cool-gradient)"
      d="M226.793 243.186v163.029h134.115c17.431 0 31.568-14.129 31.568-31.57V243.186zM179.374 243.186H13.749v131.459c0 17.441 14.141 31.57 31.57 31.57h134.055zm-122.586 129.9c-6.545 0-11.855-5.311-11.855-11.854v-65.778c0-6.544 5.311-11.854 11.855-11.854s11.855 5.312 11.855 11.854v65.778c0 6.543-5.31 11.854-11.855 11.854M371.176 119.564h-59.293c8.184-3.928 15.049-7.986 19.2-12.133 24.423-24.419 24.423-64.03 0-88.453C318.857 6.768 302.85.664 286.844.664c-16.009 0-32.019 6.104-44.229 18.314-10.141 10.144-19.897 35.182-27.862 60.983-3.72-1.021-7.549-1.736-11.577-1.736-4.014 0-7.844.716-11.547 1.729-7.996-26.034-17.844-51.412-28.08-61.641C151.338 6.103 135.346 0 119.322 0c-16.008 0-32.016 6.104-44.227 18.313-24.422 24.432-24.422 64.035 0 88.453 4.369 4.388 11.73 8.679 20.562 12.798H35.038c-17.43 0-31.553 14.128-31.553 31.556v26.852c0 17.43 14.123 31.551 31.553 31.551h144.336v-88.707h47.419v88.707h144.384c17.428 0 31.553-14.123 31.553-31.552v-26.852c-.001-17.427-14.126-31.555-31.554-31.555M264.971 41.332c5.834-5.838 13.612-9.057 21.873-9.057 8.272 0 16.039 3.219 21.891 9.057 5.834 5.841 9.045 13.607 9.045 21.873s-3.211 16.031-9.016 21.835c-6.531 6.161-32.107 15.76-63.725 24.701a42.3 42.3 0 0 0-3.627-8.716c8.614-29.753 17.661-53.458 23.559-59.693m-167.523-.664c5.836-5.834 13.615-9.053 21.875-9.053 8.273 0 16.039 3.211 21.857 9.037 5.945 6.291 15.098 30.303 23.773 60.365-1.436 2.577-2.576 5.296-3.473 8.158-31.768-8.952-57.502-18.6-64.033-24.758-12.056-12.064-12.056-31.685.001-43.749"
    ></path>
  </svg>
);
