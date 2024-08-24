import ProductCard from "@/components/local/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BestSellingItems() {
  return (
    <div className="flex flex-col gap-5 mt-10 mb-4">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">Best Selling Items</h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>

      <div className="flex justify-between gap-3 ">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      {/* <ProductCard /> */}
      </div>
    </div>
  );
}
