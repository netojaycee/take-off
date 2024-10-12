import ProductCard from "@/components/local/ProductCard";
import CustomCarousel from "@/components/local/CustomCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Cart() {
  const productData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
  }));
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-[16px] lg:text-2xl">Cart</h1>
        <div className="flex md:flex-row flex-col gap-4 md:gap-10">
          <div className="w-full md:w-3/4 flex flex-col gap-3">
            <div className="w-full flex items-center">
              <p className="w-[70%] font-bold">Item</p>
              <p className="w-[15%] font-bold">Price</p>
              <p className="w-[15%] font-bold text-right">Total</p>
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Separator className="my-4" />
                <div className="w-full flex h-[150px]">
                  <div className="w-[70%] ">
                    <div className="flex gap-2 w-full">
                      <div className="p-2 rounded-md h-[130px] w-[180px] bg-[#F2F2F2] flex items-center justify-center">
                        {" "}
                        <Image
                          src="/images/thumbnail2.png"
                          alt="Product Image"
                          width={120}
                          height={120}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h1 className="text-[14px] lg:text-[18px]">
                          Headphone
                        </h1>
                        <p className="text-[12px] lg:text-[16px] text-[#25252580] line-clamp-2 w-[80%]">
                          Brand new wireless Headphone, with noise cancelation,
                          pure bass sound for up 40 hours.
                        </p>
                        <p className="text-red-500 text-[10px] md:text-[14px]">
                          Out of stock
                        </p>
                        <div className="flex gap-2 m-1 items-center">
                          <Button className="text-black hover:text-white bg-gray-300 font-bold h-[30px]">
                            -
                          </Button>
                          1
                          <Button className="text-black hover:text-white bg-gray-300 font-bold h-[30px]">
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="w-[15%] text-[12px] lg:text-[18px]">
                    &#8358; 100
                  </p>
                  <div className="w-[15%] text-[12px] lg:text-[18px] ">
                    <div className="h-full w-full flex flex-col items-end">
                      <span className="">&#8358; 200</span>
                      <div className="flex flex-col h-[81%] items-end justify-end w-full">
                        <span className="font-bold cursor-pointer mb-6 mr-1 flex items-center gap-2 text-[12px] lg:text-[16px]">
                          Remove
                          <Trash className="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-3">
            <Card className="w-full h-auto px-3 py-8 flex flex-col justify-between bg-[#F2F2F2] shadow-md">
              {/* Card Header */}
              <CardHeader>
                <CardTitle className="text-[14px] lg:text-xl font-semibold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <Separator className="my-2 " />

              {/* Card Content */}
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#252525] text-[12px] lg:text-[14px]">
                      Headphone
                    </span>
                    <span>$200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#252525] text-[12px] lg:text-[14px]">
                      iPhone 12 Pro Max
                    </span>
                    <span>$400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#252525] text-[12px] lg:text-[14px]">
                      PlayStation 4 Controller
                    </span>
                    <span>$90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#252525] text-[12px] lg:text-[14px]">
                      ASUS Zenbook
                    </span>
                    <span className="">$200</span>
                  </div>
                  <Separator className="my-2 " />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$200</span>
                  </div>
                </div>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="flex justify-end">
                <Button className="w-full">Checkout</Button>
              </CardFooter>
            </Card>{" "}
          </div>
        </div>
      </div>
      <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
        <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
          You may also like
        </h1>
        <CustomCarousel
          items={productData}
          renderCard={() => <ProductCard />}
          carouselOpts={{
            align: "start",
            loop: true,
          }}
        />
      </div>
    </>
  );
}
