"use client";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";
import { FavoritesState, Product } from "@/types";
import { removeFromFavorites } from "@/redux/slices/favoriteSlice";
import NoItemFound from "@/components/local/NoItemFound";

export default function SavedItems() {
  const dispatch = useDispatch();

  // const cart = useSelector((state) => state.cart);
  // console.log(cart);
  const favoriteItems: Product[] = useSelector(
    (state: FavoritesState) => state.favorites.favoriteItems
  );
  console.log(favoriteItems);

  const handleAddToCart = (favoriteItem: Product) => {
    console.log(favoriteItem);
    dispatch(addToCart({ data: favoriteItem }));
  };

  if (favoriteItems.length < 1) {
    return (
      <div className="flex items-center justify-center h-[283px] w-full mt-10">
        <NoItemFound
          title1="No products found in wishlist"
          title2="Add products to your wishlist"
        />
      </div>
    );
  }
  return (
    <div className="py-5 px-5 md:py-[50px] md:px-[70px] border rounded-md ">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center">
          <p className="w-[70%] font-bold">Item</p>
          <p className="w-[30%] font-bold text-right">Price</p>
        </div>

        {favoriteItems.map((favoriteItem, index) => (
          <div key={index}>
            <Separator className="my-4" />
            <div className="w-full flex h-[150px]">
              <div className="w-[70%] ">
                <div className="flex gap-2 w-full">
                  <div className="p-2 rounded-md h-[130px] w-[180px] bg-[#F2F2F2] flex items-center justify-center">
                    {" "}
                    <Image
                      src={favoriteItem.thumbnail || ""}
                      alt={favoriteItem.name}
                      width={120}
                      height={120}
                      className="object-contain object-center h-full w-full"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h1 className="text-[14px] lg:text-[18px]">
                      {favoriteItem.name}
                    </h1>
                    <p className="text-[12px] lg:text-[16px] text-[#25252580] line-clamp-2 w-[80%]">
                      {favoriteItem.description}
                    </p>
                    <p className="text-red-500 text-[10px] md:text-[14px]">
                      {favoriteItem.quantity < 1 && "Out of stock"}
                    </p>
                    <div className="flex gap-2 m-1 items-center">
                      <Button
                        onClick={() => handleAddToCart(favoriteItem)}
                        variant={"outline"}
                        className="flex items-center"
                      >
                        Add to Cart <ShoppingCart className="" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[30%] text-[12px] lg:text-[18px] ">
                <div className="h-full w-full flex flex-col items-end">
                  <span className="">
                    {" "}
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(favoriteItem.price)}
                  </span>
                  <div className="flex flex-col h-[81%] items-end justify-end w-full">
                    <span
                      onClick={() =>
                        dispatch(removeFromFavorites(favoriteItem))
                      }
                      className="font-bold cursor-pointer mb-6 mr-1 flex items-center gap-2 text-[12px] lg:text-[16px]"
                    >
                      Remove
                      <Trash className="" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
