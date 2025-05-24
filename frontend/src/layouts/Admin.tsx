import { Outlet, Link } from "react-router";
import { useEffect, useState } from "react";
import { Users, FileText, BarChart, Settings, Bell } from "lucide-react";

export default function AdminLayout() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    activeUsers: 0,
  });

  // Fetch stats from API (replace with actual API call)
  useEffect(() => {
    // Simulated data for demonstration
    setStats({
      totalUsers: 124,
      totalBlogs: 456,
      publishedBlogs: 320,
      activeUsers: 95,
    });

    // Actual implementation would be:
    // const fetchStats = async () => {
    //   try {
    //     const response = await fetch('/api/admin/stats');
    //     const data = await response.json();
    //     setStats(data);
    //   } catch (error) {
    //     console.error('Error fetching admin stats:', error);
    //   }
    // };
    // fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <NavLink
            to="/admin"
            exact
            icon={<BarChart size={20} />}
            label="Overview"
          />
          <NavLink to="/admin/users" icon={<Users size={20} />} label="Users" />
          <NavLink
            to="/admin/blogs"
            icon={<FileText size={20} />}
            label="Blogs"
          />
          <NavLink
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex space-x-4 items-center">
            <button className="text-gray-500 hover:text-gray-700">
              <span className="sr-only">Notifications</span>
              <Bell size={20} />
            </button>
            <div className="relative">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Admin user"
                />
                <span className="ml-2">Admin User</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={<Users size={24} className="text-blue-600" />}
              title="Total Users"
              value={stats.totalUsers}
            />
            <StatCard
              icon={<FileText size={24} className="text-green-600" />}
              title="Total Blogs"
              value={stats.totalBlogs}
            />
            <StatCard
              icon={<FileText size={24} className="text-yellow-600" />}
              title="Published Blogs"
              value={stats.publishedBlogs}
            />
            <StatCard
              icon={<Users size={24} className="text-purple-600" />}
              title="Active Users"
              value={stats.activeUsers}
            />
          </div>

          {/* Outlet for nested routes */}
          <Outlet />
        </main>

        <footer className="bg-white border-t p-3 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Your Company - Admin Portal
        </footer>
      </div>
    </div>
  );
}

// Navigation link component
function NavLink({ to, icon, label, exact }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

// Stat card component
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-gray-100 mr-4">{icon}</div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-semibold">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
