import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../api/api";

// ========================================
// Authentication Context
// ========================================
const AuthContext = createContext();

// ========================================
// Authentication Provider
// ========================================
export function AuthProvider({ children }) {
  // Logged in user
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ========================================
  // Restore Session From Backend
  // ========================================
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      // No token means user is not logged in
      if (!token) {
        setCurrentUser(null);
        return;
      }

      try {
        // Ask backend to verify JWT
        const response = await api.get("/auth/me");

        // Restore authenticated user
        setCurrentUser(response.data.user);
      } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
      }
    };

    restoreSession();
  }, []);

  // ========================================
  // Save Current User
  // ========================================
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // ========================================
  // Register User
  // ========================================
  const registerUser = async ({
    name,
    email,
    password,
  }) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      return {
        success: true,
        message:
          response.data.message ||
          "Account created successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      };
    }
  };

  // ========================================
  // Login User
  // ========================================
  const loginUser = async ({
    email,
    password,
  }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save JWT token
      localStorage.setItem("token", token);

      // Save logged-in user
      setCurrentUser(user);

      return {
        success: true,
        message:
          response.data.message ||
          "Login successful.",
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // ========================================
  // Logout User
  // ========================================
  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        registerUser,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ========================================
// Custom Hook
// ========================================
export function useAuth() {
  return useContext(AuthContext);
}

