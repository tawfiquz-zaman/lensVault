import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PhotoDetails from "./pages/PhotoDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/dashboard/photo/:id"
        element={<PhotoDetails />}
      />
    </Routes>
  );
}

export default App;