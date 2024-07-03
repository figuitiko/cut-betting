/*
  Warnings:

  - You are about to drop the column `isGoalScorer` on the `GoalScorerCB` table. All the data in the column will be lost.
  - You are about to drop the column `isGoalScorer` on the `GoalScorerOnTeamTournamentCB` table. All the data in the column will be lost.
  - You are about to drop the column `goalScorerCBId` on the `TournamentBetsCB` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TournamentBetsCB" DROP CONSTRAINT "TournamentBetsCB_goalScorerCBId_fkey";

-- AlterTable
ALTER TABLE "GoalScorerCB" DROP COLUMN "isGoalScorer";

-- AlterTable
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP COLUMN "isGoalScorer",
ADD COLUMN     "amountOfGoals" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "TournamentBetsCB" DROP COLUMN "goalScorerCBId";
