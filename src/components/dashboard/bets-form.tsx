"use client";
import useToastForm from "@/hooks/useToastForm";
import { addBet, getGameById } from "@/lib/actions";
import { useEffect, useState } from "react";

type BetsFormProps = {
  games: { name: string; id: string }[];
  players: { name: string; id: string }[];
  teams: { name: string; id: string }[];
  successMessage: string;
};
const BetsForm = ({ games, players, successMessage, teams }: BetsFormProps) => {
  const { formRef, setShowToast, showToast } = useToastForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [possibleWinners, setPossibleWinners] = useState<string[]>([]);
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
  return (
    <form
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
      <div className="flex flex-col gap-4">
        <select
          name="game"
          className="select w-full max-w-xs"
          defaultValue="0"
          onChange={handleWinner}
        >
          <option disabled value="0">
            Escoge juego
          </option>
          {games.map((game, index) => (
            <option key={index} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <select
          name="teamWinnerName"
          className="select w-full max-w-xs"
          defaultValue="0"
        >
          <option value="0">Escoge ganador</option>
          {possibleWinners.map((team, index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <select
          name="player"
          className="select w-full max-w-xs"
          defaultValue="3"
        >
          <option disabled value="3">
            Escoge Jugador
          </option>
          {players.map((player, index) => (
            <option key={index} value={player.id}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name="isDraw"
          className="select w-full max-w-xs"
          defaultValue="0"
        >
          <option disabled value="0">
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
