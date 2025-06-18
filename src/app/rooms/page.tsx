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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
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
    const roomToEdit = rooms.find((room) => room.id === id);
    if (roomToEdit) {
      // Hapus "Rp. " dari harga dan titik pemisah ribuan
      const rawPrice = roomToEdit.price.replace("Rp. ", "").replace(/\./g, "");
      setNewRoom({
        ...roomToEdit,
        price: rawPrice,
      });
      setEditingRoomId(id);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoomId === null) return;

    const updatedRoom = {
      ...newRoom,
      id: editingRoomId,
      price: `Rp. ${newRoom.price
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    };

    setRooms((prevRooms) =>
      prevRooms.map((room) => (room.id === editingRoomId ? updatedRoom : room))
    );

    // Reset form dan tutup modal
    setIsEditModalOpen(false);
    setEditingRoomId(null);
    setNewRoom({
      name: "",
      description: "",
      capacity: 0,
      category: "",
      price: "",
      status: "PENDING",
    });
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
                        category: "",
                        price: "",
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
