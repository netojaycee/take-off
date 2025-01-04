"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import ProductCard from "@/components/local/ProductCard";
import PaginationComponent from "@/components/local/PaginationComponent";
import { Loader } from "lucide-react";
import { useGetUserProductsQuery } from "@/redux/appData";
import { Product } from "@/types";
import NoItemFound from "@/components/local/NoItemFound";

export default function MyItems() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const { data, isLoading, error } = useGetUserProductsQuery(
    {
      page,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const currentProducts: Product[] = data ? data?.result : [];

  const totalPages = (data && data.pagination.totalPages) || 1;
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const products: Product[] = data && data;

  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      <div className="flex flex-col gap-5">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">My Items</h2>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block">
              Showing {currentProducts?.length} results from total{" "}
              {products && products?.length}{" "}
            </p>
          </div>
          {/* <div className="">
            <select className="border rounded px-2 py-1">
              <option value="">Filter</option>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="low-to-high">Price: Lowest to Highest</option>
              <option value="high-to-low">Price: Highest to Lowest</option>
            </select>
          </div> */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Handle error state */}
          {/* {error ? (
            <NoItemFound title1="" title2="" />
          ) :  */}
          {isLoading ? (
            /* Render loading skeletons while data is being fetched */
            Array.from({ length: limit }).map((_, index) => (
              <ProductCard key={index} isLoading={true} profile />
            ))
          ) : currentProducts && currentProducts.length > 0 ? (
            /* Render products if data is available */
            currentProducts.map((product, index) => (
              <div key={index}>
                <ProductCard data={product} profile isLoading={isLoading} />
              </div>
            ))
          ) : (
            /* Handle empty product state */
            <div className="flex items-center justify-center h-[283px] w-full">
              <NoItemFound
                title1="No products found"
                title2="Add products to your store"
              />
            </div>
          )}
        </div>
      </div>
      <PaginationComponent
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        onPageChange={handlePageChange}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
