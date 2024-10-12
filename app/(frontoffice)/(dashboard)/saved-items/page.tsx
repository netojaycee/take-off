import React from "react";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SavedItems() {
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center">
          <p className="w-[70%] font-bold">Item</p>
          <p className="w-[30%] font-bold text-right">Price</p>
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
                    <h1 className="text-[14px] lg:text-[18px]">Headphone</h1>
                    <p className="text-[12px] lg:text-[16px] text-[#25252580] line-clamp-2 w-[80%]">
                      Brand new wireless Headphone, with noise cancelation, pure
                      bass sound for up 40 hours.
                    </p>
                    <p className="text-red-500 text-[10px] md:text-[14px]">
                      Out of stock
                    </p>
                    <div className="flex gap-2 m-1 items-center">
                      <Button variant={"outline"} className="flex items-center">
                        Add to Cart <ShoppingCart className="" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[30%] text-[12px] lg:text-[18px] ">
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
    </div>
  );
}
