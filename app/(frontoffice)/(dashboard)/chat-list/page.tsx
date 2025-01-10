"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import Chat from "@/components/local/Chat";
import { useGetAllChatsQuery } from "@/redux/appData";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface ChatPreview {
  room: string;
  receiverId: string;
  receiverName: string;
  receiverAvatar: string | null; // Can be null if no avatar is provided
  lastMessage: string;
  lastMessageTimestamp: string; // ISO string format for date
}

export default function ChatList() {
  const [currentChat, setCurrentChat] = useState<ChatPreview | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { data, isLoading, error } = useGetAllChatsQuery(undefined);
  console.log("cgats", data && data);

  

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">My Chats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div><Loader2 className="animate-spin" /></div>
        ) : data && data.length > 0 ? (
          data.map((chat: ChatPreview) => (
            <div
              key={chat.room}
              className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-50 cursor-pointer flex items-center relative"
              onClick={() => {
                setOpen(!open);
                setCurrentChat(chat);
              }}
            >
              {/* Profile Picture */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={chat.receiverAvatar || ""} // Fallback to a default avatar if none is provided
                  alt={`${chat.receiverName}'s profile`}
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>

              {/* Chat Details */}
              <div className="flex-1 w-[60%]">
                <h2 className="text-[16px] line-clamp-1 font-medium truncate">
                  {chat.receiverName}
                </h2>
                <p className="text-sm text-gray-500 truncate mb-2 w-full">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {/* {chat?.unreadCount > 0 && (
                <div className="absolute bottom-2 right-2">
                  <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                    {chat?.unreadCount}
                  </span>
                </div>
              )} */}

              {/* Timestamp at Bottom Right */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {new Date(chat.lastMessageTimestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        ) : (
          <div>No chats found</div>
        )}
      </div>

      {/* Chat Modal */}
      {/* {currentChat && ( */}
      <Chat
        open={open}
        onOpenChange={(open) => setOpen(open)}
        receiverId={currentChat?.receiverId || "if"}
        // reciepient={currentChat?.recipient || "seller"}
      />
      {/* )} */}
    </div>
  );
}
