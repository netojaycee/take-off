"use client";
import { Loader2 } from "lucide-react";
import React from "react";
import { SalesLineChart } from "./(components)/SalesLineChart";

import Orders from "../my-orders/page";
import { TotalSpendingLineChart } from "./(components)/TotalSpendingChart";
import { SellerEarningsAndSalesLineChart } from "./(components)/charts/EarningsAndSales";
import { SalesBarChart } from "./(components)/BarChart";
import { VisitorsPieChart } from "./(components)/PieChart";
import { RootState } from "@/types";
import { useSelector } from "react-redux";
import {
  useGetAnalyticsQuery,
  useGetEarningsVsPayoutsQuery,
  useGetMonthlySummaryQuery,
  useGetSalesByCatQuery,
  useGetWalletBalanceQuery,
} from "@/redux/appData";
import Seller from "./(components)/cards/Seller";
import Buyer from "./(components)/cards/Buyer";
import Admin from "./(components)/cards/Admin";
import Loader from "@/components/local/loader";

const backendResponse = {
  totalSales: [0, 5, 10, 15, 0, 0, 0, 0, 0, 0, 0, 0],
  totalSpending: [0, 1000, 2000, 1500, 0, 0, 0, 0, 0, 0, 0, 0],
  totalPlatformEarnings: [0, 1000, 2000, 1500, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function Dashboard() {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { data, isLoading: isLoadingAnalytics } =
    useGetAnalyticsQuery(undefined);
  const { data: balance, isLoading: isLoadingBalance } =
    useGetWalletBalanceQuery(undefined);
  const wallet = balance?.wallet?.$numberDecimal;
  const { data: monthlyData, isLoading: isLoadingSummary } =
    useGetMonthlySummaryQuery(undefined);
  // const { data: salesByCat, isLoading: isLoadingSalesByCat } =
  // useGetSalesByCatQuery(undefined);

  const { data: earningsVsPayouts, isLoading: isLoadingEarningsVsPayouts } =
    useGetEarningsVsPayoutsQuery(undefined);
  console.log("ff", balance && balance);
  const role = userData?.role;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[#606060] text-[16px] font-[500]">
          Overview Performance
        </h2>

        <div className="flex items-center gap-3 md:hidden "></div>
      </div>
      {isLoadingAnalytics ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Seller Dashboard Cards */}
          {/* Wallet */}
          {role === "seller" && <Seller data={data} wallet={wallet} />}
          {/* Buyer Dashboard Cards */}
          {/* Total Spending */}
          {role === "buyer" && <Buyer data={data} />}

          {/* Admin Dashboard Cards */}
          {/* Total Platform Earnings */}

          {role === "admin" && <Admin data={data} />}
        </div>
      )}
      {isLoadingSummary ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1  gap-5">
          <SellerEarningsAndSalesLineChart role={role} data={backendResponse} />
          {/* <SalesBarChart />

          <SalesLineChart />
          <TotalSpendingLineChart />
          <VisitorsPieChart /> */}
        </div>
      )}
      <Orders />
    </div>
  );
}
