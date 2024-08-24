import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BestSellingElec() {
  return (
    <div className="flex flex-col gap-5 mt-10 mb-2">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">
          Best Selling Electronics
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>
      <div className="flex md:flex-row flex-col items-center gap-3 lg:gap-[50px] w-full  ">
        <div className="bg-[#FFBABA] flex justify-between w-full lg:w-1/2 pt-10 h-[240px] rounded-md">
          <div className="pl-5 lg:pl-10 flex flex-col gap-5">
            <h2 className="text-white text-[18px] lg:text-[20px] font-[600] w-[80%]">
            Magic Bullet Blender
                       </h2>
            <p className="text-white text-[12px] lg:text-[14px]">
            Selling for just <span className="text-red-500">$120</span>
            </p>
            <Button className="bg-white text-black w-[70%] hover:text-white">
              Shop Now
            </Button>
          </div>
          <Image src="/magic.png" alt="" width={270} height={236} />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full lg:w-1/2">
          <div className="bg-[#F2F2F2] flex justify-between items-center  h-[140px] md:h-[120px] rounded-md">
            <div className="pl-5 lg:pl-10 flex flex-col gap-1">
            <h2 className="text-black text-[15px] font-[600] w-[60%]">
                JBL Headphone
              </h2>
              <p className="text-black text-[10px]">
                {" "}
                Selling for just <span className="text-red-500">$120</span>{" "}
              </p>
              <Button className="bg-white text-black w-[70%] hover:text-white text-xs">
                Shop Now
              </Button>
            </div>
            <Image src="/headset.png" alt="" width={60} height={236} />
          </div>
          <div className="bg-[#F2F2F2] flex justify-between items-center   h-[140px] md:h-[120px] rounded-md">
            <div className="pl-5 lg:pl-10 flex flex-col gap-1">
            <h2 className="text-black text-[15px] font-[600] w-[60%]">
                JBL Headphone
              </h2>
              <p className="text-black text-[10px]">
                {" "}
                Selling for just <span className="text-red-500">$120</span>{" "}
              </p>
              <Button className="bg-white text-black w-[70%] hover:text-white text-xs">
                Shop Now
              </Button>
            </div>
            <Image src="/headset.png" alt="" width={60} height={236} />
          </div>

          <div className="bg-[#F2F2F2] flex justify-between items-center   h-[140px] md:h-[120px] rounded-md">
            <div className="pl-5 lg:pl-10 flex flex-col gap-1">
              <h2 className="text-black text-[15px] font-[600] w-[60%]">
                JBL Headphone
              </h2>
              <p className="text-black text-[10px]">
                {" "}
                Selling for just <span className="text-red-500">$120</span>{" "}
              </p>
              <Button className="bg-white text-black w-[70%] hover:text-white text-xs">
                Shop Now
              </Button>
            </div>
            <Image src="/headset.png" alt="" width={60} height={236} />
          </div>

          <div className="bg-[#F2F2F2] flex justify-between items-center   h-[140px] md:h-[120px] rounded-md">
            <div className="pl-5 lg:pl-10 flex flex-col gap-1">
              <h2 className="text-black text-[15px] font-[600] w-[60%]">
                JBL Headphone
              </h2>
              <p className="text-black text-[10px]">
                {" "}
                Selling for just <span className="text-red-500">$120</span>{" "}
              </p>
              <Button className="bg-white text-black w-[70%] hover:text-white text-xs">
                Shop Now
              </Button>
            </div>
            <Image src="/headset.png" alt="" width={60} height={236} />
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
