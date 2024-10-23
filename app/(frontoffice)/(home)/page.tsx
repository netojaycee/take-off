"use client"
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

export default function Home() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  console.log(userData)
  return (
    <>
      <Hero />
    
      <Categories />
      <NewItemsBanner />
      <NewItemsProducts />
      <TodaysDeals />
      <FeaturedItems />
      <BestSellingElec />
      <BestSellingItems />
    </>
  );
}
