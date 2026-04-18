import React from 'react'

const ProductCard = ({ product, openModal }) => (
    <div className="product-card" onClick={() => openModal(product)}>
        <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.title} style={{ width: '100px', height: '100px' }} />
        <h3>{product.title}</h3>
           <p>₹{product.price}</p>
    </div>
);

export default ProductCard