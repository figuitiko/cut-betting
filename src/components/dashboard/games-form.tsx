"use client";
import useToastForm from "@/hooks/useToastForm";
import { addGame } from "@/lib/actions";

type GamesFormProps = {
  teams: { name: string; id: string }[];
  tournaments: { name: string; id: string }[];
  successMessage: string;
};
const GamesForm = ({ teams, tournaments, successMessage }: GamesFormProps) => {
  const { formRef, setShowToast, showToast } = useToastForm();
  return (
    <form
      action={async (formData) => {
        await addGame(formData);
        setShowToast(true);
        formRef.current?.reset();
      }}
    >
      <div className="form-group">
        <select
          name="teamA"
          className="select w-full max-w-xs"
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
      <div className="form-group">
        <select
          name="teamB"
          className="select w-full max-w-xs"
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
      <div className="form-group">
        <select
          name="tournament"
          className="select w-full max-w-xs"
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
