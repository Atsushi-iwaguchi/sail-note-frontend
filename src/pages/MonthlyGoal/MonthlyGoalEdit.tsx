import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import type { MonthlyGoalsRequest } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function TournamentNew() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<MonthlyGoalsRequest>();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoal = async () => {
      const response = await api.get(`/monthly_goals/${id}`);
      reset(response.data);
      console.log(response.data)
    };
    fetchGoal();
  }, [id, reset]);

  const onSubmit = async (data: MonthlyGoalsRequest) => {
    setError(null);
    try {
      await api.patch(`/monthly_goals/${id}`, { monthly_goal: data });
      navigate("/monthly-goals");
    } catch {
      setError("目標の更新に失敗しました");
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
