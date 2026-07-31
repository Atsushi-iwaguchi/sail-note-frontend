import Header from "@/components/header";
import { api } from "@/lib/axios";
import type { PracticeRecordCreateRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PracticeRecordForm from "./PracticeRecordForm";

export default function PracticeRecordNew() {
  const { register, handleSubmit, watch, setValue } = useForm<PracticeRecordCreateRequest>({
    defaultValues: {
      //今日の日付を自動で取得する
      practice_date: new Date().toISOString().split("T")[0],
    },
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: PracticeRecordCreateRequest) => {
    setError(null);
    try {
      await api.post("/practice_records", { practice_record: data });
      navigate("/practice-records");
    } catch {
      setError("練習記録の作成に失敗しました");
    }
  };
  return (
    <>
      <Header />
      <PracticeRecordForm 
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        watch={watch}
        setValue={setValue}
        error={error}
      />
    </>
  );
}
