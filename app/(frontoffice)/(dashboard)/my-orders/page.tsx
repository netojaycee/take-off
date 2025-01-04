"use client";

import React from "react";
import Link from "next/link";
import { useGetBuyerOrdersQuery } from "@/redux/appData";
import { Loader } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";


export default function OrderDetails() {
  const { data, isLoading, error } = useGetBuyerOrdersQuery(undefined);
  const orders: Order[] = data && data;
  if (isLoading) {
    <Loader className="animate-spin" />;
  }
  console.log(orders && orders);
  return (
    <div className="px-2 md:px-10">
      <div className="grid mt-4">
        {orders && orders.map((order, index) => (
          <div key={index} className="border my-2">
            <div className="border-b">
              <div className="grid grid-cols-3 md:grid-cols-5 p-2 md:p-5 gap-4">
                <div className="flex flex-col justify-between items-start">
                  <p className="font-bold font-sans text-sm">OrderId</p>
                  <a
                    href={`/my-orders/${order?.id}`}
                    className="text-sm text-blue-500 underline"
                  >
                    #{order?.id.slice(-6)}
                  </a>
                </div>

                <div className="hidden md:flex flex-col justify-between items-start">
                  <p className="font-bold font-sans text-sm">Date</p>
                  <p className="text-xs">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(order?.paidAt))}
                  </p>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <p className="font-bold font-sans text-sm">Status</p>
                  <p className="text-sm">{order?.deliveryStatus}</p>
                </div>

                <div className="hidden md:flex flex-col justify-between items-start">
                  <p className="font-bold font-sans text-sm">Total</p>
                  <p className="text-sm">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(order?.totalPrice)}
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <Button asChild>
                    <Link href={`my-orders/${order?.id}`}>View</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center border p-3">
                <div className="flex gap-1 flex-wrap">
                  <p className="w-[70%] md:w-full line-clamp-2">
                    {order?.product?.name}
                  </p>
                  <span className="font-semibold self-end">
                    X {order?.quantity}
                  </span>
                </div>
                <Image
                  src={order?.product?.thumbnail} // Assuming there's an image field in the cart item
                  alt={order?.product?.name}
                  className="w-16 h-16 object-cover rounded-md bg-gray-200"
                  width={50}
                  height={50}
                />{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
