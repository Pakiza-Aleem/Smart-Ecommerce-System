// components/ZenWidget.jsx - the ZEN floating assistant button + panel.
// Compact by design: a small floating trigger, and a panel with a short menu
// of AI operations. All Gemini calls happen on the server (see aiSlice).
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Bot, X, Search, Wallet, GitCompareArrows, MessageCircleQuestion, Sparkles, ArrowLeft } from 'lucide-react';
import {
  openZenPanel,
  closeZenPanel,
  setActiveOperation,
  runSmartShopping,
  runRecommendations,
  runProductQuestion,
  selectZenPanelOpen,
  selectZenActiveOperation,
  selectZenLoading,
  selectZenResult,
} from '../store/slices/aiSlice';
import { selectCartItems } from '../store/slices/cartSlice';
import { formatPKR } from '../utils/format';

const OPTIONS = [
  { id: 'search', label: 'Search Products', icon: Search },
  { id: 'budget', label: 'Find by Budget', icon: Wallet },
  { id: 'compare', label: 'Compare Products', icon: GitCompareArrows },
  { id: 'question', label: 'Ask About a Product', icon: MessageCircleQuestion },
  { id: 'recommendations', label: 'Get Recommendations', icon: Sparkles },
];

// Hide ZEN on auth pages, per spec section 9
const HIDDEN_ON = ['/login', '/register'];

export default function ZenWidget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isOpen = useSelector(selectZenPanelOpen);
  const operation = useSelector(selectZenActiveOperation);
  const loading = useSelector(selectZenLoading);
  const result = useSelector(selectZenResult);
  const cartItems = useSelector(selectCartItems);

  const [query, setQuery] = useState('');
  const [productId, setProductId] = useState('');
  const [question, setQuestion] = useState('');

  const productMatch = location.pathname.match(/^\/product\/([a-zA-Z0-9]+)/);
  const currentProductId = productMatch ? productMatch[1] : null;

  useEffect(() => {
    if (currentProductId) setProductId(currentProductId);
  }, [currentProductId]);

  if (HIDDEN_ON.includes(location.pathname)) return null;

  function handleToggle() {
    if (isOpen) dispatch(closeZenPanel());
    else dispatch(openZenPanel());
  }

  function handleBack() {
    dispatch(setActiveOperation(null));
    setQuery('');
    setQuestion('');
  }

  function selectOperation(id) {
    dispatch(setActiveOperation(id));
    if (id === 'recommendations') {
      const context = cartItems.length
        ? `Customer's cart currently contains: ${cartItems.map((i) => i.product.name).join(', ')}.`
        : '';
      dispatch(runRecommendations(context));
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(runSmartShopping(query));
  }

  function handleQuestionSubmit(e) {
    e.preventDefault();
    if (!productId || !question.trim()) return;
    dispatch(runProductQuestion({ productId, question }));
  }

  function goToProduct(id) {
    dispatch(closeZenPanel());
    navigate(`/product/${id}`);
  }

  return (
    <>
      <button
        type="button"
        className="zen-fab"
        onClick={handleToggle}
        aria-label={isOpen ? 'Close ZEN assistant' : 'Open ZEN assistant'}
        aria-expanded={isOpen}
      >
        <Bot size={22} />
        <span>ZEN</span>
      </button>

      {isOpen && (
        <div className="zen-panel" role="dialog" aria-label="ZEN assistant">
          <div className="zen-panel-header">
            {operation ? (
              <button type="button" className="icon-btn zen-back" onClick={handleBack} aria-label="Back">
                <ArrowLeft size={16} />
              </button>
            ) : (
              <div className="zen-panel-title">
                <Bot size={18} />
                <div>
                  <h3>ZEN</h3>
                  <p className="muted">Your intelligent shopping assistant</p>
                </div>
              </div>
            )}
            <button type="button" className="icon-btn" onClick={() => dispatch(closeZenPanel())} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="zen-panel-body">
            {!operation && (
              <div className="zen-options">
                {OPTIONS.map(({ id, label, icon: Icon }) => (
                  <button key={id} type="button" className="zen-option" onClick={() => selectOperation(id)}>
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}

            {(operation === 'search' || operation === 'budget') && (
              <div className="zen-op">
                <p className="zen-op-title">{operation === 'search' ? 'Search Products' : 'Find by Budget'}</p>
                <form onSubmit={handleSearchSubmit} className="zen-form">
                  <input
                    type="text"
                    placeholder={
                      operation === 'budget'
                        ? 'e.g. a laptop under PKR 200,000 with 16GB RAM'
                        : 'e.g. wireless headphones'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Thinking...' : 'Ask ZEN'}
                  </button>
                </form>
                {result?.explanation && <p className="zen-answer">{result.explanation}</p>}
                {Array.isArray(result?.products) && result.products.length > 0 && (
                  <div className="zen-result-list">
                    {result.products.slice(0, 6).map((p) => (
                      <button key={p._id} type="button" className="zen-result-item" onClick={() => goToProduct(p._id)}>
                        <span>{p.name}</span>
                        <span>{formatPKR(p.price)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {operation === 'compare' && (
              <div className="zen-op">
                <p className="zen-op-title">Compare Products</p>
                <p className="muted">
                  Select 2 or 3 products on the Shop page using the Compare checkbox, then tap
                  &quot;Compare Selected&quot; there for a full AI comparison.
                </p>
                <Link to="/shop" className="btn btn-primary" onClick={() => dispatch(closeZenPanel())}>
                  Go to Shop
                </Link>
              </div>
            )}

            {operation === 'question' && (
              <div className="zen-op">
                <p className="zen-op-title">Ask About a Product</p>
                {!productId ? (
                  <p className="muted">Open a product page first, then come back and ask ZEN about it.</p>
                ) : (
                  <form onSubmit={handleQuestionSubmit} className="zen-form">
                    <input
                      type="text"
                      placeholder="Is this good for gaming?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Thinking...' : 'Ask'}
                    </button>
                  </form>
                )}
                {result?.answer && <p className="zen-answer">{result.answer}</p>}
              </div>
            )}

            {operation === 'recommendations' && (
              <div className="zen-op">
                <p className="zen-op-title">Recommendations</p>
                {loading && <p className="muted">Thinking of a few options...</p>}
                {result?.reason && <p className="zen-answer">{result.reason}</p>}
                {Array.isArray(result?.products) && (
                  <div className="zen-result-list">
                    {result.products.map((p) => (
                      <button key={p._id} type="button" className="zen-result-item" onClick={() => goToProduct(p._id)}>
                        <span>{p.name}</span>
                        <span>{formatPKR(p.price)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
