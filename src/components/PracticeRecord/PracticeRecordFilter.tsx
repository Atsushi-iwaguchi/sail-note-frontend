// src/components/PracticeRecordFilter.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon } from "lucide-react";
import type { FilterValues } from "@/types/PracticeRecordFilter";

export const initialFilter: FilterValues = {
  fromDate: "",
  toDate: "",
  windDirection: "",
  minWindSpeed: "",
  maxWindSpeed: "",
};

type Props = {
  onFilterChange: (values: FilterValues) => void;
};

export function PracticeRecordFilter({ onFilterChange }: Props) {
  const [values, setValues] = useState<FilterValues>(initialFilter);

  const handleChange = (key: keyof FilterValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => onFilterChange(values);

  const handleReset = () => {
    setValues(initialFilter);
    onFilterChange(initialFilter);
  };

  return (
    <Collapsible >
      <CollapsibleTrigger className="flex items-center gap-1 text-sm text-muted-foreground">
        絞り込み
        <ChevronRightIcon className="size-4 transition-transform in-data-open:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-wrap items-end gap-3 py-3 bg-white">
          <div className="flex flex-col gap-1">
            <Label htmlFor="from_date" className="text-xs">開始日</Label>
            <Input
              id="from_date"
              type="date"
              className="w-40"
              value={values.fromDate}
              onChange={(e) => handleChange("fromDate", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="to_date" className="text-xs">終了日</Label>
            <Input
              id="to_date"
              type="date"
              className="w-40"
              value={values.toDate}
              onChange={(e) => handleChange("toDate", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="wind_direction" className="text-xs">風向</Label>
            <Input
              id="wind_direction"
              type="text"
              className="w-24"
              value={values.windDirection}
              onChange={(e) => handleChange("windDirection", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="min_wind_speed" className="text-xs">風速 min</Label>
            <Input
              id="min_wind_speed"
              type="number"
              className="w-24"
              value={values.minWindSpeed}
              onChange={(e) => handleChange("minWindSpeed", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="max_wind_speed" className="text-xs">風速 max</Label>
            <Input
              id="max_wind_speed"
              type="number"
              className="w-24"
              value={values.maxWindSpeed}
              onChange={(e) => handleChange("maxWindSpeed", e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleApply}>絞り込む</Button>
            <Button size="sm" variant="ghost" onClick={handleReset}>リセット</Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}