import React from "react";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../component/Navigationbar";
import "./WriterDashboard.css";

export default function WriterDashboard() {
  const navigate = useNavigate();
  const writerEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div>
      <Navigationbar />

      <div className="writer-dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-welcome">
            <h1>✍️ Writer Dashboard</h1>
            <p>Welcome back, <strong>{writerEmail}</strong></p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <h3>My Articles</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <h3>Published</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📂</span>
            <h3>Drafts</h3>
            <p className="stat-number">0</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💬</span>
            <h3>Comments</h3>
            <p className="stat-number">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button
              className="action-btn primary"
              onClick={() => navigate("/write-news")}
            >
              ✍️ Write New Article
            </button>
            <button
              className="action-btn secondary"
              onClick={() => navigate("/my-articles")}
            >
              📋 View My Articles
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}