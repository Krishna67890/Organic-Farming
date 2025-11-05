import React, { useState, useRef, useEffect } from 'react'
import { 
  FaLeaf, 
  FaRecycle, 
  FaTruck, 
  FaShieldAlt, 
  FaSeedling, 
  FaHeart,
  FaArrowRight,
  FaCheck
} from 'react-icons/fa'
import './Features.css'

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const featuresRef = useRef(null)

  const features = [
    {
      id: 1,
      icon: FaLeaf,
      title: "100% Organic Certified",
      description: "All our products are USDA organic certified, grown without synthetic pesticides or fertilizers, ensuring pure natural goodness.",
      benefits: [
        "No synthetic pesticides",
        "Non-GMO seeds only",
        "Soil health focused",
        "Natural pest control"
      ],
      color: "#4CAF50",
      gradient: "linear-gradient(135deg, #4CAF50, #8BC34A)"
    },
    {
      id: 2,
      icon: FaRecycle,
      title: "Sustainable Farming",
      description: "We practice regenerative agriculture that improves soil health, conserves water, and enhances ecosystem biodiversity.",
      benefits: [
        "Water conservation",
        "Soil regeneration",
        "Biodiversity protection",
        "Carbon sequestration"
      ],
      color: "#FF9800",
      gradient: "linear-gradient(135deg, #FF9800, #FFB74D)"
    },
    {
      id: 3,
      icon: FaTruck,
      title: "Carbon Neutral Delivery",
      description: "Our eco-friendly delivery system ensures your organic produce reaches you fresh with minimal carbon footprint.",
      benefits: [
        "Electric delivery vehicles",
        "Biodegradable packaging",
        "Local distribution hubs",
        "Route optimization"
      ],
      color: "#2196F3",
      gradient: "linear-gradient(135deg, #2196F3, #64B5F6)"
    },
    {
      id: 4,
      icon: FaShieldAlt,
      title: "Quality Guarantee",
      description: "Every product undergoes rigorous quality checks to ensure you receive only the freshest, highest quality organic produce.",
      benefits: [
        "Freshness guarantee",
        "Quality inspection",
        "Direct from farm",
        "Customer satisfaction"
      ],
      color: "#9C27B0",
      gradient: "linear-gradient(135deg, #9C27B0, #BA68C8)"
    },
    {
      id: 5,
      icon: FaSeedling,
      title: "Seasonal Variety",
      description: "Enjoy a rotating selection of seasonal produce that's harvested at peak ripeness for optimal flavor and nutrition.",
      benefits: [
        "Peak season harvest",
        "Rotating selection",
        "Nutrition optimized",
        "Flavor focused"
      ],
      color: "#8BC34A",
      gradient: "linear-gradient(135deg, #8BC34A, #CDDC39)"
    },
    {
      id: 6,
      icon: FaHeart,
      title: "Community Focused",
      description: "We support local communities, provide fair wages to farmers, and promote organic farming education.",
      benefits: [
        "Fair trade practices",
        "Local employment",
        "Education programs",
        "Community support"
      ],
      color: "#E91E63",
      gradient: "linear-gradient(135deg, #E91E63, #F06292)"
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
      { threshold: 0.2 }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }
    }
  }, [])

  // Auto-rotate features
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible, features.length])

  const handleFeatureClick = (index) => {
    setActiveFeature(index)
  }

  return (
    <section className="features-section" ref={featuresRef}>
      <div className="container">
        {/* Section Header */}
        <div className="features-header">
          <h2 className="features-title">
            Why Choose <span className="highlight">Organic Farm</span>?
          </h2>
          <p className="features-subtitle">
            Discover the difference that truly organic, sustainable farming makes. 
            From seed to table, we're committed to excellence in every step.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-container">
          {/* Feature Cards */}
          <div className="features-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.id}
                  className={`feature-card ${activeFeature === index ? 'active' : ''} ${isVisible ? 'animate-in' : ''}`}
                  style={{ 
                    '--animation-delay': `${index * 0.1}s`,
                    '--feature-color': feature.color,
                    '--feature-gradient': feature.gradient
                  }}
                  onClick={() => handleFeatureClick(index)}
                >
                  {/* Card Background Effects */}
                  <div className="card-bg"></div>
                  <div className="card-glow"></div>

                  {/* Icon Container */}
                  <div className="feature-icon-container">
                    <div className="icon-bg"></div>
                    <IconComponent className="feature-icon" />
                  </div>

                  {/* Content */}
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>

                    {/* Benefits List */}
                    <ul className="benefits-list">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="benefit-item">
                          <FaCheck className="benefit-icon" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Active Indicator */}
                  <div className="active-indicator">
                    <FaArrowRight />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Feature Preview */}
          <div className="feature-preview">
            <div className="preview-content">
              <div className="preview-icon">
                {React.createElement(features[activeFeature].icon, {
                  className: 'preview-main-icon'
                })}
              </div>
              
              <h3 className="preview-title">
                {features[activeFeature].title}
              </h3>
              
              <p className="preview-description">
                {features[activeFeature].description}
              </p>

              {/* Progress Dots */}
              <div className="progress-dots">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={`progress-dot ${activeFeature === index ? 'active' : ''}`}
                    onClick={() => handleFeatureClick(index)}
                    aria-label={`Show feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="features-cta">
          <div className="cta-content">
            <h3>Ready to Experience the Organic Difference?</h3>
            <p>Join thousands of satisfied customers enjoying fresh, sustainable produce</p>
            <button className="cta-button">
              <span>Shop Organic Now</span>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features