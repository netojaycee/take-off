import ProductCard from "@/components/local/ProductCard";
import Link from "next/link";
import React from "react";

export default function FeaturedItems() {
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">
          Features Items
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
       
        <ProductCard />
      </div>
    </div>
  );
}
