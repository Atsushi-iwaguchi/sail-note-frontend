import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import type { Tournament_Entries } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TournamentEntry() {
  const { id, entry_id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<Tournament_Entries>();

  useEffect(() => {
    const fetchEntry = async () => {
      setError(null);
      try {
        const response = await api.get(`/tournaments/${id}/tournament_entries/${entry_id}`);
        setEntry(response.data);
      } catch {
        setError("取得できませんでした");
      }
    };
    fetchEntry();
  }, [entry_id]);

  return (
    <>
      <Header />
      <div>
        <p>{entry?.overall_ranking}位</p>
        <p>{entry?.reflection}</p>
        <p>
          {entry?.race_results
            .sort((a, b) => a.race_number - b.race_number)
            .map((result) => result.score)
            .join("-")}
        </p>
        {error && <p>{error}</p>}
      </div>
      <Button onClick={() => navigate(`/race-result/${entry_id}/edit`)}>
        編集
      </Button>
    </>
  );
}
