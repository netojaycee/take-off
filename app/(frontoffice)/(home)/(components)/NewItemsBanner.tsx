import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewItemsBanner() {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">New Items</h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 w-full justify-around">
          <Image
            src="/images/Frame1.png"
            alt=""
            className="lg:w-[40%] lg:h-full lg:object-fill"
            width={370}
            height={495}
          />
          <Image
            src="/images/Frame2.png"
            alt=""
            className="lg:w-[40%] lg:h-full lg:object-v"
            width={370}
            height={495}
          />
          <Image
            src="/images/Frame3.png"
            alt=""
            className="hidden md:block lg:w-[40%] lg:h-full lg:object-fill"
            width={370}
            height={495}
          />
        </div>
        <div className=" w-full">
  <Image
    src="/images/Frame4.png"
    alt=""
    className="lg:w-full lg:h-full "
    width={1160}
    height={495}
  />
</div>

      </div>
    </div>
  );
}
