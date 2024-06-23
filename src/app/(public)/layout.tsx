import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 lg:p-24">
      {children}
    </main>
  );
};

export default Layout;
