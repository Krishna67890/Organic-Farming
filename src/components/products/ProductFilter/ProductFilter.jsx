import React, { useState, useEffect, useMemo } from 'react'
import { 
  FaFilter, 
  FaTimes, 
  FaSearch, 
  FaLeaf, 
  FaSeedling, 
  FaFire, 
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaSyncAlt
} from 'react-icons/fa'
import './ProductFilter.css'

const ProductFilter = ({ 
  products = [], 
  onFilterChange, 
  categories = [],
  loading = false,
  initialFilters = {} 
}) => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    organicOnly: false,
    seasonal: '',
    rating: 0,
    tags: [],
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc',
    ...initialFilters
  })

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    features: true,
    rating: true
  })

  // Extract available filter options from products
  const filterOptions = useMemo(() => {
    const options = {
      categories: [],
      priceRange: { min: 0, max: 1000 },
      seasons: [],
      tags: [],
      ratings: [1, 2, 3, 4, 5]
    }

    if (products.length > 0) {
      // Categories
      options.categories = [...new Set(products.map(p => p.category))]
      
      // Price range
      const prices = products.map(p => p.price)
      options.priceRange = {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices))
      }

      // Seasons
      options.seasons = [...new Set(products.map(p => p.seasonal).filter(Boolean))]
      
      // Tags
      const allTags = products.flatMap(p => p.tags || [])
      options.tags = [...new Set(allTags)].slice(0, 10) // Limit to top 10 tags
    }

    return options
  }, [products])

  // Available sort options
  const sortOptions = [
    { value: 'name', label: 'Name A-Z', icon: '🔤' },
    { value: 'name-desc', label: 'Name Z-A', icon: '🔤' },
    { value: 'price', label: 'Price Low to High', icon: '💰' },
    { value: 'price-desc', label: 'Price High to Low', icon: '💰' },
    { value: 'rating', label: 'Highest Rated', icon: '⭐' },
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'popular', label: 'Most Popular', icon: '🔥' }
  ]

  // Apply filters when they change
  useEffect(() => {
    onFilterChange?.(filters)
  }, [filters, onFilterChange])

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? '' : category
    }))
  }

  const handlePriceRangeChange = (min, max) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }))
  }

  const handleOrganicChange = (organicOnly) => {
    setFilters(prev => ({
      ...prev,
      organicOnly
    }))
  }

  const handleSeasonalChange = (season) => {
    setFilters(prev => ({
      ...prev,
      seasonal: prev.seasonal === season ? '' : season
    }))
  }

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? 0 : rating
    }))
  }

  const handleTagToggle = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const handleSearchChange = (searchQuery) => {
    setFilters(prev => ({
      ...prev,
      searchQuery
    }))
  }

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }))
  }

  const handleResetFilters = () => {
    setFilters({
      category: '',
      priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max],
      organicOnly: false,
      seasonal: '',
      rating: 0,
      tags: [],
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc'
    })
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.category) count++
    if (filters.organicOnly) count++
    if (filters.seasonal) count++
    if (filters.rating > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.priceRange[0] > filterOptions.priceRange.min || 
        filters.priceRange[1] < filterOptions.priceRange.max) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  const seasonalIcons = {
    spring: '🌸',
    summer: '☀️',
    autumn: '🍂',
    winter: '❄️'
  }

  return (
    <div className="product-filter">
      {/* Mobile Filter Header */}
      <div className="filter-mobile-header">
        <button 
          className="mobile-filter-toggle"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <FaFilter />
          Filters
          {activeFilterCount > 0 && (
            <span className="filter-badge">{activeFilterCount}</span>
          )}
        </button>
        
        <div className="sort-controls-mobile">
          <select 
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-search">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          {filters.searchQuery && (
            <button 
              className="clear-search"
              onClick={() => handleSearchChange('')}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className={`filter-content ${isMobileFiltersOpen ? 'mobile-open' : ''}`}>
        {/* Filter Header */}
        <div className="filter-header">
          <h3>Filters</h3>
          <div className="filter-actions">
            {activeFilterCount > 0 && (
              <span className="active-filters-count">
                {activeFilterCount} active
              </span>
            )}
            <button 
              className="reset-filters-btn"
              onClick={handleResetFilters}
              disabled={activeFilterCount === 0}
            >
              <FaSyncAlt />
              Reset
            </button>
          </div>
        </div>

        {/* Sort Controls - Desktop */}
        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-section">
          <div 
            className="filter-section-header"
            onClick={() => toggleSection('category')}
          >
            <h4>Category</h4>
            {expandedSections.category ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.category && (
            <div className="filter-options">
              {filterOptions.categories.map(category => (
                <button
                  key={category}
                  className={`filter-option ${filters.category === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <span className="option-checkbox"></span>
                  <span className="option-label">{category}</span>
                  <span className="option-count">
                    ({products.filter(p => p.category === category).length})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <div 
            className="filter-section-header"
            onClick={() => toggleSection('price')}
          >
            <h4>Price Range</h4>
            {expandedSections.price ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.price && (
            <div className="filter-options">
              <div className="price-range">
                <div className="price-inputs">
                  <div className="price-input">
                    <label>Min</label>
                    <span className="price-prefix">$</span>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(
                        Number(e.target.value), 
                        filters.priceRange[1]
                      )}
                      min={filterOptions.priceRange.min}
                      max={filterOptions.priceRange.max}
                    />
                  </div>
                  <div className="price-input">
                    <label>Max</label>
                    <span className="price-prefix">$</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(
                        filters.priceRange[0],
                        Number(e.target.value)
                      )}
                      min={filterOptions.priceRange.min}
                      max={filterOptions.priceRange.max}
                    />
                  </div>
                </div>
                <div className="price-slider">
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(
                      Number(e.target.value),
                      filters.priceRange[1]
                    )}
                    className="range-min"
                  />
                  <input
                    type="range"
                    min={filterOptions.priceRange.min}
                    max={filterOptions.priceRange.max}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(
                      filters.priceRange[0],
                      Number(e.target.value)
                    )}
                    className="range-max"
                  />
                </div>
                <div className="price-display">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Filter */}
        <div className="filter-section">
          <div 
            className="filter-section-header"
            onClick={() => toggleSection('features')}
          >
            <h4>Features</h4>
            {expandedSections.features ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.features && (
            <div className="filter-options">
              {/* Organic Only */}
              <button
                className={`filter-option ${filters.organicOnly ? 'active' : ''}`}
                onClick={() => handleOrganicChange(!filters.organicOnly)}
              >
                <span className="option-checkbox"></span>
                <FaLeaf className="option-icon" />
                <span className="option-label">Organic Only</span>
                <span className="option-count">
                  ({products.filter(p => p.organic).length})
                </span>
              </button>

              {/* Seasonal */}
              {filterOptions.seasons.map(season => (
                <button
                  key={season}
                  className={`filter-option ${filters.seasonal === season ? 'active' : ''}`}
                  onClick={() => handleSeasonalChange(season)}
                >
                  <span className="option-checkbox"></span>
                  <span className="option-icon">{seasonalIcons[season]}</span>
                  <span className="option-label capitalize">{season}</span>
                  <span className="option-count">
                    ({products.filter(p => p.seasonal === season).length})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <div 
            className="filter-section-header"
            onClick={() => toggleSection('rating')}
          >
            <h4>Customer Rating</h4>
            {expandedSections.rating ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {expandedSections.rating && (
            <div className="filter-options">
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  className={`filter-option ${filters.rating === rating ? 'active' : ''}`}
                  onClick={() => handleRatingChange(rating)}
                >
                  <span className="option-checkbox"></span>
                  <div className="rating-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < rating ? 'star filled' : 'star'}
                      />
                    ))}
                  </div>
                  <span className="option-label">& Up</span>
                  <span className="option-count">
                    ({products.filter(p => p.rating >= rating).length})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags Filter */}
        {filterOptions.tags.length > 0 && (
          <div className="filter-section">
            <div className="filter-section-header">
              <h4>Popular Tags</h4>
            </div>
            <div className="tags-filter">
              {filterOptions.tags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter ${filters.tags.includes(tag) ? 'active' : ''}`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <div className="active-filters">
            <h4>Active Filters</h4>
            <div className="active-filters-list">
              {filters.category && (
                <span className="active-filter">
                  Category: {filters.category}
                  <button onClick={() => handleCategoryChange('')}>×</button>
                </span>
              )}
              {filters.organicOnly && (
                <span className="active-filter">
                  Organic Only
                  <button onClick={() => handleOrganicChange(false)}>×</button>
                </span>
              )}
              {filters.seasonal && (
                <span className="active-filter">
                  Seasonal: {filters.seasonal}
                  <button onClick={() => handleSeasonalChange('')}>×</button>
                </span>
              )}
              {filters.rating > 0 && (
                <span className="active-filter">
                  Rating: {filters.rating}+ stars
                  <button onClick={() => handleRatingChange(0)}>×</button>
                </span>
              )}
              {filters.tags.map(tag => (
                <span key={tag} className="active-filter">
                  Tag: {tag}
                  <button onClick={() => handleTagToggle(tag)}>×</button>
                </span>
              ))}
              {(filters.priceRange[0] > filterOptions.priceRange.min || 
                filters.priceRange[1] < filterOptions.priceRange.max) && (
                <span className="active-filter">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <button onClick={() => handlePriceRangeChange(
                    filterOptions.priceRange.min, 
                    filterOptions.priceRange.max
                  )}>×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFiltersOpen && (
        <div 
          className="mobile-filter-overlay"
          onClick={() => setIsMobileFiltersOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default ProductFilter