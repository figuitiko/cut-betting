"use client";
import usePlayerByParams from "@/hooks/usePlayerByParams";
import useToastForm from "@/hooks/useToastForm";
import {
  addTournamentBet,
  getScorerByTournament,
  getTeamsByTournament,
} from "@/lib/actions";

import { MAX_GROUPS_AMERICA, MAX_GROUPS_EURO } from "@/lib/config";
import { useState } from "react";
import SubmitBtn from "../submit-btn";
import { set } from "zod";

type TournamentBetsFormProps = {
  players: { name: string; id: string }[];
  tournament: { name: string; id: string }[];
};
const tournamentMapper = {
  Eurocopa: MAX_GROUPS_EURO,
  "Copa América": MAX_GROUPS_AMERICA,
} as const;
type TournamentMapped = keyof typeof tournamentMapper;

const TournamentBetsForm = ({
  tournament,
  players,
}: TournamentBetsFormProps) => {
  const [teams, setTeams] = useState<{ name: string; id: string }[]>([]);
  const [scorers, setScorers] = useState<{ name: string; id: string }[]>([]);
  const [scorerOnText, setScorerOnText] = useState(false);
  const { formRef, setShowToast, showToast } = useToastForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedTournament, setSelectedTournament] = useState<
    TournamentMapped | string
  >("");
  const [leaders, setLeaders] = useState<(string | undefined)[]>([]);
  const playerFetched = usePlayerByParams();
  const [showAddBtn, setShowAddBtn] = useState(false);
  const handleOnChangeTournament = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTournament(() => {
      if (e.target.value === "N/A") return "";
      const foundTournament = tournament.find(
        (item) => item.id === e.target.value
      );
      return foundTournament?.name ?? "";
    });
    const teamsByTournament = await getTeamsByTournament(e.target.value);
    setTeams(
      teamsByTournament.map((team) => ({ name: team.name, id: team.id }))
    );
    const goalsScorers = await getScorerByTournament(e.target.value);
    setScorers(
      goalsScorers.map((scorer) => ({ name: scorer.name, id: scorer.id }))
    );
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col gap-8"
      action={async (formData) => {
        const data = addTournamentBet(formData);
        if (data && typeof data === "string") {
          setErrorMsg(data);
          return;
        }
        setShowToast(true);
        formRef.current?.reset();
        setTeams([]);
        setScorers([]);
        setSelectedTournament("");
      }}
    >
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="tournament" className="w-fit">
          Escoje torneo {selectedTournament}
        </label>
        <select
          name="tournament"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
          onChange={handleOnChangeTournament}
        >
          <option value="N/A">Escoge Torneo</option>
          {tournament?.map((tournament, index) => (
            <option key={index} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="leadersGroup" className="w-fit">
          Lideres de grupo
        </label>
        <div className="flex flex-wrap">
          {leaders?.map((leader, index) => (
            <div key={index} className="badge badge-accent">
              {leader}
            </div>
          ))}
        </div>
        <select
          name="leadersGroup"
          className="select select-bordered w-full max-w-xs"
          defaultValue={[]}
          disabled={selectedTournament === ""}
          multiple
          onChange={(e) => {
            const selectedLeaders = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            const selectedLeadersMapped = selectedLeaders?.map((leader) => {
              const leaderFound = teams.find((team) => team.id === leader);
              return leaderFound?.name;
            });
            const maxAmountGroups =
              tournamentMapper[
                selectedTournament as keyof typeof tournamentMapper
              ];
            setLeaders(selectedLeadersMapped.slice(0, maxAmountGroups));
          }}
        >
          <option disabled value="N/A">
            Escoge Lideres de grupo
          </option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="champion" className="w-fit">
          Escoge campeon
        </label>
        <select
          name="champion"
          className="select select-bordered w-full max-w-xs"
          disabled={selectedTournament === ""}
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge Campeon
          </option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="scorer" className="w-fit">
          Agrega goleador del torneo
        </label>
        <select
          name="scorer"
          className="select select-bordered w-full max-w-xs"
          disabled={selectedTournament === "" || scorerOnText || showAddBtn}
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge goleador
          </option>
          {scorers.map((scorer, index) => (
            <option key={index} value={scorer.id}>
              {scorer.name}
            </option>
          ))}
        </select>
        {showAddBtn ? (
          <input
            type="text"
            name="scorer"
            placeholder="Escribe nombre del goleador"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => {
              setScorerOnText(e.target.value !== "");
              if (e.target.value === "") {
                setShowAddBtn(false);
              }
            }}
          />
        ) : (
          <button
            className="btn btn-secondary btn-outline max-w-fit"
            onClick={() => {
              setShowAddBtn(true);
            }}
          >
            Agregar goleador
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="scorerTeam" className="w-fit">
          Escoge equipo del goleador
        </label>
        <select
          name="scorerTeam"
          className="select select-bordered w-full max-w-xs"
          disabled={selectedTournament === ""}
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge equipo del goleador
          </option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
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
      {showToast && (
        <div className="toast toast-success flex gap-4">
          <div className="alert alert-info">
            <span>Apuesta agreada con exito</span>
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
      <div className="flex">
        <SubmitBtn>Guardar</SubmitBtn>
      </div>
    </form>
  );
};

export default TournamentBetsForm;
