import { Button } from "@/components/ui/button";
import { EllipsisIcon, TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SalesLineChart } from "./(components)/SalesLineChart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Orders from "../my-orders/page";

export default function Dashboard() {
  const data = [
    {
      title: "Total Sales",
      amount: "86,784.93",
      percentage: "0.32",
      icon: "/images/bagIcon.png",
      type: "down",
      filter: "7 Days",
    },

    {
      title: "Total Users",
      amount: "1250",
      percentage: "0.32",
      icon: "/images/profile2Icon.png",
      type: "up",
      filter: "7 Days",
    },

    {
      title: "Total Sellers",
      amount: "400",
      percentage: "10",
      icon: "/images/profileIcon.png",
      type: "up",
      filter: "7 Days",
    },

    {
      title: "Total Orders",
      amount: "400",
      percentage: "0.32",
      icon: "/images/cartIcon.png",
      type: "up",
      filter: "7 Days",
    },

    {
      title: "Accepted Orders",
      amount: "180",
      percentage: "20",
      icon: "/images/clipboardIcon.png",
      type: "up",
      filter: "7 Days",
    },
    {
      title: "Rejected Orders",
      amount: "120",
      percentage: "0.32",
      icon: "/images/cancelIcon.png",
      type: "down",
      filter: "7 Days",
    },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[#606060] text-[16px] font-[500]">
          Overview Performance
        </h2>
        <div className="md:flex items-center gap-3 hidden ">
          <Button size={"sm"} variant={"default"} className="text-white">
            Day
          </Button>
          <Button size={"sm"} variant={"outline"} className="text-gray-600">
            Week
          </Button>
          <Button size={"sm"} variant={"outline"} className="text-gray-600">
            Month
          </Button>
          <Button size={"sm"} variant={"outline"} className="text-gray-600">
            Year
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden ">
          <Select>
            <SelectTrigger className="w-[100px] md:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Filter</SelectLabel> */}
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-start border-2 rounded-lg p-3"
          >
            <div className="space-y-4">
              <div className="md:h-[34px] w-[34px] bg-[#EBEBEB] rounded-lg bg-opacity-40 p-1">
                <Image
                  src={item.icon}
                  alt=""
                  className=" w-full h-full object-fit"
                  width={22}
                  height={22}
                  loading="lazy"
                />
              </div>
              <p className="text-[10px] md:text-[12px] font-[500] text-[#606060]">
                {item.title}
              </p>
              <p className="text-[12px] md:text-[16px] font-[500]">
                ${item.amount}
              </p>
              <div className="flex items-center gap-3">
                {item.type === "up" ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
                <p className="text-[10px] md:text-[12px] font-[400] text-red-500">
                  {item.percentage}%
                </p>
                <p className="text-[10px] md:text-[12px] font-[400] text-[#606060]">
                  Last {item.filter}
                </p>
              </div>
            </div>
            <div className="bg-[#EBEBEB] p-1 rounded-lg bg-opacity-40">
              <EllipsisIcon className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <SalesLineChart />
      </div>

      <Orders />
    </div>
  );
}
