"use client";
import ProductCard from "@/components/local/ProductCard";
import { useGetAllProductFeaturedQuery } from "@/redux/appData";
import { Product } from "@/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FeaturedItems({
  isLoading, products
}: {isLoading: boolean, products: Product[]}) {
  // const { data, isLoading } = useGetAllProductFeaturedQuery(undefined);

  // const categories = data.category as category[];
  // const products = data as Product[];
  console.log(products);
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">
          Featured Items
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={"/products"}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductCard key={index} isLoading={true} />
            ))
          : products &&
            products.slice(0, 4).map((product, index) => (
              <div key={index}>
                <ProductCard isLoading={isLoading} data={product} />
              </div>
            ))}
      </div>
    </div>
  );
}
