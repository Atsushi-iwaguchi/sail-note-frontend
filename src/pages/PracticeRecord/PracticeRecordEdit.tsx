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
      await api.patch(`/practice_records/${id}`, { practice_record: data });
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
