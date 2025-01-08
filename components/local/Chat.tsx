"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import Image from "next/image";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { Minus, Plus } from "lucide-react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

interface Chat {
  sender: string | undefined;
  receiver: string | undefined;
  message: string;
  timestamp: string;
  senderName?: string;
  senderAvatar?: string;
}

export default function Chat({
  receiverId,
  open,
  onOpenChange,
}: {
  receiverId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    // if (open) {
      // const socketInstance = io("http://localhost:3001", {
      //   transports: ["websocket"],
      // });
      if (open) {
        const socketInstance = io("https://take-off-r3fp.onrender.com/", {
          transports: ["websocket"],
        });
      socketInstance.on("connect", () =>
        console.log("Connected to WebSocket server")
      );
      socketInstance.on("connect_error", (err) =>
        console.error("Connection error: ", err)
      );

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [open]);

  useEffect(() => {
    if (open && socket) {
      socket.emit("joinRoom", { senderId: userData?.id, receiverId });

      socket.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [open, socket, userData?.id, receiverId]);

  const sendMessage = () => {
    if (newMessage.trim() && socket && userData?.id) {
      const room = [userData.id, receiverId].sort().join("-");
      const messageData = {
        sender: userData.id,
        receiver: receiverId,
        message: newMessage,
        room,
        timestamp: new Date().toISOString(),
      };

      socket.emit("newMessage", messageData);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    setNewMessage(newMessage + emoji.native);
    setEmojiPickerVisible(false);
  };

  useEffect(() => {
    if (open && socket) {
      const room = [userData?.id, receiverId].sort().join("-");
      socket.emit("loadMessages", { room });
      socket.on("previousMessages", (loadedMessages) => {
        const formattedMessages: Chat[] = loadedMessages.map((msg: Chat) => ({
          sender: msg.sender,
          receiver: msg.receiver,
          message: msg.message,
          timestamp: msg.timestamp,
        }));
        setMessages(formattedMessages);
      });

      return () => {
        socket.off("previousMessages");
      };
    }
  }, [open, socket, userData?.id, receiverId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* <SheetTrigger asChild>
       
      </SheetTrigger> */}
      <SheetContent>
        <SheetTitle>
          <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
          </header>
        </SheetTitle>

        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-4 h-[75vh] space-y-2 no-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === userData?.id ? "justify-end" : "justify-start"
              }`}
            >
              {/* Profile Image and Chat Box */}
              <div className="flex items-start space-x-2">
                {/* Image on the Right for the sender */}
                {msg.sender !== userData?.id && (
                  <div className="w-10 h-10">
                    <Image
                      // src={msg?.senderAvatar} // Sender's avatar
                      src={"/images/profile.png"} // Current user's avatar
                      alt="Sender's Avatar"
                      className="w-full h-full rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                )}

                {/* Chat Box */}
                <div
                  className={`relative p-2 rounded-lg shadow-md max-w-[80%] ${
                    msg.sender === userData?.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-black"
                  } flex flex-col`} // Set up the flex column layout
                >
                  <div className="flex justify-between items-start">
                    {/* Sender's Name */}
                    <h4 className="text-xs font-semibold">
                      {msg.sender === userData?.id
                        ? "You"
                        : msg?.senderName || "User"}
                    </h4>
                  </div>
                  <p className="text-sm mt-1 min-w-20">{msg.message}</p>

                  {/* Time and other details */}
                  <div
                    className={`text-[10px] opacity-70 self-end`}
                    // Conditional class to position the time at bottom-right or left
                  >
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                {/* Image on the Right for the current user */}
                {msg.sender === userData?.id && (
                  <div className="w-10 h-10">
                    <Image
                      // src={userData?.avatar || "/images/profile.png"} // Current user's avatar
                      src={"/images/profile.png"} // Current user's avatar
                      alt="Your Avatar"
                      className="w-full h-full rounded-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="p-2 bg-gray-200 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg pr-10"
            />
            {/* Emoji button inside the input box */}
            {/* <button
              onClick={() => setEmojiPickerVisible(true)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xl"
            >
              😊
            </button> */}
          </div>

          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            <ArrowRight />
          </button>
        </SheetFooter>
      </SheetContent>

      {/* Emoji Picker */}
      {/* {emojiPickerVisible && (
        <Drawer open={emojiPickerVisible} onOpenChange={setEmojiPickerVisible}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Emoji Picker</Button>
          </DrawerTrigger>
          <DrawerContent className="max-w-md h-auto p-0">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </DrawerContent>
        </Drawer>
      )} */}
    </Sheet>
  );
}
