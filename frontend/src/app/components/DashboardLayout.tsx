import { Outlet, Link, useLocation } from "react-router";
import { FileText, Target, History, Settings, HelpCircle, User } from "lucide-react";

const navItems = [
  { path: "/", label: "Analyze Resume", icon: FileText },
  { path: "/optimize", label: "Optimize Resume", icon: Target },
  { path: "/history", label: "History", icon: History },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col bg-[#F8F6F2]">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-[#1F2937]">Smart Resume Builder</h1>
          <p className="text-xs text-[#4B5563]">ATS Optimization Tool</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <HelpCircle className="w-5 h-5 text-[#4B5563]" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <User className="w-5 h-5 text-[#4B5563]" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#0F766E] text-white flex flex-col shadow-lg">
          <nav className="flex-1 py-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 relative ${
                    isActive
                      ? "bg-[#14B8A6] text-white"
                      : "text-[#F8F6F2] hover:bg-[#0D6259]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          {/* Footer in sidebar */}
          <div className="p-6 border-t border-[#0D6259]">
            <p className="text-xs text-[#F8F6F2]/70">Student Project © 2026</p>
          </div>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
