import Await from "@/components/Await";
import AddItem from "@/components/dashboard/add-item";
import InputSearch from "@/components/dashboard/input-search";
import PageWrapper from "@/components/dashboard/page-wrapper";
import TournamentBetsForm from "@/components/dashboard/tournament-bets-form";
import TableComponent, { Row } from "@/components/table-component";
import {
  TournamentBets,
  getPlayers,
  getTeamsWithId,
  getTournamentBets,
  getTournamentsWithId,
} from "@/lib/actions";
import React, { Suspense } from "react";

const TournamentBetsPage = async () => {
  const tournaments = getTournamentsWithId();
  const players = getPlayers();
  const data = Promise.all([tournaments, players]);
  const tournamentBets = getTournamentBets();

  return (
    <PageWrapper
      heading="Apuestas del Torneo"
      childrenInferior={
        <Await promise={tournamentBets}>
          {(data: TournamentBets[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={[
                "Goleador",
                "equipo del goleador",
                "Equipo Campeon",
                "Lideres de grupo",
                "jugador",
                "Torneo",
                "es Ganadora",
              ]}
            />
          )}
        </Await>
      }
    >
      <div className="flex gap-4">
        <Suspense fallback={<div className="skeleton size-screen" />}>
          <InputSearch query="player" placeholder="busca jugador" />
          <AddItem successMessage="Juego agregado" btnText="Agregar Apuesta">
            <Await promise={data}>
              {([tournaments, players]) => (
                <TournamentBetsForm
                  tournament={tournaments}
                  players={players}
                />
              )}
            </Await>
          </AddItem>
        </Suspense>
      </div>
    </PageWrapper>
  );
};

export default TournamentBetsPage;
