import React, { useState, useEffect } from 'react'
import './Loading.css'

const Loading = ({ 
  type = "organic", 
  size = "medium", 
  text = "Loading fresh organic goodness...",
  fullScreen = false 
}) => {
  const [currentText, setCurrentText] = useState(text)
  const [dots, setDots] = useState('')

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Organic-themed loading animations
  const renderOrganicLoader = () => (
    <div className="organic-loader">
      <div className="leaf leaf-1"></div>
      <div className="leaf leaf-2"></div>
      <div className="leaf leaf-3"></div>
      <div className="stem"></div>
      <div className="soil"></div>
    </div>
  )

  const renderPulseLoader = () => (
    <div className="pulse-loader">
      <div className="pulse-circle pulse-1"></div>
      <div className="pulse-circle pulse-2"></div>
      <div className="pulse-circle pulse-3"></div>
    </div>
  )

  const renderFarmLoader = () => (
    <div className="farm-loader">
      <div className="tractor">
        <div className="tractor-body"></div>
        <div className="tractor-cabin"></div>
        <div className="wheel wheel-1"></div>
        <div className="wheel wheel-2"></div>
      </div>
      <div className="field">
        <div className="crop-row"></div>
        <div className="crop-row"></div>
        <div className="crop-row"></div>
      </div>
    </div>
  )

  const renderHarvestLoader = () => (
    <div className="harvest-loader">
      <div className="basket">
        <div className="apple"></div>
        <div className="carrot"></div>
        <div className="tomato"></div>
      </div>
      <div className="sun"></div>
    </div>
  )

  const getLoader = () => {
    switch (type) {
      case "pulse": return renderPulseLoader()
      case "farm": return renderFarmLoader()
      case "harvest": return renderHarvestLoader()
      case "organic":
      default: return renderOrganicLoader()
    }
  }

  const loadingContent = (
    <div className={`loading-container ${size} ${fullScreen ? 'full-screen' : ''}`}>
      <div className="loading-animation">
        {getLoader()}
      </div>
      
      <div className="loading-content">
        <p className="loading-text">
          {currentText}
          <span className="dots">{dots}</span>
        </p>
        
        <div className="loading-stats">
          <div className="stat">
            <span className="stat-label">Organic Quality</span>
            <div className="stat-bar">
              <div className="stat-progress"></div>
            </div>
          </div>
          
          <div className="stat">
            <span className="stat-label">Freshness Check</span>
            <div className="stat-bar">
              <div className="stat-progress"></div>
            </div>
          </div>
        </div>
        
        <div className="farm-facts">
          <div className="fact">
            <span className="fact-icon">🌱</span>
            <span>100% Organic Certified</span>
          </div>
          <div className="fact">
            <span className="fact-icon">🚜</span>
            <span>Sustainably Grown</span>
          </div>
          <div className="fact">
            <span className="fact-icon">📦</span>
            <span>Eco-Packaged</span>
          </div>
        </div>
      </div>
    </div>
  )

  return fullScreen ? (
    <div className="loading-overlay">
      {loadingContent}
    </div>
  ) : loadingContent
}

export default Loading