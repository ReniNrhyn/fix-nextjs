"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Hotel, Users, CreditCard } from "lucide-react";

interface Room {
  id: number;
  name: string;
  status: string;
}

interface Booking {
  id: number;
  roomId: number;
  roomName: string;
  bookingDate: string;
  bookedBy: string;
  price: number;
  status: string;
}

interface DashboardStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  totalBookings: number;
  revenue: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch rooms
        const roomsResponse = await fetch(
          "https://simaru.amisbudi.cloud/api/rooms",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const roomsData = await roomsResponse.json();

        // Fetch bookings
        const bookingsResponse = await fetch(
          "https://simaru.amisbudi.cloud/api/bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const bookingsData = await bookingsResponse.json();

        // Combine room names with bookings
        const bookingsWithRoomNames = bookingsData.data.map((booking: any) => {
          const room = roomsData.data.find(
            (r: Room) => r.id === booking.roomId
          );
          return {
            ...booking,
            roomName: room ? room.name : "Unknown Room",
          };
        });

        // Calculate stats
        const totalRooms = roomsData.data.length;
        const availableRooms = roomsData.data.filter(
          (room: Room) => room.status === "APPROVED"
        ).length;
        const totalBookings = bookingsData.data.length;
        const revenue = bookingsData.data.reduce(
          (sum: number, booking: any) => sum + booking.price,
          0
        );

        setStats({
          totalRooms,
          availableRooms,
          occupiedRooms: totalBookings,
          totalBookings,
          revenue,
        });

        setRecentBookings(bookingsWithRoomNames.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (isLoading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {isSuccess && (
        <div className="mb-4 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="flex-1">
              <strong className="font-medium text-gray-900">{message}</strong>
            </div>

            <button
              className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
              type="button"
              onClick={() => setIsSuccess(false)}
              aria-label="Dismiss alert"
            >
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon={<Hotel className="h-6 w-6" />}
          trend="stable"
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Available Rooms"
          value={stats.availableRooms}
          icon={<Hotel className="h-6 w-6" />}
          trend="up"
          change={`${Math.round(
            (stats.availableRooms / stats.totalRooms) * 100
          )}% available`}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<Calendar className="h-6 w-6" />}
          trend="up"
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<CreditCard className="h-6 w-6" />}
          trend="up"
          isCurrency
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/bookings"
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            Add New Booking
          </Link>
          <Link
            href="/rooms"
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Hotel className="h-5 w-5" />
            Manage Rooms
          </Link>
          <Link
            href="/users"
            className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Users className="h-5 w-5" />
            Manage Users
          </Link>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <Link
            href="/bookings"
            className="text-black hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">NO</th>
                <th className="border p-2">ROOM</th>
                <th className="border p-2">DATE</th>
                <th className="border p-2">BOOKED BY</th>
                <th className="border p-2">PRICE</th>
                <th className="border p-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr key={booking.id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{booking.roomName}</td>
                  <td className="border p-2">
                    {formatDate(booking.bookingDate)}
                  </td>
                  <td className="border p-2">{booking.bookedBy}</td>
                  <td className="border p-2">
                    {formatCurrency(booking.price)}
                  </td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
  change?: string;
  isCurrency?: boolean;
  bgColor?: string;
  iconColor?: string;
}

function StatCard({
  title,
  value,
  icon,
  trend,
  change,
  isCurrency = false,
  bgColor = "bg-gray-100",
  iconColor = "text-gray-600",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">
            {isCurrency ? value : value}
          </p>
          {change && (
            <p className="mt-1 flex items-center text-sm text-gray-500">
              {trend === "up" ? (
                <span className="text-green-500">↑</span>
              ) : trend === "down" ? (
                <span className="text-red-500">↓</span>
              ) : null}
              <span className="ml-1">{change}</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>{icon}</div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [stats, setStats] = useState({
//     totalRooms: 0,
//     totalBookings: 0,
//     totalUsers: 0,
//     revenue: 0,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     if (userData) {
//       setUser(JSON.parse(userData));
//     }

//     // Fetch stats (simulated)
//     fetch("/rooms.json")
//       .then((res) => res.json())
//       .then((rooms) => {
//         fetch("/bookings.json")
//           .then((res) => res.json())
//           .then((bookings) => {
//             fetch("/users.json")
//               .then((res) => res.json())
//               .then((users) => {
//                 setStats({
//                   totalRooms: rooms.length,
//                   totalBookings: bookings.length,
//                   totalUsers: users.length,
//                   revenue: bookings.reduce((sum: number, booking: any) => {
//                     const price = parseInt(booking.price.replace(/\D/g, ""));
//                     return sum + (isNaN(price) ? 0 : price);
//                   }, 0),
//                 });
//               });
//           });
//       });
//   }, [router]);

//   if (!user) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Total Rooms</h3>
//           <p className="text-3xl font-bold">{stats.totalRooms}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Total Bookings</h3>
//           <p className="text-3xl font-bold">{stats.totalBookings}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
//           <p className="text-3xl font-bold">{stats.totalUsers}</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-lg font-medium text-gray-600">Revenue</h3>
//           <p className="text-3xl font-bold">
//             Rp. {stats.revenue.toLocaleString("id-ID")}
//           </p>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">
//           Welcome, {user.firstName || user.username}!
//         </h2>
//         <p className="text-gray-600">
//           You are logged in as {user.email || "a hotel administrator"}.
//         </p>
//       </div>
//     </div>
//   );
// }
