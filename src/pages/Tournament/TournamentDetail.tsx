import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/axios";
import type { Tournament, Tournament_Entries } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TournamentDetail() {
  const { id } = useParams();
  const [tournament, setTournament] = useState<Tournament>();
  const [entries, setEntries] = useState<Tournament_Entries[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      setError(null);
      try {
        const response = await api.get(`/tournaments/${id}`);
        setTournament(response.data);
      } catch {
        setError("取得に失敗しました");
      }
    };
    fetchTournament();

    const fetchEntries = async () => {
      setError(null);
      try {
        const response = await api.get(`/tournaments/${id}/tournament_entries`);
        setEntries(response.data);
        console.log(response.data);
      } catch {
        setError("取得に失敗しました");
      }
    };
    fetchEntries();
  }, [id]);


  return (
    <>
      <Header />

      <div className="m-4">
        {error && <p>{error}</p>}
        <p>{tournament?.name}</p>
        <p>開催日{tournament?.start_date}</p>
        <p>参加艇数 {tournament?.boats_count}艇</p>
        <p>レース数 {tournament?.race_count}</p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">名前</TableHead>
              <TableHead className="w-[100px]">レース結果</TableHead>
              <TableHead className="text-right">総合順位</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow
                key={entry.id}
                onClick={() =>
                  navigate(
                    `/tournaments/${id}/tournament-entries/${entry.user_id}`,
                  )
                }
              >
                <TableCell className="font-medium">aaa</TableCell>
                <TableCell>
                  {entry.race_results
                    .sort((a, b) => a.race_number - b.race_number)
                    .map((result) => result.score)
                    .join("-")}
                </TableCell>
                <TableCell className="text-right">
                  {entry.overall_ranking}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button onClick={()=> navigate(`/tournaments/${id}/tournament_entries/new`)}>add</Button>
      </div>
    </>
  );
}
