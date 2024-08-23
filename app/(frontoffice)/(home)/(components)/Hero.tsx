import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[30px] font-[500] lg:w-[50%] mx-auto text-center">
        Simplify Your Journey: Sell and Earn Before You Takeoff
      </h2>
      <div className="mb-5 relative w-full h-[400px]">
        {" "}
        {/* Set a fixed height */}
        <Image
          src="/hero.jpeg"
          alt="food pic"
          layout="fill" // Use layout fill to cover the entire container
          objectFit="cover" // Ensures the image covers the container
          className="rounded-[30px]" // Remove w-full and h-full
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-45 rounded-[30px]"></div>
        <div className="absolute top-20 left-[70px] flex flex-col rounded-lg">
          <h2 className="text-white text-[20px] lg:text-[35px] w-[60%] font-bold mb-10">
            50% off on all home appliances
          </h2>
          <p className="text-white mb-10">Deals you don&apos;t want to miss</p>
          <Button className="bg-white text-black w-[30%]">Shop Now</Button>
        </div>
      </div>
    </div>
  );
}
