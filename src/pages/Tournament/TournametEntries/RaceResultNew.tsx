import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import type { RaceResultRequest } from "@/types";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function RaceResultNew() {
  const { id, entry_id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const { control, register, handleSubmit } = useForm<RaceResultRequest>({
    defaultValues: {
      race_results: [],
    },
  });
  const navigate = useNavigate();

  const { fields, replace } = useFieldArray({
    control,
    name: "race_results",
  });

  useEffect(() => {
    const fetchTournament = async () => {
      setError(null);
      try {
        const response = await api.get(`/tournaments/${id}`);
        replace(
          Array.from({ length: response.data.race_count }, (_, i) => ({
            race_number: i + 1,
            score: undefined,
          })),
        );
      } catch {
        setError("作成できまんでした");
      }
    };
    if (id) {
      fetchTournament();
    }
  }, [id, replace]);

  const onSubmit = async (data: RaceResultRequest) => {
    setError(null);
    try {
      await api.post(`/tournament_entries/${entry_id}/race_results`, data);
      navigate(`/tournaments/${id}/tournament-entries`);
    } catch {
      setError("作成に失敗しました");
    }
  };

  return (
    <>
      <Header />

      <div className="p-4 sm:p-10">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 mb-3">
              <label className="w-20 font-medium">
                レース{field.race_number}
              </label>

              <input
                type="hidden"
                {...register(`race_results.${index}.race_number`, {
                  valueAsNumber: true,
                })}
              />

              <Input
                type="number"
                min={1}
                className="w-24"
                {...register(`race_results.${index}.score`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
          <Button type="submit">保存</Button>
        </form>
      </div>
    </>
  );
}
