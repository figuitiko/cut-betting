import FirePointsBtn from "@/components/dashboard/fire-points-btn";
import LogOutButton from "@/components/logaut-button";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col  h-screen w-full">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <div className="flex  w-full justify-end ">
        <FirePointsBtn />
      </div>
    </div>
  );
};

export default DashboardPage;
