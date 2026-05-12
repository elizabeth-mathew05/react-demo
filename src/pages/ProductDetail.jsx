import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

/**
 * Product Detail Page
 * Route: /product/:id
 * - Uses `products` prop when available (fast)
 * - Falls back to fetching `/products/:id` when navigating directly
 */
const ProductDetail = ({ products = [], addToCart, cart = [], productId }) => {
  const params = useParams()
  const id = productId ?? params.id
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    let mounted = true
    const pid = parseInt(id)

    // Try to find in provided products list first
    if (Array.isArray(products) && products.length > 0) {
      const found = products.find(p => p.id === pid)
      if (found) {
        setProduct(found)
        setLoading(false)
        return () => { mounted = false }
      }
    }

    // Fallback: fetch single product by id
    ;(async () => {
      try {
        const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${pid}`)
        if (!resp.ok) throw new Error('Product fetch failed')
        const data = await resp.json()
        if (mounted) setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()

    return () => { mounted = false }
  }, [id, products])

  const cartItem = cart.find(item => item.id === parseInt(id))

  if (loading) return <div className='message'>Loading product...</div>
  if (!product) return (
    <div className='message'>
      Product not found
      <br />
      <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}>Back to Products</button>
    </div>
  )

  const fallbackImg = 'https://placehold.co/600x400?text=No+Image'
  const imgSrc = Array.isArray(product.images) && product.images.length > 0 ? product.images[0]
    : (product.image || product.category?.image) || fallbackImg

  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1))
  const handleIncrement = () => setQuantity(q => q + 1)
  const handleAddToCart = () => { addToCart(product, quantity); setQuantity(1) }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 20 }}>
      <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontSize: 16, marginBottom: 20, fontWeight: 500 }}>← Back to Products</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start', background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: 8, padding: 20, minHeight: 400 }}>
          <img src={imgSrc} alt={product.title} onError={e => { e.target.onerror = null; e.target.src = fallbackImg }} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>

        <div>
          <h1 style={{ fontSize: 28, marginBottom: 16, color: '#333' }}>{product.title}</h1>

          {product.category && (
            <div style={{ display: 'inline-block', background: '#e3f2fd', color: '#1976d2', padding: '6px 12px', borderRadius: 4, marginBottom: 16, fontSize: 14, fontWeight: 500 }}>
              {typeof product.category === 'object' ? product.category.name : product.category}
            </div>
          )}

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>Price</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#1976d2' }}>₹{product.price}</div>
          </div>

          <div style={{ color: '#555', lineHeight: 1.6, marginBottom: 24, fontSize: 15 }}>{product.description}</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: 16, background: '#f9f9f9', borderRadius: 6 }}>
            <span style={{ fontWeight: 500, minWidth: 80 }}>Quantity:</span>
            <button onClick={handleDecrement} style={{ padding: '4px 12px', fontSize: 18, borderRadius: 4, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>−</button>
            <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 600, fontSize: 16 }}>{quantity}</span>
            <button onClick={handleIncrement} style={{ padding: '4px 12px', fontSize: 18, borderRadius: 4, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
          </div>

          <button onClick={handleAddToCart} style={{ width: '100%', padding: '14px 24px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>{cartItem ? 'Update Cart' : 'Add to Cart'}</button>

          {cartItem && (
            <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: 12, borderRadius: 6, fontSize: 14, textAlign: 'center' }}>✓ {cartItem.quantity} item{cartItem.quantity > 1 ? 's' : ''} in cart</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
