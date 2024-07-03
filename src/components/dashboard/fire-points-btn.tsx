"use client";

import { setPoints } from "@/lib/actions";

const FirePointsBtn = () => {
  const handleSetPoints = async () => {
    await setPoints();
  };
  return (
    <button
      className="btn btn-accent btn-outline w-fit"
      onClick={handleSetPoints}
    >
      {" "}
      Setea los puntos
    </button>
  );
};

export default FirePointsBtn;
