import React, { useState, useEffect, useRef } from 'react'
import './Stats.css'

// Simple fallback icons if react-icons fails
const FallbackIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

const Stats = () => {
  const [animatedStats, setAnimatedStats] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)

  // Simple stats data without external icons
  const statsData = [
    { 
      number: 5000, 
      label: 'Happy Customers', 
      suffix: '+',
      color: '#4CAF50',
      duration: 2000
    },
    { 
      number: 100, 
      label: 'Organic Products', 
      suffix: '+',
      color: '#FF9800',
      duration: 1500
    },
    { 
      number: 15, 
      label: 'Years Farming', 
      suffix: '+',
      color: '#8BC34A',
      duration: 1800
    },
    { 
      number: 50, 
      label: 'Awards Won', 
      suffix: '+',
      color: '#9C27B0',
      duration: 1600
    }
  ]

  // Initialize animated stats
  useEffect(() => {
    setAnimatedStats(statsData.map(stat => ({ ...stat, animatedNumber: 0 })))
  }, [])

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

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  // Animate numbers
  useEffect(() => {
    if (!isVisible) return

    animatedStats.forEach((stat, index) => {
      const startTime = Date.now()
      const startValue = 0
      const endValue = stat.number
      const duration = stat.duration

      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)

        setAnimatedStats(prev => prev.map((s, i) => 
          i === index ? { ...s, animatedNumber: currentValue } : s
        ))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      setTimeout(animate, index * 300)
    })
  }, [isVisible, animatedStats])

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="container">
        {/* Section Header */}
        <div className="stats-header">
          <h2 className="stats-title">Growing Together</h2>
          <p className="stats-subtitle">
            Our journey in organic farming is marked by these milestones of sustainable growth and community trust
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {animatedStats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-item ${isVisible ? 'animate-in' : ''}`}
              style={{ '--animation-delay': `${index * 0.1}s`, '--stat-color': stat.color }}
            >
              {/* Animated Background Orb */}
              <div className="stat-orb"></div>
              
              {/* Icon Container */}
              <div className="stat-icon-container">
                <FallbackIcon className="stat-icon" />
              </div>

              {/* Animated Number */}
              <div className="stat-number-wrapper">
                <span className="stat-number">
                  {stat.animatedNumber.toLocaleString()}
                </span>
                {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
              </div>

              {/* Label */}
              <div className="stat-label">{stat.label}</div>

              {/* Progress Bar */}
              <div className="stat-progress">
                <div 
                  className="stat-progress-bar" 
                  style={{ 
                    animationDelay: `${index * 0.3 + 0.5}s`,
                    backgroundColor: stat.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="stats-decoration">
          <div className="decoration-leaf"></div>
          <div className="decoration-leaf"></div>
          <div className="decoration-leaf"></div>
        </div>
      </div>
    </section>
  )
}

export default Stats