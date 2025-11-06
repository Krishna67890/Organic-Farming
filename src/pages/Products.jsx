import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaSeedling, 
  FaLeaf,
  FaRecycle,
  FaTint,
  FaBug,
  FaSun,
  FaSort,
  FaTh,
  FaThList,
  FaStar,
  FaShoppingCart,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaSyncAlt,
  FaExclamationTriangle,
  FaShoppingBag
} from 'react-icons/fa'
import ProductGrid from '../components/products/ProductGrid/ProductGrid'
import ProductFilter from '../components/products/ProductFilter/ProductFilter'
import Loading from '../components/common/Loading/Loading'
import EmptyState from '../components/common/EmptyState/EmptyState'
import './Products.css'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [wishlistItems, setWishlistItems] = useState(new Set())

  // Initial filters from URL params
  const initialFilters = {
    searchQuery: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceRange: [
      parseInt(searchParams.get('minPrice')) || 0,
      parseInt(searchParams.get('maxPrice')) || 1000
    ],
    organicOnly: searchParams.get('organic') === 'true',
    seasonal: searchParams.get('seasonal') || '',
    rating: parseInt(searchParams.get('rating')) || 0,
    tags: searchParams.get('tags') ? searchParams.get('tags').split(',') : []
  }

  const [filters, setFilters] = useState(initialFilters)

  // Mock products data with online images
  const mockProducts = [
    {
      id: 1,
      name: "Organic Heirloom Tomatoes",
      price: 4.99,
      originalPrice: 6.99,
      image: "https://images.unsplash.com/photo-1546470427-e212b7d31055?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      images: [
        "https://images.unsplash.com/photo-1546470427-e212b7d31055?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
      ],
      category: "vegetables",
      subcategory: "tomatoes",
      organic: true,
      seasonal: "summer",
      rating: 4.7,
      reviewCount: 128,
      stock: 25,
      unit: "lb",
      description: "Sweet and juicy heirloom tomatoes grown using sustainable organic methods.",
      tags: ["organic", "heirloom", "summer", "fresh"],
      features: ["Certified Organic", "Non-GMO", "Rich in Lycopene"],
      farmer: "Sarah Johnson",
      harvestDate: "2024-07-15",
      popularity: 95
    },
    {
      id: 2,
      name: "Fresh Organic Carrots",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "root",
      organic: true,
      seasonal: "all",
      rating: 4.5,
      reviewCount: 89,
      stock: 50,
      unit: "bunch",
      description: "Crisp and sweet organic carrots, perfect for snacking or cooking.",
      tags: ["organic", "root", "sweet", "crunchy"],
      features: ["Certified Organic", "High in Vitamin A", "Freshly Harvested"],
      farmer: "Mike Chen",
      harvestDate: "2024-07-10",
      popularity: 87
    },
    {
      id: 3,
      name: "Organic Free-Range Eggs",
      price: 6.99,
      originalPrice: 7.99,
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "dairy",
      subcategory: "eggs",
      organic: true,
      seasonal: "all",
      rating: 4.9,
      reviewCount: 203,
      stock: 12,
      unit: "dozen",
      description: "Farm-fresh eggs from happy, free-range chickens fed organic feed.",
      tags: ["organic", "free-range", "protein", "fresh"],
      features: ["Certified Organic", "Free-Range", "Rich in Omega-3"],
      farmer: "Lisa Green",
      harvestDate: "2024-07-18",
      popularity: 92
    },
    {
      id: 4,
      name: "Organic Honey",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1587049352846-4a5f9fbd6f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "other",
      subcategory: "sweeteners",
      organic: true,
      seasonal: "all",
      rating: 4.8,
      reviewCount: 156,
      stock: 18,
      unit: "jar",
      description: "Pure, raw honey from our own beehives, never processed or heated.",
      tags: ["organic", "raw", "sweet", "natural"],
      features: ["Raw & Unprocessed", "Local Pollen", "Antioxidant Rich"],
      farmer: "Tom Beekeeper",
      harvestDate: "2024-06-20",
      popularity: 88
    },
    {
      id: 5,
      name: "Fresh Organic Basil",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf6c71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "herbs",
      subcategory: "culinary",
      organic: true,
      seasonal: "summer",
      rating: 4.6,
      reviewCount: 67,
      stock: 30,
      unit: "bunch",
      description: "Aromatic organic basil with intense flavor and fragrance.",
      tags: ["organic", "herb", "aromatic", "culinary"],
      features: ["Certified Organic", "Intense Aroma", "Freshly Picked"],
      farmer: "Maria Gardener",
      harvestDate: "2024-07-12",
      popularity: 79
    },
    {
      id: 6,
      name: "Organic Potatoes",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "root",
      organic: true,
      seasonal: "all",
      rating: 4.4,
      reviewCount: 94,
      stock: 45,
      unit: "lb",
      description: "Versatile organic potatoes, perfect for roasting, mashing, or baking.",
      tags: ["organic", "root", "versatile", "starchy"],
      features: ["Certified Organic", "High in Potassium", "Versatile"],
      farmer: "John Farmer",
      harvestDate: "2024-07-08",
      popularity: 83
    },
    {
      id: 7,
      name: "Organic Strawberries",
      price: 5.99,
      originalPrice: 7.49,
      image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "fruits",
      subcategory: "berries",
      organic: true,
      seasonal: "spring",
      rating: 4.7,
      reviewCount: 112,
      stock: 15,
      unit: "pint",
      description: "Sweet and juicy organic strawberries, picked at peak ripeness.",
      tags: ["organic", "berries", "sweet", "seasonal"],
      features: ["Certified Organic", "Sweet & Juicy", "Antioxidant Rich"],
      farmer: "Sarah Johnson",
      harvestDate: "2024-06-25",
      popularity: 91
    },
    {
      id: 8,
      name: "Organic Spinach",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "leafy-greens",
      organic: true,
      seasonal: "spring",
      rating: 4.3,
      reviewCount: 78,
      stock: 35,
      unit: "bunch",
      description: "Tender organic spinach leaves, packed with nutrients and flavor.",
      tags: ["organic", "leafy-greens", "nutritious", "iron-rich"],
      features: ["Certified Organic", "Iron Rich", "Tender Leaves"],
      farmer: "Mike Chen",
      harvestDate: "2024-07-14",
      popularity: 76
    },
    {
      id: 9,
      name: "Organic Garlic",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "bulbs",
      organic: false,
      seasonal: "all",
      rating: 4.5,
      reviewCount: 103,
      stock: 60,
      unit: "head",
      description: "Pungent and flavorful garlic, essential for cooking and health benefits.",
      tags: ["garlic", "bulb", "flavorful", "culinary"],
      features: ["Pungent Flavor", "Health Benefits", "Long Shelf Life"],
      farmer: "John Farmer",
      harvestDate: "2024-06-30",
      popularity: 81
    },
    {
      id: 10,
      name: "Organic Cucumbers",
      price: 3.99,
      image: "https://images.unsplash.com/photo-1562243061-204d6d2d9293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "vine",
      organic: true,
      seasonal: "summer",
      rating: 4.4,
      reviewCount: 86,
      stock: 28,
      unit: "each",
      description: "Crisp and refreshing organic cucumbers, perfect for salads and snacks.",
      tags: ["organic", "vine", "refreshing", "hydrating"],
      features: ["Certified Organic", "High Water Content", "Refreshing"],
      farmer: "Maria Gardener",
      harvestDate: "2024-07-16",
      popularity: 77
    },
    {
      id: 11,
      name: "Organic Bell Peppers",
      price: 5.49,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "vegetables",
      subcategory: "nightshade",
      organic: true,
      seasonal: "summer",
      rating: 4.6,
      reviewCount: 95,
      stock: 22,
      unit: "lb",
      description: "Colorful and sweet organic bell peppers in red, yellow, and green varieties.",
      tags: ["organic", "colorful", "sweet", "vitamin-c"],
      features: ["Certified Organic", "Vitamin C Rich", "Colorful Varieties"],
      farmer: "Sarah Johnson",
      harvestDate: "2024-07-11",
      popularity: 84
    },
    {
      id: 12,
      name: "Organic Apples",
      price: 4.49,
      originalPrice: 5.99,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      category: "fruits",
      subcategory: "tree-fruit",
      organic: true,
      seasonal: "autumn",
      rating: 4.5,
      reviewCount: 134,
      stock: 40,
      unit: "lb",
      description: "Crisp and sweet organic apples from our orchard, perfect for eating fresh or baking.",
      tags: ["organic", "tree-fruit", "crisp", "sweet"],
      features: ["Certified Organic", "Crisp Texture", "Sweet Flavor"],
      farmer: "Tom Orchard",
      harvestDate: "2024-09-01",
      popularity: 89
    }
  ]

  // Categories for filter
  const categories = [
    { id: 'vegetables', name: 'Vegetables', count: 7, icon: FaSeedling },
    { id: 'fruits', name: 'Fruits', count: 2, icon: FaSun },
    { id: 'herbs', name: 'Herbs', count: 1, icon: FaLeaf },
    { id: 'dairy', name: 'Dairy & Eggs', count: 1, icon: FaRecycle },
    { id: 'other', name: 'Other Products', count: 1, icon: FaShoppingBag }
  ]

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setProducts(mockProducts)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (filters.searchQuery) params.set('search', filters.searchQuery)
    if (filters.category) params.set('category', filters.category)
    if (filters.priceRange[0] > 0) params.set('minPrice', filters.priceRange[0])
    if (filters.priceRange[1] < 1000) params.set('maxPrice', filters.priceRange[1])
    if (filters.organicOnly) params.set('organic', 'true')
    if (filters.seasonal) params.set('seasonal', filters.seasonal)
    if (filters.rating > 0) params.set('rating', filters.rating)
    if (filters.tags.length > 0) params.set('tags', filters.tags.join(','))
    
    setSearchParams(params)
  }, [filters, setSearchParams])

  // Filter products based on current filters
  const applyFilters = useCallback((productsList, filterSettings) => {
    return productsList.filter(product => {
      // Search filter
      if (filterSettings.searchQuery) {
        const query = filterSettings.searchQuery.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query)) ||
          product.category.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Category filter
      if (filterSettings.category && product.category !== filterSettings.category) {
        return false
      }

      // Price range filter
      if (product.price < filterSettings.priceRange[0] || product.price > filterSettings.priceRange[1]) {
        return false
      }

      // Organic filter
      if (filterSettings.organicOnly && !product.organic) {
        return false
      }

      // Seasonal filter
      if (filterSettings.seasonal && product.seasonal !== filterSettings.seasonal) {
        return false
      }

      // Rating filter
      if (filterSettings.rating > 0 && product.rating < filterSettings.rating) {
        return false
      }

      // Tags filter
      if (filterSettings.tags.length > 0 && 
          !filterSettings.tags.some(tag => product.tags.includes(tag))) {
        return false
      }

      return true
    })
  }, [])

  // Apply filters when products or filters change
  useEffect(() => {
    if (products.length > 0) {
      const filtered = applyFilters(products, filters)
      setFilteredProducts(filtered)
    }
  }, [products, filters, applyFilters])

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      priceRange: [0, 1000],
      organicOnly: false,
      seasonal: '',
      rating: 0,
      tags: []
    })
  }

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlistItems(prev => {
      const newWishlist = new Set(prev)
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId)
      } else {
        newWishlist.add(productId)
      }
      return newWishlist
    })
  }

  // Quick view product
  const handleQuickView = (product) => {
    setQuickViewProduct(product)
  }

  // Close quick view
  const closeQuickView = () => {
    setQuickViewProduct(null)
  }

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.searchQuery) count++
    if (filters.category) count++
    if (filters.organicOnly) count++
    if (filters.seasonal) count++
    if (filters.rating > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++
    return count
  }, [filters])

  // Stats for the page
  const pageStats = useMemo(() => {
    const totalProducts = products.length
    const organicProducts = products.filter(p => p.organic).length
    const outOfStockProducts = products.filter(p => p.stock === 0).length
    const averageRating = products.reduce((acc, p) => acc + p.rating, 0) / totalProducts

    return {
      totalProducts,
      organicProducts,
      outOfStockProducts,
      averageRating: averageRating.toFixed(1)
    }
  }, [products])

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <EmptyState
            icon={<FaExclamationTriangle />}
            title="Something went wrong"
            message="We couldn't load the products. Please try again later."
            action={{
              label: 'Retry',
              onClick: () => window.location.reload()
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our Organic Products</h1>
            <p>Discover fresh, sustainably grown organic produce straight from our farm to your table.</p>
            
            {/* Quick Stats */}
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">{pageStats.totalProducts}</div>
                <div className="stat-label">Total Products</div>
              </div>
              <div className="stat">
                <div className="stat-number">{pageStats.organicProducts}</div>
                <div className="stat-label">Organic Items</div>
              </div>
              <div className="stat">
                <div className="stat-number">{pageStats.averageRating}</div>
                <div className="stat-label">Avg Rating</div>
              </div>
              <div className="stat">
                <div className="stat-number">{pageStats.outOfStockProducts}</div>
                <div className="stat-label">Out of Stock</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
            <div className="filters-header">
              <h2>Filters</h2>
              <button 
                className="close-filters"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <ProductFilter
              products={products}
              onFilterChange={handleFilterChange}
              categories={categories}
              loading={loading}
              initialFilters={filters}
            />

            {/* Quick Categories */}
            <div className="quick-categories">
              <h3>Shop by Category</h3>
              <div className="category-buttons">
                {categories.map(category => {
                  const CategoryIcon = category.icon
                  return (
                    <button
                      key={category.id}
                      className={`category-btn ${filters.category === category.id ? 'active' : ''}`}
                      onClick={() => handleFilterChange({
                        ...filters,
                        category: filters.category === category.id ? '' : category.id
                      })}
                    >
                      <CategoryIcon />
                      <span>{category.name}</span>
                      <span className="category-count">({category.count})</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="products-main">
            {/* Products Header */}
            <div className="products-header">
              <div className="header-left">
                <h2>All Products</h2>
                {!loading && (
                  <p className="results-count">
                    Showing {filteredProducts.length} of {products.length} products
                    {activeFilterCount > 0 && ` (${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active)`}
                  </p>
                )}
              </div>

              <div className="header-right">
                {/* View Toggle */}
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <FaTh />
                  </button>
                  <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <FaThList />
                  </button>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  className="mobile-filter-toggle"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <FaFilter />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="filter-badge">{activeFilterCount}</span>
                  )}
                </button>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <button
                    className="clear-filters-btn"
                    onClick={clearAllFilters}
                  >
                    <FaTimes />
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="active-filters">
                <div className="active-filters-header">
                  <span>Active Filters:</span>
                  <button onClick={clearAllFilters}>Clear All</button>
                </div>
                <div className="active-filters-list">
                  {filters.searchQuery && (
                    <span className="active-filter">
                      Search: "{filters.searchQuery}"
                      <button onClick={() => handleFilterChange({ ...filters, searchQuery: '' })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="active-filter">
                      Category: {categories.find(c => c.id === filters.category)?.name}
                      <button onClick={() => handleFilterChange({ ...filters, category: '' })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {filters.organicOnly && (
                    <span className="active-filter">
                      Organic Only
                      <button onClick={() => handleFilterChange({ ...filters, organicOnly: false })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {filters.seasonal && (
                    <span className="active-filter">
                      Seasonal: {filters.seasonal}
                      <button onClick={() => handleFilterChange({ ...filters, seasonal: '' })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {filters.rating > 0 && (
                    <span className="active-filter">
                      Rating: {filters.rating}+ stars
                      <button onClick={() => handleFilterChange({ ...filters, rating: 0 })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                  {filters.tags.map(tag => (
                    <span key={tag} className="active-filter">
                      Tag: {tag}
                      <button onClick={() => handleFilterChange({
                        ...filters,
                        tags: filters.tags.filter(t => t !== tag)
                      })}>
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
                    <span className="active-filter">
                      Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      <button onClick={() => handleFilterChange({
                        ...filters,
                        priceRange: [0, 1000]
                      })}>
                        <FaTimes />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              filters={filters}
              onFiltersChange={handleFilterChange}
              viewMode={viewMode}
              onProductClick={(product) => navigate(`/products/${product.id}`)}
              onQuickAdd={(product) => {
                // Handle quick add to cart
                console.log('Quick add:', product)
              }}
              showViewToggle={false}
              itemsPerPage={12}
              enablePagination={true}
            />

            {/* No Results */}
            {!loading && filteredProducts.length === 0 && (
              <EmptyState
                icon={<FaSearch />}
                title="No products found"
                message="Try adjusting your search or filters to find what you're looking for."
                action={{
                  label: 'Clear All Filters',
                  onClick: clearAllFilters
                }}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {mobileFiltersOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
    </div>
  )
}

export default Products