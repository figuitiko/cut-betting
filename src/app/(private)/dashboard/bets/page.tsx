import Await from "@/components/Await";
import AddItem from "@/components/dashboard/add-item";
import BetsForm from "@/components/dashboard/bets-form";
import GamesForm from "@/components/dashboard/games-form";
import Modal from "@/components/modal";
import TableComponent, { Row } from "@/components/table-component";
import {
  BetsData,
  Player,
  getBets,
  getGames,
  getGamesWithId,
  getPlayers,
  getTeamsWithId,
  getTournamentsWithId,
  updateGame,
} from "@/lib/actions";
import React, { Suspense } from "react";

const BetsPage = async () => {
  const tournaments = await getTournamentsWithId();
  const players = await getPlayers();
  const teams = await getTeamsWithId();
  const games = await getGamesWithId();
  const bets = getBets();
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-4">Juegos</h1>

        <AddItem successMessage="Juego agregado" btnText="Agregar Apuesta">
          <BetsForm
            games={games}
            players={players}
            successMessage="juego agregado"
            teams={teams}
          />
        </AddItem>
      </div>
      <Suspense fallback={<div className="skeleton size-screen" />}>
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
              ]}
              updateFn={updateGame}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default BetsPage;
