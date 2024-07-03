/*
  Warnings:

  - You are about to drop the column `goalScorerCBId` on the `TournamentBetsCBonTeam` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TournamentBetsCBonTeam" DROP CONSTRAINT "TournamentBetsCBonTeam_goalScorerCBId_fkey";

-- AlterTable
ALTER TABLE "TournamentBetsCBonTeam" DROP COLUMN "goalScorerCBId";

-- CreateTable
CREATE TABLE "GoalScorerOnTournamentBets" (
    "id" TEXT NOT NULL,
    "goalScorerCBId" TEXT NOT NULL,
    "tournamentCBBetsId" TEXT NOT NULL,

    CONSTRAINT "GoalScorerOnTournamentBets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoalScorerOnTournamentBets" ADD CONSTRAINT "GoalScorerOnTournamentBets_goalScorerCBId_fkey" FOREIGN KEY ("goalScorerCBId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerOnTournamentBets" ADD CONSTRAINT "GoalScorerOnTournamentBets_tournamentCBBetsId_fkey" FOREIGN KEY ("tournamentCBBetsId") REFERENCES "TournamentBetsCB"("id") ON DELETE CASCADE ON UPDATE CASCADE;
