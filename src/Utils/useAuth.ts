import { useState, useEffect } from "react";
import { refreshToken, logout } from "../Utils/api-client";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = async () => {
    // סימולציה של התחברות (כאן תכניסי את הקריאה ל-API של login)
    localStorage.setItem("accessToken", "fake-token"); // טוקן דוגמה
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await logout(); // קריאה ל-API של logout
      setIsAuthenticated(false); // עדכון מצב האימות
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const refreshUserToken = async () => {
    try {
      await refreshToken(); // קריאה ל-API של refreshToken
      setIsAuthenticated(true); // אם הטוקן חודש, המשתמש מחובר
    } catch (err) {
      console.error("Token refresh error:", err);
      setIsAuthenticated(false);
    }
  };

  return { isAuthenticated, handleLogin, handleLogout, refreshUserToken };
};

export default useAuth;