/*
  Warnings:

  - You are about to drop the column `goalScorerCBId` on the `GoalScorerOnTeamTournamentCB` table. All the data in the column will be lost.
  - Added the required column `goalScorerCBId` to the `TournamentBetsCBonTeam` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP CONSTRAINT "GoalScorerOnTeamTournamentCB_goalScorerCBId_fkey";

-- AlterTable
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP COLUMN "goalScorerCBId";

-- AlterTable
ALTER TABLE "TournamentBetsCBonTeam" ADD COLUMN     "goalScorerCBId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentBetsCBonTeam" ADD CONSTRAINT "TournamentBetsCBonTeam_goalScorerCBId_fkey" FOREIGN KEY ("goalScorerCBId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
