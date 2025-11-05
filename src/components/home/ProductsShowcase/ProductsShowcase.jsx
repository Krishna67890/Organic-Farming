import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLeaf, 
  FaSeedling, 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart,
  FaArrowRight,
  FaArrowLeft,
  FaFilter,
  FaFire,
  FaClock
} from 'react-icons/fa'
import ProductCard from '../../products/ProductCard/ProductCard'
import './ProductsShowcase.css'

const ProductsShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [favorites, setFavorites] = useState(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const showcaseRef = useRef(null)

  const categories = [
    { id: 'all', name: 'All Products', icon: FaLeaf, count: 45 },
    { id: 'vegetables', name: 'Fresh Vegetables', icon: FaSeedling, count: 18 },
    { id: 'fruits', name: 'Seasonal Fruits', icon: FaLeaf, count: 12 },
    { id: 'herbs', name: 'Organic Herbs', icon: FaSeedling, count: 8 },
    { id: 'dairy', name: 'Dairy & Eggs', icon: FaLeaf, count: 7 }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Organic Cherry Tomatoes",
      category: "vegetables",
      price: 4.99,
      originalPrice: 6.99,
      discount: 29,
      rating: 4.8,
      reviewCount: 124,
      image: "/api/placeholder/300/300",
      unit: "lb",
      organic: true,
      seasonal: true,
      inStock: true,
      farm: "Green Valley Farm",
      description: "Sweet and juicy cherry tomatoes, perfect for salads and snacking.",
      tags: ["bestseller", "new"]
    },
    {
      id: 2,
      name: "Fresh Avocados",
      category: "fruits",
      price: 2.99,
      originalPrice: 3.49,
      discount: 14,
      rating: 4.6,
      reviewCount: 89,
      image: "/api/placeholder/300/300",
      unit: "each",
      organic: true,
      seasonal: false,
      inStock: true,
      farm: "Sunshine Orchards",
      description: "Creamy ripe avocados, perfect for guacamole and toast.",
      tags: ["popular"]
    },
    {
      id: 3,
      name: "Organic Basil",
      category: "herbs",
      price: 3.49,
      originalPrice: null,
      discount: 0,
      rating: 4.9,
      reviewCount: 67,
      image: "/api/placeholder/300/300",
      unit: "bunch",
      organic: true,
      seasonal: true,
      inStock: true,
      farm: "Herb Garden Co.",
      description: "Fragrant fresh basil for your culinary creations.",
      tags: ["limited"]
    },
    {
      id: 4,
      name: "Free-Range Eggs",
      category: "dairy",
      price: 5.99,
      originalPrice: 6.99,
      discount: 14,
      rating: 4.7,
      reviewCount: 203,
      image: "/api/placeholder/300/300",
      unit: "dozen",
      organic: true,
      seasonal: false,
      inStock: true,
      farm: "Happy Hen Farm",
      description: "Farm-fresh eggs from free-range, happy chickens.",
      tags: ["bestseller"]
    },
    {
      id: 5,
      name: "Organic Strawberries",
      category: "fruits",
      price: 6.99,
      originalPrice: 8.99,
      discount: 22,
      rating: 4.5,
      reviewCount: 156,
      image: "/api/placeholder/300/300",
      unit: "lb",
      organic: true,
      seasonal: true,
      inStock: false,
      farm: "Berry Best Farms",
      description: "Sweet and succulent organic strawberries.",
      tags: ["seasonal"]
    },
    {
      id: 6,
      name: "Rainbow Carrots",
      category: "vegetables",
      price: 3.99,
      originalPrice: null,
      discount: 0,
      rating: 4.4,
      reviewCount: 78,
      image: "/api/placeholder/300/300",
      unit: "bunch",
      organic: true,
      seasonal: false,
      inStock: true,
      farm: "Colorful Crops",
      description: "Vibrant rainbow carrots packed with nutrients.",
      tags: ["new"]
    }
  ]

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current)
    }

    return () => {
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current)
      }
    }
  }, [])

  // Filter products based on active category
  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.id - a.id
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'featured':
      default:
        return (b.tags.includes('bestseller') ? 1 : 0) - (a.tags.includes('bestseller') ? 1 : 0)
    }
  })

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const getCategoryStats = () => {
    const totalProducts = products.length
    const organicProducts = products.filter(p => p.organic).length
    const seasonalProducts = products.filter(p => p.seasonal).length
    
    return { totalProducts, organicProducts, seasonalProducts }
  }

  const stats = getCategoryStats()

  return (
    <section className="products-showcase" ref={showcaseRef}>
      <div className="container">
        {/* Header */}
        <div className="showcase-header">
          <div className="header-content">
            <div className="title-section">
              <h2 className="showcase-title">
                Fresh From Our <span className="highlight">Organic Farms</span>
              </h2>
              <p className="showcase-subtitle">
                Discover our carefully curated selection of organic produce, harvested at peak freshness 
                and delivered straight from our sustainable farms to your table.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-overview">
              <div className="stat">
                <div className="stat-number">{stats.totalProducts}+</div>
                <div className="stat-label">Products</div>
              </div>
              <div className="stat">
                <div className="stat-number">{stats.organicProducts}%</div>
                <div className="stat-label">Organic</div>
              </div>
              <div className="stat">
                <div className="stat-number">{stats.seasonalProducts}</div>
                <div className="stat-label">Seasonal</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="showcase-controls">
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <div className="grid-icon">
                  <div className="grid-square"></div>
                  <div className="grid-square"></div>
                  <div className="grid-square"></div>
                  <div className="grid-square"></div>
                </div>
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <div className="list-icon">
                  <div className="list-line"></div>
                  <div className="list-line"></div>
                  <div className="list-line"></div>
                </div>
              </button>
            </div>

            <div className="sort-controls">
              <FaFilter className="filter-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <div className="categories-scroll">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.id ? 'active' : ''} ${isVisible ? 'animate-in' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ '--animation-delay': `${index * 0.1}s` }}
                >
                  <div className="category-icon">
                    <IconComponent />
                  </div>
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`products-container ${viewMode}`}>
          {sortedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`product-wrapper ${isVisible ? 'animate-in' : ''}`}
              style={{ '--animation-delay': `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
              
              {/* Quick Actions Overlay */}
              <div className="quick-actions">
                <button 
                  className={`favorite-btn ${favorites.has(product.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={favorites.has(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {favorites.has(product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
                
                {product.tags.includes('bestseller') && (
                  <div className="product-badge bestseller">
                    <FaFire />
                    <span>Bestseller</span>
                  </div>
                )}
                
                {product.tags.includes('new') && (
                  <div className="product-badge new">
                    <FaLeaf />
                    <span>New</span>
                  </div>
                )}
                
                {product.tags.includes('seasonal') && (
                  <div className="product-badge seasonal">
                    <FaClock />
                    <span>Seasonal</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="showcase-cta">
          <div className="cta-content">
            <h3>Can't Find What You're Looking For?</h3>
            <p>Explore our complete catalog with hundreds of organic products</p>
            <Link to="/products" className="cta-button">
              <span>View All Products</span>
              <FaArrowRight />
            </Link>
          </div>
          
          {/* Decorative Elements */}
          <div className="cta-decoration">
            <div className="decoration-leaf"></div>
            <div className="decoration-leaf"></div>
            <div className="decoration-leaf"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsShowcase 