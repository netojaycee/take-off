"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidCart } from "react-icons/bi";
import { SquarePen, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({ profile }: { profile?: boolean }) {
  const router = useRouter();
  return (
    <div className="flex flex-col  ">
      {/* <Link href={`/products/${id}`} className="bg-[#F6F6F6] p-5"> */}
      <Link
        href={`/products/fhsjhd`}
        className="bg-[#F6F6F6] p-5 flex items-center justify-center"
      >
        <Image
          src="/images/blender.png"
          alt=""
          width={209}
          height={104}
          className="w-[60%] object-contain"
        />
      </Link>
      <div className="flex justify-between items-center p-1">
        <div className="flex flex-col">
          <h2 className="text-[10px] md:text-[14px] text-black font-semibold line-clamp-1 overflow-hidden">
            Gourgini Blender
          </h2>
          <h2 className="text-[8px] md:text-[12px] text-[rgba(37, 37, 37, 0.63)]">
            $100
          </h2>
        </div>
        {profile ? (
          <SquarePen
            onClick={() => router.push(`/my-items/jdhsjhdjs`)}
            className="w-5 h-5 cursor-pointer"
          />
        ) : (
          <ShoppingCart             onClick={() => router.push(`/cart`)}
           className="w-7 h-7 cursor-pointer" />
        )}
      </div>
    </div>
  );
}
