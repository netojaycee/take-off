"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Rating as ReactRating } from "@smastrom/react-rating";
import * as React from "react";
import { category } from "@/types";

export default function ViewCategory({
  isEditing,
  setIsEditing,
  data,
}: {
  data: category;
  isEditing: boolean;
  setIsEditing: Function;
}) {
  return (
    <div>
      <div className="flex gap-3 flex-col md:w-[85%] mx-auto items-center">
        <div className="flex flex-col gap-4 w-full ">
          <div className="relative cursor-pointer">
            <div className="w-[250px] h-[200px]">
              <Image
                src={
                  data.thumbnail.url ||
                  "https://via.placeholder.com/250x200.png?text=Click+to+upload+image"
                }
                alt="Profile Preview"
                width={150}
                height={120}
                className="object-contain w-full h-full rounded-lg bg-gray-400 p-1"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex-col flex gap-5">
          {/* Other form fields */}
          <div className="space-y-3 ">
            <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
              {data.name}
            </h1>
          </div>

          <div className="w-full">
            <Button onClick={() => setIsEditing(true)}>Edit Item</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
