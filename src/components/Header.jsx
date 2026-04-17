import React from 'react'


function Header({ cartCount, onCartClick }) {
    return (
        <header className="header">
            <h2>My Store</h2>
            <div className='cart-box' onClick={onCartClick} style={{ cursor: 'pointer' }}>
                Cart: {cartCount}
            </div>
        </header>
    )
}

export default Header