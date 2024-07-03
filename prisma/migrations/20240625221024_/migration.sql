-- AlterTable
ALTER TABLE "TeamCB" ADD COLUMN     "isChampion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLeaderGroup" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TournamentBetsCB" (
    "id" TEXT NOT NULL,
    "playerCBId" TEXT NOT NULL,
    "goalScorerCBId" TEXT NOT NULL,

    CONSTRAINT "TournamentBetsCB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentBetsCBonTeam" (
    "id" TEXT NOT NULL,
    "teamCBId" TEXT NOT NULL,

    CONSTRAINT "TournamentBetsCBonTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoalScorerCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tournamentCBId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamCBId" TEXT NOT NULL,

    CONSTRAINT "GoalScorerCB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoalScorerCB_tournamentCBId_key" ON "GoalScorerCB"("tournamentCBId");

-- CreateIndex
CREATE UNIQUE INDEX "GoalScorerCB_teamCBId_key" ON "GoalScorerCB"("teamCBId");

-- AddForeignKey
ALTER TABLE "TournamentBetsCB" ADD CONSTRAINT "TournamentBetsCB_playerCBId_fkey" FOREIGN KEY ("playerCBId") REFERENCES "PlayerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentBetsCB" ADD CONSTRAINT "TournamentBetsCB_goalScorerCBId_fkey" FOREIGN KEY ("goalScorerCBId") REFERENCES "GoalScorerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentBetsCBonTeam" ADD CONSTRAINT "TournamentBetsCBonTeam_teamCBId_fkey" FOREIGN KEY ("teamCBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerCB" ADD CONSTRAINT "GoalScorerCB_tournamentCBId_fkey" FOREIGN KEY ("tournamentCBId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoalScorerCB" ADD CONSTRAINT "GoalScorerCB_teamCBId_fkey" FOREIGN KEY ("teamCBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
