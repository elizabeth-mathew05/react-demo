import React from 'react'
import { Link } from 'react-router-dom'


function Header({ cartCount }) {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{ cursor: 'pointer', margin: 0 }}>My Store</h2>
      </Link>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className='cart-box' style={{ cursor: 'pointer' }}>
          Cart: {cartCount}
        </div>
      </Link>
    </header>
  )
}

export default Header