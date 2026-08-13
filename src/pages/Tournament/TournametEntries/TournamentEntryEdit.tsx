import Header from "@/components/Header";
import TournamentEntryForm from "@/components/Tournament/TournamentEntryForm";
import { api } from "@/lib/axios";
import type { TournamentEntryRequest } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function TournamentEntryEdit() {
  const { id, entry_id } = useParams();
  const { register, handleSubmit, reset } = useForm<TournamentEntryRequest>();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoal = async () => {
      const response = await api.get(
        `/tournaments/${id}/tournament_entries/${entry_id}`,
      );
      reset(response.data);
      console.log(response.data);
    };
    fetchGoal();
  }, [id, entry_id, reset]);

  const onSubmit = async (data: TournamentEntryRequest) => {
    setError(null);
    try {
      await api.patch(`/tournament_entries/${entry_id}`, {
        tournament_entry: data,
      });
      navigate(`/tournaments/${id}/tournament-entries/${entry_id}`);
    } catch {
      setError("目標の更新に失敗しました");
    }
  };
  return (
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />
      <TournamentEntryForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
      />
    </div>
  );
}
