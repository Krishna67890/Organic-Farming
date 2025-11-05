import React, { useState, useEffect } from 'react'
import { 
  FaLeaf, 
  FaSeedling, 
  FaRecycle, 
  FaTint, 
  FaSun, 
  FaBug,
  FaHandsHelping,
  FaChartLine,
  FaAward,
  FaUsers,
  FaArrowRight,
  FaPlay,
  FaPause,
  FaExpand
} from 'react-icons/fa'
import Loading from '../components/common/Loading/Loading'
import './Farming.css'

const Farming = () => {
  const [activeMethod, setActiveMethod] = useState(0)
  const [stats, setStats] = useState([])
  const [isStatsLoading, setIsStatsLoading] = useState(true)
  const [activeImpact, setActiveImpact] = useState('environment')
  const [videoPlaying, setVideoPlaying] = useState(false)

  // Farming methods data
  const farmingMethods = [
    {
      id: 1,
      title: "Crop Rotation",
      icon: FaRecycle,
      description: "Systematically rotating different crops in the same field across seasons to improve soil health and reduce pests.",
      benefits: [
        "Improves soil fertility naturally",
        "Reduces pest and disease buildup",
        "Enhances biodiversity",
        "Reduces need for synthetic fertilizers"
      ],
      process: [
        "Plan rotation schedule based on crop families",
        "Alternate between heavy feeders and soil builders",
        "Include cover crops in rotation",
        "Monitor soil health throughout cycle"
      ],
      image: "/images/farming/crop-rotation.jpg",
      video: "/videos/crop-rotation-demo.mp4"
    },
    {
      id: 2,
      title: "Composting",
      icon: FaRecycle,
      description: "Transforming organic waste into nutrient-rich soil amendment through natural decomposition processes.",
      benefits: [
        "Creates natural fertilizer",
        "Reduces farm waste",
        "Improves soil structure",
        "Enhances water retention"
      ],
      process: [
        "Collect organic materials in proper ratios",
        "Maintain optimal moisture and aeration",
        "Turn compost regularly",
        "Monitor temperature and maturity"
      ],
      image: "/images/farming/composting.jpg",
      video: "/videos/composting-process.mp4"
    },
    {
      id: 3,
      title: "Water Conservation",
      icon: FaTint,
      description: "Implementing efficient irrigation systems and water management practices to minimize water usage.",
      benefits: [
        "Reduces water consumption by 40-60%",
        "Prevents soil erosion",
        "Optimizes plant growth",
        "Lowers operational costs"
      ],
      process: [
        "Install drip irrigation systems",
        "Implement rainwater harvesting",
        "Use moisture sensors",
        "Schedule irrigation based on plant needs"
      ],
      image: "/images/farming/water-conservation.jpg",
      video: "/videos/irrigation-demo.mp4"
    },
    {
      id: 4,
      title: "Natural Pest Control",
      icon: FaBug,
      description: "Using biological controls and companion planting to manage pests without synthetic pesticides.",
      benefits: [
        "Eliminates chemical pesticide use",
        "Protects beneficial insects",
        "Maintains ecological balance",
        "Produces healthier crops"
      ],
      process: [
        "Introduce beneficial insects",
        "Plant pest-repelling companion plants",
        "Use physical barriers and traps",
        "Monitor pest populations regularly"
      ],
      image: "/images/farming/pest-control.jpg",
      video: "/videos/pest-control.mp4"
    },
    {
      id: 5,
      title: "Soil Health Management",
      icon: FaSeedling,
      description: "Building and maintaining healthy soil through organic matter addition and minimal tillage practices.",
      benefits: [
        "Increases soil organic matter",
        "Enhances microbial activity",
        "Improves crop resilience",
        "Sequesters carbon from atmosphere"
      ],
      process: [
        "Add compost and organic matter",
        "Practice no-till or reduced tillage",
        "Use cover crops",
        "Test soil regularly"
      ],
      image: "/images/farming/soil-health.jpg",
      video: "/videos/soil-health.mp4"
    }
  ]

  // Impact data
  const impactData = {
    environment: {
      title: "Environmental Impact",
      icon: FaLeaf,
      description: "Our organic farming practices positively impact the environment in multiple ways:",
      points: [
        {
          metric: "Carbon Sequestration",
          value: "2.5",
          unit: "tons/acre/year",
          description: "Our soils capture significant amounts of CO2 from the atmosphere"
        },
        {
          metric: "Water Conservation",
          value: "45",
          unit: "% reduction",
          description: "Compared to conventional farming methods"
        },
        {
          metric: "Biodiversity",
          value: "30",
          unit: "% increase",
          description: "In native species on our farmlands"
        },
        {
          metric: "Soil Health",
          value: "3.8",
          unit: "% organic matter",
          description: "Average soil organic matter content"
        }
      ]
    },
    community: {
      title: "Community Impact",
      icon: FaUsers,
      description: "We're committed to supporting our local community through various initiatives:",
      points: [
        {
          metric: "Local Employment",
          value: "42",
          unit: "jobs created",
          description: "Providing stable employment in our rural community"
        },
        {
          metric: "Education Programs",
          value: "15",
          unit: "schools reached",
          description: "Teaching children about sustainable agriculture"
        },
        {
          metric: "Food Donations",
          value: "12,000",
          unit: "lbs/year",
          description: "Fresh organic produce donated to local food banks"
        },
        {
          metric: "Community Events",
          value: "24",
          unit: "events/year",
          description: "Farm tours, workshops, and seasonal celebrations"
        }
      ]
    },
    economic: {
      title: "Economic Impact",
      icon: FaChartLine,
      description: "Our sustainable practices create economic value while protecting resources:",
      points: [
        {
          metric: "Local Economy",
          value: "$2.3",
          unit: "million contributed",
          description: "Annual economic impact in our local community"
        },
        {
          metric: "Energy Efficiency",
          value: "60",
          unit: "% reduction",
          description: "In energy consumption compared to conventional farms"
        },
        {
          metric: "Cost Savings",
          value: "35",
          unit: "% lower inputs",
          description: "Reduced spending on synthetic fertilizers and pesticides"
        },
        {
          metric: "Premium Quality",
          value: "25",
          unit: "% price premium",
          description: "Fair pricing for our certified organic products"
        }
      ]
    }
  }

  // Certifications
  const certifications = [
    {
      name: "USDA Organic",
      organization: "United States Department of Agriculture",
      description: "Certified to meet strict USDA organic standards since 2010",
      icon: "/images/certifications/usda-organic.png",
      year: "2010"
    },
    {
      name: "Non-GMO Project Verified",
      organization: "Non-GMO Project",
      description: "All our crops are verified to be free from genetic modification",
      icon: "/images/certifications/non-gmo.png",
      year: "2012"
    },
    {
      name: "Fair Trade Certified",
      organization: "Fair Trade USA",
      description: "Ensuring fair wages and working conditions for all farm workers",
      icon: "/images/certifications/fair-trade.png",
      year: "2015"
    },
    {
      name: "Regenerative Organic",
      organization: "Regenerative Organic Alliance",
      description: "Meeting highest standards for soil health and animal welfare",
      icon: "/images/certifications/regenerative.png",
      year: "2020"
    }
  ]

  // Simulate loading stats
  useEffect(() => {
    const loadStats = async () => {
      setIsStatsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStats([
        { number: "15+", label: "Years of Organic Farming", icon: FaLeaf },
        { number: "200", label: "Acres of Certified Land", icon: FaSeedling },
        { number: "50+", label: "Organic Products", icon: FaRecycle },
        { number: "10,000+", label: "Happy Customers", icon: FaUsers }
      ])
      setIsStatsLoading(false)
    }

    loadStats()
  }, [])

  const handleMethodClick = (index) => {
    setActiveMethod(index)
    setVideoPlaying(false)
  }

  const toggleVideoPlayback = () => {
    setVideoPlaying(!videoPlaying)
  }

  const currentMethod = farmingMethods[activeMethod]
  const MethodIcon = currentMethod.icon

  return (
    <div className="farming-page">
      {/* Hero Section */}
      <section className="farming-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Sustainable Organic Farming</h1>
            <p>Discover how we grow nutritious food while protecting our planet for future generations through innovative organic practices.</p>
            <div className="hero-stats">
              {isStatsLoading ? (
                <Loading />
              ) : (
                stats.map((stat, index) => {
                  const StatIcon = stat.icon
                  return (
                    <div key={index} className="hero-stat">
                      <StatIcon className="stat-icon" />
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Farming Methods Section */}
      <section className="farming-methods">
        <div className="container">
          <div className="section-header centered">
            <h2>Our Organic Farming Methods</h2>
            <p>Learn about the sustainable practices that make our farm truly organic and environmentally responsible.</p>
          </div>

          <div className="methods-container">
            {/* Methods Navigation */}
            <div className="methods-nav">
              {farmingMethods.map((method, index) => {
                const MethodNavIcon = method.icon
                return (
                  <button
                    key={method.id}
                    className={`method-nav-item ${activeMethod === index ? 'active' : ''}`}
                    onClick={() => handleMethodClick(index)}
                  >
                    <MethodNavIcon />
                    <span>{method.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Method Details */}
            <div className="method-details">
              <div className="method-header">
                <div className="method-icon">
                  <MethodIcon />
                </div>
                <div className="method-title">
                  <h3>{currentMethod.title}</h3>
                  <p>{currentMethod.description}</p>
                </div>
              </div>

              <div className="method-content">
                {/* Benefits */}
                <div className="method-section">
                  <h4>Key Benefits</h4>
                  <div className="benefits-grid">
                    {currentMethod.benefits.map((benefit, index) => (
                      <div key={index} className="benefit-item">
                        <FaLeaf className="benefit-icon" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="method-section">
                  <h4>Our Process</h4>
                  <div className="process-steps">
                    {currentMethod.process.map((step, index) => (
                      <div key={index} className="process-step">
                        <div className="step-number">{index + 1}</div>
                        <div className="step-content">
                          <p>{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media */}
                <div className="method-section">
                  <h4>See It in Action</h4>
                  <div className="method-media">
                    <div className="media-image">
                      <img src={currentMethod.image} alt={currentMethod.title} />
                      <div className="image-overlay">
                        <button 
                          className="play-button"
                          onClick={toggleVideoPlayback}
                        >
                          {videoPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                      </div>
                    </div>
                    <div className="media-info">
                      <p>Watch our demonstration of {currentMethod.title.toLowerCase()} practices on the farm.</p>
                      <button className="watch-full-btn">
                        <FaExpand />
                        Watch Full Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header centered">
            <h2>Our Positive Impact</h2>
            <p>See how our organic farming practices create value beyond just growing food.</p>
          </div>

          <div className="impact-container">
            {/* Impact Navigation */}
            <div className="impact-nav">
              {Object.entries(impactData).map(([key, data]) => {
                const ImpactIcon = data.icon
                return (
                  <button
                    key={key}
                    className={`impact-nav-item ${activeImpact === key ? 'active' : ''}`}
                    onClick={() => setActiveImpact(key)}
                  >
                    <ImpactIcon />
                    <span>{data.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Impact Details */}
            <div className="impact-details">
              <div className="impact-header">
                <div className="impact-icon">
                  {React.createElement(impactData[activeImpact].icon)}
                </div>
                <div className="impact-title">
                  <h3>{impactData[activeImpact].title}</h3>
                  <p>{impactData[activeImpact].description}</p>
                </div>
              </div>

              <div className="impact-metrics">
                {impactData[activeImpact].points.map((point, index) => (
                  <div key={index} className="impact-metric">
                    <div className="metric-value">
                      <span className="number">{point.value}</span>
                      <span className="unit">{point.unit}</span>
                    </div>
                    <div className="metric-info">
                      <h4>{point.metric}</h4>
                      <p>{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header centered">
            <h2>Our Certifications & Standards</h2>
            <p>We maintain the highest standards of organic certification and sustainable practices.</p>
          </div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-image">
                  <img src={cert.icon} alt={cert.name} />
                </div>
                <div className="cert-content">
                  <h3>{cert.name}</h3>
                  <p className="cert-org">{cert.organization}</p>
                  <p className="cert-desc">{cert.description}</p>
                  <div className="cert-meta">
                    <span className="cert-year">Certified since {cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="farming-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Join Our Sustainable Journey</h2>
              <p>Experience the difference of truly organic, sustainably grown produce. Support local agriculture that cares for the planet.</p>
              <div className="cta-buttons">
                <button className="btn-primary">
                  Shop Organic Products
                  <FaArrowRight />
                </button>
                <button className="btn-secondary">
                  Schedule Farm Tour
                </button>
              </div>
            </div>
            <div className="cta-image">
              <img src="/images/farming/cta-farm.jpg" alt="Organic Farm" />
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="principles-section">
        <div className="container">
          <div className="section-header centered">
            <h2>Our Farming Principles</h2>
            <p>The core values that guide everything we do on our organic farm.</p>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-icon">
                <FaLeaf />
              </div>
              <h3>Environmental Stewardship</h3>
              <p>We prioritize protecting and enhancing our natural resources, ensuring our farming practices leave the land better than we found it.</p>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaHandsHelping />
              </div>
              <h3>Community Focus</h3>
              <p>We believe in building strong local communities through education, employment, and access to healthy organic food.</p>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaAward />
              </div>
              <h3>Quality Excellence</h3>
              <p>We maintain the highest standards in organic certification and continuously improve our practices for better results.</p>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaChartLine />
              </div>
              <h3>Sustainable Growth</h3>
              <p>We balance economic viability with environmental responsibility to ensure long-term sustainability for generations to come.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Farming