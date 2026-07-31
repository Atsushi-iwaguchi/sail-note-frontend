import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
      <div className="p-4 sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <label htmlFor="overall_ranking" className="w-16 shrink-0">
              総合順位
            </label>
            <Input
              id="overall_ranking"
              className="w-20"
              type="number"
              {...register("overall_ranking", { valueAsNumber: true })}
            ></Input>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="reflection" className="w-16 shrink-0">振り返り</label>
            <Textarea {...register("reflection")}></Textarea>

          </div>
          {error && <p>{error}</p>}
          <Button type="submit" className="self-start">
            保存
          </Button>
        </form>
      </div>
    </>
  );
}
