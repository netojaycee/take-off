"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Rating as ReactRating } from "@smastrom/react-rating";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselOptions,
} from "@/components/ui/carousel";

export default function Sell() {
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] space-y-5 md:space-y-10">
      <div className="relative h-[160px] md:h-[400px] w-full">
        <Image
          src="/images/sell-cart.jpg"
          alt=""
          className=" w-full h-full object-cover object-bottom" // Add 'lg:object-top' here
          width={370}
          height={470}
          loading="lazy"
        />
        <div className="absolute top-1/3 left-5 md:left-10 space-y-3 md:space-y-6">
          <p className="text-white text-[14px] md:text-3xl lg:text-4xl font-[500]">
            Sell on Takeoff Trade
          </p>
          <Button
            asChild
            size="sm"
            className=" bg-white text-black hover:bg-opacity-65 hover:bg-white"
          >
            <Link href="/seller-registration">Sell Now</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-5 md:space-y-10">
        <h2 className="text-center font-[500] md:text-3xl">How it Works</h2>

        <div className="flex flex-col md:flex-row items-center gap-5 lg:gap-10">
          <div className="border-2 p-4 space-y-5">
            <h2 className="font-[600] md:text-xl">Step 1</h2>
            <p className="font-normal md:text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>

          <div className="border-2 p-4 space-y-5">
            <h2 className="font-[600] md:text-xl">Step 2</h2>
            <p className="font-normal md:text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>

          <div className="border-2 p-4 space-y-5">
            <h2 className="font-[600] md:text-xl">Step 3</h2>
            <p className="font-normal md:text-[16px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <Testimonial />
      </div>
      <Separator />
      <div className="flex items-center justify-center w-full">
        <Button asChild variant="default" className="px-10 md:px-20">
          <Link href="/seller-registration">Start Selling</Link>
        </Button>
      </div>
    </div>
  );
}

function Testimonial() {
  const [rating, setRating] = React.useState(4);
  const carouselOpts = {
    align: "start",
    loop: true,
  } as CarouselOptions;

  return (
    // <Carousel className="w-full max-w-md">
    <Carousel
      customControls={true}
      controlAlignment="right"
      opts={carouselOpts}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex md:flex-row flex-col items-center gap-5 lg:gap-10 p-4">
              <div className="h-full w-full">
                <Image
                  src="/images/testimonial.png"
                  alt="Testimonial"
                  className="w-full h-full object-cover object-bottom"
                  width={370}
                  height={470}
                  loading="lazy"
                />
              </div>
              <div className="space-y-5">
                <ReactRating
                  style={{ maxWidth: 100 }}
                  value={rating}
                  onChange={setRating}
                  readOnly
                />
                <p className="text-gray-600">
                  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique. Duis
                  cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                  commodo diam libero vitae erat.&quot;
                </p>
                <div className="space-y-1">
                  <p className="font-semibold text-lg">Name Surname</p>
                  <p className="font-medium text-md text-gray-500">
                    Position, Company Name
                  </p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
