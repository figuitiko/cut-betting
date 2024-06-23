import React from "react";
import UserBox from "./user-box";
type Player = {
  name: string;
  points: number;
};

type RankWrapperProps = {
  players: Player[];
};
const RankWrapper = ({ players }: RankWrapperProps) => {
  return (
    <div className="flex relative flex-co w-full lg:w-[600px] border-4 border-separate  border-orange-400 items-center justify-center p-6">
      <div className="absolute rounded-b-[200px] rounded-t-[40px] bg-purple-500 px-12 left-1/2 translate-x-[-50%] py-4 top-[-20px]">
        <h3 className="text-white font-bold text-[48px]">Ranking</h3>
      </div>
      <div className="flex flex-col gap-2 mt-20">
        {players.map(({ name, points }, idx) => (
          <UserBox key={idx} name={name} points={points} idx={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default RankWrapper;
