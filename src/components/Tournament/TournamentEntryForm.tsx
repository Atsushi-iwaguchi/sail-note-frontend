import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TournamentEntryRequest } from "@/types";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<TournamentEntryRequest>;
  handleSubmit: UseFormHandleSubmit<TournamentEntryRequest>;
  onSubmit: (data: TournamentEntryRequest) => void;
  error: string | null;
};

export default function TournamentEntryForm({register, handleSubmit, onSubmit, error}: Props) {
  return (
    <>
      <div className="p-4 sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-2">
            <label htmlFor="overall_ranking" className="w-16 shrink-0">
              総合順位
            </label>
            <Input
              id="overall_ranking"
              className="w-20"
              type="number"
              {...register("overall_ranking", { valueAsNumber: true })}
            ></Input>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="reflection" className="w-16 shrink-0">振り返り</label>
            <Textarea {...register("reflection")}></Textarea>

          </div>
          {error && <p>{error}</p>}
          <Button type="submit" className="self-start">
            保存
          </Button>
        </form>
      </div>
    </>
  );
}
