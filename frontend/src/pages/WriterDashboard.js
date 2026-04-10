import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import "./WriterDashboard.css";

const API = "http://localhost:8090";

export default function WriterDashboard() {
  const navigate    = useNavigate();
  const writerName  = localStorage.getItem("writerName");
  const writerEmail = localStorage.getItem("writerEmail");
  const writerId    = localStorage.getItem("writerId");

  const [articles, setArticles] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [toast,    setToast]    = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── FETCH THIS WRITER'S ARTICLES ───────────────────────────
  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API}/api/news/all`);
      const mine = res.data.filter(n => n.writer?.writerId === Number(writerId));
      setArticles(mine);
    } catch {
      showToast("Failed to load articles", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!writerId) { navigate("/writer-login"); return; }
    fetchArticles();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("writerId");
    localStorage.removeItem("writerName");
    localStorage.removeItem("writerEmail");
    localStorage.removeItem("role");
    navigate("/");
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`${API}/api/news/delete/${id}`);
      showToast("Article deleted!");
      fetchArticles();
    } catch {
      showToast("Delete failed", "error");
    }
  };

  // ── COUNTS ─────────────────────────────────────────────────
  const total    = articles.length;
  const approved = articles.filter(a => a.status === "APPROVED").length;
  const pending  = articles.filter(a => a.status === "PENDING").length;
  const rejected = articles.filter(a => a.status === "REJECTED").length;

  return (
    <div className="wd-root">
      <Navigationbar />

      {/* TOAST */}
      {toast && (
        <div className={`wd-toast wd-toast--${toast.type}`}>{toast.msg}</div>
      )}

      {/* HERO HEADER */}
      <div className="wd-hero">
        <div className="wd-hero__bg" />
        <div className="wd-hero__content">
          <div className="wd-hero__left">
            <span className="wd-hero__badge">Writer Portal</span>
            <h1 className="wd-hero__title">Welcome back,<br />{writerName || "Writer"}</h1>
            <p className="wd-hero__email">📧 {writerEmail}</p>
          </div>
          <div className="wd-hero__right">
            <button
              className="wd-btn wd-btn--primary"
              onClick={() => navigate("/Writenewarticle")}
            >
              ✍️ Write New Article
            </button>
            <button className="wd-btn wd-btn--logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="wd-stats">
        <div className="wd-stat wd-stat--blue">
          <span className="wd-stat__num">{total}</span>
          <span className="wd-stat__label">Total Articles</span>
        </div>
        <div className="wd-stat wd-stat--amber">
          <span className="wd-stat__num">{pending}</span>
          <span className="wd-stat__label">Pending Review</span>
        </div>
        <div className="wd-stat wd-stat--green">
          <span className="wd-stat__num">{approved}</span>
          <span className="wd-stat__label">Approved</span>
        </div>
        <div className="wd-stat wd-stat--red">
          <span className="wd-stat__num">{rejected}</span>
          <span className="wd-stat__label">Rejected</span>
        </div>
      </div>

      {/* ARTICLES TABLE */}
      <div className="wd-body">
        <div className="wd-section">
          <div className="wd-section__header">
            <h2 className="wd-section__title">My Articles</h2>
            <button
              className="wd-btn wd-btn--primary"
              onClick={() => navigate("/Writenewarticle")}
            >
              + New Article
            </button>
          </div>

          {loading ? (
            <div className="wd-loader"><div className="wd-spinner" /></div>
          ) : articles.length === 0 ? (
            <div className="wd-empty">
              <span>📭</span>
              <p>No articles yet. Write your first article!</p>
              <button
                className="wd-btn wd-btn--primary"
                onClick={() => navigate("/Writenewarticle")}
              >
                ✍️ Write Now
              </button>
            </div>
          ) : (
            <div className="wd-table-wrap">
              <table className="wd-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Topic</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((a, i) => (
                    <tr key={a.newsId} className="wd-table__row">
                      <td>{i + 1}</td>
                      <td className="wd-table__topic">{a.topic}</td>
                      <td>
                        <span className="wd-badge wd-badge--type">{a.newsType}</span>
                      </td>
                      <td>{a.date}</td>
                      <td>
                        <span className={`wd-badge wd-badge--${a.status?.toLowerCase()}`}>
                          {a.status === "PENDING"  && "⏳ Pending"}
                          {a.status === "APPROVED" && "✅ Approved"}
                          {a.status === "REJECTED" && "❌ Rejected"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="wd-btn wd-btn--delete"
                          onClick={() => deleteArticle(a.newsId)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}