"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Order } from "@/types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-gray-500">{row.original.orderId}</span>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue("product")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="ml-3 font-medium">
          {row.getValue("paymentMethod")}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
        </Button>
      );
    },
    cell: ({ row }) => {
      // const date = parseFloat(row.getValue("createdAt"));
      // const formatted = new Date (date).toLocaleString();
      return (
        <div className="font-medium">
          {row.getValue("date")}
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status: "Processing" | "Completed" = row.getValue("status");
      const statusColor = status === "Processing" ? "#007BFF" : "#4BD37B";

      return (
        <p style={{ color: statusColor }} className="">
          {status}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link href={"#"} className="flex items-center gap-4">
          <EyeIcon className="w-5 h-5 cursor-pointer" />
        </Link>
      );
    },
  },
];
