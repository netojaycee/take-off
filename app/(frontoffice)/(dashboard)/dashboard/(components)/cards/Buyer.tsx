import { DashboardStats } from "@/types";
import { Database, LoaderCircle } from "lucide-react";
import React from "react";
import { FaPaypal } from "react-icons/fa";

export default function Buyer({ data }: { data: DashboardStats }) {
  return (
    <>
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <FaPaypal />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Total Spending
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(data?.totalSpentByBuyer)}
          </p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>

      {/* Orders Placed */}
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <Database />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Orders Placed
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">
            {data?.totalOrderPlaced}
          </p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>

      {/* Pending Deliveries */}
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <LoaderCircle />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Pending Deliveries
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">{data?.pendingDeliveryByBuyer}</p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>
    </>
  );
}
