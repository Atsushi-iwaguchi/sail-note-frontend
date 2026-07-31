import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Monthly_goals } from "@/types";

type Props = {
  goals: Monthly_goals[];
};

const chartConfig = {
  achievement: {
    label: "達成率",
    color: "hsl(198, 82%, 40%)",
  },
} satisfies ChartConfig;

export function AchievementChart({ goals }: Props) {
  //月目標を古い順にしてグラフ用に配列を作成
  const chartData = [...goals].reverse().map((goal) => ({
    //JavaScriptのDateオブジェクトにし, 表示用の文字列に変更
    month: new Date(goal.goal_date).toLocaleDateString("ja-JP", {
      year: "2-digit",
      month: "numeric",
    }),
    //達成率
    achievement: goal.achievement_rate,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>達成率の推移</CardTitle>
        <CardDescription>これまでの月目標達成率</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              type="linear"
              dataKey="achievement"
              stroke="var(--color-achievement)"
              fill="var(--color-achievement)"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
