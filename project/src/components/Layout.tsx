import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Layout() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <Link to="/" className="ml-2 text-xl font-bold text-gray-900">
                P2P Insurance
              </Link>
            </div>
            <div className="flex items-center">
              {currentUser ? (
                <>
                  <Link
                    to="/communities"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2"
                  >
                    Communities
                  </Link>
                  <Link
                    to="/claims"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2"
                  >
                    Claims
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}