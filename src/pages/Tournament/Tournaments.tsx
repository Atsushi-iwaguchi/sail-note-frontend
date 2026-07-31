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
    <>
      <Header />
      <div>
        <h1>過去の大会一覧</h1>
        {error && <p>{error}</p>}
        <ul>
          {tournaments.map((tournament) => (
            <li className="p-2 mb-2" key={tournament.id}>
              <Card
                className="cursor-pointer p-4"
                onClick={() => navigate(`/tournaments/${tournament.id}/tournament-entries`)}
              >
                <CardHeader>
                  <CardTitle>
                    {tournament.name} 日程 {tournament.start_date.slice(0, 4)}年
                    {formatMonthDay(tournament.start_date)}-
                    {formatMonthDay(tournament.end_date)}
                  </CardTitle>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
        <Button onClick={() => navigate("/tournaments/new")}>新規作成</Button>
      </div>
    </>
  );
}
