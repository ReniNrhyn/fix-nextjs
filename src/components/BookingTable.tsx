"use client";

import { useEffect, useState } from "react";

interface Booking {
  no: number;
  room: string;
  bookingDate: string;
  bookedBy: string;
  price: string;
  action: string;
}

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/data/bookings.json")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h1>Booking Management</h1>
      <div>
        <input type="text" placeholder="Type for search then enter" />
        <button>Add New</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>ROOM</th>
            <th>BOOKING DATE</th>
            <th>BOOKED BY</th>
            <th>PRICE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.no}</td>
              <td>{booking.room}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.bookedBy}</td>
              <td>{booking.price}</td>
              <td>
                <button onClick={() => alert(`Edit booking ${booking.no}`)}>
                  {booking.action}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
