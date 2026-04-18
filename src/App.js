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

  // Add to cart handler with quantity
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        // If already in cart, update the quantity to the new selected value
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity }
            : item
        );
      }
      // Add new product with selected quantity
      return [...prevCart, { ...product, quantity }];
    });
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


      <h1 className="title">Fake Store Shopping App</h1>

      {loading ? (
        <p className="message">Loading products....</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{...product, price: Math.round(product.price * 85)}} 
              openModal={openModal} 
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closeModal={closeModal}
          addToCart={handleAddToCart}
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
