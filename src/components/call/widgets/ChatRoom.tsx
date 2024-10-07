"use client";
import React, { useState, useRef } from "react";
import { useChat } from "@livekit/components-react";
import Image from "next/image";

const ChatRoom: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { send, chatMessages, isSending } = useChat();

  const messageData = useRef<HTMLInputElement>(null); 

  const sendMessage = () => {
    console.log(messageData.current?.value);
    send(messageData.current?.value || "");
  };

  return (
    <div
      className={`fixed bottom-0 md:right-4 right-0 z-50 w-full md:w-[20rem] h-[70vh] md:h-[400px] bg-white dark:bg-gray-800 shadow-xl rounded-t-xl transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-y-0"
          : "translate-y-full md:translate-y-[calc(100%-55px)]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div
          className="px-4 py-3 border-b dark:border-gray-700 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
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
        <div className="flex-grow overflow-y-auto px-4 py-3">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex mb-4`}>
              <Image src="/avatar/user1.webp" alt={`${message.from}'s icon`} className="w-6 h-6 object-cover rounded-full mr-2" />
              <div className={`w-full rounded-lg p-3 bg-blue-500 text-white`}>
                <p className="text-xs">{typeof message.from === 'string' ? message.from : 'Unknown'}</p> 
                <p className="text-sm">{message.message}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(message.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={messageData}
            />
            <button className="ml-2" disabled={isSending}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-blue-500 ${isSending ? 'opacity-30' : 'opacity-100'}`}
                viewBox="0 -960 960 960"
                fill="currentColor"
                onClick={sendMessage}
              >
                <path d="M140-190v-580l688.46 290L140-190Zm60-90 474-200-474-200v147.69L416.92-480 200-427.69V-280Zm0 0v-400 400Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
function oseRef() {
    throw new Error("Function not implemented.");
}

