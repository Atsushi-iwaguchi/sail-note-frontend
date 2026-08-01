import Header from "@/components/Header";
import TournamentEntryForm from "@/components/Tournament/TournamentEntryForm";
import { api } from "@/lib/axios";
import type { TournamentEntryRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function TournamentEntryNew() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm<TournamentEntryRequest>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: TournamentEntryRequest) => {
    setError(null);
    try {
      await api.post(`/tournaments/${id}/tournament_entries`, {
        tournament_entry: data,
      });
      navigate(`/tournaments/${id}/tournament-entries`);
    } catch {
      setError("大会記録作成に失敗しました");
    }
  };
  return (
    <>
      <Header />
      <TournamentEntryForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        error={error}
      />
    </>
  );
}
