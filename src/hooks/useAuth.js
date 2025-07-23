import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("isLoggedIn") === "true"
  );

  const login = () => {
    Cookies.set("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkAuth = () => {
      const cookieValue = Cookies.get("isLoggedIn");
      setIsLoggedIn(cookieValue === "true");
    };

    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, []);

  return { isLoggedIn, login, logout };
}
