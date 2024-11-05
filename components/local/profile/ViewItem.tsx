"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Rating as ReactRating } from "@smastrom/react-rating";
import * as React from "react";

export default function ViewItem({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: Function;
}) {
  const [selectedImage, setSelectedImage] = useState("/images/thumbnail1.png"); // Main image state
  const thumbnails = [
    "/images/thumbnail1.png",
    "/images/thumbnail2.png",
    "/images/thumbnail3.png",
    "/images/thumbnail4.png",
  ];

  const [rating, setRating] = useState(3);
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
      {/* Left side with main image and thumbnails */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="w-full h-auto mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
          <Image
            src={selectedImage}
            alt="Product Image"
            width={450}
            height={450}
            className="object-cover"
          />
        </div>
        <div className="flex gap-4">
          {thumbnails
            .filter((thumbnail) => thumbnail !== selectedImage) // Exclude the selected image
            .map((thumbnail, index) => (
              <div
                key={index}
                className="cursor-pointer w-[100px h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
                onClick={() => setSelectedImage(thumbnail)}
              >
                <Image
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
            ))}
        </div>
      </div>

      {/* Right side with product information */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
          JBL Headphone
        </h1>
        <span className="flex items-center gap-2">
          <ReactRating
            style={{ maxWidth: 100 }}
            value={rating}
            onChange={setRating}
          />

          <p className="text-sm text-gray-500">(38 Customer reviews)</p>
        </span>
        <p className="text-base mt-2 text-[#25252580] line-clamp-6">
          Lorem ipsum dolor sit amet consectetur. At sagittis lacinia auctor
          vitae. Enim risus pellentesque sapien amet aliquam venenatis. Massa
          sed mattis id risus volutpat. Eget at ac cursus ut viverra. Enim at id
          amet viverra sed. Pharetra nullam lorem ut potenti neque nulla.
          Gravida est arcu penatibus purus enim sodales at.
        </p>
        <Separator className="my-4" />

        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold"> Date :</p>
            <p className="font-semibold md:text-[14px] text-right">
              April 6th, 2024 by 3:34:07 pm{" "}
            </p>{" "}
          </div>{" "}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold">Price:</p>
            <p className="font-semibold md:text-[18px]">$250 </p>
          </div>{" "}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold">Categories:</p>
            <p className="font-semibold md:text-[16px]"> Electronics and Audio</p>
          </div>{" "}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold">Current Status:</p>
            <p className="text-red-500 font-semibold md:text-[16px]">
              Out of stock
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)}>Edit Item</Button>
        </div>
      </div>
    </div>
  );
}
