"use client"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A line chart with dots";

const chartData = [
  { month: "January", points: 186, sessions: 80 },
  { month: "February", points: 305, sessions: 200 },
  { month: "March", points: 237, sessions: 120 },
  { month: "April", points: 73, sessions: 190 },
  { month: "May", points: 209, sessions: 130 },
  { month: "June", points: 214, sessions: 140 },
];

const chartConfig = {
  points: {
    label: "Points",
    color: "hsl(var(--chart-1))",
  },
  sessions: {
    label: "Sessions",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const RewardChart = () => {
  return (
    <ResponsiveContainer>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="points"
            type="natural"
            stroke="var(--color-points)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-points)",
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
};

export default RewardChart;
