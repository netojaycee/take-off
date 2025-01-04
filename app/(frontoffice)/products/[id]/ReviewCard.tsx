import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Reviews } from "@/types";
import { Rating as ReactRating } from "@smastrom/react-rating";
import Image from "next/image";
import React from "react";

export default function ReviewCard({
  isLoading,
  
  review,
}: {
  isLoading: boolean;
  review: Reviews;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Skeleton className="bg-gray-400 w-[50px] h-[50px] rounded-full" />
          ) : (
            <Image
              src={review?.image || "/images/shape.png"}
              alt={review?.user}
              width={50}
              height={50}
              className="object-cover bg-gray-400 rounded-full"
            />
          )}
          <div className="flex flex-col gap-2">
            {isLoading ? (
              <Skeleton className="bg-gray-400 w-[120px] h-6" />
            ) : (
              <p className="font-semibold">{review?.user}</p>
            )}
            {isLoading ? (
              <Skeleton className="bg-gray-400 w-[100px] h-4" />
            ) : (
              <ReactRating style={{ maxWidth: 100 }} readOnly value={review?.rating} />
            )}
          </div>
        </div>
        {isLoading ? (
          <Skeleton className="bg-gray-400 w-[80px] h-6" />
        ) : (
          <p>16 July, 2024</p>
        )}
      </div>
      {isLoading ? (
        <Skeleton className="bg-gray-400 w-full h-5" />
      ) : (
        <p className="text-[12px] md:text-[14px] lg:text-[16px] text-gray-500">
         {review?.content}
        </p>
      )}
      <Separator className="my-4" />
    </div>
  );
}
