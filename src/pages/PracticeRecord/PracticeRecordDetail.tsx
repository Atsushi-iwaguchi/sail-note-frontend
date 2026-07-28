import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { PracticeRecord } from "@/types";
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
      <div className="m-4">
        {error && <p>{error}</p>}
        <Card className="p-2">
          <p>{record?.user.username} {record?.practice_date}</p>
          <p>{record?.reflection}</p>
          <p></p>
          <Button className="w-15" onClick={(handleDelete)} >削除</Button>
          <Button className="w-15" onClick={() => navigate(`/Practice-records/${id}/edit`)} >編集</Button>
        </Card>
        
      </div>    
    </>
  );
}
