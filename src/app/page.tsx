"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-[var(--primary)] text-[var(--accent)] flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Hotel Management
          </h1>
          <p className="text-xl mb-8">Book your perfect room with ease</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn bg-white hover:bg-gray-100 text-[var(--primary)] px-6 py-3 rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Rooms */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Featured Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Auditorium VIP", price: "Rp. 5.000.000", capacity: 150 },
            { name: "Ballroom VIP", price: "Rp. 8.000.000", capacity: 200 },
            { name: "Classroom", price: "Rp. 2.000.000", capacity: 100 },
            { name: "Executive Suite", price: "Rp. 3.500.000", capacity: 2 },
            { name: "Wedding Hall", price: "Rp. 12.000.000", capacity: 300 },
            {
              name: "Meeting Room Standard",
              price: "Rp. 1.500.000",
              capacity: 20,
            },
          ].map((room, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <Image
                  src={`/room-${index + 1}.png`}
                  alt={room.name}
                  width={300}
                  height={200}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-2">
                  Capacity: {room.capacity} people
                </p>
                <p className="text-lg font-bold">{room.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface Room {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// export default function Home() {
//   const [rooms, setRooms] = useState<Room[]>([]);

//   useEffect(() => {
//     // Fetch data from DummyJSON products (simulating rooms)
//     fetch("https://dummyjson.com/products?limit=6")
//       .then((res) => res.json())
//       .then((data) => setRooms(data.products))
//       .catch((error) => console.error("Error fetching rooms:", error));
//   }, []);

//   return (
//     <div className="min-h-screen bg-[var(--background)]">
//       {/* Hero Section */}
//       <div className="relative h-[70vh] bg-[var(--primary)] text-[var(--accent)] flex items-center justify-center">
//         <div className="text-center z-10 px-4">
//           <h1 className="text-5xl font-bold mb-6">
//             Welcome to Hotel Management
//           </h1>
//           <p className="text-xl mb-8">Book your perfect room with ease</p>
//           <div className="flex gap-4 justify-center">
//             <Link
//               href="/login"
//               className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md"
//             >
//               Login
//             </Link>
//             <Link
//               href="/register"
//               className="btn bg-white hover:bg-gray-100 text-[var(--primary)] px-6 py-3 rounded-md"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Featured Rooms */}
//       <div className="container mx-auto py-12 px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Our Featured Rooms
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {rooms.map((room, index) => (
//             <div
//               key={room.id}
//               className="bg-white shadow-lg rounded-lg overflow-hidden"
//             >
//               <div className="bg-gray-200 h-48 flex items-center justify-center">
//                 <Image
//                   src={room.images[0] || `/room-${index + 1}.png`}
//                   alt={room.title}
//                   width={300}
//                   height={200}
//                   className="object-cover h-full w-full"
//                 />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
//                 <p className="text-gray-600 mb-2 line-clamp-2">
//                   {room.description}
//                 </p>
//                 <p className="text-lg font-bold">${room.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
