'use client';

import {
  FiX,
  FiHome,
  FiCreditCard,
  FiRepeat,
  FiBarChart2,
  FiHelpCircle,
  FiUsers,
  FiFrown,
} from 'react-icons/fi';
import Link from 'next/link';

// Navigation items
const navItems = [
  { label: 'Dashboard', href: '/', icon: <FiHome /> },
  { label: 'Deposit', href: '/dashboard/deposit', icon: <FiCreditCard /> },
  { label: 'Transfer Money', href: '/dashboard/transfers', icon: <FiRepeat /> },
  { label: 'Withdrawals', href: '/dashboard/withdraw', icon: <FiFrown /> },
  { label: 'Transactions', href: '/dashboard/transactions', icon: <FiRepeat /> },
  { label: 'Groups', href: '/dashboard/groups', icon: <FiUsers /> },
  { label: 'Reporting', href: '/reporting', icon: <FiBarChart2 /> },
  { label: 'Help & Support', href: '/support', icon: <FiHelpCircle /> },
];

const navAdmins = [
  { label: 'Admin KYC', href: '/admin/kyc', icon: <FiHome /> },
  { label: 'Users', href: '/admin/users', icon: <FiCreditCard /> },
  { label: 'Withdraw Request', href: '/admin/withdrawals', icon: <FiRepeat /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const SidebarContent = (
    <div className="relative flex flex-col p-4 space-y-6 w-full">
      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-red-600 shadow-md" />
          <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">TRUSTFUND</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-700 md:hidden text-2xl hover:text-red-600 transition"
        >
          <FiX />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-3">
        {navItems.map(item => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="
              flex items-center gap-3 p-3 rounded-xl text-gray-200 bg-slate-100
              hover:bg-red-700 text-gray-700 hover:text-white transition
              backdrop-blur-md
            "
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium ">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Admin Section */}
      <div>
        <div className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg mb-2">
          Admin Area
        </div>
        <nav className="flex flex-col gap-2">
          {navAdmins.map(item => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="
                flex items-center gap-3 p-3 rounded-xl text-gray-200 bg-slate-100
              hover:bg-red-700 text-gray-700 hover:text-white transition
              backdrop-blur-md
              "
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-lg">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-white/20 bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Sliding Sidebar */}
          <div className="relative flex flex-col w-64 h-full bg-white/20 backdrop-blur-xl border-r border-white/20 shadow-lg animate-slide-in">
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Slide-in animation */}
      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
