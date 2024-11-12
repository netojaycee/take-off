import CategoryCard from "@/components/local/CategoryCard";
import { useGetAllCategoryQuery } from "@/redux/appData";
import { category } from "@/types";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Categories() {
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  const categories = data.category as category[];
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[500]">
          Products Categories
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={"/products"}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories &&
          categories.map((category, index) => (
            <div key={index}>
              <CategoryCard data={category} />
            </div>
          ))}
      </div>
    </div>
  );
}
