import type { ChatMessage, ChatOptions } from "@livekit/components-core";
import * as React from "react";
import { useMaybeLayoutContext } from "@livekit/components-react";
import type { MessageFormatter } from "@livekit/components-react";
import { useChat } from "@livekit/components-react";
import Image from "next/image";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */

/** @public */
export interface ChatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ChatOptions {
  messageFormatter?: MessageFormatter;
}
/**
 * The Chat component adds a basis chat functionality to the LiveKit room. The messages are distributed to all participants
 * in the room. Only users who are in the room at the time of dispatch will receive the message.
 *
 * @example
 * ```tsx
 * <LiveKitRoom>
 *   <Chat />
 * </LiveKitRoom>
 * ```
 * @public
 */
export default function Chat({
  messageFormatter,
  messageDecoder,
  messageEncoder,
  channelTopic,
  ...props
}: ChatProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ulRef = React.useRef<HTMLUListElement>(null);

  const chatOptions: ChatOptions = React.useMemo(() => {
    return { messageDecoder, messageEncoder, channelTopic };
  }, [messageDecoder, messageEncoder, channelTopic]);

  const { send, chatMessages, isSending } = useChat(chatOptions);

  const layoutContext = useMaybeLayoutContext();
  const lastReadMsgAt = React.useRef<ChatMessage["timestamp"]>(0);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      if (send) {
        await send(inputRef.current.value);
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }

  React.useEffect(() => {
    if (ulRef) {
      ulRef.current?.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);

  React.useEffect(() => {
    if (!layoutContext || chatMessages.length === 0) {
      return;
    }

    if (
      layoutContext.widget.state?.showChat &&
      chatMessages.length > 0 &&
      lastReadMsgAt.current !== chatMessages[chatMessages.length - 1]?.timestamp
    ) {
      lastReadMsgAt.current = chatMessages[chatMessages.length - 1]?.timestamp;
      return;
    }

    const unreadMessageCount = chatMessages.filter(
      (msg) => !lastReadMsgAt.current || msg.timestamp > lastReadMsgAt.current
    ).length;

    const { widget } = layoutContext;
    if (
      unreadMessageCount > 0 &&
      widget.state?.unreadMessages !== unreadMessageCount
    ) {
      widget.dispatch?.({ msg: "unread_msg", count: unreadMessageCount });
    }
  }, [chatMessages, layoutContext]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed bottom-0 right-0 z-50 w-full md:w-[20rem] h-[70vh] md:h-[400px] bg-white dark:bg-gray-800 shadow-xl rounded-t-lg transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-y-0"
          : "translate-y-full md:translate-y-[calc(100%-50px)]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div
          className="px-4 py-3 border-b dark:border-gray-700 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-base text-gray-800 dark:text-white">
              Chat Room
            </h2>
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
          </div>
        </div>
        <ul className="flex-grow overflow-y-auto px-4 py-3" ref={ulRef}>
          {chatMessages.map((msg, idx, allMsg) => {
            const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
            const hideTimestamp =
              idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 60_000;
            const time = new Date(msg.timestamp);
            const locale = navigator ? navigator.language : 'en-US';

            return (
              <div key={msg.id} className={`flex flex-col mb-2`}>
                <div className="flex flex-row">
                <Image
                  src="/avatar/user1.webp"
                  alt={`${msg.from}'s icon`}
                  width={100}
                  height={100}
                  className="w-6 h-6 object-cover rounded-full mr-2"
                />
                <div
                  className={`w-[75%] rounded-lg p-2 bg-[#f8fafd] text-slate-700`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
                </div>
                <div className="text-[0.7rem] dark:text-slate-300 ms-8 mt-1 gap-x-1 flex flex-row items-center">
                  <p>
                    {!hideName && (
                      <h3>
                        {msg.from?.name ?? msg.from?.identity}
                      </h3>
                    )}
                  </p>
                  <span className="text-xs opacity-75 block">
                    {(!hideTimestamp) && (
                      <span>
                        {time.toLocaleTimeString(locale, {
                          timeStyle: "short",
                        })}
                      </span>
                    )}
                  </span>
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
                onInput={(ev) => ev.stopPropagation()}
                onKeyDown={(ev) => ev.stopPropagation()}
                onKeyUp={(ev) => ev.stopPropagation()}
              />
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
