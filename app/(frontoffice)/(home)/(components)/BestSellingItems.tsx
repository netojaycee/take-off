import CustomCarousel from "@/components/local/CustomCarousel";
import ProductCard from "@/components/local/ProductCard";
import { Product } from "@/types";
import Link from "next/link";
import React from "react";

export default function BestSellingItems({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  // Limit products to the first 5 for the carousel
  const productData = isLoading ? Array(5).fill({}) : products?.slice(0, 7);

  return (
    <div className="flex flex-col gap-5 mt-10 mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[600]">
          Best Selling Items
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={"/products"}>
          See more
        </Link>
      </div>

      <CustomCarousel
        items={productData}
        renderCard={(product: Product, index: number) => (
          <ProductCard
            key={product.id || index}
            data={product}
            isLoading={isLoading}
          />
        )}
        carouselOpts={{
          align: "start",
          loop: true,
        }}
      />
    </div>
  );
}
