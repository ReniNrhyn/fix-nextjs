"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Hotel,
  Users,
  CreditCard,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalBookings: 0,
    revenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState<
    {
      id: number;
      room: string;
      bookingDate: string;
      bookedBy: string;
      status: string;
    }[]
  >([]);

  // Fetch dashboard data
  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      // Fetch stats
      const statsResponse = await fetch("/bookings.json");
      const bookingsData = await statsResponse.json();

      setStats({
        totalRooms: 25,
        occupiedRooms: bookingsData.length,
        totalBookings: bookingsData.length,
        revenue: bookingsData.reduce((sum: number, booking: any) => {
          const price = parseInt(booking.price.replace(/\D/g, "")) || 0;
          return sum + price;
        }, 0),
      });

      // Fetch recent bookings
      setRecentBookings(
        bookingsData.slice(0, 5).map((booking: any) => ({
          id: booking.id,
          room: booking.room,
          bookingDate: booking.bookingDate,
          bookedBy: booking.bookedBy,
          status: Math.random() > 0.5 ? "Confirmed" : "Pending",
        }))
      );
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Rooms"
          value={stats.totalRooms}
          icon={<Hotel className="h-6 w-6" />}
          trend="stable"
        />
        <StatCard
          title="Occupied Rooms"
          value={stats.occupiedRooms}
          icon={<Hotel className="h-6 w-6" />}
          trend="up"
          change={`${Math.round(
            (stats.occupiedRooms / stats.totalRooms) * 100
          )}% occupancy`}
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<Calendar className="h-6 w-6" />}
          trend="up"
        />
        <StatCard
          title="Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<CreditCard className="h-6 w-6" />}
          trend="up"
          isCurrency
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/bookings"
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Add New Booking
          </Link>
          <Link
            href="/rooms"
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Hotel className="h-5 w-5" />
            Manage Rooms
          </Link>
          <Link
            href="/users"
            className="bg-[var(--primary)] text-white px-4 py-2 rounded-md flex items-center gap-2"
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
            className="text-[var(--primary)] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booked By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.room}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.bookingDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {booking.bookedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === "Confirmed"
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

// StatCard Component
function StatCard({
  title,
  value,
  icon,
  trend,
  change,
  isCurrency = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "stable";
  change?: string;
  isCurrency?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">
            {isCurrency ? value : value}
          </p>
          {change && (
            <p className="mt-1 flex items-center text-sm">
              {trend === "up" ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : trend === "down" ? (
                <ArrowDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span
                className={`ml-1 ${
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {change}
              </span>
            </p>
          )}
        </div>
        <div className="p-3 rounded-full bg-[var(--primary)] bg-opacity-10 text-[var(--primary)]">
          {icon}
        </div>
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
