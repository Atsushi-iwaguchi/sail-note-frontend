import Header from "@/components/Header";
import { api } from "@/lib/axios";
import type { MonthlyGoalsRequest } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MonthlyGoalsForm from "../../components/MonthlyGoal/MonthlyGoalForm";

export default function TournamentNew() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm<MonthlyGoalsRequest>();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoal = async () => {
      const response = await api.get(`/monthly_goals/${id}`);
      reset(response.data);
      console.log(response.data);
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
    <div className="min-h-screen">
      <Header />

      <MonthlyGoalsForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
}
