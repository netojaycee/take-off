"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export function TotalSpendingLineChart() {
    const spendingData = [
      { month: "January", total: 450 },
      { month: "February", total: 700 },
      { month: "March", total: 600 },
      { month: "April", total: 300 },
      { month: "May", total: 500 },
      { month: "June", total: 650 },
      { month: "July", total: 480 },
      { month: "August", total: 300 },
      { month: "September", total: 200 },
      { month: "October", total: 400 },
      { month: "November", total: 560 },
      { month: "December", total: 720 },
    ];
  
    const spendingConfig = {
      total: {
        label: "Total Spending",
        color: "hsl(var(--chart-2))",
      },
    } satisfies ChartConfig;
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Spending</CardTitle>
          <CardDescription>$12,500</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={spendingConfig}>
            <LineChart data={spendingData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="total"
                type="natural"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={{ fill: "var(--color-total)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
  