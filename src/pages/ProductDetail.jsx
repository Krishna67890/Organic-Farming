import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart, 
  FaShare, 
  FaLeaf, 
  FaSeedling,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaTruck,
  FaShield,
  FaRecycle,
  FaChevronLeft,
  FaChevronRight,
  FaMinus,
  FaPlus,
  FaCheck,
  FaUtensils,
  FaCalendar,
  FaWeight,
  FaExpand,
  FaPlay
} from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/common/Loading/Loading'
import ProductCard from '../components/products/ProductCard/ProductCard'
import './ProductDetail.css'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [relatedProducts, setRelatedProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [imageZoom, setImageZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Mock product data - in real app, this would come from API
  const mockProduct = {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    price: 4.99,
    originalPrice: 6.99,
    images: [
      "/images/products/tomatoes-1.jpg",
      "/images/products/tomatoes-2.jpg",
      "/images/products/tomatoes-3.jpg",
      "/images/products/tomatoes-4.jpg"
    ],
    category: "vegetables",
    subcategory: "tomatoes",
    organic: true,
    seasonal: "summer",
    unit: "lb",
    weight: "1 lb",
    description: "Our organic heirloom tomatoes are grown using sustainable farming practices without synthetic pesticides or fertilizers. Each tomato is hand-picked at peak ripeness for maximum flavor and nutritional value.",
    features: [
      "Certified Organic",
      "Non-GMO",
      "Heirloom Variety",
      "Rich in Lycopene",
      "Vitamin C & K Source"
    ],
    nutritionalInfo: {
      calories: "22 per 100g",
      protein: "1.1g",
      carbs: "4.8g",
      fiber: "1.5g",
      vitamins: ["A", "C", "K"],
      minerals: ["Potassium", "Manganese"]
    },
    storageTips: "Store at room temperature away from direct sunlight. Do not refrigerate as it affects flavor and texture.",
    preparation: "Perfect for salads, sandwiches, sauces, or simply sliced with a sprinkle of sea salt.",
    season: "June - September",
    farmLocation: "Field 3, South Plot",
    harvestDate: "2024-07-15",
    rating: 4.7,
    reviewCount: 128,
    stock: 25,
    tags: ["organic", "heirloom", "summer", "fresh", "local"],
    sku: "ORG-TOM-001",
    farmer: {
      name: "Sarah Johnson",
      experience: "15 years",
      specialty: "Heirloom Vegetables"
    }
  }

  // Mock reviews
  const mockReviews = [
    {
      id: 1,
      user: "Emily Chen",
      rating: 5,
      date: "2024-07-20",
      comment: "The most flavorful tomatoes I've ever tasted! Sweet, juicy, and perfect for my caprese salad.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      rating: 4,
      date: "2024-07-18",
      comment: "Great quality and fresh. A bit pricey but worth it for the organic quality.",
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: "Lisa Thompson",
      rating: 5,
      date: "2024-07-15",
      comment: "Perfect for making homemade pasta sauce. The flavor is incredible!",
      verified: false,
      helpful: 5
    }
  ]

  // Mock related products
  const mockRelatedProducts = [
    {
      id: 2,
      name: "Fresh Organic Basil",
      price: 3.49,
      image: "/images/products/basil.jpg",
      category: "herbs",
      organic: true,
      rating: 4.5,
      seasonal: "summer"
    },
    {
      id: 3,
      name: "Organic Garlic",
      price: 2.99,
      image: "/images/products/garlic.jpg",
      category: "vegetables",
      organic: true,
      rating: 4.8,
      seasonal: "all"
    },
    {
      id: 4,
      name: "Organic Cucumbers",
      price: 3.99,
      image: "/images/products/cucumbers.jpg",
      category: "vegetables",
      organic: true,
      rating: 4.6,
      seasonal: "summer"
    },
    {
      id: 5,
      name: "Organic Bell Peppers",
      price: 5.49,
      image: "/images/products/peppers.jpg",
      category: "vegetables",
      organic: true,
      rating: 4.4,
      seasonal: "summer"
    }
  ]

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProduct(mockProduct)
        setReviews(mockReviews)
        setRelatedProducts(mockRelatedProducts)
      } catch (err) {
        setError('Failed to load product')
        console.error('Error loading product:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // Image navigation
  const nextImage = () => {
    setSelectedImage(prev => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length)
  }

  // Quantity handlers
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock))
  }

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1))
  }

  // Add to cart
  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      unit: product.unit
    }

    addToCart(cartItem)
    
    // Show success feedback
    const button = document.querySelector('.add-to-cart-btn')
    if (button) {
      button.classList.add('added')
      setTimeout(() => button.classList.remove('added'), 2000)
    }
  }

  // Wishlist toggle
  const toggleWishlist = () => {
    if (!user) {
      // Redirect to login or show login modal
      navigate('/auth?redirect=' + window.location.pathname)
      return
    }
    setIsWishlisted(!isWishlisted)
  }

  // Share product
  const shareProduct = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Product link copied to clipboard!')
    }
  }

  // Image zoom
  const handleImageZoom = (e) => {
    if (!imageZoom) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Render rating stars
  const renderRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />)
      } else {
        stars.push(<FaRegStar key={i} className="star" />)
      }
    }

    return stars
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <Loading message="Loading product details..." />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error-state">
            <h2>Product Not Found</h2>
            <p>Sorry, we couldn't find the product you're looking for.</p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          {/* Product Images */}
          <div className="product-images">
            <div 
              className="main-image-container"
              onMouseEnter={() => setImageZoom(true)}
              onMouseLeave={() => setImageZoom(false)}
              onMouseMove={handleImageZoom}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className={`main-image ${imageZoom ? 'zoomed' : ''}`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                }}
              />
              
              {/* Image Navigation */}
              <button className="nav-btn prev" onClick={prevImage}>
                <FaChevronLeft />
              </button>
              <button className="nav-btn next" onClick={nextImage}>
                <FaChevronRight />
              </button>

              {/* Badges */}
              <div className="image-badges">
                {product.organic && (
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
                {product.seasonal && (
                  <span className="badge seasonal">
                    {product.seasonal}
                  </span>
                )}
              </div>

              {/* Zoom Indicator */}
              {imageZoom && (
                <div className="zoom-indicator">
                  <FaExpand />
                  <span>Scroll to zoom</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-meta">
                <span className="category">{product.category}</span>
                <span className="sku">SKU: {product.sku}</span>
              </div>

              {/* Rating */}
              <div className="product-rating">
                <div className="stars">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="rating-value">{product.rating}</span>
                <span className="review-count">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="product-price">
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="current-price">${product.price.toFixed(2)}</span>
                {discount > 0 && (
                  <span className="discount-badge">Save {discount}%</span>
                )}
                <span className="price-unit">/{product.unit}</span>
              </div>

              {/* Stock Status */}
              <div className="stock-status">
                {product.stock > 10 ? (
                  <span className="in-stock">
                    <FaCheck />
                    In Stock ({product.stock} available)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="low-stock">
                    <FaCheck />
                    Only {product.stock} left in stock
                  </span>
                ) : (
                  <span className="out-of-stock">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Product Description */}
            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Features */}
            <div className="product-features">
              <h3>Key Features</h3>
              <div className="features-grid">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FaCheck />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Info */}
            <div className="farmer-info">
              <h3>Meet Your Farmer</h3>
              <div className="farmer-details">
                <div className="farmer-avatar">
                  <FaSeedling />
                </div>
                <div className="farmer-content">
                  <h4>{product.farmer.name}</h4>
                  <p>{product.farmer.experience} of experience</p>
                  <span className="specialty">Specialty: {product.farmer.specialty}</span>
                </div>
              </div>
            </div>

            {/* Purchase Controls */}
            <div className="purchase-controls">
              {/* Quantity Selector */}
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="quantity-unit">{product.unit}</span>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart />
                  Add to Cart
                  <span className="price-display">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </button>

                <div className="secondary-actions">
                  <button 
                    className="wishlist-btn"
                    onClick={toggleWishlist}
                  >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                  </button>
                  <button 
                    className="share-btn"
                    onClick={shareProduct}
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <FaTruck />
                <span>Free shipping over $50</span>
              </div>
              <div className="trust-badge">
                <FaShield />
                <span>Quality guarantee</span>
              </div>
              <div className="trust-badge">
                <FaRecycle />
                <span>Eco-friendly packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewCount})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'farm' ? 'active' : ''}`}
              onClick={() => setActiveTab('farm')}
            >
              Farm Info
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <h3>Product Details</h3>
                <p>{product.description}</p>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <FaUtensils />
                    <div>
                      <strong>Preparation</strong>
                      <p>{product.preparation}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaCalendar />
                    <div>
                      <strong>Season</strong>
                      <p>{product.season}</p>
                    </div>
                  </div>
                  <div className="detail-item">
                    <FaWeight />
                    <div>
                      <strong>Storage</strong>
                      <p>{product.storageTips}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="tab-panel">
                <h3>Nutritional Information</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="label">Calories</span>
                    <span className="value">{product.nutritionalInfo.calories}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="label">Protein</span>
                    <span className="value">{product.nutritionalInfo.protein}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="label">Carbohydrates</span>
                    <span className="value">{product.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="label">Fiber</span>
                    <span className="value">{product.nutritionalInfo.fiber}</span>
                  </div>
                </div>
                
                <div className="vitamins-minerals">
                  <h4>Rich in Vitamins & Minerals</h4>
                  <div className="nutrient-tags">
                    {product.nutritionalInfo.vitamins.map(vitamin => (
                      <span key={vitamin} className="nutrient-tag">Vitamin {vitamin}</span>
                    ))}
                    {product.nutritionalInfo.minerals.map(mineral => (
                      <span key={mineral} className="nutrient-tag">{mineral}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="tab-panel">
                <div className="reviews-header">
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <span className="rating-number">{product.rating}</span>
                      <div className="stars">
                        {renderRatingStars(product.rating)}
                      </div>
                      <span className="total-reviews">{product.reviewCount} reviews</span>
                    </div>
                  </div>
                  <button className="write-review-btn">
                    Write a Review
                  </button>
                </div>

                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <span className="reviewer-name">{review.user}</span>
                          {review.verified && (
                            <span className="verified-badge">Verified Purchase</span>
                          )}
                        </div>
                        <div className="review-meta">
                          <div className="review-rating">
                            {renderRatingStars(review.rating)}
                          </div>
                          <span className="review-date">{formatDate(review.date)}</span>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <div className="review-helpful">
                        <span>Helpful? ({review.helpful})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'farm' && (
              <div className="tab-panel">
                <h3>Farm Information</h3>
                <div className="farm-details">
                  <div className="farm-item">
                    <strong>Location:</strong>
                    <span>{product.farmLocation}</span>
                  </div>
                  <div className="farm-item">
                    <strong>Harvest Date:</strong>
                    <span>{formatDate(product.harvestDate)}</span>
                  </div>
                  <div className="farm-item">
                    <strong>Farmer:</strong>
                    <span>{product.farmer.name}</span>
                  </div>
                  <div className="farm-item">
                    <strong>Experience:</strong>
                    <span>{product.farmer.experience}</span>
                  </div>
                </div>
                
                <div className="farming-practices">
                  <h4>Our Farming Practices</h4>
                  <div className="practices-grid">
                    <div className="practice-item">
                      <FaLeaf />
                      <span>Organic Certified</span>
                    </div>
                    <div className="practice-item">
                      <FaRecycle />
                      <span>Sustainable Methods</span>
                    </div>
                    <div className="practice-item">
                      <FaSeedling />
                      <span>Non-GMO</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-products-grid">
            {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={addToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductDetail