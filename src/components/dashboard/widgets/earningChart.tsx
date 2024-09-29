import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
export const description = "A multiple bar chart for Earning and Mining Hash"

const chartData = [
  { month: "January", earning: 186, hash: 80 },
  { month: "February", earning: 305, hash: 200 },
  { month: "March", earning: 237, hash: 120 },
  { month: "April", earning: 73, hash: 190 },
  { month: "May", earning: 209, hash: 130 },
  { month: "June", earning: 214, hash: 140 },
]
const chartConfig = {
    earning: {
        label: "Earning",
        color: "hsl(var(--chart-1))",
    },
    hash: {
        label: "Hash",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const EarningChart = () => {
  return (
    <div className="w-10/12">
      <div className="text-base mb-2">Average Earning</div>
      <div className="mt-3 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="earning" fill="var(--color-earning)" radius={4} />
              <Bar dataKey="hash" fill="var(--color-hash)" radius={4} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningChart;
