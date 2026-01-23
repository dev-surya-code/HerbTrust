import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLeaf, FaUserShield } from "react-icons/fa";

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      const users = getUsers();

      if (isLogin) {
        const existingUser = users.find(
          (u) =>
            u.userId === userId && u.password === password && u.role === role
        );

        if (existingUser) {
          onLogin(existingUser);
        } else {
          setError("Invalid UserID or Password.");
        }
      } else {
        const userExists = users.find(
          (u) => u.userId === userId && u.role === role
        );
        if (userExists) {
          setError("UserID with this role already exists.");
        } else {
          const newUser = {
            userId,
            email,
            password,
            role,
            access: role === "Consumer" ? "read-only" : "full",
          };
          saveUser(newUser);
          onLogin(newUser);
        }
      }
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate__animated animate__fadeInDown">
        <div className="logo">
          <FaLeaf size={40} className="leaf-icon" />
          <h1>HerbTrust</h1>
        </div>

        <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Role dropdown moved to the top */}
          <div className="role-select">
            <label>
              <FaUserShield /> Select Role:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-dropdown"
            >
              <option value="Farmer">Farmer</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Consumer">Consumer</option>
            </select>
          </div>

          {/* UserID */}
          <input
            type="text"
            placeholder="Enter UserID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          {/* Email only for SignUp */}
          {!isLogin && (
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          {/* Password */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <span className="loader"></span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
