import Header from "@/components/header";
import { ChartRadialShape } from "./piChart";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import type { Monthly_goals } from "@/types";
import { AchievementChart } from "./linearChart";

export default function MonthlyGoals() {
  const [goals, setGoals] = useState<Monthly_goals[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get("/monthly_goals");
        setGoals(response.data);
      } catch {
        setError("取得に失敗しました");
      }
    };

    fetchGoals();
  }, []);
  return (
    <>
      <Header />

      <div className="p-15">
        {error && <p>{error}</p>}
        <ChartRadialShape goals={goals} />
        <AchievementChart goals={goals}/>
      </div>
    </>
  );
}
