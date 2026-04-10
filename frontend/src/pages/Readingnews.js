import React, { useState, useEffect, useRef } from "react";
import Navigationbar from "../component/Navigationbar";
import axios from "axios";
import "./Readingnews.css";

const API = "http://localhost:8090";

const CATEGORIES = ["ALL", "LOCAL", "FOREIGN", "SPORTS"];
const CAT_META = {
  ALL:     { emoji: "🌐", label: "All News",     color: "#6366f1" },
  LOCAL:   { emoji: "📍", label: "Local News",   color: "#f0a500" },
  FOREIGN: { emoji: "🌍", label: "Foreign News", color: "#3b82f6" },
  SPORTS:  { emoji: "🏆", label: "Sports News",  color: "#22c55e" },
};

/* ── HERO SLIDES ─────────────────────────────────────────── */
const SLIDES = [
  {
    id: "local",
    label: "LOCAL NEWS",
    title: "Sri Lanka",
    subtitle: "Island of Serendipity",
    tagline: "Stories from the Pearl of the Indian Ocean",
    color1: "#f0a500",
    color2: "#ff6b35",
    bg: "linear-gradient(135deg, #0a0f1e 0%, #1a1000 50%, #0f0800 100%)",
    svgId: "sl-map",
  },
  {
    id: "foreign",
    label: "WORLD NEWS",
    title: "Global Pulse",
    subtitle: "Around the World",
    tagline: "Breaking news from every corner of the globe",
    color1: "#3b82f6",
    color2: "#06b6d4",
    bg: "linear-gradient(135deg, #050d1a 0%, #001230 50%, #030a15 100%)",
    svgId: "world-map",
  },
  {
    id: "sports",
    label: "SPORTS",
    title: "Game On",
    subtitle: "Live the Action",
    tagline: "Championships, records & the spirit of sport",
    color1: "#22c55e",
    color2: "#a3e635",
    bg: "linear-gradient(135deg, #030f05 0%, #001208 50%, #020a03 100%)",
    svgId: "sports",
  },
];

/* ── SVG ILLUSTRATIONS ───────────────────────────────────── */
function SlideIllustration({ svgId, color1, color2 }) {
  if (svgId === "sl-map") {
    return (
      <svg viewBox="0 0 340 500" xmlns="http://www.w3.org/2000/svg" className="rn-slide-svg">
        <defs>
          <radialGradient id="slglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </radialGradient>
          <filter id="slblur"><feGaussianBlur stdDeviation="8" /></filter>
        </defs>
        {/* Glow backdrop */}
        <ellipse cx="170" cy="250" rx="130" ry="190" fill="url(#slglow)" filter="url(#slblur)" />
        {/* Sri Lanka shape - simplified outline */}
        <path
          d="M170,60 L185,75 L195,95 L200,120 L205,150 L210,175 L215,200 L218,230
             L215,265 L210,295 L200,325 L190,355 L178,380 L168,400 L160,380
             L150,355 L140,325 L132,295 L128,265 L127,235 L128,205 L132,175
             L137,150 L143,120 L150,95 L160,75 Z"
          fill="none"
          stroke={color1}
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
          className="rn-map-path"
        />
        {/* Island fill */}
        <path
          d="M170,60 L185,75 L195,95 L200,120 L205,150 L210,175 L215,200 L218,230
             L215,265 L210,295 L200,325 L190,355 L178,380 L168,400 L160,380
             L150,355 L140,325 L132,295 L128,265 L127,235 L128,205 L132,175
             L137,150 L143,120 L150,95 L160,75 Z"
          fill={color1}
          opacity="0.08"
        />
        {/* City dots */}
        {[
          { x: 165, y: 195, name: "Colombo", main: true },
          { x: 195, y: 175, name: "Kandy" },
          { x: 210, y: 150, name: "Jaffna" },
          { x: 185, y: 340, name: "Galle" },
          { x: 200, y: 270, name: "Trinco" },
        ].map((c) => (
          <g key={c.name} className="rn-map-dot-group">
            {c.main && <circle cx={c.x} cy={c.y} r="18" fill={color1} opacity="0.12" className="rn-pulse-ring" />}
            <circle cx={c.x} cy={c.y} r={c.main ? 6 : 4} fill={color1} opacity="0.95" />
            <circle cx={c.x} cy={c.y} r={c.main ? 3 : 2} fill="#fff" opacity="0.9" />
            <text x={c.x + 10} y={c.y + 4} fill={color1} fontSize="10" fontFamily="DM Sans,sans-serif" opacity="0.85">{c.name}</text>
          </g>
        ))}
        {/* Grid lines */}
        {[80, 160, 240, 320, 400].map(y => (
          <line key={y} x1="60" y1={y} x2="280" y2={y} stroke={color1} strokeWidth="0.4" opacity="0.15" />
        ))}
        {[80, 140, 200, 260].map(x => (
          <line key={x} x1={x} y1="40" x2={x} y2="440" stroke={color1} strokeWidth="0.4" opacity="0.15" />
        ))}
        {/* Wave effects */}
        <g opacity="0.3">
          {[0, 1, 2].map(i => (
            <ellipse key={i} cx="170" cy="440" rx={50 + i * 30} ry={12 + i * 6} fill="none" stroke={color1} strokeWidth="1" opacity={0.6 - i * 0.18} className="rn-wave" style={{ animationDelay: `${i * 0.5}s` }} />
          ))}
        </g>
        {/* Label */}
        <text x="170" y="470" textAnchor="middle" fill={color1} fontSize="13" fontFamily="DM Sans,sans-serif" fontWeight="600" opacity="0.7" letterSpacing="3">SRI LANKA</text>
      </svg>
    );
  }

  if (svgId === "world-map") {
    return (
      <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="rn-slide-svg rn-slide-svg--wide">
        <defs>
          <radialGradient id="worldglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </radialGradient>
          <filter id="worldblur"><feGaussianBlur stdDeviation="12" /></filter>
        </defs>
        <ellipse cx="250" cy="150" rx="200" ry="130" fill="url(#worldglow)" filter="url(#worldblur)" />
        {/* Globe circle */}
        <circle cx="250" cy="150" r="110" fill="none" stroke={color1} strokeWidth="1.5" opacity="0.4" />
        <circle cx="250" cy="150" r="110" fill={color1} opacity="0.04" />
        {/* Longitude lines */}
        {[-75, -45, -15, 15, 45, 75].map((offset, i) => (
          <ellipse key={i} cx="250" cy="150" rx={Math.abs(offset) * 1.1} ry="110" fill="none" stroke={color1} strokeWidth="0.6" opacity="0.2" />
        ))}
        {/* Latitude lines */}
        {[-60, -30, 0, 30, 60].map((lat, i) => {
          const y = 150 + (lat / 90) * 110;
          const halfW = Math.sqrt(Math.max(0, 110 * 110 - (y - 150) ** 2));
          return <line key={i} x1={250 - halfW} y1={y} x2={250 + halfW} y2={y} stroke={color1} strokeWidth="0.6" opacity="0.2" />;
        })}
        {/* Continent blobs - simplified */}
        {/* North America */}
        <path d="M130,100 L155,90 L165,110 L160,140 L145,155 L130,145 L120,125 Z" fill={color1} opacity="0.25" stroke={color1} strokeWidth="1" />
        {/* South America */}
        <path d="M155,165 L170,160 L178,180 L175,210 L165,225 L152,215 L148,195 Z" fill={color1} opacity="0.22" stroke={color1} strokeWidth="1" />
        {/* Europe */}
        <path d="M230,95 L250,88 L265,100 L260,118 L245,122 L230,115 Z" fill={color1} opacity="0.25" stroke={color1} strokeWidth="1" />
        {/* Africa */}
        <path d="M235,130 L260,125 L272,145 L270,175 L258,190 L240,182 L230,160 L232,140 Z" fill={color1} opacity="0.22" stroke={color1} strokeWidth="1" />
        {/* Asia */}
        <path d="M265,85 L320,80 L345,100 L350,130 L330,148 L295,150 L270,140 L260,115 Z" fill={color1} opacity="0.25" stroke={color1} strokeWidth="1" />
        {/* Australia */}
        <path d="M330,180 L360,175 L370,195 L360,210 L335,208 L320,195 Z" fill={color1} opacity="0.2" stroke={color1} strokeWidth="1" />
        {/* City pings */}
        {[
          { x: 145, y: 118, city: "NY" },
          { x: 240, y: 105, city: "London" },
          { x: 305, y: 110, city: "Delhi" },
          { x: 340, y: 118, city: "Tokyo" },
          { x: 250, y: 155, city: "Nairobi" },
          { x: 162, y: 185, city: "São Paulo" },
          { x: 348, y: 192, city: "Sydney" },
        ].map(c => (
          <g key={c.city} className="rn-map-dot-group">
            <circle cx={c.x} cy={c.y} r="14" fill={color1} opacity="0.1" className="rn-pulse-ring" />
            <circle cx={c.x} cy={c.y} r="3.5" fill={color1} opacity="0.95" />
            <circle cx={c.x} cy={c.y} r="1.5" fill="#fff" opacity="0.9" />
            <text x={c.x + 7} y={c.y - 5} fill={color1} fontSize="8.5" fontFamily="DM Sans,sans-serif" opacity="0.8">{c.city}</text>
          </g>
        ))}
        {/* Connection arcs */}
        {[
          { x1: 145, y1: 118, x2: 240, y2: 105 },
          { x1: 240, y1: 105, x2: 305, y2: 110 },
          { x1: 305, y1: 110, x2: 340, y2: 118 },
          { x1: 240, y1: 105, x2: 250, y2: 155 },
        ].map((arc, i) => (
          <path
            key={i}
            d={`M${arc.x1},${arc.y1} Q${(arc.x1 + arc.x2) / 2},${Math.min(arc.y1, arc.y2) - 25} ${arc.x2},${arc.y2}`}
            fill="none"
            stroke={color1}
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.4"
            className="rn-arc-dash"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <text x="250" y="282" textAnchor="middle" fill={color1} fontSize="11" fontFamily="DM Sans,sans-serif" fontWeight="600" opacity="0.65" letterSpacing="4">WORLD NEWS</text>
      </svg>
    );
  }

  /* Sports */
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="rn-slide-svg">
      <defs>
        <radialGradient id="sportglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color1} stopOpacity="0" />
        </radialGradient>
        <filter id="sportblur"><feGaussianBlur stdDeviation="10" /></filter>
      </defs>
      <ellipse cx="200" cy="200" rx="160" ry="160" fill="url(#sportglow)" filter="url(#sportblur)" />

      {/* Cricket ball */}
      <circle cx="110" cy="130" r="48" fill="none" stroke={color1} strokeWidth="2" opacity="0.5" className="rn-sport-spin" />
      <circle cx="110" cy="130" r="48" fill={color1} opacity="0.07" />
      <path d="M110,82 Q130,100 130,130 Q130,160 110,178" fill="none" stroke={color1} strokeWidth="1.5" opacity="0.6" />
      <path d="M110,82 Q90,100 90,130 Q90,160 110,178" fill="none" stroke={color1} strokeWidth="1.5" opacity="0.6" />
      {[82, 92, 102, 158, 168, 178].map((y, i) => (
        <line key={i} x1={i < 3 ? 107 : 107} y1={y} x2={i < 3 ? 113 : 113} y2={y + 5} stroke={color1} strokeWidth="1.2" opacity="0.7" transform={i < 3 ? `rotate(${(i - 1) * 12},110,130)` : `rotate(${(i - 4) * 12},110,130)`} />
      ))}
      <text x="110" y="198" textAnchor="middle" fill={color1} fontSize="9" fontFamily="DM Sans,sans-serif" opacity="0.7" letterSpacing="2">CRICKET</text>

      {/* Football */}
      <circle cx="290" cy="140" r="44" fill="none" stroke={color1} strokeWidth="2" opacity="0.5" />
      <circle cx="290" cy="140" r="44" fill={color1} opacity="0.07" />
      <polygon points="290,110 305,125 299,145 281,145 275,125" fill="none" stroke={color1} strokeWidth="1.4" opacity="0.7" />
      <path d="M290,110 L285,97 M305,125 L318,118 M299,145 L308,157 M281,145 L272,157 M275,125 L262,118" fill="none" stroke={color1} strokeWidth="1" opacity="0.5" />
      <text x="290" y="202" textAnchor="middle" fill={color1} fontSize="9" fontFamily="DM Sans,sans-serif" opacity="0.7" letterSpacing="2">FOOTBALL</text>

      {/* Trophy */}
      <g transform="translate(160, 220)">
        <path d="M40,0 L60,0 L65,30 Q80,35 80,55 Q80,80 60,85 L60,95 L70,95 L70,110 L30,110 L30,95 L40,95 L40,85 Q20,80 20,55 Q20,35 35,30 Z" fill="none" stroke={color1} strokeWidth="2.2" opacity="0.8" />
        <path d="M40,0 L60,0 L65,30 Q80,35 80,55 Q80,80 60,85 L60,95 L70,95 L70,110 L30,110 L30,95 L40,95 L40,85 Q20,80 20,55 Q20,35 35,30 Z" fill={color1} opacity="0.1" />
        <path d="M20,55 Q5,50 5,35 Q5,20 20,20 L35,30" fill="none" stroke={color1} strokeWidth="1.5" opacity="0.6" />
        <path d="M80,55 Q95,50 95,35 Q95,20 80,20 L65,30" fill="none" stroke={color1} strokeWidth="1.5" opacity="0.6" />
        <circle cx="50" cy="50" r="12" fill={color1} opacity="0.2" />
        <path d="M50,40 L53,47 L61,47 L55,52 L57,60 L50,55 L43,60 L45,52 L39,47 L47,47 Z" fill={color1} opacity="0.8" />
      </g>

      {/* Orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = 155, cx = 200 + r * Math.cos((angle * Math.PI) / 180), cy = 200 + r * Math.sin((angle * Math.PI) / 180);
        return <circle key={i} cx={cx} cy={cy} r="3" fill={color1} opacity="0.4" className="rn-orbit-dot" style={{ animationDelay: `${i * 0.2}s` }} />;
      })}
      <circle cx="200" cy="200" r="155" fill="none" stroke={color1} strokeWidth="0.5" strokeDasharray="6 4" opacity="0.2" className="rn-sport-spin" style={{ animationDuration: "20s" }} />

      <text x="200" y="385" textAnchor="middle" fill={color1} fontSize="11" fontFamily="DM Sans,sans-serif" fontWeight="600" opacity="0.65" letterSpacing="4">SPORTS</text>
    </svg>
  );
}

/* ── HERO SLIDER ─────────────────────────────────────────── */
function HeroSlider({ onSearch, search, setSearch }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const go = (idx) => {
    setDir(idx > current ? 1 : -1);
    setPrev(current);
    setCurrent(idx);
  };

  const next = () => go((current + 1) % SLIDES.length);
  const prev_ = () => go((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => { setPrev(c); setDir(1); return (c + 1) % SLIDES.length; }), 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => { clearInterval(timerRef.current); timerRef.current = setInterval(() => setCurrent(c => { setPrev(c); setDir(1); return (c + 1) % SLIDES.length; }), 6000); };

  const slide = SLIDES[current];

  return (
    <div className="rn-slider" style={{ background: slide.bg }}>
      {/* Background particles */}
      <div className="rn-slider__particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="rn-particle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s`, background: slide.color1 }} />
        ))}
      </div>

      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`rn-slide ${i === current ? "rn-slide--active" : ""} ${i === prev ? "rn-slide--exit" : ""}`}
          style={{ "--s-c1": s.color1, "--s-c2": s.color2 }}
        >
          <div className="rn-slide__inner">
            {/* Left text */}
            <div className="rn-slide__text">
              <span className="rn-slide__eyebrow" style={{ color: s.color1, borderColor: s.color1 + "44", background: s.color1 + "18" }}>
                {i === 0 ? "📍" : i === 1 ? "🌍" : "🏆"} {s.label}
              </span>
              <h1 className="rn-slide__title" style={{ "--g1": s.color1, "--g2": s.color2 }}>
                {s.title}
              </h1>
              <p className="rn-slide__subtitle">{s.subtitle}</p>
              <p className="rn-slide__tagline">{s.tagline}</p>
            </div>
            {/* Right illustration */}
            <div className="rn-slide__art">
              <SlideIllustration svgId={s.svgId} color1={s.color1} color2={s.color2} />
            </div>
          </div>
        </div>
      ))}

      {/* Search bar */}
      <div className="rn-slider__search-wrap">
        <div className="rn-search" style={{ maxWidth: 540, margin: "0 auto" }}>
          <span className="rn-search__icon">🔍</span>
          <input
            className="rn-search__input"
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="rn-search__clear" onClick={() => setSearch("")}>✕</button>}
        </div>
      </div>

      {/* Controls */}
      <button className="rn-slider__arrow rn-slider__arrow--left" onClick={() => { prev_(); resetTimer(); }} aria-label="Previous">‹</button>
      <button className="rn-slider__arrow rn-slider__arrow--right" onClick={() => { next(); resetTimer(); }} aria-label="Next">›</button>

      {/* Dots */}
      <div className="rn-slider__dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            className={`rn-slider__dot ${i === current ? "rn-slider__dot--active" : ""}`}
            style={i === current ? { background: slide.color1, borderColor: slide.color1 } : {}}
            onClick={() => { go(i); resetTimer(); }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="rn-slider__progress">
        <div className="rn-slider__progress-fill" key={current} style={{ background: `linear-gradient(90deg, ${slide.color1}, ${slide.color2})` }} />
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ──────────────────────────────────────── */
export default function Readingnews() {
  const [news,      setNews]      = useState([]);
  const [filtered,  setFiltered]  = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search,    setSearch]    = useState("");
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);

  const [comments,     setComments]     = useState([]);
  const [commentText,  setCommentText]  = useState("");
  const [commentLoad,  setCommentLoad]  = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode,      setAuthMode]      = useState("login");
  const [authForm,      setAuthForm]      = useState({ name: "", email: "", password: "" });
  const [authLoading,   setAuthLoading]   = useState(false);
  const [authError,     setAuthError]     = useState("");

  const [reader, setReader] = useState(() => {
    const id    = localStorage.getItem("readerId");
    const name  = localStorage.getItem("readerName");
    const email = localStorage.getItem("readerEmail");
    return id ? { id, name, email } : null;
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res      = await axios.get(`${API}/api/news/all`);
        const approved = res.data.filter(n => n.status === "APPROVED");
        setNews(approved);
        setFiltered(approved);
      } catch { console.error("Failed to fetch news"); }
      finally  { setLoading(false); }
    };
    fetch();
  }, []);

  useEffect(() => {
    let r = news;
    if (activeTab !== "ALL") r = r.filter(n => n.newsType === activeTab);
    if (search.trim())       r = r.filter(n =>
      n.topic?.toLowerCase().includes(search.toLowerCase()) ||
      n.description?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(r);
  }, [activeTab, search, news]);

  useEffect(() => {
    if (!selected) return;
    const fetchComments = async () => {
      setCommentLoad(true);
      try {
        const res = await axios.get(`${API}/api/comments/news/${selected.newsId}`);
        setComments(res.data);
      } catch { setComments([]); }
      finally  { setCommentLoad(false); }
    };
    fetchComments();
    setCommentText("");
  }, [selected]);

  const openArticle = (article) => { setSelected(article); setComments([]); };

  const submitComment = async () => {
    if (!reader) { setShowAuthModal(true); return; }
    if (!commentText.trim()) return;
    try {
      await axios.post(`${API}/api/comments/add`, {
        readerId: Number(reader.id),
        newsId:   selected.newsId,
        comment:  commentText.trim(),
      });
      setCommentText("");
      const res = await axios.get(`${API}/api/comments/news/${selected.newsId}`);
      setComments(res.data);
    } catch { alert("Failed to post comment. Please try again."); }
  };

  const handleLogin = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email: authForm.email, password: authForm.password, role: "READER" });
      const data = res.data;
      localStorage.setItem("readerId",    data.writerId);
      localStorage.setItem("readerName",  data.name);
      localStorage.setItem("readerEmail", data.email);
      setReader({ id: data.writerId, name: data.name, email: data.email });
      setShowAuthModal(false);
      setAuthForm({ name: "", email: "", password: "" });
    } catch (err) {
      setAuthError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally { setAuthLoading(false); }
  };

  const handleSignup = async () => {
    setAuthError("");
    if (!authForm.name || !authForm.email || !authForm.password) { setAuthError("All fields are required."); return; }
    setAuthLoading(true);
    try {
      await axios.post(`${API}/api/auth/register`, { name: authForm.name, email: authForm.email, password: authForm.password, role: "READER" });
      await handleLogin();
    } catch (err) {
      setAuthError(err.response?.data || "Signup failed. Email may already exist.");
      setAuthLoading(false);
    }
  };

  const logoutReader = () => {
    localStorage.removeItem("readerId");
    localStorage.removeItem("readerName");
    localStorage.removeItem("readerEmail");
    setReader(null);
  };

  const isImage = (type) => type && type.startsWith("image/");

  const counts = {
    ALL:     news.length,
    LOCAL:   news.filter(n => n.newsType === "LOCAL").length,
    FOREIGN: news.filter(n => n.newsType === "FOREIGN").length,
    SPORTS:  news.filter(n => n.newsType === "SPORTS").length,
  };

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const fmtDate = (dt) => {
    if (!dt) return "";
    return new Date(dt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="rn-root">
      <Navigationbar />

      {/* Reader bar */}
      <div className="rn-reader-bar">
        {reader ? (
          <div className="rn-reader-bar__inner">
            <span>👤 Logged in as <strong>{reader.name}</strong></span>
            <button className="rn-reader-bar__btn" onClick={logoutReader}>Sign Out</button>
          </div>
        ) : (
          <div className="rn-reader-bar__inner">
            <span>💬 Want to comment? </span>
            <button className="rn-reader-bar__btn" onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}>Sign In</button>
            <span> or </span>
            <button className="rn-reader-bar__btn rn-reader-bar__btn--accent" onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}>Sign Up</button>
          </div>
        )}
      </div>

      {/* ── HERO SLIDER ───────────────────────────────────── */}
      <HeroSlider search={search} setSearch={setSearch} />

      {/* ── TABS ─────────────────────────────────────────── */}
      <div className="rn-tabs-wrap">
        <div className="rn-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`rn-tab ${activeTab === cat ? "rn-tab--active" : ""}`}
              style={activeTab === cat ? { "--tab-color": CAT_META[cat].color } : {}}
              onClick={() => setActiveTab(cat)}
            >
              <span>{CAT_META[cat].emoji}</span>
              <span>{CAT_META[cat].label}</span>
              <span className="rn-tab__count">{counts[cat]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────── */}
      <div className="rn-body">
        {loading ? (
          <div className="rn-loader"><div className="rn-spinner" /><p>Loading latest news...</p></div>
        ) : filtered.length === 0 ? (
          <div className="rn-empty"><span>📭</span><h3>No articles found</h3><p>Try a different category or search term.</p></div>
        ) : (
          <>
            {featured && (
              <div className="rn-featured" onClick={() => openArticle(featured)} style={{ "--feat-color": CAT_META[featured.newsType]?.color || "#6366f1" }}>
                <div className="rn-featured__left">
                  <div className="rn-featured__meta">
                    <span className="rn-featured__badge">{CAT_META[featured.newsType]?.emoji} {featured.newsType}</span>
                    <span className="rn-featured__date">{featured.date}</span>
                  </div>
                  <h2 className="rn-featured__title">{featured.topic}</h2>
                  <p className="rn-featured__desc">{featured.description?.slice(0, 220)}{featured.description?.length > 220 ? "..." : ""}</p>
                  <div className="rn-featured__footer">
                    <span className="rn-featured__writer">✍️ {featured.writer?.name || "Unknown"}</span>
                    <span className="rn-read-more">Read Full Story →</span>
                  </div>
                </div>
                <div className="rn-featured__right">
                  {featured.filePath && isImage(featured.fileType) ? (
                    <img src={`${API}/${featured.filePath}`} alt={featured.topic} className="rn-featured__img" onError={e => { e.target.style.display = "none"; }} />
                  ) : (
                    <div className="rn-featured__placeholder"><span>{CAT_META[featured.newsType]?.emoji || "📰"}</span></div>
                  )}
                </div>
              </div>
            )}
            {rest.length > 0 && (
              <div className="rn-grid">
                {rest.map((n, i) => (
                  <div key={n.newsId} className="rn-card" style={{ animationDelay: `${i * 0.07}s`, "--card-color": CAT_META[n.newsType]?.color || "#6366f1" }} onClick={() => openArticle(n)}>
                    <div className="rn-card__img-wrap">
                      {n.filePath && isImage(n.fileType) ? (
                        <img src={`${API}/${n.filePath}`} alt={n.topic} className="rn-card__img" onError={e => { e.target.parentElement.innerHTML = `<div class="rn-card__imgfallback">${CAT_META[n.newsType]?.emoji || "📰"}</div>`; }} />
                      ) : (
                        <div className="rn-card__imgfallback">{CAT_META[n.newsType]?.emoji || "📰"}</div>
                      )}
                      <span className="rn-card__type-badge">{CAT_META[n.newsType]?.emoji} {n.newsType}</span>
                    </div>
                    <div className="rn-card__body">
                      <div className="rn-card__meta">
                        <span>{n.date}</span>
                        <span>✍️ {n.writer?.name || "Unknown"}</span>
                      </div>
                      <h3 className="rn-card__title">{n.topic}</h3>
                      <p className="rn-card__desc">{n.description?.slice(0, 120)}{n.description?.length > 120 ? "..." : ""}</p>
                      <span className="rn-card__cta">Read More →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── ARTICLE MODAL ───────────────────────────────── */}
      {selected && (
        <div className="rn-modal-overlay" onClick={() => setSelected(null)}>
          <div className="rn-modal" onClick={e => e.stopPropagation()}>
            <button className="rn-modal__close" onClick={() => setSelected(null)}>✕</button>
            {selected.filePath && isImage(selected.fileType) && (
              <img src={`${API}/${selected.filePath}`} alt={selected.topic} className="rn-modal__img" onError={e => { e.target.style.display = "none"; }} />
            )}
            <div className="rn-modal__body">
              <div className="rn-modal__meta">
                <span className="rn-modal__badge" style={{ background: CAT_META[selected.newsType]?.color + "22", color: CAT_META[selected.newsType]?.color, border: `1px solid ${CAT_META[selected.newsType]?.color}44` }}>
                  {CAT_META[selected.newsType]?.emoji} {selected.newsType}
                </span>
                <span className="rn-modal__date">{selected.date} · {selected.time?.slice(0, 5)}</span>
              </div>
              <h2 className="rn-modal__title">{selected.topic}</h2>
              <p className="rn-modal__writer">✍️ {selected.writer?.name || "Unknown Writer"}</p>
              <div className="rn-modal__divider" />
              <p className="rn-modal__desc">{selected.description}</p>
              {selected.filePath && !isImage(selected.fileType) && (
                <a href={`${API}/${selected.filePath}`} target="_blank" rel="noreferrer" className="rn-modal__pdf">📄 View Attached Document</a>
              )}
              <div className="rn-modal__divider" style={{ margin: "28px 0" }} />
              <div className="rn-comments">
                <h3 className="rn-comments__title">💬 Comments ({comments.length})</h3>
                {reader ? (
                  <div className="rn-comment-form">
                    <div className="rn-comment-form__avatar">{reader.name?.charAt(0).toUpperCase()}</div>
                    <div className="rn-comment-form__right">
                      <textarea className="rn-comment-form__input" placeholder={`Comment as ${reader.name}...`} value={commentText} onChange={e => setCommentText(e.target.value)} rows={3} />
                      <div className="rn-comment-form__actions">
                        <span className="rn-comment-form__user">👤 {reader.name}</span>
                        <button className="rn-comment-form__btn" onClick={submitComment} disabled={!commentText.trim()}>Post Comment</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rn-comment-login-prompt">
                    <p>You must be signed in to comment.</p>
                    <div className="rn-comment-login-prompt__btns">
                      <button className="rn-cta-btn rn-cta-btn--outline" onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}>Sign In</button>
                      <button className="rn-cta-btn rn-cta-btn--fill"    onClick={() => { setAuthMode("signup"); setShowAuthModal(true); }}>Sign Up</button>
                    </div>
                  </div>
                )}
                <div className="rn-comments__list">
                  {commentLoad ? (
                    <div className="rn-comments__loading">Loading comments...</div>
                  ) : comments.length === 0 ? (
                    <div className="rn-comments__empty">No comments yet. Be the first to comment!</div>
                  ) : (
                    comments.map(c => (
                      <div key={c.id} className="rn-comment">
                        <div className="rn-comment__avatar">{c.reader?.name?.charAt(0).toUpperCase() || "?"}</div>
                        <div className="rn-comment__content">
                          <div className="rn-comment__header">
                            <span className="rn-comment__name">{c.reader?.name || "Reader"}</span>
                            <span className="rn-comment__time">{fmtDate(c.commentedAt)}</span>
                          </div>
                          <p className="rn-comment__text">{c.comment}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL ─────────────────────────────────── */}
      {showAuthModal && (
        <div className="rn-modal-overlay rn-auth-overlay" onClick={() => { setShowAuthModal(false); setAuthError(""); }}>
          <div className="rn-auth-modal" onClick={e => e.stopPropagation()}>
            <button className="rn-modal__close" onClick={() => { setShowAuthModal(false); setAuthError(""); }}>✕</button>
            <div className="rn-auth__tabs">
              <button className={`rn-auth__tab ${authMode === "login"  ? "rn-auth__tab--active" : ""}`} onClick={() => { setAuthMode("login");  setAuthError(""); }}>Sign In</button>
              <button className={`rn-auth__tab ${authMode === "signup" ? "rn-auth__tab--active" : ""}`} onClick={() => { setAuthMode("signup"); setAuthError(""); }}>Sign Up</button>
            </div>
            <div className="rn-auth__body">
              <h2 className="rn-auth__title">{authMode === "login" ? "👋 Welcome back!" : "🎉 Create account"}</h2>
              <p className="rn-auth__sub">{authMode === "login" ? "Sign in to leave comments on articles." : "Join us to comment and engage with news."}</p>
              {authError && <div className="rn-auth__error">{authError}</div>}
              <div className="rn-auth__form">
                {authMode === "signup" && (
                  <div className="rn-auth__field">
                    <label>Full Name</label>
                    <input type="text" placeholder="Your name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} />
                  </div>
                )}
                <div className="rn-auth__field">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} />
                </div>
                <div className="rn-auth__field">
                  <label>Password</label>
                  <input type="password" placeholder="••••••••" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} />
                </div>
                <button className="rn-auth__submit" onClick={authMode === "login" ? handleLogin : handleSignup} disabled={authLoading}>
                  {authLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"}
                </button>
              </div>
              <p className="rn-auth__switch">
                {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
                <span onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }}>
                  {authMode === "login" ? "Sign Up" : "Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}