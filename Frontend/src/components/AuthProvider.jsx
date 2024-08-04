import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/getcurrentuser");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      setUser(res.data.user);
      navigate(
        res.data.user.role === "admin"
          ? "/admin/dashboard"
          : "/customer/dashboard"
      );
      console.log(res.data);
    } catch (err) {
      alert("Login failed");
    }
  };

  const signup = async (fullName, email, password, role) => {
    try {
      await axios.post("http://localhost:3000/user/signup", {
        fullName,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:3000/user/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
