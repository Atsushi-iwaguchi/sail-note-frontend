import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const handleDelete = () => {
    api.delete(`/practice_records/${id}`);
    navigate("/Practice-records");
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

  return (
    <>
      <Header />
      <div className="p-4 sm:p-10">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <Card className="p-4 sm:p-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-base sm:text-lg">
              {record?.user.username} {record?.practice_date}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 px-0">
            <p className="whitespace-pre-wrap text-sm">{record?.reflection}</p>
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
    </>
  );
}
