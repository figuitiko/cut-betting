"use client";
import useToastForm from "@/hooks/useToastForm";
import { addGame } from "@/lib/actions";
import { useState } from "react";

type GamesFormProps = {
  teams: { name: string; id: string }[];
  tournaments: { name: string; id: string }[];
  successMessage: string;
};
const GamesForm = ({ teams, tournaments, successMessage }: GamesFormProps) => {
  const { formRef, setShowToast, showToast } = useToastForm();

  return (
    <form
      className="flex flex-col gap-8"
      action={async (formData) => {
        await addGame(formData);
        setShowToast(true);
        formRef.current?.reset();
      }}
    >
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="tournament" className="w-fit">
          escoge torneo
        </label>
        <select
          name="tournament"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge Torneo
          </option>
          {tournaments.map((tournament, index) => (
            <option key={index} value={tournament.id}>
              {tournament.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="teamA" className="w-fit">
          Escoge equipo A
        </label>
        <select
          name="teamA"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge equipo A
          </option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-4 py-2 border-b-2">
        <label htmlFor="teamB" className="w-fit">
          Escoge equipo B
        </label>
        <select
          name="teamB"
          className="select select-bordered w-full max-w-xs"
          defaultValue="N/A"
        >
          <option disabled value="N/A">
            Escoge equipo B
          </option>
          {teams.map((team, index) => (
            <option key={index} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {showToast && (
        <div className="toast toast-success flex gap-4">
          <div className="alert alert-info">
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="form-group">
        <button className="btn">Guardar</button>
      </div>
    </form>
  );
};

export default GamesForm;
