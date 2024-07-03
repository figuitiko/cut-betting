/*
  Warnings:

  - You are about to drop the column `teamCBId` on the `GoalScorerCB` table. All the data in the column will be lost.
  - You are about to drop the column `tournamentCBId` on the `GoalScorerCB` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "GoalScorerCB" DROP CONSTRAINT "GoalScorerCB_teamCBId_fkey";

-- DropForeignKey
ALTER TABLE "GoalScorerCB" DROP CONSTRAINT "GoalScorerCB_tournamentCBId_fkey";

-- AlterTable
ALTER TABLE "GoalScorerCB" DROP COLUMN "teamCBId",
DROP COLUMN "tournamentCBId";

-- CreateTable
CREATE TABLE "GoalScorerOnTeamTournamentCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamCBId" TEXT NOT NULL,
    "tournamentCBId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isGoalScorer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GoalScorerOnTeamTournamentCB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" ADD CONSTRAINT "GoalScorerOnTeamTournamentCB_teamCBId_fkey" FOREIGN KEY ("teamCBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" ADD CONSTRAINT "GoalScorerOnTeamTournamentCB_tournamentCBId_fkey" FOREIGN KEY ("tournamentCBId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
