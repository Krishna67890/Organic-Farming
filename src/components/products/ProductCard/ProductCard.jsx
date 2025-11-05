import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaShoppingCart, FaLeaf, FaStar, FaEye, FaSeedling } from "react-icons/fa"
import { useCart } from "../../../context/CartContext" // Fixed path - go up 3 levels
import { useAuth } from "../../../context/AuthContext" // Fixed path - go up 3 levels
import "./ProductCard.css"

const ProductCard = ({ 
  product, 
  onQuickAdd, 
  variant = 'default',
  showActions = true,
  showDescription = true 
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()
  const { user } = useAuth()

  const {
    id,
    name,
    price,
    originalPrice,
    image,
    category,
    organic,
    seasonal,
    rating,
    reviewCount,
    description,
    stock,
    discount,
    tags = [],
    unit = 'kg'
  } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const cartItem = {
      id,
      name,
      price,
      image,
      quantity: 1,
      unit
    }
    
    addToCart(cartItem)
    onQuickAdd?.(cartItem)
    
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
    // Here you would typically make an API call to update wishlist
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const renderRatingStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar 
        key={index} 
        className={index < Math.floor(rating) ? 'star filled' : 'star'}
      />
    ))
  }

  const getStockStatus = () => {
    if (stock === 0) return { text: 'Out of Stock', class: 'out-of-stock' }
    if (stock < 10) return { text: `Only ${stock} left`, class: 'low-stock' }
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

  return (
    <div className={`product-card ${variant} ${stock === 0 ? 'out-of-stock' : ''}`}>
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
          {discount > 0 && (
            <span className="badge discount">
              -{discount}%
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
          {stock === 0 && (
            <span className="badge out-of-stock-badge">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick Actions */}
        {showActions && stock > 0 && (
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
        <div className="product-category">{category}</div>
        
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
        {rating > 0 && (
          <div className="product-rating">
            <div className="stars">
              {renderRatingStars()}
            </div>
            <span className="rating-value">{rating.toFixed(1)}</span>
            {reviewCount > 0 && (
              <span className="review-count">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="product-price">
          {originalPrice && originalPrice > price ? (
            <>
              <span className="current-price">${price.toFixed(2)}</span>
              <span className="original-price">${originalPrice.toFixed(2)}</span>
              {discount > 0 && (
                <span className="discount-amount">
                  Save ${(originalPrice - price).toFixed(2)}
                </span>
              )}
            </>
          ) : (
            <span className="current-price">${price.toFixed(2)}</span>
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
            {stock > 0 ? (
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={stock === 0}
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