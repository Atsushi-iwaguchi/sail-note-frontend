import Header from "@/components/Header";
import { api } from "@/lib/axios";
import type { PracticeRecordCreateRequest } from "@/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import PracticeRecordForm from "../../components/PracticeRecord/PracticeRecordForm";

export default function PracticeRecordNew() {
  const { id } = useParams();
  const { register, handleSubmit, watch, reset, setValue } =
    useForm<PracticeRecordCreateRequest>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      const response = await api.get(`/practice_records/${id}`);
      reset(response.data);
    };
    fetchRecord();
  }, [id, reset]);

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

      await api.patch(`/practice_records/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/practice-records");
    } catch {
      setError("練習記録の更新に失敗しました");
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
