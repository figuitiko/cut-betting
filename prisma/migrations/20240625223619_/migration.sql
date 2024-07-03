/*
  Warnings:

  - Added the required column `tournamentCBonBetsId` to the `TournamentBetsCBonTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentBetsCBonTeam" ADD COLUMN     "isChampion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLeaderGroup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tournamentCBonBetsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentBetsCBonTeam" ADD CONSTRAINT "TournamentBetsCBonTeam_tournamentCBonBetsId_fkey" FOREIGN KEY ("tournamentCBonBetsId") REFERENCES "TournamentBetsCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
