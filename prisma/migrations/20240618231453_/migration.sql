/*
  Warnings:

  - Added the required column `isDraw` to the `GameCB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamWinnerName` to the `GameCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameCB" ADD COLUMN     "isDraw" BOOLEAN NOT NULL,
ADD COLUMN     "teamWinnerName" TEXT NOT NULL;
