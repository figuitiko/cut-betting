import Await from "@/components/Await";
import RankWrapper from "@/components/home/rank-wrapper";
import { getPlayers } from "@/lib/actions";
export const revalidate = 10;

export default function Home() {
  const players = getPlayers();
  return (
    <Await promise={players}>{(data) => <RankWrapper players={data} />}</Await>
  );
}
