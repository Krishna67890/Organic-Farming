import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaHome, 
  FaSearch, 
  FaLeaf, 
  FaSeedling, 
  FaRecycle,
  FaArrowLeft,
  FaShoppingBag,
  FaEnvelope,
  FaExclamationTriangle,
  FaCompass,
  FaTree,
  FaBug
} from 'react-icons/fa'
import './NotFound.css'

const NotFound = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(10)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Popular products for suggestions
  const popularProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: 4.99,
      image: "/images/products/tomatoes.jpg",
      category: "vegetables"
    },
    {
      id: 2,
      name: "Fresh Carrots",
      price: 3.49,
      image: "/images/products/carrots.jpg",
      category: "vegetables"
    },
    {
      id: 3,
      name: "Farm Honey",
      price: 12.99,
      image: "/images/products/honey.jpg",
      category: "other"
    },
    {
      id: 4,
      name: "Organic Eggs",
      price: 6.99,
      image: "/images/products/eggs.jpg",
      category: "dairy"
    }
  ]

  // Popular pages for navigation
  const popularPages = [
    { path: '/', name: 'Home', icon: FaHome },
    { path: '/products', name: 'All Products', icon: FaShoppingBag },
    { path: '/farming', name: 'Farming Methods', icon: FaLeaf },
    { path: '/about', name: 'About Us', icon: FaSeedling },
    { path: '/contact', name: 'Contact', icon: FaEnvelope }
  ]

  // Animated elements data
  const floatingElements = [
    { icon: FaLeaf, delay: 0 },
    { icon: FaSeedling, delay: 1 },
    { icon: FaRecycle, delay: 2 },
    { icon: FaTree, delay: 3 },
    { icon: FaBug, delay: 4 }
  ]

  // Countdown to redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      navigate('/')
    }
  }, [countdown, navigate])

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const handleQuickRedirect = () => {
    navigate('/')
  }

  return (
    <div className="not-found-page">
      {/* Animated Background Elements */}
      <div className="floating-elements">
        {floatingElements.map((element, index) => {
          const ElementIcon = element.icon
          return (
            <div 
              key={index}
              className="floating-element"
              style={{ animationDelay: `${element.delay}s` }}
            >
              <ElementIcon />
            </div>
          )
        })}
      </div>

      {/* Parallax Background */}
      <div 
        className="parallax-bg"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      ></div>

      <div className="container">
        <div className="not-found-content">
          {/* Main Error Section */}
          <div className="error-main">
            <div className="error-graphic">
              <div className="error-number">
                <span className="number-4">4</span>
                <div className="seedling-container">
                  <FaSeedling className={`seedling ${isAnimating ? 'animate' : ''}`} />
                </div>
                <span className="number-4">4</span>
              </div>
              
              <div className="error-icon">
                <FaExclamationTriangle />
              </div>
            </div>

            <div className="error-text">
              <h1>Page Not Found</h1>
              <p>
                Oops! It looks like you've wandered off the beaten path. 
                The page you're looking for has been moved, deleted, or never existed.
              </p>
              
              <div className="countdown-message">
                <p>
                  Don't worry! We'll redirect you to the homepage in{' '}
                  <span className="countdown-number">{countdown}</span> seconds
                </p>
                <button 
                  className="skip-countdown"
                  onClick={handleQuickRedirect}
                >
                  Go now
                </button>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="action-section">
            <div className="action-buttons">
              <button 
                className="btn-primary"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
                Go Back
              </button>
              
              <Link to="/" className="btn-secondary">
                <FaHome />
                Homepage
              </Link>
              
              <button 
                className="btn-tertiary"
                onClick={triggerAnimation}
              >
                <FaCompass />
                Animate
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="search-suggestion">
              <h3>Can't find what you're looking for?</h3>
              <div className="search-box">
                <FaSearch />
                <input 
                  type="text" 
                  placeholder="Search our website..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/products?search=${e.target.value}`)
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="popular-pages">
            <h2>Popular Pages</h2>
            <div className="pages-grid">
              {popularPages.map((page, index) => {
                const PageIcon = page.icon
                return (
                  <Link 
                    key={index}
                    to={page.path}
                    className="page-card"
                  >
                    <PageIcon className="page-icon" />
                    <span>{page.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product Suggestions */}
          <div className="product-suggestions">
            <h2>You Might Like These</h2>
            <p>Check out some of our popular organic products</p>
            
            <div className="products-grid">
              {popularProducts.map(product => (
                <div key={product.id} className="product-suggestion">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-overlay">
                      <Link to={`/products/${product.id}`} className="view-product">
                        View Product
                      </Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <span className="product-category">{product.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="help-section">
            <div className="help-card">
              <div className="help-icon">
                <FaEnvelope />
              </div>
              <div className="help-content">
                <h3>Need Help?</h3>
                <p>Can't find what you're looking for? Our team is here to help you.</p>
                <Link to="/contact" className="help-link">
                  Contact Support
                </Link>
              </div>
            </div>
            
            <div className="help-card">
              <div className="help-icon">
                <FaLeaf />
              </div>
              <div className="help-content">
                <h3>Explore Our Farm</h3>
                <p>Learn about our organic farming practices and sustainable methods.</p>
                <Link to="/farming" className="help-link">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="fun-facts">
            <h3>Did You Know?</h3>
            <div className="facts-container">
              <div className="fact">
                <FaLeaf />
                <p>Our organic farming methods help preserve soil health for future generations</p>
              </div>
              <div className="fact">
                <FaRecycle />
                <p>We recycle 95% of our farm waste through composting and other methods</p>
              </div>
              <div className="fact">
                <FaSeedling />
                <p>Each of our plants is grown without synthetic pesticides or fertilizers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound