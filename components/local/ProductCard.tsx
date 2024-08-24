import Image from "next/image";
import React from "react";
import { BiSolidCart } from "react-icons/bi";

export default function ProductCard() {
  return (
    <div className="flex flex-col ">
      <div className="bg-[#F6F6F6] p-5">
        <Image
          src="/blender.png"
          alt=""
          width={209}
          height={104}
          className="w-[210px] h-[160px] object-contain"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-[10px] md:text-[14px] text-black font-semibold line-clamp-1 overflow-hidden">
            Gourgini Blender
          </h2>
          <h2 className="text-[8px] md:text-[12px] text-[rgba(37, 37, 37, 0.63)]">
            {" "}
            $100
          </h2>
        </div>
        <BiSolidCart className="w-6 h-6" />
      </div>
    </div>
  );
}
