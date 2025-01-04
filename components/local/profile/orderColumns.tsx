"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SellerOrder } from "@/types";

export const columns: ColumnDef<SellerOrder>[] = [
  {
    accessorKey: "id",
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
        <span className="text-sm text-gray-500 text-center">
          {row.original.id.slice(-6)}
        </span>
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
      return <div className="font-medium">{row.original.product.name} </div>;
    },
  },
  {
    accessorKey: "totalPrice",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  // {
  //   accessorKey: "paymentStatus",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Payment Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="ml-3 font-medium">{row.getValue("paymentStatus")}</div>
  //     );
  //   },
  // },
  {
    accessorKey: "paidAt",
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
      // const date = new Intl.DateTimeFormat("en-US", {
      //   dateStyle: "medium",
      //   timeStyle: "short",
      // }).format(new Date(row.getValue("paidAt")));
      return <div className="font-medium">{row.getValue("paidAt")}</div>;
    },
  },

  {
    accessorKey: "deliveryStatus",
    cell: ({ row }) => {
      const status:
        | "N/A"
        | "pending"
        | "shipped"
        | "delivered"
        | "accepted"
        | "cancelled" = row.getValue("deliveryStatus");

      const statusColor = (() => {
        switch (status) {
          case "pending":
            return "red";
          case "shipped":
            return "blue";
          case "delivered":
            return "#4BD37B";
          case "accepted":
            return "green";
          case "cancelled":
            return "gray";
          default:
            return "black"; // Default color for "N/A" or unexpected values
        }
      })();

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
        <Link href={`/seller/my-items/${product.id}`} className="flex items-center gap-4">
          <EyeIcon className="w-5 h-5 cursor-pointer" />
        </Link>
      );
    },
  },
];
