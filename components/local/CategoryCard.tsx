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

  return (
    <div className="flex flex-col">
      <Link
        href={`/products?category=electronics`}
        className="bg-[#F6F6F6] p-5 flex items-center justify-center"
      >
        <Image
          src="/images/electronic-category.png"
          alt=""
          width={150}
          height={120}
          className="object-cover w-full"
        />
      </Link>

      <div
        className={`flex 
        ${profile ? "justify-between" : "justify-center"}  items-center`}
      >
        <p className="text-center my-[2px]">Electronics</p>

        {profile && (
          <div className="flex gap-4 items-center">
            <SquarePen
              onClick={() => router.push(`/all-category/jdhsjhdjs`)}
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
