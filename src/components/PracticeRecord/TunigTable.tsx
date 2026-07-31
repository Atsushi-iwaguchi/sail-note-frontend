import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/reui/frame";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PracticeRecordCreateRequest } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<PracticeRecordCreateRequest>;
};

export default function TuningTable({ register }: Props) {
  return (
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
                  <Label htmlFor="mast_spreader_angle">ディフレクション</Label>
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
  );
}
