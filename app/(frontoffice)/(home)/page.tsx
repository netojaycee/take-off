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
import { RootState } from "@/types";
import { useGetAllProductQuery } from "@/redux/appData";
import { Loader } from "lucide-react";

export default function Home() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(userData);
  console.log(auth);
  const { data, isLoading } = useGetAllProductQuery(undefined);
  
  // const categories = data.category as category[];
  const products = data;
  console.log(products);
  return (
    <>
      <Hero />

      <Categories />
      <NewItemsBanner />
      <NewItemsProducts isLoading={isLoading} products={products} />
      <TodaysDeals />
      <FeaturedItems isLoading={isLoading} products={products} />
      <BestSellingElec />
      <BestSellingItems isLoading={isLoading} products={products} />
    </>
  );
}
