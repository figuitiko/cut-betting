import { PrismaClient } from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export const prisma = new PrismaClient();

// helper function to convert boolean in yes or not
export const booleanToYesNo = (value: boolean) => (value ? "Si" : "No");

export const pathMapper = {
  "/dashboard/players": "playerCB",
  "/dashboard/teams": "teamCB",
  "/dashboard/tournaments": "tournamentCB",
  "/dashboard/games": "gameCB",
  "/dashboard/bets": "betCB",
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
