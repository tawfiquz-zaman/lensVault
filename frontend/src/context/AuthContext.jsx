import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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

  // Save current user
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
  const registerUser = ({
    name,
    email,
    password,
  }) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (emailExists) {
      return {
        success: false,
        message:
          "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return {
      success: true,
      message:
        "Account created successfully.",
    };
  };

  // ========================================
  // Login User
  // ========================================
  const loginUser = ({
    email,
    password,
  }) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (!user) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    if (user.password !== password) {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    setCurrentUser(user);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  // ========================================
  // Logout User
  // ========================================
  const logout = () => {
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