import React, { useState } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./WriterLogin.css";

export default function WriterLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      email: formData.email,
      password: formData.password,
      role: "WRITER",
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/login",
        payload
      );

      setIsError(false);
      setMessage(response.data || "Login successful!");

      setTimeout(() => {
        navigate("/WriterDashboard");
      }, 1500);

    } catch (error) {
      setIsError(true);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage("Login failed! Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navigationbar />

      <div className="writer-login-page">

        {/* Left Panel */}
        <div className="writer-login-left">
          <div className="writer-login-left-content">
            <div className="writer-icon">✍️</div>
            <h1>Writer Portal</h1>
            <p>
              Welcome back! Log in to access your dashboard and start writing
              your next story.
            </p>
            <ul className="writer-features">
              <li>📝 Write & publish news articles</li>
              <li>📊 Track your article performance</li>
              <li>🗂️ Manage your drafts</li>
              <li>💬 View reader comments</li>
            </ul>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="writer-login-right">
          <div className="writer-login-form-wrapper">

            <div className="writer-login-header">
              <h2>Writer Login</h2>
              <p>Sign in with your writer credentials</p>
            </div>

            {message && (
              <div className={`writer-message ${isError ? "error" : "success"}`}>
                {message}
              </div>
            )}

            <form className="writer-login-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="writer-login-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Logging in...
                  </span>
                ) : (
                  "Login as Writer"
                )}
              </button>

            </form>

            <div className="writer-login-footer">
              <p>
                Not a writer?{" "}
                <span onClick={() => navigate("/signup")} className="link">
                  Sign up here
                </span>
              </p>
              <p>
                <span onClick={() => navigate("/")} className="link">
                  ← Back to Home
                </span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}