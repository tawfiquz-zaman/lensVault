import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create Authentication Context
const AuthContext = createContext();

// Authentication Provider
export function AuthProvider({ children }) {
  // Current logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    // Load user from localStorage when the app starts
    const savedUser = localStorage.getItem("currentUser");

    // Return parsed user if available
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save current user whenever it changes
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}