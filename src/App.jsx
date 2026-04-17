import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductModal from './components/ProductModal.jsx';
import CartModal from './components/CartModal.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Use a CORS proxy for development
        const response = await fetch('https://corsproxy.io/?https://api.escuelajs.co/api/v1/products');
        console.log('Status Code:', response.status); // Log the status code
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

  function openModal(product) {
    console.log('Opening modal for product:', product);
    setSelectedProduct(product);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  function addToCart(product) {
    setCart([...cart, product]);
    setMessage("Successfully added to cart");
    setTimeout(() => setMessage(""), 1500);
    closeModal();
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  return (
    <div className='app'>
      <Header cartCount={cart.length} onCartClick={() => setShowCartModal(true)} />

      {message && (
        <div style={{
          background: '#c8e6c9',
          color: '#256029',
          borderRadius: 6,
          padding: '8px 0',
          fontWeight: 500,
          textAlign: 'center',
          margin: '16px auto',
          maxWidth: 400,
          boxShadow: '0 2px 8px #a5d6a7',
        }}>{message}</div>
      )}

      <h1 className='title'>Fake Store Shopping App</h1>

      {loading ? (<p className='message'>Loading products....</p>) : (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeModal} addToCart={addToCart} cart={cart} />
      )}

      {showCartModal && (
        <CartModal cart={cart} onClose={() => setShowCartModal(false)} removeFromCart={removeFromCart} />
      )}
    </div>
  )
}

export default App
