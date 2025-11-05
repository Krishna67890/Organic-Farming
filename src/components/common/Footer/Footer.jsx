import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLeaf, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaPinterest,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaSeedling,
  FaRecycle,
  FaTruck,
  FaShieldAlt,
  FaArrowUp,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaCcAmex
} from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Check scroll position for back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      // Simulate subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { path: '/products', label: 'All Products' },
    { path: '/farming', label: 'Farming Methods' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' }
  ]

  const categories = [
    { path: '/products?category=vegetables', label: 'Vegetables' },
    { path: '/products?category=fruits', label: 'Fruits' },
    { path: '/products?category=herbs', label: 'Herbs' },
    { path: '/products?category=dairy', label: 'Dairy & Eggs' },
    { path: '/products?category=other', label: 'Other Products' }
  ]

  const policies = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/shipping', label: 'Shipping Policy' },
    { path: '/returns', label: 'Return Policy' },
    { path: '/faq', label: 'FAQ' }
  ]

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: '123 Organic Way, Sustainable City, SC 12345' },
    { icon: FaPhone, text: '+1 (555) 123-4567' },
    { icon: FaEnvelope, text: 'sayalimore@greenvalleyorganic.com' },
    { icon: FaClock, text: 'Mon-Fri: 8:00 AM - 6:00 PM' }
  ]

  const socialLinks = [
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaPinterest, url: '#', label: 'Pinterest' }
  ]

  const paymentMethods = [
    { icon: FaCcVisa, label: 'Visa' },
    { icon: FaCcMastercard, label: 'Mastercard' },
    { icon: FaCcPaypal, label: 'PayPal' },
    { icon: FaCcApplePay, label: 'Apple Pay' },
    { icon: FaCcAmex, label: 'American Express' }
  ]

  const trustBadges = [
    { icon: FaLeaf, text: 'USDA Organic Certified' },
    { icon: FaSeedling, text: 'Non-GMO Project Verified' },
    { icon: FaRecycle, text: 'Sustainable Farming' },
    { icon: FaTruck, text: 'Carbon Neutral Delivery' },
    { icon: FaShieldAlt, text: 'Quality Guarantee' }
  ]

  return (
    <footer className="footer">
      {/* Trust Badges Bar */}
      <div className="trust-badges-bar">
        <div className="container">
          <div className="trust-badges">
            {trustBadges.map((badge, index) => {
              const BadgeIcon = badge.icon
              return (
                <div key={index} className="trust-badge">
                  <BadgeIcon className="badge-icon" />
                  <span>{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-content">
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <Link to="/" className="footer-logo">
                <FaLeaf className="logo-icon" />
                <div className="logo-text">
                  <span className="logo-primary">Green Valley</span>
                  <span className="logo-secondary">Organic Farm</span>
                </div>
              </Link>
              
              <p className="footer-description">
                Growing fresh, organic produce using sustainable farming practices since 2010. 
                Delivering nature's best to your doorstep with love and care.
              </p>

              {/* Social Links */}
              <div className="social-section">
                <h4>Follow Our Journey</h4>
                <div className="social-links">
                  {socialLinks.map((social, index) => {
                    const SocialIcon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className="social-link"
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-title">Quick Links</h3>
              <div className="footer-links">
                {quickLinks.map((link, index) => (
                  <Link key={index} to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3 className="section-title">Categories</h3>
              <div className="footer-links">
                {categories.map((category, index) => (
                  <Link key={index} to={category.path} className="footer-link">
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="footer-section contact-section">
              <h3 className="section-title">Contact Info</h3>
              <div className="contact-info">
                {contactInfo.map((contact, index) => {
                  const ContactIcon = contact.icon
                  return (
                    <div key={index} className="contact-item">
                      <ContactIcon className="contact-icon" />
                      <span>{contact.text}</span>
                    </div>
                  )
                })}
                {/* Sayali More Email */}
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>sayalimore@greenvalleyorganic.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-section newsletter-section">
              <h3 className="section-title">Stay Updated</h3>
              <p className="newsletter-description">
                Subscribe to our newsletter for farm updates, seasonal offers, and organic living tips.
              </p>
              
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe
                  </button>
                </div>
              </form>

              {isSubscribed && (
                <div className="subscription-success">
                  <FaLeaf />
                  <span>Thank you for subscribing!</span>
                </div>
              )}

              {/* Payment Methods */}
              <div className="payment-methods">
                <h4>We Accept</h4>
                <div className="payment-icons">
                  {paymentMethods.map((payment, index) => {
                    const PaymentIcon = payment.icon
                    return (
                      <div key={index} className="payment-icon" title={payment.label}>
                        <PaymentIcon />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 Green Valley Organic Farm. All rights reserved. by Krishna Patil rajput</p>
            </div>
            
            <div className="footer-policies">
              {policies.map((policy, index) => (
                <Link key={index} to={policy.path} className="policy-link">
                  {policy.label}
                </Link>
              ))}
            </div>

            <div className="footer-stats">
              <span>🌱 Proudly serving organic goodness since 2010</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  )
}

export default Footer