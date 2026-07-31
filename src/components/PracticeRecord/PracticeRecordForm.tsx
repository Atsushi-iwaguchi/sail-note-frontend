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
              天気
              <Input
                className="w-20"
                type="text"
                {...register("weather")}
              ></Input>
              気温
              <Input
                className="w-20"
                type="number"
                step="0.1"
                {...register("temperature", {
                  valueAsNumber: true,
                })}
              ></Input>
              潮汐
              <select
                className=" w-20
                            rounded-md
                            border
                            border-input
                            bg-background
                            px-3
                            py-2
                            text-sm shadow-sm
                            outline-none
                            focus:ring-2
                            focus:ring-ring
                            focus:ring-offset-2"
                {...register("tide")}
              >
                <option value="">選択してください</option>
                <option value="oshio">大潮</option>
                <option value="nakashio">中潮</option>
                <option value="koshio">小潮</option>
                <option value="nagashio">長潮</option>
                <option value="wakashio">若潮</option>
              </select>
            </p>
            <p>
              練習内容
              <Input className="w-100" type="text" {...register("content")} />
            </p>
            <TuningTable register={register} />
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
