import Header from "@/components/Header";
import {
  initialFilter,
  PracticeRecordFilter,
} from "@/components/PracticeRecord/PracticeRecordFilter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { PracticeRecord } from "@/types";
import type { FilterValues } from "@/types/PracticeRecordFilter";
import { ClipboardPen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PracticeRecords() {
  const [records, setRecords] = useState<PracticeRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterValues>(initialFilter);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get("/practice_records", {
          params: {
            from_date: filter.fromDate || undefined,
            to_date: filter.toDate || undefined,
            wind_direction: filter.windDirection || undefined,
            min_wind_speed: filter.minWindSpeed || undefined,
            max_wind_speed: filter.maxWindSpeed || undefined,
          },
        });
        setRecords(response.data);
      } catch {
        setError("練習記録の取得に失敗しました");
      }
    };
    fetchRecords();
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-32">
        <section className="pt-10 sm:pt-14">
          <div className="flex items-center gap-3">
            <ClipboardPen className="size-8 text-[#064b87]" />
            <h1 className="text-3xl font-bold text-[#064b87] sm:text-4xl">
              練習記録一覧
            </h1>
          </div>
          <p className="mt-3 text-slate-600">これまでの練習記録を確認</p>
        </section>
        <div className="flex flex-col gap-4 py-6 sm:py-10">
          <Button onClick={() => navigate("/practice-records/new")}>
            <Plus className="size-4" />
            新規作成
          </Button>

          <PracticeRecordFilter onFilterChange={setFilter} />
        </div>

        {error && <p className="text-red-500 text-sm mb-2 mt-3">{error}</p>}

        <ul className="list-none flex flex-col gap-3 mt-4">
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
      </main>
    </div>
  );
}
