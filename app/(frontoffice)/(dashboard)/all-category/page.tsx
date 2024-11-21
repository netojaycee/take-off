"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import ProductCard from "@/components/local/ProductCard";
import PaginationComponent from "@/components/local/Pagination";
import CategoryCard from "@/components/local/CategoryCard";
import { Loader } from "lucide-react";
import { useGetAllCategoryQuery } from "@/redux/appData";
import { category } from "@/types";

export default function AllCategory() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const { data, isLoading, error } = useGetAllCategoryQuery(undefined);
 

  const categories = data?.category as category[];
  const totalPages = Math.ceil(categories?.length / itemsPerPage);

  // Get items for the current page
  const currentCategories =
    categories &&
    categories.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(categories);
  const totalPerPage =
    categories && categories?.length < 15 ? categories?.length : 15;

  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      <div className="flex flex-col gap-5">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block">
              Showing {currentCategories?.length} results from total{" "}
              {categories && categories?.length}
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

        <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
          {error && (
            <div className="">{JSON.stringify(error)} NO CATEGORIES FOUND</div>
          )}
          {isLoading
            ? Array.from({ length: 12 }).map((_, index) => (
                <CategoryCard  key={index} isLoading={true} />
              ))
            : currentCategories &&
              currentCategories.map((category, index) => (
                <div key={index}>
                  <CategoryCard isLoading={isLoading} data={category} profile />
                </div>
              ))}
        </div>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
