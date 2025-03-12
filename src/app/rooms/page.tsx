"use client";

import { useEffect, useState } from "react";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<
    {
      id: number;
      name: string;
      capacity: number;
      category: string;
      price: string;
      status: string;
    }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Room Management</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md"
      >
        Tambah Data
      </button>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold">Tambah Data</h3>
            <p className="text-gray-600 mt-2">
              Isi form untuk menambahkan data baru.
            </p>

            {/* Form input (sesuaikan sesuai kebutuhan) */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Nama Ruangan"
                className="w-full border p-2 rounded-md"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md mr-2"
              >
                Batal
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Type for search then enter"
            className="border px-4 py-2 rounded-md w-1/3"
          />
          <button className="bg-white border px-4 py-2 rounded-md hover:bg-gray-100">
            Add New
          </button>
        </div>

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
                      : "text-green-500"
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
