import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = null;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        token = localStorage.getItem("token");
      }
    } catch (err) {
      // localStorage may be blocked in some contexts (extensions/iframe/privacy)
      token = null;
    }

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", { email, password });
    const { token, ...userData } = response.data;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("token", token);
      }
    } catch (err) {
      // ignore storage errors
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    const { token, ...userData } = response.data;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("token", token);
      }
    } catch (err) {
      // ignore storage errors
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
    return response.data;
  };

  const logout = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("token");
      }
    } catch (err) {
      // ignore storage errors
    }
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateProfile = async (data) => {
    const response = await axios.put("/api/auth/me", data);
    setUser(response.data);
    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
