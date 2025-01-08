"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
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
}

export default function Chat({
  receiverId,
  reciepient,
}: {
  receiverId: string;
  reciepient: "seller" | "buyer" | "admin";
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const userData = useSelector((state: RootState) => state.auth.userData);

  useEffect(() => {
    // if (open) {
    //   const socketInstance = io("http://localhost:3003", {
    //     transports: ["websocket"],
    //   });
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="relative bg-gray-600 text-white p-3 rounded-full"
        >
          <MessageCircle className="mr-1" /> Chat with {reciepient}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chat</h2>
          </header>
        </SheetHeader>
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
              <div
                className={`p-3 rounded-lg shadow-md max-w-[80%] ${
                  msg.sender === userData?.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                <div className="flex justify-between items-center mt-1 text-xs opacity-80">
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
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
