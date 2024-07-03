-- AlterTable
ALTER TABLE "TeamCB" ADD COLUMN     "tournamentId" TEXT NOT NULL DEFAULT 'clxkyr0hm0000shq1mkpypx56';

-- AddForeignKey
ALTER TABLE "TeamCB" ADD CONSTRAINT "TeamCB_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
