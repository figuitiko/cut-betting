import Await from "@/components/Await";
import TableComponent, { Row } from "@/components/table-component";
import AddItem from "@/components/dashboard/add-item";
import {
  addTournament,
  getTournamentsWithId,
  Player,
  TeamType,
} from "@/lib/actions";
import React, { Suspense } from "react";

const TournamentPage = () => {
  const tournaments = getTournamentsWithId();
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-4">Torneos</h1>
        <AddItem
          formItems={[
            { name: "name", type: "text", placeholder: "agregar Torneo" },
          ]}
          action={addTournament}
          successMessage="torneo agregado"
          btnText="agregar Torneo"
        />
      </div>
      <Suspense fallback={<div className="skeleton size-screen" />}>
        <Await promise={tournaments}>
          {(data: TeamType[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={["Name"]}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default TournamentPage;
