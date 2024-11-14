"use client";
import React from "react";
import PaginationComponent from "@/components/local/Pagination";
import ProductCard from "@/components/local/ProductCard";
import Hero from "../(home)/(components)/Hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaAngleRight } from "react-icons/fa";
import { useGetAllCategoryQuery, useGetAllProductQuery } from "@/redux/appData";
import { category, Product } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Products() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [priceRange, setPriceRange] = React.useState([0, 999999999]);
  const [sortOrder, setSortOrder] = React.useState("");
  const itemsPerPage = 15;

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  const { data, isLoading, error } = useGetAllProductQuery(undefined);
  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetAllCategoryQuery(undefined);

  const categories: category[] = dataCategory?.category || [];
  const selectedCategory = categories.find(
    (cat: category) => cat._id === categoryId
  );
  const products = data || [];

  // Calculate pagination and sorting
  const filteredProducts = products.filter((product: Product) => {
    const isCategoryMatch =
      !selectedCategory || product.categoryName === selectedCategory.name;
    const isPriceInRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return isCategoryMatch && isPriceInRange;
  });

  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortOrder === "low-to-high") sorted.sort((a, b) => a.price - b.price);
    else if (sortOrder === "high-to-low")
      sorted.sort((a, b) => b.price - a.price);
    // else if (sortOrder === "newest")
    //   sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted;
  }, [filteredProducts, sortOrder]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentSortedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update URL parameters on filter change without reloading
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory._id);
    if (priceRange[1] < 999999999)
      params.set("priceRange", `${priceRange[0]}-${priceRange[1]}`);
    if (sortOrder) params.set("sortOrder", sortOrder);
    router.push(`?${params.toString()}`);
  }, [selectedCategory, priceRange, sortOrder, router]);

  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 md:flex flex-col gap-4 hidden">
          {/* Categories */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-3">
              {isLoadingCategory
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-3/4 h-5 bg-gray-400 my-3"
                    />
                  ))
                : categories &&
                  categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/products?category=${category._id}`}
                      className={`${
                        selectedCategory?._id === category._id
                          ? "bg-gray-200 font-bold"
                          : ""
                      } rounded-md flex justify-between items-center hover:transform duration-300 hover:scale-105 hover:bg-gray-200 p-1 w-full text-left`}
                    >
                      <span className="line-clamp-1 w-full">
                        {category?.name}
                      </span>{" "}
                      <FaAngleRight />
                    </Link>
                  ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Price</h3>
            <ul className="space-y-2">
              {[
                [0, 10000],
                [10001, 50000],
                [50001, 100000],
              ].map(([min, max]) => (
                <li key={`${min}-${max}`}>
                  <button
                    onClick={() => setPriceRange([min, max])}
                    className={`text-sm ${
                      priceRange[0] === min && priceRange[1] === max
                        ? "bg-gray-200 font-bold"
                        : ""
                    }`}
                  >
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(min)}{" "}
                    -{" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(max)}
                  </button>
                </li>
              ))}
            </ul>

            <Button
              variant={"outline"}
              className="mt-3"
              onClick={() => {
                setPriceRange([0, 999999999]);
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Sort and Header */}
          <div className="flex justify-between items-center mb-6 w-full">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">
                {selectedCategory ? selectedCategory.name : "All Products"}
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                Showing {currentSortedProducts?.length} results from total{" "}
                {sortedProducts?.length}{" "}
              </p>
            </div>
            <select
              className="border rounded px-2 py-1 w-[140px]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="newest">Newest</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, i) => (
                  <ProductCard data={""} key={i} isLoading={true} />
                ))
              : currentSortedProducts.map((product) => (
                  <ProductCard
                    isLoading={isLoading}
                    key={product._id}
                    data={product}
                  />
                ))}
          </div>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
