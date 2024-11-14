"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import ProductCard from "@/components/local/ProductCard";
import PaginationComponent from "@/components/local/Pagination";
import { Loader } from "lucide-react";
import { useGetAllProductQuery } from "@/redux/appData";
import { Product } from "@/types";

export default function MyItems() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 15;

  const { data, isLoading, error } = useGetAllProductQuery(undefined);

  const products: Product[] = data && data;

  const totalPages = Math.ceil(products?.length / itemsPerPage);

  // Get items for the current page
  const currentProducts =
    products &&
    products.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <div className="">
            <select className="border rounded px-2 py-1">
              <option value="">Filter</option>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="low-to-high">Price: Lowest to Highest</option>
              <option value="high-to-low">Price: Highest to Lowest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {error && (
            <div className="">{JSON.stringify(error)} NO Products FOUND</div>
          )}
          {!isLoading && currentProducts
            ? currentProducts.map((product, index) => (
                <div key={index}>
                  <ProductCard data={product} profile isLoading={isLoading} />
                </div>
              ))
            : Array.from({ length: itemsPerPage }).map((_, index) => (
                <ProductCard data={""} key={index} isLoading={true} profile />
              ))}
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />{" "}
    </div>
  );
}
