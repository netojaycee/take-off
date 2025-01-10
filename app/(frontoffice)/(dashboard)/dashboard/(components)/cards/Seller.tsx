import { DashboardStats } from '@/types'
import { Database, Wallet } from 'lucide-react'
import React from 'react'
import { FaProductHunt } from 'react-icons/fa'

export default function Seller({ data, wallet }: { data: DashboardStats; wallet: number }) {
  return (
    <>
    <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
      <div className="space-y-3">
        <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
          <Wallet className="" />
        </div>
        <p className="text-sm md:text-base font-medium text-gray-600">
          My Wallet
        </p>
        <p className="text-lg md:text-2xl font-semibold text-black">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(wallet)}{" "}
        </p>
      </div>
      {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
    </div>

    {/* Total Products Listed */}
    <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
      <div className="space-y-3">
        <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
          <FaProductHunt />
        </div>
        <p className="text-sm md:text-base font-medium text-gray-600">
          Products Listed
        </p>
        <p className="text-lg md:text-2xl font-semibold text-black">
          {data?.totalProductBySeller}
        </p>
      </div>
      {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
    </div>

    {/* Orders Received */}
    <div className="flex justify-between items-center border-2 rounded-lg p-4 bg-white shadow-md">
      <div className="space-y-3">
        <div className="h-[40px] w-[40px] bg-[#F3F4F6] rounded-full flex items-center justify-center">
          <Database />
        </div>
        <p className="text-sm md:text-base font-medium text-gray-600">
          Orders Received
        </p>
        <p className="text-lg md:text-2xl font-semibold text-black">
          {data?.totalOrderReceived}
        </p>
      </div>
      {/* <div className="flex items-center justify-center bg-[#F3F4F6] p-2 rounded-full">
    <EllipsisIcon className="text-gray-500 cursor-pointer" />
  </div> */}
    </div>
  </>  )
}
