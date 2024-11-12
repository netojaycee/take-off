// "use client";
// import React from "react";
// import { Order } from "@/types";
// import { columns } from "@/components/local/profile/categoryColumns";
// import { useGetAllCategoryQuery } from "@/redux/appData";
// import { category } from "@/types";

// import { DataTable } from "@/components/local/profile/data-table";
// import { Loader } from "lucide-react";

// export default function AllCategory() {
//   const { data, isLoading } = useGetAllCategoryQuery(undefined);
//   if (isLoading) {
//     return (
//       <div className="h-96 flex items-center justify-center">
//         {" "}
//         <Loader className="animate-spin" />
//       </div>
//     );
//   }
//   const categories = data.category;

//   return (
//     <div className="2xl:max-w-[1536px] mx-auto py-10">
//       <DataTable columns={columns} data={categories} />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
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
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        
        <Loader className="animate-spin" />
      </div>
    );
  }
  const categories = data.category as category[];
  console.log(categories)
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      <div className="flex flex-col gap-5">
        <div className=" flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">My Items</h2>
            <p className="text-xs md:text-sm text-gray-500 hidden md:block">
              Showing 12 results from total 240
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
          {categories && categories.map((category, index) => (
            <div key={index}>
              <CategoryCard data={category} profile />
            </div>
          ))}
        </div>
      </div>

      <PaginationComponent />
    </div>
  );
}
