import React, { useState, useEffect, useRef } from 'react'
import { 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaStar, 
  FaStarHalfAlt,
  FaRegStar,
  FaLeaf,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaSeedling,
  FaUserCircle
} from 'react-icons/fa'
import './Testimonials.css'

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const testimonialsRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Organic Food Blogger",
      location: "Portland, OR",
      rating: 5,
      text: "The quality of produce from Organic Farm is exceptional. Every vegetable tastes like it's straight from the garden. Their commitment to sustainable farming is truly inspiring!",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: true,
      purchase: "Weekly Vegetable Box",
      duration: "2 years"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Chef & Restaurant Owner",
      location: "San Francisco, CA",
      rating: 4.5,
      text: "As a chef, ingredient quality is everything. Organic Farm consistently delivers the freshest, most flavorful produce I've ever worked with. My customers can taste the difference.",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: false,
      purchase: "Professional Kitchen Package",
      duration: "1 year"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Health Coach",
      location: "Austin, TX",
      rating: 5,
      text: "I recommend Organic Farm to all my clients. The nutritional quality of their produce is unmatched. Plus, their eco-friendly packaging shows they truly care about the planet.",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: true,
      purchase: "Organic Smoothie Pack",
      duration: "8 months"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Family Man",
      location: "Denver, CO",
      rating: 5,
      text: "My kids actually eat vegetables now! The taste is so much better than store-bought. We've been customers for over a year and the quality never disappoints.",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: false,
      purchase: "Family Nutrition Box",
      duration: "1.5 years"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Yoga Instructor",
      location: "Seattle, WA",
      rating: 4.5,
      text: "The energy in this food is incredible. You can feel the love and care that goes into growing it. My yoga students love when I share recipes using Organic Farm ingredients.",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: true,
      purchase: "Wellness Bundle",
      duration: "6 months"
    },
    {
      id: 6,
      name: "Robert Williams",
      role: "Retired Gardener",
      location: "Asheville, NC",
      rating: 5,
      text: "After 40 years of gardening, I know quality when I see it. These folks are doing it right - proper soil care, heirloom varieties, and harvest timing. Simply outstanding!",
      image: "/api/placeholder/100/100",
      verified: true,
      featured: false,
      purchase: "Heirloom Collection",
      duration: "3 years"
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
      { threshold: 0.3 }
    )

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current)
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current)
      }
    }
  }, [])

  // Auto-play testimonials
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying, testimonials.length])

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setActiveTestimonial(index)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star full" />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />)
    }

    return stars
  }

  const getStats = () => {
    const totalRatings = testimonials.reduce((sum, t) => sum + t.rating, 0)
    const averageRating = (totalRatings / testimonials.length).toFixed(1)
    const fiveStarReviews = testimonials.filter(t => t.rating === 5).length
    const verifiedReviews = testimonials.filter(t => t.verified).length

    return { averageRating, fiveStarReviews, verifiedReviews }
  }

  const stats = getStats()

  return (
    <section className="testimonials-section" ref={testimonialsRef}>
      <div className="container">
        {/* Header */}
        <div className="testimonials-header">
          <div className="header-content">
            <div className="title-section">
              <div className="section-badge">
                <FaLeaf />
                <span>Customer Love</span>
              </div>
              <h2 className="section-title">
                Hear From Our <span className="highlight">Happy Community</span>
              </h2>
              <p className="section-subtitle">
                Join thousands of satisfied customers who have experienced the difference 
                of truly organic, sustainably grown produce.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{stats.averageRating}</div>
                <div className="stat-label">Average Rating</div>
                <div className="stat-stars">
                  {renderStars(stats.averageRating)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.fiveStarReviews}+</div>
                <div className="stat-label">5-Star Reviews</div>
                <div className="stat-icon">⭐</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.verifiedReviews}</div>
                <div className="stat-label">Verified Buyers</div>
                <div className="stat-icon">✅</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Testimonials Carousel */}
        <div className="testimonials-carousel">
          {/* Featured Testimonial */}
          <div className="featured-testimonial">
            <div className={`testimonial-card featured ${isVisible ? 'animate-in' : ''}`}>
              <div className="card-background">
                <div className="bg-pattern"></div>
                <div className="bg-glow"></div>
              </div>

              {/* Quote Marks */}
              <div className="quote-marks">
                <FaQuoteLeft className="quote-left" />
                <FaQuoteRight className="quote-right" />
              </div>

              {/* Content */}
              <div className="testimonial-content">
                <div className="rating-section">
                  {renderStars(testimonials[activeTestimonial].rating)}
                  <span className="rating-text">
                    {testimonials[activeTestimonial].rating}/5 Rating
                  </span>
                </div>

                <blockquote className="testimonial-text">
                  {testimonials[activeTestimonial].text}
                </blockquote>

                <div className="testimonial-author">
                  <div className="author-image">
                    {testimonials[activeTestimonial].image ? (
                      <img 
                        src={testimonials[activeTestimonial].image} 
                        alt={testimonials[activeTestimonial].name}
                      />
                    ) : (
                      <FaUserCircle />
                    )}
                    {testimonials[activeTestimonial].verified && (
                      <div className="verified-badge">
                        <FaLeaf />
                      </div>
                    )}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="author-role">
                      {testimonials[activeTestimonial].role}
                    </p>
                    <div className="author-meta">
                      <span className="location">
                        {testimonials[activeTestimonial].location}
                      </span>
                      <span className="purchase">
                        {testimonials[activeTestimonial].purchase}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="decorative-elements">
                <div className="element leaf-1">
                  <FaLeaf />
                </div>
                <div className="element leaf-2">
                  <FaSeedling />
                </div>
                <div className="element leaf-3">
                  <FaLeaf />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="carousel-controls">
            <div className="nav-controls">
              <button 
                className="nav-btn prev"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <FaArrowLeft />
              </button>
              
              <button 
                className={`play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              <button 
                className="nav-btn next"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <FaArrowRight />
              </button>
            </div>

            <div className="progress-indicator">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`progress-dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`testimonial-card small ${isVisible ? 'animate-in' : ''}`}
              style={{ '--animation-delay': `${index * 0.2}s` }}
            >
              <div className="card-content">
                <div className="rating-stars">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="testimonial-excerpt">
                  {testimonial.text.slice(0, 120)}...
                </p>

                <div className="testimonial-footer">
                  <div className="author-mini">
                    <div className="author-avatar">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} />
                      ) : (
                        <FaUserCircle />
                      )}
                    </div>
                    <div className="author-details">
                      <span className="author-name-mini">{testimonial.name}</span>
                      <span className="author-role-mini">{testimonial.role}</span>
                    </div>
                  </div>
                  
                  {testimonial.verified && (
                    <div className="verified-mini">
                      <FaLeaf />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="testimonials-cta">
          <div className="cta-content">
            <h3>Ready to Join Our Happy Community?</h3>
            <p>Experience the difference of farm-fresh organic produce</p>
            <div className="cta-actions">
              <button className="cta-btn primary">
                Shop Organic Now
              </button>
              <button className="cta-btn secondary">
                Read More Reviews
              </button>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="trust-badge">
              <FaLeaf />
              <span>100% Organic</span>
            </div>
            <div className="trust-badge">
              <FaSeedling />
              <span>Sustainable</span>
            </div>
            <div className="trust-badge">
              <FaUserCircle />
              <span>Verified Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials