// pages/Shop.jsx - browse/search/filter/sort all products
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SlidersHorizontal, X } from 'lucide-react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import { fetchProducts, selectProducts, selectProductStatus } from '../store/slices/productSlice';

export const CATEGORIES = [
  '', 'Smartphones', 'Laptops', 'Tablets', 'Smartwatches',
   'Cameras', 'Smart Home', 'Networking', 'Storage', 'Accessories',
];

export default function Shop() {
  // useSearchParams keeps filters in the URL, so the page is shareable/bookmarkable
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductStatus);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // AI product comparison state - pick 2-3 products, then ask the AI to compare
  const [selectedIds, setSelectedIds] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [comparing, setComparing] = useState(false);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort) params.sort = sort;
    dispatch(fetchProducts(params));
  }, [search, category, minPrice, maxPrice, sort, dispatch]);

  // helper: update one query param without wiping out the others
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams({});
  }

  // toggle a product in/out of the comparison selection (max 3)
  function toggleSelect(id) {
    setComparison(null); // clear old results once the selection changes
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  async function handleCompare() {
    setComparing(true);
    try {
      const { data } = await api.post('/ai/compare', { productIds: selectedIds });
      setComparison(data);
    } catch {
      alert('Could not compare products right now');
    } finally {
      setComparing(false);
    }
  }

  const hasActiveFilters = Boolean(search || category || minPrice || maxPrice || sort);

  const filterControls = (
    <>
      <SearchBar initialValue={search} onSearch={(q) => updateParam('search', q)} />

      <select value={category} onChange={(e) => updateParam('category', e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c || 'All Categories'}</option>
        ))}
      </select>

      <div className="price-filter">
        <input
          type="number" placeholder="Min PKR" value={minPrice} min="0"
          onChange={(e) => updateParam('minPrice', e.target.value)}
        />
        <input
          type="number" placeholder="Max PKR" value={maxPrice} min="0"
          onChange={(e) => updateParam('maxPrice', e.target.value)}
        />
      </div>

      <select value={sort} onChange={(e) => updateParam('sort', e.target.value)}>
        <option value="">Newest</option>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>

      {hasActiveFilters && (
        <button type="button" className="btn btn-text" onClick={clearFilters}>Clear filters</button>
      )}
    </>
  );

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Shop</h1>
        <button type="button" className="btn btn-secondary shop-filter-toggle" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="shop-filters">{filterControls}</div>

      {filtersOpen && (
        <div className="filters-drawer-overlay" onClick={() => setFiltersOpen(false)}>
          <div className="filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filters-drawer-header">
              <h3>Filters</h3>
              <button type="button" className="icon-btn" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={18} />
              </button>
            </div>
            <div className="filters-drawer-body">{filterControls}</div>
            <button type="button" className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
              Show Results
            </button>
          </div>
        </div>
      )}

      {/* AI Product Comparison - pick 2 or 3 products below, then compare */}
      <div className="compare-bar">
        <p>Select 2-3 products below to compare with ZEN ({selectedIds.length}/3 selected)</p>
        <button
          type="button"
          className="btn btn-primary"
          disabled={selectedIds.length < 2 || comparing}
          onClick={handleCompare}
        >
          {comparing ? 'Comparing...' : 'Compare Selected'}
        </button>
      </div>

      {comparison && (
        <div className="ai-results comparison-result card">
          <p><strong>Best overall:</strong> {comparison.comparison.bestOverall}</p>
          <p><strong>Best budget:</strong> {comparison.comparison.bestBudget}</p>
          <p><strong>Best performance:</strong> {comparison.comparison.bestPerformance}</p>
          <p>{comparison.comparison.reason}</p>
        </div>
      )}

      {status === 'loading' && products.length === 0 ? (
        <ProductGrid products={[]} loading />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try a different search term or clear your filters.</p>
          {hasActiveFilters && <button type="button" className="btn btn-primary" onClick={clearFilters}>Clear filters</button>}
        </div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className={selectedIds.includes(p._id) ? 'compare-wrapper selected' : 'compare-wrapper'}>
              <label className="compare-checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p._id)}
                  onChange={() => toggleSelect(p._id)}
                />
                Compare
              </label>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
