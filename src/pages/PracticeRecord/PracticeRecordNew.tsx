import Header from "@/components/Header";
import { api } from "@/lib/axios";
import type { PracticeRecordCreateRequest } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PracticeRecordForm from "../../components/PracticeRecord/PracticeRecordForm";

export default function PracticeRecordNew() {
  const { register, handleSubmit, watch, setValue } =
    useForm<PracticeRecordCreateRequest>({
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
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "images") {
          const files = value as File[] | undefined;
          files?.forEach((file) => {
            formData.append("practice_record[images][]", file);
          });
        } else if (value !== undefined && value !== null) {
          formData.append(`practice_record[${key}]`, String(value));
        }
      });

      await api.post("/practice_records", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
