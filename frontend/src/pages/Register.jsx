import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-green-50 to-emerald-100 px-4 py-10">
      {/* Register Card */}
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-12 shadow-2xl">
        {/* Logo / Branding */}
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

        {/* Register Form */}
        <form className="mt-10 space-y-6">
          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
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
              placeholder="Confirm your password"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-green-600"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-green-700"
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