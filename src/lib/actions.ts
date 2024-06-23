"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "./util";
import { z } from "zod";
import { GameCB, PlayerCB, TeamCB, TournamentCB } from "@prisma/client";
import { FormStateItems } from "@/components/dashboard/form-item";

const schemaPlayers = z.object({
  name: z.string({
    invalid_type_error: "Invalid Name",
    required_error: "Name is required",
  }),
});

export const addPlayer = async (
  state: FormStateItems<{ name: string }> | undefined,
  formData: FormData
) => {
  const name = formData.get("name");
  const validatedData = schemaPlayers.safeParse({
    name,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.playerCB.create({
      data: {
        name: formData.get("name") as string,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/players");
};

export type Player = {
  id: string;
  name: string;
  points: number;
};
const getterPlayers = async (): Promise<PlayerCB[]> => {
  return await prisma.playerCB.findMany({
    orderBy: {
      points: "desc",
    },
  });
};

export const getPlayers = async (): Promise<Player[]> => {
  const data = await getterPlayers();
  const result = data.map((player) => ({
    id: player.id,
    name: player.name,
    points: player.points,
  }));
  return result;
};

export const addTournament = async (
  state: FormStateItems<{ name: string }> | undefined,
  formData: FormData
) => {
  const name = formData.get("name");
  const validatedData = schemaPlayers.safeParse({
    name,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.tournamentCB.create({
      data: {
        name: formData.get("name") as string,
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/tournament");
};
const getterTournament = async (): Promise<TournamentCB[]> => {
  return await prisma.tournamentCB.findMany();
};
export const getTournaments = async (): Promise<TeamType[]> => {
  const data = await getterTournament();
  const result = data?.map((tournament) => ({
    name: tournament.name,
    id: tournament.id,
  }));
  return result;
};
export const getTournamentsWithId = async (): Promise<
  { id: string; name: string }[]
> => {
  const data = await getterTournament();
  const result =
    data?.map((tournament) => ({
      id: tournament.id,
      name: tournament.name,
    })) || [];
  return result;
};

export const addTeam = async (
  state: FormStateItems<{ name: string }> | undefined,
  formData: FormData
) => {
  const name = formData.get("name");
  const validatedData = schemaPlayers.safeParse({
    name,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.teamCB.create({
      data: {
        name: formData.get("name") as string,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getterTeams = async (): Promise<TeamCB[]> => {
  return await prisma.teamCB.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
export type TeamType = {
  id: string;
  name: string;
};

export const getTeams = async (): Promise<TeamType[]> => {
  const data = await getterTeams();

  const result = data?.map((team) => ({
    id: team.id,
    name: team.name,
  }));
  revalidatePath("/dashboard/team");
  return result;
};
export const getTeamsWithId = async (): Promise<
  Pick<PlayerCB, "id" | "name">[]
> => {
  const data = await getterTeams();
  const result = data?.map((team) => ({
    id: team.id,
    name: team.name,
  }));
  return result;
};

const schemaGame = z.object({
  teamA: z.string({
    invalid_type_error: "Invalid Team A",
  }),
  teamB: z.string({
    invalid_type_error: "Invalid Team B",
  }),
  tournament: z.string({
    invalid_type_error: "Invalid Tournament",
  }),
});

export const addGame = async (formData: FormData) => {
  const teamA = formData.get("teamA");
  const teamB = formData.get("teamB");
  const tournament = formData.get("tournament");
  const validatedData = schemaGame.safeParse({
    teamA,
    teamB,
    tournament,
  });
  if (!validatedData.success) {
    return {
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.gameCB.create({
      data: {
        teamACB: {
          connect: { id: teamA as string },
        },
        teamBCB: {
          connect: { id: teamB as string },
        },
        tornamentCB: {
          connect: { id: tournament as string },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/game");
};

export type Games = GameCB & {
  teamACB: { name: string };
  teamBCB: { name: string };
  tornamentCB: { name: string };
};
const getterGames = async (): Promise<Games[]> => {
  return await prisma.gameCB.findMany({
    include: {
      teamACB: {
        select: {
          name: true,
        },
      },
      teamBCB: {
        select: {
          name: true,
        },
      },
      tornamentCB: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const getGamesWithId = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const data = await getterGames();
  return data.map((game) => ({
    id: game.id,
    name: game.teamACB.name + " vs " + game.teamBCB.name,
  }));
};
export const getGames = async (): Promise<any> => {
  const data = await getterGames();
  return data.map((game) => ({
    id: game.id,
    teamA: game.teamACB.name,
    teamB: game.teamBCB.name,
    isDraw: game.isDraw,
    teamWinnerName: game.teamWinnerName,
    result: game.result,
    tournament: game.tornamentCB.name,
  }));
};

export const getGameById = async (id: string): Promise<Games> => {
  const game = await prisma.gameCB.findUnique({
    where: {
      id,
    },
    include: {
      teamACB: {
        select: {
          name: true,
        },
      },
      teamBCB: {
        select: {
          name: true,
        },
      },
      tornamentCB: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!game) {
    throw new Error(`Game with ID ${id} not found.`);
  }

  return game;
};
// const updateGame = (
//   state:
//     | { errors: { teamA?: string[]; teamB?: string[]; tournament?: string[] } }
//     | undefined,
//   formData: FormData
// ) => {
//   // Your implementation here
// };

export const updateGame = async (
  idRecord: string,
  data: Record<string, string | number | boolean>
) => {
  console.log(data);
  if (data.isDraw === "Si") {
    data.teamWinnerName = "";
    data.isDraw = true;
  } else {
    data.isDraw = false;
  }
  console.log(data);
  // all the bets where the game is
  // const bets = prisma.betCB.findMany({});

  try {
    if (data.isDraw) {
      await prisma.betCB.updateMany({
        where: {
          AND: [
            {
              gameCBId: idRecord,
            },
            {
              isDraw: {
                equals: true,
              },
            },
          ],
        },
        data: {
          isWinner: true,
        },
      });
    } else {
      await prisma.betCB.updateMany({
        where: {
          AND: [
            {
              gameCBId: idRecord,
            },
            {
              teamWinnerName: {
                equals: data.teamWinnerName as string,
              },
            },
          ],
        },
        data: {
          isWinner: true,
        },
      });
    }
    // const betsGroupByPlayer = await prisma.betCB.groupBy({
    //   by: ["playerCBId"],
    //   where: {
    //     isWinner: true,
    //   },
    //   _count: {
    //     isWinner: true,
    //   },
    // });

    // await prisma.playerCB.updateMany({
    //   where: {
    //     id: {
    //       in: betsGroupByPlayer.map((user) => user.playerCBId),
    //     },
    //   },
    //   data: {
    //     points: betsGroupByPlayer
    //       .map((user) => user._count.isWinner)
    //       .reduce((acc, curr) => acc + curr, 0),
    //   },
    // });

    // console.log(usersCount);

    await prisma.gameCB.update({
      where: {
        id: idRecord as string,
      },
      data,
    });
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/dashboard/game");
};
export type PrismaMapper =
  | "playerCB"
  | "teamCB"
  | "tournamentCB"
  | "gameCB"
  | "betCB";
export const deleteRecordById = async (
  idRecord: string,
  path: string,
  table: PrismaMapper
) => {
  try {
    switch (table) {
      case "playerCB":
        await prisma.playerCB.delete({
          where: {
            id: idRecord,
          },
        });
        break;
      case "teamCB":
        await prisma.teamCB.delete({
          where: {
            id: idRecord,
          },
        });
        break;
      case "tournamentCB":
        await prisma.tournamentCB.delete({
          where: {
            id: idRecord,
          },
        });
        break;
      case "gameCB":
        await prisma.gameCB.delete({
          where: {
            id: idRecord,
          },
        });
        break;
      case "betCB":
        await prisma.betCB.delete({
          where: {
            id: idRecord,
          },
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
  revalidatePath(path);
};

export const addBet = async (formData: FormData) => {
  const game = formData.get("game");
  const teamWinnerName = formData.get("teamWinnerName");
  let isDraw = formData.get("isDraw");
  const player = formData.get("player");

  try {
    await prisma.betCB.create({
      data: {
        gameCB: {
          connect: { id: game as string },
        },
        playerCB: {
          connect: { id: player as string },
        },
        teamWinnerName: teamWinnerName as string,
        isDraw: isDraw === "si",
      },
    });
    revalidatePath("/dashboard/bets");
  } catch (error) {
    console.error(error);
    return "error adding bet";
  }
};

export const getterBets = async () => {
  return await prisma.betCB.findMany({
    include: {
      gameCB: {
        select: {
          teamACB: {
            select: {
              name: true,
            },
          },
          tornamentCB: {
            select: {
              name: true,
            },
          },
          teamBCB: {
            select: {
              name: true,
            },
          },
        },
      },
      playerCB: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export type BetsData = {
  id: string;
  player: string;
  game: string;
  teamWinnerName: string;
  isDraw: boolean;
  tournament: string;
};
export const getBets = async (): Promise<BetsData[]> => {
  const data = await getterBets();
  return data.map((bet) => ({
    id: bet.id,
    player: bet.playerCB.name,
    game: bet.gameCB.teamACB.name + " vs " + bet.gameCB.teamBCB.name,
    teamWinnerName: bet.teamWinnerName,
    isDraw: bet.isDraw,
    isWinner: bet.isWinner,
    tournament: bet.gameCB.tornamentCB.name,
  }));
};
export const getBetsByPlayerName = async (
  player: string
): Promise<BetsData[]> => {
  const bets = await prisma.betCB.findMany({
    where: {
      playerCB: {
        name: {
          contains: player,
          mode: "insensitive",
        },
      },
    },
    include: {
      gameCB: {
        select: {
          teamACB: {
            select: {
              name: true,
            },
          },
          tornamentCB: {
            select: {
              name: true,
            },
          },
          teamBCB: {
            select: {
              name: true,
            },
          },
        },
      },
      playerCB: {
        select: {
          name: true,
        },
      },
    },
  });
  return bets.map((bet) => ({
    id: bet.id,
    player: bet.playerCB.name,
    game: bet.gameCB.teamACB.name + " vs " + bet.gameCB.teamBCB.name,
    teamWinnerName: bet.teamWinnerName,
    isDraw: bet.isDraw,
    isWinner: bet.isWinner,
    tournament: bet.gameCB.tornamentCB.name,
  }));
};
// get all the bets and group by player
// get all the games and get the winner
// compare the winner with the bet
// if is the same add points to the player

const basicPoints = [
  {
    id: "clxoodu2a0000m50p3j4lgr0v",
    points: 7,
  },
  {
    id: "clxkqkad40002poa7zide643i",
    points: 10,
  },
  {
    id: "clxkqct360001poa71gvhxocz",
    points: 11,
  },
  {
    id: "clxkomtw50000pjp63sdtg7kv",
    points: 12,
  },
  {
    id: "clxkr7zoe0007poa7wts38vys",
    points: 10,
  },
  {
    id: "clxp2ia160015m50pbu3iohsh",
    points: 13,
  },
  {
    id: "clxkqasrn0000poa7qn48350k",
    points: 11,
  },
  {
    id: "clxkqnbds0004poa7h1w45bhw",
    points: 11,
  },
];
export const setPoints = async () => {
  try {
    // const games = await getterGames();
    // set the winner bets where the game is draw
    await prisma.betCB.updateMany({
      where: {
        isWinner: true,
      },
      data: {
        isWinner: false,
      },
    });
    await prisma.gameCB.findMany({
      where: {
        isDraw: true,
      },
      include: {
        bets: {
          where: {
            isDraw: true,
          },
        },
      },
    });
    await prisma.betCB.updateMany({
      where: {
        AND: [
          {
            isDraw: true,
          },
          {
            gameCB: {
              isDraw: true,
            },
          },
        ],
      },
      data: {
        isWinner: true,
      },
    });
    const betsWhereNotDraw = await prisma.betCB.findMany({
      where: {
        AND: [
          {
            isDraw: false,
          },
          {
            gameCB: {
              isDraw: false,
            },
          },
        ],
      },
      include: {
        gameCB: {
          select: {
            isDraw: true,
            teamWinnerName: true,
          },
        },
      },
    });

    await Promise.allSettled(
      betsWhereNotDraw.map(async (element) => {
        if (element.teamWinnerName === element.gameCB.teamWinnerName) {
          const result = await prisma.betCB.update({
            where: {
              id: element.id,
            },
            data: {
              isWinner: true,
            },
          });
          return result;
        }
      })
    );
    const betsGroupByPlayer = await prisma.betCB.groupBy({
      by: ["playerCBId"],
      where: {
        isWinner: true,
      },
      _count: {
        isWinner: true,
      },
    });
    await prisma.playerCB.updateMany({
      data: {
        points: 0,
      },
    });
    await Promise.allSettled(
      basicPoints.map(async (element) => {
        const result = await prisma.playerCB.update({
          where: {
            id: element.id,
          },
          data: {
            points: {
              increment: element.points,
            },
          },
        });
        return result;
      })
    );
    await Promise.allSettled(
      betsGroupByPlayer.map(async (user) => {
        const result = await prisma.playerCB.update({
          where: {
            id: user.playerCBId,
          },
          data: {
            points: {
              increment: Number(user._count.isWinner),
            },
          },
        });
        return result;
      })
    );
  } catch (error) {
    console.error(error);
    return "error setting points";
  }
  revalidatePath("/dashboard/players");
};
