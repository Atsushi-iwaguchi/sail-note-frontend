import Header from "@/components/Header";
import { ChartRadialShape } from "../../components/MonthlyGoal/Graphs/piChart";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import type { Monthly_goals } from "@/types";
import { AchievementChart } from "../../components/MonthlyGoal/Graphs/linearChart";
import GoalsIndex from "../../components/MonthlyGoal/GoalsIndex";
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
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />

      <div className="m-2 flex items-center justify-between p-2">
        <h1 className="text-3xl font-bold">月間目標</h1>
        <Button className="bg-[#064b87] hover:bg-[#053d6e]" onClick={() => navigate("/monthly-goals/new")}>新規作成</Button>
      </div>
      <div className="p-5">
        {error && <p>{error}</p>}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <li>
            <ChartRadialShape goals={goals} />
          </li>
          <li>
            <AchievementChart goals={goals} />
          </li>
          <li className="lg:col-span-2">
            <GoalsIndex goals={goals} />
          </li>
        </ul>
      </div>
    </div>
  );
}
