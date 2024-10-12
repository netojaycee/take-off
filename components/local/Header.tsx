import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { BiSolidCart } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
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

export default function Header({ auth }: { auth?: boolean }) {
  return (
    <>
      <div className="py-6 px-10">
        {auth ? (
          <div className="flex items-center justify-between w-full">
            <Logo />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <Logo />
            <div className="lg:flex items-center gap-10 w-[40%] hidden">
              <Link href={"/"} className="">
                Home
              </Link>
              <Input
                className="bg-[rgba(37,37,37,0.13)]"
                placeholder="Ai Search"
              />
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <Link href={"/"} className="">
                Sell
              </Link>
              <Link href={"/cart"} className="flex items-center gap-2">
                Cart
                <BiSolidCart className="w-5 h-5" />
              </Link>
              <Link href="/signin">
                <FaUserCircle className="w-6 h-6" />
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-9 h-9 block lg:hidden" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="name"
                      value="Pedro Duarte"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="username"
                      value="@peduarte"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </>
  );
}
