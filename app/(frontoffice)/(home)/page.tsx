"use client";
import BestSellingElec from "./(components)/BestSellingElec";
import BestSellingItems from "./(components)/BestSellingItems";
import Categories from "./(components)/Categories";
import FeaturedItems from "./(components)/FeaturedItems";
import Hero from "./(components)/Hero";
import NewItemsBanner from "./(components)/NewItemsBanner";
import NewItemsProducts from "./(components)/NewItemsProducts";
import TodaysDeals from "./(components)/TodaysDeals";
import { useSelector } from "react-redux";
import { Product, RootState } from "@/types";
import { useGetAllProductQuery } from "@/redux/appData";
import { Loader } from "lucide-react";

export default function Home() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  // console.log(userData);
  // console.log(auth);
  const { data, isLoading, error } = useGetAllProductQuery({
    page: 1,
    limit: 20,
  });

  const products: Product[] = data ? data?.result : [];
console.log(products)
  const {
    data: dataFeatured,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useGetAllProductQuery({
    page: 1,
    limit: 20,
  });
  const featuredProducts: Product[] = dataFeatured ? dataFeatured?.result : [];

  return (
    <>
      <Hero />

      <Categories />
      <NewItemsBanner />
      <NewItemsProducts isLoading={isLoading} products={products} />
      <TodaysDeals />
      <FeaturedItems isLoading={isLoadingFeatured} products={featuredProducts} />
      <BestSellingElec />
      <BestSellingItems isLoading={isLoadingFeatured} products={featuredProducts} />
    </>
  );
}
