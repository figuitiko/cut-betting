/*
  Warnings:

  - Added the required column `tournamentCBId` to the `TournamentBetsCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentBetsCB" ADD COLUMN     "tournamentCBId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentBetsCB" ADD CONSTRAINT "TournamentBetsCB_tournamentCBId_fkey" FOREIGN KEY ("tournamentCBId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
