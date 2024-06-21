/*
  Warnings:

  - You are about to drop the `TornamentCB` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameCB" DROP CONSTRAINT "GameCB_tornamentCBId_fkey";

-- DropTable
DROP TABLE "TornamentCB";

-- CreateTable
CREATE TABLE "TournamentCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TournamentCB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameCB" ADD CONSTRAINT "GameCB_tornamentCBId_fkey" FOREIGN KEY ("tornamentCBId") REFERENCES "TournamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
