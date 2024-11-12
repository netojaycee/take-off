"use client";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CustomDialog } from "./profile/CustomDialog";

export default function CategoryCard({
  profile,
  data,
}: {
  profile?: boolean;
  data: any;
}) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = React.useState(false);
// console.log(data.thumbnail.url)
  return (
    <div className="flex flex-col w-[177px]">
      <Link
        href={`/products?category=${data.slug}`} // Using dynamic category
        className="bg-[#F6F6F6] p-2 w-full h-[176px] rounded-lg" // Fixed size and padding for consistency
      >
        <Image
                  // src={"/images/head.png"}

          src={data.thumbnail.url || "/images/electronic-category.png"}
          alt={data.name || "category Image"}
          width={154} // Reduced size for better fit inside container
          height={150} // Keep proportional
          className="object-contain object-center w-full h-full max-w-full max-h-full" // Ensures image fits within box without cropping
          quality={95}
          priority
        />
      </Link>

      <div
        className={`flex 
        ${profile ? "justify-between" : "justify-center"}  items-center`}
      >
        <p className="text-center my-[2px]">{data?.name}</p>

        {profile && (
          <div className="flex gap-4 items-center">
            <SquarePen
              onClick={() => router.push(`/all-category/${data._id}`)}
              className="w-5 h-5 cursor-pointer"
            />
            <Trash
              onClick={() => setDialogOpen(true)}
              className="w-5 h-5 cursor-pointer text-red-500"
            />
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
