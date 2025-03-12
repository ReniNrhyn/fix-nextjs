"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Logo" width={75} height={75} />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <Link href="/dashboard" className="hover:text-gray-500">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/room" className="hover:text-gray-500">
              Room Management
            </Link>
          </li>
          <li>
            <Link href="/user" className="hover:text-gray-500">
              User Management
            </Link>
          </li>
          <li>
            <Link href="/transaction/booking" className="hover:text-gray-500">
              Bookings
            </Link>
          </li>
        </ul>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-gray-700 hover:text-gray-500"
          >
            Reni <ChevronDown size={16} className="ml-1" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg text-gray-700">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
