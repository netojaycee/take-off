import PaginationComponent from "@/components/local/Pagination";
import ProductCard from "@/components/local/ProductCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import Hero from "../(home)/(components)/Hero";

export default function Products() {
  return (
    <>
    <Hero />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/4 md:flex flex-col gap-4 hidden">
          {/* Categories */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                Electronics <FaAngleRight />{" "}
              </li>
              <li className="flex justify-between items-center">
                Automobiles <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Appliances <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Computing <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Fashion <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Gaming <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Phones and Tablets <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Furniture <FaAngleRight />
              </li>
              <li className="flex justify-between items-center">
                Others <FaAngleRight />
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Brands</h3>
            <ul className="space-y-2">
              <li>Samsung</li>
              <li>Panasonic</li>
              <li>Hisense</li>
              <li>Sony</li>
              <li>LG</li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Price</h3>
            <ul className="space-y-2">
              <li>$100 - $200</li>
              <li>$300 - $400</li>
              <li>$400 - $500</li>
              <li>$1000 - $5000</li>
            </ul>
          </div>

          {/* Location */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Location</h3>
            <ul className="space-y-2">
              <li>Ibadan</li>
              <li>Lagos</li>
              <li>Benin City</li>
              <li>Port-Harcourt</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 w-full">
            <div className="hidden md:flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Appliances</h2>
              <p className="text-sm text-gray-500">
                Showing 12 results from total 240
              </p>
            </div>

            <div className="md:hidden block">
              <select className="border rounded px-2 py-1">
                <option value="">Filter</option>
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Lowest to Highest</option>
                <option value="high-to-low">Price: Highest to Lowest</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="md:text-sm">Sort by:</span>
              <select className="border rounded px-2 py-1">
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="low-to-high">Price: Lowest to Highest</option>
                <option value="high-to-low">Price: Highest to Lowest</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {/* Placeholder Product Cards */}
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index}>
                <ProductCard />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <PaginationComponent />
        </div>
      </div>
    </>
  );
}
