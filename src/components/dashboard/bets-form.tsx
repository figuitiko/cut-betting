"use client";
import useToastForm from "@/hooks/useToastForm";
import { addBet, getGameById, getPlayerByName } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type BetsFormProps = {
  games: { name: string; id: string }[];
  players: { name: string; id: string }[];
  teams: { name: string; id: string }[];
  successMessage: string;
};
const BetsForm = ({ games, players, successMessage }: BetsFormProps) => {
  const { formRef, setShowToast, showToast } = useToastForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [possibleWinners, setPossibleWinners] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [draw, setDraw] = useState<string>("");
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [playerFetched, setPlayerFetched] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleWinner = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const game = await getGameById(e.target.value);
    setPossibleWinners([game.teamACB.name, game.teamBCB.name]);
  };
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);
  useEffect(() => {
    if (player) {
      const fetchPlayerByName = async () => {
        return await getPlayerByName(player);
      };
      fetchPlayerByName().then((data) => {
        if (data) {
          setPlayerFetched(data);
        }
      });
    } else {
      setPlayerFetched(null);
    }
  }, [player]);
  return (
    <form
      className="flex flex-col gap-8"
      action={async (formData) => {
        const data = await addBet(formData);
        if (data) {
          setErrorMsg(data);
          return;
        }
        setShowToast(true);
        formRef.current?.reset();
      }}
    >
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="game" className="w-fit">
          Escoge juego
        </label>
        <select
          name="game"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
          onChange={handleWinner}
        >
          <option disabled value="N/A">
            Escoge juego
          </option>
          {games.map((game, index) => (
            <option key={index} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="teamWinnerName">Escoge ganador</label>
        <select
          name="teamWinnerName"
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => setWinner(e.target.value)}
          disabled={draw !== "" && draw !== "N/A" && draw !== "no"}
        >
          <option value="N/A">Escoge ganador</option>
          {possibleWinners.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="jugador">Escoge Jugador</label>
        <select
          name="player"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge Jugador
          </option>
          {!playerFetched ? (
            players.map((player, index) => (
              <option key={index} value={player.id}>
                {player.name}
              </option>
            ))
          ) : (
            <option value={playerFetched.id}>{playerFetched.name}</option>
          )}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="isDraw">Fue empate?</label>
        <select
          name="isDraw"
          className="select select-bordered w-full max-w-xs"
          disabled={winner !== "" && winner !== "N/A"}
          // value={winner !== "" && winner !== "N/A" ? draw : "N/A"}
          onChange={(e) => setDraw(e.target.value)}
        >
          <option disabled value="N/A">
            Fue empate?
          </option>

          <option value="si">Si</option>
          <option value="no">No</option>
        </select>
      </div>

      {showToast && (
        <div className="toast toast-success flex gap-4">
          <div className="alert alert-info">
            <span>{successMessage}</span>
          </div>
        </div>
      )}
      {errorMsg && (
        <div className="toast toast-alert flex gap-4">
          <div className="alert alert-info">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <button className="btn">Guardar</button>
      </div>
    </form>
  );
};

export default BetsForm;
