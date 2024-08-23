import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Menu } from "lucide-react";
import { BiSolidCart } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <>
      <div className="py-6 px-10">
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
            <Link href={"/"} className="flex items-center gap-2">
              Cart
              <BiSolidCart className="w-5 h-5" />
            </Link>
            <FaUserCircle className="w-6 h-6" />
          </div>
          <Menu className="w-9 h-9 block lg:hidden"/>
        </div>
      </div>
    </>
  );
}
