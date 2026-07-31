import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import type { PracticeRecordCreateRequest } from "@/types";
import { weatherCodeToText } from "@/utils/weather";
import { useEffect } from "react";
import {
  type UseFormHandleSubmit,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import TuningTable from "./TunigTable";

type Props = {
  onSubmit: (data: PracticeRecordCreateRequest) => void;
  register: UseFormRegister<PracticeRecordCreateRequest>;
  handleSubmit: UseFormHandleSubmit<PracticeRecordCreateRequest>;
  watch: UseFormWatch<PracticeRecordCreateRequest>;
  setValue: UseFormSetValue<PracticeRecordCreateRequest>;
  error: string | null;
};

export default function PracticeRecordForm({
  onSubmit,
  register,
  handleSubmit,
  watch,
  setValue,
  error,
}: Props) {
  const PracticeDate = watch("practice_date");
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await api.get(
          `https://archive-api.open-meteo.com/v1/archive?latitude=34.61339095702542&longitude=134.14620374592707&start_date=${PracticeDate}&end_date=${PracticeDate}&daily=temperature_2m_mean,weather_code,wind_speed_10m_max,wind_direction_10m_dominant&timezone=Asia%2FTokyo&wind_speed_unit=ms`,
        );
        const weather = response.data.daily;
        setValue("temperature", weather.temperature_2m_mean[0]);
        setValue("weather", weatherCodeToText(weather.weather_code[0]));
      } catch (error) {
        console.error(error);
      }
    };

    if (PracticeDate) {
      fetchWeather();
    }
  }, [PracticeDate, setValue]);

  return (
    <>
      <div className="p-4 sm:p-10">
        <Card className="p-4 sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="practice_date" className="w-16 shrink-0">
                日付
              </label>
              <Input
                id="practice_date"
                className="w-full sm:w-40"
                type="date"
                {...register("practice_date")}
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="wind_direction" className="shrink-0">
                  風向
                </label>
                <Input
                  id="wind_direction"
                  className="w-24"
                  type="text"
                  {...register("wind_direction")}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="min_wind_speed" className="shrink-0">
                  風速 min
                </label>
                <Input
                  id="min_wind_speed"
                  className="w-20"
                  type="number"
                  {...register("min_wind_speed", { valueAsNumber: true })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="max_wind_speed" className="shrink-0">
                  max
                </label>
                <Input
                  id="max_wind_speed"
                  className="w-20"
                  type="number"
                  {...register("max_wind_speed", { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <label htmlFor="weather" className="shrink-0">
                  天気
                </label>
                <Input
                  id="weather"
                  className="w-24"
                  type="text"
                  {...register("weather")}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="temperature" className="shrink-0">
                  気温
                </label>
                <Input
                  id="temperature"
                  className="w-24"
                  type="number"
                  step="0.1"
                  {...register("temperature", { valueAsNumber: true })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="tide" className="shrink-0">
                  潮汐
                </label>
                <select
                  id="tide"
                  className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  {...register("tide")}
                >
                  <option value="">選択してください</option>
                  <option value="oshio">大潮</option>
                  <option value="nakashio">中潮</option>
                  <option value="koshio">小潮</option>
                  <option value="nagashio">長潮</option>
                  <option value="wakashio">若潮</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="content">練習内容</label>
              <Input
                id="content"
                className="w-full"
                type="text"
                {...register("content")}
              />
            </div>

            <TuningTable register={register} />

            <div className="flex flex-col gap-2">
              <label htmlFor="reflection">振り返り</label>
              <Input
                id="reflection"
                className="w-full h-32"
                type="text"
                {...register("reflection")}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="self-start">
              保存
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
