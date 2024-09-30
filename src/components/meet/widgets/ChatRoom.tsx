import React, { useState } from 'react'
import Image from 'next/image'
import userLogo from '/public/avatar/user.png'

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const ChatRoom: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState<Message[]>([
      { id: '1', sender: 'User1', content: 'Can you hear my voice?', timestamp: new Date() },
      { id: '2', sender: 'User2', content: 'Yes, I can hear you clearly.', timestamp: new Date() },
    ]);

    // ... existing code ...

    return (
        <div className={`fixed bottom-0 md:right-4 right-0 z-50 w-full md:w-[20rem] h-[70vh] md:h-[400px] bg-white dark:bg-gray-800 shadow-xl rounded-t-xl transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full md:translate-y-[calc(100%-55px)]'}`}>
            <div className='flex flex-col h-full'>
                <div className='px-4 py-3 border-b dark:border-gray-700 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-lg text-gray-800 dark:text-white'>Chat Room</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
                        </svg>
                    </div>
                </div>
                <div className='flex-grow overflow-y-auto px-4 py-3'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex mb-4 ${message.sender === 'User1' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'User1' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                                <p className='text-sm'>{message.content}</p>
                                <span className='text-xs opacity-75 mt-1 block'>{message.timestamp.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='px-4 py-3 border-t dark:border-gray-700'>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className='w-full px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
            </div>
        </div>
    )
}

export default ChatRoom