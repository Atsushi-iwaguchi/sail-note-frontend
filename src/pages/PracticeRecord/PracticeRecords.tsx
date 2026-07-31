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
      <div>
        <Button onClick={() => navigate("/practice-records/new")}>
          新規作成
        </Button>
      </div>
      <div className="p-5">
        <p>絞り込み</p>
        {error && <p>{error}</p>}
        <ul>
          {records.map((record) => (
            <li className="mb-2" key={record.id}>
              <Card
                className="cursor-pointer p-4"
                onClick={() => navigate(`/practice-records/${record.id}`)}
              >
                <CardHeader>
                  <CardTitle>
                    {record.user?.username} {record.practice_date}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p>
                    風向: {record.wind_direction ?? "-"}, 風速:
                    {record.min_wind_speed ?? "-"}~
                    {record.max_wind_speed ?? "-"} m/s, 気温:
                    {record.temperature ?? "-"}℃
                  </p>

                  <p>{record.reflection}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
