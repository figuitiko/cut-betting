import Await from "@/components/Await";
import AddItem from "@/components/dashboard/add-item";
import BetsForm from "@/components/dashboard/bets-form";
import InputSearch from "@/components/dashboard/input-search";
import PageWrapper from "@/components/dashboard/page-wrapper";
import TableComponent, { Row } from "@/components/table-component";
import {
  BetsData,
  getBets,
  getBetsByPlayerName,
  getGamesWithId,
  getPlayers,
  getTeamsWithId,
} from "@/lib/actions";
import React, { Suspense } from "react";

type ISearchParams = Record<string, string | string | undefined>;

const BetsPage = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const players = await getPlayers();
  const teams = await getTeamsWithId();
  const games = await getGamesWithId();
  let bets = getBets();
  const player = searchParams?.player ?? "";
  if (player) {
    bets = getBetsByPlayerName(player);
  }

  return (
    <PageWrapper
      heading="Apuestas"
      childrenInferior={
        <Await promise={bets}>
          {(data: BetsData[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={[
                "jugador",
                "juego",
                "ganador",
                "Fue Empate",
                "Es ganadora",
                "torneo",
              ]}
            />
          )}
        </Await>
      }
    >
      <div className="flex gap-4">
        <InputSearch query="player" placeholder="busca jugador" />
        <AddItem btnText="Agregar Apuesta">
          <BetsForm
            games={games}
            players={players}
            successMessage="Apuesta agregada"
            teams={teams}
          />
        </AddItem>
      </div>
    </PageWrapper>
  );
};

export default BetsPage;
