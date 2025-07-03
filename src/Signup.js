// src/Signup.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; 

function Signup() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);
    const response = await fetch("https://backend-todo-ey6a.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setAuthLoading(false);
    if (data.message === "User registered") {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setAuthError(data.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>

      {authError && <div className="signup-error">{authError}</div>}
      {success && (
        <div className="signup-success">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          placeholder="Password"
        />
        <button
          type="submit"
          className="signup-button"
          disabled={authLoading}
        >
          {authLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="signup-footer">
        <span>Already have an account? </span>
        <Link to="/login" className="signup-link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
