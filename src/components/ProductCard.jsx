import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
  const bgColor = colors[product.id % colors.length]
  const firstLetter = product.title?.charAt(0).toUpperCase() || '?'
  const imageUrl = product.images?.[0] || product.category?.image || null

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: 'pointer' }}>
      {!imageError && imageUrl ? (
        <img
          src={imageUrl}
          alt={product.title}
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: bgColor,
            borderRadius: '8px 8px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {firstLetter}
        </div>
      )}

      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
    </div>
  )
}

export default ProductCard
