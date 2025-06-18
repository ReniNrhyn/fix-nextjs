// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     // Simulate registration - in a real app, you'd call an API here
//     alert("Registration successful! Please login.");
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-[var(--primary)]">Register</h2>
//           <p className="text-gray-600">Create your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Full Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2">Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="text-[var(--primary)] hover:underline"
//             >
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

//

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userData.password !== userData.password_confirmation) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch(
        "https://simaru.amisbudi.cloud/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please login.");
        router.push("/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
      console.error("Registration error:", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary)]">Register</h2>
          <p className="text-gray-600">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={userData.password_confirmation}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--primary)] hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
