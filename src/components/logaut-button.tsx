"use client";

import { logout } from "@/app/auth/auth";

const LogOutButton = () => {
  return (
    <button className="btn btn-outline" onClick={() => logout()}>
      salir
    </button>
  );
};

export default LogOutButton;
