import React from 'react';

const fallbackImg = "https://placehold.co/180x180?text=No+Image";

const ProductModal = ({ product, closeModal, addToCart, cart }) => {
    if (!product) return null;
    const inCart = cart.some(item => item.id === product.id);
        // const fallbackImg = "https://via.placeholder.com/120x140?text=No+Image";
        // Prefer first image from images array, then product.image, then fallback
        const imgSrc =
            Array.isArray(product.images) && product.images.length && typeof product.images[0] === 'string'
                ? product.images[0]
                : (product.image && typeof product.image === 'string' && product.image.trim() !== ''
                    ? product.image
                    : fallbackImg);
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
                        <div>Price: ${product.price}</div>
                        {/* Add more details here if needed */}
                    </div>
                    <div className="modal-horizontal-description" style={{ fontSize: '0.95rem', color: '#444', marginBottom: 18 }}>
                        {product.description}
                    </div>
                    <div className="modal-horizontal-actions">
                        <button
                            className={`add-btn${inCart ? ' in-cart' : ''}`}
                            onClick={() => addToCart(product)}
                            disabled={inCart}
                        >
                            {inCart ? 'In Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;