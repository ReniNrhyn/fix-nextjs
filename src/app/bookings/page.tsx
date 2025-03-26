"use client";

import { useEffect, useState } from "react";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<
    {
      id: number;
      room: string;
      bookingDate: string;
      bookedBy: string;
      price: string;
    }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBooking, setNewBooking] = useState({
    room: "",
    bookingDate: "",
    bookedBy: "",
    price: "",
  });

  // Fetch data from public/bookings.json
  useEffect(() => {
    fetch("/bookings.json")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleEdit = (id: number) => {
    alert(`Edit Booking ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id)
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

    const bookingToAdd = {
      ...newBooking,
      id: newId,
      price: `Rp. ${newBooking.price
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    };

    setBookings((prev) => [...prev, bookingToAdd]);
    setIsModalOpen(false);
    setNewBooking({
      room: "",
      bookingDate: "",
      bookedBy: "",
      price: "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Booking Management</h1>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Type for search then enter"
            className="border px-4 py-2 rounded-md w-1/3"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Add New
          </button>
        </div>

        {/* MODAL Add Booking */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold">Add Booking</h3>

              <form onSubmit={handleSubmit}>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Room
                    </label>
                    <input
                      type="text"
                      name="room"
                      value={newBooking.room}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booking Date
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={newBooking.bookingDate}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booked By
                    </label>
                    <input
                      type="text"
                      name="bookedBy"
                      value={newBooking.bookedBy}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={newBooking.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">NO</th>
              <th className="border p-2">ROOM</th>
              <th className="border p-2">BOOKING DATE</th>
              <th className="border p-2">BOOKED BY</th>
              <th className="border p-2">PRICE</th>
              <th className="border p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{booking.room}</td>
                <td className="border p-2">{booking.bookingDate}</td>
                <td className="border p-2">{booking.bookedBy}</td>
                <td className="border p-2">{booking.price}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(booking.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    HARUS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
