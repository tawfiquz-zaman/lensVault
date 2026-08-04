import { Routes, Route } from "react-router-dom";

// Existing Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PhotoDetails from "./pages/PhotoDetails";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      {/* ========================= */}
      {/* Public Home Page */}
      {/* ========================= */}
      <Route path="/" element={<Home />} />

      {/* ========================= */}
      {/* Guest Only Routes */}
      {/* Logged-in users cannot access these */}
      {/* ========================= */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* ========================= */}
      {/* Protected Routes */}
      {/* Only logged-in users */}
      {/* ========================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

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