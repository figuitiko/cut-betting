import Image from "next/image";

const UserBox = ({
  idx,
  points,
  name,
}: {
  idx: number;
  points: number;
  name: string;
}) => {
  return (
    <div className="flex gap-4  bg-teal-100 p-4 rounded-lg">
      <div className="flex items-center justify-center p-8   bg-orange-200 size-10  rounded-full">
        <span>{idx}</span>
      </div>
      <picture className="flex items-center justify-center">
        <Image
          src={`https://api.multiavatar.com/${name}.png`}
          alt="user"
          width={60}
          height={60}
        />
      </picture>
      <div className="flex flex-col gap-2  text-purple-500">
        <h3>{name}</h3>
        <span className=" text-orange-400">{points}</span>
      </div>
    </div>
  );
};

export default UserBox;
