"use client";
import React, { useRef } from "react";
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
import { Menu } from "lucide-react";
import Link from "next/link";
import Sidebar from "./profile/Sidebar";

export default function ProfileSheetMobile() {
  const [open, setOpen] = React.useState(false); 

    const handleSheetClose = () => {
        setOpen(false);
    };
 
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-9 h-9 block lg:hidden">
          <Menu />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 bg-white p-4 h-screen overflow-auto"
      >
        <SheetTitle></SheetTitle>
        <div className="mt-4">
          <Sidebar sheetClose={handleSheetClose} />{" "}
        </div>
      </SheetContent>
    </Sheet>
  );
}
