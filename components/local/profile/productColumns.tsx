"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { category } from "@/types";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<category>[] = [
  {
    id: "images",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="h-[40px] w-[60px] bg-gray-300 p-1">
          <Image
            src={category.thumbnail.url || ""}
            alt="image"
            width={40}
            height={40}
            className="w-full h-full object-fit"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "productCount",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Product Count
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const productCount = parseFloat(row.getValue("productCount"));
  //     // const formatted = new Intl.NumberFormat("en-NG", {
  //     //   style: "currency",
  //     //   currency: "NGN",
  //     // }).format(amount);

  //     // return <div className="text-center font-medium">{formatted}</div>;
  //     return <div className="text-center font-medium">{productCount}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      console.log(category);

      return (
        <div className="flex items-center gap-6">
          <Pencil className="cursor-pointer w-4 h-4" />
          {/* <Trash onClick={""} className="cursor-pointer w-4 h-4" /> */}
        </div>
      );
    },
  },
];
