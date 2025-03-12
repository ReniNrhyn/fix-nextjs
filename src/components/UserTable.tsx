"use client";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      <button className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded-md">
        Tambah Data
      </button>

      <input
        type="text"
        placeholder="Type for search then enter"
        className="border p-2 w-full mb-4 rounded-md"
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">NO</th>
            <th className="border p-2">NAME</th>
            <th className="border p-2">EMAIL</th>
            <th className="border p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">
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
      <button className="mt-4 bg-gray-200 px-4 py-2 rounded-md">Add New</button>
    </div>
  );
}
