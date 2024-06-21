/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TeamCB` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isDraw` to the `BetCB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamWinnerId` to the `BetCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BetCB" ADD COLUMN     "isDraw" BOOLEAN NOT NULL,
ADD COLUMN     "teamWinnerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamCB_name_key" ON "TeamCB"("name");
