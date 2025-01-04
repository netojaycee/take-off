"use client";

import * as React from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SearchBar from "./SearchBar";
import { BiSearch } from "react-icons/bi";

export function MobileSearch() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DrawerClose>
          <BiSearch className="w-5 h-5" />
        </DrawerClose>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="p-2 pb-0">
            <SearchBar />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
