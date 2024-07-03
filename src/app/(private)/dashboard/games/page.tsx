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
import PageWrapper from "@/components/dashboard/page-wrapper";

export const revalidate = 10;

const GamesPage = async () => {
  const tournaments = await getTournamentsWithId();
  const teams = await getTeamsWithId();
  const games = getGames();

  return (
    <PageWrapper
      heading="juegos"
      childrenInferior={
        <Await promise={games}>
          {(data: Player[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={[
                "Equipo 1",
                "Equipo 2",
                "Fue Empate",
                "Ganador",
                "resultado",
                "Torneo",
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
      }
    >
      <AddItem successMessage="Juego agregado" btnText="Agregar Juego">
        <GamesForm
          teams={teams}
          tournaments={tournaments}
          successMessage="juego agregado"
        />
      </AddItem>
    </PageWrapper>
  );
};

export default GamesPage;
