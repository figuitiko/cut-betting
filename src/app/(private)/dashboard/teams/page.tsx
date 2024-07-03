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
import PageWrapper from "@/components/dashboard/page-wrapper";

const TeamPage = () => {
  const teams = getTeamsWithId();
  return (
    <PageWrapper
      heading="Equipos"
      childrenInferior={
        <Await promise={teams}>
          {(data: TeamType[]) => (
            <TableComponent
              rows={data as unknown as Row[]}
              headingColumns={["Name"]}
            />
          )}
        </Await>
      }
    >
      <AddItem
        formItems={[
          { name: "name", type: "text", placeholder: "agregar Equipo" },
        ]}
        action={addTeam}
        successMessage="Equipo agregado"
        btnText="agregar Equipo"
      />
    </PageWrapper>
  );
};

export default TeamPage;
