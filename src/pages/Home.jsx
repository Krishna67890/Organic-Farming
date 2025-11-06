import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FaLeaf, 
  FaSeedling, 
  FaRecycle, 
  FaTruck, 
  FaAward, 
  FaHeart,
  FaArrowRight,
  FaStar,
  FaShoppingCart,
  FaClock,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaCloudRain,
  FaSnowflake,
  FaTree,
  FaWater,
  FaBug,
  FaUsers
} from 'react-icons/fa'
import Hero from '../components/home/Hero/Hero'
import Features from '../components/home/Features/Features'
import ProductsShowcase from '../components/home/ProductsShowcase/ProductsShowcase'
import Testimonials from '../components/home/Testimonials/Testimonials'
import Newsletter from '../components/home/Newsletter/Newsletter'
import Stats from "../components/home/Stats/Stats"
import SeasonalProducts from '../components/home/SeasonalProducts/SeasonalProducts'
import { useCart } from '../context/CartContext'
import { featuredProducts, farmStats } from '../data/homeData'
import './Home.css'

const Home = () => {
  const [seasonalProducts, setSeasonalProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeSeason, setActiveSeason] = useState('spring')
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API call for seasonal products
    const fetchSeasonalProducts = async () => {
      setIsLoading(true)
      try {
        setTimeout(() => {
          const seasonal = featuredProducts.filter(product => 
            product.seasonal === getCurrentSeason()
          )
          setSeasonalProducts(seasonal)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching seasonal products:', error)
        setIsLoading(false)
      }
    }

    fetchSeasonalProducts()
    setActiveSeason(getCurrentSeason())
  }, [])

  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'autumn'
    return 'winter'
  }

  const handleQuickAdd = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  // Season data with icons
  const seasons = {
    spring: { icon: FaSeedling, color: '#4caf50', name: 'Spring Harvest' },
    summer: { icon: FaSun, color: '#ff9800', name: 'Summer Bounty' },
    autumn: { icon: FaTree, color: '#795548', name: 'Autumn Harvest' },
    winter: { icon: FaSnowflake, color: '#2196f3', name: 'Winter Greens' }
  }

  // Organic farming pillars
  const farmingPillars = [
    {
      icon: FaLeaf,
      title: "Soil Health",
      description: "Building living soil through composting and no-till practices",
      features: ["Cover Cropping", "Vermicompost", "Mycorrhizal Networks"],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: FaWater,
      title: "Water Wisdom",
      description: "Conserving water through smart irrigation and rainwater harvesting",
      features: ["Drip Irrigation", "Rainwater Collection", "Mulching"],
      image: "https://images.unsplash.com/photo-1558470570-c9a5a5ade867?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: FaBug,
      title: "Natural Pest Control",
      description: "Using beneficial insects and companion planting instead of pesticides",
      features: ["Ladybugs", "Companion Plants", "Neem Oil"],
      image: "https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      icon: FaRecycle,
      title: "Closed Loop System",
      description: "Zero waste farming where everything is reused and recycled",
      features: ["Compost System", "Crop Rotation", "Green Manure"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ]

  // Daily farm activities
  const farmActivities = [
    {
      time: "6:00 AM",
      activity: "Morning Harvest",
      description: "Picking vegetables at peak freshness as the sun rises",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      time: "9:00 AM",
      activity: "Soil Preparation",
      description: "Turning compost and preparing beds for new plantings",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      time: "2:00 PM",
      activity: "Quality Check",
      description: "Inspecting and packing orders for same-day delivery",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ]

  return (
    <div className="organic-home">
      {/* Hero Section with Farm Background */}
      <section className="farm-hero">
        <div className="hero-background">
          <div className="hero-overlay">
            <div className="container">
              <div className="hero-content">
                <div className="hero-badge">
                  <FaLeaf />
                  <span>Since 2010</span>
                </div>
                <h1>Nourishing Communities Through Organic Farming</h1>
                <p>Experience the difference of truly organic produce, grown with care and harvested at peak perfection from our family farm to your table.</p>
                <div className="hero-actions">
                  <Link to="/products" className="btn btn-primary">
                    <FaShoppingCart />
                    Shop Fresh Produce
                  </Link>
                  <Link to="/about" className="btn btn-secondary">
                    <FaUsers />
                    Our Farming Story
                  </Link>
                </div>
                <div className="hero-features">
                  <div className="feature">
                    <FaLeaf />
                    <span>USDA Certified Organic</span>
                  </div>
                  <div className="feature">
                    <FaTruck />
                    <span>Farm-Fresh Delivery</span>
                  </div>
                  <div className="feature">
                    <FaAward />
                    <span>Sustainable Practices</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Spotlight */}
      <section className="seasonal-spotlight">
        <div className="container">
          <div className="section-header">
            <div className="season-indicator">
              {Object.entries(seasons).map(([key, season]) => {
                const SeasonIcon = season.icon
                return (
                  <div 
                    key={key}
                    className={`season-tab ${activeSeason === key ? 'active' : ''}`}
                    onClick={() => setActiveSeason(key)}
                    style={{ '--season-color': season.color }}
                  >
                    <SeasonIcon />
                    <span>{season.name}</span>
                  </div>
                )
              })}
            </div>
            <h2>Seasonal Harvest Spotlight</h2>
            <p>Discover what's fresh and abundant this {seasons[activeSeason].name.toLowerCase()}</p>
          </div>
          
          <div className="seasonal-content">
            <div className="seasonal-info">
              <div className="seasonal-badge" style={{ backgroundColor: seasons[activeSeason].color }}>
                <span>In Season Now</span>
              </div>
              <h3>Best of {seasons[activeSeason].name}</h3>
              <p>Our {activeSeason} harvest brings you the most flavorful and nutrient-dense produce, grown naturally without synthetic chemicals.</p>
              
              <div className="seasonal-tips">
                <h4>Seasonal Tips:</h4>
                <ul>
                  {activeSeason === 'spring' && (
                    <>
                      <li>Perfect for fresh salads and light cooking</li>
                      <li>Great time for planting your own garden</li>
                      <li>Enjoy the crisp, tender textures</li>
                    </>
                  )}
                  {activeSeason === 'summer' && (
                    <>
                      <li>Ideal for refreshing juices and smoothies</li>
                      <li>Perfect for outdoor grilling</li>
                      <li>Stay hydrated with water-rich produce</li>
                    </>
                  )}
                  {activeSeason === 'autumn' && (
                    <>
                      <li>Excellent for roasting and soups</li>
                      <li>Store root vegetables for winter</li>
                      <li>Rich, earthy flavors develop</li>
                    </>
                  )}
                  {activeSeason === 'winter' && (
                    <>
                      <li>Great for hearty stews and baking</li>
                      <li>Focus on storage crops and greens</li>
                      <li>Boost immunity with winter citrus</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="seasonal-products">
              <ProductsShowcase 
                products={seasonalProducts.slice(0, 3)}
                onQuickAdd={handleQuickAdd}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farming Pillars */}
      <section className="farming-pillars">
        <div className="container">
          <div className="section-header">
            <h2>Our Organic Farming Philosophy</h2>
            <p>Four pillars that guide everything we do at Green Valley Organic Farm</p>
          </div>
          
          <div className="pillars-grid">
            {farmingPillars.map((pillar, index) => {
              const PillarIcon = pillar.icon
              return (
                <div key={index} className="pillar-card">
                  <div className="pillar-image">
                    <img src={pillar.image} alt={pillar.title} />
                    <div className="pillar-icon">
                      <PillarIcon />
                    </div>
                  </div>
                  
                  <div className="pillar-content">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    
                    <div className="pillar-features">
                      {pillar.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="feature-tag">
                          <FaStar />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="pillar-learn-more">
                      Learn More <FaArrowRight />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Farm Day Timeline */}
      <section className="farm-day">
        <div className="container">
          <div className="section-header">
            <h2>A Day on Our Organic Farm</h2>
            <p>Follow the rhythm of our daily activities that bring fresh food to your table</p>
          </div>
          
          <div className="timeline">
            {farmActivities.map((activity, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="time-badge">{activity.time}</div>
                </div>
                <div className="timeline-content">
                  <div className="activity-image">
                    <img src={activity.image} alt={activity.activity} />
                  </div>
                  <div className="activity-info">
                    <h3>{activity.activity}</h3>
                    <p>{activity.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="organic-stats">
        <div className="container">
          <Stats stats={farmStats} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-produce">
        <div className="container">
          <div className="section-header">
            <h2>Farm-Fresh Favorites</h2>
            <p>Customer favorites that are always in season at our farm</p>
          </div>
          <ProductsShowcase 
            products={featuredProducts.slice(0, 6)}
            onQuickAdd={handleQuickAdd}
          />
        </div>
      </section>

      {/* Farm to Table Journey */}
      <section className="farm-journey">
        <div className="container">
          <div className="journey-header">
            <h2>From Our Fields to Your Family</h2>
            <p>Transparent journey of your food from seed to plate</p>
          </div>
          
          <div className="journey-steps">
            <div className="journey-step">
              <div className="step-number">01</div>
              <div className="step-icon">
                <FaSeedling />
              </div>
              <h3>Seed Selection</h3>
              <p>Choosing heirloom and organic seeds for maximum flavor and nutrition</p>
            </div>
            
            <div className="journey-step">
              <div className="step-number">02</div>
              <div className="step-icon">
                <FaLeaf />
              </div>
              <h3>Natural Growth</h3>
              <p>Nurturing plants with compost tea and natural amendments</p>
            </div>
            
            <div className="journey-step">
              <div className="step-number">03</div>
              <div className="step-icon">
                <FaRecycle />
              </div>
              <h3>Sustainable Harvest</h3>
              <p>Hand-picking at peak ripeness with minimal environmental impact</p>
            </div>
            
            <div className="journey-step">
              <div className="step-number">04</div>
              <div className="step-icon">
                <FaTruck />
              </div>
              <h3>Fresh Delivery</h3>
              <p>Carbon-neutral delivery to preserve freshness and nutrients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="organic-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <FaLeaf />
              <span>Join the Organic Movement</span>
            </div>
            <h2>Ready to Taste the Difference?</h2>
            <p>Experience food as nature intended - fresh, flavorful, and full of life.</p>
            <div className="cta-actions">
              <Link to="/products" className="btn btn-primary">
                <FaShoppingCart />
                Start Your Organic Journey
              </Link>
              <Link to="/farming" className="btn btn-secondary">
                <FaLeaf />
                Learn About Our Farming
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default Home