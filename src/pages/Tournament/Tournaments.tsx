import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { Tournament } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //日付を4/5のように表示する関数
  const formatMonthDay = (date: string) =>
    new Date(date).toLocaleDateString("ja-JP", {
      month: "numeric",
      day: "numeric",
    });

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await api.get("/tournaments");
        setTournaments(response.data);
      } catch {
        setError("大会記録の取得に失敗しました");
      }
    };
    fetchTournaments();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />
      <div className="p-4 sm:p-10">
        <h1 className="mb-4 text-xl font-bold sm:text-2xl">過去の大会一覧</h1>

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

        <ul className="mb-4 flex list-none flex-col gap-3">
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <Card
                className="cursor-pointer p-4 transition-colors hover:bg-accent"
                onClick={() =>
                  navigate(`/tournaments/${tournament.id}/tournament-entries`)
                }
              >
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">
                    {tournament.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {tournament.start_date.slice(0, 4)}年{" "}
                    {formatMonthDay(tournament.start_date)} 〜{" "}
                    {formatMonthDay(tournament.end_date)}
                  </p>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>

        <Button className="bg-[#064b87] hover:bg-[#053d6e]" onClick={() => navigate("/tournaments/new")}>新規作成</Button>
      </div>
    </div>
  );
}
