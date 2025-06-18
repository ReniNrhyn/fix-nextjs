// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulate login - in a real app, you'd call an API here
//     localStorage.setItem("token", "dummy-token");
//     router.push("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-[var(--primary)]">Login</h2>
//           <p className="text-gray-600">Welcome back to our platform</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
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

//           <button
//             type="submit"
//             className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             {"Don't have an account?"}
//             <Link
//               href="/register"
//               className="text-[var(--primary)] hover:underline"
//             >
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // SATU TEMA

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("https://dummyjson.com/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data));
//         router.push("/dashboard");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("An error occurred during login");
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-[var(--primary)]">Login</h2>
//           <p className="text-gray-600">Welcome back to our platform</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
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

//           <button
//             type="submit"
//             className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             {"Don't have an account?"}
//             <Link
//               href="/register"
//               className="text-[var(--primary)] hover:underline"
//             >
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// COPY https://github.com/sihaisyam/temaing/blob/dev/src/app/login/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://simaru.amisbudi.cloud/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
