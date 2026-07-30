"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { Monthly_goals } from "@/types";

export const description = "A radial chart with a custom shape";

const chartConfig = {
  percent: {
    label: "percent",
  },
  goal: {
    label: "goal",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type Props = {
  goals: Monthly_goals[];
};
export function ChartRadialShape({ goals }: Props) {
  const latestGoal = goals[0];

  const monthlyPercent = latestGoal?.achievement_rate ?? 0;

  const now = new Date();

  const month = now.toLocaleString("ja-JP", {
    month: "long",
  });

  const year = now.getFullYear();

  const chartData = [
    { goal: "goal", percent: monthlyPercent, fill: "var(--color-goal)" },
  ];
  return (
    <>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>今月の目標: {latestGoal?.content ?? "未設定"} </CardTitle>
          <CardDescription>
            {year}年{month}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={(monthlyPercent * 360) / 100}
              innerRadius={65}
              outerRadius={95}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                className="first:fill-muted last:fill-background"
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="percent" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {chartData[0].percent.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            %
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total percent for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
