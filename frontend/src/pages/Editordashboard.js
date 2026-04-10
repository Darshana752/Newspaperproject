import React, { useState, useEffect } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import "./Editordashboard.css";

const API = "http://localhost:8090";

export default function Editordashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [news, setNews]           = useState([]);
  const [writers, setWriters]     = useState([]);
  const [readers, setReaders]     = useState([]);
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── FETCH ALL DATA ─────────────────────────────────────────
  const fetchNews    = async () => { try { const r = await axios.get(`${API}/api/news/all`);    setNews(r.data);    } catch { showToast("Failed to load news", "error"); } };
  const fetchWriters = async () => { try { const r = await axios.get(`${API}/api/auth/writers`); setWriters(r.data); } catch { showToast("Failed to load writers", "error"); } };
  const fetchReaders = async () => { try { const r = await axios.get(`${API}/api/auth/readers`); setReaders(r.data); } catch { showToast("Failed to load readers", "error"); } };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchNews(), fetchWriters(), fetchReaders()]).finally(() => setLoading(false));
  }, []);

  // ── APPROVE / REJECT NEWS ──────────────────────────────────
  const updateNewsStatus = async (id, status) => {
    try {
      await axios.put(`${API}/api/news/update/${id}`, null, { params: { status } });
      showToast(`News ${status.toLowerCase()} successfully!`);
      fetchNews();
    } catch { showToast("Failed to update news", "error"); }
  };

  // ── DELETE ─────────────────────────────────────────────────
  const deleteNews   = async (id) => { try { await axios.delete(`${API}/api/news/delete/${id}`);          showToast("News deleted!");   fetchNews();    } catch { showToast("Delete failed", "error"); } };
  const deleteWriter = async (id) => { try { await axios.delete(`${API}/api/auth/writers/${id}`);         showToast("Writer deleted!"); fetchWriters(); } catch { showToast("Delete failed", "error"); } };
  const deleteReader = async (id) => { try { await axios.delete(`${API}/api/auth/readers/${id}`);         showToast("Reader deleted!"); fetchReaders(); } catch { showToast("Delete failed", "error"); } };

  const pendingCount  = news.filter(n => n.status === "PENDING").length;
  const approvedCount = news.filter(n => n.status === "APPROVED").length;
  const rejectedCount = news.filter(n => n.status === "REJECTED").length;

  return (
    <div className="ed-root">
      <Navigationbar />

      {/* TOAST */}
      {toast && <div className={`ed-toast ed-toast--${toast.type}`}>{toast.msg}</div>}

      <div className="ed-hero">
        <div className="ed-hero__bg" />
        <div className="ed-hero__content">
          <span className="ed-hero__badge">Editor Control Room</span>
          <h1 className="ed-hero__title">Editorial<br />Dashboard</h1>
          <p className="ed-hero__sub">Manage news, writers, and readers from one place.</p>
        </div>
      </div>

      {/* STATS */}
      <div className="ed-stats">
        <div className="ed-stat ed-stat--blue">
          <span className="ed-stat__num">{news.length}</span>
          <span className="ed-stat__label">Total Articles</span>
        </div>
        <div className="ed-stat ed-stat--amber">
          <span className="ed-stat__num">{pendingCount}</span>
          <span className="ed-stat__label">Pending Review</span>
        </div>
        <div className="ed-stat ed-stat--green">
          <span className="ed-stat__num">{approvedCount}</span>
          <span className="ed-stat__label">Approved</span>
        </div>
        <div className="ed-stat ed-stat--red">
          <span className="ed-stat__num">{rejectedCount}</span>
          <span className="ed-stat__label">Rejected</span>
        </div>
        <div className="ed-stat ed-stat--purple">
          <span className="ed-stat__num">{writers.length}</span>
          <span className="ed-stat__label">Writers</span>
        </div>
        <div className="ed-stat ed-stat--teal">
          <span className="ed-stat__num">{readers.length}</span>
          <span className="ed-stat__label">Readers</span>
        </div>
      </div>

      {/* TABS */}
      <div className="ed-tabs">
        {[
          { key: "news",    label: "📰 News",    count: news.length    },
          { key: "writers", label: "✍️ Writers", count: writers.length },
          { key: "readers", label: "👥 Readers", count: readers.length },
        ].map(t => (
          <button
            key={t.key}
            className={`ed-tab ${activeTab === t.key ? "ed-tab--active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            <span className="ed-tab__badge">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="ed-body">
        {loading && <div className="ed-loader"><div className="ed-spinner" /></div>}

        {/* ── NEWS TAB ──────────────────────────────────────── */}
        {!loading && activeTab === "news" && (
          <div className="ed-section">
            <h2 className="ed-section__title">All Articles</h2>
            {news.length === 0 ? (
              <div className="ed-empty">No articles found.</div>
            ) : (
              <div className="ed-table-wrap">
                <table className="ed-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Topic</th>
                      
                      <th>Type</th>
                      <th>Writer</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Filename</th>
                     
                      <th>Status</th>
                      <th>Actions</th>
                       

                    </tr>
                  </thead>
                  <tbody>
                    {news.map((n, i) => (
                      <tr key={n.newsId} className="ed-table__row">
                        <td>{i + 1}</td>
                        <td className="ed-table__topic">{n.topic}</td>
                        <td><span className={`ed-badge ed-badge--type`}>{n.newsType}</span></td>
                        <td>{n.writer?.name || "—"}</td>
                        <td>{n.description}</td>
                        <td>{n.date}</td>

                        <td>
  {n.filePath ? (
    <div>
      {/* Show file name */}
      <div style={{ fontSize: "12px", marginBottom: "5px" }}>
        {n.fileName}
      </div>

      {/* Download button */}
      <a
        href={`http://localhost:8090/${n.filePath}`}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="ed-btn ed-btn--view"
      >
        ⬇ Click Here
      </a>
    </div>
  ) : (
    "No File"
  )}
</td>
  







                        

                        <td>
                          <span className={`ed-badge ed-badge--${n.status?.toLowerCase()}`}>
                            {n.status}
                          </span>
                        </td>
                        <td className="ed-table__actions">
                          {n.status === "PENDING" && (
                            <>
                              <button className="ed-btn ed-btn--approve" onClick={() => updateNewsStatus(n.newsId, "APPROVED")}>✓ Approve</button>
                              <button className="ed-btn ed-btn--reject"  onClick={() => updateNewsStatus(n.newsId, "REJECTED")}>✕ Reject</button>
                            </>
                          )}
                          <button className="ed-btn ed-btn--delete" onClick={() => deleteNews(n.newsId)}>🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── WRITERS TAB ───────────────────────────────────── */}
        {!loading && activeTab === "writers" && (
          <div className="ed-section">
            <h2 className="ed-section__title">All Writers</h2>
            {writers.length === 0 ? (
              <div className="ed-empty">No writers found.</div>
            ) : (
              <div className="ed-cards">
                {writers.map((w, i) => (
                  <div key={w.writerId} className="ed-card" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ed-card__avatar">{w.name?.charAt(0).toUpperCase()}</div>
                    <div className="ed-card__info">
                      <h3>{w.name}</h3>
                      <p>📧 {w.email}</p>
                      <p>🪪 {w.nic || "—"}</p>
                    </div>
                    <button className="ed-btn ed-btn--delete" onClick={() => deleteWriter(w.writerId)}>🗑 Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── READERS TAB ───────────────────────────────────── */}
        {!loading && activeTab === "readers" && (
          <div className="ed-section">
            <h2 className="ed-section__title">All Readers</h2>
            {readers.length === 0 ? (
              <div className="ed-empty">No readers found.</div>
            ) : (
              <div className="ed-cards">
                {readers.map((r, i) => (
                  <div key={r.readerId} className="ed-card" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ed-card__avatar ed-card__avatar--reader">{r.name?.charAt(0).toUpperCase()}</div>
                    <div className="ed-card__info">
                      <h3>{r.name}</h3>
                      <p>📧 {r.email}</p>
                    </div>
                    <button className="ed-btn ed-btn--delete" onClick={() => deleteReader(r.readerId)}>🗑 Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
