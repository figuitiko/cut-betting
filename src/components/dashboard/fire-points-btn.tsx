"use client";

import { setPoints } from "@/lib/actions";

const FirePointsBtn = () => {
  const handleSetPoints = async () => {
    await setPoints();
  };
  return (
    <button className="btn w-fit" onClick={handleSetPoints}>
      {" "}
      Setea los puntos
    </button>
  );
};

export default FirePointsBtn;
