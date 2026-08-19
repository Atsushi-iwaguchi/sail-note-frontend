import Header from "@/components/Header";
import { api } from "@/lib/axios";
import type { MonthlyGoalsRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MonthlyGoalsForm from "../../components/MonthlyGoal/MonthlyGoalForm";

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
