import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PracticeRecordCreateRequest } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type Props = {
  onSubmit: (data: PracticeRecordCreateRequest) => void;
  register: UseFormRegister<PracticeRecordCreateRequest>;
  handleSubmit: UseFormHandleSubmit<PracticeRecordCreateRequest>;
  error: string | null;
};

export default function PracticeRecordForm({
  onSubmit,
  register,
  handleSubmit,
  error,
}: Props) {
  return (
    <>
      <div className="p-10">
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              日付:
              <Input
                className="w-30"
                type="date"
                {...register("practice_date")}
              />
            </p>
            <p>
              風向
              <Input
                className="w-20"
                type="text"
                {...register("wind_direction")}
              />
              風速 min:
              <Input
                className="w-20"
                type="number"
                {...register("min_wind_speed", {
                  valueAsNumber: true,
                })}
              />
              max:
              <Input
                className="w-20"
                type="number"
                {...register("max_wind_speed", {
                  valueAsNumber: true,
                })}
              />
            </p>
            <p>
              潮汐
              <select {...register("tide")}>
                <option value="">選択してください</option>
                <option value="大潮">大潮</option>
                <option value="中潮">中潮</option>
                <option value="小潮">小潮</option>
              </select>
            </p>
            <p>
              練習内容
              <Input className="w-100" type="text" {...register("content")} />
            </p>
            <div className="mb-4 ">
              <Frame stacked dense spacing="sm" className="w-100 bg-sky-100">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full">
                    <FrameHeader className="flex grow flex-row items-center justify-between gap-2">
                      <FrameTitle className="text-sm font-medium">
                        船のチューニング
                      </FrameTitle>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="text-muted-foreground size-4 transition-transform in-data-open:rotate-90"
                      />
                    </FrameHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <FramePanel>
                      <ul>
                        <li className="grid grid-cols-2 items-center gap-4">
                          <Label htmlFor="mast_tension">テンション</Label>
                          <Input
                            id="mast_tension"
                            type="number"
                            {...register("mast_tension", {
                              valueAsNumber: true,
                            })}
                          />
                        </li>
                        <li className="grid grid-cols-2 items-center gap-2">
                          <Label htmlFor="mast_rake">レーキ</Label>
                          <Input
                            id="mast_rake"
                            type="number"
                            {...register("mast_rake", {
                              valueAsNumber: true,
                            })}
                          />
                        </li>
                        <li className="grid grid-cols-2 items-center gap-2">
                          <Label htmlFor="mast_bend">ベンド</Label>
                          <Input
                            id="mast_bend"
                            type="number"
                            {...register("mast_bend", {
                              valueAsNumber: true,
                            })}
                          />
                        </li>
                        <li className="grid grid-cols-2 items-center gap-2">
                          <Label htmlFor="mast_spreader_angle">
                            ディフレクション
                          </Label>
                          <Input
                            id="mast_spreader_angle"
                            type="number"
                            {...register("mast_spreader_angle", {
                              valueAsNumber: true,
                            })}
                          />
                        </li>
                        <li className="grid grid-cols-2 items-center gap-2">
                          <Label htmlFor="mast_spreader_length">
                            スプレッターの長さ
                          </Label>
                          <Input
                            id="mast_spreader_length"
                            type="number"
                            {...register("mast_spreader_length", {
                              valueAsNumber: true,
                            })}
                          />
                        </li>
                      </ul>
                    </FramePanel>
                  </CollapsibleContent>
                </Collapsible>
              </Frame>
            </div>

            <p>
              振り返り{" "}
              <Input
                className="w-140 h-50"
                type="text"
                {...register("reflection")}
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
