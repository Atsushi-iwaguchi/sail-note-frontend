import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { MonthlyGoalsRequest } from "@/types";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<MonthlyGoalsRequest>;
  onSubmit: (data: MonthlyGoalsRequest) => void;
  handleSubmit: UseFormHandleSubmit<MonthlyGoalsRequest>;
  error: string | null;
};

export default function MonthlyGoalsForm({
    register, onSubmit, handleSubmit, error
}: Props) {
  return (
    <>
      <div>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              目標月
              <Input className="w-30" type="date" {...register("goal_date")} />
            </p>

            <p>
              目標内容
              <Input className="w-80" type="text" {...register("content")} />
            </p>
            <p>
              達成率
              <Input
                className="w-30"
                type="number"
                {...register("achievement_rate", { valueAsNumber: true })}
              />
            </p>

            {error && <p>{error}</p>}
            <Button type="submit">保存</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
