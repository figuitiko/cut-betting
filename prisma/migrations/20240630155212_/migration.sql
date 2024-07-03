/*
  Warnings:

  - You are about to drop the column `amountOfGoals` on the `GoalScorerOnTeamTournamentCB` table. All the data in the column will be lost.
  - Added the required column `goalScorerCBId` to the `GoalScorerOnTeamTournamentCB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goalScorerCBId` to the `TournamentBetsCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoalScorerCB" ADD COLUMN     "amountGoals" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "GoalScorerOnTeamTournamentCB" DROP COLUMN "amountOfGoals",
ADD COLUMN     "goalScorerCBId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TournamentBetsCB" ADD COLUMN     "goalScorerCBId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentBetsCB" ADD CONSTRAINT "TournamentBetsCB_goalScorerCBId_fkey" FOREIGN KEY ("goalScorerCBId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerOnTeamTournamentCB" ADD CONSTRAINT "GoalScorerOnTeamTournamentCB_goalScorerCBId_fkey" FOREIGN KEY ("goalScorerCBId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
