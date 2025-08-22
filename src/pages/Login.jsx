// src/pages/Login.jsx
"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      setError("No registered user found. Please register first.");
      return;
    }

    if (userData.email === email || userData.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "48px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "32px",
          color: "#111827",
        }}>Login</h1>

        {error && (
          <p style={{ color: "red", marginBottom: "20px", textAlign: "center" }}>{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%", padding: "12px",
              backgroundColor: "#1f2937", color: "white", border: "none",
              borderRadius: "8px", fontSize: "16px", cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>



  );
};

export default Login;
