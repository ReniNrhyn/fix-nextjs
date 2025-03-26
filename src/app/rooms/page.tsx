"use client";

import { useEffect, useState } from "react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<
    {
      id: number;
      name: string;
      description: string;
      capacity: number;
      category: string;
      price: string;
      status: string;
    }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    capacity: 0,
    category: "",
    price: "",
    status: "PENDING",
  });

  // Fetch data dari public/rooms.json saat halaman dimuat
  useEffect(() => {
    fetch("/rooms.json")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  const handleApprove = (id: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: "APPROVED" } : room
      )
    );
  };

  const handleReject = (id: number) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, status: "REJECTED" } : room
      )
    );
  };

  const handleEdit = (id: number) => {
    alert(`Edit Room ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId =
      rooms.length > 0 ? Math.max(...rooms.map((r) => r.id)) + 1 : 1;

    const roomToAdd = {
      ...newRoom,
      id: newId,
      price: `Rp. ${newRoom.price
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    };

    setRooms((prev) => [...prev, roomToAdd]);
    setIsModalOpen(false);
    setNewRoom({
      name: "",
      description: "",
      capacity: 0,
      category: "",
      price: "",
      status: "PENDING",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Room Management</h1>

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

        {/* MODAL Add Room */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold">Add Room</h3>

              <form onSubmit={handleSubmit}>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newRoom.name}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={newRoom.description}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={newRoom.capacity}
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
                      value={newRoom.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      value={newRoom.category}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    >
                      <option value="">Choose a Category</option>
                      <option value="Auditorium">Auditorium</option>
                      <option value="Meeting Room">Meeting Room</option>
                      <option value="Classroom">Classroom</option>
                      <option value="Ballroom">Ballroom</option>
                    </select>
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
              <th className="border p-2">NAME</th>
              <th className="border p-2">CAPACITY</th>
              <th className="border p-2">CATEGORY</th>
              <th className="border p-2">PRICE</th>
              <th className="border p-2">STATUS</th>
              <th className="border p-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{room.name}</td>
                <td className="border p-2">{room.capacity}</td>
                <td className="border p-2">{room.category}</td>
                <td className="border p-2">{room.price}</td>
                <td
                  className={`border p-2 ${
                    room.status === "REJECTED"
                      ? "text-red-500"
                      : room.status === "APPROVED"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {room.status}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleApprove(room.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(room.id)}
                    className="bg-orange-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Hapus
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
