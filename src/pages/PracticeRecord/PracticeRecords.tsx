import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { PracticeRecord } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PracticeRecords() {
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get("/practice_records");
        setRecords(response.data);
      } catch {
        setError("練習記録の取得に失敗しました");
      }
    };
    fetchRecords();
  }, []);

  return (
    <>
      <Header />
      <h1 className="mb-4 text-xl font-bold sm:text-2xl">練習記録一覧</h1>
      <div className="p-4 sm:p-5">
        <div className="mb-4">
          <Button onClick={() => navigate("/practice-records/new")}>
            新規作成
          </Button>
        </div>

        <p className="mb-2 text-sm text-muted-foreground">絞り込み</p>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <ul className="list-none flex flex-col gap-3">
          {records.map((record) => (
            <li key={record.id}>
              <Card
                className="cursor-pointer p-4 hover:bg-accent transition-colors"
                onClick={() => navigate(`/practice-records/${record.id}`)}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-base sm:text-lg">
                    {record.user?.username}
                  </CardTitle>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {record.practice_date}
                  </span>
                </CardHeader>

                <CardContent className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground flex flex-wrap gap-x-1">
                    <span>風向: {record.wind_direction ?? "-"}</span>
                    <span>
                      風速: {record.min_wind_speed ?? "-"}~
                      {record.max_wind_speed ?? "-"} m/s
                    </span>
                    <span>気温: {record.temperature ?? "-"}℃</span>
                  </p>

                  <p className="text-sm line-clamp-2">{record.reflection}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
