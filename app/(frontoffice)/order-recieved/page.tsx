"use client";

import { CartItem, CartType, MergedData, Order, RootState } from "@/types";
import { Loader } from "lucide-react";
import { useGetUserOrderByRefQuery } from "@/redux/appData";
import React from "react";
import { useSelector } from "react-redux";
import { formatDateTime } from "@/hooks/format-date";

export default function OrderReceived() {
  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get("reference") || "";
  console.log(reference);

  const session = useSelector((state: RootState) => state.auth.userData);

  const { data: orders, isLoading } = useGetUserOrderByRefQuery(reference);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>No orders found for this reference.</p>
      </div>
    );
  }

  // Combine orders
  const mergedData: MergedData = orders.reduce(
    (
      acc: {
        quantity: number;
        totalPrice: number;
        cartItems: { name: string; price: number; quantity: number }[];
      },
      order: Order
    ) => {
      acc.quantity += order.quantity;
      acc.totalPrice += order.totalPrice;
      acc.cartItems.push({
        name: order.product.name,
        price: order.product.price,
        quantity: order.quantity,
      });
      return acc;
    },
    {
      paymentReference: orders[0].paymentReference,
      paidAt: orders[0].paidAt,
      createdAt: orders[0].createdAt,
      totalPrice: 0,
      quantity: 0,
      cartItems: [] as { name: string; price: number; quantity: number }[],
      note: orders[0].note,
      address: orders[0].address,
      phone: orders[0].phone,
      name: orders[0].buyer.name,
      email: orders[0].buyer.email,
    }
  );

  console.log(mergedData);
  console.log(orders);

  return (
    <div className="px-2 md:px-10 my-10">
      {/* Success Message */}
      <div className="text-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-green-600 border p-3">
          Thank you. Your order has been received.
        </h2>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex justify-between">
            <span className="font-medium">Order reference:</span>
            <span className="font-bold">{mergedData.paymentReference}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span className="font-bold">
              {formatDateTime(mergedData.createdAt)}
            </span>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(mergedData.totalPrice)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment method:</span>
            <span className="font-bold">Paystack</span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {mergedData.cartItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    {item.name} × {item.quantity}
                  </td>
                  <td className="px-4 py-2">
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    }).format(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-2 font-medium">Subtotal:</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(mergedData.totalPrice)}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Payment method:</td>
                <td className="px-4 py-2">Paystack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-sm rounded-md p-6">
          <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
          <p>{session?.name}</p>
          <p className="">{session?.address}</p>
          <p>{session?.phone}</p>
          <p>{session?.email}</p>
        </div>
        <div className="bg-white shadow-sm rounded-md p-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
          <p>{mergedData.name}</p>
          <p className="">{mergedData.address}</p>
          <p>{mergedData.phone}</p>
          <p>{mergedData.email}</p>
        </div>
      </div>
    </div>
  );
}
