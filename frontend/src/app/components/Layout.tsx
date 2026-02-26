import { Link, Outlet, useLocation } from 'react-router';
import { FileText } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[#2563EB] p-2 rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <span className="text-xl font-semibold text-[#111827]">Smart Resume Builder</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-[#2563EB]' 
                    : 'text-gray-600 hover:text-[#2563EB]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'text-[#2563EB]' 
                    : 'text-gray-600 hover:text-[#2563EB]'
                }`}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="font-semibold text-[#111827]">Smart Resume Builder with ATS Optimization</p>
            <p className="text-sm text-gray-600">Final Year Engineering Project - 2026</p>
            <p className="text-xs text-gray-500">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}