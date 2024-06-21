import Link from "next/link";
import React from "react";
import LogOutButton from "../logaut-button";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-outline btn-success drawer-button lg:hidden w-fit"
        >
          Abre el menú
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
          <li>
            <Link href="/dashboard">Escritorio</Link>
          </li>
          <li>
            <Link href="/dashboard/players">Jugadores</Link>
          </li>
          <li>
            <Link href="/dashboard/teams">Equipos</Link>
          </li>
          <li>
            <Link href="/dashboard/bets">Apuestas</Link>
          </li>
          <li>
            <Link href="/dashboard/tournament">Torneos</Link>
          </li>
          <li>
            <Link href="/dashboard/games">Juegos</Link>
          </li>
          <li>
            <LogOutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
