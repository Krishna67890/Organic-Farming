import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaLeaf, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { useCart } from '../../../context/CartContext'
import './Header.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartItemsCount } = useCart() // Changed from getCartCount to getCartItemsCount
  const location = useLocation()

  const navigation = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/farming', label: 'Farming' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <FaLeaf className="logo-icon" />
            <span className="logo-text">Organic Farm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="cart-icon" />
              {getCartItemsCount() > 0 && ( // Changed to getCartItemsCount
                <span className="cart-count">{getCartItemsCount()}</span> // Changed to getCartItemsCount
              )}
            </Link>
            
            <Link to="/auth" className="auth-link">
              <FaUser />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header