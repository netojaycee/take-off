import { DashboardStats } from "@/types";
import { UsersIcon } from "lucide-react";
import React from "react";
import { RiCashFill, RiSecurePaymentFill } from "react-icons/ri";

export default function Admin({ data }: { data: DashboardStats }) {
  return (
    <>
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <RiCashFill />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Total Earnings
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(data?.totalSalesByAdmin)}
          </p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>

      {/* Total Payouts to Sellers */}
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <RiSecurePaymentFill />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Total Payouts
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">
          {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(data?.totalSalesByAdmin - (data?.totalSalesByAdmin * 0.2))}
          </p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>

      {/* Active Sellers and Buyers */}
      <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
        <div className="space-y-3">
          <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <UsersIcon />
          </div>
          <p className="text-sm md:text-base font-medium text-gray-600">
            Active Users
          </p>
          <p className="text-lg md:text-2xl font-semibold text-black">
            Sellers: {data.totalBuyers} | Buyers: {data.totalSellers}
          </p>
        </div>
        {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
      </div>
    </>
  );
}
