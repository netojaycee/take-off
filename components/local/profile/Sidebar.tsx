"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { clearCredentials } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
import { persistor } from "@/redux/store";

export default function Sidebar({ sheetClose }: { sheetClose?: () => void }) {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to check if the current path is active
  const isActive = (path: string) => (pathname === path ? "bg-gray-300" : "");
  const handleLogout = async () => {
    // Remove token from cookies
    Cookies.remove("token");

    // Dispatch logout to clear Redux state
    dispatch(clearCredentials());
    await persistor.purge();

    // Redirect the user to the login page (or any other page)
    router.push("/signin");
  };

  return (
    <div className="border rounded-lg text-left w-full p-3">
      <h3 className="font-semibold text-[24px] pl-4 mb-5">My Account</h3>
      <ul className="space-y-3 lg:space-y-5">
        {/* Common Routes for All Users */}
        <li
          className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
            "/dashboard"
          )}`}
        >
          <Link href="/dashboard" className="" onClick={sheetClose}>
            Dashboard
          </Link>
        </li>
        <li
          className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
            "/my-profile"
          )}`}
        >
          <Link href="/my-profile" onClick={sheetClose}>
            My Profile
          </Link>
        </li>
        <li
          className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
            "/my-orders"
          )}`}
        >
          <Link href="/my-orders" onClick={sheetClose}>
            My Orders
          </Link>
        </li>
        <li
          className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
            "/saved-items"
          )}`}
        >
          <Link href="/saved-items" onClick={sheetClose}>
            Saved Items
          </Link>
        </li>

        <li
          className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
            "/chat-list"
          )}`}
        >
          <Link href="/chat-list" onClick={sheetClose}>
            Messages
          </Link>
        </li>

        {/* Seller-Specific Routes (visible only to sellers and admins) */}
        {(userData?.role === "seller" || userData?.role === "admin") && (
          <>
            <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/my-items"
              )}`}
            >
              <Link href="/my-items" onClick={sheetClose}>
                My Items
              </Link>
            </li>
            <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/add-items"
              )}`}
            >
              <Link href="/add-items" onClick={sheetClose}>
                Add Items
              </Link>
            </li>
            <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/seller/my-items"
              )}`}
            >
              <Link href="/seller/my-items" onClick={sheetClose}>
                Order for My Items
              </Link>
            </li>
          </>
        )}

        {/* Admin-Specific Routes (visible only to admins) */}
        {userData?.role === "admin" && (
          <>
            <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/add-category"
              )}`}
            >
              <Link href="/add-category" onClick={sheetClose}>
                Add Category
              </Link>
            </li>
            <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/all-category"
              )}`}
            >
              <Link href="/all-category" onClick={sheetClose}>
                All Categories
              </Link>
            </li>
            {/* <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                ""
              )}`}
            >
              <Link
                href="#"
                className={`font-[500] hover:bg-gray-100 py-3 px-10 rounded-md`}
                onClick={sheetClose}
              >
                New Users
              </Link>
            </li> */}
            {/* <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                ""
              )}`}
            >
              <Link
                href="#"
                className={`font-[500] hover:bg-gray-100 py-3 px-10 rounded-md`}
                onClick={sheetClose}
              >
                Dispute
              </Link>
            </li> */}
            {/* <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/"
              )}`}
            >
              <Link
                href="#"
                className={`font-[500] hover:bg-gray-100 py-3 px-10 rounded-md`}
                onClick={sheetClose}
              >
                Create Wallet
              </Link>
            </li> */}
            {/* <li
              className={`hover:bg-gray-100 py-3 px-10 rounded-md font-[500] ${isActive(
                "/"
              )}`}
            >
              <Link
                href="#"
                className={`font-[500] hover:bg-gray-100 py-3 px-10 rounded-md`}
                onClick={sheetClose}
              >
                All Users
              </Link>
            </li> */}
          </>
        )}
      </ul>

      <Separator className="w-full my-10" />

      {/* Common Logout and Delete Account */}
      <ul className="space-y-3 lg:space-y-6">
        {/* <li className="font-[500] hover:bg-gray-100 py-3 px-10 rounded-md">
          Delete Account
        </li> */}
        <li
          onClick={() => handleLogout()}
          className="font-[500] hover:bg-gray-100 py-3 px-10 rounded-md text-red-500 cursor-pointer"
        >
          Log out
        </li>
      </ul>
    </div>
  );
}
