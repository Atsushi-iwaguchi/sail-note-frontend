import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/axios";
import type { Tournament_Entries } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
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
        const response = await api.get(
          `/tournaments/${id}/tournament_entries/${entry_id}`,
        );
        setEntry(response.data);
        console.log(response.data);
      } catch {
        setError("取得できませんでした");
      }
    };
    fetchEntry();
  }, [entry_id, id]);

  const handleDelete = () => {
    api.delete(`/tournament_entries/${entry_id}`);
    navigate(`/tournaments/${id}/tournament-entries`);
  };

  const hasRaceResults = (entry?.race_results.length ?? 0) > 0;

  return (
    <>
      <Header />
      <div className="p-4 sm:p-10">
        <Card className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-3">
            <p>{entry?.user.username}</p>
            <p>総合順位: {entry?.overall_ranking}位</p>
            <p>
              各レース結果:{" "}
              {!hasRaceResults && (
                <Button
                  variant="ghost"
                  className="underline"
                  onClick={() =>
                    navigate(
                      `/tournaments/${id}/tournament-entries/${entry_id}/race-result/new`,
                    )
                  }
                >
                  結果の登録
                  <Pencil className="size-4" />
                </Button>
              )}
              {entry?.race_results.map((result) => result.score).join("-")}
            </p>
          </div>

          <p className="mb-3 whitespace-pre-wrap text-sm text-left">
            内容: {entry?.reflection}
          </p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <Button
            variant="ghost"
            size="icon"
            aria-label="削除"
            onClick={handleDelete}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 className="size-4" />
          </Button>
        </Card>
      </div>
    </>
  );
}
