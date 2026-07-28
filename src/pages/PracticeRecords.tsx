import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
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
      <div>
        <Button>新規作成</Button>
      </div>
      <div>
        <p>絞り込み</p>
        {error && <p>{error}</p>}
        <ul>
          {records.map((record) => (
            <Card
              className="cursor-pointer p-4"
              key={record.id}
              onClick={() => navigate(`/practice-records/${record.id}/`)}
            >
              <CardHeader>
                <CardTitle>
                  {record.practice_date}, 風向: {record.wind_direction ?? "-"},
                  風速: {record.min_wind_speed ?? "-"}~
                  {record.max_wind_speed ?? "-"} m/s, 気温:{" "}
                  {record.temperature ?? "-"}℃
                </CardTitle>
              </CardHeader>

              <CardContent>{record.reflection}</CardContent>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}
