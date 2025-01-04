"use client";
import React, { useState } from "react";
import PaginationComponent from "@/components/local/PaginationComponent";
import ProductCard from "@/components/local/ProductCard";
import Hero from "../(home)/(components)/Hero";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaAngleRight } from "react-icons/fa";
import {
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useLazySearchQuery,
} from "@/redux/appData";
import { category, Product } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Filter from "./Filter";
import { MobileFilterSidebar } from "@/components/local/MobileFilterSidebar";
import { X } from "lucide-react";

type SelectedRange = {
  min: number;
  max: number;
};

export default function Products() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [category, setCategory] = useState<string[]>([]);
  const [min, setMin] = useState<number | undefined>(undefined);
  const [max, setMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>("newest");
  const [inStock, setInStock] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const handleStockChange = (status: string) => {
    if (status === "inStock") {
      setInStock((prev) => !prev);
    } else if (status === "outOfStock") {
      setOutOfStock((prev) => !prev);
    }
  };

  // The function to handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setCategory((prev) => {
      // Check if the categoryId is already in the array
      if (prev.includes(categoryId)) {
        // Remove the categoryId if it's already selected
        return prev.filter((id) => id !== categoryId);
      } else {
        // Add the categoryId if it's not already selected
        return [...prev, categoryId];
      }
    });
  };

  React.useEffect(() => {
    // This will run every time the 'category' state changes

    // Create a new instance of URLSearchParams from the current URL
    const params = new URLSearchParams(window.location.search);

    // Update the 'category' parameter in the URL with the updated 'category' state
    params.set("category", category.join(","));

    // Construct the new URL with updated parameters
    const newUrl = `${window.location.pathname}?${params.toString()}`;

    // Update the browser's URL without reloading the page
    window.history.pushState(null, "", newUrl);
  }, [category]); // This hook depends on 'category' state

  // const queryCategory = category.length > 0 ? category : categorySearch;
  // const queryCategory = category.length > 0 ? category.join(",") : category;

  const { data, isLoading, error } = useGetAllProductQuery(
    {
      page,
      limit,
      categories: category,
      minPrice: min,
      maxPrice: max,
      sort,
      inStock,
      outOfStock,
    },
    { refetchOnMountOrArgChange: true }
  );

  console.log(data);

  const products: Product[] = data ? data?.result : [];
  const [searchTitle, setSearchTitle] = React.useState<string>("");

  // Use useSearchParams hook to get the search query from URL
  const searchParams = useSearchParams();
  const searchQueryFromUrl = searchParams.get("search") || "";

  React.useEffect(() => {
    // Sync the state with the URL search parameter
    setSearchTitle(searchQueryFromUrl);

    const categoryQueryFromUrl = searchParams.get("category");
    if (categoryQueryFromUrl) {
      const categoriesFromUrl = categoryQueryFromUrl.split(",");
      setCategory(categoriesFromUrl); // Set categories from the URL
    }
  }, [searchParams, searchQueryFromUrl]);

  // React.useEffect(() => {
  //   const categoryQueryFromUrl = searchParams.get("category") || "";
  //   const categoryQueryFromUrlArray = categoryQueryFromUrl
  //     ? [categoryQueryFromUrl]
  //     : [];

  //   setCategorySearch(categoryQueryFromUrlArray);
  // }, [searchParams]);

  // React.useEffect(() => {
  //   // Sync the state with the URL search parameter
  //   setSearchTitle(searchQueryFromUrl);
  // }, [searchQueryFromUrl]);
  const [search, { data: searchData, isLoading: searchIsLoading }] =
    useLazySearchQuery();

  React.useEffect(() => {
    if (searchQueryFromUrl) {
      search({ searchQuery: searchQueryFromUrl, page, limit });
    }
  }, [search, searchQueryFromUrl, page, limit]);

  const searchResults: Product[] = searchData?.result;

  const productsToDisplay = searchQueryFromUrl ? searchResults : products;
  const totalPages = searchQueryFromUrl
    ? searchData?.pagination?.totalPages
    : data && data.pagination.totalPages;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Compute the highest price
  // const highestPrice = products.length
  //   ? Math.ceil(Math.max(...products.map((product) => product.price)) / 5000) *
  //     5000
  //   : 20000;
  const highestPrice = 400000;

  const [range, setRange] = React.useState<[number, number]>([0, highestPrice]);

  const handleFilter = (selectedRange: SelectedRange) => {
    setRange([0, selectedRange.max]);
    setMin(selectedRange.min);
    setMax(selectedRange.max);
  };

  const handleSortChange = (value: string) => {
    setSort(value); // Update sort state directly
  };

  const [isLoadingData, setIsLoadingData] = React.useState(false);

  React.useEffect(() => {
    setIsLoadingData(true);
    const timer = setTimeout(() => setIsLoadingData(false), 500); // Simulate a delay
    return () => clearTimeout(timer);
  }, [category, sort, min, max, inStock, outOfStock]);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    // error: errorCategories,
  } = useGetAllCategoryQuery(undefined);
  // console.log(data && data);
  // Shuffle data and pick the first 9 categories
  const categoryData: category[] = categories ? categories.category : [];
  const isAnyLoading =
    isLoadingData || isLoading || searchIsLoading || isLoadingCategories;

  return (
    <>
      <div className="hidden md:block">
        <Hero />
      </div>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 md:flex flex-col gap-4 hidden">
          <Filter
            category={categoryData}
            handleFilter={handleFilter}
            highestPrice={highestPrice}
            range={range}
            isLoading={isLoadingCategories}
            onStockChange={handleStockChange}
            onCategoryChange={handleCategorySelect}
            selectedCategory={category}
          />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          {/* Sort and Header */}
          <div className="flex flex-col gap-1 mb-2">
            {searchQueryFromUrl ? (
              <p className="">showing search results for: {searchTitle}</p>
            ) : (
              <h2 className="text-2xl font-semibold">
                {/* {selectedCategory ? selectedCategory.name : "All Products"} */}
                {category && category.length === 1
                  ? category
                  : category && category.length > 1
                  ? ""
                  : "All Products"}
              </h2>
            )}
            <p className="text-xs md:text-sm text-gray-500">
              {/* Showing {currentSortedProducts?.length} results from total{" "}
                {sortedProducts?.length}{" "} */}
              Showing {productsToDisplay && productsToDisplay.length}{" "}
              results from total {data?.pagination?.totalItems}
            </p>
          </div>

          {/* <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 my-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <p
                key={index}
                className="flex items-center gap-2 border p-2 rounded-[30px] justify-center"
              >
                Food <X className="w-4 h-4" />
              </p>
            ))}
          </div> */}
          <div className="flex justify-between md:justify-end items-center mb-6 w-full bg-gray-300 p-2">
            <div className="md:hidden">
              <MobileFilterSidebar
                category={categoryData}
                handleFilter={handleFilter}
                highestPrice={highestPrice}
                range={range}
                isLoading={isLoadingCategories}
                onStockChange={handleStockChange}
                onCategoryChange={handleCategorySelect}
                selectedCategory={category}
              />{" "}
            </div>

            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[100px] md:w-[180px] border-none bg-transparent">
                <SelectValue placeholder={`Sort by`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="newest">Sort by Newest</SelectItem>
                  <SelectItem value="alphabetical">
                    Sort by Alphabetical
                  </SelectItem>
                  <SelectItem value="priceLowToHigh">
                    Sort by Price (Low to High)
                  </SelectItem>
                  <SelectItem value="priceHighToLow">
                    Sort by Price (High to Low)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {isAnyLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductCard key={i} isLoading={true} />
              ))
            ) : error ? (
              <div className="flex items-center justify-center h-[283px]">
                <p className="text-red-500">Failed to load All products.</p>
              </div>
            ) : (
              // {isLoading
              //   ? Array.from({ length: itemsPerPage }).map((_, i) => (
              //       <ProductCard key={i} isLoading={true} />
              //     ))
              productsToDisplay?.map((product) => (
                <ProductCard
                  isLoading={isLoading}
                  key={product.id}
                  data={product}
                />
              ))
            )}
          </div>

          <PaginationComponent
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            onPageChange={handlePageChange}
            currentPage={page}
            totalPages={totalPages}
          />

          {/* <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          /> */}
        </div>
      </div>
    </>
  );
}
