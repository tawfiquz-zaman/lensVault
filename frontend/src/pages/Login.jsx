import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4 py-10">
      {/* Login Card */}
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-12 shadow-2xl">
        {/* Logo / Branding */}
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

        {/* Login Form */}
        <form className="mt-10 space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <input
              type="email"
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
              placeholder="Enter your password"
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-600"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition duration-200 hover:bg-blue-700"
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