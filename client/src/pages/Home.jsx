// pages/Home.jsx - hero, category-wise swipeable featured strips, Meet ZEN, Why ZENTRO
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, ShieldCheck, Search, BadgeCheck } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, selectProducts, selectProductStatus } from '../store/slices/productSlice';
import { openZenPanel, setActiveOperation } from '../store/slices/aiSlice';
import { CATEGORIES } from './Shop';

const FEATURED_CATEGORIES = CATEGORIES.filter(Boolean);
const PREVIEW_PER_CATEGORY = 4;

const WHY_ZENTRO = [
  { icon: Search, title: 'Smart Discovery', text: 'Describe what you need in plain language and ZEN finds it.' },
  { icon: BadgeCheck, title: 'Curated Technology', text: 'A focused catalog of real, comparable technology products.' },
  { icon: ShieldCheck, title: 'Transparent Product Information', text: 'Clear specifications and honest stock information, always.' },
  { icon: Sparkles, title: 'AI-Assisted Shopping', text: 'Compare, ask questions, and get recommendations from ZEN.' },
];

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);

  useEffect(() => {
    dispatch(fetchProducts({ sort: 'rating' }));
  }, [dispatch]);

  function handleAskZen() {
    dispatch(setActiveOperation('search'));
    dispatch(openZenPanel());
  }

  function byCategory(cat) {
    return products.filter((p) => p.category === cat).slice(0, PREVIEW_PER_CATEGORY);
  }

  return (
    <div className="home-page">
      {/* Hero — compact two-column banner, smaller type/buttons on mobile */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Thoughtfully selected technology</p>
          <h1>Technology, <span className="highlight">centered on you.</span></h1>
          <p className="hero-subtext">
            A considered collection of technology, with a little help from ZEN.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary">Explore Products</Link>
            <button type="button" className="btn btn-outline" onClick={handleAskZen}>Ask ZEN</button>
          </div>
        </div>

        <div className="hero-media">
          <img
            src="/images/hero.png"
            alt="Featured technology"
            className="hero-image"
            loading="eager"
            decoding="async"
          />
          <span className="hero-media-tag">Featured / 01</span>
        </div>
      </section>

      {/* Categories — small icons, horizontally scrollable on phones */}
      <section id="categories">
        <div className="section-heading">
          <h2>Categories</h2>
          <p>Browse the ZENTRO catalog by category.</p>
        </div>
        <div className="category-row">
          {FEATURED_CATEGORIES.map((c) => (
            <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="category-pill">{c}</Link>
          ))}
        </div>
      </section>

      {/* Category-wise featured strips — swipeable on mobile, grid on desktop */}
      <section>
        {FEATURED_CATEGORIES.map((cat) => {
          const items = byCategory(cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="category-strip">
              <div className="section-heading">
                <h2>{cat}</h2>
                <p>Top-rated picks in {cat}, curated for the ZENTRO catalog.</p>
              </div>
              <ProductGrid
                products={items}
                loading={false}
                variant="strip"
                viewAllTo={`/shop?category=${encodeURIComponent(cat)}`}
              />
            </div>
          );
        })}
      </section>

      {/* Meet ZEN */}
      <section className="meet-zen-section" id="ask-zen">
        <div className="meet-zen-icon"><Sparkles size={28} /></div>
        <h2>Meet ZEN</h2>
        <p>Your intelligent shopping assistant for finding, comparing and understanding technology.</p>
        <button type="button" className="btn btn-primary" onClick={handleAskZen}>Ask ZEN</button>
      </section>

      {/* Why ZENTRO */}
      <section>
        <div className="section-heading">
          <h2>Why ZENTRO</h2>
        </div>
        <div className="why-grid why-grid--scroll">
          {WHY_ZENTRO.map(({ icon: Icon, title, text }) => (
            <div className="why-card card" key={title}>
              <Icon size={22} />
              <h3>{title}</h3>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}