// components/CartItem.jsx - one row in the Cart page
import { Trash2, Minus, Plus } from 'lucide-react';
import { formatPKR } from '../utils/format';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h4>{product.name}</h4>
        <p className="muted">{product.brand}</p>
        <p className="product-price">{formatPKR(product.price)}</p>
      </div>
      <div className="cart-item-qty">
        <button
          type="button"
          className="icon-btn"
          aria-label="Decrease quantity"
          onClick={() => onUpdateQuantity(product._id, Math.max(1, quantity - 1))}
        >
          <Minus size={14} />
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          className="icon-btn"
          aria-label="Increase quantity"
          onClick={() => onUpdateQuantity(product._id, quantity + 1)}
        >
          <Plus size={14} />
        </button>
      </div>
      <p className="cart-item-total">{formatPKR(product.price * quantity)}</p>
      <button type="button" className="icon-btn" aria-label="Remove item" onClick={() => onRemove(product._id)}>
        <Trash2 size={16} />
      </button>
    </div>
  );
}
