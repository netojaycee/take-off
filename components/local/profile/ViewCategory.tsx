"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { category } from "@/types";
import * as React from "react";

export default function ViewCategory({
  isEditing,
  setIsEditing,
  data,
  isLoading,
}: {
  data: category;
  isEditing: boolean;
  setIsEditing: Function;
  isLoading: boolean;
}) {
  return (
    <div>
      <div className="flex gap-3 flex-col md:w-[85%] mx-auto items-center">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative cursor-pointer">
            <div className="w-[250px] h-[200px]">
              {isLoading ? (
                <Skeleton className="w-full h-full object-contain bg-gray-400" />
              ) : (
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
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex-col flex gap-5">
          <div className="space-y-3">
            {isLoading ? (
              <Skeleton className="w-3/4 h-6 bg-gray-400" />
            ) : (
              <h1 className="text-[16px] md:text-[20px] lg:text-2xl font-bold">
                {data.name}
              </h1>
            )}
          </div>

          <div className="w-full">
            {isLoading ? (
              <Skeleton className="w-[100px] h-10 bg-gray-400" />
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Item</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
