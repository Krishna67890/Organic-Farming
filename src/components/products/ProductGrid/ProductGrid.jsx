import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  FaTh, 
  FaThList, 
  FaSort, 
  FaFilter,
  FaExclamationTriangle,
  FaSeedling,
  FaSyncAlt,
  FaSearch
} from 'react-icons/fa'
import ProductCard from '../ProductCard/ProductCard'
import Loading from "../../common/Loading/Loading"; 
import EmptyState from "../../common/EmptyState/EmptyState";
import './ProductGrid.css'

const ProductGrid = ({ 
  products = [], 
  loading = false,
  error = null,
  onProductClick,
  onQuickAdd,
  filters = {},
  onFiltersChange,
  showViewToggle = true,
  showSortOptions = true,
  itemsPerPage = 12,
  enablePagination = true,
  enableInfiniteScroll = false,
  variant = 'default'
}) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [loadingMore, setLoadingMore] = useState(false)

  // Sort options configuration
  const sortOptions = [
    { value: 'name_asc', label: 'Name A-Z', field: 'name', order: 'asc' },
    { value: 'name_desc', label: 'Name Z-A', field: 'name', order: 'desc' },
    { value: 'price_asc', label: 'Price Low to High', field: 'price', order: 'asc' },
    { value: 'price_desc', label: 'Price High to Low', field: 'price', order: 'desc' },
    { value: 'rating_desc', label: 'Highest Rated', field: 'rating', order: 'desc' },
    { value: 'newest', label: 'Newest First', field: 'createdAt', order: 'desc' },
    { value: 'popular', label: 'Most Popular', field: 'popularity', order: 'desc' }
  ]

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products.length) return []

    let filtered = [...products]

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
      )
    }

    // Apply organic filter
    if (filters.organicOnly) {
      filtered = filtered.filter(product => product.organic)
    }

    // Apply seasonal filter
    if (filters.seasonal) {
      filtered = filtered.filter(product => product.seasonal === filters.seasonal)
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating)
    }

    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        product.tags?.some(tag => filters.tags.includes(tag))
      )
    }

    // Apply sorting
    const currentSort = sortOptions.find(option => option.value === sortBy) || sortOptions[0]
    
    filtered.sort((a, b) => {
      let aValue = a[currentSort.field]
      let bValue = b[currentSort.field]

      // Handle undefined values
      if (aValue === undefined) aValue = 0
      if (bValue === undefined) bValue = 0

      if (currentSort.field === 'name') {
        return currentSort.order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (currentSort.order === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    return filtered
  }, [products, filters, sortBy])

  // Pagination logic
  const paginatedProducts = useMemo(() => {
    if (!enablePagination) return filteredAndSortedProducts

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredAndSortedProducts.slice(0, endIndex)
  }, [filteredAndSortedProducts, currentPage, itemsPerPage, enablePagination])

  // Calculate total pages
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const totalProducts = filteredAndSortedProducts.length
  const showingCount = paginatedProducts.length

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  // Infinite scroll handler
  useEffect(() => {
    if (!enableInfiniteScroll || !enablePagination) return

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          !== document.documentElement.offsetHeight || loadingMore) {
        return
      }

      if (currentPage < totalPages) {
        setLoadingMore(true)
        setTimeout(() => {
          setCurrentPage(prev => prev + 1)
          setLoadingMore(false)
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPage, totalPages, loadingMore, enableInfiniteScroll, enablePagination])

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value)
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle product click
  const handleProductClick = useCallback((product) => {
    onProductClick?.(product)
  }, [onProductClick])

  // Handle quick add
  const handleQuickAdd = useCallback((product) => {
    onQuickAdd?.(product)
  }, [onQuickAdd])

  // Render pagination controls
  const renderPagination = () => {
    if (!enablePagination || totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    )

    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`pagination-btn ${1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>)
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>)
      }
      pages.push(
        <button
          key={totalPages}
          className={`pagination-btn ${totalPages === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      )
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    )

    return <div className="pagination">{pages}</div>
  }

  // Render loading skeleton
  const renderSkeleton = () => {
    return Array.from({ length: itemsPerPage }, (_, index) => (
      <div key={index} className="product-card-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-line short"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line long"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    ))
  }

  // Render empty state
  const renderEmptyState = () => {
    if (loading) return null

    if (error) {
      return (
        <EmptyState
          icon={<FaExclamationTriangle />}
          title="Something went wrong"
          message="We couldn't load the products. Please try again later."
          action={{
            label: 'Retry',
            onClick: () => window.location.reload()
          }}
        />
      )
    }

    if (filteredAndSortedProducts.length === 0) {
      const hasActiveFilters = Object.values(filters).some(filter => 
        Array.isArray(filter) ? filter.length > 0 : Boolean(filter)
      )

      if (hasActiveFilters) {
        return (
          <EmptyState
            icon={<FaSearch />}
            title="No products found"
            message="Try adjusting your filters to see more results."
            action={{
              label: 'Clear Filters',
              onClick: () => onFiltersChange?.({})
            }}
          />
        )
      }

      return (
        <EmptyState
          icon={<FaSeedling />}
          title="No products available"
          message="Check back soon for new organic products!"
        />
      )
    }

    return null
  }

  return (
    <div className={`product-grid-container ${variant}`}>
      {/* Header with controls */}
      <div className="product-grid-header">
        <div className="grid-info">
          <h2 className="grid-title">Our Products</h2>
          {!loading && (
            <p className="product-count">
              Showing {showingCount} of {totalProducts} products
            </p>
          )}
        </div>

        <div className="grid-controls">
          {/* Sort Dropdown */}
          {showSortOptions && (
            <div className="sort-control">
              <FaSort className="sort-icon" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* View Toggle */}
          {showViewToggle && (
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
          )}
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={`products-container ${viewMode}`}>
        {loading && renderSkeleton()}
        
        {!loading && paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            variant={viewMode === 'list' ? 'horizontal' : 'default'}
            onQuickAdd={handleQuickAdd}
            onClick={handleProductClick}
            showDescription={viewMode === 'list'}
            showActions={true}
          />
        ))}
      </div>

      {/* Empty State */}
      {renderEmptyState()}

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="loading-more">
          <FaSyncAlt className="spinner" />
          <span>Loading more products...</span>
        </div>
      )}

      {/* Pagination */}
      {enablePagination && !enableInfiniteScroll && renderPagination()}

      {/* Load More Button for Infinite Scroll */}
      {enableInfiniteScroll && currentPage < totalPages && !loadingMore && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid