"use client";

import { useEffect, useState } from "react";

interface Room {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  capacity: number;
  description: string;
  status: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    capacity: 0,
    categoryId: 0,
    price: 0,
    status: "PENDING",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const fetchRooms = async () => {
    try {
      const response = await fetch("https://simaru.amisbudi.cloud/api/rooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = await response.json();
      if (data) {
        setRooms(data);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://simaru.amisbudi.cloud/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newRoom),
      });

      const { data, message } = await response.json();
      if (data) {
        setMessage(message);
        setIsSuccess(true);
        setIsModalOpen(false);
        setTimeout(() => setIsSuccess(false), 3000);
        fetchRooms();
        setNewRoom({
          name: "",
          description: "",
          capacity: 0,
          categoryId: 0,
          price: 0,
          status: "PENDING",
        });
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoomId === null) return;

    try {
      const response = await fetch(
        `https://simaru.amisbudi.cloud/api/rooms/${editingRoomId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newRoom),
        }
      );

      const { data, message } = await response.json();
      if (data) {
        setMessage(message);
        setIsSuccess(true);
        setIsEditModalOpen(false);
        setTimeout(() => setIsSuccess(false), 3000);
        fetchRooms();
        setNewRoom({
          name: "",
          description: "",
          capacity: 0,
          categoryId: 0,
          price: 0,
          status: "PENDING",
        });
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        const response = await fetch(
          `https://simaru.amisbudi.cloud/api/rooms/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          fetchRooms();
        }
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const handleEdit = (room: Room) => {
    setNewRoom({
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      categoryId: room.categoryId,
      price: room.price,
      status: room.status,
    });
    setEditingRoomId(room.id);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "categoryId" || name === "price"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const roomToUpdate = rooms.find((room) => room.id === id);
      if (!roomToUpdate) return;

      const updatedRoom = { ...roomToUpdate, status: newStatus };

      const response = await fetch(
        `https://simaru.amisbudi.cloud/api/rooms/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (response.ok) {
        fetchRooms();
      }
    } catch (error) {
      console.error("Error updating room status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Room Management</h1>

      {isSuccess && (
        <div className="mb-4 rounded-md border border-gray-300 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="flex-1">
              <strong className="font-medium text-gray-900">{message}</strong>
              <p className="mt-0.5 text-sm text-gray-700">
                Your data {newRoom.name} have been saved.
              </p>
            </div>

            <button
              className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
              type="button"
              onClick={() => setIsSuccess(false)}
              aria-label="Dismiss alert"
            >
              <span className="sr-only">Dismiss popup</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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
                      type="number"
                      name="price"
                      value={newRoom.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category ID
                    </label>
                    <input
                      type="number"
                      name="categoryId"
                      value={newRoom.categoryId}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newRoom.status}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
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

        {/* MODAL Edit Room */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold">Edit Room</h3>

              <form onSubmit={handleUpdate}>
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
                      type="number"
                      name="price"
                      value={newRoom.price}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category ID
                    </label>
                    <input
                      type="number"
                      name="categoryId"
                      value={newRoom.categoryId}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={newRoom.status}
                      onChange={handleInputChange}
                      className="w-full border p-2 rounded-md mt-1"
                      required
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingRoomId(null);
                      setNewRoom({
                        name: "",
                        description: "",
                        capacity: 0,
                        categoryId: 0,
                        price: 0,
                        status: "PENDING",
                      });
                    }}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    UPDATE
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
              <th className="border p-2">CATEGORY ID</th>
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
                <td className="border p-2">{room.categoryId}</td>
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
                    onClick={() => handleStatusChange(room.id, "APPROVED")}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(room.id, "REJECTED")}
                    className="bg-orange-500 text-white px-3 py-1 rounded-md"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleEdit(room)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
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

// // UPDATE ROOMS
// "use client";

// import { useEffect, useState } from "react";

// interface Room {
//   id: number;
//   name: string;
//   description: string;
//   capacity: number;
//   categoryId: number;
//   category?: {
//     id: number;
//     name: string;
//   };
//   price: number;
//   status: string;
// }

// interface Category {
//   id: number;
//   name: string;
// }

// export default function RoomsPage() {
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newRoom, setNewRoom] = useState({
//     name: "",
//     description: "",
//     capacity: 0,
//     categoryId: 0,
//     price: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch rooms and categories
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           setError("You need to login first");
//           return;
//         }

//         // Fetch categories
//         const categoriesResponse = await fetch(
//           "https://simaru.amisbudi.cloud/api/categories",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!categoriesResponse.ok) {
//           throw new Error("Failed to fetch categories");
//         }
//         const categoriesData = await categoriesResponse.json();
//         setCategories(categoriesData);

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
//     setNewRoom((prev) => ({
//       ...prev,
//       [name]:
//         name === "capacity" || name === "categoryId" || name === "price"
//           ? parseInt(value) || 0
//           : value,
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

//       const response = await fetch("https://simaru.amisbudi.cloud/api/rooms", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newRoom),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add room");
//       }

//       const data = await response.json();
//       setRooms((prev) => [...prev, data]);
//       setIsModalOpen(false);
//       setNewRoom({
//         name: "",
//         description: "",
//         capacity: 0,
//         categoryId: 0,
//         price: 0,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Are you sure you want to delete this room?")) {
//       try {
//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//           setError("You need to login first");
//           return;
//         }

//         const response = await fetch(
//           `https://simaru.amisbudi.cloud/api/rooms/${id}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete room");
//         }

//         setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   const getCategoryName = (categoryId: number) => {
//     const category = categories.find((cat) => cat.id === categoryId);
//     return category ? category.name : "Unknown";
//   };

//   if (loading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">Room Management</h1>

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

//         {/* MODAL Add Room */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//               <h3 className="text-xl font-semibold">Add Room</h3>

//               <form onSubmit={handleSubmit}>
//                 <div className="mt-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={newRoom.name}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Description
//                     </label>
//                     <input
//                       type="text"
//                       name="description"
//                       value={newRoom.description}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Capacity
//                     </label>
//                     <input
//                       type="number"
//                       name="capacity"
//                       value={newRoom.capacity}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       value={newRoom.price}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Category
//                     </label>
//                     <select
//                       name="categoryId"
//                       value={newRoom.categoryId}
//                       onChange={handleInputChange}
//                       className="w-full border p-2 rounded-md mt-1"
//                       required
//                     >
//                       <option value="">Choose a Category</option>
//                       {categories.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
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
//               <th className="border p-2">NAME</th>
//               <th className="border p-2">CAPACITY</th>
//               <th className="border p-2">CATEGORY</th>
//               <th className="border p-2">PRICE</th>
//               <th className="border p-2">STATUS</th>
//               <th className="border p-2">ACTION</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rooms.map((room, index) => (
//               <tr key={room.id} className="text-center">
//                 <td className="border p-2">{index + 1}</td>
//                 <td className="border p-2">{room.name}</td>
//                 <td className="border p-2">{room.capacity}</td>
//                 <td className="border p-2">
//                   {getCategoryName(room.categoryId)}
//                 </td>
//                 <td className="border p-2">
//                   Rp. {room.price.toLocaleString()}
//                 </td>
//                 <td className="border p-2">
//                   <span
//                     className={`${
//                       room.status === "REJECTED"
//                         ? "text-red-500"
//                         : room.status === "APPROVED"
//                         ? "text-green-500"
//                         : "text-yellow-500"
//                     }`}
//                   >
//                     {room.status}
//                   </span>
//                 </td>
//                 <td className="border p-2 flex justify-center gap-2">
//                   <button
//                     onClick={() => handleEdit(room.id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded-md"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(room.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md"
//                   >
//                     Delete
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
