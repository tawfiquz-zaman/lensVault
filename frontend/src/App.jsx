import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// API
import api from "./api/api";

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

// Recycle bin page
import RecycleBin from "./pages/RecycleBin";

function App() {
  // Temporary React → Express connection test
  useEffect(() => {
    api
      .get("/test")
      .then((response) => {
        console.log("Backend response:", response.data);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
      });
  }, []);

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

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Recycle Bin */}
      <Route
        path="/recycle-bin"
        element={
          <ProtectedRoute>
            <RecycleBin />
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