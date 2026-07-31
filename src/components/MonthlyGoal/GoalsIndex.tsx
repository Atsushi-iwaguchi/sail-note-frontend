import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Monthly_goals } from "@/types";

type Props = {
  goals: Monthly_goals[];
};
export default function GoalsIndex({ goals }: Props) {
  return (
    <>
      <h2>過去の目標一覧</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">日付</TableHead>
            <TableHead className="w-[100px]">目標</TableHead>
            <TableHead className="text-right">達成率</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {goals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="font-medium">{goal.goal_date}</TableCell>
              <TableCell>{goal.content}</TableCell>
              <TableCell className="text-right">
                {goal.achievement_rate}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
