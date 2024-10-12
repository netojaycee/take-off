import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CategoryCard() {
  return (
    <Link href={`/products?category=electronics`} className="flex flex-col">
      <div className="bg-[#F6F6F6] p-5 flex items-center justify-center">
        <Image src="/images/electronic-category.png" alt="" width={150} height={120} className="object-cover w-full" />
      </div>
      <p className="text-center my-[2px]">Electronics</p>
    </Link>
  );
}
