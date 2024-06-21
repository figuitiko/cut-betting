/*
  Warnings:

  - Added the required column `tournamentCBId` to the `BetCB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BetCB" ADD COLUMN     "tournamentCBId" TEXT NOT NULL;
