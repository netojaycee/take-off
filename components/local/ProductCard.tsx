import Image from "next/image";
import React from "react";
import { BiSolidCart } from "react-icons/bi";

export default function ProductCard() {
  return (
    <div className="flex flex-col max-w-[270px]">
      <div className="bg-[#F6F6F6] p-5">
        <Image src="/blender.png" alt="" width={209} height={104} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-[12px] md:text-[14px] text-black font-semibold">Gourgini Blender</h2>
          <h2 className="text-[7px] md:text-[12px] text-[rgba(37, 37, 37, 0.63)]"> $100</h2>
        </div>
        <BiSolidCart className="w-3 h-3 md:w-5 md:h-5" />
      </div>
    </div>
  );
}
