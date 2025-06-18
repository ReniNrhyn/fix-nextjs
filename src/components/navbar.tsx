"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //supaya navbar nya ga muncul
  if (pathname === "/" || pathname === "/login" || pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-[var(--primary)] shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-[var(--accent)]  font-medium">
          <li>
            <Link href="/dashboard" className="hover:text-yellow-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/rooms" className="hover:text-yellow-300">
              Room Management
            </Link>
          </li>
          <li>
            <Link href="/bookings" className="hover:text-yellow-300">
              Bookings
            </Link>
          </li>
          <li>
            <Link href="/users" className="hover:text-yellow-300">
              User Management
            </Link>
          </li>
        </ul>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center text-[var(--accent)]  hover:text-yellow-300"
          >
            Account <ChevronDown size={16} className="ml-1" />
          </button>
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-background border border-yellow-500 rounded-md shadow-lg text-primary">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-yellow-300"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-yellow-300"
                >
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

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ChevronDown } from "lucide-react";
// import Image from "next/image";

// const Navbar = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   if (pathname === "/" || pathname === "/login" || pathname === "/register") {
//     return null;
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   if (!isLoggedIn) {
//     return null;
//   }

//   return (
//     <nav className="bg-[var(--primary)] shadow-md p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center space-x-3">
//           <Link href="/dashboard">
//             <Image src="/logo.png" alt="Logo" width={100} height={100} />
//           </Link>
//         </div>

//         {/* Navigation Links */}
//         <ul className="flex space-x-6 text-[var(--accent)] font-medium">
//           <li>
//             <Link href="/dashboard" className="hover:text-yellow-300">
//               Dashboard
//             </Link>
//           </li>
//           <li>
//             <Link href="/rooms" className="hover:text-yellow-300">
//               Room Management
//             </Link>
//           </li>
//           <li>
//             <Link href="/bookings" className="hover:text-yellow-300">
//               Bookings
//             </Link>
//           </li>
//           <li>
//             <Link href="/users" className="hover:text-yellow-300">
//               User Management
//             </Link>
//           </li>
//         </ul>

//         {/* User Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             className="flex items-center text-[var(--accent)] hover:text-yellow-300"
//           >
//             Account <ChevronDown size={16} className="ml-1" />
//           </button>
//           {isDropdownOpen && (
//             <ul className="absolute right-0 mt-2 w-40 bg-background border border-yellow-500 rounded-md shadow-lg text-primary">
//               <li>
//                 <Link
//                   href="/profile"
//                   className="block px-4 py-2 hover:bg-yellow-300"
//                   onClick={() => setIsDropdownOpen(false)}
//                 >
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 hover:bg-yellow-300"
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
