import ProductCard from "@/components/local/ProductCard";
import { Product } from "@/types";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewItemsProducts({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-5 mt-10">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">New Items</h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={"/products"}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCard data={""} key={index} isLoading={true} />
            ))
          : products &&
            products.slice(0, 8).map((product, index) => (
              <div key={index}>
                <ProductCard isLoading={isLoading} data={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
