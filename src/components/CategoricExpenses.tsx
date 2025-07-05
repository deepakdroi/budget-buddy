import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

// const data = [
//   { name: "Food & Dining", value: 520 },
//   { name: "Transportation", value: 340 },
//   { name: "Housing", value: 780 },
//   { name: "Health & Fitness", value: 215 },
//   { name: "Entertainment", value: 430 },
//   { name: "Personal care", value: 125 },
//   { name: "Education", value: 690 },
//   { name: "Investments", value: 310 },
//   { name: "Debt Payments", value: 250 },
//   { name: "Gifts and Donations", value: 90 },
//   { name: "Shopping", value: 475 },
//   { name: "Miscellaneous", value: 180 },
// ];

const COLORS = [
  "#FF6666", // Deep blush red
  "#666699", // Muted indigo blue
  "#FF9C4D", // Toasted peach
  "#7DCFA1", // Balanced sage green
  "#CC66CC", // Rosy lilac
  "#FF99CC", // Vivid cotton candy
  "#FFD066", // Warm soft gold
  "#339999", // Medium teal
  "#BFBFBF", // Satin silver
  "#CCCCFF", // Gentle twilight lavender
  "#66FFFF", // Clear sky aqua
  "#C05050", // Rich dusty crimson
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CategoricExpense({
  data,
}: {
  data: CategoricExpenseData[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
              nameKey={"category"}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
