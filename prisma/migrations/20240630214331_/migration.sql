/*
  Warnings:

  - You are about to drop the column `goalScorerCBId` on the `TournamentBetsCB` table. All the data in the column will be lost.
  - You are about to drop the `GoalScorerOnTeamTournamentCB` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamCBId` to the `GoalScorerCB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tournamentCBId` to the `GoalScorerCB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP CONSTRAINT "GoalScorerOnTeamTournamentCB_teamCBId_fkey";

-- DropForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP CONSTRAINT "GoalScorerOnTeamTournamentCB_tournamentCBId_fkey";

-- DropForeignKey
ALTER TABLE "TournamentBetsCB" DROP CONSTRAINT "TournamentBetsCB_goalScorerCBId_fkey";

-- AlterTable
ALTER TABLE "GoalScorerCB" ADD COLUMN     "teamCBId" TEXT NOT NULL,
ADD COLUMN     "tournamentCBId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TournamentBetsCB" DROP COLUMN "goalScorerCBId";

-- DropTable
DROP TABLE "GoalScorerOnTeamTournamentCB";

-- AddForeignKey
ALTER TABLE "GoalScorerCB" ADD CONSTRAINT "GoalScorerCB_teamCBId_fkey" FOREIGN KEY ("teamCBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerCB" ADD CONSTRAINT "GoalScorerCB_tournamentCBId_fkey" FOREIGN KEY ("tournamentCBId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
