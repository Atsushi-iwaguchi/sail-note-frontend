import Header from "@/components/header"
import { ChartRadialShape } from "./chart";

export default function MonthlyGoals() {

  return (
    <>
      <Header/>

      <div className="p-5">
          <ChartRadialShape/>
      </div>
    </>
  );
}
