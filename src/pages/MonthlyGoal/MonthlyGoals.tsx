import Header from "@/components/header";
import { ChartRadialShape } from "./Graphs/piChart";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import type { Monthly_goals } from "@/types";
import { AchievementChart } from "./Graphs/linearChart";
import GoalsIndex from "./goalsIndex";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MonthlyGoals() {
  const [goals, setGoals] = useState<Monthly_goals[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

      <div className="m-2 flex items-center justify-between p-2">
        <h1 className="text-3xl font-bold">月間目標</h1>
        <Button onClick={() => navigate("/monthly-goals/new")}>新規作成</Button>
      </div>
      <div className="p-15">
        {error && <p>{error}</p>}
        <ul>
          <li className="mb-5"><ChartRadialShape goals={goals} /></li>
          <li className="mb-10"><AchievementChart goals={goals} /></li>
          <li><GoalsIndex goals={goals} /></li>
        </ul>
      </div>
    </>
  );
}
