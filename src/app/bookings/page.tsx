"use client";
import BookingTable from "@app/components/BookingTable";

export default function BookingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Booking Management</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Type for search then enter"
        className="border p-2 w-full mt-4 rounded-md"
      />

      {/* Button Add New */}
      <div className="flex justify-end mt-4">
        <button className="bg-white border px-4 py-2 rounded-md">
          Add New
        </button>
      </div>

      {/* Booking Table */}
      <BookingTable />
    </div>
  );
}
