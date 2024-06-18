"use client";

import { logout } from "@/app/auth/auth";

const LogOutButton = () => {
  return (
    <button className="btn btn-accent" onClick={() => logout()}>
      Accent
    </button>
  );
};

export default LogOutButton;
