// "use client";

// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, CartesianGrid, Legend
// } from "recharts";

// // Data Total Room
// const roomData = [
//   { name: "Room A", total: 50 },
//   { name: "Room B", total: 80 },
//   { name: "Room C", total: 120 },
//   { name: "Room D", total: 200 },
//   { name: "Room E", total: 300 },
// ];

// // Data Total Booking per Bulan
// const monthData = [
//   { name: "Jan", total: 500 },
//   { name: "Feb", total: 700 },
//   { name: "Mar", total: 1000 },
//   { name: "Apr", total: 1500 },
//   { name: "May", total: 1800 },
//   { name: "Jun", total: 2000 },
//   { name: "Jul", total: 2200 },
//   { name: "Aug", total: 2500 },
//   { name: "Sep", total: 2700 },
//   { name: "Oct", total: 3000 },
//   { name: "Nov", total: 3200 },
//   { name: "Dec", total: 3500 },
// ];

// // Data Total Booking per Tahun
// const yearData = [
//   { name: "2020", total: 8000 },
//   { name: "2021", total: 12000 },
//   { name: "2022", total: 15000 },
//   { name: "2023", total: 18000 },
//   { name: "2024", total: 21000 },
// ];

// const DashboardCharts = () => {
//   return (
//     <div className="grid grid-cols-3 gap-6">

//       {/* Grafik Total Room */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Total Rooms</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={roomData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Grafik Total Booking per Bulan */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Total Bookings (Per Month)</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <LineChart data={monthData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="total" stroke="#82ca9d" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Grafik Total Booking per Tahun */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Total Bookings (Per Year)</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={yearData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="total" fill="#ff7300" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// };

// export default DashboardCharts;
