// pages/Home.jsx - hero, categories, featured products, Meet ZEN, Why ZENTRO
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, ShieldCheck, Search, BadgeCheck } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts, selectProducts, selectProductStatus } from '../store/slices/productSlice';
import { openZenPanel, setActiveOperation } from '../store/slices/aiSlice';
import { CATEGORIES } from './Shop';

const FEATURED_CATEGORIES = CATEGORIES.filter(Boolean);

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

  const featured = products.slice(0, 8);

  function handleAskZen() {
    dispatch(setActiveOperation('search'));
    dispatch(openZenPanel());
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <p className="eyebrow">ZENTRO — AI-Powered Intelligent Shopping Platform</p>
        <h1>Technology that fits the way you live.</h1>
        <p className="hero-subtext">
          Browse a curated catalog of smartphones, laptops, audio and more, then let ZEN help you search,
          compare and understand every product before you buy.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-primary">Explore Products</Link>
          <button type="button" className="btn btn-outline" onClick={handleAskZen}>Ask ZEN</button>
        </div>
      </section>

      {/* Categories */}
      <section id="categories">
        <div className="section-heading">
          <h2>Featured Categories</h2>
          <p>Find technology by category, curated for the ZENTRO catalog.</p>
        </div>
        <div className="category-row">
          {FEATURED_CATEGORIES.map((c) => (
            <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="category-pill">{c}</Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section>
        <div className="section-heading">
          <h2>Featured Products</h2>
          <p>Top-rated picks from across the ZENTRO catalog.</p>
        </div>
        <ProductGrid products={featured} loading={status === 'loading' && featured.length === 0} />
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
        <div className="why-grid">
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
