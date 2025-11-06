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
  FaExpand,
  FaTree,
  FaCloudRain,
  FaWind,
  FaMountain,
  FaHeart,
  FaCompass,
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaRegLightbulb,
  FaHandHoldingWater,
  FaMicroscope
} from 'react-icons/fa'
import Loading from '../components/common/Loading/Loading'
import './Farming.css'

const Farming = () => {
  const [activeMethod, setActiveMethod] = useState(0)
  const [stats, setStats] = useState([])
  const [isStatsLoading, setIsStatsLoading] = useState(true)
  const [activeImpact, setActiveImpact] = useState('environment')
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [activeTip, setActiveTip] = useState(0)

  // Enhanced Farming methods data with beautiful images
  const farmingMethods = [
    {
      id: 1,
      title: "Regenerative Crop Rotation",
      icon: FaRecycle,
      description: "Advanced crop rotation system that improves soil health, increases biodiversity, and enhances carbon sequestration.",
      benefits: [
        "Increases soil organic matter by 3-5% annually",
        "Reduces synthetic fertilizer needs by 60%",
        "Enhances water infiltration and retention",
        "Supports beneficial insect populations"
      ],
      process: [
        "Plan 7-year rotation cycles with diverse crop families",
        "Integrate nitrogen-fixing legumes every 2 years",
        "Include deep-rooted plants to break up compacted soil",
        "Monitor soil microbiology with regular testing"
      ],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      video: "/videos/crop-rotation-demo.mp4",
      proTips: [
        "Plant sunflowers after tomatoes to cleanse soil of pathogens",
        "Use buckwheat as a quick-growing cover crop between seasons",
        "Rotate heavy feeders with soil builders like clover and alfalfa"
      ],
      difficulty: "Intermediate",
      season: "Year-round"
    },
    {
      id: 2,
      title: "Advanced Vermicomposting",
      icon: FaRecycle,
      description: "Utilizing specialized worm species to transform organic waste into ultra-rich, nutrient-dense fertilizer.",
      benefits: [
        "Produces fertilizer 5x richer than traditional compost",
        "Accelerates decomposition process by 70%",
        "Creates beneficial microbial inoculants for soil",
        "Eliminates methane production from waste"
      ],
      process: [
        "Establish red wiggler worm colonies in controlled beds",
        "Maintain optimal temperature (55-77°F) and moisture (70-80%)",
        "Harvest worm castings every 45-60 days",
        "Brew compost tea for foliar applications"
      ],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      video: "/videos/composting-process.mp4",
      proTips: [
        "Add eggshells to balance pH and provide calcium",
        "Use coconut coir as bedding for better aeration",
        "Avoid citrus and onions which can harm worms",
        "Harvest castings when bedding is mostly consumed"
      ],
      difficulty: "Beginner",
      season: "Year-round"
    },
    {
      id: 3,
      title: "Smart Water Management",
      icon: FaTint,
      description: "Precision irrigation systems combined with rainwater harvesting and soil moisture monitoring.",
      benefits: [
        "Reduces water usage by 55-70% compared to flood irrigation",
        "Prevents nutrient leaching and soil erosion",
        "Increases crop yields through optimal hydration",
        "Lowers energy costs for water pumping"
      ],
      process: [
        "Install subsurface drip irrigation with moisture sensors",
        "Implement 50,000-gallon rainwater collection system",
        "Use evapotranspiration data for precise scheduling",
        "Mulch heavily to reduce surface evaporation"
      ],
      image: "https://images.unsplash.com/photo-1472653525502-fc569e405f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      video: "/videos/irrigation-demo.mp4",
      proTips: [
        "Water in early morning to reduce evaporation loss",
        "Use ollas (clay pots) for efficient container watering",
        "Install swales on contours to capture rainwater",
        "Group plants by water needs for efficient irrigation"
      ],
      difficulty: "Advanced",
      season: "Year-round"
    },
    {
      id: 4,
      title: "Ecological Pest Management",
      icon: FaBug,
      description: "Holistic approach using beneficial insects, companion planting, and natural repellents.",
      benefits: [
        "Eliminates 100% of synthetic pesticide use",
        "Increases pollinator populations by 300%",
        "Creates self-regulating ecosystem balance",
        "Produces pesticide-free, safer food"
      ],
      process: [
        "Introduce ladybugs, lacewings, and praying mantises",
        "Plant pest-repelling borders with marigolds and garlic",
        "Use pheromone traps for specific pest monitoring",
        "Implement trap cropping to protect main crops"
      ],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      video: "/videos/pest-control.mp4",
      proTips: [
        "Plant basil near tomatoes to repel hornworms",
        "Use neem oil spray as broad-spectrum organic control",
        "Create insect hotels to attract beneficial predators",
        "Interplant onions with carrots to deter carrot flies"
      ],
      difficulty: "Intermediate",
      season: "Growing Season"
    },
    {
      id: 5,
      title: "Soil Food Web Cultivation",
      icon: FaSeedling,
      description: "Building complex soil ecosystems with diverse microbial life for optimal plant health.",
      benefits: [
        "Increases soil carbon sequestration by 2.5 tons/acre/year",
        "Enhances plant nutrient uptake efficiency by 40%",
        "Improves soil structure and water holding capacity",
        "Creates disease-suppressive soils naturally"
      ],
      process: [
        "Inoculate soils with beneficial fungi and bacteria",
        "Maintain constant soil cover with living plants",
        "Minimize soil disturbance through no-till practices",
        "Regularly test and amend based on soil biology"
      ],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      video: "/videos/soil-health.mp4",
      proTips: [
        "Apply mycorrhizal fungi when transplanting seedlings",
        "Use compost tea to boost microbial populations",
        "Maintain soil pH between 6.0-7.0 for optimal biology",
        "Avoid chemical fertilizers that harm soil life"
      ],
      difficulty: "Advanced",
      season: "Year-round"
    }
  ]

  // Amazing Organic Farming Tips
  const farmingTips = [
    {
      icon: FaRegLightbulb,
      title: "Moon Phase Planting",
      description: "Plant root crops during waning moon and above-ground crops during waxing moon for optimal growth",
      benefit: "30% better germination rates",
      category: "Timing"
    },
    {
      icon: FaHandHoldingWater,
      title: "Deep Watering Technique",
      description: "Water deeply and infrequently to encourage deep root growth and drought resistance",
      benefit: "50% less water usage",
      category: "Watering"
    },
    {
      icon: FaMicroscope,
      title: "Soil Microbe Boost",
      description: "Apply compost tea weekly to increase beneficial microbial activity in soil",
      benefit: "Faster nutrient cycling",
      category: "Soil Health"
    },
    {
      icon: FaCompass,
      title: "Companion Planting",
      description: "Plant marigolds throughout garden to naturally repel nematodes and other pests",
      benefit: "Natural pest control",
      category: "Pest Management"
    },
    {
      icon: FaCalendarAlt,
      title: "Succession Planting",
      description: "Stagger plantings every 2 weeks for continuous harvest throughout season",
      benefit: "Extended harvest period",
      category: "Planning"
    },
    {
      icon: FaTree,
      title: "Native Plant Integration",
      description: "Incorporate native plants to support local pollinators and beneficial insects",
      benefit: "Increased biodiversity",
      category: "Ecosystem"
    }
  ]

  // Impact data
  const impactData = {
    environment: {
      title: "Environmental Impact",
      icon: FaLeaf,
      description: "Our regenerative practices actively heal the land while producing abundant food:",
      points: [
        {
          metric: "Carbon Sequestration",
          value: "3.2",
          unit: "tons/acre/year",
          description: "Our living soils capture atmospheric CO2"
        },
        {
          metric: "Water Conservation",
          value: "65",
          unit: "% reduction",
          description: "Compared to conventional irrigation methods"
        },
        {
          metric: "Soil Organic Matter",
          value: "4.2",
          unit: "% average",
          description: "Up from 1.8% when we started"
        },
        {
          metric: "Wildlife Habitat",
          value: "47",
          unit: "new species",
          description: "Native species returned to our farmland"
        }
      ]
    },
    community: {
      title: "Community Impact",
      icon: FaUsers,
      description: "Building resilient local food systems and community connections:",
      points: [
        {
          metric: "Local Employment",
          value: "58",
          unit: "living wage jobs",
          description: "Supporting rural economic stability"
        },
        {
          metric: "Education Programs",
          value: "2,300",
          unit: "students reached",
          description: "Hands-on farming education annually"
        },
        {
          metric: "Food Security",
          value: "18,500",
          unit: "lbs donated",
          description: "Fresh organic produce to food banks"
        },
        {
          metric: "Workshop Attendance",
          value: "1,200",
          unit: "participants/year",
          description: "Organic farming skill sharing"
        }
      ]
    },
    economic: {
      title: "Economic Impact",
      icon: FaChartLine,
      description: "Proving that sustainable agriculture can be economically viable:",
      points: [
        {
          metric: "Local Economy",
          value: "$3.1",
          unit: "million impact",
          description: "Annual contribution to local economy"
        },
        {
          metric: "Input Cost Reduction",
          value: "72",
          unit: "% lower",
          description: "Compared to conventional inputs"
        },
        {
          metric: "Yield Increase",
          value: "18",
          unit: "% higher",
          description: "Gradual yield improvement over 5 years"
        },
        {
          metric: "Premium Markets",
          value: "89",
          unit: "% of produce",
          description: "Sold through direct-to-consumer channels"
        }
      ]
    }
  }

  // Certifications with actual image URLs
  const certifications = [
    {
      name: "USDA Organic",
      organization: "United States Department of Agriculture",
      description: "Certified to meet strict USDA organic standards since 2010 with annual inspections",
      icon: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      year: "2010",
      requirements: ["No synthetic pesticides", "Non-GMO seeds", "Soil building practices"]
    },
    {
      name: "Regenerative Organic",
      organization: "Regenerative Organic Alliance",
      description: "Gold standard for soil health, animal welfare, and social fairness",
      icon: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      year: "2020",
      requirements: ["Carbon sequestration", "Biodiversity enhancement", "Worker equity"]
    },
    {
      name: "Demeter Biodynamic",
      organization: "Demeter Association",
      description: "Highest level of organic certification incorporating cosmic rhythms",
      icon: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      year: "2018",
      requirements: ["Biodynamic preparations", "Farm organism concept", "Closed nutrient cycles"]
    },
    {
      name: "Food Alliance Certified",
      organization: "Food Alliance",
      description: "Comprehensive certification for sustainable agriculture practices",
      icon: "https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      year: "2015",
      requirements: ["Safe working conditions", "Habitat conservation", "Reduced pesticides"]
    }
  ]

  // Simulate loading stats
  useEffect(() => {
    const loadStats = async () => {
      setIsStatsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStats([
        { number: "15+", label: "Years of Organic Farming", icon: FaLeaf },
        { number: "250", label: "Acres of Regenerative Land", icon: FaSeedling },
        { number: "75+", label: "Organic Varieties Grown", icon: FaRecycle },
        { number: "15,000+", label: "Families Fed Annually", icon: FaUsers }
      ])
      setIsStatsLoading(false)
    }

    loadStats()

    // Auto-rotate tips
    const tipInterval = setInterval(() => {
      setActiveTip(prev => (prev + 1) % farmingTips.length)
    }, 5000)

    return () => clearInterval(tipInterval)
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
      {/* Enhanced Hero Section */}
      <section className="farming-hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Organic Farm Landscape" 
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaLeaf />
              <span>Regenerative Agriculture</span>
            </div>
            <h1>Revolutionary Organic Farming</h1>
            <p>Transforming agriculture through practices that heal the land, support communities, and produce the most nutritious food possible.</p>
            <div className="hero-stats">
              {isStatsLoading ? (
                <Loading />
              ) : (
                stats.map((stat, index) => {
                  const StatIcon = stat.icon
                  return (
                    <div key={index} className="hero-stat">
                      <StatIcon className="stat-icon" />
                      <div className="stat-content">
                        <div className="stat-number">{stat.number}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips Carousel */}
<section className="tips-carousel">
  <div className="container">
    <div className="carousel-header">
      <FaRegLightbulb className="carousel-icon" />
      <h2>Amazing Organic Farming Tips</h2>
    </div>
    <div className="tips-container">
      <div className="active-tip">
        <div className="tip-icon">
          {React.createElement(farmingTips[activeTip].icon)}
        </div>
        <div className="tip-content">
          <div className="tip-category">{farmingTips[activeTip].category}</div>
          <h3>{farmingTips[activeTip].title}</h3>
          <p>{farmingTips[activeTip].description}</p>
          <div className="tip-benefit">
            <FaStar />
            <span>{farmingTips[activeTip].benefit}</span>
          </div>
        </div>
      </div>
      <div className="carousel-dots">
        {farmingTips.map((_, index) => (
          <button
            key={index}
            className={`dot ${activeTip === index ? 'active' : ''}`}
            onClick={() => setActiveTip(index)}
          />
        ))}
      </div>
    </div>
  </div>
</section>

      {/* Enhanced Farming Methods Section */}
      <section className="farming-methods">
        <div className="container">
          <div className="section-header centered">
            <h2>Advanced Organic Farming Methods</h2>
            <p>Cutting-edge techniques that combine traditional wisdom with modern ecological science</p>
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
                    <div className="nav-content">
                      <span className="nav-title">{method.title}</span>
                      <span className="nav-meta">
                        {method.difficulty} • {method.season}
                      </span>
                    </div>
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
                  <div className="method-meta">
                    <span className="difficulty-badge">{currentMethod.difficulty}</span>
                    <span className="season-badge">{currentMethod.season}</span>
                  </div>
                  <h3>{currentMethod.title}</h3>
                  <p>{currentMethod.description}</p>
                </div>
              </div>

              <div className="method-content">
                {/* Benefits */}
                <div className="method-section">
                  <h4>
                    <FaAward />
                    Key Benefits
                  </h4>
                  <div className="benefits-grid">
                    {currentMethod.benefits.map((benefit, index) => (
                      <div key={index} className="benefit-item">
                        <div className="benefit-icon">
                          <FaLeaf />
                        </div>
                        <div className="benefit-content">
                          <span>{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process */}
                <div className="method-section">
                  <h4>
                    <FaCompass />
                    Implementation Process
                  </h4>
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

                {/* Pro Tips */}
                <div className="method-section">
                  <h4>
                    <FaRegLightbulb />
                    Pro Tips & Tricks
                  </h4>
                  <div className="pro-tips">
                    {currentMethod.proTips.map((tip, index) => (
                      <div key={index} className="pro-tip">
                        <FaStar className="tip-bullet" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media */}
                <div className="method-section">
                  <h4>
                    <FaPlay />
                    See It in Action
                  </h4>
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
                        <div className="image-caption">
                          {currentMethod.title} in practice
                        </div>
                      </div>
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
            <h2>Measurable Positive Impact</h2>
            <p>Data-driven results showing how our practices benefit the environment, community, and economy</p>
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

      {/* Enhanced Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <div className="section-header centered">
            <h2>Third-Party Certifications & Standards</h2>
            <p>Independent verification of our commitment to the highest organic and sustainable standards</p>
          </div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-image">
                  <img src={cert.icon} alt={cert.name} />
                  <div className="cert-badge">
                    <FaAward />
                  </div>
                </div>
                <div className="cert-content">
                  <h3>{cert.name}</h3>
                  <p className="cert-org">{cert.organization}</p>
                  <p className="cert-desc">{cert.description}</p>
                  <div className="cert-meta">
                    <span className="cert-year">
                      <FaCalendarAlt />
                      Certified since {cert.year}
                    </span>
                  </div>
                  <div className="cert-requirements">
                    <h5>Key Requirements:</h5>
                    <ul>
                      {cert.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>
                          <FaLeaf />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="farming-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <div className="cta-badge">
                <FaSeedling />
                <span>Join the Movement</span>
              </div>
              <h2>Experience Regenerative Agriculture</h2>
              <p>Visit our farm, taste the difference, and learn how you can support sustainable food systems that heal our planet.</p>
              <div className="cta-features">
                <div className="feature">
                  <FaLeaf />
                  <span>Hands-on Workshops</span>
                </div>
                <div className="feature">
                  <FaUsers />
                  <span>Community Supported Agriculture</span>
                </div>
                <div className="feature">
                  <FaTree />
                  <span>Farm Tours & Tastings</span>
                </div>
              </div>
              <div className="cta-buttons">
                <button className="btn-primary">
                  <FaArrowRight />
                  Join Our CSA Program
                </button>
                <button className="btn-secondary">
                  <FaCalendarAlt />
                  Schedule Educational Tour
                </button>
              </div>
            </div>
            <div className="cta-image">
              <img 
                src="https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Community Farming" 
              />
              <div className="cta-overlay">
                <div className="overlay-content">
                  <FaHeart className="overlay-icon" />
                  <span>Growing Community, Healing Land</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Principles Section */}
      <section className="principles-section">
        <div className="container">
          <div className="section-header centered">
            <h2>Our Guiding Principles</h2>
            <p>The core philosophy that shapes every decision on our organic farm</p>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <div className="principle-icon">
                <FaLeaf />
              </div>
              <h3>Environmental Regeneration</h3>
              <p>We don't just sustain - we actively regenerate ecosystems, leaving the land healthier than we found it through soil building and biodiversity enhancement.</p>
              <div className="principle-action">
                <FaTree />
                <span>Carbon Positive Farming</span>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaHandsHelping />
              </div>
              <h3>Community Resilience</h3>
              <p>Building strong, resilient local food systems that provide food security, education, and economic opportunities for our community members.</p>
              <div className="principle-action">
                <FaUsers />
                <span>Local Food Sovereignty</span>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaAward />
              </div>
              <h3>Transparency & Excellence</h3>
              <p>Maintaining the highest standards with complete transparency about our practices, costs, and challenges in sustainable agriculture.</p>
              <div className="principle-action">
                <FaMicroscope />
                <span>Third-Party Verified</span>
              </div>
            </div>

            <div className="principle-card">
              <div className="principle-icon">
                <FaChartLine />
              </div>
              <h3>Economic Viability</h3>
              <p>Proving that ecological farming can be economically sustainable while providing living wages and investing in community development.</p>
              <div className="principle-action">
                <FaHeart />
                <span>Triple Bottom Line</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Tips Grid */}
      <section className="additional-tips">
        <div className="container">
          <div className="section-header centered">
            <h2>More Organic Farming Wisdom</h2>
            <p>Practical tips and insights from 15 years of regenerative farming experience</p>
          </div>
          <div className="tips-grid">
            {farmingTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-header">
                  <div className="tip-category-badge">{tip.category}</div>
                  <div className="tip-icon">
                    <tip.icon />
                  </div>
                </div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
                <div className="tip-footer">
                  <div className="tip-benefit">
                    <FaStar />
                    <span>{tip.benefit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Farming