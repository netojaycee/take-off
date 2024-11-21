"use client";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CustomDialog } from "./profile/CustomDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryCard({
  profile,
  data,
  isLoading,
}: {
  profile?: boolean;
  isLoading: boolean;
  data?: any;
}) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col ">
      <Link
        href={isLoading ? "#" : `/products?category=${data?._id}`}
        className="bg-[#F6F6F6] p-2 w-full h-[85px] md:h-[176px] rounded-lg"
      >
        {isLoading ? (
          <Skeleton className="w-full h-full object-contain bg-gray-400" />
        ) : (
          <Image
            src={data.thumbnail?.url || "/images/electronic-category.png"}
            alt={data.name || "Category Image"}
            width={154}
            height={150}
            className="object-contain object-center w-full h-full"
            quality={95}
            priority
          />
        )}
      </Link>

      <div
        className={`flex ${
          profile ? "justify-between" : "justify-center"
        } items-center`}
      >
        {isLoading ? (
          <Skeleton className="w-3/4 h-4 bg-gray-400 my-[2px]" />
        ) : (
          <p className="text-center my-[2px] text-[10px] md:text-[16px]">
            {data?.name}
          </p>
        )}

        {profile && (
          <div className="flex gap-4 items-center">
            {isLoading ? (
              <>
                <Skeleton className="w-5 h-5 bg-gray-400" />
                <Skeleton className="w-5 h-5 bg-gray-400" />
              </>
            ) : (
              <>
                <SquarePen
                  onClick={() => router.push(`/all-category/${data._id}`)}
                  className="w-5 h-5 cursor-pointer"
                />
                <Trash
                  onClick={() => setDialogOpen(true)}
                  className="w-5 h-5 cursor-pointer text-red-500"
                />
              </>
            )}
          </div>
        )}
      </div>

      <CustomDialog
        open={isDialogOpen}
        onOpenChange={(open) => setDialogOpen(open)}
        title={"category"}
        data={data}
      />
    </div>
  );
}
