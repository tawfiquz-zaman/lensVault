import { Routes, Route } from "react-router-dom";

// Existing Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PhotoDetails from "./pages/PhotoDetails";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========================= */}
      {/* Protected Routes */}
      {/* ========================= */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Photo Details */}
      <Route
        path="/dashboard/photo/:id"
        element={
          <ProtectedRoute>
            <PhotoDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;