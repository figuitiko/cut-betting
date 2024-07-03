"use client";
import { getPlayerByName } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const usePlayerByParams = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [playerFetched, setPlayerFetched] = useState<{
    id: string;
    name: string;
  } | null>(null);
  useEffect(() => {
    if (player) {
      const fetchPlayerByName = async () => {
        return await getPlayerByName(player);
      };
      fetchPlayerByName().then((data) => {
        if (data) {
          setPlayerFetched(data);
        }
      });
    } else {
      setPlayerFetched(null);
    }
  }, [player]);
  return playerFetched;
};

export default usePlayerByParams;
