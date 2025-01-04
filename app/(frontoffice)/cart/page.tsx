"use client";
import ProductCard from "@/components/local/ProductCard";
import CustomCarousel from "@/components/local/CustomCarousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductQuery } from "@/redux/appData";
import { CartType, CartItem, Product } from "@/types";
import {
  addToCart,
  decreaseCartQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Link from "next/link";

export default function Cart() {
  const productData = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
  }));
  const dispatch = useDispatch();

  const cart = useSelector((state: { cart: CartType }) => state.cart);
  // console.log(cart);

  const { data: relatedProducts, isLoading: isLoadingRelated } =
    useGetAllProductQuery({ page: 1, limit: 10 });

  const handleAddToCart = (data: Product | undefined) => {
    console.log(data);
    dispatch(addToCart({ data }));
  };

  const relatedProductData = isLoadingRelated
    ? Array(5).fill({})
    : relatedProducts?.result?.slice(0, 5);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-[16px] lg:text-2xl">Cart</h1>
        <div className="flex lg:flex-row flex-col gap-4 md:gap-10">
          <div className="w-full lg:w-3/4 flex flex-col gap-3">
            <div className="w-full flex items-center">
              <p className="w-[65%] font-bold">Item</p>
              <p className="w-[20%] font-bold hidden md:block">Price</p>
              <p className="w-[15%] flex-grow font-bold text-right flex justify-end ">
                Total
              </p>
            </div>

            {cart.cartItems.map((cartItem: CartItem, index: number) => (
              <div key={index}>
                <Separator className="my-4" />
                <div className="w-full flex h-[150px]">
                  <div className="w-[65%] ">
                    <div className="flex gap-2 w-full">
                      <div className="p-2 rounded-md md:h-[130px] w-[160px] bg-[#F2F2F2] flex items-center justify-center">
                        <Image
                          src={cartItem.thumbnail || ""}
                          alt={cartItem.name}
                          width={120}
                          height={120}
                          className="object-contain  w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h1 className="text-[14px] lg:text-[18px]">
                          {cartItem.name}
                        </h1>
                        <p className="text-[12px] lg:text-[14px] text-[#25252580] line-clamp-2 w-[80%]">
                          {cartItem.description}
                        </p>
                        <p className="text-red-500 text-[10px] md:text-[14px]">
                          {cartItem.quantity < 1 && "Out of stock"}
                        </p>
                        <div className="flex gap-2 m-1 items-center">
                          <Button
                            onClick={() =>
                              dispatch(decreaseCartQuantity(cartItem))
                            }
                            className="text-black hover:text-white bg-gray-300 font-bold h-[30px]"
                          >
                            -
                          </Button>
                          <span className="text-[14px] font-bold">
                            {cartItem.cartQuantity}
                          </span>
                          <Button
                            onClick={() => handleAddToCart(cartItem)}
                            className="text-black hover:text-white bg-gray-300 font-bold h-[30px]"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="w-[20%] text-[12px] lg:text-[18px] hidden md:block">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(cartItem.price)}
                  </p>
                  <div className="w-[15%] text-[12px] lg:text-[18px] flex justify-end flex-grow">
                    <div className="h-full w-full flex flex-col items-end">
                      <span className="">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(cartItem.price * cartItem.cartQuantity)}
                      </span>
                      <div className="flex flex-col h-[81%] items-end justify-end w-full">
                        <span
                          onClick={() => dispatch(removeFromCart(cartItem))}
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
          <div className="w-full lg:w-1/4 flex flex-col gap-3">
            <Card className="w-full h-auto px-3 py-8 flex flex-col justify-between bg-[#F2F2F2] shadow-md">
              {/* Card Header */}
              <CardHeader>
                <CardTitle className="text-[14px] lg:text-xl font-semibold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <Separator className="my-2 " />

              {/* Card Content */}
              <CardContent>
                <div className="space-y-4">
                  {cart.cartItems.map((cartItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-[#252525] text-[12px] lg:text-[15px]">
                        {cartItem.name} x {cartItem.cartQuantity}
                      </span>
                      <span>
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(cartItem.price * cartItem.cartQuantity)}
                      </span>
                    </div>
                  ))}

                  <Separator className="my-2 " />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(cart.cartTotalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="flex justify-end">
                <Button asChild className="w-full">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </CardFooter>
            </Card>{" "}
          </div>
        </div>
      </div>
      <div className="my-3 md:my-6 flex flex-col gap-2 w-full">
        <h1 className="text-[14px] md:text-[16px] lg:text-xl font-semibold">
          You may also like
        </h1>
        <CustomCarousel
          items={relatedProductData}
          renderCard={(product: Product, index: number) => (
            <ProductCard
              key={product.id || index}
              data={product}
              isLoading={isLoadingRelated}
            />
          )}
          carouselOpts={{
            align: "start",
            loop: true,
          }}
        />
      </div>{" "}
    </>
  );
}
