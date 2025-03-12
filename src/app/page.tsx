"use client";

import Dashboard from "./dashboard/page";

export default function Home() {
  return <Dashboard />;
}

// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", Booking: 40, Transactions: 24 },
//   { name: "Feb", Booking: 30, Transactions: 13 },
//   { name: "Mar", Booking: 20, Transactions: 10 },
//   { name: "Apr", Booking: 27, Transactions: 20 },
//   { name: "May", Booking: 18, Transactions: 22 },
//   { name: "Jun", Booking: 23, Transactions: 19 },
//   { name: "Jul", Booking: 34, Transactions: 30 },
// ];

// export default function Home() {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       {/* Statistik */}
//       <div className="grid grid-cols-4 gap-6 mb-6">
//         <div className="bg-white text-black p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold">Total User</h2>
//           <p className="text-2xl font-bold">1,245</p>
//         </div>
//         <div className="bg-white text-black p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold">Total Room</h2>
//           <p className="text-2xl font-bold">320</p>
//         </div>
//         <div className="bg-white text-black p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold">Total Booking</h2>
//           <p className="text-2xl font-bold">2,134</p>
//         </div>
//         <div className="bg-white text- p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold">Total Transaction</h2>
//           <p className="text-2xl font-bold">$85,430</p>
//         </div>
//       </div>

//       {/* Grafik */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Booking & Transactions Overview</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Booking" fill="#82ca9d" />
//             <Bar dataKey="Transactions" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
