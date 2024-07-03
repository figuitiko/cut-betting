import Await from "@/components/Await";
import TableComponent, { Row } from "@/components/table-component";
import AddItem from "@/components/dashboard/add-item";

import { Player, addPlayer, getPlayers } from "@/lib/actions";
import { Suspense } from "react";
import PageWrapper from "@/components/dashboard/page-wrapper";

const PlayersPage = () => {
  const players = getPlayers();
  return (
    <PageWrapper
      heading="Jugadores"
      childrenInferior={
        <Await promise={players}>
          {(data: Player[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={["Name", "puntos"]}
            />
          )}
        </Await>
      }
    >
      <AddItem
        formItems={[
          { name: "name", type: "text", placeholder: "agregar jugador" },
        ]}
        action={addPlayer}
        successMessage="Jugador agregado"
        btnText="Agregar jugador"
      />
    </PageWrapper>
  );
};

export default PlayersPage;
