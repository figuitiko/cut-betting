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
import PageWrapper from "@/components/dashboard/page-wrapper";

const TournamentPage = () => {
  const tournaments = getTournamentsWithId();
  return (
    <PageWrapper
      heading="Torneos"
      childrenInferior={
        <Await promise={tournaments}>
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
          { name: "name", type: "text", placeholder: "agregar Torneo" },
        ]}
        action={addTournament}
        successMessage="torneo agregado"
        btnText="agregar Torneo"
      />
    </PageWrapper>
  );
};

export default TournamentPage;
