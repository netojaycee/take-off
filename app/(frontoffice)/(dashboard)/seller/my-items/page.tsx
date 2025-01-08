"use client";
import React from "react";
import { SellerOrder } from "@/types";
import { columns } from "@/components/local/profile/orderColumns";
import { DataTable } from "@/components/local/profile/data-table";
import { Loader } from "lucide-react";
import { useGetSellerOrdersQuery } from "@/redux/appData";

export default function Orders() {
  const { data, isLoading, error } = useGetSellerOrdersQuery(undefined);

  if (isLoading) {
    <Loader className="animate-spin" />;
  }

  const orders: SellerOrder[] =
    data && data.filter((order: SellerOrder) => order?.paymentStatus === "paid");
  console.log(orders);
  return (
    <div className="2xl:max-w-[1536px] mx-auto py-10">
      <DataTable columns={columns} data={orders || []} />
    </div>
  );
}

// http://localhost:3000/order-recieved?trxref=1u32xnk449&reference=1u32xnk449
