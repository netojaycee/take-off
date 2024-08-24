"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="lg:text-[30px] text-[20px] font-[600] w-[70%] md:w-[50%] mx-auto text-center">
        Simplify Your Journey: Sell and Earn Before You Takeoff
      </h2>

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={3000}
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-5 relative w-full h-[400px]">
            <Image
              src="/hero.jpeg"
              alt=""
              className="rounded-[30px] w-full h-full lg:object-cover"
              width={370}
              height={495}
              loading="lazy"
            />
            {/* Black overlay */}
            <div className="absolute inset-0 bg-black opacity-45 rounded-[30px]"></div>
            <div className="absolute top-20 left-[70px] rounded-lg flex flex-col gap-10 justify-start items-start">
              <h2 className="text-white text-[20px] lg:text-[35px] font-bold text-left">
                50% off on all home <br />appliances
              </h2>
              <p className="text-white">Deals you don&apos;t want to miss</p>
              <Button className="bg-white text-black w-[30%]">Shop Now</Button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
