/*
  Warnings:

  - You are about to drop the `GoalScorerOnTournamentBets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `goalScorerId` to the `TournamentBetsCB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoalScorerOnTournamentBets" DROP CONSTRAINT "GoalScorerOnTournamentBets_goalScorerCBId_fkey";

-- DropForeignKey
ALTER TABLE "GoalScorerOnTournamentBets" DROP CONSTRAINT "GoalScorerOnTournamentBets_tournamentCBBetsId_fkey";

-- AlterTable
ALTER TABLE "TournamentBetsCB" ADD COLUMN     "goalScorerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "GoalScorerOnTournamentBets";

-- AddForeignKey
ALTER TABLE "TournamentBetsCB" ADD CONSTRAINT "TournamentBetsCB_goalScorerId_fkey" FOREIGN KEY ("goalScorerId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
