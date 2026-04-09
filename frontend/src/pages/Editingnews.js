import React, { useState } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditorLogin.css";

export default function Editingnews() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      email: formData.email,
      password: formData.password,
      role: "EDITOR",
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/login",
        payload
      );

      localStorage.setItem("userRole", "EDITOR");
      localStorage.setItem("userEmail", formData.email);

      setIsError(false);
      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/Editordashboard");
      }, 1500);

    } catch (error) {
      setIsError(true);
      setMessage(
        error.response?.data || "Login failed! Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className="editor-login-page">

        {/* Animated background particles */}
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        {/* Left Panel */}
        <div className="editor-login-left">
          <div className="editor-login-left-content">

            <div className="editor-badge">
              <div className="badge-ring"></div>
              <span className="badge-icon">🖊️</span>
            </div>

            <h1 className="left-title">Editor Portal</h1>
            <p className="left-subtitle">
              Access your editorial dashboard to review, approve and manage
              all news content across every category.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Review & approve writer submissions</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Manage local, foreign & sports news</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Monitor publishing activity</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Oversee all writer accounts</span>
              </div>
            </div>

            <div className="left-footer-note">
              🔐 Authorized personnel only
            </div>

          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="editor-login-right">
          <div className="editor-login-card">

            {/* Card top accent */}
            <div className="card-accent"></div>

            <div className="card-body">

              <div className="card-header">
                <div className="lock-icon">🔒</div>
                <h2>Editor Login</h2>
                <p>Sign in with your authorized credentials</p>
              </div>

              {message && (
                <div className={`alert-message ${isError ? "alert-error" : "alert-success"}`}>
                  <span className="alert-icon">{isError ? "⚠️" : "✅"}</span>
                  <span>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="editor-form">

                {/* Email Field */}
                <div className="field-group">
                  <label>Email Address</label>
                  <div className="field-input-wrapper">
                    <span className="field-icon">📧</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <span className="field-underline"></span>
                  </div>
                </div>

                {/* Password Field */}
                <div className="field-group">
                  <label>Password</label>
                  <div className="field-input-wrapper">
                    <span className="field-icon">🔑</span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                    <span className="field-underline"></span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="btn-inner">
                      <span className="btn-spinner"></span>
                      Authenticating...
                    </span>
                  ) : (
                    <span className="btn-inner">
                      <span>Login as Editor</span>
                      <span className="btn-arrow">→</span>
                    </span>
                  )}
                </button>

              </form>

              <div className="card-footer-links">
                <span className="back-link" onClick={() => navigate("/")}>
                  ← Back to Home
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}