"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Chat({
  reciever,
}: {
  reciever: "seller" | "buyer" | "admin";
}) {
  const [open, setOpen] = React.useState(false);
  const [unreadMessages, setUnreadMessages] = React.useState(3); // Example count

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
        }
      }}
    >
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
            setUnreadMessages(0); // Clear badge
          }}
          variant="outline"
          className="text-xs relative bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
         <MessageCircle className="mr-1"/> Chat with {reciever}
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {unreadMessages}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent onInteractOutside={(event) => event.preventDefault()}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader>
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat</h2>
            </header>
          </SheetHeader>

          {/* Main Content */}
          <div className="flex-grow overflow-y-auto grid gap-4 py-2">
            <ChatWindow />
          </div>

          {/* Footer */}
          <SheetFooter className="bg-gray-200 p-2 flex items-center gap-2 flex-row">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-[80%] p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <ArrowRight className="w-6 h-6" />
            </span>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ChatWindow() {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom(); // Automatically scroll to the bottom when the component renders
  }, []);
  return (
    // <div className="bg-white shadow-xl rounded-lg w-80 h-full flex flex-col overflow-y-auto">
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100 h-full">
      {Array.from({ length: 20 }).map((_, index) => (
        <Message
          key={index}
          sender={index % 2 === 0 ? "seller" : "buyer"}
          text={`Message ${index + 1}`}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
    // </div>
  );
}

function Message({
  sender,
  text,
}: {
  sender: "seller" | "buyer";
  text: string;
}) {
  const isSeller = sender === "seller";
  return (
    <div
      className={`flex ${
        isSeller ? "justify-start" : "justify-end"
      } items-center`}
    >
      <div
        className={`p-3 rounded-lg max-w-xs text-sm ${
          isSeller ? "bg-gray-300 text-gray-900" : "bg-blue-600 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
