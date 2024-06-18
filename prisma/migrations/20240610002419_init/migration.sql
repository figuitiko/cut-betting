-- CreateTable
CREATE TABLE "UserCB" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BetCB" (
    "id" TEXT NOT NULL,
    "userCBId" TEXT NOT NULL,
    "gameCBId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BetCB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDraw" BOOLEAN NOT NULL,
    "teamACBId" TEXT NOT NULL,
    "tornamentCBId" TEXT NOT NULL,

    CONSTRAINT "GameCB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamCB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TornamentCB" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TornamentCB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCB_email_key" ON "UserCB"("email");

-- AddForeignKey
ALTER TABLE "BetCB" ADD CONSTRAINT "BetCB_userCBId_fkey" FOREIGN KEY ("userCBId") REFERENCES "UserCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BetCB" ADD CONSTRAINT "BetCB_gameCBId_fkey" FOREIGN KEY ("gameCBId") REFERENCES "GameCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCB" ADD CONSTRAINT "GameCB_teamACBId_fkey" FOREIGN KEY ("teamACBId") REFERENCES "TeamCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCB" ADD CONSTRAINT "GameCB_tornamentCBId_fkey" FOREIGN KEY ("tornamentCBId") REFERENCES "TornamentCB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
