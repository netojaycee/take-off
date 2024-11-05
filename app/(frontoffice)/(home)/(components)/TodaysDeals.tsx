import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TodaysDeals() {
  return (
    <div className="flex flex-col gap-5 mt-10 mb-2">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">
          Today&apos;s Deals
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>

      <div className="flex md:flex-row flex-col items-center gap-3 lg:gap-[60px] w-full  ">
        <div className="bg-[#252525] flex justify-between w-full lg:w-1/2 pt-10 h-[240px] rounded-md">
          <div className="pl-5 lg:pl-10 flex flex-col gap-5">
            <h2 className="text-white text-[20px] font-[600] w-[80%]">
              Fireman Generator
            </h2>
            <p className="text-white text-[14px]"> Deal: 50% Off Shop Now</p>
            <Button asChild className="bg-white text-black w-[70%] hover:text-white">
        <Link href={"/products"}> Shop Now</Link>
            </Button>
          </div>
          <Image src="/images/generator.png" alt="" width={270} height={236} />
        </div>

        <div className="bg-[#8AB9CD] flex justify-between w-full lg:w-1/2 pt-10 h-[240px] rounded-md">
          <div className="pl-5 lg:pl-10 flex flex-col gap-5">
            <h2 className="text-white text-[20px] font-[600] w-[80%]">
              Bosch Fruit Juicier{" "}
            </h2>
            <p className="text-white text-[14px]"> Deal: 50% Off Shop Now</p>
            <Button className="bg-white text-black w-[70%] hover:text-white">
              Shop Now
            </Button>
          </div>
          <Image src="/images/juicer.png" alt="" width={270} height={236} />
        </div>
      </div>
    </div>
  );
}
