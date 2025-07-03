// src/Login.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; 

export default function Login({ setToken }) {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");

    const response = await fetch("https://todobackend-bi77.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    setAuthLoading(false);
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setAuthError(data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {authError && <div className="login-error">{authError}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="Password"
        />
        <button type="submit" className="login-button">
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="login-footer">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="login-signup-link">Signup</span>
        </Link>
      </div>
    </div>
  );
}
