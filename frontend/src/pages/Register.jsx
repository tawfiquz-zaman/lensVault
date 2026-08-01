import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Register() {
  // Navigation
  const navigate = useNavigate();

  // Authentication Context
  const { registerUser } = useAuth();

  // ===========================
  // Form State
  // ===========================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error & Success Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  // Email Validation
  // ===========================
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ===========================
  // Handle Registration
  // ===========================
  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Trim inputs
    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // ===========================
    // Validation
    // ===========================

    if (!name) {
      setError("Full name is required.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ===========================
    // Register User
    // ===========================
    const result = registerUser({
      name,
      email,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Success
    setSuccess(result.message);

    // Clear Form
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Redirect to Login after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-green-50 to-emerald-100 px-4 py-10">
      {/* Register Card */}
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-12 shadow-2xl">
        {/* Logo */}
        <div className="text-center">
          <div className="mb-3 text-5xl">📷</div>

          <h2 className="text-xl font-semibold text-green-600">
            LensVault
          </h2>

          <h1 className="mt-4 text-4xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="mt-3 text-slate-500">
            Create your LensVault account and start organizing your photography.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-100 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* Register Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-green-600"
            />
          </div>

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
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-green-600"
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
              placeholder="Create a password"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-green-600"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-green-600"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-green-700"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-10 text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Back Home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-slate-500 transition hover:text-green-600"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;