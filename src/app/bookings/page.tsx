"use client";

import { useEffect, useState } from "react";

interface Room {
  id: number;
  name: string;
  capacity: number;
  category: string;
  price: string;
  status: string;
}

interface Booking {
  id: number;
  room: string;
  bookingDate: string;
  bookedBy: string;
  price: string;
}

export default function BookingManagement() {
  // State for bookings and rooms
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  // State for modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);

  // State for form
  const [bookingForm, setBookingForm] = useState({
    room: "",
    bookingDate: "",
    bookedBy: "",
    price: "",
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from JSON files
  useEffect(() => {
    // Fetch bookings
    fetch("/bookings.json")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));

    // Fetch rooms
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        // Only show rooms with APPROVED status by default
        setAvailableRooms(
          data.filter((room: Room) => room.status === "APPROVED")
        );
      })
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // Filter bookings based on search term
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.room.toLowerCase().includes(searchLower) ||
      booking.bookedBy.toLowerCase().includes(searchLower) ||
      booking.bookingDate.toLowerCase().includes(searchLower) ||
      booking.price.toLowerCase().includes(searchLower)
    );
  });

  // Handle input changes for form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If room is changed, update the price automatically
    if (name === "room") {
      const selectedRoom = rooms.find((room) => room.name === value);
      setBookingForm((prev) => ({
        ...prev,
        [name]: value,
        price: selectedRoom
          ? selectedRoom.price.replace("Rp. ", "")
          : prev.price,
      }));
    } else {
      setBookingForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle room status filter change
  const handleRoomStatusFilter = (status: string) => {
    if (status === "ALL") {
      setAvailableRooms(rooms);
    } else {
      setAvailableRooms(rooms.filter((room) => room.status === status));
    }
  };

  // Create a new booking
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

    const bookingToAdd = {
      ...bookingForm,
      id: newId,
      price: `Rp. ${parseInt(
        bookingForm.price.replace(/\D/g, "")
      ).toLocaleString("id-ID")}`,
    };

    setBookings((prev) => [...prev, bookingToAdd]);
    closeModal();
  };

  // Prepare edit form with existing booking data
  const handleEdit = (id: number) => {
    const bookingToEdit = bookings.find((booking) => booking.id === id);
    if (bookingToEdit) {
      // Extract numeric value from price (remove "Rp. " and dots)
      const numericPrice = bookingToEdit.price
        .replace("Rp. ", "")
        .replace(/\./g, "");

      setBookingForm({
        room: bookingToEdit.room,
        bookingDate: bookingToEdit.bookingDate,
        bookedBy: bookingToEdit.bookedBy,
        price: numericPrice,
      });
      setCurrentBookingId(id);
      setIsEditMode(true);
      setIsModalOpen(true);
    }
  };

  // Update existing booking
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBookingId === null) return;

    const updatedBooking = {
      ...bookingForm,
      id: currentBookingId,
      price: `Rp. ${parseInt(
        bookingForm.price.replace(/\D/g, "")
      ).toLocaleString("id-ID")}`,
    };

    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === currentBookingId ? updatedBooking : booking
      )
    );
    closeModal();
  };

  // Delete a booking
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    }
  };

  // Reset form and close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentBookingId(null);
    setBookingForm({
      room: "",
      bookingDate: "",
      bookedBy: "",
      price: "",
    });
    // Reset to only show APPROVED rooms when modal closes
    setAvailableRooms(rooms.filter((room) => room.status === "APPROVED"));
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Booking Management</h1>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search bookings..."
            className="border px-4 py-2 rounded-md w-1/3"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Add New Booking
          </button>
        </div>

        {/* Room Status Filter */}
        <div className="mb-4">
          <label className="mr-2">Filter Rooms by Status:</label>
          <select
            onChange={(e) => handleRoomStatusFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="APPROVED">Approved Only</option>
            <option value="ALL">All Rooms</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* MODAL Add/Edit Booking */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold">
                {isEditMode ? "Edit Booking" : "Add Booking"}
              </h3>

              <form onSubmit={isEditMode ? handleUpdate : handleCreate}>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Room
                    </label>
                    <select
                      name="room"
                      value={bookingForm.room}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    >
                      <option value="">Select a room</option>
                      {availableRooms.map((room) => (
                        <option key={room.id} value={room.name}>
                          {room.name} ({room.status}) - {room.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Booking Date
                    </label>
                    <input
                      type="date"
                      name="bookingDate"
                      value={bookingForm.bookingDate}
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
                      value={bookingForm.bookedBy}
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
                      value={bookingForm.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                      disabled
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    {isEditMode ? "Update" : "Save"}
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
            {filteredBookings.map((booking, index) => (
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
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
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

// // UPDATE BOOKING
// "use client";

// import { useEffect, useState } from "react";

// interface Booking {
//   id: number;
//   bookingDate: string;
//   roomId: number;
//   room?: {
//     id: number;
//     name: string;
//     price: number;
//   };
//   user?: {
//     id: number;
//     name: string;
//   };
// }

// interface Room {
//   id: number;
//   name: string;
//   price: number;
// }

// export default function BookingManagement() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newBooking, setNewBooking] = useState({
//     bookingDate: "",
//     roomId: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch bookings and rooms
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           setError("You need to login first");
//           return;
//         }

//         // Fetch rooms
//         const roomsResponse = await fetch(
//           "https://simaru.amisbudi.cloud/api/rooms?status=approved",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!roomsResponse.ok) {
//           throw new Error("Failed to fetch rooms");
//         }
//         const roomsData = await roomsResponse.json();
//         setRooms(roomsData);

//         // Fetch bookings
//         const bookingsResponse = await fetch(
//           "https://simaru.amisbudi.cloud/api/bookings",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!bookingsResponse.ok) {
//           throw new Error("Failed to fetch bookings");
//         }
//         const bookingsData = await bookingsResponse.json();
//         setBookings(bookingsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewBooking((prev) => ({
//       ...prev,
//       [name]: name === "roomId" ? parseInt(value) : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         setError("You need to login first");
//         return;
//       }

//       const response = await fetch(
//         "https://simaru.amisbudi.cloud/api/bookings",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newBooking),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add booking");
//       }

//       const data = await response.json();
//       setBookings((prev) => [...prev, data]);
//       setIsModalOpen(false);
//       setNewBooking({
//         bookingDate: "",
//         roomId: 0,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Are you sure you want to delete this booking?")) {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           setError("You need to login first");
//           return;
//         }

//         const response = await fetch(
//           `https://simaru.amisbudi.cloud/api/bookings/${id}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete booking");
//         }

//         setBookings((prevBookings) =>
//           prevBookings.filter((booking) => booking.id !== id)
//         );
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const getRoomName = (roomId: number) => {
//     const room = rooms.find((r) => r.id === roomId);
//     return room ? room.name : "Unknown";
//   };

//   const getRoomPrice = (roomId: number) => {
//     const room = rooms.find((r) => r.id === roomId);
//     return room ? room.price : 0;
//   };

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Booking Management</h1>

//       <div className="p-6 bg-white shadow-md rounded-lg">
//         <div className="mb-4 flex justify-between items-center">
//           <input
//             type="text"
//             placeholder="Type for search then enter"
//             className="border px-4 py-2 rounded-md w-1/3"
//           />
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md"
//           >
//             Add New
//           </button>
//         </div>

//         {/* MODAL Add Booking */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//               <h3 className="text-xl font-semibold">Add Booking</h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Booking Date
//                     </label>
//                     <input
//                       type="date"
//                       name="bookingDate"
//                       value={newBooking.bookingDate}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Room
//                     </label>
//                     <select
//                       name="roomId"
//                       value={newBooking.roomId}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     >
//                       <option value="">Choose a Room</option>
//                       {rooms.map((room) => (
//                         <option key={room.id} value={room.id}>
//                           {room.name} (Rp. {room.price.toLocaleString()})
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex justify-end mt-6 space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md"
//                   >
//                     BACK
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
//                   >
//                     {loading ? "Saving..." : "SAVE"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border p-2">NO</th>
//               <th className="border p-2">ROOM</th>
//               <th className="border p-2">BOOKING DATE</th>
//               <th className="border p-2">BOOKED BY</th>
//               <th className="border p-2">PRICE</th>
//               <th className="border p-2">ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking, index) => (
//               <tr key={booking.id} className="text-center">
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{getRoomName(booking.roomId)}</td>
//                 <td className="border p-2">
//                   {new Date(booking.bookingDate).toLocaleDateString()}
//                 </td>
//                 <td className="border p-2">
//                   {booking.user?.name || "Unknown"}
//                 </td>
//                 <td className="border p-2">
//                   Rp. {getRoomPrice(booking.roomId).toLocaleString()}
//                 </td>
//                 <td className="border p-2 flex justify-center gap-2">
//                   <button
//                     onClick={() => handleEdit(booking.id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded-md"
//                   >
//                     EDIT
//                   </button>
//                   <button
//                     onClick={() => handleDelete(booking.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md"
//                   >
//                     DELETE
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
