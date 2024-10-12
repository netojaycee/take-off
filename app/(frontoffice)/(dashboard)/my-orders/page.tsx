import React from "react";
import { Order } from "@/types";
import { columns } from "@/components/local/profile/orderColumns";
import { DataTable } from "@/components/local/profile/data-table";


const orders: Order[] = [
  {
    orderId: "#2456JL",
    product: "Washing Machine",
    price: "134.00",
    paymentMethod: "Transfer",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#9876XC",
    product: "iPhone",
    price: "441.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Completed",
  },
  {
    orderId: "#5435DF",
    product: "Headphone",
    price: "134.00",
    paymentMethod: "Transfer",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Refrigerator",
    price: "134.00",
    paymentMethod: "Transfer",
    date: "13.4.2024",
    status: "Completed",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Refrigerator",
    price: "134.00",
    paymentMethod: "Transfer",
    date: "13.4.2024",
    status: "Completed",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
  {
    orderId: "#2456JL",
    product: "Blender",
    price: "134.00",
    paymentMethod: "Credit Card",
    date: "13.4.2024",
    status: "Processing",
  },
];

export default async function Orders() {
  return (
    <div className="2xl:max-w-[1536px] mx-auto py-10">
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
