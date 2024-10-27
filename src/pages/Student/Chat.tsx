import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import config from '../../config/index';
import { toast } from 'react-toastify';
import { Spinner } from "@material-tailwind/react";


interface Item {
    sender: string;
    receiver: string;
}

const Chat: React.FC = () => {

    const [message, setMessage] = useState("");

    const [items, setItems] = useState<Item[]>([]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendmessage();
        }
    };

    const scrollRef = useRef(null);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 90000000000000000;
        }
    };

    useEffect(() => {
        scrollToTop();
        console.log(scrollRef);
    }, [items])

    const sendmessage = () => {

        const newItem = { sender: message, receiver: '' };
        setItems(prevItems => [...prevItems, newItem]);

        axios.post(`${config.SERVER_URL}chat/send`, { message: message }).then(res => {
            let result = res.data.chatText
            setItems(prevItems => {
                const lastItemIndex = prevItems.length - 1;
                const lastItem = prevItems[lastItemIndex];
                const updatedItem = { ...lastItem, receiver: result };
                return [
                    ...prevItems.slice(0, lastItemIndex),  // Keep all items except the last
                    updatedItem,                           // Add the updated last item
                ];
            });
        })
        setMessage('');
    }

    return (
        <>
            <div className="flex h-screen antialiased text-gray-800" style={{ height: "75vh" }}>
                <div
                    className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
                >
                    <div ref={scrollRef} style={{ overflowY: 'scroll', height: '75vh' }} className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            <div id="chatbox" className="grid grid-cols-12 gap-y-2" style={{ width: "150vh" }}>
                                {
                                    items.map((item, index) => (
                                        <>
                                            <div key={index+"-1"} className="col-start-6 col-end-13 p-3 rounded-lg">
                                                <div className="flex items-center justify-start flex-row-reverse">
                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                        You
                                                    </div>
                                                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">

                                                        <label className="py-2 mb-2.5 block text-black dark:text-white">
                                                            {item.sender}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div key={index+"2"} className=" col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div
                                                        className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                                    >
                                                        AI
                                                    </div>
                                                    <div
                                                        className="  relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                                    >
                                                        {
                                                            item.receiver == "" ?
                                                                <Spinner className="h-4 w-4" />
                                                                :
                                                                <label className="py-4 mb-5 block text-black dark:text-white">
                                                                    {item.receiver}
                                                                </label>

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                    >
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                <input
                                    value={message}
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                />
                            </div>
                        </div>
                        <div className="ml-4">
                            <button
                                onClick={() => { sendmessage() }} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            >
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg
                                        className="w-4 h-4 transform rotate-45 -mt-px"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                        ></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
