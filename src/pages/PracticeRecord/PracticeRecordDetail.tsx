import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { PracticeRecord } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecordDetail() {
  const { id } = useParams();
  const [record, setRecord] = useState<PracticeRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/practice_records/${id}`);
      navigate("/practice-records");
    } catch {
      setError("削除に失敗しました");
    }
  };

  useEffect(() => {
    const fetchRecord = async () => {
      setError(null);
      try {
        const response = await api.get(`/practice_records/${id}`);
        setRecord(response.data);
      } catch {
        setError("取得に失敗しました");
      }
    };
    fetchRecord();
  }, [id]);
  const hasTuning =
    record &&
    (record.mast_rake !== null ||
      record.mast_bend !== null ||
      record.mast_spreader_angle !== null ||
      record.mast_spreader_length !== null ||
      record.mast_tension !== null);

  return (
    <div className="min-h-screen bg-[#f4f9ff]">
      <Header />
      <main className="mx-auto max-w-5xl px-5 pb-32">
        <div className="p-4 sm:p-10">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Card className="p-4 sm:p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-base sm:text-lg">
                {record?.user.username} {record?.practice_date}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 px-0">
              {hasTuning && (
                <div>
                  <p className="text-sm">チューニング詳細</p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg bg-slate-50 p-4 text-sm">
                    {record.mast_rake !== null && (
                      <>
                        <span className="text-muted-foreground">レーキ</span>
                        <span className="font-medium">{record.mast_rake}</span>
                      </>
                    )}

                    {record.mast_bend !== null && (
                      <>
                        <span className="text-muted-foreground">ベンド</span>
                        <span className="font-medium">{record.mast_bend}</span>
                      </>
                    )}

                    {record.mast_spreader_angle !== null && (
                      <>
                        <span className="text-muted-foreground">
                          ディレクション
                        </span>
                        <span className="font-medium">
                          {record.mast_spreader_angle}
                        </span>
                      </>
                    )}

                    {record.mast_spreader_length !== null && (
                      <>
                        <span className="text-muted-foreground">
                          スプレッダー長
                        </span>
                        <span className="font-medium">
                          {record.mast_spreader_length}
                        </span>
                      </>
                    )}

                    {record.mast_tension !== null && (
                      <>
                        <span className="text-muted-foreground">
                          テンション
                        </span>
                        <span className="font-medium">
                          {record.mast_tension}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm">
                {record?.reflection}
              </p>
              {record && record.images.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {record.images.map((image) => (
                    <img
                      key={image.url}
                      src={image.url}
                      alt="練習写真"
                      className="w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </CardContent>
            <div className="flex justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="編集"
                onClick={() => navigate(`/practice-records/${id}/edit`)}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="削除"
                onClick={handleDelete}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
