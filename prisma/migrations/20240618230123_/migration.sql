/*
  Warnings:

  - Added the required column `teamBCBId` to the `GameCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameCB" ADD COLUMN     "teamBCBId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GameCB" ADD CONSTRAINT "GameCB_teamBCBId_fkey" FOREIGN KEY ("teamBCBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
