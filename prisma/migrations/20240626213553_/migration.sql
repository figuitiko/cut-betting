/*
  Warnings:

  - You are about to drop the column `tournamentCBonBetsId` on the `TournamentBetsCBonTeam` table. All the data in the column will be lost.
  - Added the required column `tournamentCBBetsId` to the `TournamentBetsCBonTeam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TournamentBetsCBonTeam" DROP CONSTRAINT "TournamentBetsCBonTeam_tournamentCBonBetsId_fkey";

-- AlterTable
ALTER TABLE "TournamentBetsCBonTeam" DROP COLUMN "tournamentCBonBetsId",
ADD COLUMN     "tournamentCBBetsId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentBetsCBonTeam" ADD CONSTRAINT "TournamentBetsCBonTeam_tournamentCBBetsId_fkey" FOREIGN KEY ("tournamentCBBetsId") REFERENCES "TournamentBetsCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
