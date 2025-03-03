"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function SellerEarningsAndSalesLineChart({
  data,
  role,
}: {
  data: any;
  role: string | undefined;
}) {
  // Backend response
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Transforming backend response to match the chart data format
  const sellerData = months.map((month, index) => ({
    month,
    spending: data?.totalSpending[index] || 0,
    sales: data?.totalSales[index] || 0,
    admin: data?.totalPlatFormSales[index] || 0,
  }));

  const sellerConfig = {
    earnings: {
      label: "Spending",
      color: "hsl(var(--chart-3))",
    },
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-4))",
    },

    admin: {
      label: "Sales",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[12px] md:text-[16px] font-[500] text-[#606060]">
          Total {role === "admin" ? "Platform Earnings" : "Spending"}{" "}
          {role === "seller" && "and Sales"}{" "}
        </CardTitle>
        <CardDescription>
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(
            data?.totalSpending.reduce(
              (sum: number, value: number) => sum + value,
              0
            )
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={sellerConfig}>
          <LineChart data={sellerData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {role === "seller" && (
              <Line
                dataKey="sales"
                type="natural"
                stroke="var(--color-sales)"
                strokeWidth={2}
                dot={{ fill: "var(--color-sales)" }}
                activeDot={{ r: 6 }}
              />
            )}
            {role === "admin" ? (
              <Line
                dataKey="admin"
                type="natural"
                stroke="var(--color-earnings)"
                strokeWidth={2}
                dot={{ fill: "var(--color-earnings)" }}
                activeDot={{ r: 6 }}
              />
            ) : (
              <Line
                dataKey="spending"
                type="natural"
                stroke="var(--color-earnings)"
                strokeWidth={2}
                dot={{ fill: "var(--color-earnings)" }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
