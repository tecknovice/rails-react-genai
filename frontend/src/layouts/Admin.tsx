import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">Admin Dashboard</h1>
      </header>
      <main className="flex-grow p-4">
        {/* Add your admin content here */}
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2023 Your Company
      </footer>
    </div>
  );
}
