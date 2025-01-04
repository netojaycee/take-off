"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Rating as ReactRating } from "@smastrom/react-rating";
import * as React from "react";
import { Product } from "@/types";

export default function ViewItem({
  isEditing,
  setIsEditing,
  data,
  isLoading,
}: {
  data: Product;
  isEditing: boolean;
  isLoading: boolean;
  setIsEditing: Function;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(data?.thumbnail); // Main image state

  React.useEffect(() => {
    if (data) {
      // Map through the images array to extract URLs

      setSelectedImage(data?.thumbnail);
    }
  }, [data]);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
      {/* Left side with main image and thumbnails */}
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="w-full h-[350px] mb-4 bg-[#F2F2F2] rounded-md shadow-md p-4 flex items-center justify-center">
          <Image
            src={selectedImage}
            alt="Product Image"
            width={450}
            height={450}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex gap-4">
          {data?.images.slice(1).map((image, index) => (
            <div
              key={index}
              className="cursor-pointer w-[100px] h-[100px] bg-[#F2F2F2] rounded-md shadow-md p-2"
              onClick={() => setSelectedImage(image?.url)}
            >
              <Image
                src={image?.url}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right side with product information */}
      <div className="w-full md:w-1/2 flex flex-col">
        <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
          {data?.name}
        </h1>
        <span className="flex items-center gap-2">
          <ReactRating style={{ maxWidth: 100 }} value={3} readOnly />

          <p className="text-sm text-gray-500">(38 Customer reviews)</p>
        </span>
        <p className="text-base mt-2 text-[#25252580] line-clamp-6">
          {data?.description}
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
            <p className="font-semibold md:text-[18px]">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(data?.price)}{" "}
            </p>
          </div>{" "}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold">Categories:</p>
            <p className="font-semibold md:text-[16px]">{data?.categoryName}</p>
          </div>{" "}
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-semibold">Current Status:</p>
            <p
              className={`${
                !data?.inStock ? "text-red-500" : "text-green-300"
              } font-semibold`}
            >
              {!data?.inStock ? "Out of stock" : "In stock"}
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)}>Edit Item</Button>
        </div>
      </div>
    </div>
  );
}
