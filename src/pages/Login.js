import { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Login Successful:", data);
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save token
      
      alert("Login Successful!"); // Show success alert

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
