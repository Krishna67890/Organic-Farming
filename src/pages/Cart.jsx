import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaShoppingBag, 
  FaArrowLeft, 
  FaSeedling, 
  FaLeaf, 
  FaTruck, 
  FaRecycle, 
  FaCreditCard, 
  FaLock, 
  FaExclamationTriangle,
  FaShieldAlt,
  FaQrcode,
  FaMobile,
  FaCreditCard as FaCard,
  FaMoneyBillWave,
  FaBitcoin
} from "react-icons/fa";
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/common/Loading/Loading'
import EmptyState from '../components/common/EmptyState/EmptyState'
import './Cart.css'

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    isUpdating 
  } = useCart()
  
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [showConfirmClear, setShowConfirmClear] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Mock suggested products
  const mockSuggestedProducts = [
    {
      id: 101,
      name: "Organic Honey",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1587049352846-4a78e9f5216e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "other"
    },
    {
      id: 102,
      name: "Fresh Basil",
      price: 3.49,
      image: "https://images.unsplash.com/photo-1618375569909-3c8616cf6c9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "herbs"
    },
    {
      id: 103,
      name: "Organic Potatoes",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "vegetables"
    }
  ]

  // Payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FaCard },
    { id: 'upi', name: 'UPI Payment', icon: FaMobile },
    { id: 'qr', name: 'QR Code', icon: FaQrcode },
    { id: 'cod', name: 'Cash on Delivery', icon: FaMoneyBillWave },
    { id: 'crypto', name: 'Cryptocurrency', icon: FaBitcoin }
  ]

  useEffect(() => {
    // Simulate loading suggested products
    setTimeout(() => {
      setSuggestedProducts(mockSuggestedProducts)
    }, 1000)
  }, [])

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax - discount

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ORGANIC10') {
      setDiscount(subtotal * 0.1) // 10% discount
      setCouponApplied(true)
    } else {
      alert('Invalid coupon code. Try "ORGANIC10" for 10% off!')
    }
  }

  const handleCheckout = async () => {
    if (!user) {
      navigate('/auth?redirect=checkout')
      return
    }

    setShowPaymentModal(true)
  }

  const handlePayment = (method) => {
    setSelectedPaymentMethod(method)
    setIsCheckingOut(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsCheckingOut(false)
      setPaymentSuccess(true)
      
      // Clear cart after successful payment
      setTimeout(() => {
        clearCart()
        setShowPaymentModal(false)
        setPaymentSuccess(false)
        navigate('/order-success')
      }, 3000)
    }, 3000)
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  const handleClearCart = () => {
    clearCart()
    setShowConfirmClear(false)
  }

  const getSavings = () => {
    return cartItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price) * item.quantity
      }
      return total
    }, 0)
  }

  const savings = getSavings()

  // Fake QR Code Component
  const FakeQRCode = () => (
    <div className="fake-qr-code">
      <div className="qr-container">
        <div className="qr-pattern">
          <div className="qr-corner top-left"></div>
          <div className="qr-corner top-right"></div>
          <div className="qr-corner bottom-left"></div>
          <div className="qr-grid">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`qr-cell ${Math.random() > 0.5 ? 'filled' : ''}`}></div>
            ))}
          </div>
        </div>
        <div className="qr-text">
          <FaQrcode className="qr-icon" />
          <p>Scan to Pay ₹{(total * 83).toFixed(2)}</p>
          <small>UPI ID: greenvalleyorganic@paytm</small>
        </div>
      </div>
    </div>
  )

  // Fake Card Payment Form
  const FakeCardPayment = () => (
    <div className="fake-card-payment">
      <div className="card-form">
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" value="4242 4242 4242 4242" readOnly />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="text" value="12/25" readOnly />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="text" value="123" readOnly />
          </div>
        </div>
        <div className="form-group">
          <label>Cardholder Name</label>
          <input type="text" value="JOHN DOE" readOnly />
        </div>
      </div>
    </div>
  )

  // Fake UPI Payment
  const FakeUPIPayment = () => (
    <div className="fake-upi-payment">
      <div className="upi-methods">
        <div className="upi-option">
          <img src="/icons/gpay.png" alt="Google Pay" />
          <span>Google Pay</span>
        </div>
        <div className="upi-option">
          <img src="/icons/phonepe.png" alt="PhonePe" />
          <span>PhonePe</span>
        </div>
        <div className="upi-option">
          <img src="/icons/paytm.png" alt="Paytm" />
          <span>Paytm</span>
        </div>
        <div className="upi-option">
          <img src="/icons/bhim.png" alt="BHIM UPI" />
          <span>BHIM UPI</span>
        </div>
      </div>
      <div className="upi-id">
        <strong>UPI ID:</strong> greenvalleyorganic@okhdfcbank
      </div>
    </div>
  )

  // Fake Crypto Payment
  const FakeCryptoPayment = () => (
    <div className="fake-crypto-payment">
      <div className="crypto-address">
        <label>Bitcoin Address</label>
        <div className="address-box">
          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
        </div>
      </div>
      <div className="crypto-amount">
        <label>Amount</label>
        <div className="amount-box">
          {(total * 0.000025).toFixed(6)} BTC
        </div>
      </div>
      <div className="crypto-note">
        <FaExclamationTriangle />
        <small>Payment will be confirmed after 3 network confirmations</small>
      </div>
    </div>
  )

  if (isUpdating) {
    return (
      <div className="cart-page">
        <div className="container">
          <Loading message="Updating cart..." />
        </div>
      </div>
    )
  }

  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="cart-page">
        <div className="container">
          <EmptyState
            icon={<FaShoppingBag />}
            title="Your cart is empty"
            message="Discover our fresh organic products and start filling your cart with nature's goodness."
            action={{
              label: 'Start Shopping',
              onClick: handleContinueShopping
            }}
          />
          
          {/* Suggested Products */}
          {suggestedProducts.length > 0 && (
            <section className="suggested-products">
              <h2>You might also like</h2>
              <div className="suggested-grid">
                {suggestedProducts.map(product => (
                  <div key={product.id} className="suggested-product">
                    <img src={product.image} alt={product.name} />
                    <div className="suggested-info">
                      <h4>{product.name}</h4>
                      <p>${product.price.toFixed(2)}</p>
                      <button 
                        className="btn-secondary"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={handleContinueShopping}
            >
              <FaArrowLeft />
              Continue Shopping
            </button>
            <h1>Shopping Cart</h1>
          </div>
          <div className="header-right">
            <button 
              className="clear-cart-btn"
              onClick={() => setShowConfirmClear(true)}
            >
              <FaTrash />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            <div className="section-header">
              <h2>
                Your Items ({cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'})
              </h2>
              {savings > 0 && (
                <div className="savings-badge">
                  <FaLeaf />
                  You're saving ${savings.toFixed(2)}
                </div>
              )}
            </div>

            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                    {item.organic && (
                      <span className="organic-badge">
                        <FaSeedling />
                        Organic
                      </span>
                    )}
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h3>
                    <p className="item-category">{item.category}</p>
                    
                    {item.unit && (
                      <p className="item-unit">Sold per {item.unit}</p>
                    )}

                    <div className="item-price">
                      ${item.price.toFixed(2)}
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="original-price">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="item-total">
                    <div className="total-amount">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <FaTruck />
                <span>Free shipping over $50</span>
              </div>
              <div className="trust-badge">
                <FaShieldAlt />
                <span>Quality guarantee</span>
              </div>
              <div className="trust-badge">
                <FaRecycle />
                <span>Eco-friendly packaging</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>

              {/* Pricing Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal ({cartItemsCount} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="price-row savings">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                {discount > 0 && (
                  <div className="price-row discount">
                    <span>Coupon Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="price-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="price-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="price-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="coupon-section">
                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={couponApplied ? 'applied' : ''}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {!couponApplied && (
                  <p className="coupon-hint">Try "ORGANIC10" for 10% off</p>
                )}
              </div>

              {/* Checkout Button */}
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <Loading size="small" />
                ) : (
                  <>
                    <FaCreditCard />
                    Proceed to Checkout
                    <span>${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="security-notice">
                <FaLock />
                <span>Your payment information is secure and encrypted</span>
              </div>

              {/* Delivery Estimate */}
              <div className="delivery-estimate">
                <FaTruck />
                <div>
                  <strong>Estimated delivery</strong>
                  <p>2-3 business days</p>
                </div>
              </div>
            </div>

            {/* Suggested Products Sidebar */}
            {suggestedProducts.length > 0 && (
              <div className="suggested-sidebar">
                <h3>Add these to your order</h3>
                <div className="suggested-list">
                  {suggestedProducts.map(product => (
                    <div key={product.id} className="suggested-item">
                      <img src={product.image} alt={product.name} />
                      <div className="suggested-details">
                        <h4>{product.name}</h4>
                        <p>${product.price.toFixed(2)}</p>
                        <button 
                          className="add-suggested-btn"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="modal-overlay">
            <div className="payment-modal">
              {paymentSuccess ? (
                <div className="payment-success">
                  <div className="success-icon">
                    <FaShieldAlt />
                  </div>
                  <h3>Payment Successful!</h3>
                  <p>Thank you for your order. Your payment has been processed successfully.</p>
                  <div className="order-details">
                    <p><strong>Order Total:</strong> ${total.toFixed(2)}</p>
                    <p><strong>Payment Method:</strong> {selectedPaymentMethod}</p>
                  </div>
                  <Loading message="Redirecting to order confirmation..." />
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <h3>Complete Your Payment</h3>
                    <p>Total Amount: <strong>${total.toFixed(2)}</strong></p>
                  </div>

                  <div className="payment-methods">
                    {paymentMethods.map(method => {
                      const MethodIcon = method.icon
                      return (
                        <div
                          key={method.id}
                          className={`payment-method ${selectedPaymentMethod === method.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <MethodIcon />
                          <span>{method.name}</span>
                        </div>
                      )
                    })}
                  </div>

                  {selectedPaymentMethod === 'qr' && <FakeQRCode />}
                  {selectedPaymentMethod === 'card' && <FakeCardPayment />}
                  {selectedPaymentMethod === 'upi' && <FakeUPIPayment />}
                  {selectedPaymentMethod === 'crypto' && <FakeCryptoPayment />}

                  {selectedPaymentMethod && (
                    <div className="payment-actions">
                      <button
                        className="btn-secondary"
                        onClick={() => setShowPaymentModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-primary"
                        onClick={() => handlePayment(selectedPaymentMethod)}
                        disabled={isCheckingOut}
                      >
                        {isCheckingOut ? (
                          <Loading size="small" />
                        ) : (
                          `Pay $${total.toFixed(2)}`
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Confirm Clear Cart Modal */}
        {showConfirmClear && (
          <div className="modal-overlay">
            <div className="confirmation-modal">
              <div className="modal-header">
                <FaExclamationTriangle className="warning-icon" />
                <h3>Clear Shopping Cart?</h3>
              </div>
              <p>Are you sure you want to remove all items from your cart? This action cannot be undone.</p>
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowConfirmClear(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-danger"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart