import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API call for seasonal products
    const fetchSeasonalProducts = async () => {
      setIsLoading(true)
      try {
        // In real app, this would be an API call
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
    
    // Show notification (you can implement a toast notification)
    console.log(`${product.name} added to cart!`)
  }

  const featuredSections = [
    {
      title: "Organic Vegetables",
      description: "Fresh from our fields to your table",
      image: "/images/vegetables-banner.jpg",
      link: "/products?category=vegetables"
    },
    {
      title: "Sustainable Farming",
      description: "Learn about our eco-friendly practices",
      image: "/images/farming-banner.jpg",
      link: "/farming"
    },
    {
      title: "Farm Fresh Dairy",
      description: "Pure, natural dairy products",
      image: "/images/dairy-banner.jpg",
      link: "/products?category=dairy"
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />
      
      {/* Stats Section */}
      <Stats stats={farmStats} />
      
      {/* Features Section */}
      <Features />
      
      {/* Featured Products */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked organic goodness from our farm</p>
            <Link to="/products" className="view-all-btn">
              View All Products
            </Link>
          </div>
          <ProductsShowcase 
            products={featuredProducts} 
            onQuickAdd={handleQuickAdd}
          />
        </div>
      </section>

      {/* Seasonal Products */}
      <SeasonalProducts 
        products={seasonalProducts}
        season={getCurrentSeason()}
        loading={isLoading}
        onQuickAdd={handleQuickAdd}
      />

      {/* Featured Sections Grid */}
      <section className="featured-sections">
        <div className="container">
          <h2>Explore Our Farm</h2>
          <div className="sections-grid">
            {featuredSections.map((section, index) => (
              <div key={index} className="section-card">
                <div 
                  className="section-image" 
                  style={{ backgroundImage: `url(${section.image})` }}
                />
                <div className="section-content">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  <Link to={section.link} className="section-link">
                    Discover More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Organic Goodness?</h2>
            <p>Join our community of health-conscious individuals</p>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home