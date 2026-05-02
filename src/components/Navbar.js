"use client";

import { SearchContext } from "@/app/context/searchContext";
import { useContext, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const { setIsSearch, searchEvent, setSearchEvent } = useContext(SearchContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname=usePathname()
  // console.log("setIsSearch",setIsSearch)
  const isLoggedIn = status === "authenticated";
  const isLoading = status === "loading";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50 border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4">

        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-1">
            <Link href="/" className="text-3xl font-bold tracking-tight">
              Event<span className="text-primary">+</span>
              <span className="text-2xl font-bold text-primary -ml-1">Ticket</span>
            </Link>
          </div>

          {/* Mobile: Search + Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleMobileMenu}
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
                value={searchEvent}
                disabled={pathname==="/" ? false: true}
                onChange={(e) => setSearchEvent(e.target.value)}
                onFocus={() => setIsSearch(true)}
                placeholder="Search events..."
                className="input input-bordered w-full pl-12 py-6 text-base rounded-2xl"
              />
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && (
              isLoggedIn ? (
                /* Logged In - Show Avatar Dropdown */
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Avatar"
                        src={session?.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      />
                    </div>
                  </div>

                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-56 p-2 shadow">
                    <li><Link href="/profile" onClick={closeMobileMenu}>Profile</Link></li>
                    {session?.user?.role === "user" && (
                      <>
                        <li><Link href="/ticket" onClick={closeMobileMenu}>My Tickets</Link></li>
                        <li><Link href="/ticket-history" onClick={closeMobileMenu}>History</Link></li>
                      </>
                    )}
                    {
                      session?.user?.role === "admin" && <li><Link href="/admin/dashboard" className="py-3">dashboard</Link></li>
                    }
                    <li>
                      <a onClick={() => signOut({ callbackUrl: "/" })} className="text-red-500 cursor-pointer">
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                /* Not Logged In - Show Login & Signup */
                <>
                  <Link href="/login" className="btn btn-ghost">Login</Link>
                  <Link href="/signup" className="btn btn-primary">Sign Up</Link>
                </>
              )
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
       {
        pathname==="/" &&
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
              onFocus={() => setIsSearch(true)}
              placeholder="Search events..."
              className="input input-bordered w-full pl-12 py-6 text-base rounded-2xl"
            />
          </div>
        </div>
       } 
        

        {/* ==================== MOBILE MENU ==================== */}
        {isMobileMenuOpen && !isLoading && (
          <div className="md:hidden pb-6 border-t border-base-200 bg-base-100">
            <ul className="menu menu-vertical p-2 text-lg">

              {isLoggedIn ? (
                /* === Logged In User Menu === */
                <>
                  <li><Link href="/profile" className="py-3" onClick={closeMobileMenu}>Profile</Link></li>
                  {session?.user?.role === "user" && (
                    <>
                      <li><Link href="/ticket" className="py-3" onClick={closeMobileMenu}>My Tickets</Link></li>
                      <li><Link href="/ticket-history" className="py-3" onClick={closeMobileMenu}>Ticket History</Link></li>
                    </>
                  )}
                  {
                    session?.user?.role === "admin" && <li><Link href="/admin/dashboard" className="py-3">dashboard</Link></li>
                  }
                  <li className="border-t border-base-200 mt-2 pt-2">
                    <a
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-500 py-3 cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                /* === Not Logged In - Show Login & Signup === */
                <>
                  <li>
                    <Link href="/login" className="py-3" onClick={closeMobileMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="py-3" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        )}

      </div>
    </div>
  );
}