import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import type { MonthlyGoalsRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function TournamentNew() {
  const { register, handleSubmit } = useForm<MonthlyGoalsRequest>();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: MonthlyGoalsRequest) => {
    setError(null);
    try {
      await api.post("/monthly_goals", { monthly_goal: data });
      navigate("/monthly-goals");
    } catch {
      setError("大会記録作成に失敗しました");
    }
  };
  return (
    <>
      <Header />

      <div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              目標月
              <Input className="w-30" type="date" {...register("goal_date")} />
            </p>

            <p>
              目標内容
              <Input className="w-80" type="text" {...register("content")} />
            </p>
            <p>
              達成率
              <Input
                className="w-30"
                type="number"
                {...register("achievement_rate", { valueAsNumber: true })}
              />
            </p>

            {error && <p>{error}</p>}
            <Button type="submit">保存</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
