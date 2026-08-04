import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  // React Router Navigation
  const navigate = useNavigate();

  // Authentication Context
  const {
    loginUser,
    currentUser,
  } = useAuth();



  // ===========================
  // Form State
  // ===========================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Error Message
  const [error, setError] = useState("");

  // ===========================
  // Handle Input Change
  // ===========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ===========================
  // Handle Login
  // ===========================
  const handleSubmit = (event) => {
    // Prevent page refresh
    event.preventDefault();

    // Clear previous error
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    // Validation
    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    // Try Login
    const result = loginUser({
      email,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Clear form
    setFormData({
      email: "",
      password: "",
    });

    // Go to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10">
      {/* Login Card */}
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-12 shadow-2xl">
        {/* Logo */}
        <div className="text-center">
          <div className="mb-3 text-5xl">📷</div>

          <h2 className="text-xl font-semibold text-blue-600">
            LensVault
          </h2>

          <h1 className="mt-4 text-4xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-500">
            Sign in to continue managing your photos.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-10 text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-slate-500 transition hover:text-blue-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;