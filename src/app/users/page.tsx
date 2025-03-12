"use client";

import { useState } from "react";
import UserTable from "@app/components/UserTable";

export default function UsersPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      {/* Tombol Add New */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add New
      </button>

      {/* Tampilkan Form Add User jika showForm === true */}
      {showForm && (
        <div className="p-4 border rounded-md shadow-md bg-white">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 mb-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 mb-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 mb-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 mb-2 rounded-md"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Back
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">
              Save
            </button>
          </div>
        </div>
      )}

      {/* Tabel User */}
      <UserTable />
    </div>
  );
}
