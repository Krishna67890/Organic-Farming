import React, { useState } from 'react'
import { FaLeaf, FaEnvelope } from 'react-icons/fa'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Simulate subscription
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <FaLeaf className="newsletter-icon" />
            <h2>Stay Connected with Nature's Best</h2>
            <p>
              Subscribe to our newsletter and get weekly updates on fresh harvests, 
              seasonal offers, and organic farming tips delivered straight to your inbox.
            </p>
          </div>
          
          <div className="newsletter-form-container">
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
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
                <span>Thank you for subscribing to our organic journey!</span>
              </div>
            )}
            
            <p className="newsletter-note">
              We respect your privacy. No spam, just pure organic goodness.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter