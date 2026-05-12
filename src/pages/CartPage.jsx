import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 40,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontSize: '24px', marginBottom: 8, color: '#333' }}>Your Cart is Empty</h2>
        <p style={{ color: '#666', marginBottom: 24 }}>
          Start shopping to add items to your cart
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 32px',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: 20
    }}>
      <h1 style={{ fontSize: '28px', marginBottom: 24, color: '#333' }}>Shopping Cart</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: 24
      }}>
        {/* Cart Items */}
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: 16,
                padding: 16,
                background: '#fff',
                borderRadius: 8,
                marginBottom: 12,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                alignItems: 'center'
              }}
            >
              {/* Item Image */}
              <div style={{
                width: 80,
                height: 80,
                background: '#f5f5f5',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img
                  src={(Array.isArray(item.images) && item.images[0]) ? item.images[0] : 'https://placehold.co/80x80?text=No+Image'}
                  alt={item.title}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* Item Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                  {item.title.substring(0, 50)}...
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  ₹{item.price} each
                </p>
              </div>

              {/* Quantity Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginRight: 16
              }}>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  style={{
                    padding: '4px 8px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  style={{
                    padding: '4px 8px',
                    background: '#f0f0f0',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div style={{
                minWidth: 80,
                textAlign: 'right',
                marginRight: 16
              }}>
                <div style={{ fontWeight: 600, color: '#333' }}>
                  ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '6px 12px',
                  background: '#ff5252',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{
          background: '#fff',
          borderRadius: 8,
          padding: 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          height: 'fit-content'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: 20, color: '#333' }}>
            Order Summary
          </h2>

          <div style={{ marginBottom: 16 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 12,
              color: '#666'
            }}>
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 12,
              color: '#666'
            }}>
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div style={{
              borderTop: '1px solid #eee',
              paddingTop: 12,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 12
            }}
          >
            Checkout
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: 6,
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
