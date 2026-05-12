import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const pathname = location.pathname;
  const productPathMatch = pathname.match(/^\/product\/(\d+)$/);
  const directProductId = productPathMatch ? Number(productPathMatch[1]) : null;

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
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

  function addToCart(product, quantity = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: existing.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  }

  return (
    <div className='app'>
      <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      {directProductId ? (
        <ProductDetail
          products={products}
          addToCart={addToCart}
          cart={cart}
          productId={directProductId}
        />
      ) : (
        <Routes>
          {/* Home - Products List */}
          <Route
            path="/"
            element={
              <>
                <h1 className='title'>Fake Store Shopping App</h1>
                {loading ? (<p className='message'>Loading products....</p>) : (
                  <div className='product-grid'>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            }
          />

          {/* Product Detail Page */}
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                products={products}
                addToCart={addToCart}
                cart={cart}
              />
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  )
}

export default App
