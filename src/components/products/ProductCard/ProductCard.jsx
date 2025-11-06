// src/components/products/ProductCard/ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaShoppingCart, FaLeaf, FaStar, FaEye, FaSeedling } from "react-icons/fa"
import { useCart } from "../../../context/CartContext"
import { useAuth } from "../../../context/AuthContext"
import "./ProductCard.css"

const ProductCard = ({ 
  product, 
  onQuickAdd, 
  variant = 'default',
  showActions = true,
  showDescription = true 
}) => {
  // EXTREME safety checks - ADDED AT THE TOP
  if (!product || typeof product !== 'object') {
    console.error('❌ ProductCard: Invalid product received:', product)
    return (
      <div className="product-card error">
        <div>Product unavailable</div>
      </div>
    )
  }

  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()

  // Safe destructuring with defaults
  const {
    id = 'unknown',
    name = 'Unknown Product',
    price = 0,
    originalPrice = 0,
    image = '',
    category = 'uncategorized',
    organic = false,
    seasonal = '',
    rating = 0,
    reviewCount = 0,
    description = '',
    stock = 0,
    discount = 0,
    tags = [],
    unit = 'kg'
  } = product

  // Ensure onQuickAdd is a function
  const safeOnQuickAdd = typeof onQuickAdd === 'function' ? onQuickAdd : () => {
    console.warn('onQuickAdd is not a function')
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem = {
      id: id || Date.now(),
      name: name || 'Unknown Product',
      price: price || 0,
      image: image || '',
      quantity: 1,
      unit: unit || 'unit'
    }
    
    addToCart(cartItem)
    safeOnQuickAdd(cartItem)
    
    // Add visual feedback
    const button = e.target.closest('.add-to-cart-btn')
    if (button) {
      button.classList.add('added')
      setTimeout(() => button.classList.remove('added'), 600)
    }
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      // Redirect to login or show login modal
      console.log('Please login to add to wishlist')
      return
    }
    
    setIsWishlisted(!isWishlisted)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const renderRatingStars = () => {
    const safeRating = rating || 0
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < Math.floor(safeRating) ? 'star filled' : 'star'}
      />
    ))
  }

  const getStockStatus = () => {
    const safeStock = stock || 0
    if (safeStock === 0) return { text: 'Out of Stock', class: 'out-of-stock' }
    if (safeStock < 10) return { text: `Only ${safeStock} left`, class: 'low-stock' }
    return { text: 'In Stock', class: 'in-stock' }
  }

  const stockStatus = getStockStatus()

  const getSeasonalColor = () => {
    const colors = {
      spring: '#4caf50',
      summer: '#ff9800',
      autumn: '#795548',
      winter: '#2196f3'
    }
    return colors[seasonal] || '#666'
  }

  // Safe values for rendering
  const safePrice = typeof price === 'number' ? price : 0
  const safeOriginalPrice = typeof originalPrice === 'number' ? originalPrice : 0
  const safeDiscount = typeof discount === 'number' ? discount : 0
  const safeRating = typeof rating === 'number' ? rating : 0
  const safeReviewCount = typeof reviewCount === 'number' ? reviewCount : 0
  const safeStock = typeof stock === 'number' ? stock : 0

  return (
    <div className={`product-card ${variant} ${safeStock === 0 ? 'out-of-stock' : ''}`}>
      {/* Product Image */}
      <div className="product-image-container">
        <Link to={`/products/${id}`} className="product-image-link">
          {!imageError ? (
            <>
              <img
                src={image}
                alt={name}
                className={`product-image ${imageLoaded ? 'loaded' : 'loading'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              {!imageLoaded && <div className="image-skeleton"></div>}
            </>
          ) : (
            <div className="image-placeholder">
              <FaSeedling />
              <span>Image not available</span>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="product-badges">
          {organic && (
            <span className="badge organic">
              <FaLeaf />
              Organic
            </span>
          )}
          {safeDiscount > 0 && (
            <span className="badge discount">
              -{safeDiscount}%
            </span>
          )}
          {seasonal && (
            <span 
              className="badge seasonal"
              style={{ backgroundColor: getSeasonalColor() }}
            >
              {seasonal}
            </span>
          )}
          {safeStock === 0 && (
            <span className="badge out-of-stock-badge">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {showActions && safeStock > 0 && (
          <div className="quick-actions">
            <button 
              className="action-btn wishlist-btn"
              onClick={handleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <Link 
              to={`/products/${id}`}
              className="action-btn view-btn"
              aria-label="View product details"
            >
              <FaEye />
            </Link>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category */}
        {category && category !== 'uncategorized' && (
          <div className="product-category">{category}</div>
        )}
        
        {/* Name */}
        <h3 className="product-name">
          <Link to={`/products/${id}`}>{name}</Link>
        </h3>

        {/* Description */}
        {showDescription && description && (
          <p className="product-description">
            {description.length > 80 ? `${description.substring(0, 80)}...` : description}
          </p>
        )}

        {/* Rating */}
        {safeRating > 0 && (
          <div className="product-rating">
            <div className="stars">
              {renderRatingStars()}
            </div>
            <span className="rating-value">{safeRating.toFixed(1)}</span>
            {safeReviewCount > 0 && (
              <span className="review-count">({safeReviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="product-price">
          {safeOriginalPrice && safeOriginalPrice > safePrice ? (
            <>
              <span className="current-price">${safePrice.toFixed(2)}</span>
              <span className="original-price">${safeOriginalPrice.toFixed(2)}</span>
              {safeDiscount > 0 && (
                <span className="discount-amount">
                  Save ${(safeOriginalPrice - safePrice).toFixed(2)}
                </span>
              )}
            </>
          ) : (
            <span className="current-price">${safePrice.toFixed(2)}</span>
          )}
          <span className="price-unit">/{unit}</span>
        </div>

        {/* Stock Status */}
        <div className={`stock-status ${stockStatus.class}`}>
          {stockStatus.text}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="product-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="product-actions">
            {safeStock > 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={safeStock === 0}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            ) : (
              <button className="notify-btn" disabled>
                Notify When Available
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard