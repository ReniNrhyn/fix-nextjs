"use client";

export default function BookingTable() {
  const bookings = [
    {
      id: 1,
      room: "Auditorium Utama",
      date: "13 June 2025",
      bookedBy: "rousad",
      price: "Rp. 3.500.000",
    },
    {
      id: 2,
      room: "Auditorium Utama",
      date: "09 March 2025",
      bookedBy: "Deldi",
      price: "Rp. 3.500.000",
    },
  ];

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-md">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">NO</th>
            <th className="p-2">ROOM</th>
            <th className="p-2">BOOKING DATE</th>
            <th className="p-2">BOOKED BY</th>
            <th className="p-2">PRICE</th>
            <th className="p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id} className="border-b">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{booking.room}</td>
              <td className="p-2">{booking.date}</td>
              <td className="p-2">{booking.bookedBy}</td>
              <td className="p-2">{booking.price}</td>
              <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded-md">
                  EDIT
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded-md">
                  HAPUS
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
