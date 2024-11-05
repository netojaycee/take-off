import ProductCard from "@/components/local/ProductCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewItemsProducts() {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">New Items</h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={"/products"}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}>
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  );
}
