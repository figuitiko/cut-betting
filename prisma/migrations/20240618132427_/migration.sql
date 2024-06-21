/*
  Warnings:

  - You are about to drop the column `userCBId` on the `BetCB` table. All the data in the column will be lost.
  - Added the required column `playerCBId` to the `BetCB` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BetCB" DROP CONSTRAINT "BetCB_userCBId_fkey";

-- AlterTable
ALTER TABLE "BetCB" DROP COLUMN "userCBId",
ADD COLUMN     "playerCBId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PlayerCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerCB_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BetCB" ADD CONSTRAINT "BetCB_playerCBId_fkey" FOREIGN KEY ("playerCBId") REFERENCES "PlayerCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
