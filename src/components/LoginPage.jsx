// src/components/LoginPage.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("User");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyAnFyxPFLLIU-upfVWrdMw4uRuvTHROH5k",
    authDomain: "edudash-691aa.firebaseapp.com",
    projectId: "edudash-691aa",
    storageBucket: "edudash-691aa.appspot.com",
    messagingSenderId: "649364198714",
    appId: "1:649364198714:web:6d49711f037d7e72622c03"
  };

  // ✅ Initialize Firebase (only once)
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // ✅ Handle form submit
  const onSubmit = async (data) => {
    setError("");
    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // ✅ Navigate based on selected role
      if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-6xl shadow-2xl rounded-lg overflow-hidden">
        
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 
                        bg-gradient-to-br from-pink-500 via-purple-600 to-violet-700 
                        text-white p-16">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
            WELCOME <span className="text-red-400">TO</span> INVITEX
          </h1>
          <p className="text-gray-200 text-lg text-center max-w-md">
            Sign in to continue.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Switch */}
            <div className="flex justify-center space-x-6 mb-6">
              <button
                type="button"
                onClick={() => setRole("User")}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition ${
                  role === "User"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setRole("Admin")}
                className={`px-8 py-3 rounded-full text-lg font-semibold transition ${
                  role === "Admin"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Email */}
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            {/* Password */}
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full px-5 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            {/* Error */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 text-lg bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
