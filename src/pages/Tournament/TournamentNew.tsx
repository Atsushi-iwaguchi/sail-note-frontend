import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import type { TournamentRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function TournamentNew() {
  const { register, handleSubmit } = useForm<TournamentRequest>();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: TournamentRequest) => {
    setError(null);
    try {
      await api.post("/tournaments", { tournament: data });
      navigate("/tournaments");
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
              大会名
              <Input className="w-80" type="text" {...register("name")} />
            </p>

            <p>
              開催日
              <Input className="w-30" type="date" {...register("start_date")} />
            </p>
            <p>
              終了日
              <Input className="w-30" type="date" {...register("end_date")} />
            </p>

            <p>
              参加艇数
              <Input
                className="w-20"
                type="number"
                {...register("boats_count", {
                  valueAsNumber: true,
                })}
              />
              レース数
              <Input
                className="w-20"
                type="number"
                {...register("race_count", {
                  valueAsNumber: true,
                })}
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
