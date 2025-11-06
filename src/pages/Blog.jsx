import React, { useState, useEffect, useMemo } from 'react'
import { 
  FaSearch, 
  FaCalendar, 
  FaUser, 
  FaClock, 
  FaTags, 
  FaArrowRight,
  FaShare,
  FaBookmark,
  FaRegBookmark,
  FaFilter,
  FaTimes,
  FaSeedling,
  FaLeaf,
  FaRecycle,
  FaUtensils,
  FaTint,
  FaBug,
  FaSun,
  FaCompass,
  FaChartLine,
  FaHandHoldingHeart,
  FaTree,
  FaMountain,
  FaCloudRain,
  FaHeart,
  FaQuoteLeft  // Added missing import
} from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import Loading from '../components/common/Loading/Loading'
import Newsletter from '../components/home/Newsletter/Newsletter'
import './Blog.css'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '')
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid')

  // Advanced Blog categories with organic farming focus
  const categories = [
    { id: 'farming-tips', name: 'Farming Tips', icon: FaSeedling, count: 15, color: '#4CAF50' },
    { id: 'organic-living', name: 'Organic Living', icon: FaLeaf, count: 12, color: '#8BC34A' },
    { id: 'sustainability', name: 'Sustainability', icon: FaRecycle, count: 8, color: '#FF9800' },
    { id: 'recipes', name: 'Organic Recipes', icon: FaUtensils, count: 10, color: '#E91E63' },
    { id: 'soil-health', name: 'Soil Health', icon: FaTree, count: 7, color: '#795548' },
    { id: 'water-management', name: 'Water Wisdom', icon: FaTint, count: 6, color: '#2196F3' },
    { id: 'pest-control', name: 'Natural Pest Control', icon: FaBug, count: 9, color: '#673AB7' }
  ]

  // Popular tags for organic farming
  const popularTags = [
    'Regenerative Agriculture', 'Composting Magic', 'Seasonal Planting', 'Heirloom Seeds', 
    'Sustainable Farming', 'Healthy Soil', 'Moon Gardening', 'Farm Life',
    'Natural Pest Control', 'Water Conservation', 'Biodiversity', 'Organic Certification',
    'Farm-to-Table', 'Permaculture', 'Vermicomposting', 'Crop Rotation'
  ]

  // Advanced organic farming articles with beautiful Unsplash images
  const mockArticles = [
    {
      id: 1,
      title: "The Art of Regenerative Agriculture: Healing Our Planet",
      excerpt: "Discover how regenerative farming practices can reverse climate change while producing abundant, nutritious food.",
      content: "Full article content here...",
      author: "Dr. Earth Guardian",
      publishDate: "2024-01-20",
      readTime: "12 min read",
      category: "sustainability",
      tags: ["Regenerative Agriculture", "Climate Change", "Soil Health"],
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      views: 2847,
      likes: 189,
      comments: 45,
      difficulty: "Advanced",
      tip: "Plant cover crops during off-seasons to improve soil structure"
    },
    {
      id: 2,
      title: "Moon Phase Gardening: Aligning with Cosmic Rhythms",
      excerpt: "Learn how planting and harvesting according to moon phases can dramatically improve your crop yields and plant health.",
      content: "Full article content here...",
      author: "Luna Gardener",
      publishDate: "2024-01-18",
      readTime: "8 min read",
      category: "farming-tips",
      tags: ["Moon Gardening", "Planting Calendar", "Cosmic Farming"],
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      views: 1892,
      likes: 167,
      comments: 32,
      difficulty: "Intermediate",
      tip: "Plant root crops during the waning moon for better development"
    },
    {
      id: 3,
      title: "Vermicomposting: Turning Waste into Black Gold",
      excerpt: "Master the art of worm composting to create the most nutrient-rich fertilizer for your organic garden.",
      content: "Full article content here...",
      author: "Worm Whisperer",
      publishDate: "2024-01-15",
      readTime: "10 min read",
      category: "soil-health",
      tags: ["Vermicomposting", "Composting Magic", "Soil Fertility"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      views: 2256,
      likes: 198,
      comments: 41,
      difficulty: "Beginner",
      tip: "Maintain proper moisture - compost should feel like a wrung-out sponge"
    },
    {
      id: 4,
      title: "Companion Planting: Nature's Perfect Partnerships",
      excerpt: "Discover which plants thrive together and which combinations can naturally repel pests and improve growth.",
      content: "Full article content here...",
      author: "Plant Matchmaker",
      publishDate: "2024-01-12",
      readTime: "9 min read",
      category: "pest-control",
      tags: ["Companion Planting", "Biodiversity", "Natural Pest Control"],
      image: "https://images.unsplash.com/photo-1597848212624-e6d4bd7e1e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      views: 1734,
      likes: 145,
      comments: 28,
      difficulty: "Intermediate",
      tip: "Plant basil with tomatoes to improve flavor and repel flies"
    },
    {
      id: 5,
      title: "Rainwater Harvesting: Every Drop Counts",
      excerpt: "Advanced techniques for collecting and storing rainwater to create a self-sufficient water system for your farm.",
      content: "Full article content here...",
      author: "Water Warrior",
      publishDate: "2024-01-10",
      readTime: "11 min read",
      category: "water-management",
      tags: ["Water Conservation", "Rainwater Harvesting", "Sustainability"],
      image: "https://images.unsplash.com/photo-1472653525502-fc569e405f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      views: 1421,
      likes: 112,
      comments: 19,
      difficulty: "Advanced",
      tip: "Install first-flush diverters to improve rainwater quality"
    },
    {
      id: 6,
      title: "Heirloom Seeds: Preserving Genetic Diversity",
      excerpt: "Why saving and planting heirloom seeds is crucial for food security and maintaining agricultural biodiversity.",
      content: "Full article content here...",
      author: "Seed Saver",
      publishDate: "2024-01-08",
      readTime: "7 min read",
      category: "farming-tips",
      tags: ["Heirloom Seeds", "Biodiversity", "Seed Saving"],
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      views: 1963,
      likes: 178,
      comments: 36,
      difficulty: "Beginner",
      tip: "Store seeds in cool, dark places with silica gel packets"
    },
    {
      id: 7,
      title: "Farm-to-Table Feast: Seasonal Organic Recipes",
      excerpt: "Gourmet recipes using fresh organic ingredients that celebrate each season's unique flavors and nutrients.",
      content: "Full article content here...",
      author: "Chef Organic",
      publishDate: "2024-01-05",
      readTime: "15 min read",
      category: "recipes",
      tags: ["Farm-to-Table", "Seasonal Cooking", "Organic Recipes"],
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: true,
      views: 3105,
      likes: 256,
      comments: 62,
      difficulty: "All Levels",
      tip: "Harvest vegetables in the morning for maximum flavor and nutrition"
    },
    {
      id: 8,
      title: "The Soil Food Web: Underground Ecosystem Secrets",
      excerpt: "Understanding the complex network of microorganisms that create healthy, living soil for optimal plant growth.",
      content: "Full article content here...",
      author: "Soil Scientist",
      publishDate: "2024-01-03",
      readTime: "14 min read",
      category: "soil-health",
      tags: ["Soil Food Web", "Microorganisms", "Soil Health"],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      views: 1621,
      likes: 138,
      comments: 24,
      difficulty: "Advanced",
      tip: "Avoid tilling to preserve soil structure and microbial life"
    },
    {
      id: 9,
      title: "Natural Pest Control: Beneficial Insects Army",
      excerpt: "Recruit nature's pest control agents - ladybugs, lacewings, and praying mantises to protect your crops.",
      content: "Full article content here...",
      author: "Bug Expert",
      publishDate: "2024-01-01",
      readTime: "8 min read",
      category: "pest-control",
      tags: ["Beneficial Insects", "Natural Pest Control", "Eco-friendly"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      featured: false,
      views: 1347,
      likes: 98,
      comments: 17,
      difficulty: "Intermediate",
      tip: "Plant flowers to attract beneficial insects to your garden"
    }
  ]

  // Organic farming tips data
  const farmingTips = [
    {
      icon: FaCompass,
      title: "Crop Rotation",
      description: "Rotate crops annually to prevent soil depletion and break pest cycles",
      benefit: "Improves soil health naturally"
    },
    {
      icon: FaChartLine,
      title: "Soil Testing",
      description: "Test soil every season to understand nutrient needs and pH balance",
      benefit: "Precise organic amendments"
    },
    {
      icon: FaHandHoldingHeart,
      title: "Compost Tea",
      description: "Brew nutrient-rich compost tea for foliar feeding and soil drenching",
      benefit: "Rapid plant nutrient uptake"
    },
    {
      icon: FaMountain,
      title: "Terrace Farming",
      description: "Create terraces on slopes to prevent erosion and maximize space",
      benefit: "Sustainable land use"
    }
  ]

  // Simulate API call
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        setArticles(mockArticles)
        setFeaturedArticles(mockArticles.filter(article => article.featured))
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === '' || article.category === selectedCategory
      const matchesTag = selectedTag === '' || article.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [articles, searchQuery, selectedCategory, selectedTag])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedTag) params.set('tag', selectedTag)
    
    setSearchParams(params)
  }, [searchQuery, selectedCategory, selectedTag, setSearchParams])

  // Handler functions
  const handleSearch = (query) => setSearchQuery(query)
  const handleCategoryFilter = (categoryId) => setSelectedCategory(prev => prev === categoryId ? '' : categoryId)
  const handleTagFilter = (tag) => setSelectedTag(prev => prev === tag ? '' : tag)
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
  }

  const toggleBookmark = (articleId) => {
    setBookmarkedArticles(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(articleId)) {
        newBookmarks.delete(articleId)
      } else {
        newBookmarks.add(articleId)
      }
      return newBookmarks
    })
  }

  const shareArticle = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `/blog/${article.id}`,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${article.id}`)
      alert('Link copied to clipboard!')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const activeFilterCount = [searchQuery, selectedCategory, selectedTag].filter(Boolean).length

  // Enhanced article card with farming tips
  const renderArticleCard = (article, variant = 'default') => {
    const isBookmarked = bookmarkedArticles.has(article.id)
    const category = categories.find(cat => cat.id === article.category)
    const CategoryIcon = category?.icon || FaSeedling

    return (
      <article key={article.id} className={`article-card ${variant}`}>
        <div className="article-image">
          <img src={article.image} alt={article.title} />
          <div className="article-category" style={{ '--category-color': category?.color }}>
            <CategoryIcon />
            <span>{category?.name}</span>
          </div>
          <div className="article-actions">
            <button 
              className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => toggleBookmark(article.id)}
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <button 
              className="share-btn"
              onClick={() => shareArticle(article)}
            >
              <FaShare />
            </button>
          </div>
          {article.difficulty && (
            <div className={`difficulty-badge ${article.difficulty.toLowerCase()}`}>
              {article.difficulty}
            </div>
          )}
        </div>

        <div className="article-content">
          <div className="article-meta">
            <span className="meta-item">
              <FaUser />
              {article.author}
            </span>
            <span className="meta-item">
              <FaCalendar />
              {formatDate(article.publishDate)}
            </span>
            <span className="meta-item">
              <FaClock />
              {article.readTime}
            </span>
          </div>

          <h3 className="article-title">
            <Link to={`/blog/${article.id}`}>{article.title}</Link>
          </h3>

          <p className="article-excerpt">{article.excerpt}</p>

          {article.tip && (
            <div className="farming-tip">
              <FaLeaf className="tip-icon" />
              <div className="tip-content">
                <strong>Pro Tip:</strong> {article.tip}
              </div>
            </div>
          )}

          <div className="article-tags">
            {article.tags.map(tag => (
              <button
                key={tag}
                className={`tag ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => handleTagFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="article-stats">
            <div className="stat">
              <span className="stat-value">{article.views}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat">
              <FaHeart className="heart-icon" />
              <span className="stat-value">{article.likes}</span>
            </div>
            <div className="stat">
              <span className="stat-value">{article.comments}</span>
              <span className="stat-label">Comments</span>
            </div>
          </div>

          <Link to={`/blog/${article.id}`} className="read-more">
            Read More <FaArrowRight />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <div className="blog-page">
      {/* Enhanced Hero Section */}
      <section className="blog-hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Organic Farm" 
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaSeedling />
              <span>Organic Wisdom</span>
            </div>
            <h1>Organic Farming Blog</h1>
            <p>Discover revolutionary farming techniques, sustainable practices, and nature's secrets for abundant harvests. Join thousands of farmers transforming agriculture.</p>
            
            {/* Advanced Search */}
            <div className="blog-search">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search farming tips, recipes, techniques..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearchQuery('')}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              <div className="search-tags">
                <span>Trending: </span>
                {['Regenerative Agriculture', 'Moon Gardening', 'Vermicomposting'].map(tag => (
                  <button
                    key={tag}
                    className="quick-tag"
                    onClick={() => handleSearch(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="quick-tips-section">
        <div className="container">
          <h2 className="section-title">Essential Organic Farming Tips</h2>
          <div className="tips-grid">
            {farmingTips.map((tip, index) => (
              <div key={index} className="tip-card">
                <div className="tip-icon">
                  {React.createElement(tip.icon)}
                </div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
                <div className="tip-benefit">
                  <FaLeaf />
                  <span>{tip.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {!loading && featuredArticles.length > 0 && (
        <section className="featured-articles">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Masterpieces</h2>
              <p>Deep-dive articles that are changing how we farm and eat</p>
            </div>
            <div className="featured-grid">
              {featuredArticles.map(article => renderArticleCard(article, 'featured'))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div className="blog-main">
        <div className="container">
          <div className="blog-layout">
            {/* Enhanced Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories with colors */}
              <div className="sidebar-widget">
                <h3>
                  <FaFilter />
                  Categories
                </h3>
                <div className="categories-list">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                      onClick={() => handleCategoryFilter(category.id)}
                      style={{ '--category-color': category.color }}
                    >
                      {React.createElement(category.icon)}
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="sidebar-widget">
                <h3>
                  <FaTags />
                  Popular Tags
                </h3>
                <div className="tags-cloud">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      className={`tag ${selectedTag === tag ? 'active' : ''}`}
                      onClick={() => handleTagFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Farming Quote */}
              <div className="sidebar-widget quote-widget">
                <FaQuoteLeft className="quote-icon" />
                <p>"The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings."</p>
                <span className="quote-author">- Masanobu Fukuoka</span>
              </div>

              {/* Newsletter */}
              <div className="sidebar-widget">
                <Newsletter variant="compact" />
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="blog-content">
              {/* Enhanced Content Header */}
              <div className="content-header">
                <div className="header-info">
                  <h2>
                    {selectedCategory 
                      ? categories.find(cat => cat.id === selectedCategory)?.name
                      : selectedTag
                      ? `#${selectedTag}`
                      : searchQuery
                      ? `Search: "${searchQuery}"`
                      : 'All Organic Wisdom'
                    }
                  </h2>
                  <p className="results-count">
                    {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
                    {activeFilterCount > 0 && ` • ${activeFilterCount} filter${activeFilterCount !== 1 ? 's' : ''} active`}
                  </p>
                </div>

                <div className="header-controls">
                  {/* View Mode Toggle */}
                  <div className="view-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      Grid
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      List
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'masonry' ? 'active' : ''}`}
                      onClick={() => setViewMode('masonry')}
                    >
                      Masonry
                    </button>
                  </div>

                  {/* Active Filters */}
                  {activeFilterCount > 0 && (
                    <button className="clear-filters" onClick={clearFilters}>
                      <FaTimes />
                      Clear Filters ({activeFilterCount})
                    </button>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="loading-section">
                  <Loading />
                  <p>Harvesting fresh articles for you...</p>
                </div>
              )}

              {/* Articles Grid */}
              {!loading && (
                <>
                  {filteredArticles.length > 0 ? (
                    <div className={`articles-grid ${viewMode}`}>
                      {filteredArticles.map(article => renderArticleCard(article))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <FaSearch className="no-results-icon" />
                      <h3>No organic wisdom found</h3>
                      <p>Try adjusting your search or explore different categories to discover amazing farming insights.</p>
                      <button className="clear-all-btn" onClick={clearFilters}>
                        Explore All Articles
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Load More */}
              {!loading && filteredArticles.length > 0 && (
                <div className="load-more-section">
                  <button className="load-more-btn">
                    <FaSeedling />
                    Load More Organic Wisdom
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Enhanced Newsletter Section */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <FaLeaf className="newsletter-icon" />
            <h2>Grow Your Organic Knowledge</h2>
            <p>Get weekly farming tips, seasonal guides, and exclusive content delivered to your inbox</p>
            <Newsletter />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog