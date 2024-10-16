import type { ChatMessage, ChatOptions } from "@livekit/components-core";
import * as React from "react";
import { useMaybeLayoutContext } from "@livekit/components-react";
import type { MessageFormatter } from "@livekit/components-react";
import { useChat } from "@livekit/components-react";
import Image from "next/image";
import { useMyContext } from "../utils/MyContext";

/* eslint-disable @typescript-eslint/no-unused-vars */

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

  const chatOptions: ChatOptions = React.useMemo(
    () => ({ messageDecoder, messageEncoder, channelTopic }),
    [messageDecoder, messageEncoder, channelTopic]
  );

  const { send, chatMessages, isSending } = useChat(chatOptions);
  const layoutContext = useMaybeLayoutContext();
  const { isChatOpen, setIsChatOpen } = useMyContext();

  // Submit handler for sending a message
  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const inputValue = inputRef.current?.value.trim();
      if (inputValue && send) {
        await send(inputValue);
        if (inputRef.current) {
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    },
    [send]
  );

  // Automatically scroll to the bottom of chat when new messages arrive
  React.useEffect(() => {
    ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
  }, [chatMessages]);

  // Handle unread message count when chat state changes
  React.useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) return;

    if (isChatOpen) {
      // Reset unread message count and mark messages as read
      lastReadMsgAt.current =
        chatMessages[chatMessages.length - 1]?.timestamp || 0;
      unreadMessageCount.current = 0;
    } else {
      // Count unread messages when chat is closed
      const unreadCount = chatMessages.filter(
        (msg) => msg.timestamp > lastReadMsgAt.current
      ).length;

      // Update unread message count and dispatch changes if necessary
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
  }, [chatMessages, isChatOpen, layoutContext]);

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 w-full md:w-[20rem] h-[70vh] md:h-[400px] bg-white dark:bg-gray-800 shadow-xl rounded-t-lg transition-all duration-300 ease-in-out ${
        isChatOpen
          ? "translate-y-0"
          : "translate-y-full md:translate-y-[calc(100%-50px)]"
      }`}
      {...props}
    >
      <div className="flex flex-col h-full">
        <div
          className="px-4 py-3 border-b dark:border-gray-700 cursor-pointer"
          onClick={() => setIsChatOpen((open) => !open)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <h2 className="font-medium text-sm text-gray-800 dark:text-white">
                Chat Room
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
        <ul className="flex-grow overflow-y-auto px-4 py-3" ref={ulRef}>
          {chatMessages.map((msg, idx, allMsg) => {
            const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
            const hideTimestamp =
              idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 60000;
            const time = new Date(msg.timestamp).toLocaleTimeString(
              navigator?.language || "en-US",
              { timeStyle: "short" }
            );

            return (
              <div key={msg.id} className="flex flex-col mb-2">
                <div className="flex flex-row">
                  <Image
                    src="/avatar/user1.webp"
                    alt={`${msg.from}'s icon`}
                    width={100}
                    height={100}
                    className="w-6 h-6 object-cover rounded-full mr-2"
                  />
                  <div className="w-[75%] rounded-lg p-2 bg-[#f8fafd] text-slate-700">
                    <p className="text-xs">{msg.message}</p>
                  </div>
                </div>
                <div className="text-[0.68rem] dark:text-slate-300 ms-8 mt-1 gap-x-1 flex flex-row items-center">
                  {!hideName && <h3>{msg.from?.name ?? msg.from?.identity}</h3>}
                  {!hideTimestamp && <span className="opacity-75">{time}</span>}
                </div>
              </div>
            );
          })}
        </ul>
        <div className="px-4 py-3 border-t dark:border-gray-700">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white outline-none text-sm pr-10"
                disabled={isSending}
                ref={inputRef}
              />
              <SendButton isSending={isSending} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
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
