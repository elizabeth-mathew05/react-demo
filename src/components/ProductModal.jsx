import React from 'react';

const fallbackImg = "https://placehold.co/180x180?text=No+Image";

const ProductModal = ({ product, closeModal, addToCart, cart }) => {
    if (!product) return null;
    // Find a valid image URL or use fallback
    let imgSrc = fallbackImg;
    if (product.images && Array.isArray(product.images)) {
        // Find the first non-empty, non-null string
        const validImg = product.images.find(url => typeof url === 'string' && url.trim() && url !== '');
        if (validImg) imgSrc = validImg;
    }
    const inCart = cart.some(item => item.id === product.id);
    return (
        <div className="modal modal-enhanced">
            <button className="close-btn modal-close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-card">
                <div className="modal-image-wrapper">
                    <img className="modal-image" src={imgSrc} alt={product.title} onError={e => e.target.src = fallbackImg} />
                </div>
                <h2 className="modal-title">{product.title}</h2>
                <p className="modal-description">{product.description}</p>
                <p className="modal-price">${product.price}</p>
                <button
                    className={`add-btn modal-add-btn${inCart ? ' in-cart' : ''}`}
                    onClick={() => addToCart(product)}
                    disabled={inCart}
                >
                    {inCart ? 'In Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductModal;