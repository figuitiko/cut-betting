-- DropForeignKey
ALTER TABLE "TournamentBetsCBonTeam" DROP CONSTRAINT "TournamentBetsCBonTeam_tournamentCBBetsId_fkey";

-- AddForeignKey
ALTER TABLE "TournamentBetsCBonTeam" ADD CONSTRAINT "TournamentBetsCBonTeam_tournamentCBBetsId_fkey" FOREIGN KEY ("tournamentCBBetsId") REFERENCES "TournamentBetsCB"("id") ON DELETE CASCADE ON UPDATE CASCADE;
