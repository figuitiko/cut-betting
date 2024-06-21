import Await from "@/components/Await";
import TableComponent, { Row } from "@/components/table-component";
import AddItem from "@/components/dashboard/add-item";

import { Player, addPlayer, getPlayers } from "@/lib/actions";
import { Suspense } from "react";

const PlayersPage = () => {
  const players = getPlayers();
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-4">Jugadores</h1>

        <AddItem
          formItems={[
            { name: "name", type: "text", placeholder: "agregar jugador" },
          ]}
          action={addPlayer}
          successMessage="Jugador agregado"
          btnText="Agregar jugador"
        />
      </div>
      <Suspense fallback={<div className="skeleton size-screen" />}>
        <Await promise={players}>
          {(data: Player[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={["Name", "puntos"]}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default PlayersPage;
