/*
  Warnings:

  - The `role` column on the `UserCB` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleCB" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "UserCB" DROP COLUMN "role",
ADD COLUMN     "role" "RoleCB" NOT NULL DEFAULT 'USER';
