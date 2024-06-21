import Await from "@/components/Await";
import TableComponent, { Row } from "@/components/table-component";
import AddItem from "@/components/dashboard/add-item";
import {
  addTeam,
  getTeams,
  getTeamsWithId,
  Player,
  TeamType,
} from "@/lib/actions";
import React, { Suspense } from "react";

const TeamPage = () => {
  const teams = getTeamsWithId();
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-bold mb-4">Equipos</h1>
        <AddItem
          formItems={[
            { name: "name", type: "text", placeholder: "agregar Equipo" },
          ]}
          action={addTeam}
          successMessage="Equipo agregado"
          btnText="agregar Equipo"
        />
      </div>
      <Suspense fallback={<div className="skeleton size-screen" />}>
        <Await promise={teams}>
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

export default TeamPage;
