import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  FaLeaf, 
  FaShoppingCart, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaSeedling,
  FaRecycle,
  FaHeart,
  FaPhone
} from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import SearchBar from '../SearchBar/SearchBar'
import './Navbar.css'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { getCartCount } = useCart()
  const { user, logout } = useAuth()
  const navbarRef = useRef(null)
  const dropdownTimerRef = useRef(null)

  // Simplified navigation data
  const navigation = [
    { 
      path: '/', 
      label: 'Home',
      type: 'link'
    },
    { 
      path: '/products', 
      label: 'Products',
      type: 'dropdown',
      dropdown: [
        { path: '/products?category=vegetables', label: 'Vegetables', icon: FaSeedling },
        { path: '/products?category=fruits', label: 'Fruits', icon: FaSeedling },
        { path: '/products?category=dairy', label: 'Dairy & Eggs', icon: FaRecycle },
        { path: '/products?category=meat', label: 'Meat & Poultry', icon: FaRecycle }
      ]
    },
    { 
      path: '/farming', 
      label: 'Our Farming',
      type: 'link'
    },
    { 
      path: '/about', 
      label: 'About',
      type: 'link'
    },
    { 
      path: '/contact', 
      label: 'Contact',
      type: 'link'
    }
  ]

  // Special offers
  const specialOffers = [
    { text: '🚚 Free shipping on orders over $50', path: '/shipping' },
    { text: '🌱 New seasonal vegetables available!', path: '/products?seasonal=summer' }
  ]

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }

  // Search handlers
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  // Dropdown handlers with delay
  const handleDropdownEnter = (index) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current)
    }
    setActiveDropdown(index)
  }

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 200)
  }

  // Auth handlers
  const handleAuthClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  const cartCount = getCartCount()

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <div className="announcement-content">
            <div className="announcement-slider">
              {specialOffers.map((offer, index) => (
                <Link 
                  key={index} 
                  to={offer.path}
                  className="announcement-item"
                >
                  {offer.text}
                </Link>
              ))}
            </div>
            <div className="announcement-actions">
              <a href="tel:+15551234567" className="phone-info">
                <FaPhone />
                <span>(555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <div className="container">
          <div className="navbar-content">
            {/* Logo */}
            <Link 
              to="/" 
              className="navbar-brand"
              onClick={closeMobileMenu}
            >
              <FaLeaf className="brand-icon" />
              <div className="brand-text">
                <span className="brand-primary">Green Valley</span>
                <span className="brand-secondary">Organic Farm</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="desktop-navigation">
              <ul className="nav-menu">
                {navigation.map((item, index) => (
                  <li 
                    key={index}
                    className={`nav-item ${activeDropdown === index ? 'active' : ''}`}
                    onMouseEnter={() => handleDropdownEnter(index)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.path}
                      className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      <span>{item.label}</span>
                      {item.type === 'dropdown' && (
                        <FaChevronDown className="dropdown-chevron" />
                      )}
                    </Link>

                    {/* Regular Dropdown */}
                    {item.type === 'dropdown' && item.dropdown && (
                      <div className="dropdown-menu">
                        {item.dropdown.map((dropdownItem, dropIndex) => {
                          const DropdownIcon = dropdownItem.icon
                          return (
                            <Link
                              key={dropIndex}
                              to={dropdownItem.path}
                              className="dropdown-item"
                              onClick={closeMobileMenu}
                            >
                              <DropdownIcon className="dropdown-icon" />
                              <span>{dropdownItem.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navbar Actions */}
            <div className="navbar-actions">
              {/* Search Button */}
              <button 
                className={`action-btn search-btn ${isSearchOpen ? 'active' : ''}`}
                onClick={toggleSearch}
                aria-label="Search"
              >
                <FaSearch />
              </button>

              {/* Cart with count */}
              <Link 
                to="/cart" 
                className="action-btn cart-btn"
                aria-label="Shopping Cart"
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="cart-count-badge">{cartCount}</span>
                )}
              </Link>

              {/* User Account */}
              <button 
                className="action-btn user-btn"
                onClick={handleAuthClick}
                aria-label="User Account"
              >
                <FaUser />
              </button>

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

          {/* Search Bar */}
          <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
            <SearchBar onClose={closeSearch} />
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-navigation ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-content">
              <ul className="mobile-nav-menu">
                {navigation.map((item, index) => (
                  <li key={index} className="mobile-nav-item">
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                    
                    {/* Mobile dropdown items */}
                    {item.type === 'dropdown' && item.dropdown && (
                      <div className="mobile-dropdown">
                        {item.dropdown.map((dropdownItem, dropIndex) => {
                          const DropdownIcon = dropdownItem.icon
                          return (
                            <Link
                              key={dropIndex}
                              to={dropdownItem.path}
                              className="mobile-dropdown-item"
                              onClick={closeMobileMenu}
                            >
                              <DropdownIcon />
                              <span>{dropdownItem.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mobile auth section */}
              <div className="mobile-auth-section">
                {user ? (
                  <>
                    <div className="user-greeting">
                      Welcome, {user.name}!
                    </div>
                    <button 
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/auth" 
                    className="auth-btn"
                    onClick={closeMobileMenu}
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={closeMobileMenu}
          />
        )}
      </nav>
    </>
  )
}

export default Navbar