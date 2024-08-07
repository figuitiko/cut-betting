import Sidebar from "@/components/dashboard/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <header className="flex flex-col md:flex-row  justify-between p-2 md:p-24 md:px-2">
        <Sidebar />
      </header>
      <main className="flex min-h-screen flex-col  justify-between p-2 md:py-24 md:px-2 w-full">
        {children}
      </main>
    </div>
  );
};
export default Layout;
