'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  BookOpen, 
  UserCircle, 
  LogOut,
  Menu,
  X 
} from "lucide-react";
import { useState, useEffect } from "react";

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Book Management', href: '/admin/books', icon: BookOpen },
  { name: 'Profile', href: '/admin/profile', icon: UserCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          ${isMobile ? 'w-64' : 'w-64'} md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
                    ${pathname === item.href 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
              <LogOut className="h-5 w-5" />
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}