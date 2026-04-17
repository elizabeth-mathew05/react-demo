import React from 'react';
import './CartModal.css';

function CartModal({ cart, onClose, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + Math.round(item.price * 85), 0);

  return (
    <div className='modal-backdrop'>
      <div className='cart-modal'>
        <button className='close-btn' onClick={onClose}>×</button>
        <h2 className='cart-title'>Cart</h2>
        {cart.length === 0 ? (
          <p className='cart-empty'>Your cart is empty.</p>
        ) : (
          <>
            <ul className='cart-list'>
              {cart.map((item) => {
                // Use the first valid image from item.images or fallback
                const fallbackImg = "https://placehold.co/60x60?text=No+Image";
                let imgSrc = fallbackImg;
                if (item.images && Array.isArray(item.images)) {
                  const validImg = item.images.find(url => typeof url === 'string' && url.trim() && url !== '');
                  if (validImg) imgSrc = validImg;
                }
                return (
                  <li key={item.id} className='cart-item'>
                    <img src={imgSrc} alt={item.title} className='cart-item-image' onError={e => e.target.src = fallbackImg} />
                    <span className='cart-item-title'>{item.title}</span>
                    <span className='cart-item-price'>{Math.round(item.price * 85)}</span>
                    <button className='cart-remove-btn' onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className='cart-total'>
              <span>Total:</span> <span className='cart-total-amount'>₹{total}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
