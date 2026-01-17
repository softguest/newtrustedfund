'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

interface DashboardHeaderProps {
  onOpenSidebar: () => void;
}

export default function DashboardHeader({ onOpenSidebar }: DashboardHeaderProps) {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* LEFT: Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            onClick={onOpenSidebar}
            className="text-2xl text-red-600 md:hidden"
            aria-label="Open sidebar"
          >
            <FiMenu />
          </button>

          {/* Desktop title */}
          <h1 className="hidden md:block text-xl font-bold text-gray-800">
            Banking Dashboard
          </h1>
        </div>

        

        {/* RIGHT: Auth / User */}
        <div className="flex items-center">
          {/* CENTER: Search (Desktop only) */}
        <div className="md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
          {!user ? (
            <Link href="/sign-in">
              <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                Login
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <UserButton />
              <span className="hidden lg:block text-sm font-semibold text-gray-700">
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
