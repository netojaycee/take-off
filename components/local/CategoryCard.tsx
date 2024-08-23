import Image from "next/image";
import React from "react";

export default function CategoryCard() {
  return (
    <div className="flex flex-col max-w-[175px]">
      <div className="bg-[#F6F6F6] p-5">
        <Image src="/electronic-category.png" alt="" width={134} height={104} />
      </div>
      <p className="text-center my-[2px]">Electronics</p>
    </div>
  );
}
