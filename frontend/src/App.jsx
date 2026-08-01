import { Routes, Route } from "react-router-dom";

// Existing Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PhotoDetails from "./pages/PhotoDetails";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard (Protection will be added in Step 4) */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Photo Details */}
      <Route
        path="/dashboard/photo/:id"
        element={<PhotoDetails />}
      />
    </Routes>
  );
}

export default App;