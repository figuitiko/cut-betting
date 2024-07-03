import { PrismaClient } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

// helper function to convert boolean in yes or not
export const booleanToYesNo = (value: boolean) => (value ? "Si" : "No");

export const pathMapper = {
  "/dashboard/players": "playerCB",
  "/dashboard/teams": "teamCB",
  "/dashboard/tournaments": "tournamentCB",
  "/dashboard/games": "gameCB",
  "/dashboard/bets": "betCB",
  "/dashboard/tournament-bets": "tournamentBetCB",
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
