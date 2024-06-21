import Sidebar from "@/components/dashboard/sidebar";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <header className="flex  justify-between p-24">
        <Sidebar />
      </header>
      <main className="flex min-h-screen flex-col  justify-between p-24 w-full">
        {children}
      </main>
    </div>
  );
};
export default Layout;
