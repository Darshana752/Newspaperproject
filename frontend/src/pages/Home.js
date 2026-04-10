import React, { useState, useEffect, useRef } from 'react';
import Navigationbar from '../component/Navigationbar';
import './Home.css';

/* ─── SLIDE DATA ─────────────────────────────────────────── */
const SLIDES = [
  {
    id: 'politics',
    category: 'Politics',
    icon: '🏛️',
    headline: 'Shaping the Nation',
    sub: 'Stay informed on Sri Lankan and global political developments, elections, and policy changes.',
    color: '#c0392b',
    accent: '#ff6b5b',
    images: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1600&q=80',
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80',
      'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=1600&q=80',
    ],
  },
  {
    id: 'war',
    category: 'War & Conflict',
    icon: '⚔️',
    headline: 'Front Line Reports',
    sub: 'Unfiltered ground reporting on global conflicts, peacekeeping missions, and humanitarian impact.',
    color: '#7f4f24',
    accent: '#e9c46a',
    images: [
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1600&q=80',
      'https://images.unsplash.com/photo-1553969546-6f7388a7e07a?w=1600&q=80',
      'https://images.unsplash.com/photo-1600456899121-68eda5f57567?w=1600&q=80',
    ],
  },
  {
    id: 'business',
    category: 'Business & Economy',
    icon: '📈',
    headline: 'Markets & Growth',
    sub: 'Breaking financial news, stock movements, trade policy, and the forces driving the global economy.',
    color: '#1a5276',
    accent: '#5dade2',
    images: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1600&q=80',
    ],
  },
  {
    id: 'sports',
    category: 'Sports',
    icon: '🏆',
    headline: 'Champion Moments',
    sub: 'Live scores, match previews, athlete spotlights, and the passion behind every game.',
    color: '#145a32',
    accent: '#2ecc71',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&q=80',
      'https://images.unsplash.com/photo-1540747913346-19212a4b423b?w=1600&q=80',
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1600&q=80',
    ],
  },
];

/* ─── TICKER ITEMS ───────────────────────────────────────── */
const TICKER = [
  '🔴 BREAKING NEWS',
  '⚽ SPORTS',
  '🏛️ POLITICS',
  '🌍 WORLD',
  '📈 BUSSINESS',
  '🏆 WORLD CUP',
 // '⚔️ Ceasefire negotiations continue in Eastern region',
 // '🇱🇰 Sri Lanka tourism up 32% year-on-year',
];

/* ─── CATEGORY NAV ITEMS ─────────────────────────────────── */
const CATEGORIES = [
  { label: 'Local', icon: '📍', color: '#f0a500' },
  { label: 'Foreign', icon: '🌍', color: '#3b82f6' },
  { label: 'Politics', icon: '🏛️', color: '#c0392b' },
  { label: 'War', icon: '⚔️', color: '#7f4f24' },
  { label: 'Business', icon: '📈', color: '#1a5276' },
  { label: 'Sports', icon: '🏆', color: '#145a32' },
];

export default function Home() {
  const [currentSlide, setCurrentSlide]  = useState(0);
  const [currentImg, setCurrentImg]      = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded]              = useState(false);
  const slideTimer   = useRef(null);
  const imgTimer     = useRef(null);

  const slide = SLIDES[currentSlide];

  /* Auto-advance images within a slide */
  useEffect(() => {
    imgTimer.current = setInterval(() => {
      setCurrentImg(i => (i + 1) % SLIDES[currentSlide].images.length);
    }, 3500);
    return () => clearInterval(imgTimer.current);
  }, [currentSlide]);

  /* Auto-advance slides */
  useEffect(() => {
    slideTimer.current = setInterval(() => {
      goToSlide((s) => (s + 1) % SLIDES.length);
    }, 11000);
    return () => clearInterval(slideTimer.current);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const goToSlide = (indexOrFn) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(indexOrFn);
      setCurrentImg(0);
      setTransitioning(false);
    }, 500);
  };

  const manualGo = (i) => {
    clearInterval(slideTimer.current);
    clearInterval(imgTimer.current);
    goToSlide(i);
    slideTimer.current = setInterval(() => goToSlide((s) => (s + 1) % SLIDES.length), 11000);
  };

  return (
    <div className={`hm-root ${loaded ? 'hm-root--loaded' : ''}`}>
      <Navigationbar />

      {/* ── BREAKING NEWS TICKER ─────────────────────────── */}
      <div className="hm-ticker">
        <div className="hm-ticker__label">LIVE</div>
        <div className="hm-ticker__track">
          <div className="hm-ticker__inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="hm-ticker__item">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HERO SLIDER ──────────────────────────────────── */}
      <section className="hm-hero">
        {/* Background image layers */}
        <div className="hm-hero__bg-wrap">
          {SLIDES.map((s, si) =>
            s.images.map((img, ii) => (
              <div
                key={`${si}-${ii}`}
                className={`hm-hero__bg-layer ${
                  si === currentSlide && ii === currentImg && !transitioning
                    ? 'hm-hero__bg-layer--active'
                    : ''
                }`}
                style={{ backgroundImage: `url(${img})` }}
              />
            ))
          )}
          {/* Color tint overlay */}
          <div
            className="hm-hero__tint"
            style={{ background: `linear-gradient(135deg, ${slide.color}cc 0%, ${slide.color}44 40%, transparent 70%)` }}
          />
          {/* Dark gradient */}
          <div className="hm-hero__gradient" />
        </div>

        {/* Noise grain texture */}
        <div className="hm-hero__grain" />

        {/* Content */}
        <div className={`hm-hero__content ${transitioning ? 'hm-hero__content--out' : 'hm-hero__content--in'}`}>
          {/* Category badge */}
          <div className="hm-hero__badge" style={{ background: slide.accent + '22', borderColor: slide.accent + '55', color: slide.accent }}>
            <span>{slide.icon}</span>
            <span>{slide.category}</span>
          </div>

          {/* Main headline */}
          <h1 className="hm-hero__title">
            <span className="hm-hero__title-serendib">SERENDIB</span>
            <span className="hm-hero__title-news" style={{ color: slide.accent }}>NEWS</span>
          </h1>

          <h2 className="hm-hero__headline">{slide.headline}</h2>
          <p className="hm-hero__sub">{slide.sub}</p>

          <div className="hm-hero__actions">
            <a href="/Readingnews" className="hm-btn hm-btn--primary" style={{ background: slide.accent, color: '#07090f' }}>
              Read Latest →
            </a>
            <a href="/Readingnews" className="hm-btn hm-btn--ghost">
              Explore All
            </a>
          </div>

          {/* Image thumbnails */}
          <div className="hm-hero__thumbs">
            {slide.images.map((img, i) => (
              <div
                key={i}
                className={`hm-hero__thumb ${i === currentImg ? 'hm-hero__thumb--active' : ''}`}
                style={{ backgroundImage: `url(${img})`, borderColor: i === currentImg ? slide.accent : 'transparent' }}
              />
            ))}
          </div>
        </div>

        {/* Slide selector tabs */}
        <div className="hm-hero__tabs">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`hm-hero__tab ${i === currentSlide ? 'hm-hero__tab--active' : ''}`}
              style={i === currentSlide ? { '--tab-accent': s.accent, borderColor: s.accent, color: s.accent } : {}}
              onClick={() => manualGo(i)}
            >
              <span className="hm-hero__tab-icon">{s.icon}</span>
              <span className="hm-hero__tab-label">{s.category}</span>
              {i === currentSlide && (
                <div className="hm-hero__tab-progress" style={{ background: s.accent }} key={currentSlide} />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── ABOUT SECTION ────────────────────────────────── */}
      <section className="hm-about">
        <div className="hm-about__inner">
          {/* Left: masthead */}
          <div className="hm-about__left">
            <div className="hm-about__logo-block">
              <div className="hm-about__logo-icon">🇱🇰</div>
              <div>
                <div className="hm-about__logo-name">Serendib News</div>
                <div className="hm-about__logo-tag">Sri Lanka's Digital Voice</div>
              </div>
            </div>
            <p className="hm-about__desc">
              Your trusted digital news platform delivering the latest and most accurate information from Sri Lanka and around the world — fast, reliable, and well-structured in a modern environment.
            </p>
            <div className="hm-about__stats">
              {[{ n: '50K+', l: 'Daily Readers' }, { n: '24/7', l: 'Live Coverage' }, { n: '3', l: 'News Categories' }].map(s => (
                <div key={s.l} className="hm-about__stat">
                  <span className="hm-about__stat-n">{s.n}</span>
                  <span className="hm-about__stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: category cards */}
          <div className="hm-about__right">
            <div className="hm-about__cards">
              {[
                { icon: '📍', title: 'Local News', desc: 'Events, politics, and updates from across Sri Lanka', color: '#f0a500' },
                { icon: '🌍', title: 'Foreign News', desc: 'Global stories and international developments', color: '#3b82f6' },
                { icon: '🏆', title: 'Sports News', desc: 'Local and international sports updates & scores', color: '#22c55e' },
              ].map((c, i) => (
                <div key={c.title} className="hm-about__card" style={{ '--card-c': c.color, animationDelay: `${i * 0.15}s` }}>
                  <div className="hm-about__card-icon" style={{ background: c.color + '22', color: c.color }}>{c.icon}</div>
                  <div>
                    <div className="hm-about__card-title" style={{ color: c.color }}>{c.title}</div>
                    <div className="hm-about__card-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="hm-about__features">
              {[
                { icon: '👁️', text: 'Free access for all readers — no paywall' },
                { icon: '💬', text: 'Comment & engage after signing in' },
                { icon: '✍️', text: 'Powerful tools for journalists to publish & manage articles' },
              ].map((f, i) => (
                <div key={i} className="hm-about__feature">
                  <span className="hm-about__feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY STRIP ───────────────────────────────── */}
      <div className="hm-catstrip">
        <div className="hm-catstrip__inner">
          <span className="hm-catstrip__label">Browse by category</span>
          <div className="hm-catstrip__items">
            {CATEGORIES.map((c, i) => (
              <a key={c.label} href="/news" className="hm-catstrip__item" style={{ '--ci': c.color, animationDelay: `${i * 0.07}s` }}>
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="hm-footer">
        <p>© 2025 Serendib News · Sri Lanka's Digital Voice · All rights reserved</p>
      </footer>
    </div>
  );
}