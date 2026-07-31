import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MonthlyGoalsRequest } from "@/types";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Props = {
  register: UseFormRegister<MonthlyGoalsRequest>;
  onSubmit: (data: MonthlyGoalsRequest) => void;
  handleSubmit: UseFormHandleSubmit<MonthlyGoalsRequest>;
  error: string | null;
};

export default function MonthlyGoalsForm({
  register,
  onSubmit,
  handleSubmit,
  error,
}: Props) {
  return (
    <>
      <div className="p-4 sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="goal_date">目標月</Label>
            <Input
              id="goal_date"
              className="w-full sm:w-40"
              type="date"
              {...register("goal_date")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="content">目標内容</Label>
            <Textarea
              id="content"
              className="w-full"
              {...register("content")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="achievement_rate">達成率（%）</Label>
            <Input
              id="achievement_rate"
              className="w-full sm:w-32"
              type="number"
              min={0}
              max={100}
              {...register("achievement_rate", { valueAsNumber: true })}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="self-start">
            保存
          </Button>
        </form>
      </div>
    </>
  );
}
