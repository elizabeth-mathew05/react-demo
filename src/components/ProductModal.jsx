import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, closeModal, addToCart, cart }) => {
    const cartItem = cart.find(item => item.id === product.id);
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        setQuantity(cartItem ? cartItem.quantity : 1);
    }, [cartItem, product]);

    if (!product) return null;
    const inCart = !!cartItem;

    const fallbackImg = "https://placehold.co/180x180?text=No+Image";
    const imgSrc =
        Array.isArray(product.images) && product.images.length && typeof product.images[0] === 'string'
            ? product.images[0]
            : (product.image && typeof product.image === 'string' && product.image.trim() !== ''
                ? product.image
                : fallbackImg);

    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));
    const handleIncrement = () => setQuantity(q => q + 1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        if (inCart) {
            setSuccessMsg('Cart updated successfully!');
            setTimeout(() => {
                setSuccessMsg("");
                closeModal();
            }, 1200);
        } else {
            closeModal();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-horizontal" style={{ position: 'relative' }}>
                {/* Close icon in top-right */}
                <button
                    className="modal-close-btn"
                    onClick={closeModal}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="modal-horizontal-image">
                    <img src={imgSrc} alt={product.title} onError={e => { e.target.onerror = null; e.target.src = fallbackImg; }} />
                </div>
                <div className="modal-horizontal-details">
                    <h2>{product.title}</h2>
                    <div className="modal-horizontal-meta">
                        <div>Price: ₹{product.price}</div>
                        {/* Add more details here if needed */}
                    </div>
                    <div className="modal-horizontal-description" style={{ fontSize: '0.95rem', color: '#444', marginBottom: 18 }}>
                        {product.description}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                        <span style={{ fontWeight: 500 }}>Quantity:</span>
                        <button onClick={handleDecrement} style={{ padding: '2px 10px', fontSize: 18, borderRadius: 4, border: '1px solid #ccc', background: '#f8f8f8', cursor: 'pointer' }}>-</button>
                        <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
                        <button onClick={handleIncrement} style={{ padding: '2px 10px', fontSize: 18, borderRadius: 4, border: '1px solid #ccc', background: '#f8f8f8', cursor: 'pointer' }}>+</button>
                    </div>
                    <div className="modal-horizontal-actions">
                        <button
                            className="add-btn"
                            onClick={handleAddToCart}
                        >
                            {inCart ? 'Update Cart' : 'Add to Cart'}
                        </button>
                    </div>
                    {successMsg && (
                        <div style={{
                            position: 'fixed',
                            top: 24,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#43a047',
                            color: '#fff',
                            borderRadius: 8,
                            padding: '12px 32px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: '0 4px 16px rgba(67,160,71,0.18)',
                            zIndex: 9999,
                            textAlign: 'center',
                            letterSpacing: 0.2
                        }}>
                            {successMsg}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductModal;