import CategoryCard from "@/components/local/CategoryCard";
import Link from "next/link";
import React from "react";

export default function Categories() {
  return (
    <div className="flex flex-col gap-5">
      <div className=" flex items-center justify-between">
        <h2 className="text-[#252525] text-[20px] font-[500]">
          Products Categories
        </h2>
        <Link className="text-[rgba(37, 37, 37, 0.5)]" href={""}>
          See more
        </Link>
      </div>

      <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <CategoryCard />
          </div>
        ))}
      </div>
    </div>
  );
}
