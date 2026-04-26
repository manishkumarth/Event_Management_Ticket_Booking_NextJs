"use client";

import { SearchContext } from "@/app/context/searchContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const { setIsSearch, searchInput, setSearchInput } = useContext(SearchContext);
  const [isLoggedIn] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-1">
            <a href="/" className="text-3xl font-bold tracking-tight">
              Event<span className="text-primary">+</span>
              <span className="text-2xl font-bold text-primary -ml-1">Ticket</span>
            </a>
            
          </div>

          {/* Search Icon + Hamburger (Mobile) */}
          <div className="flex items-center gap-3 md:hidden">
            

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle p-2"
            >
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearch(true)}
                placeholder="Search events..."
                className="input input-bordered w-full pl-12 py-6 text-base rounded-2xl"
              />
              

            </div>
          </div>
<<<<<<< HEAD
          <Link href="/admin/dashboard/" >
          Dashboard
          </Link>
=======
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-56 p-2 shadow"
                >
                  <li><Link href="/profile" onClick={closeMobileMenu}>Profile</Link></li>
                  <li><Link href="/ticket" onClick={closeMobileMenu}>My Tickets</Link></li>
                  <li><Link href="/ticket-history" onClick={closeMobileMenu}>History</Link></li>
                  <li><a>Settings</a></li>
                  <li><a className="text-red-500">Logout</a></li>
                </ul>
              </div>
            ) : (
              <>
                <button className="btn btn-ghost">Login</button>
                <button className="btn btn-primary">Sign Up</button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Shown below on mobile only */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsSearch(true)}
              placeholder="Search events..."
              className="input input-bordered w-full pl-12 py-6 text-base rounded-2xl"
            />
           
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isLoggedIn && (
          <div className="md:hidden pb-6 border-t border-base-200 bg-base-100">
            <ul className="menu menu-vertical p-2 text-lg">
              <li><Link href="/profile" className="py-3" onClick={closeMobileMenu}>Profile</Link></li>
              <li><Link href="/ticket" className="py-3" onClick={closeMobileMenu}>My Tickets</Link></li>
              <li><Link href="/ticket-history" className="py-3" onClick={closeMobileMenu}>Ticket History</Link></li>
              <li><a className="py-3">Settings</a></li>
              <li className="border-t border-base-200 mt-2 pt-2">
                <a className="text-red-500 py-3">Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}