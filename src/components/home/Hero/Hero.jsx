import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLeaf, 
  FaPlay, 
  FaArrowRight, 
  FaSeedling, 
  FaTruck, 
  FaAward,
  FaStar,
  FaShoppingCart
} from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const slides = [
    {
      id: 1,
      title: "Fresh From Our",
      highlight: "Organic Farms",
      subtitle: "Experience the pure taste of nature with our hand-picked, sustainably grown organic produce delivered fresh to your doorstep.",
      image: "/api/placeholder/1200/800",
      bgImage: "linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(139, 195, 74, 0.8))",
      cta: "Shop Fresh Produce",
      stats: "5000+ Happy Customers"
    },
    {
      id: 2,
      title: "Seasonal",
      highlight: "Harvest Collection",
      subtitle: "Discover our limited edition seasonal picks, harvested at peak ripeness for maximum flavor and nutritional value.",
      image: "/api/placeholder/1200/800",
      bgImage: "linear-gradient(135deg, rgba(255, 152, 0, 0.9), rgba(255, 193, 7, 0.8))",
      cta: "View Seasonal Picks",
      stats: "100+ Organic Products"
    },
    {
      id: 3,
      title: "Sustainable",
      highlight: "Farming Practices",
      subtitle: "Join us in our mission to protect the planet with eco-friendly farming methods that nurture the soil and ecosystem.",
      image: "/api/placeholder/1200/800",
      bgImage: "linear-gradient(135deg, rgba(56, 142, 60, 0.9), rgba(76, 175, 80, 0.8))",
      cta: "Learn About Farming",
      stats: "15+ Years Experience"
    }
  ]

  const features = [
    { icon: FaLeaf, text: "100% Organic Certified", color: "#4CAF50" },
    { icon: FaTruck, text: "Carbon Neutral Delivery", color: "#2196F3" },
    { icon: FaAward, text: "Award Winning Quality", color: "#FF9800" },
    { icon: FaSeedling, text: "Sustainable Practices", color: "#8BC34A" }
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

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  // Mouse move parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Background Elements */}
      <div className="hero-bg-pattern"></div>
      <div 
        className="hero-parallax-bg"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      ></div>
      
      {/* Slides */}
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${currentSlide === index ? 'active' : ''}`}
            style={{ backgroundImage: slide.bgImage }}
          >
            <div className="container">
              <div className="hero-content">
                {/* Text Content */}
                <div className="hero-text">
                  <div className="hero-badge">
                    <FaLeaf />
                    <span>USDA Organic Certified</span>
                  </div>

                  <h1 className="hero-title">
                    <span className="title-line">{slide.title}</span>
                    <span className="title-highlight">{slide.highlight}</span>
                  </h1>

                  <p className="hero-subtitle">{slide.subtitle}</p>

                  {/* CTA Buttons */}
                  <div className="hero-actions">
                    <Link to="/products" className="btn btn-primary">
                      <span>{slide.cta}</span>
                      <FaArrowRight />
                    </Link>
                    <button className="btn btn-secondary">
                      <FaPlay />
                      <span>Watch Our Story</span>
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="hero-stats">
                    <div className="stat-item">
                      <div className="stat-number">{slide.stats.split('+')[0]}+</div>
                      <div className="stat-label">{slide.stats.split('+')[1]}</div>
                    </div>
                    <div className="rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="star" />
                        ))}
                      </div>
                      <span className="rating-text">4.9/5 (2K+ Reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Visual Content */}
                <div className="hero-visual">
                  <div className="hero-image-container">
                    <div className="image-frame">
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className="hero-image"
                      />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="floating-element element-1">
                      <FaLeaf />
                    </div>
                    <div className="floating-element element-2">
                      <FaSeedling />
                    </div>
                    <div className="floating-element element-3">
                      <FaShoppingCart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Bar */}
      <div className="hero-features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={index} 
                  className="feature-item"
                  style={{ '--feature-color': feature.color }}
                >
                  <div className="feature-icon">
                    <IconComponent />
                  </div>
                  <span className="feature-text">{feature.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="slide-controls">
        <button className="control-btn prev" onClick={prevSlide}>
          <FaArrowRight />
        </button>
        
        <div className="slide-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <button className="control-btn next" onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll to Explore</span>
      </div>
    </section>
  )
}

export default Hero