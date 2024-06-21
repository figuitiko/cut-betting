/*
  Warnings:

  - You are about to drop the column `teamWinnerId` on the `BetCB` table. All the data in the column will be lost.
  - Added the required column `teamWinnerName` to the `BetCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BetCB" DROP COLUMN "teamWinnerId",
ADD COLUMN     "teamWinnerName" TEXT NOT NULL;
