import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <div className="border rounded-lg text-left w-full">
      <h3 className="font-semibold text-[24px] pl-4 mb-5">My Account</h3>
      <ul className="space-y-5">
        <li>
          {" "}
          <Link
            href="/my-profile"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Dashboard
          </Link>
        </li>{" "}
        <li>
          {" "}
          <Link
            href="/my-orders"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            My Order
          </Link>
        </li>
        <li>
          <Link
            href="/saved-items"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Saved Items
          </Link>
        </li>
        <li>
          <Link
            href="/my-items"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            My Items
          </Link>
        </li>
        <li>
          <Link
            href="/add-items"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Add Items
          </Link>
        </li>
        <li>
          <Link
            href="add-category"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Add Category
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            New Users
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Dispute
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            Create Wallet
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md"
          >
            All Users
          </Link>
        </li>
      </ul>

      <Separator className="w-full my-10" />

      <ul className="space-y-6">
        <li className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md">
          Delete Account
        </li>
        <li className="font-semibold hover:bg-gray-100 py-3 px-10 rounded-md">
          Log out
        </li>
      </ul>
    </div>
  );
}
