import './App.css';

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartModal from './components/CartModal.jsx';
import "./App.css";

// Main App component for the Fake Store Cart
function App() {
  // State for products, cart, modal visibility, and alert
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [showCartModal, setShowCartModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from Fake Store API on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products. Please check your connection or try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Add product to cart, show alert if already in cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    setMessage("Successfully added to cart");
    setTimeout(() => setMessage(""), 1500);
    closeModal();
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      {/* Navbar/Header with cart count and cart button */}
      <Header cartCount={cart.length} onCartClick={() => setShowCartModal(true)} />

      {error && (
        <div style={{ color: 'red', textAlign: 'center', margin: '16px' }}>{error}</div>
      )}

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

      <h1 className="title">Fake Store Shopping App</h1>

      {loading ? (
        <p className="message">Loading products....</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closeModal={closeModal}
          addToCart={addToCart}
          cart={cart}
        />
      )}

      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;
