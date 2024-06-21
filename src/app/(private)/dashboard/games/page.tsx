import Await from "@/components/Await";
import TableComponent, { Row } from "@/components/table-component";
import AddItem from "@/components/dashboard/add-item";
import GamesForm from "@/components/dashboard/games-form";
import {
  getGames,
  getTeamsWithId,
  getTournamentsWithId,
  Player,
  updateGame,
} from "@/lib/actions";
import { Suspense } from "react";

const GamesPage = async () => {
  const tournaments = await getTournamentsWithId();
  const teams = await getTeamsWithId();
  const games = getGames();
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-4">Juegos</h1>

        <AddItem successMessage="Juego agregado" btnText="Agregar Juego">
          <GamesForm
            teams={teams}
            tournaments={tournaments}
            successMessage="juego agregado"
          />
        </AddItem>
      </div>
      <Suspense fallback={<div className="skeleton size-screen" />}>
        <Await promise={games}>
          {(data: Player[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={[
                "Equipo 1",
                "Equipo 2",
                "Torneo",
                "Fue Empate",
                "Ganador",
                "resultado",
              ]}
              editableFields={[
                { name: "teamWinnerName", options: teams },
                { name: "isDraw", options: [{ name: "Si" }, { name: "No" }] },
                { name: "result" },
              ]}
              updateFn={updateGame}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default GamesPage;
