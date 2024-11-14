"use client";
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
import { persistor } from "@/redux/store";
import Cookies from "js-cookie";
import { useGetAllCategoryQuery } from "@/redux/appData";
import { category } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/types";

export default function Header({ auth }: { auth?: boolean }) {
  const {
    data,
    isLoading: isLoadingCategory,
    error,
  } = useGetAllCategoryQuery(undefined);
  const categories = data?.category as category[];
  const session = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userData = useSelector((state: RootState) => state.auth.userData);

  const handleLogout = async () => {
    try {
      // Step 1: Remove token from cookies
      Cookies.remove("token");

      // Step 2: Clear Redux Persist Storage
      await persistor.purge();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              <Link href={"/sell"} className="">
                Sell
              </Link>
              <Link href={"/cart"} className="flex items-center gap-2">
                Cart
                <BiSolidCart className="w-5 h-5" />
              </Link>
              <Link href={`${session ? "/dashboard" : "/signin"}`}>
                <FaUserCircle className="w-6 h-6" />
              </Link>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-9 h-9 block lg:hidden">
                  <Menu />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-72 bg-white p-4 h-screen overflow-auto"
              >
                <div className="mt-4">
                  <ul className="space-y-4">
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/my-profile"
                          className="block font-medium text-gray-800"
                        >
                          My Profile
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="#"
                          className="block font-medium text-gray-800"
                        >
                          Dashboard
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/my-orders"
                          className="block font-medium text-gray-800"
                        >
                          My Order
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/saved-items"
                          className="block font-medium text-gray-800"
                        >
                          Saved Items
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/my-items"
                          className="block font-medium text-gray-800"
                        >
                          My Items
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/add-items"
                          className="block font-medium text-gray-800"
                        >
                          Add Items
                        </Link>
                      </SheetClose>
                    </li>
                    {session && userData?.role === "admin" && (
                      <>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/add-items"
                              className="block font-medium text-gray-800"
                            >
                              All Categories
                            </Link>
                          </SheetClose>
                        </li>
                        <li>
                          <SheetClose asChild>
                            <Link
                              href="/add-items"
                              className="block font-medium text-gray-800"
                            >
                              Add Categories
                            </Link>
                          </SheetClose>
                        </li>
                      </>
                    )}
                    <hr className="my-4 border-gray-300" />

                    <li className="flex items-center justify-between">
                      <span className="font-semibold text-gray-600">
                        CATEGORIES
                      </span>
                      <SheetClose asChild>
                        <Link
                          href="/products"
                          className="text-sm text-gray-400"
                        >
                          See more
                        </Link>
                      </SheetClose>
                    </li>

                    <li>
                      {isLoadingCategory
                        ? Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton
                              key={index}
                              className="w-3/4 h-5 bg-gray-400 my-3"
                            />
                          ))
                        : categories &&
                          categories.map((category, index) => (
                            <SheetClose key={index} asChild>
                              <Link
                                href={`/products?category=${category._id}`}
                                className="rounded-md flex justify-between items-center hover:transform duration-300 hover:scale-105 hover:bg-gray-200 p-1"
                              >
                                <span className="line-clamp-1 w-full">
                                  {category?.name}
                                </span>{" "}
                                <FaAngleRight />
                              </Link>
                            </SheetClose>
                          ))}
                    </li>

                    <hr className="my-4 border-gray-300" />

                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/sell"
                          className="block font-medium text-gray-800"
                        >
                          Sell on Takeoff Trade
                        </Link>
                      </SheetClose>
                    </li>
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="#"
                          className="block font-medium text-gray-800"
                        >
                          Contact us
                        </Link>
                      </SheetClose>
                    </li>

                    {/* <li>
                      <SheetClose asChild>
                        <Link
                          href="#"
                          className="block font-medium text-red-600"
                        >
                          Delete Account
                        </Link>
                      </SheetClose>
                    </li> */}
                    <li>
                      <SheetClose asChild>
                        {session ? (
                          <span
                            onClick={handleLogout}
                            className="block font-medium text-red-600 cursor-pointer"
                          >
                            Log out
                          </span>
                        ) : (
                          <Link
                            href={"signin"}
                            className="block font-medium text-red-600 cursor-pointer"
                          >
                            Log in
                          </Link>
                        )}
                      </SheetClose>
                    </li>
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </>
  );
}
